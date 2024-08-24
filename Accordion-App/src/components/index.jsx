//* simple selction
//* multiselection
import "./styles.css"

import data from "./data"
import { useState } from "react";

function Accordion() {
    const [selected, setSeleted] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSeleted(getCurrentId === selected ? null : getCurrentId);
        
    }
    
    function handleEnableMultiSelection(getCurrentId) {
        let copyOfMultiple = [...multiple];
        const findIndexOfCurrentId = copyOfMultiple.indexOf(getCurrentId);

        if (findIndexOfCurrentId === -1) copyOfMultiple.push(getCurrentId);
        else copyOfMultiple.splice(findIndexOfCurrentId, 1);
        setMultiple(copyOfMultiple);
    }

    console.log(selected, multiple);
  return (
      <div className="wrapper">
          <div>
              <h1>MERN Stack</h1>
              <button onClick={ () => setEnableMultiSelection(!enableMultiSelection)} className="wrapper__button">Enable Multi-selection</button>
         </div>
          <div className="accordion">
              {
                  data && data.length > 0 ?
                      data.map((dataItem => <div className="item" key={dataItem.id}>
                          <div onClick={enableMultiSelection ?
                              () => handleEnableMultiSelection(dataItem.id) :
                              () => handleSingleSelection(dataItem.id)}
                              className="title">
                              <h3>{dataItem.question}</h3> 
                              <span>+</span>
                          </div>
                          {
                              enableMultiSelection ?
                                  multiple.indexOf(dataItem.id) === -1 && <div className="content">{dataItem.answer}</div> :
                                  selected === dataItem.id && <div className="content">{ dataItem.answer}</div>

                          }
                        {/* *  {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                             * <div className="content">{ dataItem.answer}</div>
                         *: null }*/}
                  </div> ))
                  : <div>No Data Found</div>
              }
          </div>
    </div>
  )
}

export default Accordion;
