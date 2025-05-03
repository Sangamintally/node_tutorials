const express = require('express');
const router = express.Router();

const MenuItem = require('../models/menu')

router.get('/',async(req,res)=>{
    try {
        const data = await MenuItem.find()
        console.log("data inserted");

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.post('/',async(req,res)=>{
    try {
        const data = req.body
        const newMenu = new MenuItem(data)

        const response = await newMenu.save()
        console.log("data inserted menu");

        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})



router.get('/:taste',async (req,res)=>{
    try {
        const taste = req.params.taste
        if(taste === 'sweet' || taste === 'spicy' || taste === 'sour'){
            const response = await MenuItem.find({taste:taste});
            console.log('data fetch');
            res.status(200).json(response )

        } else {
            res.status(404).json({error:'invalid taste type'} )
        }
    } catch (error) {
        res.status(500).json(error)
        
    }
})

module.exports = router
