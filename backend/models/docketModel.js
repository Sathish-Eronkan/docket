import mongoose from "mongoose";

const docketSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startTime: {
        type: String, 
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    hoursWorked: {
        type: Number,
        required: true,
    },
    ratePerHour: {
        type: Number,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    descriptions: {
        type: String,
        required: true,
    } 
}, {
    timestamps: true
});


const Docket = mongoose.model('Docket', docketSchema);

export default Docket;