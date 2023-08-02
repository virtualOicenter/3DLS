import React, { useState, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Button } from "primereact/button";
import instructions from "./instructions.jsx";
import reviewAnswers from "./reviewAnswers.jsx";
import questionsScreen from "./questionsScreen.jsx";
import ModelViewer from "./modelViewer.jsx";
import draggableItems from './draggableItems.jsx'
// Home function that is reflected across the site1


export default function DNDQuizPage({ exercise }) {
    console.log('DNDQuizPage', exercise);
    const [initialHotspotsArr, setInitialHotspotsArr] = useState(exercise.hotspotsFile.hotspots)
    const modelRef = useRef();
    const [bottomScreenContent, setBottomScreenContent] = useState("Instructions");
    const [answers, setAnswers] = useState([]);
    const [hotspots, setHotspots] = useState(exercise.hotspotsFile.hotspots);
    const [score, setScore] = useState(0);
    const [hasFinished, setHasFinished] = useState(false);
    const [infoShown, setInfoShown] = useState(true);
    const hotspotFileFound = useRef(exercise.hotspotFile)


    const randomizeOptions = (id, answer) => {
        if (hotspots.find((hotspot) => hotspot.id == id).options.length == 4)
            return;
        let randomIndex = Math.floor(Math.random() * 3);
        let returnArr = [];
        for (let i = 0; i < 4; i++) {
            if (i == randomIndex) {
                returnArr[i] = answer;
            } else {
                let randomIncorrectIndex;
                let tempIncorrect = hotspots.filter(
                    (f) => f.answer != answer && !returnArr.find((h) => h == f.answer)
                );
                returnArr[i] =
                    tempIncorrect[
                        Math.floor(Math.random() * tempIncorrect.length)
                    ].answer;
            }
        }
        hotspots.find((hotspot) => hotspot.id == id).options = returnArr;
    };

    const handleSubmit = (input, id) => {
        setAnswers([...answers, { id, answer: input }]);
        hotspots.find((hotspot) => hotspot.id == id).userAnswer = input;
        if (initialHotspotsArr.find((f) => f.id == id).answer === input) {
            setScore(score + 1);
        }
    };

    const handleReset = () => {
        hotspots.forEach((hotspot) => {
            hotspot.userAnswer = "";
        });
        setAnswers([]);
        setScore(0);
        setHasFinished(false);
        setBottomScreenContent("Instructions");
        setInfoShown(true);
    };

    const handleFinish = () => {
        setHasFinished(true);
    };

    const handleModelClick = (event) => {
        const { clientX, clientY } = event;

        if (modelRef.current) {
            let hit = modelRef.current.surfaceFromPoint(clientX, clientY);
            if (hit) {
                //setUserSetHotspots([...userSetHotspots, hit]);
                //  console.log("hit", userSetHotspots);
            }
        }
    };
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
    //<button onClick={handleShowAnswers}>הצג תשובות </button>
    return (hotspotFileFound.current != undefined ? (
        <div style={{ backgroundColor: "red", color: "white", textAlign: "center" }}>
            ERROR HOTSPOTS NOT FOUND
        </div>
    )
        : (
            <div id="main" style={{ direction: "rtl", height: "100vh" }} className="p-3">
                <DragDropContext
                    /*
                    onBeforeCapture={this.onBeforeCapture}
                    onBeforeDragStart={this.onBeforeDragStart}
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}*/
                    onDragEnd={(param) => {
                        console.log(param);
                        const srcI = param.source.index;
                        const desI = param.destination?.droppableId;
                        if (desI && desI != "droppable-titles") {
                            // console.log("handle submit", param.destination.droppableId);
                            let tempAnswer = hotspots.find(
                                (f) => f.id == param.draggableId
                            ).title;
                            handleSubmit(tempAnswer, desI);
                        }
                    }}
                >
                    <div
                        id="upperSection"
                        style={{ backgroundColor: "none" }}
                        className={`flex ${"justify-content-between"}`}
                    >
                        {infoShown ?
                            (<div>
                                הוראות
                            </div>)
                            : (!hasFinished ? <div>
                                מספר שאלות שנותרו למענה:{" "}
                                {hotspots.length -
                                    hotspots.filter((f) => f.userAnswer !== "").length}
                            </div> : <div>
                                כל הכבוד, ענית נכון על {score} מתוך {initialHotspotsArr.length} שאלות
                            </div>)}

                        <div className="flex gap-2">
                            <Button
                                onClick={handleReset}
                                label="נסיון מענה חדש"
                                outlined
                            />
                            <Button id="btnFinishQuiz" onClick={handleFinish} label="סיום הבוחן..." />
                        </div>


                    </div>
                    {hasFinished ? (
                        reviewAnswers(initialHotspotsArr, hotspots, score)
                    ) : (
                        <div
                            style={{ color: "#343a40", }}
                        >
                            {bottomScreenContent === "Instructions" && infoShown
                                ? instructions(exercise)
                                : questionsScreen(
                                    hotspots,
                                    bottomScreenContent,
                                    randomizeOptions,
                                    handleSubmit
                                )}
                            {infoShown && <Button label="התחל" id="btnStart" onClick={() => setInfoShown(false)} />}
                        </div>
                    )}
                    <div className={`flex flex-${window.innerWidth < 768 ? "column" : "row"} gap-3 h-full`}>
                        {!infoShown && !hasFinished && <div className={`${window.innerWidth < 768 ? "w-12" : "w-5"} mt-3 h-full  shadow-2 border-round p-1`}>
                            <Droppable droppableId="droppable-titles" type="HOTSPOT">
                                {(provided, _) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {draggableItems(hotspots)}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>}
                        <div className="w-12 mt-3 h-full shadow-2 border-round" style={{ direction: "ltr" }}>
                            {ModelViewer(
                                exercise.model,
                                modelRef,
                                handleModelClick,
                                hotspots,
                                answers,
                                getBackgroundColor,
                                bottomScreenContent,
                                hasFinished
                            )}

                        </div>
                    </div>

                </DragDropContext>
            </div> //main
        )
    );
}