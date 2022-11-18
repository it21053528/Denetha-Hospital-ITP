import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useCookies } from 'react-cookie';

import PurchaseOrder from './Accountant/PurchaseOrder';
import Accounts from './Accountant/Accounts';
import PettyCash from './Accountant/PettyCash';

export const Accountant = () => {
    const [display, setDisplay] = useState('purchaseOrder');
    const [POdata, setPOdata] = useState([]);
    const [PCdata, setPCdata] = useState([]);
    const [cookies] = useCookies('proxy');

    const getPOdata = async () => {
        await axios.post(`${cookies.proxy}/api/purchaseOrder/get`, {})
        .then((response) => {setPOdata(response.data)})
        .catch((err) => {console.log(err)});
    };
    const getPCdata = async () => {
        await axios.post(`${cookies.proxy}/api/pettyCash/get`, {})
        .then((res) => {setPCdata(res.data)})
        .catch((err)=> {console.log(err)});
    };

    useEffect(()=>{
        getPOdata();
        getPCdata();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //event handlers
    const purchaseOrderOnClick = () => {
        setDisplay('purchaseOrder');
    };
    const AccountsOnClick = () => {
        setDisplay('accounts');
    };
    const pettyCashOnClick = () => {
        setDisplay('pettyCash')
    };

    return(
        <>
            <div className='basic'>
                <br />
                <button 
                    className='button navButton' 
                    onClick={purchaseOrderOnClick} 
                    disabled={display==='purchaseOrder' ? true : false}>
                    PURCHASE ORDERS
                </button>
                <button 
                    className='button navButton' 
                    onClick={pettyCashOnClick}
                    disabled={display==='pettyCash' ? true : false}>
                    PETTY CASH
                </button>
                <button 
                    className='button navButton' 
                    onClick={AccountsOnClick}
                    disabled={display==='accounts' ? true : false}>
                    INCOME
                </button>
                <div>
                    {display==='purchaseOrder' && <PurchaseOrder data={POdata} getPO={getPOdata} />}
                    {display==='accounts' && <Accounts />}
                    {display==='pettyCash' && <PettyCash data={PCdata} getPC={getPCdata} />}
                </div>
            </div>
        </>
    );
};