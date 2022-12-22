import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as routerLink } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth/thunks"
import { AuthLayout } from "../layout/AuthLayout"

const formData = {
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'Correo es requerido'],
  password: [(value) => value.length >= 6, 'La contraseña es requerida'],
}

export const LoginPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);

  const { onInputChange, formState: { email, password }, emailValid, passwordValid, isFormValid } = useForm(formData, formValidations);


  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startLoginWithEmailPassword({ email, password }));
  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn());
  }

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  return (
    <>
      <AuthLayout tittle="Login">
        <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
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
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
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
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
            display={errorMessage ? '' : 'none'}
          >
            <Alert severity="error">{errorMessage === 'Firebase: Error (auth/wrong-password).' ? 'Contraseña incorrecta ' : 'Usuario no valido'}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSingIn}
              >
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
    </>
  )
}
