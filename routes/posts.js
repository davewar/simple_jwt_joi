const router = require('express').Router()
const User = require('../model/User')
const authV = require('./verifyToken')

router.get("/", authV, (req,res)=>{

    const {_id} = req.user
    console.log(_id);


        // res.json({
        //     title: "Private",
        //     descr: "private page"
        // })

})

module.exports = router