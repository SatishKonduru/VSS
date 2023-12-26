const express = require('express')
const connection = require('../connection')
const router = express.Router()
var auth =require('../services/authentication')
     angularCount = 0 ;
     backendCount = 0
     dbaCount = 0
router.get('/details',auth.authenticateToken, (req, res) => {
     
     query = "select count(id) as angularCount from users where department='Angular' " 
    connection.query(query, (err, results) => {
        if(!err){
            angularCount  = results[0].angularCount
         }
        else{
            return res.status(500).json(err)
        }
    })

    var query = "select count(id) as backendCount from users where department='backend' " 
    connection.query(query, (err, results) => {
        if(!err){
            backendCount = results[0].backendCount
        }
        else{
            return res.status(500).json(err)
        }
    })

    var query = "select count(id) as dbaCount from users where department='DBA' " 
    connection.query(query, (err, results) => {
        if(!err){
            dbaCount = results[0].dbaCount
            var data = {
                angular: angularCount,
                backend: backendCount,
                dba: dbaCount
            }
            return res.status(200).json(data)
        }
        else{
            return res.status(500).json(err)
        }
    })




})

module.exports = router