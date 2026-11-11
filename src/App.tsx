import { Navigate, Route, Routes } from 'react-router-dom'
import { PizzeriaLayout } from './PizzeriaLayout'
import { PizzeriaHome } from './pages/PizzeriaHome'
import { PizzeriaMenu } from './pages/PizzeriaMenu'

function App() {
    return (
        <Routes>
            <Route element={<PizzeriaLayout />}>
                <Route index element={<PizzeriaHome />} />
                <Route path="menu" element={<PizzeriaMenu />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App
