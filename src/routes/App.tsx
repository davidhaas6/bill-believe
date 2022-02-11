import { useEffect, useState } from 'react';
import '../assets/App.css';
import BillBox from '../components/BillBox';

import { useLocalPredictions } from '../controllers/hooks';
import PageButtonContainer from '../components/PageButtonContainer';
import { PredictionContext } from '../models/Responses';

import SearchBox from '../components/SearchBox';

type SortingFunction = (b1: PredictionContext, b2: PredictionContext, desc?: boolean) => number;

interface SortingOptions {
  field: string;
  descending: boolean;
}

function sortProbability(p1: PredictionContext, p2: PredictionContext, desc?: boolean): number {
  desc = desc ?? true; // default sort highest to lowest
  if (desc) {
    return p2.raw_prediction - p1.raw_prediction;
  }
  return p1.raw_prediction - p2.raw_prediction;
}

function getSortingFunc(method: string): SortingFunction | undefined {
  if (method === 'probability') return sortProbability;
}


function App() {
  const [pageBills, setPageBills] = useState<PredictionContext[]>();
  const [pageNum, setPageNum] = useState(0);
  const [sortBy, setSortBy] = useState('probability');
  const [sortDesc, setSortDesc] = useState(true);

  let { status, billData } = useLocalPredictions();

  const totalBillCount = billData?.length;
  const billsPerPage = 5;

  useEffect(() => window.scrollTo(0, 0), [pageNum]); // scroll to top on page change

  // load the 'page'
  useEffect(() => {
    if (billData) {

      // sort data
      const sortFunc = getSortingFunc(sortBy);
      if (sortFunc) {
        billData = billData.sort((b1, b2) => sortFunc(b1, b2, sortDesc));
      }

      let start = pageNum * billsPerPage;
      let end = Math.min(start + billsPerPage, billData.length);

      setPageBills(() => billData?.slice(start, end));
    }
  }, [billData, pageNum, sortBy, sortDesc]);

  const buttons = totalBillCount && <PageButtonContainer numElements={totalBillCount} elementsPerPage={billsPerPage} curPage={pageNum} setPage={(n) => setPageNum(n)} />;

  return (
    <div className="app">
      <div className="app-header">
        Billbelief
      </div>
      <div className="top-section">

        
        <SearchBox />

        {/* <SortingComponent
        
          directionCallback={(val) => setSortDesc(val)}
          fieldCallback={(val) => setSortBy(val)}
          selectedField={sortBy}
          sortingFields={['probability']}
          isDescending={sortDesc}
        /> */}

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
