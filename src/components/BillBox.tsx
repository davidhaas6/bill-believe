import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import Bill from "../models/Bill";

interface BillBoxProps {
  bill: Bill;
}

const BillBox: FunctionComponent<BillBoxProps> = ({ bill }: BillBoxProps) => {
  const formattedStrings = Object.entries(bill).map(([prop,val]) => { 
    return prop + ": \t\t" + val + "\n";
  });

  return (
    <Card className="bill-box">
      <Card.Body>

        <Card.Title>
          <div className="bill-header">
            {bill.slug}
          </div>

        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{bill.subjects}</Card.Subtitle>
        <Card.Text>
          {formattedStrings.map((s) => <li key={s}>{s}</li>)}
        </Card.Text>

      </Card.Body>
    </Card>
  );
}

export default BillBox;