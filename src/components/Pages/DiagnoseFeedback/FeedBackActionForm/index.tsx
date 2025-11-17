import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import { t } from "i18next";
import { InputArea } from "../../../InputArea";
import * as S from "./styles";
import { Switch } from "../../../Forms/Switch";
import { DatePicker } from "../../../Forms/DataPicker";
import Select from "../../../Select";
import { FeedBackActionData, DowntimeUnit } from "./types";

// Mantém os mesmos tipos da sua base

type Props = {
  value?: FeedBackActionData;
  onChange?: (data: FeedBackActionData) => void;
  editable?: boolean;
};

const DEFAULT_VALUE: FeedBackActionData = {
  executed: false,
  executionDate: null,
  executedComment: "",
  stopAsset: false,
  downtimeMinutes: null,
  downtimeUnit: "M",
  analysisAction: "",
};

export default function FeedBackActionForm({ value, onChange, editable = true }: Props) {
  const [form, setForm] = useState<FeedBackActionData>(value ?? DEFAULT_VALUE);

  useEffect(() => {
    if (value) setForm(value); 
    console.log(value)
  }, [value]);

  const update = useCallback((patch: Partial<FeedBackActionData>) => {
    setForm((prev) => {
      const next = { ...prev, ...patch };
      onChange?.(next);
      return next;
    });
  }, [onChange]);

  const handleToggleExecuted = useCallback((checked: boolean) => {
    update({ executed: checked });
  }, [update]);

  const handleTogglestopAsset = useCallback((checked: boolean) => {
    update({ stopAsset: checked });
  }, [update]);

  const handleDowntimeChange = useCallback((txt: string) => {
    const onlyDigits = txt.replace(/[^\d]/g, "");
    update({ downtimeMinutes: onlyDigits ? Number(onlyDigits) : null });
  }, [update]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.SwitchRow>
            <S.Label>{t("index.performedAnyAction")}</S.Label>
            <Switch disabled={!editable} checked={form.executed} onCheckedChange={handleToggleExecuted} title="" />
          </S.SwitchRow>

          {form.executed && (
            <S.FieldBlock>
              <S.Field>
                <S.FieldLabel>{t("index.executionDate")}</S.FieldLabel>
                <DatePicker disabled={!editable} value={form.executionDate} onChange={(value) => update({ executionDate: value })} />
              </S.Field>

              <S.Field>
                <S.SectionLabel>{t("index.actionResult")}</S.SectionLabel>
                <InputArea
                  placeholder={t("index.exampleResultPlaceholder")}
                  maxLength={500}
                  minRows={3}
                  maxRows={10}
                  autoGrow
                  value={form.executedComment}
                  onChangeText={(text) => update({ executedComment: text })}
                  editable={editable}
                />
              </S.Field>
            </S.FieldBlock>
          )}

          <S.SwitchRow>
            <S.Label>{t("index.assetStoppedForMaintenance")}</S.Label>
            <Switch disabled={!editable} checked={form.stopAsset} onCheckedChange={handleTogglestopAsset} title="" />
          </S.SwitchRow>

          {form.stopAsset && (
            <S.FieldBlock>
              <S.Field>
                <S.FieldLabel>{t("index.downtimeLabel")}</S.FieldLabel>
                <S.DowntimeRow>
                  <S.DowntimeInput
                    value={form.downtimeMinutes?.toString() ?? ""}
                    editable={editable}
                    onChangeText={handleDowntimeChange}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                  <S.UnitWrapper>
                    <Select<DowntimeUnit>
                      containerStyle={{ alignSelf: "flex-start", minWidth: 120 }}
                      editable={editable}
                      values={[
                        { label: t("index.minutes"), value: "M" },
                        { label: t("index.hours"), value: "H" },
                      ]}
                      selected={form.downtimeUnit}
                      onSelect={(v) => update({ downtimeUnit: v })}
                      placeholder={t("index.selectLevel")}
                    />
                  </S.UnitWrapper>
                </S.DowntimeRow>
              </S.Field>
            </S.FieldBlock>
          )}

          <View>
            <S.SectionLabel>{t("index.observations")}</S.SectionLabel>
            <InputArea
              placeholder={t("index.writeHere")}
              editable={editable}
              maxLength={800}
              minRows={3}
              maxRows={10}
              autoGrow
              value={form.analysisAction}
              onChangeText={(text) => update({ analysisAction: text })}
            />
          </View>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}