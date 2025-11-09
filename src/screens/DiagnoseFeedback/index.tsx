import React, { useMemo, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { useQueryClient } from "@tanstack/react-query";

import { Container, Content, Title, Footer } from "./styles";
import Header from "../../components/Pages/Header";
import { Button } from "../../components/Button";
import { CauseWithSolutions } from "../../components/Pages/DiagnoseFeedback/CauseWithSolutions";
import { Toast } from "react-native-toast-notifications";
import FeedBackActionForm from "../../components/Pages/DiagnoseFeedback/FeedBackActionForm";

import { Phase, CauseFB, FeedBackActionData } from "./types.d";
import { IDiagnose } from "../../services/dtos/IDiagnose";
import api from "../../services/api";
import { enums } from "../../utils/enums";

export function DiagnoseFeedback() {
  const navigation = useNavigation();
  const route = useRoute();
  const queryClient = useQueryClient();
  const diagnose = (route.params as IDiagnose) ?? { causes: [] };
  const [isLoading, setIsLoading] = useState(false);
  const editable = diagnose.status === enums.Diagnoses.Status.Analyse;

  // ===== Estado controlado =====
  const [causes, setCauses] = useState<IDiagnose["causes"]>(cloneCauses(diagnose?.causes));
  const [phase, setPhase] = useState<Phase>("causes");
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FeedBackActionData>(hydrateFormFromDB(diagnose));

  const total = causes.length;
  const current = causes[step];
  const isLastCause = step === total - 1;

  const allSolutionsClassified = (c: IDiagnose["causes"][number]) =>
    (c?.solutions ?? []).every((s) => s.status && s.status !== CauseFB.NotClassified);

  const canAdvanceCauses = useMemo(() => {
    if (!current) return false;
    if (!current.status || current.status === CauseFB.NotClassified) return false;
    return allSolutionsClassified(current);
  }, [current]);

  // ===== Mutators =====
  const updateCauseStatus = (causeId: number, status: string) => {
    setCauses((prev) => prev.map((c) => c.causeId === causeId ? { ...c, status } : c));
  };

  const updateCauseComment = (causeId: number, comment: string) => {
    setCauses((prev) => prev.map((c) => c.causeId === causeId ? { ...c, comment } : c)); // <-- usa 'comment' (não 'comments')
  };

  const updateSolutionStatus = (causeId: number, solutionId: number, status: string) => {
    setCauses((prev) => prev.map((c) =>
      c.causeId !== causeId
        ? c
        : { ...c, solutions: (c.solutions ?? []).map((s) => s.solutionId === solutionId ? { ...s, status } : s) }
    ));
  };

  function toISODateOrNull(d: Date | string | null | undefined): string | null {
    if (!d) return null;
    try {
      const date = typeof d === "string" ? new Date(d) : d;
      if (Number.isNaN(date.getTime())) return null;
      return date.toISOString();
    } catch {
      return null;
    }
  }

  function minutesFromValue(value: number | null | undefined, unit: string | null | undefined): number | null {
    if (value == null || Number.isNaN(value)) return null;
    if (!unit || unit === "M") return Math.round(value);
    return Math.round(value * 60);
  }

  function hydrateFormFromDB(d: Partial<IDiagnose> | undefined): FeedBackActionData {
    console.log(d);
    console.log(d?.executionDate ? new Date(d.executionDate as any) : null);
    return {
      executed: !!d?.executed,
      executionDate: d?.executionDate ? new Date(d.executionDate as any) : null,
      executedComment: d?.executedComment ?? "",
      stopAsset: !!d?.stopAsset,
      downtimeMinutes: d?.downtimeValue ?? null,
      downtimeUnit: (d?.downtimeUnit) ?? "M",
      analysisAction: d?.analysisAction ?? "",
    };
  }

  function cloneCauses(src: IDiagnose["causes"] = []): IDiagnose["causes"] {
    return JSON.parse(JSON.stringify(src));
  }

  // ===== Navegação =====
  const goNext = () => {
    console.log('next');
    if (phase === "causes") {
      if (!canAdvanceCauses) {
        Toast.show(t('index.mustClassifyAll') || 'Necessário classificar todas as causas e soluções', { type: 'danger' });
        return;
      }
      if (!isLastCause) setStep((s) => s + 1); else setPhase("action");
    } else {
      console.log(phase);
      onSubmit();
    }
  };

  const goBack = () => {
    if (phase === "action") { setPhase("causes"); return; }
    if (step > 0) setStep((s) => s - 1); else navigation.goBack();
  };

  // ===== Submit =====
  const onSubmit = async () => {
    setIsLoading(true);
    const downtimeMinutes = formData.maintenance ? minutesFromValue(formData.downtimeValue, formData.downtimeUnit) : null;

    const payload = {
      executed: formData.executed,
      executionDate: formData.executed ? toISODateOrNull(formData.executionDate) : null,
      comments: formData.executed ? (formData.executedComment ?? "") : "",
      stopAsset: !!formData.maintenance,
      analysisAction: formData.notes ?? "",
      downtimeMinutes,
      causes: causes.map((c) => ({
        causeId: c.causeId,
        status: c.status ?? null,
        comment: c.comment ?? "",
      })),
      // Se sua API espera "prescriptions", mantenha este nome. Caso espere "solutions", renomeie a chave.
      prescriptions: causes.flatMap((c) => (c.solutions ?? []).map((s) => ({
        causeId: c.causeId,
        solutionId: s.solutionId,
        status: s.status ?? null,
        comment: s.comment ?? "",
      }))),
    };

    try {
      await api.patch(`/diagnoses/${diagnose.id}/feedback`, payload);
      queryClient.invalidateQueries({ queryKey: ["diagnose", diagnose.id ] });
      navigation.goBack();
      Toast.show(t('index.recordUpdatedSuccessfully'), { type: 'success' });
    } catch (err) {
      // if (err.response) {
      //   console.log('📡 SERVER err');
      //   console.log('Status:', err.response.status);
      //   console.log('Headers:', err.response.headers);
      //   console.log('Data:', err.response.data); // <= Aqui está o retorno do backend

      // // Se a requisição foi feita mas não houve resposta (timeout, CORS, etc)
      // } else if (err.request) {
      //   console.log('⏳ NO RESPONSE');
      //   console.log(err.request);

      // // Se o erro ocorreu antes da requisição (configuração, etc)
      // } else {
      //   console.log('⚠️ AXIOS err');
      console.log('Message:', err.message);
      // }
    }
    setIsLoading(false);
  };

  if (!current && phase === "causes") return null;

  return (
    <Container>
      <Header title={t("index.diagnosisFeedback")} backIcon="back" backPress={goBack} />

      {phase === "causes" ? (
        <Content>
          <Title>
            {t("index.causeOfTotal", { index: step + 1, total })}
          </Title>
          <CauseWithSolutions
            editable={editable}
            cause={current!}
            onChangeCauseStatus={(st) => updateCauseStatus(current!.causeId, st)}
            onChangeCauseComment={(txt) => updateCauseComment(current!.causeId, txt)}
            onChangeSolutionStatus={(solutionId, st) => updateSolutionStatus(current!.causeId, solutionId, st)}
          />
        </Content>
      ) : (
        <FeedBackActionForm editable={editable} value={formData} onChange={setFormData} />
      )}

      {(phase === "causes" || editable) && (
      <Footer>
        <Button
          title={phase === "causes" ? (t("index.next") || "Avançar") : (t("index.finish") || "Concluir")}
          onPress={goNext}
          loading={isLoading}
        />
      </Footer>
      )}
    </Container>
  );
}
