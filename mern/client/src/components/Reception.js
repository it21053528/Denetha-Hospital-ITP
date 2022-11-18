import React, { useState } from "react";
import '../App.css';
import './Receptionist/Reception.css';
import SearchBar from "./Receptionist/PatientSearch";
import { AppointType } from './Receptionist/AppointType';
import { Appoinment } from './Appoinment';
import { Receipt } from "./Receptionist/Receipt";
import { EditReceipt } from "./Receptionist/EditReceipt";

export const Reception = () => {

    const [selectedName, setSelectedName] = useState("");
    const [selectedPhone, setSelectedPhone] = useState("");
    const [AppoinmentType, setAppoinmentType] = useState("");
    const [Appointmentdate, setAppointmentdate] = useState("");
    const [Appointmentage,setAppointmentage] = useState();
    const [Appointmentdoctor, setAppointmentdoctor] = useState('');

    const [NewReceipt, setNewReceipt] = useState(false);
    const [editReceipt, seteditReceipt] = useState(false);
    const [NewAppoinment, setNewAppoinment] = useState(false);

    return (
        <>
        <div>
            {!NewAppoinment?<div>
                <h1 id='leftText'>Reception</h1>
                
                <SearchBar selectedName={selectedName} 
                            setSelectedName={setSelectedName} 
                            selectedPhone={selectedPhone} 
                            setSelectedPhone={setSelectedPhone}/>
                                    
                <a href="/AddPatientForm"> 
                <button className='button' id='newPatient' >Add New Patient &nbsp; <i className="fas fa-plus-circle"></i></button> 
                </a>
                
                <AppointType btnsetter={setNewAppoinment} btnstate={NewAppoinment} type={setAppoinmentType}/>
                
            </div> : !NewReceipt?
                <Appoinment btnsetter = {setNewReceipt} 
                            btnstate = {NewReceipt} 
                            name = {selectedName} 
                            phone = {selectedPhone} 
                            type = {AppoinmentType} 
                            setdate = {setAppointmentdate} 
                            date = {Appointmentdate}
                            age = {Appointmentage}
                            setage = {setAppointmentage}
                            doctor={Appointmentdoctor}
                            setdoctor={setAppointmentdoctor}/>
                :!editReceipt?
                    <Receipt btnsetter ={seteditReceipt} 
                             btnstate={editReceipt} 
                             name={selectedName} 
                             phone={selectedPhone}
                             type={AppoinmentType} 
                             date={Appointmentdate}
                             age={Appointmentage}
                             doctor={Appointmentdoctor}/>

                    :<EditReceipt   name={selectedName} 
                                    phone={selectedPhone}
                                    type={AppoinmentType} 
                                    date={Appointmentdate}
                                    age={Appointmentage}
                                    doctor={Appointmentdoctor}/>
            }              
                              
        </div>
       
        </>
    );
    
}
