import { useTranslation } from 'react-i18next'
import { useLocale } from '../i18n/locale'
import { formatPrice, type MenuEntry } from '../data/menu'

interface PhotoPrintProps {
    /** Voce del menù; senza foto non viene mostrato nulla. */
    item: MenuEntry | undefined
    /** Verso della leggera inclinazione, come una foto appoggiata sul foglio. */
    tilt?: 'left' | 'right'
    /** Didascalia col solo nome, dove prezzo e ingredienti sono già scritti accanto (pagina menù). */
    nameOnly?: boolean
    eager?: boolean
    className?: string
}

/** Foto di una pizza trattata come una stampa, con la didascalia presa dal menù. */
export function PhotoPrint({
    item,
    tilt = 'left',
    nameOnly = false,
    eager = false,
    className = '',
}: PhotoPrintProps) {
    const { t } = useTranslation()
    const { locale } = useLocale()
    if (!item?.image) return null

    return (
        <figure
            className={`bg-crema-50 p-2 shadow-stampa ring-1 ring-carbone-900/10 hover:rotate-0 motion-safe:transition-transform motion-safe:duration-500 ${
                tilt === 'left' ? '-rotate-1' : 'rotate-1'
            } ${className}`}
        >
            <img
                src={item.image}
                alt={t('menu.photoAlt', { name: item.name })}
                width={800}
                height={533}
                loading={eager ? 'eager' : 'lazy'}
                draggable={false}
                className="aspect-3/2 w-full object-cover"
            />
            {nameOnly ? (
                <figcaption className="px-1.5 pb-0.5 pt-2.5 font-display font-bold text-carbone-900">
                    {item.name}
                </figcaption>
            ) : (
                <figcaption className="px-1.5 pb-1.5 pt-3">
                    <span className="flex items-baseline justify-between gap-3 font-display font-bold text-carbone-900">
                        {item.name}
                        <span className="whitespace-nowrap tabular-nums text-terracotta-700">
                            {formatPrice(item.price, locale)}
                        </span>
                    </span>
                    <span className="mt-0.5 block text-sm italic leading-snug text-carbone-800/80">
                        {item.ingredients.join(', ')}
                    </span>
                </figcaption>
            )}
        </figure>
    )
}
