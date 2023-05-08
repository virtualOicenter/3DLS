import React, { useState, useRef, useEffect } from "react";
import HotspotsTable from "./components/hotspotsTable"

import { DragDropContext } from "react-beautiful-dnd";

import getInitialHotspotsArr from "./components/initialHotspotsArr.jsx";
import modelViewer from "./components/modelViewer.jsx";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
// Home function that is reflected across the site1


export default function EditorPage() {
    let [initialHotspotsArr, setInitialHotspotsArr] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const hotspotsArrIDParam = searchParams.get('hotspotsArrID');
        if (hotspotsArrIDParam) {
            return getInitialHotspotsArr(hotspotsArrIDParam);
        }
    })
    const modelRef = useRef();
    const [hotspots, setHotspots] = useState(initialHotspotsArr);
    const [userSetHotspots, setUserSetHotspots] = useState(initialHotspotsArr);
    const [visible, setVisible] = useState(false);

    const getBackgroundColor = (snapshot) => {
        // Giving isDraggingOver preference
        if (snapshot.isDraggingOver) {
            return "grey";
        }
        // If it is the home list but not dragging over
        if (snapshot.draggingFromThisWith) {
            return "blue";
        }
        // Otherwise use our default background
        return; // "white";
    };

    const handleModelClick = (event) => {
        const { clientX, clientY } = event;

        if (modelRef.current) {
            let hit = modelRef.current.surfaceFromPoint(clientX, clientY);
            if (hit) {
                let newHotspot =
                {
                    id: "hotspot-" + (userSetHotspots.length + 1),
                    title: userSetHotspots.length + 1,
                    question: "נקודה זו היא:",
                    options: [],
                    answer: "תשובה",
                    dataSurface: hit,
                    userAnswer: "",
                }
                setUserSetHotspots([...userSetHotspots, newHotspot]);
                console.log("hit", hit, userSetHotspots);
            }
        }
    };

    return (
        <div id="main">
                <Button label="Show" icon="pi pi-external-link" onClick={() => window.alert(JSON.stringify(userSetHotspots))} />
            <DragDropContext>
                {/* <button onClick={() => {alert(userSetHotspots)}}>הצג תשובות </button> */}
                {modelViewer(
                    modelRef,
                    handleModelClick,
                    userSetHotspots, [],
                    getBackgroundColor, '', true
                )}
            </DragDropContext>
            {HotspotsTable(userSetHotspots, setUserSetHotspots)}
                    
        </div> //main
    );
}
