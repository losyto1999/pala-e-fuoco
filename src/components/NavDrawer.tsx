import { X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { type ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

type Props = {
    open: boolean
    onClose: () => void
    id: string
    children: ReactNode
}

const FOCUSABLE = 'a[href], button:not([disabled])'

/**
 * Sidebar a destra della nav mobile. Montata su document.body (portale), così sta sopra anche alla
 * pillola «torna al portfolio». Blocca lo scroll della pagina, si chiude con Esc o toccando lo sfondo,
 * tiene il focus al suo interno e lo restituisce al pulsante che l'ha aperta.
 */
export function NavDrawer({ open, onClose, id, children }: Props) {
    const { t } = useTranslation()
    const reduceMotion = useReducedMotion()
    const panelRef = useRef<HTMLDivElement>(null)
    const onCloseRef = useRef(onClose)

    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    useEffect(() => {
        if (!open) return
        const opener = document.activeElement as HTMLElement | null
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                onCloseRef.current()
                return
            }
            if (e.key !== 'Tab' || !panelRef.current) return
            const items = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
            if (items.length === 0) return
            const first = items[0]
            const last = items[items.length - 1]
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = previousOverflow
            opener?.focus()
        }
    }, [open])

    const duration = reduceMotion ? 0 : 0.25

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[60]">
                    <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration }}
                        onClick={onClose}
                        className="absolute inset-0 bg-carbone-900/55"
                    />
                    <motion.div
                        ref={panelRef}
                        id={id}
                        role="dialog"
                        aria-modal="true"
                        aria-label={t('nav.navigation')}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration, ease: 'easeOut' }}
                        className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col overflow-y-auto border-l-[3px] border-double border-carbone-900 bg-crema-50 px-6 font-display text-carbone-900"
                    >
                        <div className="flex h-20 shrink-0 items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta-700">
                                {t('nav.navigation')}
                            </span>
                            <button
                                type="button"
                                data-autofocus
                                onClick={onClose}
                                aria-label={t('nav.closeNavigation')}
                                className="-mr-2 inline-flex size-9 items-center justify-center rounded-[3px] transition-colors hover:bg-carbone-900/5"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body,
    )
}
