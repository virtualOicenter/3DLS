import React, { useEffect, useState } from "react"
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import "./styles/styles.css";
import QuizPage from "./quiz.jsx"
import getInitialHotspotsArr from "./components/initialHotspotsArr.jsx";

export default function App() {
  
  const [modelFile, setModelFile] = useState('');
  // const [hotspotsArrID, setHotspotsArrID] = useState([]);
  

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const modelIDParam = searchParams.get('modelID');
    // const hotspotsArrIDParam = searchParams.get('hotspotsArrID');
    if (modelIDParam){
      import(`./assets/${modelIDParam}.glb`)
      .then((res) => res.default)
      .then((data) => setModelFile(data))
      .catch((err) => console.error(err));
    }
    // if(hotspotsArrIDParam){
    //   const initialHotspotsArr = getInitialHotspotsArr(hotspotsArrIDParam);
    //   if(initialHotspotsArr)setHotspotsArrID(initialHotspotsArr)
    // }
  }, []);

  return (
    <div id="main">
      <Routes>
        {
          modelFile ? (<Route path="/" element={<><Outlet /></>}>
            <Route path="/dnd-3dmodel-quiz/quiz" element={<QuizPage/>} />
            <Route path="/dnd-3dmodel-quiz/editor" element={<></>} />
          </Route>) 
          :
           (<Route path="/dnd-3dmodel-quiz/*" element={<Error />} />)
        }

      </Routes>
    </div> //main
  );
}
function Error() {
return (
  <div>
    model id or hotspots data is not right
  </div>
)
}