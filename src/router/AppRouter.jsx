import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/authRoutes"
import { useCheckAuth } from "../hooks/useCheckAuth";
import { JournalRoutes } from "../jurnal/routes/JournalRoutes";
import { Loading } from '../ui/components/Loading';

export const AppRouter = () => {

    const { status } = useCheckAuth();


    if (status === 'checking') return <Loading />

    return (
        <Routes>

            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<JournalRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            {/* si no cumple con la condicion de arriva ara lo siguiente ⬇ */}
            <Route path="/*" element={<Navigate to='/auth/login' />} />

        </Routes>
    )
}
