import React, { useEffect, useState } from 'react';
import '../assets/App.css';
import BillBox from '../components/BillBox';
import Bill from '../models/Bill';

import { CgArrowDownR, CgArrowUpR } from "react-icons/cg";
import { Form } from 'react-bootstrap';
import PageButton from '../components/PageButton';
import { useLocalPredictions } from '../controllers/hooks';
import PageButtonContainer from '../components/PageButtonContainer';

const icons = {
  SortDown: <CgArrowDownR />,
  SortUp: <CgArrowUpR />
}


function App() {
  const [pageBills, setPageBills] = useState<Bill[]>();
  const [pageNum, setPageNum] = useState<number>(0);
  const { status, billData } = useLocalPredictions();

  const totalBillCount = billData?.length;
  const billsPerPage = 5;
  console.log("status:", status, "data:", billData);

  useEffect(() => window.scrollTo(0, 0), [pageNum]);

  // load the 'page'
  useEffect(() => {
    if (billData) {
      let start = pageNum * billsPerPage;
      let end = Math.min(start + billsPerPage, billData.length);
      setPageBills(() => billData.slice(start, end));
      console.log(typeof (billData[0].Democrat), typeof (billData[0]))
    }
  }, [billData, pageNum]); // test data

  const buttons = totalBillCount && <PageButtonContainer numElements={totalBillCount} elementsPerPage={billsPerPage} curPage={pageNum} setPage={(n) => setPageNum(n)} />;

  return (
    <div className="app">
      <div className="app-header">
        Bill Believe
      </div>
      <div className="top-section">
        <div className="top-page-buttons">
          {buttons}
        </div>
        
        <div className="sorting-box">
          <div className="sorting-arrow" >
            <CgArrowDownR />
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
        {pageBills?.map((bill) => <BillBox bill={bill} key={bill.slug} />)}
      </div>

      <div className="bottom-section">
        {buttons}
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default App;
