const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const Router = express.Router();
const auth = require('../middleware/userValidator');

Router.post('/signin', async (req, res) => {
    const {googleAccessToken} = req.body;

    const userDetails = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            'Authorization': `Bearer ${googleAccessToken}`
        }
    });

    const firstName = userDetails.data.given_name;
    const lastName = userDetails.data.family_name;
    const email = userDetails.data.email;

    const existingUser = await User.findOne({email});

    if (!existingUser) {
        const result = await User.create({email, firstName, lastName});
        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, 'sdbcdsjfhbdsfdsfvhjdsfhdsfhsghsdkghdskhgdkshfhkdsfhshkfghkgekhghkfsghshfgrw')

        res
            .status(200)
            .json({token})
    }

    const token = jwt.sign({
        email: existingUser.email,
        id: existingUser._id
    }, 'sdbcdsjfhbdsfdsfvhjdsfhdsfhsghsdkghdskhgdkshfhkdsfhshkfghkgekhghkfsghshfgrw')

    res
        .status(200)
        .json({token})
        
   
});

Router.get('/getUser', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.send(user);
    } catch (error) {
      res.status(400).send('Error while getting details of user. Try again later.');
    }
});

module.exports = Router;