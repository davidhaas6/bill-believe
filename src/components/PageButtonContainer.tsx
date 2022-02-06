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

  const numPages = Math.ceil(numElements / elementsPerPage);

  let buttons = [];
  for (let i = 0; i < numPages; i++) {
    let css = 'page-button' + (curPage == i ? ' selected' : '');
    buttons.push(
      <button className={css} onClick={() => setPage(i)} key={i}>{i}</button>
    );
  }

  return (<div className="page-buttons">
    {buttons}
  </div>);
}

export default PageButtonContainer;