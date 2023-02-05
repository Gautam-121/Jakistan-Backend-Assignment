const cardModel =require('../models/cardModels')
const { isValid, isValidChar } = require('../validator/validator')
const uuid = require("uuid")


const createCard = async (req,res)=>{

    try{

    const data = req.body
    
    // Check Body is Empty or not
    if(Object.keys(data).length == 0) return res.status(400).send({status : false , msg : "Body is Emppty , plz provide info"})
    
    // Destructuring input data
    const {cardType , customerName , customerID} = data
    const decodedToken = req.decodedToken
    
    //Check it is Authorized Person
    if(!isValid(customerID)) return res.status(400).send({status : false , msg : "cardType is Mandatory"})
    if(!uuid.validate(customerID)) return res.status(400).send({status : false , msg : "Invalid CustomerId"})
    if(decodedToken.customerID!==customerID) return res.status(403).send({status : false , msg : "It is Not Authorized Person"})


    if(!isValid(cardType)) return res.status(400).send({status : false , msg : "CardType is mandatory"})
    if(["REGULAR","SPECIAL"].indexOf(cardType) == -1) return res.status(400).send({status : false , msg : "Card Type must be in eigther REGULAR OR SPECIAL"})

    if(!isValid(customerName)) return res.status(400).send({status : false , msg : "CustomerName is Mandatory"})
    if(!isValidChar(customerName)) return res.status(400).send({status :false , msg : "customerName is Invalid , name must contain character and Number only"})
    
    const totalDoc = await cardModel.find().count
    
    //create fnal Object for storing in DB
    const finalData  = {
        cardNumber : "C00" + totalDoc + 1 ,
        cardType,
        customerName,
        customerID
    }

    await cardModel.create(finalData)
    return res.status(201).send({status : true , msg : "Card Sussessfully created"})

    }catch(err){
        return res.status(500).send({status : false , msg : err.message})
    }   
}

module.exports = {createCard}