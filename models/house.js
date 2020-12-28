const { Schema } = require("mongoose");

const mongoose = require("mongoose");
const ObjectId = Schema.Types.ObjectId;
const HouseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    }, age: {
        type: String,
        required: true
    }, price: {
        type: Number,
        required: true
    }, address: {
        type: String,
        required: true
    }, bedrooms: {
        type: Number,
        required: true
    }, bathrooms: {
        type: Number,
        required: true
    }, rooms: {
        type: Number,
        required: true
    }, description: {
        type: String,
        required: true
    }, datePosted: {
        type: Date,
        default: Date.now,
    },
    customers: {
        type: Array,
        default: [],
        required: true
    }, sold: {
        type: Boolean,
        default: false,
        required: false
    }, sellerId: {
        type: ObjectId,
        required: true
    }
})
const House = mongoose.model("House", HouseSchema);

module.exports = House;