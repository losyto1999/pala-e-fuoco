import { Menu, Phone } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.webp'
import { INFO } from '../data/info'
import { LanguageSwitch } from './LanguageSwitch'
import { NavDrawer } from './NavDrawer'

const LINKS = [
    { to: '/', key: 'nav.pizzeria', end: true },
    { to: '/menu', key: 'nav.menu', end: false },
]

const DRAWER_ID = 'nav-drawer'

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-display text-[0.95rem] font-semibold underline-offset-[0.4em] transition-colors hover:text-terracotta-700 ${
        isActive ? 'text-terracotta-700 underline decoration-2' : 'text-carbone-900'
    }`

const drawerLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block border-b border-carbone-900/15 py-4 text-2xl font-bold transition-colors hover:text-terracotta-700 ${
        isActive ? 'text-terracotta-700' : 'text-carbone-900'
    }`

export function PizzeriaNav() {
    const { t } = useTranslation()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const closeDrawer = useCallback(() => setDrawerOpen(false), [])

    // Se la finestra si allarga fino a mostrare i link nella barra, la sidebar non ha più senso:
    // la si chiude (e con lei lo scroll della pagina si sblocca). Stessa soglia dei link: 768px, 900px dal portfolio.
    useEffect(() => {
        if (!drawerOpen) return
        const fromPortfolio = document.documentElement.hasAttribute('data-portfolio-back')
        const query = window.matchMedia(fromPortfolio ? '(min-width: 900px)' : '(min-width: 768px)')
        const onChange = () => query.matches && closeDrawer()
        onChange()
        query.addEventListener('change', onChange)
        return () => query.removeEventListener('change', onChange)
    }, [drawerOpen, closeDrawer])

    return (
        <header className="sticky top-0 z-40 border-b-[3px] border-double border-carbone-900 px-4 [background:inherit] sm:px-6 lg:px-8">
            {/* Sotto i 375px, per farci stare tutto, il logo sparisce e resta solo il nome. Aperta dal portfolio
                (back:), il pl si somma a quello dell'header e lascia spazio alla pillola fissa "torna al portfolio"
                in alto a sinistra, che finisce a 82px (104px da sm); per lo stesso motivo i link compaiono nella
                barra solo da 900px invece che da 768px. Sotto quella soglia link e lingua stanno nella sidebar
                (NavDrawer), aperta dal pulsante hamburger. */}
            <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-2 back:pl-[4.625rem] back:sm:pl-[6.5rem]">
                <Link to="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <img src={logo} alt="" className="h-10 w-auto max-[374px]:hidden sm:h-11" />
                    <span className="font-display text-base font-extrabold tracking-tight text-carbone-900 sm:text-2xl">
                        Pala e Fuoco
                    </span>
                </Link>

                <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-8">
                    <ul className="hidden items-center gap-6 md:flex back:max-[899px]:hidden">
                        {LINKS.map((link) => (
                            <li key={link.to}>
                                <NavLink to={link.to} end={link.end} className={linkClass}>
                                    {t(link.key)}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <Link
                                to="/#contatti"
                                className="font-display text-[0.95rem] font-semibold text-carbone-900 transition-colors hover:text-terracotta-700"
                            >
                                {t('nav.where')}
                            </Link>
                        </li>
                    </ul>

                    <div className="hidden md:block back:max-[899px]:hidden">
                        <LanguageSwitch />
                    </div>

                    {/* Mockato: progetto dimostrativo, il pulsante non avvia una chiamata reale. */}
                    <button
                        type="button"
                        aria-label={t('nav.call', { phone: INFO.phone })}
                        className="inline-flex size-9 items-center justify-center gap-2 rounded-[3px] bg-terracotta-700 text-sm font-semibold text-crema-50 transition hover:bg-terracotta-800 active:translate-y-px lg:size-auto lg:px-4 lg:py-2.5"
                    >
                        <Phone className="size-4" />
                        <span className="hidden tabular-nums lg:inline">{INFO.phone}</span>
                    </button>

                    <button
                        type="button"
                        aria-label={t('nav.openNavigation')}
                        aria-expanded={drawerOpen}
                        aria-controls={DRAWER_ID}
                        onClick={() => setDrawerOpen(true)}
                        className="-mr-1.5 inline-flex size-9 items-center justify-center rounded-[3px] text-carbone-900 transition-colors hover:bg-carbone-900/5 md:hidden back:max-[899px]:inline-flex"
                    >
                        <Menu className="size-6" />
                    </button>
                </div>
            </nav>

            <NavDrawer open={drawerOpen} onClose={closeDrawer} id={DRAWER_ID}>
                <ul>
                    {LINKS.map((link) => (
                        <li key={link.to}>
                            <NavLink to={link.to} end={link.end} onClick={closeDrawer} className={drawerLinkClass}>
                                {t(link.key)}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <Link to="/#contatti" onClick={closeDrawer} className={drawerLinkClass({ isActive: false })}>
                            {t('nav.where')}
                        </Link>
                    </li>
                </ul>

                <div className="mt-auto pb-8 pt-10">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-carbone-900/60">
                        {t('nav.language')}
                    </p>
                    <div className="-ml-3">
                        <LanguageSwitch large />
                    </div>
                </div>
            </NavDrawer>
        </header>
    )
}
