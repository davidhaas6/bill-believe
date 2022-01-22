import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import Bill from "../models/Bill";

interface BillBoxProps {
  bill: Bill;
  prob?: number;
}

const BillBox: FunctionComponent<BillBoxProps> = ({ bill, prob }: BillBoxProps) => {
  return (
    <Card className="bill-box">
      <Card.Body>
        <Card.Title>{bill.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{bill.id}</Card.Subtitle>
        <Card.Text>
          {bill.body}
        </Card.Text>
        {prob &&
          <h1>{prob}%</h1>
        }
      </Card.Body>
    </Card>
  );
}

export default BillBox;