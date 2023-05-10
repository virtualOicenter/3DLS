import React, { useEffect, useState } from "react"
import { Droppable } from "react-beautiful-dnd";

export default function ModelViewer(
  modelIDParam,
  modelRef,
  handleModelClick,
  hotspots,
  answers,
  getBackgroundColor,
  bottomScreenContent,
  hasFinished
) {
  const [modelFile, setModelFile] = useState('');

  useEffect(() => {

    if (modelIDParam) {
      import(`../assets/${modelIDParam}.glb`)
        .then((res) => res.default)
        .then((data) => setModelFile(data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (!modelFile ?
    (
      <div style={{ backgroundColor: "red", color: "white", textAlign: "center" }}>
        ERROR MODEL NOT FOUND
      </div>
    )
    : (
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
        onClick={(event) => { handleModelClick && handleModelClick(event) }}
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
                            {bottomScreenContent != "" ? (index + 1) : (hotspot.title)}
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
      </model-viewer>)
  );
}
