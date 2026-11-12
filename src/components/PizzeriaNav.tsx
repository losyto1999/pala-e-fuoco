import { Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.webp'
import { INFO } from '../data/info'
import { LanguageSwitch } from './LanguageSwitch'

const LINKS = [
    { to: '/', key: 'nav.pizzeria', end: true, mobile: false },
    { to: '/menu', key: 'nav.menu', end: false, mobile: true },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-display text-[0.95rem] font-semibold underline-offset-[0.4em] transition-colors hover:text-terracotta-700 ${
        isActive ? 'text-terracotta-700 underline decoration-2' : 'text-carbone-900'
    }`

export function PizzeriaNav() {
    const { t } = useTranslation()
    return (
        <header className="sticky top-0 z-40 border-b-[3px] border-double border-carbone-900 px-4 [background:inherit] sm:px-6 lg:px-8">
            {/* Sotto i 375px, per farci stare tutto, il logo sparisce e resta solo il nome. Aperta dal portfolio
                (back:), il pl si somma a quello dell'header e lascia spazio alla pillola fissa "torna al portfolio"
                in alto a sinistra, che finisce a 82px (104px da sm); per lo stesso motivo «La pizzeria» e
                «Dove siamo» compaiono solo da 900px invece che da 768px. */}
            <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-2 back:pl-[4.625rem] back:sm:pl-[6.5rem]">
                <Link to="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <img src={logo} alt="" className="h-10 w-auto max-[374px]:hidden back:max-sm:hidden sm:h-11" />
                    <span className="font-display text-base font-extrabold tracking-tight text-carbone-900 back:max-[419px]:text-sm sm:text-2xl">
                        Pala e Fuoco
                    </span>
                </Link>

                <div className="flex items-center gap-2.5 back:max-[419px]:gap-1.5 sm:gap-4 lg:gap-8">
                    <ul className="flex items-center gap-6">
                        {LINKS.map((link) => (
                            <li key={link.to} className={link.mobile ? '' : 'hidden md:block back:max-[899px]:hidden'}>
                                <NavLink to={link.to} end={link.end} className={linkClass}>
                                    {t(link.key)}
                                </NavLink>
                            </li>
                        ))}
                        <li className="hidden md:block back:max-[899px]:hidden">
                            <Link
                                to="/#contatti"
                                className="font-display text-[0.95rem] font-semibold text-carbone-900 transition-colors hover:text-terracotta-700"
                            >
                                {t('nav.where')}
                            </Link>
                        </li>
                    </ul>

                    <LanguageSwitch />

                    {/* Mockato: progetto dimostrativo, il pulsante non avvia una chiamata reale. */}
                    <button
                        type="button"
                        aria-label={t('nav.call', { phone: INFO.phone })}
                        className="inline-flex size-9 back:max-[359px]:hidden items-center justify-center gap-2 rounded-[3px] bg-terracotta-700 text-sm font-semibold text-crema-50 transition hover:bg-terracotta-800 active:translate-y-px lg:size-auto lg:px-4 lg:py-2.5"
                    >
                        <Phone className="size-4" />
                        <span className="hidden tabular-nums lg:inline">{INFO.phone}</span>
                    </button>
                </div>
            </nav>
        </header>
    )
}
