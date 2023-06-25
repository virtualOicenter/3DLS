import { Draggable } from "react-beautiful-dnd";
import { Badge } from 'primereact/badge';
export default function draggbleItems(hotspots) {
  {
    return hotspots.map((hotspot, index) => {
      return (
        <div key={hotspot.id} className="draggableItems align-items-center">
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
                <Badge value={index+1} {...provided.dragHandleProps}
                 pt={{ root: { className: 'bg-primary border-round-sm' } }}/>
              </div>
            )}
          </Draggable>
          {hotspot.title}
        </div>
      );
    });
  }
}
