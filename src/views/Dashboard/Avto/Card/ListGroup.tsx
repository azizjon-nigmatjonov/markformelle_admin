import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface Props {
  items: string[];
  heading: String;
}

function ListGroup({ items, heading }: Props) {
  //   const seltectedItem = 0;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <Fragment>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
