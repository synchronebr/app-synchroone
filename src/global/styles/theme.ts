import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default {
  colors: {
    primary: "#1E293B",
    secondary: "#0284C7",
    secondary_light: "#0284C71A",
    dark: "#0A0A0A",
    light: "#FAFAFA",
    gray: "#CBD5E1",
    gray_dark: "#94A3B8",
    danger: "#EF4444",
    warning: "#FACC15",
    success: "#16A34A",
  },
  fonts: {
    medium: "Montserrat_400Regular",
    semiBold: "Montserrat_600SemiBold",
    bold: "Montserrat_700Bold",
  },
  fontSize: {
    smallest: RFValue(Platform.OS === "android" ? 8 : 6),
    smaller: RFValue(Platform.OS === "android" ? 10 : 8),
    normal: RFValue(Platform.OS === "android" ? 12 : 10),
    larger: RFValue(Platform.OS === "android" ? 14 : 12),
    largest: RFValue(Platform.OS === "android" ? 16 : 14),
  },
};
