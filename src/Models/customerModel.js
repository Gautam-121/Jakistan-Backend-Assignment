const mongooose = require("mongoose")

const customerSchema = new mongooose.Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    DOB: { type: Date, required: true },
    emailID: { type: String, required: true },
    address: { type: String },
    customerID: { type: String, required: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"] , default : "ACTIVE" }
})

module.exports = mongooose.model("customerDetail" , customerSchema)