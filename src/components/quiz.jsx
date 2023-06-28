import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import instructions from "./instructions.jsx";
import reviewAnswers from "./reviewAnswers.jsx";
import questionsScreen from "./questionsScreen.jsx";
import ModelViewer from "./modelViewer.jsx";
import draggableItems from './draggableItems.jsx'
// Home function that is reflected across the site1


export default function QuizPage({exercise}) {
    console.log('exercise',exercise);
    const [initialHotspotsArr, setInitialHotspotsArr] = useState(exercise.hotspotsFile.hotspots)
    const modelRef = useRef();
    const [bottomScreenContent, setBottomScreenContent] = useState("Instructions");
    const [answers, setAnswers] = useState([]);
    const [hotspots, setHotspots] = useState(exercise.hotspotsFile.hotspots);
    const [score, setScore] = useState(0);
    const [hasFinished, setHasFinished] = useState(false);
    const [infoShown, setInfoShown] = useState(true);
    const hotspotFileFound= useRef(exercise.hotspotFile)


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
        // setHotspots(hotspots.filter((hotspot) => hotspot.id !== id));   // answered hotspot disappears
        hotspots.find((hotspot) => hotspot.id == id).userAnswer = input;
        // setBottomScreenContent("Instructions");

        if (initialHotspotsArr.find((f) => f.id == id).title === input) {
            setScore(score + 1);
        }
    };

    const handleReset = () => {
        // setHotspots(initialHotspotsArr);
        hotspots.forEach((hotspot) => {
            hotspot.userAnswer = "";
        });
        setAnswers([]);
        setScore(0);
        setHasFinished(false);
        setBottomScreenContent("Instructions");
        setInfoShown(true);
    };
    const handleShowAnswers = () => {
        alert(JSON.stringify(hotspots.map((hotspot) => hotspot.userAnswer)));
    };
    const handleFinish = () => {
        setHasFinished(true);
    };

    const ShowAnswersOnFinish = () => {
        setHotspots(initialHotspotsArr);
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
    return (hotspotFileFound.current!=undefined ? (
    <div style={{backgroundColor:"red", color:"white", textAlign:"center"}}>
    ERROR HOTSPOTS NOT FOUND
  </div>
  )
        : (
            <div id="main">
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
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            height: "auto",
                            backgroundColor: "none",
                        }}
                    >
                        <div>
                            <button
                                id="btnInformation"
                                onMouseEnter={() => setInfoShown(true)}
                                onMouseLeave={() => setInfoShown(false)}
                            >
                                הוראות
                            </button>
                            <button id="btnFinishQuiz" onClick={handleFinish}>
                                סיום הבוחן...
                            </button>
                            <button
                                onClick={handleReset}
                                style={{ margin: "0px 15px 15px 15px" }}
                            >
                                נסיון מענה חדש
                            </button>
                        </div>
                        {!hasFinished ? (
                            <div>
                                <p style={{ margin: 5, direction: "rtl" }}>
                                    מספר שאלות שנותרו למענה:{" "}
                                    {hotspots.length -
                                        hotspots.filter((f) => f.userAnswer !== "").length}
                                </p>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    {hasFinished ? (
                        reviewAnswers(initialHotspotsArr, hotspots, score)
                    ) : (
                        <div
                            style={{
                                color: "#343a40",
                                height: "150px",
                                direction: "rtl",
                                height: "auto",
                            }}
                        >
                            {bottomScreenContent === "Instructions" && infoShown
                                ? instructions(exercise.model)
                                : questionsScreen(
                                    hotspots,
                                    bottomScreenContent,
                                    randomizeOptions,
                                    handleSubmit
                                )}
                            {infoShown ? (
                                <button id="btnStart" onClick={() => setInfoShown(false)}>
                                    התחל
                                </button>
                            ) : (
                                <Droppable droppableId="droppable-titles" type="HOTSPOT">
                                    {(provided, _) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr', // Set the columns
                                            gap: '10px' // Add some gap between items
                                          }}>
                                            {draggableItems(hotspots)}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            )}
                        </div>
                    )}

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
                </DragDropContext>
            </div> //main
        )
    );
}
/**
 * {
    "question": "",
    "userAnswer": "",
    "info": "saa",
    "options": [],
    "id": "hotspot-1",
    "dataSurface": "0 0 839 841 842 0.795 0.183 0.022",
    "answer": "תשובה",
    "title": "1xzczx",
    "type": "INFO"
  },

   {
    "question": "נקודה זו היא:",
    "userAnswer": "",
    "options": [],
    "id": "hotspot-1",
    "dataSurface": "0 0 1611 1613 1614 0.073 0.621 0.306",
    "answer": 1,
    "title": "פרידרם"
  },
 */