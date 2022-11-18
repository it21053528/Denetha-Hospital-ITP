const router = require('express').Router();
const Help = require('../models/HelpModel');

router.route('/record').post(async (req, res) => {

    const {
        priority,
        discription,
        message,
        type ,
    } = req.body;

    const newRecord = new Help({
        priority,
        discription,
        message,
        type ,
       
    });
    
    await newRecord.save().then((result)=>{
            res.json(result);
    
    }).catch((err)=>{
            console.log(err);
    })

    router.route("/delete/:pid").delete(async(req,res)=>{
        let sid = req.params.pid;
        await Help.findByIdAndDelete(sid).then(()=>{
            res.status(200).send({status:"Details Deleted"});
        }).catch((err)=>{
            console.log(err.message);
            res.status(500).send({status:"Error with deleting user",error:err.message})
    })
    })
    
    router.route("/update/:pid").put(async(req,res)=>{
        let sid = req.params.pid;
        //destructure
        const{priority,discription,message,type} = req.body;

        const updatedata = {
            priority,discription,message,type
        }

        const update = await Help.findByIdAndUpdate(sid,updatedata)
        .then(()=>{
            res.status(200).send({status:"Updated Help details"})  
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"Error with updating data",error:err.message});
            })

        })


    router.route("/").get((req,res)=>{
        Help.find().then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err);
        })
    })
       
});

module.exports = router;

