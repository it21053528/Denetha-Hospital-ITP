import './Patients/Patients.css';
import '../App.css';
import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import { PatientProfile } from './Patients/PatientProfile';
import Dialog from '@mui/material/Dialog';
import {DialogContent} from '@mui/material';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const eyeicon = require('../image/eye.png');

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Patients = () => {
    const [records, setRecords] = useState([]);
    const [selected, setSelected] = useState();

    const [searchTerm, setsearchTerm] = useState("");

    const [open, setOpen] = useState(false);
    const navigateTo = useNavigate();

    async function getRecords() {
        const response = await fetch("http://localhost:5000/api/patient/get");

        if(!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const records = await response.json();
        setRecords(records);
    }

    //This method fetches the records from the database
    useEffect(() => {
        getRecords();
    }, [records.length]);

    function recordList() {
        return records
        .filter((val) => {

            if (searchTerm === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
    
          }).map((record, i) => {
            return (
                <Record
                    record = {record}
                    id = {i}
                    key = {record._id}/>
            );
        });
    }
   
    const Record = (props) => (
       
       <tr>
           <td id='patientTd'>{props.record.name}</td>
           <td id='patientTd'>{props.record.phone}</td>
           <td id='patientTd'>{props.record.age}</td>
           <td id='patientTd'><img id="redirecting" src={eyeicon} alt='eyeicon' className='view-icon'
                onClick={() => {
                    setSelected(props.id);
                    setOpen(true);}}/>
            </td>
   
       </tr>
       
    );

    const handleClose = () => {
        setOpen(false);
        setSelected(null);
        navigateTo('/patient');
    };

    function closeWindow(e) {
        navigateTo('/patient');
    }


    return (
        <>

        <form class="PatientSearchBar">
            <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search Patient Name..."
                aria-label="Search"
                onChange={(e) => {
                    setsearchTerm(e.target.value);
                    console.log(e.target.value);
                }}/>
        </form>


        <div className='patienttableMainPage'>
            <table className='table1'>
                <thead>
                    <tr>
                        <th id='patientTh'>Patient Name</th>
                        <th id='patientTh'>Phone Number</th>
                        <th id='patientTh'>Age</th>
                        <th id='patientTh'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {recordList()}
                </tbody>
            </table>
        </div>

        <Dialog className='patientDialog'
            fullScreen
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}>
            <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                <CloseIcon
                    onClick={closeWindow}/>
                </IconButton>
            </Toolbar>
            </AppBar>

            <DialogContent>
                <PatientProfile selected={selected}/>
            </DialogContent>
                
        </Dialog>
        </>
    );
}