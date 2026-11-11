import { useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Reveal } from '../components/ui/Reveal'
import { MenuRow } from '../components/MenuRow'
import { PhotoPrint } from '../components/PhotoPrint'
import { INFO } from '../data/info'
import { GLUTEN_FREE_PRICE, type MenuEntry } from '../data/menu'
import { useMenu } from '../useMenu'
import { useScrollToHash } from '../useScrollToHash'

export function PizzeriaMenu() {
    const { t } = useTranslation()
    const menu = useMenu()
    const target = useScrollToHash()
    const [onlyVegetarian, setOnlyVegetarian] = useState(false)

    const vegetarianCount = menu.filter((item) => item.vegetariana).length
    const items = onlyVegetarian ? menu.filter((item) => item.vegetariana) : menu
    const glutenFree = useMemo<MenuEntry>(
        () => ({
            slug: 'senza-glutine',
            name: t('menu.glutenFree.name'),
            ingredients: [t('menu.glutenFree.note')],
            price: GLUTEN_FREE_PRICE,
            addon: true,
        }),
        [t],
    )
    const photos = items.filter((item) => item.image)

    return (
        <section className="px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:px-8">
            {/* Su desktop le foto stanno in una colonna a destra dell'elenco, con larghezze e
                rientri alternati; su mobile diventano una striscia orizzontale tra
                l'intestazione e l'elenco. */}
            <div className="mx-auto grid w-full max-w-6xl lg:grid-cols-12 lg:gap-x-8">
                <Reveal className="lg:col-span-7">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-terracotta-700">
                        {t('menu.kicker')}
                    </p>
                    <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
                        {t('menu.title')}
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed">
                        {t('menu.intro')}
                    </p>
                    <p className="mt-3 max-w-xl leading-relaxed text-carbone-800/85">
                        <Trans
                            t={t}
                            i18nKey="menu.phoneLine"
                            values={{ number: INFO.phone }}
                            components={{ phone: <span className="whitespace-nowrap font-semibold tabular-nums" /> }}
                        />
                    </p>

                    <label className="group mt-8 inline-flex cursor-pointer select-none items-center gap-3 font-display font-semibold text-carbone-900">
                        <input
                            type="checkbox"
                            checked={onlyVegetarian}
                            onChange={(e) => setOnlyVegetarian(e.target.checked)}
                            className="sr-only"
                        />
                        <span
                            aria-hidden="true"
                            className="grid size-5 place-items-center border-2 border-carbone-900 transition-colors group-hover:border-basilico-600 group-has-checked:border-basilico-600 group-has-checked:bg-basilico-600 group-has-focus-visible:outline-2 group-has-focus-visible:outline-offset-2 group-has-focus-visible:outline-terracotta-700"
                        >
                            <svg
                                viewBox="0 0 12 12"
                                className="hidden size-3 text-crema-50 group-has-checked:block"
                            >
                                <path
                                    d="M2 6.5 5 9.5 10.5 3"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                        </span>
                        {t('menu.onlyVegetarian', { n: vegetarianCount })}
                    </label>
                    <p aria-live="polite" className="sr-only">
                        {t('menu.shown', { count: items.length })}
                    </p>
                </Reveal>

                <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 py-3 sm:-mx-6 sm:px-6 lg:col-span-4 lg:col-start-9 lg:row-span-3 lg:row-start-1 lg:mx-0 lg:mt-0 lg:flex-col lg:gap-14 lg:overflow-visible lg:px-0 lg:pt-10">
                    {photos.map((item, i) => (
                        <PhotoPrint
                            key={item.slug}
                            item={item}
                            nameOnly
                            tilt={i % 2 === 0 ? 'right' : 'left'}
                            className={`w-[68%] shrink-0 snap-center sm:w-[42%] ${
                                i % 2 === 0 ? 'lg:w-full' : 'lg:ml-10 lg:w-[82%]'
                            }`}
                        />
                    ))}
                </div>

                <ul className="mt-6 border-t-[3px] border-double border-carbone-900 lg:col-span-7 lg:mt-12">
                    {items.map((item) => (
                        <MenuRow key={item.slug} item={item} highlighted={item.slug === target} />
                    ))}
                    <MenuRow item={glutenFree} />
                </ul>
            </div>
        </section>
    )
}
