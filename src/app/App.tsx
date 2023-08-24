import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {CircularProgress, LinearProgress} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {initializeAppTC, logoutTC} from "../features/Login/authReducer";


function App() {

    const status = useAppSelector<RequestStatusType>((state)=>state.app.status)
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector((state)=> state.auth.isInitialized )

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

    const logOut = () => {
        dispatch(logoutTC())
    }


    if (!isInitialized) {
        console.log('huy')
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit" onClick={logOut}>LogOut</Button>
                </Toolbar>
            </AppBar>
            {status ==='loading' && <LinearProgress/>}
            <Container>
                <Routes>
                    <Route path='/' element={<TodolistsList />}/>
                    <Route path='/login' element={<Login/>}/>

                    <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>} />

                </Routes>
            </Container>
            <Container fixed>

            </Container>
        </div>
    )
}

export default App
