

import React,{useState ,useEffect} from "react";
import { Select,InputLabel, FormGroup, Button, Grid ,Paper, TextField,Radio ,RadioGroup, FormLabel, FormControl, Checkbox, FormControlLabel,Box,MenuItem } from "@mui/material";
import './Inventory.css';
import { NavLink,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useCookies} from 'react-cookie';


export const Inventory=() =>{
   
    const [post,setPost] = useState(null);
    const paperStyle={padding:'30px 30px',width:'450px',margin:"20px auto"}
    const buttonColor={background:'#2A628F' ,padding:'10px 97px',margin :'5px',width:100}
    const buttongreenColor = {background:'#3D8361',padding:'10px 97px',margin :'5px',width:100};
    const [Itemcode,setItemcode] = useState('');
    const [Itemname,setItemname] = useState('');
    const [Vendorcode,setVendorcode] = useState('');
    const [Location,setLocation] = useState('');
    const [Quantity,setQuantity] = useState('');
    const [Cost,setCost] = useState('');
    // const [type, settype] = useState('');
    const [Status,setStatus] = useState('');
    //const [time,setTime] = useState('');
    const [cookies] = useCookies('proxy');
    const navigateTo = useNavigate();
    const logo = require('../image/denethaLogo.png');

    const handleItemcode= ({target}) =>
    {
      setItemcode(target.value);
    }
    const handleItemname= ({target}) =>
    {
      setItemname(target.value);
    }
    const handleVendorcode =({target}) =>
    {
      setVendorcode(target.value);
    }
    const handleLocation= ({target}) =>
    {
      setLocation(target.value);
    }
    const handleQuantity =({target}) =>
    {
      setQuantity(target.value);
    }
    const handleCost =({target}) =>
    {
      setCost(target.value);
    }
    // const handletype = ({target})=>
    // {
    //   settype(target.value);
    // }
   const handleStatus = ({target})=>
    {
      setStatus(target.value);
    }
    const handleSubmit =async({target}) =>
    {
      const inventory = {
        Itemcode: Itemcode,
        Itemname: Itemname,
        Vendorcode: Vendorcode,
        Location: Location,
        Quantity: Quantity,
        Cost:Cost,
        // type:type,
        Status: Status
    };
    
  await axios.post(`${cookies.proxy}/api/inventory/record`,inventory)
  .then((res)=>{
    alert("Your inventory item successfully added");
  console.log(res.data);
  navigateTo('/inventorytable');

  }).catch((err)=>{
    alert("Your inventory getting inturrupted.Try again");
    console.log(err);
  })

    }

    function navigation(e) {
      navigateTo('/Inventorytable')
    }

    return(
        <Grid>
        <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
            <div> <img className='logo-img' src={logo} alt={'logo'} /></div>
            <h1>Add Item</h1>
            </Grid>
            <form>
            <br/>
                ITEM DETAILS 
                <br/><br/>
                <TextField fullWidth label='Item Code' placeholder="Enter Item Code" onChange={handleItemcode} value={Itemcode}/>
                <br/><br/>
                <TextField fullWidth label='Item Name' placeholder="Enter Item Name" onChange={handleItemname} value={Itemname}/>
                <br/><br/>
                <TextField fullWidth label='Vendor Code' placeholder="Enter Vendor Code" onChange={handleVendorcode} value={Vendorcode}/>
                <br/><br/>
                <TextField fullWidth label='Location'placeholder="Enter Location" onChange={handleLocation} value={Location} />
                <br/><br/>
                <TextField fullWidth label='Quantity'placeholder="Enter Quantity" onChange={handleQuantity} value={Quantity} />
                <br/><br/>
                <TextField fullWidth label='Cost'placeholder="Enter Cost" onChange={handleCost} value={Cost} />
                <br/><br/>
                {/* <TextField type="Type" fullWidth label='Type'placeholder="Enter Type" onChange={handletype} value={Type}/> */}
                <br/><br/>
                <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup aria-label="status" value={Status} style={{display:'initial'}} onChange={handleStatus}>
                    <FormControlLabel value="available" control={<Radio/>} label="Available"/>
                    <FormControlLabel value="notavilable" control={<Radio/>} label="NotAvailable"/>
                </RadioGroup>
                </FormControl>
                <br/>
                
                
           
                
               
                <div align="center" >
                <Button  onClick={handleSubmit} variant="contained" style={buttonColor}>Submit</Button>
                <Button  variant="contained" onClick={navigation} style={buttonColor}>Inventory Table</Button>
                <br/>
                </div>
            </form>
        </Paper>
    </Grid> 
    )
}
