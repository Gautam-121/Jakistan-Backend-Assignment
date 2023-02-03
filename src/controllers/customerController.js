const customerModel = require("../models/customerModel")
const {isValid , isValidChar , isValidMobileNo , isValidEmail} =  require("../validator/validator")
const jwt = require("jsonwebtoken")
const uuid = require("uuid")
const moment = require("moment")


const customerRegister = async (req, res)=> {

   try{

    const data = req.body
    // Body Is Empty
    if(!data) return res.status(400).send({status : false , msg : "Body is Emppty , plz provide info"})

    // Destructuring The Body Data
    let {firstName , lastName , mobileNumber ,DOB , emailID ,address} = data

    // Validate firstName
    if(!isValid(firstName)) return res.status(400).send({status : false , msg : "firstName is manondatory"})
    if(!isValidChar(firstName)) return res.status(400).send({status : false , msg : "fistName contain only character and firstName must be min 2 letter"})

    // Validate lastName
    if(!isValid(lastName)) return res.status(400).send({status : false , msg : "lastName is manondatory"})
    if(!isValidChar(lastName)) return res.status(400).send({status : false , msg : "lastName contain only character and firstName must be min 2 letter"})
    
     // Validate mobileNumber
    if(!isValid(mobileNumber)) return res.status(400).send({status : false , msg : "mobileNumber is manondatory"})
    if(!isValidMobileNo(mobileNumber)) return res.status(400).send({status : false , msg : "mobile number should be 10 digit Indian number"})

    // Validate DOB
    if(!isValid(DOB)) return res.status(400).send({status : false , msg : "mobileNumber is manondatory"})
    // write code on DOB Manupulation

    // Validate EmailId
    if(!isValid(emailID)) return res.status(400).send({status : false , msg : "EmailId is manondatory"})
    if(!isValidEmail(emailID)) return res.status(400).send({status : false , msg : "Invalid Email Format , Please Provide valid email"})

    let isEmailAlready = await customerModel.findOne(emailID)
    if(isEmailAlready) return res.status(409).send({status : false , msg : `${emailID} is already Exist`})
    
    // Validate Address
    if(!isValid(address)) return res.status(400).send({status : false , msg : "Address is manondatory"})

    // final object for storing In DB
    const updatedData = {
        firstName , lastName , mobileNumber ,DOB , emailID ,address,
        customerID : uuid(),
        status : "ACTIVE"
    }
    // Create Document of Customer in DataBase
    const userData =  await customerModel.create(updatedData)

    //unique token creation using Jwt package
    const token = jwt.sign({

        userID : userData._id,
        createdAt : Date.now(),
        expiredIn : "1day"

    },"validateUserAuthorization")

    return res.status(201).send({status : true , msg : "Customer Post is Successfully created" , token : token , data : userData})

   }catch(err){
     return res.status(500).send({status : false , msg : err.message})
   }
}

const cutomerActive = async (req , res) => {

    const data = await customerModel.find({status : "ACTIVE"})

    if(data.length == 0) return res.status(200).send({status : true , msg : "No customer is Active"})
    return res.status(200).send({status : true , data : data})
}

const deleteCustomer = async (req, res)=>{
    
}
module.exports = {customerRegister}