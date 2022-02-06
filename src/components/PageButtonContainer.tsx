import { FunctionComponent, ReactElement } from "react";
import PageButton from "./PageButton";

interface PageButtonContainerProps {
  numElements: number,
  elementsPerPage: number,
  curPage: number,
  setPage: (n: number) => void
}

const PageButtonContainer: FunctionComponent<PageButtonContainerProps> = (props: PageButtonContainerProps) => {
  const { numElements, elementsPerPage, curPage, setPage } = props;
  const either_side = 1;

  const numPages = Math.ceil(numElements / elementsPerPage);
  const pageNums = Array.from(Array(numPages).keys());


  const getButton = (i: number, body?: any) => {
    let css = 'page-button' + (curPage == i ? ' selected' : '');
    return <button className={css} onClick={() => setPage(i)} key={i}>{body ?? i}</button>
  };


  const start = Math.max(curPage - either_side, 0);
  const end = Math.min(curPage + either_side + 1, numPages);
  let buttonIdxs: number[] = pageNums.slice(start, end);
  console.log('idx', buttonIdxs);
  let buttons = [];

  // add ... buttons
  if (start > 0) {
    buttons.push(
      <button className="page-button" onClick={() => setPage(start - 1)} key={'back'}>...</button>
    );
  }
  buttons.push(buttonIdxs.map((i) => getButton(i)));

  if (end < numPages) {
    buttons.push(
      <button className="page-button" onClick={() => setPage(end)} key={'fwd'}>...</button>
    );
  }

  return (<div className="page-buttons">
    {buttons}
  </div>);
}

export default PageButtonContainer;