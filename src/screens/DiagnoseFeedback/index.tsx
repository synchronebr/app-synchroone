import React, { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { t } from "i18next";

import {
  Container, Content, Title, SubTitle, SummaryBlock, SummaryTitle,
  SummarySubValue, SummarySolution, SummaryRow, SummaryLabel, SummaryValue,
  SectionTitle, Row, CheckItem, CheckSquare, CheckLabel, Field, FieldLabel, Footer
} from "./styles";

import Header from "../../components/Pages/Header";
import { Button } from "../../components/Button";
import { IDiagnose } from "../../services/dtos/IDiagnose";
import { CauseWithSolutions } from "../../components/Pages/DiagnoseFeedback/CauseWithSolutions";
import { enums } from "../../utils/enums";

// ----- CONFIG / ENUMS -----
const FOOTER_HEIGHT = 72; // ajuste ao seu Button
// status da causa vem de enums:
const CauseFB = enums.Diagnoses.Causes.Feedback;
// status da solução (ajuste se tiver em outro lugar)
const SOL = { Confirmed: "C", NotConfirmed: "N", NotApplicable: "NA", Pending: "R" } as const;

// precisa classificar soluções quando causa é C ou P
const needSolutions = (st?: string) =>
  st === CauseFB.Confirmed || st === CauseFB.PartiallyConfirmed;

// todas as soluções classificadas (≠ pendente)
const allSolutionsClassified = (cause: IDiagnose["causes"][number]) =>
  (cause?.solutions ?? []).every((s) => s.status && s.status !== SOL.Pending);

// --------------------------

type Phase = "causes" | "summary";

export function DiagnoseFeedback() {
  const navigation = useNavigation();
  const route = useRoute();
  const diagnose = route.params as IDiagnose;

  // estado de causas/soluções
  const [causes, setCauses] = useState<IDiagnose["causes"]>(diagnose?.causes ?? []);
  const [step, setStep] = useState(0);
  const total = causes.length;
  const current = causes[step];

  // fase atual
  const [phase, setPhase] = useState<Phase>("causes");

  // campos finais do diagnóstico (etapa 2)
  const [diagComments, setDiagComments] = useState(diagnose?.comments ?? "");
  const [executed, setExecuted] = useState<boolean>(diagnose?.executed ?? false);
  const [executionDate, setExecutionDate] = useState<string>(diagnose?.executionDate ?? "");
  const [stopAsset, setStopAsset] = useState<boolean>(diagnose?.stopAsset ?? false);
  const [downtimeMinutes, setDowntimeMinutes] = useState<string>(
    diagnose?.downtimeMinutes ? String(diagnose.downtimeMinutes) : ""
  );
  const [analysisAction, setAnalysisAction] = useState<string>(diagnose?.analysisAction ?? "");

  // ---- updates (com regras) ----
  const updateCauseStatus = (causeId: number, status: string) => {
    setCauses((prev) =>
      prev.map((c) => {
        if (c.causeId !== causeId) return c;

        // REGRAS:
        // C -> todas as soluções = C
        if (status === CauseFB.Confirmed) {
          return {
            ...c,
            status,
            solutions: (c.solutions ?? []).map((s) => ({ ...s, status: SOL.Confirmed })),
          };
        }

        // N -> todas as soluções = N
        if (status === CauseFB.NotConfirmed) {
          return {
            ...c,
            status,
            solutions: (c.solutions ?? []).map((s) => ({ ...s, status: SOL.NotConfirmed })),
          };
        }

        // P ou I -> não mexe nas soluções
        return { ...c, status };
      })
    );
  };

  const updateCauseComment = (causeId: number, comment: string) =>
    setCauses((prev) => prev.map((c) => (c.causeId === causeId ? { ...c, comments: comment } : c)));

  const updateSolutionStatus = (causeId: number, solutionId: number, status: string) =>
    setCauses((prev) =>
      prev.map((c) =>
        c.causeId !== causeId
          ? c
          : {
              ...c,
              solutions: (c.solutions ?? []).map((s) =>
                s.solutionId === solutionId ? { ...s, status } : s
              ),
            }
      )
    );

  // ---- validação / navegação ----
  const canAdvanceCauses = useMemo(() => {
    if (!current) return false;
    if (!current.status || current.status === CauseFB.NotClassified) return false;
    return needSolutions(current.status) ? allSolutionsClassified(current) : true;
  }, [current]);

  const isLastCause = step === total - 1;

  const goNext = () => {
    if (phase === "causes") {
      if (!isLastCause) {
        setStep((s) => s + 1);
      } else {
        // terminou causas -> vai para RESUMO
        setPhase("summary");
      }
    } else {
      onSubmit();
    }
  };

  // monta o payload final e envia
  const onSubmit = async () => {
    const payload = {
      diagnoseId: diagnose.id,
      comments: diagComments,
      executed,
      executionDate: executionDate || null,
      stopAsset,
      downtimeMinutes: downtimeMinutes ? Number(downtimeMinutes) : null,
      analysisAction,
      causes: causes.map((c) => ({
        causeId: c.causeId,
        status: c.status,
        comments: c.comments ?? "",
        solutions: (c.solutions ?? []).map((s) => ({
          solutionId: s.solutionId,
          status: s.status,
          comments: s.comments ?? "",
        })),
      })),
    };

    try {
      // TODO: troque pela sua chamada real
      // await api.post('/diagnoses/feedback', payload)
      navigation.goBack();
    } catch (e) {
      // trate erro
      console.log("submit error", e);
    }
  };

  if (!current && phase === "causes") return null;

  // ----- UI -----
  return (
    <Container>
      <Header
        title={t("index.diagnosisFeedback")}
        backIcon="back"
        backPress={() => navigation.goBack()}
      />

      {/* Conteúdo rolável */}
      <Content>
        {phase === "causes" ? (
          <>
            <Title>
              {t("index.causeOfTotal", {
                defaultValue: "Causa {{index}} de {{total}}",
                index: step + 1,
                total,
              })}
            </Title>

            <CauseWithSolutions
              cause={current!}
              onChangeCauseStatus={(st) => updateCauseStatus(current!.causeId, st)}
              onChangeCauseComment={(txt) => updateCauseComment(current!.causeId, txt)}
              onChangeSolutionStatus={(solutionId, st) =>
                updateSolutionStatus(current!.causeId, solutionId, st)
              }
            />
          </>
        ) : (
          <>
            <Title>{t("index.reviewAndFinish") || "Resumo & Conclusão"}</Title>
            <SubTitle>
              {t("index.checkInfoBeforeFinish") ||
                "Revise as informações e finalize o feedback do diagnóstico."}
            </SubTitle>

            {/* Campos finais */}
            <SectionTitle>{t("index.finalFields") || "Campos Finais"}</SectionTitle>

            <Field>
              <FieldLabel>{t("index.comments") || "Comentários gerais"}</FieldLabel>
              {/* <FieldInput
                placeholder={t("index.addComment") || "Digite..."}
                value={diagComments}
                onChangeText={setDiagComments}
                multiline
              /> */}
            </Field>
          </>
        )}
      </Content>

      {/* Rodapé fixo */}
      <Footer>
        <Button
          title={
            phase === "causes"
              ? isLastCause
                ? (t("index.goToReview") || "Ir para Resumo")
                : (t("index.next") || "Avançar")
              : (t("index.finish") || "Concluir")
          }
          onPress={goNext}
          disabled={phase === "causes" ? !canAdvanceCauses : false}
        />
      </Footer>
    </Container>
  );
}

