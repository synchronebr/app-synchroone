export type HistoryCardProps = {
  isLastCard?: boolean;
  type: Type;
};

export type HistoryCardStyleProps = {
  type: Type;
};

export type HistoryCardCircleStyleProps = {
  isLastCard?: boolean;
};

type Type = "success" | "danger" | "warning";
