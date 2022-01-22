import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import Bill from "../models/Bill";

interface BillBoxProps {
  bill: Bill;
  prob?: string|number;
}

const BillBox: FunctionComponent<BillBoxProps> = ({ bill, prob }: BillBoxProps) => {
  return (
    <Card className="bill-box">
      <Card.Body>

        <Card.Title>
          <div className="bill-header">
            {bill.title}
            {prob &&
              <h3>{prob}{typeof(prob) === 'number' && '%'}</h3>
            }
          </div>

        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{bill.id}</Card.Subtitle>
        <Card.Text>
          {bill.body}
        </Card.Text>

      </Card.Body>
    </Card>
  );
}

export default BillBox;