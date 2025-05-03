const express = require('express');
const router = express.Router();
const Person = require('../models/person')

const userController = require('../controllers/personControllers');

router.get('/', userController.getAllUsers);

router.post('/',async(req,res)=>{
    try {
        const data = req.body
        const newPerson = new Person(data)

        const response = await newPerson.save()
        console.log("data inserted");

        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.get('/:worktype',async (req,res)=>{
    try {
        const worktype = req.params.worktype
        if(worktype === 'chef' || worktype === 'manager' || worktype === 'waiter'){
            const response = await Person.find({work:worktype});
            console.log('data fetch');
            res.status(200).json(response )

        } else {
            res.status(404).json({error:'invalid work type'} )
        }
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.put('/:Id',async(req,res)=>{
    try {
        const personId = req.params.Id
        const updatedData = req.body;
        const response = await Person.findByIdAndUpdate(personId,updatedData,{
            new:true,
            runValidators:true
        })
        if(!response) {
            return res.status(404).json({error:"Person not found !"})
        }

        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.delete('/:Id',async(req,res)=>{
    try {
        const personId = req.params.Id
        const response = await Person.findByIdAndDelete(personId)
        if(!response) {
            return res.status(404).json({error:"Person not found !"})
        }

        res.status(200).json({message:"Person deleted successfully."})
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

module.exports = router;