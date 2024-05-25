import React from 'react';

import { Button, Container, TextField, Typography, Paper, Avatar, IconButton, Stack } from '@mui/material';
import { useInputValidation } from '6pp';
import { Navigate } from 'react-router-dom';

const isAdmin = true;

const AdminLogin = () => {

    const secretKey = useInputValidation('');

    const submitHandler = (e) => {
        e.preventDefault;
        console.log("Submit");
    }

    if(isAdmin) return <Navigate to='/admin/dashboard'/>;

    return (
        <div style={{ background: 'radial-gradient(circle, rgba(78, 73, 162, 1)13%, rgba(102, 114, 215, 1)36%, rgba(80, 102, 246, 1)43%, rgba(0, 5, 255, 1)100%)' }}>
            <Container component={"main"} maxWidth='xs' sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >




                    <Typography variant='h5'>Admin Login</Typography>
                    <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={submitHandler} >

                        <TextField
                            required
                            fullWidth
                            label='Secret Key'
                            type='password'
                            margin='normal'
                            variant='outlined'
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
                        />
                        <Button variant='contained' color='primary' type='submit' fullWidth sx={{ marginTop: '1rem' }}>Login</Button>

                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default AdminLogin