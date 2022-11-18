import React,{useState ,useEffect} from "react";
import { Select,InputLabel, FormGroup, Button, Grid ,Paper, TextField,Radio ,RadioGroup, FormLabel, FormControl, Checkbox, FormControlLabel,Box,MenuItem } from "@mui/material";
import '../Vendor.css';
import { NavLink,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { Help } from "./Help";

export const Vendor=() =>{
   
    const [post,setPost] = useState(null);
    const paperStyle={padding:'30px 30px',width:'450px',margin:"20px auto"}
    const buttonColor={background:'#2A628F' ,padding:'10px 97px',margin :'5px',width:100}
    const buttongreenColor = {background:'#3D8361',padding:'10px 97px',margin :'5px',width:100};
    const [Vendorcode,setVendorcode] = useState('');
    const [Vendorname,setVendorname] = useState('');
    const [Contactno,setContactno] = useState('');
    const [Address,setAddress] = useState('');
    const [Emailaddress,setEmailaddress] = useState('');
    const [type,settype] = useState('');
    const [Status,setStatus] = useState('');
    //const [time,setTime] = useState('');
    const [cookies] = useCookies('proxy');
    const navigateTo = useNavigate();
    const logo = require('../image/denethaLogo.png');

    const handleVendorcode= ({target}) =>
    {
      setVendorcode(target.value);
    }
    const handleVendorname= ({target}) =>
    {
      setVendorname(target.value);
    }
    const handleContactno =({target}) =>
    {
      setContactno(target.value);
    }
    const handleAddress= ({target}) =>
    {
      setAddress(target.value);
    }
    const handleEmailaddress =({target}) =>
    {
      setEmailaddress(target.value);
    }
    const handletype = ({target})=>
    {
      settype(target.value);
    }
   const handleStatus = ({target})=>
    {
      setStatus(target.value);
    }
    const handleSubmit =async({target}) =>
    {
      const vendor = {
        Vendorcode: Vendorcode,
        Vendorname: Vendorname,
        Contactno: Contactno,
        Address: Address,
        Emailaddress: Emailaddress,
        type:type,
        Status: Status
    };
  await axios.post(`${cookies.proxy}/api/inventory/record`,inventory)
  .then((res)=>{
    alert("Your inventory item successfully added");
  console.log(res.data);
  //navigateTo('/appoinmenttable');

  }).catch((err)=>{
    alert("Your inventory getting inturrupted.Try again");
    console.log(err);
  })

    }

    return(
        <Grid>
        <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
            <div> <img className='logo-img' src={logo} alt={'logo'} /></div>
            <h1>Make Item</h1>
            </Grid>
            <form>
            <br/>
                ITEM DETAILS 
                <br/><br/>
                <TextField fullWidth label='Item Code' placeholder="Enter Item Code" onChange={handleitemcode} value={Itemcode}/>
                <br/><br/>
                <TextField fullWidth label='Item Name' placeholder="Enter Item Name" onChange={handleitemname} value={Itemname}/>
                <br/><br/>
                <TextField fullWidth label='Vendor Code' placeholder="Enter Vendor Code" onChange={handlevendorcode} value={Contactnumber}/>
                <br/><br/>
                <TextField fullWidth label='Location'placeholder="Enter Location" onChange={handlelocation} value={Location} />
                <br/><br/>
                <TextField fullWidth label='Quantity'placeholder="Enter Quantity" onChange={handlequantity} value={Quantity} />
                <br/><br/>
                <TextField fullWidth label='Cost'placeholder="Enter Cost" onChange={handlecost} value={Cost} />
                <br/><br/>
                <TextField type="Type" fullWidth label='Type'placeholder="Enter Type" onChange={handletype} value={Type}/>
                <br/><br/>
                <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup aria-label="status" value={Gender} style={{display:'initial'}} onChange={handlestatus}>
                    <FormControlLabel value="available" control={<Radio/>} label="Available"/>
                    <FormControlLabel value="notavilable" control={<Radio/>} label="NotAvailable"/>
                </RadioGroup>
                </FormControl>
                <br/>
                
                
           
                <br/><br/>
                <div style={{display:'flex'}}>
                <h5>Date</h5>
                <TextField type="date" fullWidth onChange={handleDate} value={date}/>
                <h5>Time</h5>
                <TextField type="time" fullWidth onChange={handleTime} value ={time}/>
                </div>
                <br/>
                <FormGroup>
               <FormControlLabel control={<Checkbox defaultChecked />} required label="I accept the terms and conditions." />
                </FormGroup>
                <div align="center" >
                <Button  onClick={handleSubmit} variant="contained" style={buttonColor}>Submit</Button>
                <Button  variant="contained" style={buttonColor}><NavLink to='/inventorytable' style={{color:'black'}} >
                               Inventory Table
                                </NavLink></Button>
                <br/>
                </div>
            </form>
        </Paper>
    </Grid> 
    )
}