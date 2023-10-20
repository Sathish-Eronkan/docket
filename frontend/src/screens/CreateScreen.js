import { useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/message';
import { useGetSuppliersQuery } from '../slices/productApiSlice';
import { useCreateMutation } from '../slices/docketSlice';
import ProductOrderScreen from './ProductOrderScreen';
import { useNavigate } from 'react-router-dom'
const CreateScreen = () => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [ratePerHour, setRatePerHour] = useState('');
  const [supplier, setSupplier] = useState('');
  const [descriptions, setDescription] = useState('');
  const [create] = useCreateMutation();
  const {data: suppliers, isLoading, error} = useGetSuppliersQuery();
  const navigate = useNavigate();
  console.log('setting desc in create screen ',descriptions);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await create({ name, startTime, endTime, hoursWorked, ratePerHour, supplier, descriptions }).unwrap();
      console.log('submitted');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {console.log('loading ',isLoading)}
      {isLoading ? ( 
        <Loader />
      ) : error ? (
        <>
        {console.log('inside error')}
        <Message variant='danger'>
            {error?.data?.message || error.error}
        </Message>
        </>
      ) : (
        <>
        {console.log('loading inside form ',isLoading)}
        <FormContainer>
            <h1>Create New Docket</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='startTime'>
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter start time'
                    value={startTime}
                    required
                    onChange={(e) => setStartTime(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='endTime'>
                <Form.Label>End Time</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter end time'
                    value={endTime}
                    required
                    onChange={(e) => setEndTime(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='hoursWorked'>
                <Form.Label>Hours Worked</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter hours worked'
                    value={hoursWorked}
                    required
                    onChange={(e) => setHoursWorked(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='ratePerHour'>
                <Form.Label>Rate Per Hour</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter rate per hour'
                    value={ratePerHour}
                    required
                    onChange={(e) => setRatePerHour(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId="supplierDropdown">
                    <Form.Label>Select a Supplier:</Form.Label>
                    <Form.Select
                      value={supplier}
                      onChange={(e) => setSupplier(e.target.value)}
                    >
                      <option value="">Select a supplier...</option>
                      {suppliers.map((supplier, index) => (
                        <option key={index} value={supplier}>
                          {supplier}
                        </option>
                      ))}
                    </Form.Select>
                </Form.Group>

                <ProductOrderScreen supplier={supplier} addDesc={setDescription}/>

                <Button type='submit' variant='primary'>
                Continue
                </Button>
            </Form>
        </FormContainer>
        </>
      )}
    </>
  ) 


};

export default CreateScreen;
