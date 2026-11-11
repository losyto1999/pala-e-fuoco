import { Phone } from 'lucide-react'
import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/locale'
import { Reveal } from '../components/ui/Reveal'
import { OpeningStatus } from '../components/OpeningStatus'
import { PhotoPrint } from '../components/PhotoPrint'
import { StreetMap } from '../components/StreetMap'
import { HOURS, INFO } from '../data/info'
import { formatPrice } from '../data/menu'
import { useHours } from '../useHours'
import { useMenu } from '../useMenu'
import { useOpeningStatus } from '../useOpeningStatus'
import { useScrollToHash } from '../useScrollToHash'

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const KICKER = 'font-display text-xs font-bold uppercase tracking-[0.2em] text-terracotta-700'

export function PizzeriaHome() {
    useScrollToHash()
    const { t } = useTranslation()
    const { locale } = useLocale()
    const hours = useHours()
    const menu = useMenu()
    const { today } = useOpeningStatus()
    const closedToday = today === HOURS.closedDay

    const pizza = (slug: string) => menu.find((item) => item.slug === slug)
    // Il riassunto del menù in home si calcola dai dati, così resta giusto se il menù cambia.
    const { cheapest, priciest, vegetarianCount } = useMemo(() => {
        const byPrice = [...menu].sort((a, b) => a.price - b.price)
        return {
            cheapest: byPrice[0],
            priciest: byPrice[byPrice.length - 1],
            vegetarianCount: menu.filter((item) => item.vegetariana).length,
        }
    }, [menu])

    return (
        <>
            {/* Apertura: il titolo occupa tutta la larghezza, come l'intestazione di un menù
                stampato. Sotto un doppio filetto, una striscia a tre: la foto piccola, il testo e
                un riquadro "scontrino" con stato di apertura, orari e pulsanti. Su mobile la foto
                scende in fondo, così il pulsante del menù resta nella prima schermata. */}
            <section className="px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-28">
                <div className="mx-auto w-full max-w-6xl">
                    <Reveal>
                        <p className={KICKER}>
                            {t('home.kickerPlace')}
                            <span className="hidden sm:inline"> · </span>
                            <span className="block sm:inline">{t('home.kickerSince')}</span>
                        </p>

                        <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5rem]">
                            {t('home.title')}
                        </h1>
                    </Reveal>

                    <div className="mt-10 grid gap-10 border-t-[3px] border-double border-carbone-900 pt-10 md:grid-cols-12 md:gap-x-8 lg:mt-14 lg:pt-12">
                        <Reveal
                            delay={0.06}
                            className="order-last ml-auto w-56 sm:w-64 md:order-none md:col-span-4 md:ml-0 md:w-auto lg:col-span-3"
                        >
                            <PhotoPrint item={pizza('margherita')} tilt="left" eager />
                        </Reveal>

                        <Reveal delay={0.1} className="md:col-span-8 lg:col-span-5">
                            <p className="max-w-xl text-lg leading-relaxed">
                                {t('home.intro')}
                            </p>
                        </Reveal>

                        <Reveal
                            delay={0.14}
                            className="border-t border-dotted border-carbone-900/40 pt-8 md:col-span-12 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
                        >
                            <OpeningStatus className="text-[0.95rem] font-semibold text-carbone-900" />
                            <p className="mt-1.5 pl-5 text-sm text-carbone-800/80">
                                {hours.summary(capitalize(hours.openDays))}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 lg:flex-col lg:items-start">
                                <Link
                                    to="/menu"
                                    className="group inline-flex items-center gap-2.5 rounded-[3px] bg-terracotta-700 px-6 py-3.5 font-display font-bold text-crema-50 transition-colors hover:bg-terracotta-800 active:translate-y-px"
                                >
                                    {t('home.seeMenu')}
                                    <span
                                        aria-hidden="true"
                                        className="transition-transform group-hover:translate-x-1"
                                    >
                                        →
                                    </span>
                                </Link>
                                {/* Mockato: progetto dimostrativo, il pulsante non avvia una chiamata reale. */}
                                <button
                                    type="button"
                                    className="font-display font-semibold text-carbone-900 underline decoration-terracotta-700/50 decoration-2 underline-offset-[0.35em] transition-colors hover:decoration-terracotta-700"
                                >
                                    <Trans
                                        t={t}
                                        i18nKey="home.callUs"
                                        values={{ number: INFO.phone }}
                                        components={{ phone: <span className="tabular-nums" /> }}
                                    />
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section
                id="pizzeria"
                className="border-t-[3px] border-double border-carbone-900 px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28"
            >
                <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
                    <Reveal className="lg:col-span-4 lg:row-start-1">
                        <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                            {t('home.storyTitle')}
                        </h2>
                    </Reveal>

                    <Reveal
                        delay={0.06}
                        className="max-w-2xl space-y-6 text-lg leading-relaxed lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1"
                    >
                        <p>
                            {t('home.story1')}
                        </p>
                        <p>
                            {t('home.story2')}
                        </p>
                        <p>
                            {t('home.story3')}
                        </p>
                    </Reveal>

                    <Reveal
                        delay={0.1}
                        className="ml-auto w-4/5 max-w-sm lg:col-span-4 lg:row-start-2 lg:ml-0 lg:w-auto lg:pr-6"
                    >
                        <PhotoPrint item={pizza('marinara')} tilt="left" />
                    </Reveal>
                </div>

                <Reveal className="mx-auto w-full max-w-6xl">
                    <p className="pb-20 pt-16 font-display text-[3.4rem] font-black leading-[0.92] tracking-tight text-terracotta-700 sm:text-7xl lg:pb-28 lg:pt-24 lg:text-[8.5rem]">
                        {t('home.slogan')}
                    </p>
                </Reveal>
            </section>

            <section className="border-t-[3px] border-double border-carbone-900 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
                <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-12 lg:gap-8">
                    <Reveal className="lg:col-span-7">
                        <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                            {t('home.cardTitle')}
                        </h2>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed">
                            {t('home.cardSummary', {
                                total: menu.length,
                                vegetarian: vegetarianCount,
                                cheapest: cheapest.name,
                                cheapestPrice: formatPrice(cheapest.price, locale),
                                priciest: priciest.name,
                                priciestPrice: formatPrice(priciest.price, locale),
                            })}
                        </p>

                        <ul className="mt-9 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 font-display text-[1.45rem] font-bold leading-snug sm:text-[2.1rem]">
                            {menu.map((item, i) => (
                                <li key={item.slug} className="flex items-baseline gap-3">
                                    <Link
                                        to={`/menu#${item.slug}`}
                                        className="text-carbone-900 decoration-terracotta-700 decoration-[3px] underline-offset-[0.18em] transition-colors hover:text-terracotta-700 hover:underline"
                                    >
                                        {item.name}
                                    </Link>
                                    {i < menu.length - 1 && (
                                        <span aria-hidden="true" className="text-terracotta-600">
                                            ·
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/menu"
                            className="group mt-10 inline-flex items-center gap-2.5 rounded-[3px] bg-terracotta-700 px-6 py-3.5 font-display font-bold text-crema-50 transition-colors hover:bg-terracotta-800 active:translate-y-px"
                        >
                            {t('home.fullMenu')}
                            <span
                                aria-hidden="true"
                                className="transition-transform group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </Link>
                    </Reveal>

                    <Reveal delay={0.08} className="w-11/12 max-w-md lg:col-span-4 lg:col-start-9 lg:mt-28 lg:w-auto">
                        <PhotoPrint item={pizza('diavola')} tilt="right" />
                    </Reveal>
                </div>
            </section>

            <section
                id="contatti"
                className="bg-carbone-900 px-4 py-20 text-crema-100 sm:px-6 lg:px-8 lg:py-28"
            >
                <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-12 lg:gap-8">
                    <Reveal className="lg:col-span-5">
                        <h2 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-crema-50 sm:text-[2.75rem]">
                            {t('home.contactTitle')}
                        </h2>

                        <dl className="mt-10 border-t border-crema-100/20 font-display text-lg">
                            <div
                                className={`flex items-baseline justify-between gap-4 border-b border-crema-100/20 py-3.5 ${
                                    closedToday ? '' : 'text-grano-400'
                                }`}
                            >
                                <dt className="font-semibold">
                                    {capitalize(hours.openDays)}
                                    {!closedToday && <span className="ml-3 text-sm">{t('hours.today')}</span>}
                                </dt>
                                <dd className="tabular-nums">
                                    {HOURS.opens}–{HOURS.closes}
                                </dd>
                            </div>
                            <div
                                className={`flex items-baseline justify-between gap-4 border-b border-crema-100/20 py-3.5 ${
                                    closedToday ? 'text-grano-400' : ''
                                }`}
                            >
                                <dt className="font-semibold">
                                    {capitalize(hours.closedDay)}
                                    {closedToday && <span className="ml-3 text-sm">{t('hours.today')}</span>}
                                </dt>
                                <dd>{t('hours.closed')}</dd>
                            </div>
                        </dl>

                        <OpeningStatus dark className="mt-5 text-crema-100" />

                        <p className="mt-10 max-w-md text-lg leading-relaxed text-crema-100/85">
                            {t('home.contactText')}
                        </p>

                        {/* Mockato: progetto dimostrativo, il pulsante non avvia una chiamata reale. */}
                        <button
                            type="button"
                            className="mt-7 inline-flex items-center gap-3 rounded-[3px] bg-terracotta-700 px-6 py-3.5 font-display text-lg font-bold text-crema-50 transition-colors hover:bg-terracotta-600 active:translate-y-px"
                        >
                            <Phone className="size-5" />
                            <span className="tabular-nums">{INFO.phone}</span>
                        </button>
                    </Reveal>

                    <Reveal delay={0.08} className="flex flex-col lg:col-span-6 lg:col-start-7 lg:pt-2">
                        <div className="border border-crema-100/25 p-1.5 lg:flex lg:min-h-[26rem] lg:flex-1 lg:flex-col">
                            {/* Cartina assoluta: in Safari un elemento in un box con aspect-ratio può allargare la colonna oltre lo schermo. */}
                            <div className="relative aspect-4/3 lg:aspect-auto lg:flex-1">
                                <StreetMap className="absolute inset-0 size-full" />
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-crema-100/70">
                            {INFO.street}, {INFO.city}
                        </p>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
