import { ListGroup } from 'react-bootstrap';
import Loader from "../components/Loader";
import Message from "../components/message";
import MyCard from "../components/MyCard";
import { useGetDocketsQuery } from "../slices/productApiSlice";
const HomeScreen = () => {

    const {data: dockets, isLoading, error} = useGetDocketsQuery();
    console.log('dockets ',dockets);
    return (
        <>
            {isLoading ? ( 
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            )  : (
                <>  
                    <h1>Dockets</h1>
                    {dockets.length === 0 ? (
                        <Message>
                            No Dockets Available
                        </Message>) : (
                        <ListGroup variant='flush'>
                            {dockets.map((docket) => (
                                <MyCard key={docket._id} docket={docket}></MyCard>
                            ))}
                        </ListGroup>
                    )} 
                </>
            )}
        </>
    )
}

export default HomeScreen;