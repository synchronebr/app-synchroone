export function convertStringToFloatByCountry(
  value: string,
  country = "BR"
): number {
  const localesByCountry: Record<string, { decimal: string; thousand: string }> = {
    BR: { decimal: ",", thousand: "." },
    US: { decimal: ".", thousand: "," },
    MX: { decimal: ".", thousand: "," },
    ES: { decimal: ",", thousand: "." },
    FR: { decimal: ",", thousand: " " },
    DE: { decimal: ",", thousand: "." },
    IT: { decimal: ",", thousand: "." },
    JP: { decimal: ".", thousand: "," },
    CN: { decimal: ".", thousand: "," },
    KR: { decimal: ".", thousand: "," },
    IN: { decimal: ".", thousand: "," },
  };

  const { decimal, thousand } =
    localesByCountry[country.toUpperCase()] || localesByCountry["US"];

  // Remove espaços e símbolos não numéricos (exceto separadores e sinal)
  let normalized = value.replace(/\s+/g, "").replace(/[^\d\-,.]/g, "");

  // Remove separadores de milhar
  const regexThousand = new RegExp(`\\${thousand}`, "g");
  normalized = normalized.replace(regexThousand, "");

  // Substitui separador decimal pelo ponto (para parseFloat)
  const regexDecimal = new RegExp(`\\${decimal}`, "g");
  normalized = normalized.replace(regexDecimal, ".");

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}
