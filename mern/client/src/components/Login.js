import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import '../App.css';
import Loading from './LoadingIndicator';

export const Login = (props) => {
    const [show, setShow] = useState(false);

    const logo = require('../image/denethaLogo.png');

    const handleSubmit = () => {
        props.onLogin();
    };

    const handleClickShow = () => {
        setShow(!show);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const {name, usenameOnChange, pass, passwordOnChange} = props.input;

    const displayError = () => { return (<div id='error-mgs' className='error-msg'>{props.error.value}</div>) };

    return (
        <div className='round-edge-div'>
            <br />
            <img className='logo-img' src={logo} alt={'logo'} />
            <br />
            <p className='title'>Login</p>
            {props.error.name === 'none' ? null : displayError()}
            <TextField 
                required
                sx={{marginTop: 2, width:200}}
                label='Username'
                name='username'
                value={name} 
                onChange={usenameOnChange} 
                variant='standard' />
            <TextField 
                required
                sx={{marginTop: 2, width:200}}
                label='Password'
                name='password'
                value={pass} 
                type={show ? 'text' : 'password'}
                onChange={passwordOnChange} 
                variant='standard'
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShow}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  }} />
            <br /><br />
            <Button 
                variant='contained' 
                color='secondary' 
                onClick={handleSubmit} >
                {(props.load===true) ? <Loading /> : 'Sign In'}
            </Button>
        </div>
    );
}
