import React,{useState} from 'react'
import { Avatar,Button,Typography,Grid,Container,Paper } from '@material-ui/core'
import useStyles from "./styles"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input'
import {GoogleLogin} from "react-google-login";
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {signin,signup} from "../../actions/auth"
const Auth = () => {
    const initialState = {firstname: '' , lastname:'' , email:'', Password:'', ConfirmPassword:''}
    const [formData,setFormData] = useState(initialState);
    const history = useNavigate();
    const dispatch = useDispatch();
    const [showPassword,setShowPassword] = useState(false);
    const classes = useStyles();
    const [isSignup,setIsSignup] = useState(false);
    
    const handleShowPassword = () => setShowPassword((prevShowPassword)=>!prevShowPassword)
    
    const handleSubmit = (e) => {
        e.preventDefault(e);

        if(isSignup){
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }
        console.log(formData);
    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const switchMode = ()=> {
    setIsSignup((previsSignup)=>!previsSignup);
    setShowPassword(false);
    }
    const googleSuccess= async (res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type:"AUTH" , data:{result,token}});
            history("/");
        } catch (error) {
            console.log(error);
        }
    };
const googleFailure=()=>{
    console.log("Google sign in was unsuccessful. Try Again Later");
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5">
               {isSignup? 'Sign Up' : 'Sign In'}
            </Typography>

            <form className={classes.from} onSubmit={handleSubmit}  >
                <Grid container spacing={2}>
                {isSignup && (
                    <>
                    <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastname" label="Last Name" handleChange={handleChange}  autoFocus half />
                    </>
                )}
                <Input name="email" label="Email Address" type="email" handleChange={handleChange}  />
                <Input name="Password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                {isSignup && <Input name="ConfirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                </Grid>
                
                <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}  >{isSignup? "Sign Up" :"Sign In"}</Button>
           <Grid type="container" justifyContent="flex-end" >
           <GoogleLogin 
                clientId='94229219156-d977kniiljbef929ebnvlj9ufg3r1kco.apps.googleusercontent.com'
                render={(renderProps)=>(
                    <Button 
                    className={classes.googleButton} 
                    color="primary" 
                    fullWidth 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled} 
                    startIcon={<Icon/>} 
                    variant="contained" >
                        Google Sign In
                    </Button>
                )} onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
                />
               <Grid item >
                   <Button onClick={switchMode}  >
                        {isSignup? "Already have an account? Sign In" :"Don't have an account? Sign Up"}
                   </Button>
                   
               </Grid>
           </Grid>
            </form>

        </Paper>


    </Container>
    

  )
}

export default Auth;