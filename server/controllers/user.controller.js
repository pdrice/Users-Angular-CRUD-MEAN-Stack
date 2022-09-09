const express =require('express');
const httpStatusCodes = require('http-status-codes')

const router = express.Router();

const user = require('../models/user.model')

router.get('/', (req, res)=>{
   user.find().then(docs=>{
    res.send(docs)
   }).catch(err=>{
    res.status(500).send(err)
   })
});

router.get('/:id', (req, res)=>{
    let id = req.params.id
    user.findById(id).then(docs=>{
     res.send(docs);
    }).catch(err=>{
     res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err)
    })
 });
 

router.post('/', (req, res)=>{
    const obj = req.body;
    user.create(obj).then(docs=>{
     res.status(httpStatusCodes.CREATED).send(docs)
    }).catch(err=>{
     res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err)
    })
 });

router.put('/:id', (req, res)=>{
    let id = req.params.id;
    const obj = req.body;
    let userObj = {
        name:obj.name,
        contact: obj.contact,
        address:obj.address
    }
    user.findByIdAndUpdate(id,userObj).then(docs=>{
     res.status(httpStatusCodes.OK).send(docs)
    }).catch(err=>{
     res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err)
    })
 });

 router.delete('/:id', (req, res)=>{
    let id = req.params.id
    user.findByIdAndDelete(id).then(docs=>{
     res.status(httpStatusCodes.OK).send(docs);
    }).catch(err=>{
     res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err)
    })
 });

module.exports = router;