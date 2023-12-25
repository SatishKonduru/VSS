const express = require('express')
const connection = require('../connection')
const router = express.Router()

router.post('/signup', (req, res) => {
    let user = req.body
    var query = "select email from users where email =?"
    connection.query(query,[user.email], (err, results) => {
        if(!err){
            if(results.length <= 0){
                query = "insert into users (name, contactNumber, email, password, status, department,  role) values (?,?,?,?,'false',?,'user')"
                connection.query(query, [user.name, user.contactNumber, user.email,user.password, user.department], (err, results) => {
                    if(!err){
                        return res.status(200).json({message: 'Registerd Successfully.'})
                    }
                    else{
                        return res.status(500).json(err)
                    }
                })

            }
            else{
                return res.status(400).json({message: 'Email already exist'})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
})



module.exports = router