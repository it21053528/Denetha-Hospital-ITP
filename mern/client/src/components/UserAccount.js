import { Button, TextField } from '@mui/material';
import '../App.css';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import NoticeDialog from './Accountant/NoticeDialog';
import axios from 'axios';

import Profile from "./StaffDetails/Profile";

const UserAccount = () => {
    const [cookies, setCookie, deleteCookie] = useCookies('name', 'role', 'username', 'id', 'loggedIn', 'proxy');
    const [changePass, setChangePass] = useState(false);
    const [enableChange, setEnableChange] = useState(true);
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({
        name: cookies.name,
        username: cookies.username,
        role: cookies.role,
        password: '',
        newPass: '',
        reNewPass: '',
    });

    const handleChange = ({target}) => {
        if(enableChange){
            setEnableChange(false);
        }
        setInputs((prev)=>({
            ...prev,
            [target.name]: target.value 
        }));
    };

    const onUpdateSubmit = async () => {
        const updateData = {
            name: inputs.name, 
            username: inputs.username
        };
        await axios.post(`${cookies.proxy}/api/account/update/${cookies.id}`, updateData)
        .then((res)=>{
            const {name, username} = res.data.update;
            setCookie('name', name, {path: '/', maxAge: (3600*12)});
            setCookie('username', username, {path: '/', maxAge: (3600*12)});
            setInputs((prev) => ({
                ...prev,
                name: name,
                username: username,
            }));
            window.location.reload();
        }).catch((err)=>{console.log(err)});
    };

    const onPasswordSubmit = async () => {
        if(inputs.newPass!=='' && inputs.reNewPass!==''){
            if(inputs.newPass === inputs.reNewPass){
                if(inputs.newPass.length<8){
                    setError('Password must be atleast 8 characters long');
                }else {
                    setError('');
                    const updateData = {
                        password: inputs.newPass
                    };
                    await axios.post(`${cookies.proxy}/api/account/update/${cookies.id}`, updateData)
                    .then((res)=>{
                        deleteCookie('name');
                        deleteCookie('loggedIn');
                        deleteCookie('role');
                        deleteCookie('username');
                        deleteCookie('id');
                        window.location.reload();
                    }).catch((err)=>{console.log(err)});
                }
                
            }else{
                setError("New Passwords don't match");
            }  
        }else {
            setError("Please type a password");
        }
        
    };

    const handleClose = ()=>{
        setChangePass(false);
        setInputs((prev) => ({
            ...prev,
            password: '',
            newPass: '',
            reNewPass: '',
        }));
    };

    return (
        <>
        <div className='App'>
            <div className='round-edge-div-non-static center-align'>
                <div>
                    <p id='user-account'>User Account</p>
                    <TextField 
                        sx={{marginTop: 2, width:250}}
                        label='Name'
                        name='name'
                        value={inputs.name} 
                        onChange={handleChange} 
                        variant='standard' />
                    <TextField 
                        sx={{marginTop: 2, width:250}}
                        label='Username'
                        name='username'
                        value={inputs.username} 
                        onChange={handleChange} 
                        variant='standard' />
                    <TextField 
                        disabled
                        sx={{marginTop: 2, width:250}}
                        label='Role'
                        name='role'
                        value={inputs.role} 
                        onChange={handleChange} 
                        variant='standard' />
                    <Button 
                        sx={{marginTop: 1}} 
                        color='secondary' 
                        variant='contained'
                        disabled={enableChange}
                        onClick={onUpdateSubmit} >Change Account Info</Button>
                </div>
                <Button 
                    sx={{marginTop: 3}} 
                    color='secondary' 
                    onClick={()=>setChangePass(true)} >Change Password</Button>
                <NoticeDialog 
                    message={ 
                    <div style={{margin: 5}}>
                        {error && <div className='basic'>{error}</div>}
                        <TextField 
                            sx={{marginTop: 2}}
                            label='Current Password'
                            variant='standard'
                            type='password'
                            name='password'
                            value={inputs.password}
                            onChange={handleChange} /><br />
                        <TextField 
                            sx={{marginTop: 2}}
                            label='New Password'
                            variant='standard'
                            type='password'
                            name='newPass'
                            value={inputs.newPass}
                            onChange={handleChange} />
                        <TextField 
                            sx={{marginTop: 2}}
                            label='Confirm new Password'
                            variant='standard'
                            type='password'
                            name='reNewPass'
                            value={inputs.reNewPass}
                            onChange={handleChange} /><br />
                        <div className='message'>note - This action will cause you to be logged out</div>
                    </div> }
                    handleClose={handleClose}
                    handleButton={onPasswordSubmit}
                    title='Change Password' 
                    enable={changePass} />
            </div>
        </div>
        <Profile />
        </>
    );
};

export default UserAccount;