import React, { useMemo } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import {
  Wrapper,
  Item,
  Head,
  Title,
  SubTitle,
  Track,
  Fill,
  FillValue,
} from "./styles";

export interface DiagnoseByPiece {
  description: string;
  count: number;
  pathNames?: string[];
}

interface BarChartDiagnosesAssetsProps {
  items: DiagnoseByPiece[];
}

const BarChartDiagnosesAssets: React.FC<BarChartDiagnosesAssetsProps> = ({
  items,
}) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  const theme = useTheme() as any;

  const { sorted, maxCount } = useMemo(() => {
    const sortedArr = [...items].sort((a, b) => b.count - a.count);
    const max = Math.max(sortedArr[0]?.count ?? 0, 1);
    return { sorted: sortedArr, maxCount: max };
  }, [items]);

  return (
    <Wrapper>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingRight: 4, paddingVertical: 2 }}
        showsVerticalScrollIndicator={false}
      >
        {sorted.map((it, idx) => {
          const pct = Math.min((it.count / maxCount) * 100, 100);
          const hasPaths = Array.isArray(it.pathNames) && it.pathNames.length > 0;
          const paths = hasPaths ? it.pathNames!.join(", ") : "";

          return (
            <Item key={`${it.description}-${idx}`} accessible accessibilityLabel={`${it.description}, ${it.count}`}>
              <Head>
                <Title numberOfLines={1} ellipsizeMode="tail">
                  {it.description}
                </Title>
                {hasPaths && (
                  <SubTitle numberOfLines={1} ellipsizeMode="tail">
                    {paths}
                  </SubTitle>
                )}
              </Head>

              <Track
                accessibilityRole="progressbar"
                accessibilityValue={{ now: it.count, min: 0, max: maxCount }}
                style={{
                  borderColor: theme?.colors?.gray_light ?? "rgba(0,0,0,0.12)",
                  backgroundColor: theme?.colors?.muted ?? "rgba(0,0,0,0.04)",
                }}
              >
                <Fill
                  style={{
                    width: `${pct}%`,
                    backgroundColor: theme?.colors?.primary ?? "#0ea5e9",
                  }}
                >
                  <FillValue numberOfLines={1} ellipsizeMode="clip">
                    {it.count}
                  </FillValue>
                </Fill>
              </Track>
            </Item>
          );
        })}
      </ScrollView>
    </Wrapper>
  );
};

export default BarChartDiagnosesAssets;
