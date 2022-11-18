import React,{useState ,useEffect} from "react";
import { Select,InputLabel, FormGroup, Button, Grid ,Paper, TextField,Radio ,RadioGroup, FormLabel, FormControl, Checkbox, FormControlLabel,Box,MenuItem } from "@mui/material";
import '../Appoinment.css';
import axios from 'axios';
import {useCookies} from 'react-cookie';
export const AppointmentMainpage=() =>{
 const buttonColor={background:'#2A628F' ,padding:'10px 97px',margin :'5px',width:100};
 
    return(
        <>
        <div className="upbackground" >
           <p className="text"> Appoinment Home Page </p> <br/>
           <p className="description">We care your eye We are Denetha eye hospital care.</p>
           <Button className="btn">Make Appoinment</Button>
           <Button>View Appoinment</Button>
        </div>
        <div className="middlebackground">
            <p>Denetha Hospital</p>
            <p>Denetha hospital appoinment home page</p>
        </div>
        </>
      
    )
}
