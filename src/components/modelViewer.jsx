import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function modelViewer(
  modelRef,
  handleModelClick,
  hotspots,
  answers,
  getBackgroundColor,
  bottomScreenContent
) {
  return (
    <model-viewer
      src="./assets/human_cell.glb"
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      interaction-prompt="none"
      shadow-intensity="1"
      camera-orbit="208.2deg 76.17deg 0.4071m"
      field-of-view="24.31deg"
      ref={(ref) => {
        modelRef.current = ref;
      }}
      onClick={handleModelClick}
    >
      {hotspots.map((hotspot, index) => {
        if (answers.indexOf(hotspot.id) === -1) {
          return (
            <Droppable droppableId={hotspot.id} key={hotspot.id} type="PERSON">
              {(provided, snapshot) => (
                <button
                  /*key={hotspot.id}*/
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
                      hotspot.userAnswer != "" && (
                        <div>
                          {
                            hotspots.find((f) => f.answer == hotspot.userAnswer)
                              .title
                          }
                        </div>
                      )
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
