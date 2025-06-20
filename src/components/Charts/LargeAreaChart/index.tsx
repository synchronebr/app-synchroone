import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Dimensions, StyleSheet, GestureResponderEvent } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryLegend,
  VictoryTheme,
  VictoryLabel,
  createContainer,
} from "victory-native";

interface LargeAreaChartProps {
  data: {
    xAxis: number[];
    x: { value: number }[];
    y: { value: number }[];
    z: { value: number }[];
  };
  actionType?: "A" | "V" | "T";
  safeLines?: Record<string, number>;
}

const ZoomVoronoi = createContainer("zoom", "voronoi");

export function LargeAreaChart({
  data,
  actionType = "A",
  safeLines = {},
}: LargeAreaChartProps) {
  const [xDomain, setXDomain] = useState<[number, number]>();
  const [visible, setVisible] = useState({ X: true, Y: true, Z: true });
  const [hovered, setHovered] = useState<string | null>(null);
  const { width } = Dimensions.get("window");

  // Limpar zoom sempre que a série de dados mudar
  useEffect(() => {
    setXDomain(undefined);
  }, [data.xAxis]);

  // Label do eixo Y
  const yLabel = useMemo(() => {
    switch (actionType) {
      case "A":
        return "Aceleração RMS [G]";
      case "V":
        return "Velocidade RMS [m/s²]";
      case "T":
        return "Temperatura [°C]";
      default:
        return "";
    }
  }, [actionType]);

  // Gera séries de linha + ponto
  const makeSeries = useCallback(
    (axis: "X" | "Y" | "Z", color: string, values: { value: number }[]) => {
      const pts = data.xAxis.map((x, i) => ({ x, y: values[i].value }));
      const opacity = hovered === axis ? 1 : 0.2;
      if (!visible[axis]) return null;
      return (
        <React.Fragment key={axis}>
          <VictoryLine
            name={axis}
            data={pts}
            style={{ data: { stroke: color, strokeWidth: 2, opacity } }}
          />
          <VictoryScatter
            data={pts}
            size={3}
            style={{ data: { fill: color, opacity } }}
          />
        </React.Fragment>
      );
    },
    [data, visible, hovered]
  );

  // Safe lines (warn/danger)
  const safeShapes = useMemo(() => {
    const lines: React.ReactNode[] = [];
    let red = 0;
    let yellow = 0;

    if (
      actionType === "T" &&
      safeLines.temperatureDangerLimit &&
      safeLines.temperatureWarnLimit
    ) {
      red = safeLines.temperatureDangerLimit;
      yellow = safeLines.temperatureWarnLimit;
    } else {
      (["X", "Y", "Z"] as const).forEach((axis) => {
        if (!visible[axis]) return;
        const keyR =
          axis === "X"
            ? actionType === "A"
              ? "accelDangerLimitX"
              : "velocityDangerLimitX"
            : axis === "Y"
            ? actionType === "A"
              ? "accelDangerLimitY"
              : "velocityDangerLimitY"
            : actionType === "A"
            ? "accelDangerLimitZ"
            : actionType === "V"
            ? "velocityDangerLimitZ"
            : "temperatureDangerLimit";
        const keyY = keyR.replace("Danger", "Warn");
        red = safeLines[keyR] ?? red;
        yellow = safeLines[keyY] ?? yellow;
      });
    }

    if (red && yellow) {
      ;[
        { y: red, color: "red" },
        { y: yellow, color: "gold" },
      ].forEach(({ y, color }) =>
        lines.push(
          <VictoryLine
            key={color}
            data={[
              { x: data.xAxis[0], y },
              { x: data.xAxis[data.xAxis.length - 1], y },
            ]}
            style={{ data: { stroke: color, strokeDasharray: "5,5", strokeWidth: 1.5 } }}
          />
        )
      );
    }
    return lines;
  }, [actionType, safeLines, visible, data.xAxis]);

  // Calcular yDomain a partir de todos os pontos
  const yDomain = useMemo<[number, number]>(() => {
    const all = [
      ...data.x.map((p) => p.value),
      ...data.y.map((p) => p.value),
      ...data.z.map((p) => p.value),
    ];
    const min = Math.min(...all);
    const max = Math.max(...all);
    const pad = (max - min) * 0.1;
    return [min - pad, max + pad];
  }, [data]);

  // Dados da legenda e toggle
  const legendData = [
    { name: "Horizontal", symbol: { fill: "purple" } },
    { name: "Vertical", symbol: { fill: "blue" } },
    { name: "Axial", symbol: { fill: "orange" } },
  ];
  const onLegendPress = (i: number) => {
    const axis = i === 0 ? "X" : i === 1 ? "Y" : "Z";
    setVisible((v) => ({ ...v, [axis]: !v[axis] }));
  };

  return (
    <View style={styles.wrapper}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={width}
        height={300}
        domain={{
          x: xDomain ?? [data.xAxis[0], data.xAxis[data.xAxis.length - 1]],
          y: yDomain,
        }}
        domainPadding={{ y: 10 }}
        padding={{ top: 20, bottom: 50, left: 60, right: 30 }}
        containerComponent={
          <ZoomVoronoi
            voronoiDimension="x"
            zoomDimension="x"
            labels={() => null}
            onActivated={(pts) => setHovered(pts[0]?.childName || null)}
            onZoomDomainChange={(d) => d.x && setXDomain(d.x)}
            responsive={false}
          />
        }
      >
        <VictoryAxis tickValues={data.xAxis} />
        <VictoryAxis
          dependentAxis
          label={yLabel}
          axisLabelComponent={<VictoryLabel dy={-40} />}
        />

        {makeSeries("X", "purple", data.x)}
        {makeSeries("Y", "blue", data.y)}
        {makeSeries("Z", "orange", data.z)}
        {safeShapes}
      </VictoryChart>

      <VictoryLegend
        x={50}
        orientation="horizontal"
        gutter={20}
        data={legendData}
        style={{
          labels: { fill: "black", fontSize: 12 },
          data: { opacity: 1 },
        }}
        events={[
          {
            target: "data",
            eventHandlers: {
              onPress: (_e, props) => {
                onLegendPress(props.index);
                return [];
              },
            },
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
});
ç