const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'Ajayisagoodboy$$'
//create a user  using Port:/api/auth/createuser "no login req"
router.post('/createuser', [
  body('name', 'enter a valid name').isLength({ min: 3 }),
  body('email', 'enter a valid email').isEmail(),
  body('password').isLength({ min: 5 })
],
  //if there are error return the  bad status
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success ,errors: errors.array() });
    }
    //check weather the user with email is exists or not



    try {
      let use = await User.findOne({ email: req.body.email });
      if (use) {
        return res.status(400).json({ success,errors: "sorry the user with this  email is already exists" })
      }
      const salt = await bcrypt.genSaltSync(10);
      const secpass = await bcrypt.hash(req.body.password, salt)
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass
      })
      const data = {

        use: {
          id: user.id
        }

      }

      const authtoken = jwt.sign(data, JWT_SECRET)
      success=true
      res.json({ success,authtoken })
    }

    catch (error) {
      console.log(error.message);
      res.status(500).send("Internal error occur")
    }

  });


//login a user  using Port:/api/auth/createuser "no login req"
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
],
  //if there are error return the  bad status
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: "Please try to use a correct informaitons" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password)

      if (!passwordcompare) {
        success= false
        return res.status(400).json({ success,error: "Please try to use a correct informaitons" });
      }

      const data = {

        user: {
          id: user.id
        }

      }

      const authtoken = jwt.sign(data, JWT_SECRET)
      success=true
      res.json({ success,authtoken })
    }


    catch (error) {
console.error(error.message)
return res.status(400).send("Internal error occur");
    }

  });

  //route3 to get the user information using post loging req

  router.post('/getuser' , fetchuser , async(req,res)=>{
    try {
      userId= req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message)
      return res.status(400).send("Internal error occur");
          }
  })

module.exports = router