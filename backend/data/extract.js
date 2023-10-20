import exceljs from 'exceljs';
import connectDB from '../config/db.js';
import Supplier from '../models/supplierModal.js';
import PoNumber from '../models/poNumberModel.js';
import Description from '../models/descriptionModal.js';
const extractFunc = async () => {
    try {
        await connectDB();
        const filePath = './export29913.xlsx';
        const workbook = new exceljs.Workbook();
        const columnNames = [];
        const supplierData = [];
        const productOrderData = {};
        const descriptionData = {};
        
        // Load the XLSX file
        await workbook.xlsx.readFile(filePath).then(function () {
        const worksheet = workbook.getWorksheet(1); 
        let poNumber;
        worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
                if (rowNumber === 1) {
                    // This is the first row (headers)
                    row.eachCell({ includeEmpty: false }, function (cell) {
                        columnNames.push(cell.value);
                    });
                } else {
                    const rowData = {};
                    let supplier;
                    row.eachCell({ includeEmpty: false }, function (cell, colNumber) { 
                        if(String(columnNames[colNumber - 1]) === 'Supplier' && cell.value.length > 0) {
                            if(!supplierData.includes(cell.value)) {
                                supplierData.push(String(cell.value));
                            }
                            supplier = String(cell.value);
                        }
                        rowData[columnNames[colNumber - 1]] = cell.value;
                    });
                    if(rowData['PO Number'].length > 0 || rowData['Supplier'].length > 0) {
                        poNumber = rowData['PO Number'];
                        //check whether supplier is already present in productOrderData
                        const productOrderArray = productOrderData[supplier];
                        if(productOrderArray) {
                            //map PO Number with supplier
                            productOrderArray.push(poNumber);
                            productOrderData[supplier] = productOrderArray;

                            //map description to PO number
                            const descriptionArray = descriptionData[poNumber];
                            if(descriptionArray) {
                                descriptionArray.push(rowData['Description'])
                                descriptionData[poNumber] = descriptionArray;
                            } else {
                                descriptionData[poNumber] = [rowData['Description']];
                            }
                        } else {
                            //Map new PO number to supplier
                            productOrderData[supplier] = [poNumber]
                            //Map new Description to PO Number
                            descriptionData[poNumber] = [rowData['Description']];
                        }
                    } else {
                        //add description to old PO Number
                        descriptionData[poNumber].push(rowData['Description']);
                    }
                }
            });
        });
        for(let i = 0; i < supplierData.length; i++) {
            let supplier = supplierData[i];
            await Supplier.create({
                name: supplier
            })
            console.log('supplier ',supplier);
            let poNumbers = productOrderData[supplier];
            console.log('poNumbers ',poNumbers);
            await PoNumber.create({
                supplier,
                poNumbers
            })
            for(let j = 0; j < poNumbers.length; j++) {
                let poNumber = poNumbers[j];
                console.log('poNumber ',poNumber);
                let descriptions = descriptionData[poNumber];
                console.log('descriptions ',descriptions);
                await Description.create({
                    poNumber,
                    descriptions
                })
            }
        }
    } catch (err) {
        console.log(err);
    }
}


extractFunc();