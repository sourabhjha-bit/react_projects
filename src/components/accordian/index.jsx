import React, { useState } from "react";
import data from "./data";
import "./style.css";

const Accordian = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple];

    const findIndexOfCurrentID = copyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentID === -1) {
      copyMultiple.push(getCurrentId);
    } else {
      copyMultiple.splice(findIndexOfCurrentID, 1);
    }

    setMultiple(copyMultiple);
  }

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multiple Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                key={dataItem.id}
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="Title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content ">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No Data Found!</div>
        )}
      </div>
    </div>
  );
};

export default Accordian;
