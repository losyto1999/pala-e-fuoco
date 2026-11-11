import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { MENU, type MenuEntry } from './data/menu'

/** Il menù con gli ingredienti nella lingua attiva. */
export function useMenu(): MenuEntry[] {
    const { t } = useTranslation()
    return useMemo(
        () =>
            MENU.map((item) => ({
                ...item,
                ingredients: t(`menu.items.${item.slug}.ingredients`, { returnObjects: true }) as string[],
            })),
        // `t` cambia insieme alla lingua: l'elenco si ricalcola con i nuovi testi.
        [t],
    )
}
