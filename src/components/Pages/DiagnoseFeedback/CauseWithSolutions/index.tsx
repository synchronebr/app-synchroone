import React from "react";
import { View } from "react-native";
import {
  Card, CardHeader, CardHeaderLeft, CardTitle, CardDesc, CardBody,
  SolutionsBlock, SolutionCard, SolutionTitle, SolutionDesc,
  SolutionActions, PillBtn, StatusBadge, SolutionsTitle
} from "./styles";
import { Input } from "../../../Input";
import SelectStatusDiagnose from "../SelectStatusDiagnose";
import { t } from "i18next";
import { enums } from "../../../../utils/enums";

type Enums = {
  CAUSE: { C: string; P: string; N: string; I: string };
  SOL:   { C: string; N: string; NA: string; R: string };
};

type Solution = {
  solutionId: number;
  status: string;
  comments?: string;
  solutionType: { id: number; title: string; description?: string };
};

type Cause = {
  causeId: number;
  status: string;
  comments?: string;
  causesType: { id: number; title: string; description?: string };
  solutions?: Solution[];
};

type Props = {
  cause: Cause;
  onChangeCauseStatus: (status: string) => void;
  onChangeCauseComment: (txt: string) => void;
  onChangeSolutionStatus: (solutionId: number, status: string) => void;
};

const needSolutions = (st?: string) => st === enums.Diagnoses.Causes.Feedback.NotConfirmed || st === enums.Diagnoses.Causes.Feedback.PartiallyConfirmed;

export const CauseWithSolutions: React.FC<Props> = ({
  cause, onChangeCauseStatus, onChangeCauseComment, onChangeSolutionStatus,
}) => {
  const showSolutions = needSolutions(cause.status);

  return (
    <Card>
      <CardHeader>
        <CardHeaderLeft>
          <CardTitle>{cause.causesType?.title}</CardTitle>
        </CardHeaderLeft>
      </CardHeader>

      <CardBody>
        {!!cause.causesType?.description && <CardDesc>{cause.causesType.description}</CardDesc>}

        <SelectStatusDiagnose
          key={cause.causeId.toString()}
          editable
          selected={cause.status ? cause.status : enums.Diagnoses.Causes.Feedback.NotClassified}
          onSelect={onChangeCauseStatus}
        />

        {showSolutions && (
            <Input
            placeholder={t('index.addCommentsIfNecessary')}
            value={cause.comments || ""}
            onChangeText={onChangeCauseComment}
            style={{ width: "100%" }}
            />
        )}

      </CardBody>

        {showSolutions && (
            <>
            <SolutionsTitle>{t('index.solutions')}</SolutionsTitle>
            <SolutionsBlock>
                {(cause.solutions ?? [])
                .map((s) => {
                    const is = (code: string) => s.status === code;

                    return (
                    <SolutionCard key={s.solutionId}>
                        <SolutionTitle>{s.solutionType.title}</SolutionTitle>

                        {!!s.solutionType.description && (
                        <SolutionDesc>{s.solutionType.description}</SolutionDesc>
                        )}

                        <SelectStatusDiagnose
                            key={s.solutionId.toString()}
                            editable
                            selected={s.status ? s.status : enums.Diagnoses.Causes.Feedback.NotClassified}
                            onSelect={(value) => { onChangeSolutionStatus(s.solutionId, value); }}
                        />
                    </SolutionCard>
                    );
                })}
            </SolutionsBlock>
            </>
        )}
    </Card>
  );
};
