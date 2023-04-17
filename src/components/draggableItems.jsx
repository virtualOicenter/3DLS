import { Draggable } from "react-beautiful-dnd";

export default function draggbleItems(hotspots) {
  {
    return hotspots.map((hotspot, index) => {
      return (
        <div key={hotspot.id} className="draggableItems">
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
          {hotspot.answer}
        </div>
      );
    });
  }
}
