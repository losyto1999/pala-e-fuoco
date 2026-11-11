import { useTranslation } from 'react-i18next'
import logo from '../assets/logo.webp'
import { INFO } from '../data/info'
import { useHours } from '../useHours'

const YEAR = new Date().getFullYear()

export function PizzeriaFooter() {
    const { t } = useTranslation()
    const hours = useHours()
    return (
        <footer className="bg-carbone-900 text-crema-100/75">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 border-t border-crema-100/15 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="" className="h-12 w-auto" />
                    <div>
                        <p className="font-display text-xl font-extrabold text-crema-50">
                            Pala e Fuoco
                        </p>
                        <p className="text-sm">{t('footer.tagline')}</p>
                    </div>
                </div>

                <div className="space-y-1 text-sm leading-relaxed lg:text-right">
                    <p>
                        {INFO.street}, {INFO.city}
                    </p>
                    {/* Mockato: progetto dimostrativo, il numero non avvia una chiamata reale. */}
                    <p className="tabular-nums">
                        {INFO.phone} · {hours.summary(hours.openDays)}
                    </p>
                    <p className="text-crema-100/50">© {YEAR} Pala e Fuoco</p>
                </div>
            </div>
        </footer>
    )
}
