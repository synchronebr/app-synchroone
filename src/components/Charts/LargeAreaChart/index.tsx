import React, { useMemo, useRef } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

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

export function LargeAreaChart({
  data,
  actionType = "A",
}: LargeAreaChartProps) {
  const { width } = Dimensions.get("window");
  const webviewRef = useRef(null);

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

  const xLabels = data.xAxis.map((date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  });

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
    <style>
      html, body, #main {
        margin: 0;
        padding: 0;
        height: 100%;
        background: #fff;
      }
    </style>
  </head>
  <body>
    <div id="main" style="height: 100%; width: 100%;"></div>
    <script>
      const chart = echarts.init(document.getElementById('main'));

      const option = {
        tooltip: { trigger: 'axis' },
        legend: {
          data: ['Horizontal', 'Vertical', 'Axial'],
          selectedMode: 'multiple',
          textStyle: { fontSize: 36 }
        },
        xAxis: {
          type: 'category',
          data: ${JSON.stringify(xLabels)},
          axisLabel: { fontSize: 25 }
        },
        yAxis: {
          type: 'value',
          name: '${yLabel}',
          nameLocation: 'middle',
          nameRotate: 90,
          nameGap: 50,
          nameGap: 70,  
          nameTextStyle: { fontSize: 30 },
          axisLabel: { fontSize: 30 }
        },
        dataZoom: [{ type: 'slider', start: 0, end: 100 }],
        series: [
          {
            name: 'Horizontal',
            type: 'line',
            data: ${JSON.stringify(data.x.map((d) => d.value))},
            smooth: true,
            lineStyle: { color: 'purple', width: 6 },
            itemStyle: { color: 'purple' },
            symbolSize: 8
          },
          {
            name: 'Vertical',
            type: 'line',
            data: ${JSON.stringify(data.y.map((d) => d.value))},
            smooth: true,
            lineStyle: { color: 'blue', width: 6 },
            itemStyle: { color: 'blue' },
            symbolSize: 8
          },
          {
            name: 'Axial',
            type: 'line',
            data: ${JSON.stringify(data.z.map((d) => d.value))},
            smooth: true,
            lineStyle: { color: 'orange', width: 6 },
            itemStyle: { color: 'orange' },
            symbolSize: 8
          }
        ]
      };

      chart.setOption(option);
    </script>
  </body>
  </html>
`;

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        javaScriptEnabled
        domStorageEnabled
        scalesPageToFit
        scrollEnabled={false}
        style={{ height: 300, width: width - 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
