import React, { useEffect, useState } from "react"
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import "./styles/styles.css";
import QuizPage from "./components/quiz"
import EditorPage from "./components/editor"

export default function App() {
  
  const searchParams = new URLSearchParams(window.location.search);
  const modelIDParam = searchParams.get('modelID');
  const hotspotsArrIDParam = searchParams.get('hotspotsArrID');
  return (
    <div id="main">
      <Routes>
        {
          modelIDParam && hotspotsArrIDParam ? (<Route path="/" element={<><Outlet /></>}>
            <Route path="/dnd-3dmodel-quiz/quiz" element={QuizPage(modelIDParam,hotspotsArrIDParam)} />
            <Route path="/dnd-3dmodel-quiz/editor" element={EditorPage(modelIDParam,hotspotsArrIDParam)} />
          </Route>) 
          :
           (<Route path="/dnd-3dmodel-quiz/*" element={Error(modelIDParam,hotspotsArrIDParam)} />)
        }

      </Routes>
    </div> //main
  );
}
function Error(modelFile, hotspotsArr) {
  return (
  <div>
    model id = {modelFile} or hotspots data = {hotspotsArr} is not right 
  </div>
)
}