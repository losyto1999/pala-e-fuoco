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
            {/* Sotto i 375px, per farci stare tutto, il logo sparisce e resta solo il nome. */}
            <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-2">
                <Link to="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <img src={logo} alt="" className="h-10 w-auto max-[374px]:hidden sm:h-11" />
                    <span className="font-display text-base font-extrabold tracking-tight text-carbone-900 sm:text-2xl">
                        Pala e Fuoco
                    </span>
                </Link>

                <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-8">
                    <ul className="flex items-center gap-6">
                        {LINKS.map((link) => (
                            <li key={link.to} className={link.mobile ? '' : 'hidden md:block'}>
                                <NavLink to={link.to} end={link.end} className={linkClass}>
                                    {t(link.key)}
                                </NavLink>
                            </li>
                        ))}
                        <li className="hidden md:block">
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
                        className="inline-flex size-9 items-center justify-center gap-2 rounded-[3px] bg-terracotta-700 text-sm font-semibold text-crema-50 transition hover:bg-terracotta-800 active:translate-y-px lg:size-auto lg:px-4 lg:py-2.5"
                    >
                        <Phone className="size-4" />
                        <span className="hidden tabular-nums lg:inline">{INFO.phone}</span>
                    </button>
                </div>
            </nav>
        </header>
    )
}
