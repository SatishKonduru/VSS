const express = require('express')
const connection = require('../connection')
const router = express.Router()
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
require('dotenv').config()
var auth =require('../services/authentication')
var checkRole = require('../services/checkRole')



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
    query = "select id, email, password, role, status from users where email=?"
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
                return res.status(200).json({token: accessToken, id: results[0].id})
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

router.get('/getUsers', (req, res) => {
    var query = "select * from users"
    connection.query(query,(err, results)=> {
        if(!err){
            res.status(200).json(results)
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.get('/getUserById/:id', (req, res) => {
    let id = req.params.id
    var query = "select * from users where id=?"
    connection.query(query,[id],(err, results)=> {
        if(!err){
            if(results.length <= 0){
                return res.status(401).json({message: ' No Employee found'})
            }
            else{
                return res.status(200).json(results[0])
            }
            
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.patch('/updateStatus',  (req, res) => {
    let user = req.body
    var query = "update users set status=? where id=?"
    connection.query(query,[user.status, user.id], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: 'User Id does not Exist'})
            }
            else{
                return res.status(200).json({message: 'User Updated succesfully.'})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.patch('/update',  (req, res) => {
    let user = req.body
    var query = "update users set name=?, department=?, task=?, progress=? where id=?"
    connection.query(query,[user.name,user.department, user.task,user.progress, user.id], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: 'User Id does not Exist'})
            }
            else{
                return res.status(200).json({message: 'User Updated succesfully.'})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
})


router.get('/dept', auth.authenticateToken, checkRole.checkRole,(req, res) => {
    query = "select * from departments"
    connection.query(query, (err, results) => {
        if(!err){
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err)
        }
    })
})


router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole,(req, res, next)=>{
    const id = req.params.id
    var query = "delete from users where id=?"
    connection.query(query, [id],(err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:'User Id does not found!'})
            }
            else{
                return res.status(200).json({message: 'User deleted Successfully'})
            }
        }

        else{
            return res.status(500).json(err)
        }
    })

})

//file upload
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      let originalname = file.originalname;
  
      let ext = originalname.split('.').pop();
      let filename = originalname.split('.').slice(0, -1).join('.');
  
      cb(null, filename + '-' + Date.now()+'.'+ext)
    }
  })
  var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB (adjust the size limit as needed)
  },
});

  var upload = multer({ storage: storage })
  router.post('/upload', upload.single('photo'), (req, res) => {
    try {

      console.log("Request received in Server: ", req);
      res.send({ 'message': "success" });
    } catch (error) {
      console.error("Error handling file upload:", error);
      res.status(500).send({ 'message': 'Internal Server Error' });
    }
  });


module.exports = router