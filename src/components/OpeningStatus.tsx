import { useTranslation } from 'react-i18next'
import { HOURS } from '../data/info'
import { useHours } from '../useHours'
import { useOpeningStatus } from '../useOpeningStatus'

interface OpeningStatusProps {
    /** Colori per la fascia scura (orari e footer) invece che per il foglio crema. */
    dark?: boolean
    className?: string
}

/** Riga "aperto adesso / chiuso", in ora italiana. Il pallino pulsa quando il forno è acceso. */
export function OpeningStatus({ dark = false, className = '' }: OpeningStatusProps) {
    const { t } = useTranslation()
    const { weekdays } = useHours()
    const status = useOpeningStatus()
    const open = status.state === 'open'

    // Lo stato è neutro rispetto alla lingua: la frase si costruisce qui, a ogni render.
    const describe = () => {
        switch (status.state) {
            case 'open':
                return t('opening.open', { time: HOURS.closes })
            case 'opens-tonight':
                return t('opening.opensTonight', { time: HOURS.opens })
            case 'closed': {
                const when =
                    status.reopens.kind === 'tomorrow'
                        ? t('opening.tomorrow')
                        : t('opening.onWeekday', { weekday: weekdays[status.reopens.day] })
                return status.today === HOURS.closedDay
                    ? t('opening.closedToday', { weekday: weekdays[status.today], when, time: HOURS.opens })
                    : t('opening.closed', { when, time: HOURS.opens })
            }
        }
    }

    return (
        <p className={`flex items-baseline gap-2.5 ${className}`}>
            <span aria-hidden="true" className="relative inline-flex size-2.5 shrink-0 self-center">
                {open && (
                    <span
                        className={`absolute inset-0 rounded-full motion-safe:animate-fiamma ${
                            dark ? 'bg-grano-400/60' : 'bg-grano-500/50'
                        }`}
                    />
                )}
                <span
                    className={`relative size-2.5 rounded-full ${
                        open
                            ? dark
                                ? 'bg-grano-400'
                                : 'bg-grano-500'
                            : dark
                              ? 'ring-1 ring-crema-100/50'
                              : 'ring-1 ring-carbone-900/40'
                    }`}
                />
            </span>
            <span>{describe()}</span>
        </p>
    )
}
