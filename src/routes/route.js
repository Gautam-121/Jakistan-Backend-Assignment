const express = require("express")
const router = express.Router()
const {auth} =  require("../middleware/auth")
const {customerRegister , cutomerActive} = require("../controllers/customerController")

//===================================Customer Api ==============================================//

router.post("/customerRegister" , customerRegister )

router.get("/allActiveCustomer" , auth , cutomerActive)


router.apply("*" ,(req, res)=>{
    return res.status(404).send({status : false , msg : "Path not found" })
})

module.exports = router
