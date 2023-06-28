import React, { useState, useRef } from "react";
import HotspotsTable from "./hotspotsTable"

import { Button } from 'primereact/button';
// Home function that is reflected across the site1

export default function HotspotsArrFileEditor({exerciseData, selectedHotspotsFile, setSelectedHotspotsFile }) {
    const [userSetHotspots, setUserSetHotspots] = useState(selectedHotspotsFile?.hotspots || []);
    const modelRef = useRef();
    const updateHotspotsArr=(newArr)=>{
        setUserSetHotspots(newArr);
        setSelectedHotspotsFile(({...selectedHotspotsFile,'hotspots':newArr}))
    }
    const handleModelClick = (event) => {
        const { clientX, clientY } = event;

        if (modelRef.current) {
            let hit = modelRef.current.surfaceFromPoint(clientX, clientY);
            if (hit) {
                let newHotspot =
                {
                    id: "hotspot-" + (userSetHotspots.length + 1),
                    title: `${userSetHotspots.length + 1}`,
                    question: "",
                    options: [],
                    answer: `${userSetHotspots.length + 1}`,
                    dataSurface: hit,
                    userAnswer: "",
                }
                updateHotspotsArr([...userSetHotspots, newHotspot])
                console.log("hit", hit);
            }
        }
    };
    return (
        <div className="w-full h-auto ">
            <model-viewer
                ref={modelRef}
        onClick={handleModelClick}
                src={exerciseData.model.src}
                alt="Model Preview"
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                interaction-prompt="none"
                shadow-intensity="1"
                ar
                autoplay
            // ios-src={URL.createObjectURL(previewFile)}
            >
                {userSetHotspots && userSetHotspots.map((hotspot, index) => {
                    return (<button
                        className={hotspot.userAnswer == ""
                            ? "Hotspot w-full"
                            : "AnsweredHotspot w-full"}
                        slot={hotspot.id}
                        data-surface={hotspot.dataSurface}
                        data-visibility-attribute="visible"
                        // camera-orbit={exerciseData.model.additionalProps.cameraOrbit}
                        // field-of-view={exerciseData.model.additionalProps.fieldOfView}
                        onClick={() => console.log(hotspot.id, "clicked")}
                        key={hotspot.id + index}

                    >
                        <div className="HotspotAnnotation w-full">{index+1}
                            <div className="hotspotDot">.</div>
                        </div>
                    </button>)
                })}
            </model-viewer>
            {HotspotsTable(userSetHotspots,updateHotspotsArr,exerciseData.type)}
        </div>
    );
}
