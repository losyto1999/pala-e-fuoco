import { useTranslation } from 'react-i18next'
import { HOURS } from './data/info'

/** Giorni e orari di apertura nella lingua attiva. */
export function useHours() {
    const { t } = useTranslation()
    const weekdays = t('weekdays', { returnObjects: true }) as string[]
    const closedDay = weekdays[HOURS.closedDay]
    return {
        weekdays,
        closedDay,
        /** I giorni di apertura per esteso ("martedì–domenica"). */
        openDays: t('hours.openDays'),
        /** "Martedì–domenica 18:30–23:00, lunedì chiuso": `days` è la scritta dei giorni di apertura. */
        summary: (days: string) =>
            t('hours.summary', { days, opens: HOURS.opens, closes: HOURS.closes, closedDay }),
    }
}
