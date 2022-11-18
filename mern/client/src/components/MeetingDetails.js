import React from 'react';
import {Header} from './Header.js';
function App(){
    return(
  
        <div class = "MeetingDetails">
            <div class = "block1">
                <input type = "button" id = "btn1"/>Staff List
                <h1>Meeting Timetable</h1>
                <input type = "button" id = "btn2"/>Download
            </div>

            <table>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Host</th>
                    <th>Description</th>
                </tr>
                
            </table>
        </div>
    );
}