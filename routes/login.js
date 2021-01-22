var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var loginSchema = require('../model/login')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req,res,next) {
    
    var salt = await bcrypt.genSalt(10);
    var hashedpassword = await bcrypt.hash(req.body.password, salt);
    
    const { name, email, password} = req.body;

    try {
        const record = await new loginSchema({
            name: name,
            email: email,
            password: hashedpassword
        })
        
        record.save();

        if(record){
            res.status(200).json({ IsSuccess: true, Data: record , Message: "Login successful!!!" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess : false , Message: error.message });   
    }
});


module.exports = router;
