const express = require('express')
const connection = require('../connection')
const router = express.Router()
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
require('dotenv').config()


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

router.post('/signup', (req, res) => {
    let user = req.body
    var query = "select email from users where email =?"
    connection.query(query,[user.email], (err, results) => {
        if(!err){
            if(results.length <= 0){
                query = "insert into users (name, contactNumber, email, password, status, department,  role, img) values (?,?,?,?,'false',?,'user','')"
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

router.post('/forgotPassword', (req, res) => {
    const user = req.body
    query = "select email, password from users where email = ?"
    connection.query(query, [user.email], (err, results) => {
        if(!err){
            if(results.length <= 0){
                return res.status(401).json({message: 'Invalid email'})
            }
            else{
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password sent by Varada Software Solutions',
                    html: '<p><b>Your Password: </b><br><h1>'+results[0].password+'</h1><br><h6><a href="http://localhost:4200"> Click here to Login.</a></h6></p>'
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("Email Sent.")
                    }
                })
                return res.status(200).json({message: 'Password sent to your email.'})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.post('/login', (req, res) => {
    const user = req.body
    query = "select email, password, role, status from users where email=?"
    connection.query(query, [user.email],(err, results) => {
        if(!err){
            if(results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({message: 'Invalid username/password'})
            }
            else if(results[0].status === 'false'){
                return res.status(401).json({message: 'Please wait for Admin Approval'})
            }
            else if(results[0].password == user.password){
                const payLoad = {
                    email: results[0].email,
                    role: results[0].role
                }
                const accessToken = jwt.sign(payLoad, process.env.SECRET_KEY, {expiresIn: '2h'})
                return res.status(200).json({token: accessToken})
            }
            else{
                return res.status(400).json({message: 'Something Went Wrong! Please try again later.'})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
})




module.exports = router