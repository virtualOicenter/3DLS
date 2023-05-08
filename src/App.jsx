import React, { useEffect, useState } from "react"
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import "./styles/styles.css";
import QuizPage from "./quiz.jsx"
import EditorPage from "./editor.jsx"
import getInitialHotspotsArr from "./components/initialHotspotsArr.jsx";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
  
  const [modelFile, setModelFile] = useState('');
  let [initialHotspotsArr,setInitialHotspotsArr] =useState(()=>{
    const searchParams = new URLSearchParams(window.location.search);
    const hotspotsArrIDParam = searchParams.get('hotspotsArrID');
    if(hotspotsArrIDParam){
      return getInitialHotspotsArr(hotspotsArrIDParam);
    }
})
  

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const modelIDParam = searchParams.get('modelID');
    if (modelIDParam){
      import(`./assets/${modelIDParam}.glb`)
      .then((res) => res.default)
      .then((data) => setModelFile(data))
      .catch((err) => console.error(err));
    }
    
  }, []);

  return (
    <div id="main">
      <Routes>
        {
          modelFile && initialHotspotsArr ? (<Route path="/" element={<><Outlet /></>}>
            <Route path="/dnd-3dmodel-quiz/quiz" element={<QuizPage/>} />
            <Route path="/dnd-3dmodel-quiz/editor" element={<EditorPage/>} />
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