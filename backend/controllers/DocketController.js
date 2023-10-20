import Supplier from '../models/supplierModal.js';
import PoNumber from '../models/poNumberModel.js';
import Description from '../models/descriptionModal.js';
import Docket from '../models/docketModel.js';
const getDockets = async (req,res) => {
    try {
        console.log('inside dockets');
        const dockets = await Docket.find({});
        res.json(dockets);
    } catch (err) {
        console.log(err);
    }
}

const getSuppliers = async (req,res) => {
    try {
        let suppliers = await Supplier.find({});
        suppliers = suppliers.map((supplier)=>{
            return supplier.name
        })
        res.json(suppliers);
    } catch (err) {
        console.log(err);
    }
}

const getProducts = async (req, res) => {
    try {
        let supplierName = req.query.supplier;
        console.log('supplier ',supplierName);
        if(supplierName) {
            let products = await PoNumber.find({'supplier': supplierName});
            products = products[0].poNumbers;
            console.log('products ',products);
            res.json(products);
        }
    } catch (err) {
        console.log(err);
    }
}

const getDescription = async (req,res) => {
    try {
        let productOrder = req.query.poNumber;
        if(productOrder) {
            console.log('productOrder ',productOrder);
            let descriptions = await Description.find({'poNumber': productOrder});
            descriptions = descriptions[0].descriptions;
            descriptions = descriptions.map((description) => {
                return description;
            }).join(', ');
            console.log('description ',descriptions);
            res.json(descriptions);
        }
    } catch (err) {
        console.log(err);
    }
}

const addDocket = async (req, res) => {
    try {
        const user = await Docket.create(req.body)
        res.status(200).json({message: 'Docket Created Successfully'});;
    } catch (err) {
        console.log(err);
    }
}

export {getDockets, getSuppliers, getProducts, getDescription, addDocket};