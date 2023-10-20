import { Card } from "react-bootstrap";
const MyCard = ({docket}) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Card.Body>
                <Card.Title>{docket.name}</Card.Title>
                <Card.Text>
                    <strong>Name:</strong> {docket.name}
                </Card.Text>
                <Card.Text>
                    <strong>Start Time:</strong> {docket.startTime}
                </Card.Text>
                <Card.Text>
                    <strong>End Time:</strong> {docket.endTime}
                </Card.Text>
                <Card.Text>
                    <strong>No of hours Worked:</strong> {docket.hoursWorked}
                </Card.Text>
                <Card.Text>
                    <strong>Rate Per Hour:</strong> {docket.ratePerHour}
                </Card.Text>
                <Card.Text>
                    <strong>Supplier Name:</strong> {docket.supplier}
                </Card.Text>
                <Card.Text>
                    <strong>Purchase Order:</strong> {docket.descriptions}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MyCard;