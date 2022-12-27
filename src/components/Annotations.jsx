import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

const Annotations = (props) => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);

  // * Retrieving the data from localstorage and parse
  const dataParser = () => {
    for(var i=0; i<parseInt(localStorage.getItem(`${props.paperId}-length`));i++){
      console.log(props.paperId)
      if(JSON.parse(localStorage.getItem(`${props.paperId}-${i}`)).paperId.toString() === props.paperId){
        annotations.push(JSON.parse(localStorage.getItem(`${props.paperId}-${i}`)));
      }
    }
  }

  useEffect(() => {
    dataParser();
    // eslint-disable-next-line
  }, [])
  
  // * add the newAnnotations to the localstorage
  useEffect(() => {
    for(var i=0; i<annotations.length;i++){
      localStorage.setItem(`${props.paperId}-${i}`, JSON.stringify(annotations[i]))
    }

    localStorage.setItem(`${props.paperId}-length`, annotations.length.toString())
  }, [newAnnotation ])
  

  const handleMouseDown = event => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = event => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
        color:props.color,
        type:props.type,
        paperId:props.paperId
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const handleMouseMove = event => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        }
      ]);
    }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];
  return (
    <Stage
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      // TODO : configure the canvas to pdf size: done
      width={750}
      height={700}
    >
      <Layer>
        {annotationsToDraw.map(value => {
          return (
            <Rect
              x={value.x}
              y={value.y}
              width={value.width}
              height={value.height}
              fill={value.color}
              opacity={0.2}
              stroke="black"
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Annotations;