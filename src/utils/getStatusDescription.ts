export function getStatusDescription(status: string) {
    const statusDescriptions = {
        'S': 'Seguro',
        'W': 'Alerta',
        'D': 'Perigo',
    }

    return statusDescriptions[status];
}