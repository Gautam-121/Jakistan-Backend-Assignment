const customerModel = require("../models/customerModel")
const {isValid , isValidChar , isValidMobileNo , isValidEmail} =  require("../validator/validator")
const jwt = require("jsonwebtoken")
const uuid = require("uuid")
const moment = require("moment")


const customerRegister = async (req, res)=> {

   try{

    const data = req.body
    // Body Is Empty
    if(Object.keys(data).length == 0) return res.status(400).send({status : false , msg : "Body is Emppty , plz provide info"})

    // Destructuring The Body Data
    const {firstName , lastName , mobileNumber ,DOB , emailID ,address} = data

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
    const cDay = currentDate.getDate()
    const currentDate = new Date()
    const cMonth = currentDate.getMonth() + 1
    const cYear = currentDate.getFullYear()

    const todayDate = `${cYear}-${cMonth}-${cDay}`

    if(!isValid(DOB)) return res.status(400).send({status : false , msg : "DOB is manondatory"})
    if(!moment(DOB , "YYYY-MM-DD",true).isValid() || moment().isAfter(todayDate)) return res.status(400).send({staus : false , msg : `DOB is Invalid , DOB must be less than or equal to ${todayDate} and Date Format must be YYYY-MM-DD`})

    // Validate EmailId
    if(!isValid(emailID)) return res.status(400).send({status : false , msg : "EmailId is manondatory"})
    if(!isValidEmail(emailID)) return res.status(400).send({status : false , msg : "Invalid Email Format , Please Provide valid email"})

    let isEmailAlready = await customerModel.findOne({emailID : emailID , staus : "ACTIVE" })
    if(isEmailAlready) return res.status(409).send({status : false , msg : `${emailID} is already Exist`})
    
    // Validate Address
    if(!isValid(address)) return res.status(400).send({status : false , msg : "Address is manondatory"})

    // final object for storing In DB
    const updatedData = {
        firstName , 
        lastName , 
        mobileNumber ,
        DOB , 
        emailID ,
        address,
        customerID : uuid(),
    }
    // Create Document of Customer in DataBase
    const userData =  await customerModel.create(updatedData)

    //unique token creation using Jwt package
    const token = jwt.sign({

        customerID : customerID,
        createdAt : todayDate,
        expiredIn : "1day"

    },"validateUserAuthorization")

    return res.status(201).send({status : true , msg : "Customer Post is Successfully created" , token : token , data : userData})

   }catch(err){
     return res.status(500).send({status : false , msg : err.message})
   }
}

const cutomerActive = async (req , res) => {

    try{
    
    //Find All active user in database
    const data = await customerModel.find({status : "ACTIVE"})

    if(data.length == 0) return res.status(200).send({status : true , msg : "No customer is Active"})
    return res.status(200).send({status : true , data : data})

    }catch(err){
        return res.status(500).send({status : false , msg : err.message})
    }
}

const deleteCustomer = async (req, res)=>{

    try{

    const decodedToken = req.decodedToken
    const customerId   = req.path.userId
    
    //Check it is Authorized Person
    if(!isValid(customerId)) return res.status(400).send({status : false , msg : "cardType is Mandatory"})
    if(!uuid.validate(customerId)) return res.status(400).send({status : false , msg : "Invalid CustomerId"})
    if(decodedToken.customerID!==customerId) return res.status(403).send({status : false , msg : "It is Not Authorized Person"})

    // find document using CustomerID and update status
    const deleteDoc = await customerModel.findOne({customerID : customerId},{$set : {status : "INACTIVE"}})

    if(!deleteDoc) return res.status(400).send({status : false , msg : "No Document Found , customer Already Deleted"})

    return res.status(204).send({status : true , msg : "Customer Account Deleted Succesfully!"})

    }catch(err){
      return res.status(500).send({status : false , msg : err.message})
    }
}

module.exports = {customerRegister ,cutomerActive,deleteCustomer}