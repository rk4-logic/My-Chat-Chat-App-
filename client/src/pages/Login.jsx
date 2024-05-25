import React, { useState } from 'react'
import { Button, Container, TextField, Typography, Paper, Avatar, IconButton, Stack } from '@mui/material';
import { CameraAlt } from '@mui/icons-material';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { usernameValidator } from '../utils/validators';

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin(prev => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const handleRegister = (e) => {
    e.preventDefault();
  }

  const handleLogin = (e) => {
    e.preventDefault();
  }

  return (
    <div style={{ background: 'radial-gradient(circle, rgba(78, 73, 162, 1)13%, rgba(102, 114, 215, 1)36%, rgba(80, 102, 246, 1)43%, rgba(0, 5, 255, 1)100%)' }}>
      <Container component={"main"} maxWidth='xs' sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

          {
            isLogin ? (
              <>
                <Typography variant='h5'>Login</Typography>
                <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleLogin} >
                  <TextField
                    required
                    fullWidth
                    label='Username'
                    margin='normal'
                    variant='outlined'
                    value={username.value}
                    onChange={username.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label='Password'
                    type='password'
                    margin='normal'
                    variant='outlined'
                    value={password.value}
                    onChange={password.changeHandler}
                  />
                  <Button variant='contained' color='primary' type='submit' fullWidth sx={{ marginTop: '1rem' }}>Login</Button>
                  <Typography textAlign={'center'} m={'1rem'}>OR</Typography>

                  <Button variant='text' type='submit' fullWidth onClick={toggleLogin}>
                    Sign Up Instead
                  </Button>

                </form>
              </>
            ) : (
              <>
                <Typography variant='h5'>Register</Typography>
                <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleRegister} >

                  <Stack
                    position={"relative"}
                    width={'10rem'}
                    margin={'auto'}
                  >
                    <Avatar
                      sx={{
                        height: '10rem',
                        width: '10rem',
                        objectFit: 'contain'
                      }}

                      src={avatar.preview}
                    />

                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.5)',
                        ":hover": { bgcolor: 'rgba(0,0,0,0.7)' }
                      }}
                      component='label'
                    >
                      <>
                        <CameraAlt />
                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                      </>
                    </IconButton>
                  </Stack>

                  {avatar.error && (
                    <Typography
                      m={'1rem auto'}
                      width={'fit-content'}
                      display={'block'}
                      color='error'
                      variant='caption'
                    >
                      {avatar.error}
                    </Typography>
                  )}

                  <TextField
                    required
                    fullWidth
                    label='Name'
                    margin='normal'
                    variant='outlined'
                    value={name.value}
                    onChange={name.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label='Username'
                    margin='normal'
                    variant='outlined'
                    value={username.value}
                    onChange={username.changeHandler}
                  />

                  {username.error && (
                    <Typography color='error' variant='caption' >
                      {username.error}
                    </Typography>
                  )}

                  <TextField
                    required
                    fullWidth
                    label='Bio'
                    margin='normal'
                    variant='outlined'
                    value={bio.value}
                    onChange={bio.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label='Password'
                    type='password'
                    margin='normal'
                    variant='outlined'
                    value={password.value}
                    onChange={password.changeHandler}

                  />

                  {password.error && (
                    <Typography color='error' variant='caption' >
                      {password.error}
                    </Typography>
                  )}

                  <Button variant='contained' color='primary' type='submit' fullWidth sx={{ marginTop: '1rem' }}>Sign Up</Button>
                  <Typography textAlign={'center'} m={'1rem'}>OR</Typography>

                  <Button variant='text' type='submit' fullWidth onClick={toggleLogin}>
                    Click Here to Login
                  </Button>

                </form>
              </>
            )
          }
        </Paper>
      </Container>
    </div>
  )
}

export default Login
