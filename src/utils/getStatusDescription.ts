import { t } from "i18next";

export function getStatusDescription(status: string) {
    const statusDescriptions = {
        'S': t('index.securityStatus-S'),
        'W': t('index.securityStatus-W'),
        'D': t('index.securityStatus-D'),
    }

    return statusDescriptions[status];
}