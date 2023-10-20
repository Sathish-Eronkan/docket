import mongoose from "mongoose";

const poNumberSchema = new mongoose.Schema({
    supplier: {
        type: String,
        required: true,
    },
    poNumbers: {
        type: [String],
        required: true,
    }
}, {
    timestamps: true,
});

const PoNumber = mongoose.model('PoNumber', poNumberSchema);

export default PoNumber;