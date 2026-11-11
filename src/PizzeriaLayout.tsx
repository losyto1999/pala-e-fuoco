import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import { PizzeriaFooter } from './components/PizzeriaFooter'
import { PizzeriaNav } from './components/PizzeriaNav'
import { BackToPortfolio } from './portfolio/BackToPortfolio'
import { cameFromPortfolio } from './portfolio/fromPortfolio'

/** Nav, pagina e footer, comuni a home e menù. */
export function PizzeriaLayout() {
    const location = useLocation()
    const navigationType = useNavigationType()
    const [showBack] = useState(cameFromPortfolio)

    // react-router non riporta in cima la pagina nuova: lo facciamo qui. Lo scroll verso le
    // ancore (#contatti, #margherita…) lo fa ogni pagina con useScrollToHash, perché solo lei
    // sa quando i suoi elementi esistono.
    useEffect(() => {
        if (!location.hash && navigationType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' })
    }, [location.hash, location.key, navigationType])

    return (
        <div className="pizzeria-root min-h-screen">
            {showBack && <BackToPortfolio />}
            <PizzeriaNav />
            <main>
                <Outlet />
            </main>
            <PizzeriaFooter />
        </div>
    )
}
