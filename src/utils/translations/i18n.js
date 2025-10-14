import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './languages/en-US.json'
import pt from './languages/pt-BR.json'
import es from './languages/es-ES.json'

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: 'pt-BR',
    resources: {
        'pt-BR': pt,
        'en-US': en,
        'es-ES': es,
    },
    react: {
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false,
    }
})

export default i18n;