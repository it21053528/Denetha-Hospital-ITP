const router = require('express').Router();
const PettyCash = require('../models/PettyCashModel');

router.route('/add').post(async (req, res) => {
    const {
        pcRoot,
        vNum,
        pcItem,
        type,
        date,
        amount,
    } = req.body;

    const currentDate = Date.now();

    const newRecord = new PettyCash({
        pcRoot,
        vNum,
        pcItem,
        type,
        date,
        amount,
        lastEdit: currentDate});
    
    await newRecord.save().then(()=>{
        res.status(200).send({status: 'Petty cash record added'});
    }).catch((err)=> {
        res.status(500).send({status: 'Error: Petty cash record not added', Error: err.message});
    });
});

router.route('/getdata').post(async (req, res) => {
    const id = '62fb3bd5529566688cf964fa';

    await PettyCash.findById(id).then((result)=>{
        if(result){
            res.json(result);
        }else{
            res.status(200).send({message: `No results for ${id}`});
        }
    }).catch((err)=>{
        res.status(500).send({message: 'Error', error: err.message});
    });
});

router.route('/getSelected/:root').post(async (req, res) => {
    const search = {pcRoot: req.params.root};

    await PettyCash.find(search).then((result)=>{
        if(result){
            res.json(result);
        }else{
            res.status(200).send({message: `No results with root ${search}`});
        }
    }).catch((err)=>{
        res.status(500).send({message: 'Error', error: err.message});
    });
});

router.route('/get').post(async (req, res) => {

    await PettyCash.find({}).then((result)=>{
        if(result){
            const rootList = result.map((item) => (item.pcRoot))
            .filter((item, i, self) => (self.indexOf(item)===i));
            const filtered = rootList.filter((item)=>(item!=null))

            res.json(filtered);
        }else{
            res.status(200).send({message: `No results`});
        }
    }).catch((err)=>{
        res.status(500).send({message: 'Error', error: err.message});
    });
});

router.route('/update/:oid').post(async (req, res) => {
    const {
        pcRoot,
        vNum,
        pcItem,
        type,
        date,
        amount,
        editor
    } = req.body;

    const id = req.params.oid;
    const currentDate = Date.now();

    const updateRecord = {
        pcRoot,
        vNum,
        pcItem,
        type,
        date,
        amount,
        lastEdit: currentDate,
        editor
    };

    await PettyCash.findByIdAndUpdate(id, updateRecord).then((result)=>{
        res.status(200).send({message: 'Petty cash record updated'});
    }).catch((err)=>{
        res.status(500).send({message: 'Error: Update unsuccessful', error: err.message});
    });
});

router.route('/updateData').post(async (req, res) => {
    const id = '62fb3bd5529566688cf964fa';
    const {reserve} = req.body;

    const updateRecord = {reserve};

    await PettyCash.findByIdAndUpdate(id, updateRecord).then((result)=>{
        res.status(200).send({message: 'Record updated'});
    }).catch((err)=>{
        res.status(500).send({message: 'Error: Update unsuccessful', error: err.message});
    });
});

router.route('/delete/:oid').post(async (req, res) => {
    const id = req.params.oid;

    await PettyCash.findByIdAndDelete(id).then((result)=>{
        res.status(200).send({message:'Petty cash record Deleted'});
    }).catch((err)=>{
        res.status(500).send({status: 'Error: Delete unsuccessful', error: err.message});
    });
});

router.route('/deleteRoot/:root').post(async (req, res) => {
    const root = req.params.root;

    await PettyCash.deleteMany({pcRoot: root}).then((result)=>{
        res.status(200).send({message:'Petty cash root Deleted', status: result});
    }).catch((err)=>{
        res.status(500).send({status: 'Error: Delete unsuccessful', error: err.message});
    });
});


module.exports = router;