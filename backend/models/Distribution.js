const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const DistributionSchema = new Schema(
    {
        address:{
            type: String,
            required: true
        },
        phoneNumber:{
            type: String,
            //required: true
        },
        food:{
            type: Boolean,
            required: true
        },
        medicines: {
            type: Boolean,
            required: true
        },
        distributor: {
            type: String,
            required: true
        },
        isDone: {
            type: Boolean
        },
        date: {
            type: String
        },
        lat: {
            type: String
        },
        lng: {
            type: String
        }
    }
);

module.exports = mongoose.model("Distribution", DistributionSchema)