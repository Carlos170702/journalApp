import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as routerLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"

export const LoginPage = () => {
  return (
    <AuthLayout tittle="Login">
      <form>
        <Grid
          container
        >
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label='correo'
              type='email'
              placeholder="Correo@google.com"
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Contraseña'
              type='password'
              placeholder="Contraseña"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth >
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>

        </Grid>
        <Grid container direction='row' justifyContent='end'>
          <Link color='inherit' component={routerLink} to='/auth/register'>Crear cuenta</Link>
        </Grid>
      </form>
    </AuthLayout>
  )
}
