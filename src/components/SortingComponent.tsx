import { FunctionComponent } from "react";
import { Form } from "react-bootstrap";
import { CgArrowDownR, CgArrowUpR } from "react-icons/cg";

const icons = {
  SortDown: <CgArrowDownR />,
  SortUp: <CgArrowUpR />
}


interface SortingComponentProps {
  directionCallback: (isDescending: boolean) => void;
  fieldCallback: (field: string) => void;
  selectedField: string;
  sortingFields: string[];
  isDescending: boolean;
}

const SortingComponent: FunctionComponent<SortingComponentProps> = (props: SortingComponentProps) => {
  return (
    <div className="sorting-box">
      <div className="sorting-arrow" onClick={() => props.directionCallback(!props.isDescending)}>
        {props.isDescending ? icons.SortDown : icons.SortUp}

      </div>
      <div className="sorting-select">
        <Form.Select>
          <option>Probability</option>
          {/* <option>Date created</option>
        <option>Date to vote</option> */}
        </Form.Select>
      </div>
    </div>
  );
}

export default SortingComponent;