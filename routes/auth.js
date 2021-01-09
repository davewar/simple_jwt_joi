const router = require('express').Router()
const jwt =require('jsonwebtoken')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const {registerValidation, loginValidation} = require('../validate')



//postman.com

router.post('/register', async (req,res)=>{

    const {error} = registerValidation(req.body)

  
        if(error){
            // console.log("err dw");
            return res.status(400).send(error.details[0].message)   //exit - failed joi validation
        }
         

        //if user exists
        const emailExist = await User.findOne({email: req.body.email})
        if(emailExist){
            return res.status(400).send("account already exists, please use another email")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(req.body.password,salt)
                     
       // pass  by joi validation

        const user = new User({
            name: req.body.name,
          email:  req.body.email,
          password:  hashedpassword
          
        })

        try{
            const saverUser =  await user.save()
            res.json({user: user._id})

        }catch(err){
            res.status(400).send(err)
        }

        

})

router.post('/login', async (req,res)=>{
     const {error} = loginValidation(req.body)

     if(error){
            // console.log("err dw");
            return res.status(400).send(error.details[0].message)   //exit - failed joi validation
        }

     //if user exists
        const user = await User.findOne({email: req.body.email})
        console.log(user);
        if(!user){
            return res.status(400).send("Email incorrect")
        }

        // if pw correct
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass) return res.status(400).send("invalid password")

        //create and assign jwt token
        
        const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
        res.header('dw-auth-token',token).send(token)

        // console.log("dw", token);
        // res.send("sucess")    


})


module.exports =  router