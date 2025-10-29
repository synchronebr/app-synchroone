import React, { useMemo, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { t } from "i18next";

import {
  Container, Content, Title, SubTitle, SummaryBlock, SummaryTitle,
  SummarySubValue, SummarySolution, SummaryRow, SummaryLabel, SummaryValue,
  SectionTitle, Row, CheckItem, CheckSquare, CheckLabel, Field, FieldLabel, Footer,
  ActionContainer, ActionTitle, ActionSubTitle,
} from "./styles";

import Header from "../../components/Pages/Header";
import { Button } from "../../components/Button";
import { IDiagnose } from "../../services/dtos/IDiagnose";
import { CauseWithSolutions } from "../../components/Pages/DiagnoseFeedback/CauseWithSolutions";
import { enums } from "../../utils/enums";
import { Toast } from "react-native-toast-notifications";
import { Input } from "../../components/Input";
import { InputArea } from "../../components/InputArea";

// ----- CONFIG / ENUMS -----
const FOOTER_HEIGHT = 72; // ajuste ao seu Button
// status da causa vem de enums:
const CauseFB = enums.Diagnoses.Causes.Feedback;
// status da solução (ajuste se tiver em outro lugar)
const SOL = { Confirmed: "C", NotConfirmed: "N", NotApplicable: "NA", Pending: "R" } as const;

// todas as soluções classificadas (≠ pendente)
const allSolutionsClassified = (cause: IDiagnose["causes"][number]) =>
  (cause?.solutions ?? []).every((s) => s.status && s.status !== enums.Diagnoses.Causes.Feedback.NotClassified);

// --------------------------

type Phase = "causes" | "action" | "evidence";

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
  const [executedComment, setExecutedComment] = useState<string>(diagnose?.executed ?? "");
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
        // if (status === CauseFB.Confirmed) {
        //   return {
        //     ...c,
        //     status,
        //     solutions: (c.solutions ?? []).map((s) => ({ ...s, status: SOL.Confirmed })),
        //   };
        // }

        // // N -> todas as soluções = N
        // if (status === CauseFB.NotConfirmed) {
        //   return {
        //     ...c,
        //     status,
        //     solutions: (c.solutions ?? []).map((s) => ({ ...s, status: SOL.NotConfirmed })),
        //   };
        // }

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
    return allSolutionsClassified(current);
  }, [current]);

  const isLastCause = step === total - 1;

  const goNext = () => {
    if (!canAdvanceCauses) {
      Toast.show('Necessário classificar todas as causas e soluções', { type: 'danger' });
      return false;
    } 

    if (phase === "causes") {
      if (!isLastCause) {
        setStep((s) => s + 1);
      } else{
        setPhase("action");
      }
    } else if (phase === "action") {
        setPhase("evidence");
    }else {
      onSubmit();
    }
  };

  function normalizeStrKeepEmpty(value?: string) {
    return value ?? "";
  }

  // monta o payload final e envia
  const onSubmit = async () => {
    // const payload = {
    //   executionDate: new Date().toDateString(),
    //   comments: normalizeStrKeepEmpty(values.evidences.note),
    //   stopAsset: values.evidences.active ?? null,
    //   analysisAction: normalizeStrKeepEmpty(values.evidences.result),
    //   executed: values.evidences.executed ?? null,
    //   downtimeMinutes: downtime,
    //   causes: values.causes?.map((c) => ({
    //     causeId: c.causeId,
    //     status: c.status,
    //     comment: normalizeStrKeepEmpty(c.comment),
    //   })) ?? [],
    //   prescriptions: values.prescriptions?.map((p) => ({
    //     causeId: p.causeId,
    //     solutionId: p.solutionId,
    //     status: p.status,
    //     comment: normalizeStrKeepEmpty(p.comment),
    //   })) ?? [],
    // };

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
        {phase === "causes" ? (
          <Content>
            <Title>
              {t("index.causeOfTotal", {
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
          </Content>
        ) : (
          <>
            {phase === "action" ? (
              <ActionContainer>
                <ActionTitle>{t("index.performedAnyAction")}</ActionTitle>
                <ActionSubTitle>{t("index.procedureBasedOnDiagnosis")}</ActionSubTitle>
                {executed ? (
                  <></>
                ) : (
                  <View style={{ gap: 5 }}>
                    <Button title={t('index.yes')} onPress={() => {setExecuted(true)}}/>
                    <Button title={t('index.no')} onPress={() => {setExecuted(false);goNext();}}/>
                  </View>
                )}
              </ActionContainer>
            ) : (

            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ActionContainer>
                <ActionTitle>{executed ? t('index.actionExecuted') : t("index.noActionPerformed")}</ActionTitle>
                <InputArea
                  placeholder={executed ? t('index.describeExecutedAction') : t('index.describeReasonNoAction')}
                  maxLength={500}
                  minRows={3}
                  maxRows={10}
                  autoGrow
                  value={executedComment}
                  onChangeText={(text) => setExecutedComment(text)}
                />
              </ActionContainer>
              </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            )}
          </>
        )}

      {/* Rodapé fixo */}
      {phase !== "action" && (
      <Footer>
        <Button
          title={
            phase === "causes"
              ? (t("index.next") || "Avançar")
              : (t("index.finish") || "Concluir")
          }
          onPress={goNext}
        />
      </Footer>
      )}
    </Container>
  );
}

