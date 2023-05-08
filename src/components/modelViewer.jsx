import React,{ useEffect, useState } from "react"

import { Droppable } from "react-beautiful-dnd";
// import modelFile from "../assets/3dmodel.glb"

export default function ModelViewer(
  modelRef,
  // handleModelClick,
  hotspots,
  answers,
  getBackgroundColor,
  bottomScreenContent,
  hasFinished
) {
  const [modelFile, setModelFile] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const modelIDParam = searchParams.get('modelID');
    if (modelIDParam){
      import(`../assets/${modelIDParam}.glb`)
      .then((res) => res.default)
      .then((data) => setModelFile(data))
      .catch((err) => console.error(err));
    }
  }, []);

  return (
    <model-viewer
      src={modelFile}
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      interaction-prompt="none"
      shadow-intensity="1"
      camera-orbit="208.2deg 76.17deg 0.4071m"
      field-of-view="24.31deg"
      ref={(ref) => {
        modelRef.current = ref;
      }}
    // onClick={()=>{}}
    >
      {hotspots.map((hotspot, index) => {
        if (answers.indexOf(hotspot.id) === -1) {
          return (
            <Droppable droppableId={hotspot.id} key={hotspot.id} type="HOTSPOT">
              {(provided, snapshot) => (
                <button
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ backgroundColor: getBackgroundColor(snapshot) }}
                  className={
                    bottomScreenContent == hotspot.id
                      ? "ClickedHotspot"
                      : hotspot.userAnswer == ""
                        ? "Hotspot"
                        : "AnsweredHotspot"
                  }
                  slot={hotspot.id}
                  data-surface={hotspot.dataSurface}
                  data-visibility-attribute="visible"
                  onClick={
                    () => console.log(hotspot.id, "clicked")
                    //setBottomScreenContent(hotspot.id)
                    // bottomScreenContent != hotspot.id
                    //   ? hotspot.id
                    //   : "Instructions"
                    // )
                  }
                >
                  <div className="HotspotAnnotation">
                    {
                      hasFinished ? (
                      <div>
                      {index+1}
                      </div>)
                        : (hotspot.userAnswer != "" && (
                          <div>
                            {
                              hotspots.find((f) => f.answer == hotspot.userAnswer)
                                .title
                            }
                          </div>
                        ))
                      /*<div className="hotspotDot">.</div>*/
                    }
                    <span style={{ display: "none" }}>
                      {provided.placeholder}
                    </span>
                  </div>
                </button>
              )}
            </Droppable>
          );
        }
        return null;
      })}
      <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar"></div>
      </div>
    </model-viewer>
  );
}
/*
<Draggable draggableId={hotspot.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                style={{
                  ...provided.draggableProps.style,
                  boxShadow: snapshot.isDragging ? "0 0 0 #666" : "none",
                }}
              >
                <div className="draggableHandle" {...provided.dragHandleProps}>
                  {hotspot.title}
                </div>
              </div>
            )}
          </Draggable>
*/
