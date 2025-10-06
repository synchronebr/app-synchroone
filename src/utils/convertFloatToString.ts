export function convertFloatToString(number: number, fixed: number, locale = 'pt-BR') {
    return number.toLocaleString(locale,{minimumFractionDigits: fixed});
}
