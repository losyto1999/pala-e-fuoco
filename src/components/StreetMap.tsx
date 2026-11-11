import { useTranslation } from 'react-i18next'
import { INFO } from '../data/info'

/**
 * Cartina disegnata della zona, al posto di una mappa vera: la pizzeria e il suo indirizzo
 * sono inventati. Stile da stampa, con i soli colori della palette: strade a filo sul fondo
 * carbone, via del Forno in grano, un giardino in basilico e il segnaposto in terracotta.
 * Il disegno riempie il riquadro (`slice`): il segnaposto sta vicino al centro, così resta
 * in vista a ogni proporzione.
 */
export function StreetMap({ className = '' }: { className?: string }) {
    const { t } = useTranslation()
    return (
        <svg
            viewBox="0 0 400 300"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label={t('map.label', { address: `${INFO.street}, ${INFO.city}` })}
            className={`bg-carbone-800 ${className}`}
        >
            {/* Giardino e isolati */}
            <path d="M318 0h82v84l-74 4z" className="fill-basilico-600/45" />
            <circle cx="355" cy="40" r="5" className="fill-basilico-500/60" />
            <circle cx="372" cy="62" r="4" className="fill-basilico-500/60" />
            <circle cx="340" cy="66" r="3.5" className="fill-basilico-500/60" />

            {/* Strade secondarie */}
            <g fill="none" strokeLinecap="round" className="stroke-crema-100/20">
                <path d="M-10 72 410 92" strokeWidth="6" />
                <path d="M-10 252 410 238" strokeWidth="6" />
                <path d="M300 -10 316 310" strokeWidth="8" />
                <path d="M212 -10 226 158" strokeWidth="5" />
                <path d="M248 160 262 310" strokeWidth="5" />
                <path d="M-10 118 118 140" strokeWidth="4" />
                <path d="M30 -10 20 310" strokeWidth="4" />
                <path d="M60 -10 182 310" strokeWidth="10" />
            </g>

            {/* Via del Forno */}
            <path id="via-del-forno" d="M-10 172 410 150" fill="none" strokeWidth="14" strokeLinecap="round" className="stroke-grano-400/80" />
            <text className="fill-carbone-900 font-display text-[9px] font-bold uppercase tracking-[0.18em]" dy="3">
                <textPath href="#via-del-forno" startOffset="64%">
                    {INFO.street.replace(/\s\d+$/, '')}
                </textPath>
            </text>

            {/* Piazza all'incrocio col viale */}
            <circle cx="126" cy="166" r="20" className="fill-carbone-800 stroke-crema-100/30" strokeWidth="2" />
            <circle cx="126" cy="166" r="6" className="fill-crema-100/20" />

            {/* Segnaposto con l'etichetta, come un cartellino appoggiato sulla cartina */}
            <g transform="translate(222 160)">
                <circle r="16" className="origin-center fill-terracotta-500/25 [transform-box:fill-box] motion-safe:animate-fiamma" />
                <circle r="8" className="fill-terracotta-500 stroke-crema-50" strokeWidth="2.5" />
                <g transform="translate(-50 -52)">
                    <rect width="100" height="26" className="fill-crema-50" />
                    <path d="M44 26h12l-6 7z" className="fill-crema-50" />
                    <text
                        x="50"
                        y="17.5"
                        textAnchor="middle"
                        className="fill-carbone-900 font-display text-[11px] font-extrabold"
                    >
                        Pala e Fuoco
                    </text>
                </g>
            </g>
        </svg>
    )
}
