import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as routerLink } from "react-router-dom"
import { Google } from "@mui/icons-material"

export const RegisterPage = () => {
  return (
    <AuthLayout tittle="Register">
      <form>
        <Grid container >
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Nombre'
              type='text'
              placeholder="Nombre completo"
              fullWidth
            />
          </Grid>

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
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} direction='row' justifyContent='center'>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth >
              Register
            </Button>
          </Grid>
        </Grid>
        <Grid container direction='row' justifyContent='end'>
          <Typography sx={{ mr: 1 }}>Ya tienes una cuenta?</Typography>
          <Link color='inherit' component={routerLink} to='/auth/login'>Iniciar sesión</Link>
        </Grid>
      </form>
    </AuthLayout>
  )
}
