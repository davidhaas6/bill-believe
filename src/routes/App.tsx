import { useEffect, useState } from 'react';
import '../assets/App.css';
import BillBox from '../components/BillBox';
import Bill from '../models/Bill';

import { CgArrowDownR, CgArrowUpR } from "react-icons/cg";
import { Form } from 'react-bootstrap';
import { useLocalPredictions } from '../controllers/hooks';
import PageButtonContainer from '../components/PageButtonContainer';
import { PredictionContext } from '../models/Responses';
import PageButton from '../components/PageButton';

const icons = {
  SortDown: <CgArrowDownR />,
  SortUp: <CgArrowUpR />
}


type SortingFunction = (b1: Bill, b2: Bill, desc?: boolean) => number;

function sortProbability(b1: Bill, b2: Bill, desc?: boolean): number {
  desc = desc ?? true; // default sort highest to lowest
  if (desc) {
    console.log("sorting desc?",desc);
    return b2.raw_prediction - b1.raw_prediction;
  }
  return b1.raw_prediction - b2.raw_prediction;
}

function getSortingFunc(method: string): SortingFunction | undefined {
  if (method === 'probability') return sortProbability;
}


function App() {
  const [pageBills, setPageBills] = useState<PredictionContext[]>();
  const [pageNum, setPageNum] = useState(0);
  const [sortBy, setSortBy] = useState('probability');
  const [sortDesc, setSortDesc] = useState(true);

  const { status, billData } = useLocalPredictions();

  const totalBillCount = billData?.length;
  const billsPerPage = 5;

  useEffect(() => window.scrollTo(0, 0), [pageNum]); // scroll to top on page change

  // load the 'page'
  useEffect(() => {
    if (billData) {
      // sort data
      let data = billData;
      const sortFunc = getSortingFunc(sortBy);
      if (sortFunc) {
        
        data = billData?.sort((b1, b2) => sortFunc(b1, b2, sortDesc));
        console.log("sortdesc",sortDesc,data[0].raw_prediction)
      }

      let start = pageNum * billsPerPage;
      let end = Math.min(start + billsPerPage, billData.length);

      setPageBills(() => data.slice(start, end));
    }
  }, [billData, pageNum, sortBy, sortDesc]);



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
          <div className="sorting-arrow" onClick={() => setSortDesc((cur) => !cur)}>
            {sortDesc ? icons.SortDown : icons.SortUp}

          </div>
          <div className="sorting-select">
            <Form.Select>
              <option>Probability</option>
              {/* <option>Date created</option>
              <option>Date to vote</option> */}
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
