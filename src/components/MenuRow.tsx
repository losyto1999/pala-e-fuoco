import { useTranslation } from 'react-i18next'
import { useLocale } from '../i18n/locale'
import { formatPrice, type MenuEntry } from '../data/menu'

interface MenuRowProps {
    item: MenuEntry
    /** Voce raggiunta da un'ancora (es. dal muro dei nomi in home): si illumina per un attimo. */
    highlighted?: boolean
}

/** Una voce del menù come su un foglio stampato: nome, puntini di guida, prezzo. */
export function MenuRow({ item, highlighted = false }: MenuRowProps) {
    const { t } = useTranslation()
    const { locale } = useLocale()
    return (
        <li
            id={item.slug}
            className={`group scroll-mt-3 border-b border-carbone-900/15 px-2 py-5 transition-colors hover:bg-crema-100 sm:px-3 ${
                highlighted ? 'animate-segna' : ''
            }`}
        >
            <div className="flex items-baseline gap-3">
                <h2 className="text-xl font-bold sm:text-[1.4rem]">{item.name}</h2>
                <span
                    aria-hidden="true"
                    className="min-w-6 flex-1 -translate-y-[0.3em] border-b-2 border-dotted border-carbone-900/35 transition-colors group-hover:border-solid group-hover:border-terracotta-700"
                />
                <span className="whitespace-nowrap font-display text-lg font-bold tabular-nums text-terracotta-700">
                    {item.addon && '+ '}
                    {formatPrice(item.price, locale)}
                </span>
            </div>

            <p className="mt-1.5 italic leading-relaxed text-carbone-800/85">
                {item.ingredients.join(', ')}
                {item.vegetariana && (
                    <span className="ml-2.5 whitespace-nowrap font-display text-[0.7rem] font-bold not-italic uppercase tracking-[0.16em] text-basilico-600">
                        {t('menu.vegetarian')}
                    </span>
                )}
            </p>
        </li>
    )
}
