import React, { useEffect, useState } from "react"
import { Droppable } from "react-beautiful-dnd";
export default function ModelViewer(
  modelData,
  modelRef,
  handleModelClick,
  hotspots,
  answers,
  getBackgroundColor,
  bottomScreenContent,
  hasFinished,
  setBottomScreenContent
) {
  const getAnnotationContent = (hotspot,index)=>{
    switch (hotspot.type) {
      case "QUESTION" :
        return <i className="pi pi-question-circle"  ></i>
        case "INFO" :
          return <i className="pi pi-info-circle"  ></i>
      default:
        return hasFinished ? (
            <div>
              {bottomScreenContent != "" ? (index + 1) : (hotspot.anser)}
            </div>)
            : (hotspot.userAnswer != "" && (
              <div>
                {
                  hotspots.findIndex((f) => f.answer == hotspot.userAnswer)+1
                }
              </div>
            ))
    }
  }
  return (!modelData ?
    (
      <div style={{ backgroundColor: "red", color: "white", textAlign: "center" }}>
        ERROR MODEL NOT FOUND
      </div>
    )
    : (
      <div className="h-full"> 
        <model-viewer
        src={modelData.src}
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        interaction-prompt="none"
        shadow-intensity="1"
        camera-orbit={modelData.additionalProps.cameraOrbit}
        field-of-view={modelData.additionalProps.fieldOfView}
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
                    onClick={() =>setBottomScreenContent(hotspot.id)
                      // bottomScreenContent != hotspot.id
                      //   ? hotspot.id
                      //   : "Instructions"
                      // )
                    }
                  >
                    <div className="HotspotAnnotation">
                      {getAnnotationContent(hotspot,index)}
                      <span style={{ display: "none" }}>
                        {provided.placeholder}
                      </span>
                      <div className="hotspotDot">.</div>
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
      </div>
      )
  );
}
