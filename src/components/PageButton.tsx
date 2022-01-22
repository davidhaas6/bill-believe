import { FunctionComponent } from "react";

interface PageButtonProps {
  body: string | number;
  onClick?: () => void;
}

const PageButton: FunctionComponent<PageButtonProps> = (props) => {
  return (
    <button className="page-button" onClick={() => props.onClick?.()}>
      {props.body}
    </button>
  );
}

export default PageButton;