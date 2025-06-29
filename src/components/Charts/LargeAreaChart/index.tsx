import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryLegend,
  VictoryTheme,
  VictoryLabel,
  createContainer,
  VictoryClipContainer,
} from "victory-native";

interface LargeAreaChartProps {
  data: {
    xAxis: string[]; // ISO date strings
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
  const [focusedAxis, setFocusedAxis] = useState<"X" | "Y" | "Z" | null>(null);
  const { width } = Dimensions.get("window");

  const xAxisTimestamps = useMemo(
    () => data.xAxis.map((d) => new Date(d).getTime()),
    [data.xAxis]
  );

  useEffect(() => {
    setXDomain(undefined);
  }, [data.xAxis]);

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

  const makeSeries = useCallback(
    (
      axis: "X" | "Y" | "Z",
      color: string,
      values: { value: number }[] = []
    ) => {
      if (
        !xAxisTimestamps ||
        !values ||
        xAxisTimestamps.length !== values.length
      ) {
        return null;
      }

      const pts = xAxisTimestamps
        .map((x, i) => {
          const yVal = values[i]?.value;
          if (yVal === undefined || yVal === null) return null;
          return { x, y: yVal };
        })
        .filter((pt): pt is { x: number; y: number } => pt !== null);

      const isFocused = focusedAxis === null || focusedAxis === axis;

      return (
        <React.Fragment key={axis}>
          <VictoryLine
            name={`line-${axis}`}
            data={pts}
            style={{
              data: {
                stroke: color,
                strokeWidth: 2,
                opacity: isFocused ? 1 : 0.2,
              },
            }}
            groupComponent={
              <VictoryClipContainer clipPadding={{ top: 5, right: 0 }} />
            }
          />
          <VictoryScatter
            name={`scatter-${axis}`}
            data={pts}
            size={3}
            style={{
              data: {
                fill: color,
                opacity: isFocused ? 1 : 0.2,
              },
            }}
            groupComponent={
              <VictoryClipContainer clipPadding={{ top: 5, right: 0 }} />
            }
          />
        </React.Fragment>
      );
    },
    [xAxisTimestamps, focusedAxis]
  );

  const yDomain = useMemo<[number, number]>(() => {
    const allValues: number[] = [];
    if (data.x) allValues.push(...data.x.map((p) => p.value));
    if (data.y) allValues.push(...data.y.map((p) => p.value));
    if (data.z) allValues.push(...data.z.map((p) => p.value));
    if (allValues.length === 0) return [0, 1];

    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const pad = (max - min) * 0.05 || 1;
    return [min - pad, max + pad];
  }, [data]);

  const xDomainSafe = useMemo<[number, number]>(() => {
    if (!xDomain) {
      return [xAxisTimestamps[0], xAxisTimestamps[xAxisTimestamps.length - 1]];
    }
    const minX = Math.max(xDomain[0], xAxisTimestamps[0]);
    const maxX = Math.min(
      xDomain[1],
      xAxisTimestamps[xAxisTimestamps.length - 1]
    );
    return [minX, maxX];
  }, [xDomain, xAxisTimestamps]);

  const legendData = [
    { name: "Horizontal", symbol: { fill: "purple" } },
    { name: "Vertical", symbol: { fill: "blue" } },
    { name: "Axial", symbol: { fill: "orange" } },
  ];

  const onLegendPress = (index: number) => {
    const axis = index === 0 ? "X" : index === 1 ? "Y" : "Z";
    setFocusedAxis((prev) => (prev === axis ? null : axis));
  };

  return (
    <View style={styles.wrapper}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={width - 40}
        height={300}
        domain={{
          x: xDomainSafe,
          y: yDomain,
        }}
        domainPadding={{ x: 20 }}
        padding={{ top: 30, bottom: 50, left: 60, right: 30 }}
        scale={{ x: "time" }}
        containerComponent={
          <ZoomVoronoi
            voronoiDimension="x"
            zoomDimension="x"
            labels={() => null}
            onZoomDomainChange={(d) => d.x && setXDomain(d.x)}
            responsive={false}
          />
        }
      >
        <VictoryAxis
          tickValues={xAxisTimestamps}
          tickFormat={(t) => {
            const date = new Date(t);
            return `${date.getDate()}/${
              date.getMonth() + 1
            } ${date.getHours()}:${date
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;
          }}
          fixLabelOverlap
        />
        <VictoryAxis
          dependentAxis
          label={yLabel}
          axisLabelComponent={<VictoryLabel dy={-40} />}
        />

        {makeSeries("Y", "blue", data.y)}
        {makeSeries("X", "purple", data.x)}
        {makeSeries("Z", "orange", data.z)}
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
              onPressIn: (_e, props) => {
                onLegendPress(props.index);
                return [];
              },
            },
          },
          {
            target: "labels",
            eventHandlers: {
              onPressIn: (_e, props) => {
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
  },
});
