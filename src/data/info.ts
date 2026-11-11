// Dati della pizzeria usati da nav, home e footer: vanno cambiati solo qui.

// Contatti fittizi: la pizzeria non esiste, indirizzo e telefono sono segnaposto.
export const INFO = {
    street: 'Via del Forno 12',
    city: '00100 Roma (RM)',
    phone: '+39 012 345 6789',
}

export const HOURS = {
    timeZone: 'Europe/Rome',
    /** Giorno di chiusura, con la numerazione di Date.getDay() (0 = domenica). */
    closedDay: 1,
    // I giorni di apertura per esteso ("martedì–domenica") stanno nei testi (hours.openDays):
    // vanno aggiornati insieme a closedDay.
    opens: '18:30',
    closes: '23:00',
}

export type OpeningStatus = {
    /** Giorno della settimana in ora italiana (0 = domenica). */
    today: number
} & (
    | { state: 'open' }
    | { state: 'opens-tonight' }
    | { state: 'closed'; reopens: { kind: 'tomorrow' } | { kind: 'weekday'; day: number } }
)

const toMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
}

/** Stato di apertura calcolato sull'ora di Roma, non su quella del visitatore. */
export function getOpeningStatus(now = new Date()): OpeningStatus {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: HOURS.timeZone,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(now)
    const part = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((p) => p.type === type)?.value ?? ''

    const today = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(part('weekday'))
    const minutes = Number(part('hour')) * 60 + Number(part('minute'))

    if (today !== HOURS.closedDay) {
        if (minutes < toMinutes(HOURS.opens)) return { today, state: 'opens-tonight' }
        if (minutes < toMinutes(HOURS.closes)) return { today, state: 'open' }
    }

    let offset = 1
    while ((today + offset) % 7 === HOURS.closedDay) offset++
    const reopens = offset === 1 ? ({ kind: 'tomorrow' } as const) : ({ kind: 'weekday', day: (today + offset) % 7 } as const)

    return { today, state: 'closed', reopens }
}
