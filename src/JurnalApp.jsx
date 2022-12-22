import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"

export const JurnalApp = () => {

  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  )
}
