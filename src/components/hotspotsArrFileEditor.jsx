import React, { useState, useRef, useEffect } from "react";
import HotspotsTable from "./hotspotsTable"

import { Button } from 'primereact/button';
// Home function that is reflected across the site1

export default function HotspotsArrFileEditor({ exerciseData, setExerciseData }) {
    const [userSetHotspots, setUserSetHotspots] = useState();
    useEffect(() => {
        setUserSetHotspots(exerciseData.hotspotsFile.hotspots)
    }, [exerciseData])
    const modelRef = useRef();
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
        <div className="w-full h-auto ">
            <model-viewer
                ref={modelRef}
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
                        camera-orbit={exerciseData.model.additionalProps.cameraOrbit}
                        field-of-view={exerciseData.model.additionalProps.fieldOfView}
                        onClick={() => console.log(hotspot.id, "clicked")}
                        key={hotspot.id + index}

                    >
                        <div className="HotspotAnnotation w-full">{hotspot.answer}
                            <div className="hotspotDot">.</div>
                        </div>
                    </button>)
                })}
            </model-viewer>
            {HotspotsTable(userSetHotspots,setUserSetHotspots)}
        </div>
    );
}
