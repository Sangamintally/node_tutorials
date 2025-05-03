const express = require('express');
const Person = require('../models/person')

exports.getAllUsers = async(req,res)=>{
    try {
        const data = await Person.find()
        console.log("data inserted");

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
}    
