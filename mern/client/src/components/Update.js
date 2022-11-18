import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { Select,InputLabel, FormGroup, Button, Grid ,Paper, TextField,Radio ,RadioGroup, FormLabel, FormControl, Checkbox, FormControlLabel,Box,MenuItem } from "@mui/material";
import '../Appoinment.css';
import '../App.css';

export default function Update() {
 const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    age: "",
    gender: "",
    appoinmentnumber: "",
    type: "",
    date: "",
    time: "",
    doctor: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 const logo = require('../image/denethaLogo.png');
 const paperStyle={padding:'30px 30px',width:'450px',margin:"20px auto"}
    const buttonColor={background:'#2A628F' ,padding:'10px 97px',margin :'5px',width:100}
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();

     await axios.post(`http://localhost:5000/api/appointment/get/${id}`)
     .then(({data}) => {
        setForm(data);
     }).catch((err) => {
        window.alert(`Record with id ${id} not found`);

       
        
        return;
     });
  
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);

 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   const editedPerson = {
    name: form.name,
    address: form.address,
    phone: form.phone,
    age: form.age,
    gender:form.gender,
    appoinmentnumber: form.appoinmentnumber,
    type: form.type,
    date: form.date,
    time: form.time,
    doctor: form.doctor,
   };

   console.log(editedPerson);

   await axios.post(`http://localhost:5000/api/appointment/update/${params.id}`, editedPerson)
   .then(()=>navigate("/AppoinmentTable"))
   .catch((err)=>console.log(err));

 }

 return (
    <Grid>
        <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
            <div> <img className='logo-img' src={logo} alt={'logo'} /></div>
            <h1>Edit Appoinment</h1>
            </Grid>
            <form>
            <br/>
                PATIENT DETAILS 
                <br/><br/>
                <TextField fullWidth label='Patient Name'id="name" placeholder="Enter Patient Name" onChange={(e) => updateForm({ name: e.target.value })} value={form.name}/>
                <br/><br/>
                <TextField fullWidth label='Address' placeholder="Enter Address" onChange={(e) => updateForm({ address: e.target.value })} value={form.address}/>
                <br/><br/>
                <TextField fullWidth label='Phone number' placeholder="Enter phone number" onChange={(e) => updateForm({ phone: e.target.value })} value={form.phone}/>    
                <br/><br/>
                <TextField type="number" fullWidth label='Age' placeholder="Enter Age" onChange={(e) => updateForm({ age: e.target.value })} value={parseInt(form.age)}/>    
                <br/><br/>
                <TextField fullWidth label='Gender' placeholder="Enter gender" onChange={(e) => updateForm({ gender: e.target.value })} value={form.gender}/>    
                <br/><br/>
                APPOINMENT DETAILS
                <br/><br/>
                <TextField type="number" fullWidth label='Appointment number' placeholder="Enter Appointment number" onChange={(e) => updateForm({ appoinmentnumber: e.target.value })} value={parseInt(form.appoinmentnumber)}/>     
                <br/><br/>
                
                <TextField fullWidth label='Type' placeholder="Enter Type" onChange={(e) => updateForm({ type: e.target.value })} value={form.type}/> 
                <br/><br/>
                <TextField fullWidth label='Doctor' placeholder="Enter the doctor" onChange={(e) => updateForm({ doctor: e.target.value })} value={form.doctor}/>
                <br/><br/>
                <div style={{display:'flex'}}>
                <h5>Date</h5>
                <TextField fullWidth  type="date" placeholder="Enter date" onChange={(e) => updateForm({ date: e.target.value })} value={form.date}/>
                <h5>Time</h5>
                <TextField fullWidth  type="time" placeholder="Enter time" onChange={(e) => updateForm({ time: e.target.value })} value={form.time}/>
                </div>
                <br/>
                <FormGroup>
               <FormControlLabel control={<Checkbox defaultChecked />} required label="I accept the terms and conditions." />
                </FormGroup>
                <div align="center" >
                <Button className='button' onClick={onSubmit} variant="contained" style={{color:'white'}}  >Submit</Button>
                </div>
            </form>
        </Paper>
    </Grid> 
 );
}