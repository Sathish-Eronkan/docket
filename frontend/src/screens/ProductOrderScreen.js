import { useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/message';
import { useEffect } from 'react';
import { useGetProductsQuery, useGetDescriptionsQuery } from '../slices/productApiSlice';

const ProductOrderScreen = ({supplier, addDesc}) => {
    console.log('hello');
    const [poNumber, setPoNumber] = useState('');
    console.log('poNumber ',poNumber);
    const {data: poNumbers, poNumberLoading, poNumberError} = useGetProductsQuery(supplier);
    const {data: descriptions, descLoading , descError} = useGetDescriptionsQuery(poNumber);
    console.log('description ',descriptions);
    addDesc(descriptions);
    return (
       <Form.Group className='my-2' controlId="poNumberDropdown">
            <Form.Label>Select Purchase Order:</Form.Label>
            {(poNumbers && poNumbers.length > 0) ? (
                <Form.Select
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                >
                    <option value="">Select Purchase Order...</option>
                    {poNumbers.map((poNumber, index) => (
                    <option key={index} value={poNumber}>
                        {poNumber}      
                    </option>
                    ))}
                </Form.Select>
                ) : (
                <Message>Please Select Supplier</Message>
            )}
            <div style={{ marginBottom: '20px' }}></div>
            {descriptions && descriptions.length > 0 && (
                <div>
                    <Form.Label>Description:</Form.Label>
                    <p>{descriptions}</p>
                </div>
            )}
        </Form.Group>
    )

}

export default ProductOrderScreen;