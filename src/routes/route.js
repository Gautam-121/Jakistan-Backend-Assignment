const express = require("express")
const router = express.Router()
const {auth} =  require("../middleware/auth")
const {customerRegister , cutomerActive , deleteCustomer} = require("../controllers/customerController")
const { createCard } = require("../controllers/cardController")

//===================================Customer Api ==============================================//

router.post('/customerRegister',customerRegister )

router.get('/allActiveCustomer',auth,cutomerActive)

router.delete('/delete/:userId',auth,deleteCustomer)

//====================================Card Api =====================================================//

router.post('/createCard',auth,createCard)


router.apply("*" ,(req, res)=>{
    return res.status(404).send({status : false , msg : "Path not found" })
})

module.exports = router
