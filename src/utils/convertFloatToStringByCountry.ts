export function convertFloatToStringByCountry(
  number: number,
  fixed: number,
  country = 'BR'
) {
  const localesByCountry: Record<string, string> = {
    BR: 'pt-BR',
    US: 'en-US',
    MX: 'es-MX',
    ES: 'es-ES',
    FR: 'fr-FR',
    DE: 'de-DE',
    IT: 'it-IT',
    JP: 'ja-JP',
    CN: 'zh-CN',
    KR: 'ko-KR',
    IN: 'en-IN',
    // adicione mais se precisar
  };

  const locale = localesByCountry[country.toUpperCase()] || 'en-US';

  return number.toLocaleString(locale, {
    minimumFractionDigits: fixed,
    maximumFractionDigits: fixed,
  });
}
