import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
 
export default function Edit() {
 const [form, setForm] = useState({
    priority: "",
    discription: "",
    message: "",
    type: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();

     await axios.get(`http://localhost:5000/api/Help/get/${params.id.toString()}`)
     .then(({data}) => {
        setForm(data);
     }).catch((err) => {
        window.alert(`Record with id ${id} not found`);
        navigate("/surgery");
        return;
     });

   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
    priority: form.priority,
    discription: form.discription,
    message: form.message,
    type: form.type,
   };
 
   // This will send a put request to update the data in the database.
   await fetch(`http://localhost:5000/api/Help/update/${params.id}`, {
     method: "PUT",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/surgery");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     
     <form onSubmit={onSubmit} className = "formcolor">
     <div className="container2">
       
       
       <br/> <br/><br/> 
           <div className="form-group">
               <h2 className="h2cssIWAnt">Update Patient Record</h2><br/>
               <label htmlFor="priority">Priority  : </label>
               <input type="text" className="form-control" id="priority"  placeholder="Enter Next Number" value={form.priority}
           onChange={(e) => updateForm({ priority: e.target.value })}/>    
           </div>
               <br/>
           <div className="form-group">
               <label htmlFor="pname">Discription  :</label>&nbsp;&nbsp;&nbsp;&nbsp;
               <input type="text" className="form-control" id="discription"  placeholder="Enter Patient's Name"  value={form.discription}
           onChange={(e) => updateForm({ discription: e.target.value })}
           />    
           </div><br/>

           <div className="form-group">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <label htmlFor="number">Message :</label>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <input type="text" className="form-control" id="message"  placeholder="Enter Message" value={form.message}
           onChange={(e) => updateForm({ message: e.target.value })}/>    
           </div><br/>

           <br/>
           <button type="submit"
           value="Update Record" className="button" >Update</button>
           <br/><br/> <br/>
         
          
           <button type="submit" className="button" > ⇇Back </button>
           </div>

     </form>
   </div>
 );
}