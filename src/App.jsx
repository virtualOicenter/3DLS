import React, { useEffect, useState } from "react"
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import "./styles/styles.css";
import QuizPage from "./components/quiz"
import EditorPage from "./components/editor"

export default function App() {
  
  const searchParams = new URLSearchParams(window.location.search);
  const modelIDParam = searchParams.get('modelID');
  const hotspotsArrIDParam = searchParams.get('hotspotsArrID');
  console.log(window.location);
  return (
    <div id="main">
      <Routes>
        {
          modelIDParam && hotspotsArrIDParam ? (<Route path="/" element={<><Outlet /></>}>
            <Route path="/quiz" element={QuizPage(modelIDParam,hotspotsArrIDParam)} />
            <Route path="/editor" element={EditorPage(modelIDParam,hotspotsArrIDParam)} />
          </Route>) 
          :
           (<Route path="/*" element={Error(modelIDParam,hotspotsArrIDParam)} />)
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