import React, { useEffect, useState } from "react"
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import "./styles/styles.css";
import QuizPage from "./quiz.jsx"
import EditorPage from "./editor.jsx"

export default function App() {
  
  const searchParams = new URLSearchParams(window.location.search);
  const modelIDParam = searchParams.get('modelID');
  const hotspotsArrIDParam = searchParams.get('hotspotsArrID');
  // const [modelFile, setModelFile] = useState('');
  // const [hotspotsArr, setHotspotsArr]= useState('');

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const modelIDParam = searchParams.get('modelID');
  //   if (modelIDParam){
  //     import(`./assets/${modelIDParam}.glb`)
  //     .then((res) => res.default)
  //     .then((data) => setModelFile(data))
  //     .catch((err) => console.error(err));
  //   }
  //   const hotspotsArrIDParam = searchParams.get('hotspotsArrID');
  //   if (hotspotsArrIDParam){
  //     import (`./hotspotsArrays/${hotspotsArrIDParam}.js`)
  //     .then((res) => {setHotspotsArr(res.default)})
  //     // .then((data) => { console.log('data=>', data);})
  //     .catch((err) => console.error(err));
  //   }
    
  // }, []);

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