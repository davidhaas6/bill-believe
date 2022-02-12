import { FunctionComponent } from "react";
import { BarLoader } from "react-spinners"; //https://www.davidhu.io/react-spinners/
import { useFetchBill } from "../controllers/hooks";
import Bill from "../models/Bill";
import PartyChart from "./PartyChart";


interface BillBoxProps {
  bill: Bill;
}

const BillBox: FunctionComponent<BillBoxProps> = (props: BillBoxProps) => {
  const { bill } = props;

  const formattedStrings = Object.entries(bill).map(([prop, val]) => {
    return prop + ": \t\t" + val + "\n";
  });

  const { status, data: metaData } = useFetchBill(bill.slug);

  if (status in ['idle', 'fetching']) return <BarLoader />;


  let subtitle = bill.slug;
  if (metaData) {
    subtitle = `${metaData['sponsor_title']} ${metaData['sponsor']} (${metaData['sponsor_party']}) ~ ${metaData['sponsor_state']}`;
  }
  // console.log(metaData);

  return (
    <div className="bill-container">
      <PartyChart
        demVotes={Number(bill.Democrat)}
        repVotes={Number(bill.Republican)}
        indVotes={Number(bill.Independent)}
        isSenate={bill.slug.startsWith('s')}
      />
    </div>
  );
}

export default BillBox;