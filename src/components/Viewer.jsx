import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Annotations from "./Annotations";
import Pdf from "./Pdf";

const Viewer = () => {
  const params = useParams();
  const id = params.id.toString();

  // * Passing the color to annotation component
  const [highlight, setHighlight] = useState({
    color: "green",
    type: "author",
  });
  
  
  const [annoList, setAnnoList] = useState([]);
  const [boxList, setBoxList] = useState([])
  useEffect(() => {
    // * length of annotations for the current Pdf
    var length = localStorage.getItem(`${id}-length`);
    console.log(length);
    setAnnoList([])
    for (var i = 0; i < length; i++) {
      annoList.push(JSON.parse(localStorage.getItem(`${id}-${i}`)));
    }
    console.log(annoList);
    setBoxList(annoList)
    // eslint-disable-next-line
  }, [id, highlight]);

  const boxes = boxList
    ? boxList.map((element) => {
        return (
          <div className="box">
            <h3 className="attributes">x: {element.x}</h3>
            <h3 className="attributes">y: {element.y}</h3>
            <h3 className="attributes">height: {element.height}</h3>
            <h3 className="attributes">width: {element.width}</h3>
            <h3
              className="attributes"
              style={{
                backgroundColor: element.color,
                textAlign: "center",
                height: "30px",
                width:"80px",
                paddingTop:"3px"
              }}
            >
              {element.type}
            </h3>
          </div>
        );
      })
    : null;

  const handleHighlight = (color, type) => {
    setHighlight({
      color,
      type,
    });
  };
  return (
    <div>
      <div className="doc-left">
        <div className="labels">
          <h2 className="heading"> Labels </h2>
          <button
            className="title"
            onClick={() => handleHighlight("orange", "title")}
          >
            Title
          </button>
          <button
            className="author"
            onClick={() => handleHighlight("green", "author")}
          >
            Author
          </button>
        </div>
        <div className="boxes">
          <h2 className="heading"> Boxes </h2>
          <div className="element">{boxes}</div>
        </div>
      </div>
      <div className="annotate">
        <Annotations
          color={highlight.color}
          type={highlight.type}
          paperId={id}
        />
      </div>
      <div className="doc">
        <Pdf id={id} />
      </div>
    </div>
  );
};

export default Viewer;
