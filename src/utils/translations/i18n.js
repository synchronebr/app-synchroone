import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './languages/en.json'
import pt from './languages/pt.json'
import es from './languages/es.json'

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: 'pt',
    resources: {
        pt: pt,
        en: en,
        es: es,
    },
    react: {
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false,
    }
})

export default i18n;