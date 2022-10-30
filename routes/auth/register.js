const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const JWT_SECRET = "cjXttjuQcYc99sMJQ7gxIia"


const User = require('../../models/User')

// POST api/v1/sign-up | public | registereren ingelogt blijven
router.post('/sign-up', async (req, res) => {
    try {
        // extracting fields from req.body
        const {name, email, password} = req.body
        // Controleer of alle velden zijn ingevuld
        if(!name || !email || !password){
            return res.status(400).json({ msg: 'Vul alle velden in' })
        }

        // Bekijk of de user bestaat of niet
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({ msg: 'User bestaat al' })
        }

        let date_info = new Date;
        let date_into = (date_info.getMonth()+1) + '/' + date_info.getDate() + '/' +  date_info.getFullYear();


        user = new User({
            name,
            email,
            password,
            cleatedAt: date_into
        })

        // Generate de salt en controleer het wachtwoord met de hash
        const slat =await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, slat)
        await user.save()
        
        const payload = { 
            user: {
                id: user._id
            }
        }
        console.log(payload,JWT_SECRET)
        jwt.sign(payload, JWT_SECRET, {
            expiresIn: 36000 
        }, (err, token) => {
            if(err) throw err 
            res.status(200).json({
                token
            })
        })
    } catch (err) {
        console.log(err)
        res.json({
            err:err
        })
    }
})

module.exports = router