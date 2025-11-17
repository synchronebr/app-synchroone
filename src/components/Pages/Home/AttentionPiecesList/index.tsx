import React, { useCallback, memo, useState } from "react";
import { FlatList, ListRenderItem, Linking, ImageErrorEventData, NativeSyntheticEvent } from "react-native";
import {
  Container,
  Row,
  Left,
  AvatarWrap,
  AvatarImage,
  AvatarFallback,
  Texts,
  Title,
  SubTitle,
  Badge,
  BadgeText,
  Separator
} from "./styles";
import { useTheme } from "styled-components/native";
import { t } from "i18next";

export type AttentionPiece = {
  pieceId: number;
  description: string;
  image?: string | null;
  securityStatus: "W" | "D" | string;
  securityStatusDate: string; // ISO
  pathNames?: string[];
};

export interface AttentionPiecesListProps {
  items: AttentionPiece[];
  /** Base URL para abrir o item (ex.: https://app.suaempresa.com) */
  baseUrl?: string;
  /** Caso use React Navigation, você pode passar uma ação customizada */
  onPressItem?: (item: AttentionPiece) => void;
}

function formatDatePt(dateISO: string) {
  const d = new Date(dateISO);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function getInitials(text: string) {
  if (!text) return "AT";
  const parts = text.trim().split(/\s+/).slice(0, 2);
  const initials = parts.map(p => p[0]?.toUpperCase() ?? "").join("");
  return initials || "AT";
}

/** Item da lista separado — aqui sim podemos usar hooks */
const ListItem = memo(function ListItem({
  item,
  onPress,
}: {
  item: AttentionPiece;
  onPress: (item: AttentionPiece) => void;
}) {
  const THEME = useTheme();
  const imageSrc = item.image || "";
  const paths = (item.pathNames ?? []).join(" - ");

  const STATUS: Record<string, { label: string; bg: string; fg: string }> = {
        W: { label: t('index.securityStatus-W'), bg: THEME.colors.warning_dark, fg: THEME.colors.light }, 
        D: { label: t('index.securityStatus-D'), bg: THEME.colors.danger, fg: THEME.colors.light }, 
    };

  const s = STATUS[item.securityStatus] ?? {
    label: item.securityStatus || "—",
    bg: "#F5F5F5",
    fg: "#374151",
  };

  const [imgError, setImgError] = useState(false);
  const onImgError = (_e: NativeSyntheticEvent<ImageErrorEventData>) => setImgError(true);

  return (
    <Row>
      <Left>
        <AvatarWrap>
          {!imgError && !!imageSrc ? (
            <AvatarImage source={{ uri: imageSrc }} onError={onImgError} />
          ) : (
            <AvatarFallback>{getInitials(item.description)}</AvatarFallback>
          )}
        </AvatarWrap>

        <Texts>
            <Title numberOfLines={1} ellipsizeMode="tail">
                {item.description}
                {paths ? (
                <Title numberOfLines={1} ellipsizeMode="tail" $muted>
                    {" — "}{paths}
                </Title>
                ) : null}
            </Title>

            <SubTitle numberOfLines={1} ellipsizeMode="tail">
                Desde {formatDatePt(item.securityStatusDate)}
            </SubTitle>
        </Texts>
      </Left>

      <Badge style={{ backgroundColor: s.bg }} activeOpacity={0.7} onPress={() => onPress(item)}>
        <BadgeText style={{ color: s.fg }}>{s.label}</BadgeText>
      </Badge>
    </Row>
  );
});

export default function AttentionPiecesList({
  items = [],
  baseUrl,
  onPressItem,
}: AttentionPiecesListProps) {
  const openItem = useCallback(
    (item: AttentionPiece) => {
      if (onPressItem) {
        onPressItem(item);
        return;
      }
      if (baseUrl) {
        // Linking.openURL(`${baseUrl}/assets/${item.pieceId}`);
      }
    },
    [baseUrl, onPressItem]
  );

  const renderItem: ListRenderItem<AttentionPiece> = ({ item }) => (
    <ListItem item={item} onPress={openItem} />
  );

  const keyExtractor = (it: AttentionPiece) => String(it.pieceId);

  return (
    <Container>
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingVertical: 4 }}
      />
    </Container>
  );
}
