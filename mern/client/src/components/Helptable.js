import React, { useEffect, useState } from "react";
import '../Appoinment.css';
import '../App.css';
import {Button} from "@mui/material";
const Record = (props) => (
 <tr>
   <td>{props.record.priority}</td>
   <td>{props.record.discription}</td>
   <td>{props.record.message}</td>
   <td>{props.record.type}</td>
   <td>
  
     <button className='button' variant="contained"  style={{color:'black'}}
       onClick={() => {
        if (window.confirm("Are you sure you want to delete?") === true) {
          props.deleteRecord(props.record._id);
        }
       }}
        
     >
       <i className="fas fa-trash-alt"></i></button>
   </td>
 </tr>
);

export default function HelpTable() {
  
const [records, setRecords] = useState([]);

useEffect(() => {
 async function getRecords() {
   const response = await fetch(`http://localhost:5000/api/help/`);

   if (!response.ok) {
     const message = `An error occurred: ${response.statusText}`;
     window.alert(message);
     return;
   }

   const records = await response.json();
   setRecords(records);
 }

 getRecords();

 return;
}, [records.length]);

// This method will delete a record
async function deleteRecord(id) {
 await fetch(`http://localhost:5000/api/help/delete/${id}`, {
   method: "DELETE"
 });

 const newRecords = records.filter((el) => el._id !== id);
 setRecords(newRecords);
}


function recordList() {
 return records.map((record) => {
   return (
     <Record
       record={record}
       deleteRecord={() => deleteRecord(record._id)}
       key={record._id}
     />
   );
 });
}

return (
  <div className="arrange" >
   <h2 style={{marginLeft:420}}>Help Details</h2>
    <table className="content-table" style={{ marginTop: 20 }}>
      <thead>
        <tr>
          <th>Priority</th>
          <th>Discription</th>
          <th >Message</th>
          <th >Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{recordList()}</tbody>
    </table>
  </div>
);
}