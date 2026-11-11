import diavolaImg from '../assets/pizza-diavola.webp'
import margheritaImg from '../assets/pizza-margherita.webp'
import marinaraImg from '../assets/pizza-marinara.webp'

/**
 * Dati fissi della voce di menù. Il nome è quello della pizza (un nome proprio, uguale in tutte le
 * lingue); gli ingredienti stanno in locales/*.json, alla chiave `menu.items.<slug>.ingredients`.
 */
export interface MenuItem {
    slug: string
    name: string
    /** In euro. */
    price: number
    image?: string
    vegetariana?: boolean
}

/** Voce di menù con gli ingredienti nella lingua attiva (vedi useMenu). */
export interface MenuEntry extends MenuItem {
    ingredients: string[]
    /** Prezzo di un'aggiunta ("+ 2,00 €") invece del prezzo di una pizza. */
    addon?: boolean
}

export const MENU: MenuItem[] = [
    { slug: 'margherita', name: 'Margherita', price: 7.5, image: margheritaImg, vegetariana: true },
    { slug: 'marinara', name: 'Marinara', price: 6.5, image: marinaraImg, vegetariana: true },
    { slug: 'diavola', name: 'Diavola', price: 9, image: diavolaImg },
    { slug: 'quattro-formaggi', name: 'Quattro Formaggi', price: 9.5, vegetariana: true },
    { slug: 'capricciosa', name: 'Capricciosa', price: 10 },
    { slug: 'prosciutto-e-funghi', name: 'Prosciutto e Funghi', price: 9 },
    { slug: 'boscaiola', name: 'Boscaiola', price: 10.5 },
    { slug: 'parmigiana', name: 'Parmigiana', price: 9.5, vegetariana: true },
    { slug: 'nduja-e-burrata', name: "'Nduja e Burrata", price: 11.5 },
    { slug: 'ortolana', name: 'Ortolana', price: 9.5, vegetariana: true },
]

/** Supplemento per l'impasto senza glutine, in euro. */
export const GLUTEN_FREE_PRICE = 2

/** Prezzo con due decimali, nel formato della lingua (7,50 € / €7.50). */
export const formatPrice = (price: number, locale: string) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(price)
