import { useEffect, useState } from 'react'
import { getOpeningStatus } from './data/info'

/** Stato di apertura della pizzeria, ricalcolato ogni mezzo minuto. */
export function useOpeningStatus() {
    const [status, setStatus] = useState(() => getOpeningStatus())

    useEffect(() => {
        const id = setInterval(() => setStatus(getOpeningStatus()), 30_000)
        return () => clearInterval(id)
    }, [])

    return status
}
