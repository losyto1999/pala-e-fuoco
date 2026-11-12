import { useTranslation } from 'react-i18next'
import type { Lang } from '../i18n/locale'
import { useLocale } from '../i18n/locale'

const LANGS: Lang[] = ['it', 'en']

/**
 * Selettore IT/EN «a stampa», come le voci della nav: niente pillole, la lingua attiva è
 * sottolineata in terracotta. La scelta resta salvata nel browser (vedi i18n/index.ts).
 * `large` è la versione per la sidebar mobile, con aree di tocco più grandi.
 */
export function LanguageSwitch({ large = false }: { large?: boolean }) {
    const { t, i18n } = useTranslation()
    const { lang } = useLocale()

    function choose(next: Lang) {
        if (next === lang) return
        i18n.changeLanguage(next)
    }

    return (
        <div role="group" aria-label={t('nav.language')} className="flex shrink-0 items-baseline font-display">
            {LANGS.map((l, i) => (
                <span key={l} className="flex items-baseline">
                    {i > 0 && (
                        <span aria-hidden="true" className="text-carbone-900/35">
                            /
                        </span>
                    )}
                    <button
                        type="button"
                        lang={l}
                        aria-pressed={lang === l}
                        onClick={() => choose(l)}
                        className={`font-bold uppercase underline-offset-[0.4em] transition-colors ${
                            large
                                ? 'px-3 py-2.5 text-base tracking-[0.14em]'
                                : 'px-1 py-2 text-[0.8rem] tracking-[0.12em] sm:px-1.5'
                        } ${
                            lang === l
                                ? 'text-terracotta-700 underline decoration-2'
                                : 'text-carbone-900/70 hover:text-carbone-900'
                        }`}
                    >
                        {l}
                    </button>
                </span>
            ))}
        </div>
    )
}
