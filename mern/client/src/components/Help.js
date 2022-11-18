import React,{useState ,useEffect,NavLink} from "react";
import { Grid ,Paper, TextField, Typography,Radio ,RadioGroup, FormLabel, FormControl, Checkbox,Select,InputLabel, 
    FormControlLabel,TextareaAutosize ,FormGroup,Box,MenuItem} from "@mui/material";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import '../App.css';
export const Help=() =>{
    const paperStyle={padding:'30px 30px',width:'450px',margin:"20px auto"}
    const buttonColor={background:'#2A628F' ,padding:'10px 97px',margin :'5px',width:100}
    const [Priority,setPriority] = useState('');
    const [Description,setDescription] = useState('');
    const [Message,setMessage] = useState('');
    const [Type,setType] = useState('');
    const [cookies] = useCookies('proxy');
   
    const logo = require('../image/denethaLogo.png');
    
    const navigate = useNavigate();
    const navigateToAddNew = () => {
        navigate('/helptable');
      };
    const [records, setRecords] = useState([]);

    const handlePriority = ({target}) =>
    {
        setPriority(target.value);
    }
    const handleDescription = ({target}) =>
    {
        setDescription(target.value);
    }
    const handleType =({target}) =>
    {
        setType(target.value);
    }
    const handleMessage= ({target}) =>
    {
        setMessage(target.value);
    }
    const handleSubmit =async({target}) =>
    {
      const Help = {
        priority:Priority,
        discription:Description,
        message:Message,
        type:Type ,
    };
  await axios.post(`${cookies.proxy}/api/help/record`,Help)
  .then((res)=>{
    alert("Success")
  console.log(res.data);
  }).catch((err)=>{
    alert("Unsuccess")
    console.log(err);
  })
    }
    return(
        <Grid >
        <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
            <div> <img className='logo-img' src={logo} alt={'logo'} /></div>
            <h1>Help</h1>
            
            </Grid>
            <form>
                <br/>
                
                <FormControl sx={{marginTop: 2, width:450}}>
                <InputLabel id='Select_Type'  >Priority Value</InputLabel>
                <Select 
                  label='priority'
                  labelId='select-priority-label'
                  id='Priority'
                  name='Priority'
                  value={Priority} 
                  onChange={handlePriority}
                    variant='standard' >
                        <MenuItem value=''>
                            <div style={{marginLeft: 80,width:350}}>Select</div>
                        </MenuItem>
                        <MenuItem value='High'>
                            <div style={{marginLeft: 80,width:350}}>High</div>
                        </MenuItem>
                        <MenuItem value='Middle'>
                            <div style={{marginLeft: 80,width:350}}>Normal</div>
                        </MenuItem>
                        <MenuItem value='Low'>
                            <div style={{marginLeft: 80,width:350}}>Low</div>
                        </MenuItem>
                </Select>
            </FormControl>
                <br/><br/>
                <TextField fullWidth label='Discription'placeholder="Enter Discription" value={Description}  onChange={handleDescription}/>
                <br/><br/>
                <FormLabel component="legend">Message</FormLabel>
                <TextareaAutosize value={Message} style={{ width: 400, height:100 }}  onChange={handleMessage}/>
                <FormControl component="fieldset">
                <FormLabel component="legend">Classify Support</FormLabel>
                <RadioGroup  value={Type} aria-label="support" name="support" style={{display:'initial'}} onChange={handleType}>
                    <FormControlLabel value="tecnicalsupport" control={<Radio/>} label="Tecnical Support"/>
                    <FormControlLabel value="adminsupport" control={<Radio/>} label="Admin Support"/>
                </RadioGroup>
                </FormControl>
                <br/><br/>
                <div align="center">
                <button onClick={handleSubmit} className='button' variant="contained"  style={{color:'black'}} >Submit</button>
                <button onClick={navigateToAddNew} className='button' variant="contained"  style={{color:'white'}} >View</button>
                </div>
            </form>
        </Paper>
    </Grid>
    )
}
