import React, { useEffect, useState } from 'react';
import '../assets/App.css';
import BillBox from '../components/BillBox';
import Bill from '../models/Bill';

import { CgArrowDownR, CgArrowUpR } from "react-icons/cg";
import { Form } from 'react-bootstrap';
import PageButton from '../components/PageButton';

const icons = {
  SortDown: <CgArrowDownR />,
  SortUp: <CgArrowUpR />
}

const fakeBills: Bill[] = [
  {title: "Lorem ipsum", body: "This is a body", id: "Jan 22. 2022"},
  {title: "Lorem ipsum 2", body: `
    			ACHTUNG!
			--------
Das machine is nicht fur gerfingerpoken und mittengrabben.
   Ist easy schnappen der Sprinngwerk, blowenfusen und
	     poppencorken mit spitzensparken.
Ist nicht fur gewerken by das Dummkopfen.  Das rubbernecken
	 sightseeren keepen hands in das Pockets.
	  Relaxen und watch das blinkenlights...
  `, id: "Bill 324221"},
  {title: "Mouse Balls", body: "Before proceeding, determine the type of mouse balls by examining the underside of the mouse.  Domestic balls will be larger and harder than foreign balls.  Ball removal procedures differ depending upon manufacturer of the mouse.  Foreign balls can be replaced using the pop-off method.  Domestic balls are replaced using the twist-off method.  Mouse balls are not usually static sensitive.  However, excessive handling can result in sudden discharge.  Upon completion of ball replacement, the mouse may be used immediately.", id: "69"},
  {title: "Operators", body: `
  CN/A operators are operators that do exactly the opposite of what directory
assistance operators are for.  See part II, for more info on CN/A & #'s.  In my
experiences, these operators know more than the DA op's do & they are more
susceptible to "social engineering." It is possible to bullshit a CN/A operator
for the NON-PUB DA # (ie, you give them the name & they give you the unlisted
#).  This is due to the fact that they assume your are a phellow company
employee.  Unfortunately, the break-up has resulted in the break-up of a few
NON-PUB #'s and policy changes in CN/A.
  `, id: "0x!23jadfse"},
];

function App() {
  const [pageBills, setPageBills] = useState<Bill[]>();
  const [pageNum, setPageNum] = useState<number>(0);

  useEffect(() => setPageBills(fakeBills),[]); // test data

  return (
    <div className="app">
      <div className="top-section">
        <div className="app-header">
          Bill Predictor
        </div>
        <div className="sorting-box">
          <div className="sorting-arrow" >
          <CgArrowDownR/>
          </div>
          <div className="sorting-select">
          <Form.Select>
            <option>Probability</option>
            <option>Date created</option>
            <option>Date to vote</option>
          </Form.Select>
          </div>
        </div>
      </div>

      {/* <hr /> */}

      <div className="main-content">
        {pageBills?.map((bill) => <BillBox bill={bill} />)}
      </div>

      <div className="bottom-section">
        <div className="page-buttons">
          <PageButton body={1} />
          <PageButton body={2} />
          <PageButton body={3} />
          <PageButton body={"..."} />
        </div>
        <div className="footer">
          
        </div>
      </div>
    </div>
  );
}

export default App;
