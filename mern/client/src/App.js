import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';
import {Login} from './components/Login'
import { TestAddAccount } from './components/TestAddAccount';
import { useCookies } from 'react-cookie';
import AddPatientForm from './components/Patients/AddPatientForm';

const App = () => {
  //list of error messages
  const errors = [{
    name: 'none',
    value: 'none'
  }, {
    name: 'invalidUser',
    value: 'Invalid Username'
  }, {
    name: 'invalidPass',
    value: 'Invalid Password'
  }];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(errors[0]);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const [cookies, setCookie] = useCookies(['name', 'loggedIn', 'role', 'proxy']);

  //using a condition to redirect to a page
  //URL is set to localhost:3000/{userRole}
  useEffect(()=>{
    if(cookies.loggedIn==='true'){
      navigateTo(cookies.role);
    }
  });

  useEffect(()=>{
    setCookie('proxy', 'http://localhost:5000', {path: '/', maxAge: (3600*12)});
  }, []);

  //check database and validate user
  //set user role
  //set loggedIn = true
  const verifyLogin = async () => {

    setLoading(true);

    const data = {
      username,
      password,
    }

    await axios.post(`${cookies.proxy}/api/account/check`, data)
    .then(({data}) => {
      if(data.message){
        if(data.message === 'invalidUser'){
          setErrorMsg(errors[1]);
        }else if(data.message === 'invalidPass'){
          setErrorMsg(errors[2]);
        } else {
          setErrorMsg(errors[0]);
        }
        setLoading(false);
      } else {
        const {name, username, role, _id} = data[0];
    
        //save to cookies
        setCookie('role', role, {path: '/', maxAge: (3600*12)});
        setCookie('id', _id, {path: '/', maxAge: (3600*12)});
        setCookie('name', name, {path: '/', maxAge: (3600*12)});
        setCookie('username', username, {path: '/', maxAge: (3600*12)});
        setCookie('loggedIn', 'true', {path: '/', maxAge: (3600*12)});
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  };

  const user = {
    name: username,
    usenameOnChange: ({target}) => {setUsername(target.value);},
    pass: password,
    passwordOnChange: ({target}) => {setPassword(target.value);}
  };

  return (
      <div className="App">
        <Login onLogin={verifyLogin} input={user} error={errorMsg} load={loading}/>
      </div>
  );
};

export default App;