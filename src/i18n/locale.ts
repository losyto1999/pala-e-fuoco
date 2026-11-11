import { useTranslation } from 'react-i18next'

export type Lang = 'it' | 'en'

/** Locale per `Intl`: italiano o inglese britannico (stesso ordine giorno-mese, 24 ore). */
const LOCALES: Record<Lang, string> = { it: 'it-IT', en: 'en-GB' }

/**
 * Lingua attiva (ridotta a it/en: `i18n.language` può essere anche `en-US`) e relativo locale `Intl`.
 * La lingua si può cambiare in qualsiasi momento dal selettore nella nav: prezzi e testi vanno
 * formattati al render, mai una volta sola a livello di modulo.
 */
export function useLocale() {
    const { i18n } = useTranslation()
    const lang: Lang = i18n.resolvedLanguage === 'en' ? 'en' : 'it'
    return { lang, locale: LOCALES[lang] }
}
