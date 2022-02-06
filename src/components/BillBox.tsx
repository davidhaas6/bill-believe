import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import {  BarLoader } from "react-spinners"; //https://www.davidhu.io/react-spinners/
import { useFetchBill } from "../controllers/hooks";
import Bill from "../models/Bill";


interface BillBoxProps {
  bill: Bill;
}

const BillBox: FunctionComponent<BillBoxProps> = ({ bill }: BillBoxProps) => {
  const formattedStrings = Object.entries(bill).map(([prop, val]) => {
    return prop + ": \t\t" + val + "\n";
  });

  const { status, data: metaData } = useFetchBill(bill.slug);

  let subtitle = bill.slug;
  if(metaData) {
    subtitle = `${metaData['sponsor_title']} ${metaData['sponsor']} (${metaData['sponsor_party']}) ~ ${metaData['sponsor_state']}`;
  }
  // console.log(metaData);

  return (
    <Card className="bill-box">

      {status === 'fetching' ? <BarLoader /> :
        (
          <Card.Body>
            <Card.Title>
              <div className="bill-header">
                {metaData?.['short_title'] ? metaData['short_title'] : '...'}
              </div>

            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
            <Card.Text>
              {metaData && metaData['summary']}
              {formattedStrings.map((s) => <li key={s}>{s}</li>)}
            </Card.Text>
          </Card.Body>
        )
      }
    </Card>
  );
}

export default BillBox;