import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/authRoutes"
import { JournalPage } from "../jurnal/pages/JournalPage"

export const AppRouter = () => {
    return (
        <Routes>

            {/* login */}
            <Route path="/auth/*" element={<AuthRoutes />} />

            {/* jurnal app */}
            <Route path="/*" element={<JournalPage />} />

        </Routes>
    )
}
