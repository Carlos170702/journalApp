import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as routerLink } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks"

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un "@"'],
  password: [(value) => value.length >= 6, 'La contraseña debe de tener mas de 6 dijitos'],
  displayName: [(value) => value.length >= 3, 'EL nombre es requerido']
}

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAutheticcation = useMemo(() => status === 'checking', [status])

  const { formState, displayName, email, password, emailValid, displayNameValid, passwordValid, onInputChange, isFormValid } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout tittle="Register">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
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
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted} //si se le pone 2 veses !! ase doble negación y lo convierte en un booleano
              helperText={displayNameValid}
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
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} direction='row' justifyContent='center'>
          <Grid
            item
            xs={12}
            sx={{ display: errorMessage ? '' : "none" }}
          >
            <Alert severity="error">{errorMessage === 'Firebase: Error (auth/email-already-in-use).' && 'Correo ya esta en uso'}</Alert>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button disabled={isCheckingAutheticcation} type='submit' variant="contained" fullWidth >
              Register
            </Button>
          </Grid>
        </Grid>
        <Grid container direction='row' justifyContent='end'>
          <Typography sx={{ mr: 1 }}>Ya tienes una cuenta?</Typography>
          <Link color='inherit' component={routerLink} to='/auth/login'>Iniciar sesión</Link>
        </Grid>
      </form>
    </AuthLayout >
  )
}
