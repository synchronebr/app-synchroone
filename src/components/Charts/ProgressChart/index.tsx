import React, { useMemo } from "react";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { convertFloatToStringByCountry } from "../../../utils/convertFloatToStringByCountry";

type Props = {
  size?: number;        // 72
  strokeWidth?: number; // 6
  colorBg?: string;     // "#e5e7eb"
  colorFg?: string;     // "#334155"
  percent: number;      // 0..100
  fontSize?: number;    // 14
  fontWeight?: string | number; // "700"
  country?: string;     // 'BR', 'US', etc
};

export default function ProgressChart({
  size = 72,
  strokeWidth = 6,
  colorBg = "#e5e7eb",
  colorFg = "#334155",
  percent,
  fontSize = 14,
  fontWeight = 700,
  country = 'BR',
}: Props) {
  const { r, c, cx, cy, dashArray, dashOffset } = useMemo(() => {
    const c = size / 2;
    const r = (size - strokeWidth) / 2;
    const dashArray = 2 * Math.PI * r;
    const clamped = Math.max(0, Math.min(100, percent));
    const dashOffset = dashArray * (1 - clamped / 100);
    return { r, c, cx: c, cy: c, dashArray, dashOffset };
  }, [size, strokeWidth, percent]);

  const formattedPercent = useMemo(
    () => `${convertFloatToStringByCountry(percent, 2, country)}%`,
    [percent, country]
  );

  console.log(percent);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* trilho */}
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={colorBg}
        strokeWidth={strokeWidth}
      />
      {/* progresso (rotacionado -90° para começar no topo) */}
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={colorFg}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        rotation={-90}
        origin={`${cx}, ${cy}`}
      />
      {/* texto central */}
      <SvgText
        x={cx}
        y={cy + fontSize * 0.35}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAnchor="middle"
        fill="rgba(15,23,42,0.9)"
      >
        {formattedPercent}
      </SvgText>
    </Svg>
  );
}
