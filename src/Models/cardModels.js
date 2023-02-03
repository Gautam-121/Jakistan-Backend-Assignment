const mongoose = require("mongoose")
const ObjectID = mongoose.Schema.Types.ObjectId

const cardSchema = new mongoose.Schema({

    cardNumber: { type: String }, // Auto_increment e.g: C001
    cardType: { type: String, enum: ["REGULAR", "SPECIAL"], required: true },
    customerName: { type: String, required: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    vision: { type: String },
    customerId: { type: ObjectID, required: true, ref: "customerDetail" },

},{timestamps : true})

module.exports = mongoose.model("cardDetail" , cardSchema)
