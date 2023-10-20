import mongoose from "mongoose";

const descriptionSchema = mongoose.Schema({
    poNumber: {
        type: String,
        required: true,
    },
    descriptions: {
        type: [String],
        required: true,
    }    
}, {
    timestamps: true
});

const Description = mongoose.model('Description', descriptionSchema);

export default Description;