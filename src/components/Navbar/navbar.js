import React, { useState,useEffect } from "react";
import memories from "../../images/memories.png";

import memorylogo from "../../images/memories-Logo.png";
import memorytext from "../../images/memories-Text.png";
import { AppBar,Toolbar, Avatar, Button, Typography} from '@material-ui/core';
import {Link, useNavigate,useLocation} from "react-router-dom";
import jwt_decode from 'jwt-decode'
import useStyles from "./styles";
import { useDispatch } from "react-redux";


const Navbar = () => {
    const location = useLocation();
    const history = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const logout = () => {
        dispatch(
            {type:'LOGOUT'}
        )
        setUser(null)
        history("/")

    }
    useEffect(()=>{
        const token = user?.token;
        if(token){
            const decodedtoken = jwt_decode(token)
            if(decodedtoken.exp * 1000 < new Date().getTime()) logout()
        }
        //....

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
            <Link to="/" >
            <img className={classes.image} src={memorytext} alt="icon" height="45px" />
        <img className={classes.image} src={memorylogo} alt="memories" height="45" />
        </Link>
            </div>
        <Toolbar className={classes.toolbar} >
        {user? (
            <div className={classes.profile} >
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >
                {user.result.name.charAt(0)}    
                </Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
            </div>
        ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary"> Sign In </Button>
        )}
        </Toolbar>
        
    </AppBar>
    )
}

export default Navbar;