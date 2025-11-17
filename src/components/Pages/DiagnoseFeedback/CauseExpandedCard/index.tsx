import React, { useMemo, useState } from "react";
import { t } from "i18next";

import {
  Container,
  CardHeader,
  CardHeaderLeft,
  CardTitle,
  CardDesc,
  CardBody,
  ChevronBtn,
} from "./styles";

import { Input } from "../../../Input";
import SelectStatusDiagnose from "../../../Pages/DiagnoseFeedback/SelectStatusDiagnose";
import { ICause } from "../../../../services/dtos/ICause";

interface ICauseExpandedCardProps {
    cause: ICause;
    updateComment: (id: number, comment: string) => void;
    updateStatus: (id: number, status: string) => void;
}

export function CauseExpandedCard({ cause, updateComment, updateStatus }: ICauseExpandedCardProps) {
    const [expanded, setExpanded] = useState(true);
    return (
        <Container>
            <CardHeader onPress={() => setExpanded(value => !!value)}>
            <CardHeaderLeft>
                <CardTitle>{cause.causesType.title}</CardTitle>
            </CardHeaderLeft>
            <ChevronBtn name={expanded ? "chevron-up" : "chevron-down"} />
            </CardHeader>

            {expanded && (
            <CardBody>
                <CardDesc>{cause.causesType.title}</CardDesc>

                {/* Comentário */}
                <Input
                placeholder={t("index.addCommentsIfNecessary")}
                value={""}
                onChangeText={(txt) => updateComment(cause.causeId, txt)}
                style={{ width: "100%" }}
                />

                {/* Status */}
                <SelectStatusDiagnose
                editable
                selected={cause.status as any}
                onSelect={(value) => updateStatus(cause.causeId, value)}
                />
            </CardBody>
            )}
        </Container>
    );
}
