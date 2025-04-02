export function convertFloatToString(number: number, fixed: number) {
    return number.toLocaleString('pt-BR',{minimumFractionDigits: fixed});
}
