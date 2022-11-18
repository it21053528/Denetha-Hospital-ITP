import React,{useState ,useEffect} from "react";
import { Select,InputLabel, FormGroup, Button, Grid ,Paper, TextField,Radio ,RadioGroup, FormLabel, FormControl, Checkbox, FormControlLabel,Box,MenuItem } from "@mui/material";
import '../Appoinment.css';
import { NavLink,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { Help } from "./Help";
import {InputAdornment} from "@mui/material";
import '../App.css';

export const Appoinment=(props) =>{
   
    const [post,setPost] = useState(null);
    const paperStyle={padding:'30px 30px',width:'450px',margin:"20px auto"}
    const buttonColor={background:'#2A628F' ,padding:'10px 97px',margin :'5px',width:100}
    const buttongreenColor = {background:'#3D8361',padding:'10px 97px',margin :'5px',width:100};
    const [name,setname] = useState(props.name===null?"" :props.name);
    const [address,setaddress] = useState('');
    const [gender,setgender] = useState('');
    const [appoinmentnumber,setappoinmentnumber] = useState('');
    const [phone,setcontactnumber] = useState(props.phone===null?"" :props.phone);
    const [type, settype] = useState("");
    const [time,setTime] = useState('');
    const [cookies] = useCookies('proxy');
    const navigateTo = useNavigate();
    const logo = require('../image/denethaLogo.png');

    useEffect(() => {
      switch(props.type){
        case "O" : settype("OPD");
        break;

        case  "C" : settype("Clinic");
        break;

        case  "S" : settype("Surgery");
        break;

        case  "P" : settype("Post-Operation");
        break;

      }

    },[]);

    const handleName= ({target}) =>
    {
      setname(target.value);
    }
    const handleAddress= ({target}) =>
    {
      setaddress(target.value);
    }
    const handleAge =({target}) =>
    {
      props.setage(target.value);
    }
    const handlecontactnumber= ({target}) =>
    {
      setcontactnumber(target.value);
    }
    const handlegender =({target}) =>
    {
      setgender(target.value);
    }
    const handleDoctor =({target}) =>
    {
      props.setdoctor(target.value);
    }
    const handleappoinmentnumber =({target}) =>
    {
      setappoinmentnumber(target.value);
    }
    const handleType = ({target})=>
    {
      settype(target.value);
    }
   const handleDate = ({target})=>
    {
      props.setdate(target.value);
    }
    const handleTime = ({target})=>
    {
      setTime(target.value);
    }
    const handleSubmit =async({target}) =>
    {
      const date = props.date;
      const age = props.age;
      const doctor = props.doctor;
      
      const appoinment = {
        name,
        address,
        phone,
        age,
        gender ,
        appoinmentnumber,
        type,
        date,
        time,
        doctor
    };
  await axios.post(`${cookies.proxy}/api/appointment/record`,appoinment)
  .then((res)=>{
    console.log(res.data);
    navigateTo('/receptionist');

  }).catch((err)=>{
    alert("Your appoinment have getting inturrupted.Try again");
    console.log(err);
  })

    }

    return(
        <Grid>
        <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
            <div> <img className='logo-img' src={logo} alt={'logo'} /></div>
            <h1>Make Appointment</h1>
            </Grid>
            <form>
            <br/>
                PATIENT DETAILS 
                <br/><br/>
                <TextField fullWidth label='Patient Name'  placeholder="Enter Patient Name" onChange={handleName} value={name}/>
                <br/><br/>
                <TextField fullWidth label='Address'  placeholder="Enter Address" onChange={handleAddress} value={address}/>
                <br/><br/>
                <TextField fullWidth label='Contact Number' placeholder="Enter Contact Number" onChange={handlecontactnumber} value={phone}/>
                <br/><br/>
                <TextField type="number" fullWidth label='Age' placeholder="Enter Age" value={props.age} onChange={handleAge}/>
                <br/><br/>
                <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" value={gender} style={{display:'initial'}} onChange={handlegender}>
                    <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                    <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                </RadioGroup>
                </FormControl>
                <br/>
                APPOINTMENT DETAILS
                <br/><br/>
                <TextField InputProps={{
                  startAdornment: <InputAdornment position="start">{props.type}</InputAdornment>,
                  }}type="number"  fullWidth label='Appoinment Number'placeholder="Enter Appoinment Number" onChange={handleappoinmentnumber} value={appoinmentnumber}/>
                <br/><br/>
                
                <FormControl sx={{marginTop: 2, width:450}}>
                <InputLabel id='Select_Type'  >Doctor</InputLabel>
                <Select 
                  label='Doctor'
                  labelId='select-Doctor-label'
                  id='doctor'
                  
                  name='doctor'
                  value={props.doctor} 
                  onChange={handleDoctor}
                    variant='standard' >
                        <MenuItem value=''>
                            <div style={{marginLeft: 80,width:350}}>Select</div>
                        </MenuItem>
                        <MenuItem value='Dr.Anurudda Yapa'>
                            <div style={{marginLeft: 80,width:350}}>Dr.Anurudda Yapa</div>
                        </MenuItem>
                        <MenuItem value='Dr.Samathi Rajapaksha'>
                            <div style={{marginLeft: 80,width:350}}>Dr.Samathi Rajapaksha</div>
                        </MenuItem>
                        <MenuItem value='Dr.Selvanagam Maheshvari'>
                            <div style={{marginLeft: 80,width:350}}>Dr.Selvanagam Maheshvari</div>
                        </MenuItem>
                        <MenuItem value='Dr.Ransiri Ubewarana'>
                            <div style={{marginLeft: 80,width:350}}>Dr.Ransiri Ubewarana</div>
                        </MenuItem>
                </Select>
            </FormControl>
                <br/><br/>
           
                <TextField fullWidth label='Type'  value={type} onChange={handleType}/>

           
                <br/><br/>
                <div style={{display:'flex'}}>
                <h5>Date</h5>
                <TextField type="date" fullWidth  onChange={handleDate} value={props.date}/>
                <h5>Time</h5>
                <TextField type="time" fullWidth  onChange={handleTime} value ={time}/>
                </div>
                <br/>
                <FormGroup>
               <FormControlLabel control={<Checkbox defaultChecked />} required label="I accept the terms and conditions." />
                </FormGroup>
                <div align="center" >
                <a href="/receptionist"><button className='button'>Cancel</button></a>
                <button className='button' onClick={(e)=>{
                 props.btnsetter(!props.btnstate);
                 handleSubmit(e);
            
                }} variant="contained"  style={{color:'white'}} >Confirm Appoinment</button>
                
                <br/>
                </div>
            </form>
        </Paper>
    </Grid> 
    )
}
