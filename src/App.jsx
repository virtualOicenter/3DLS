import "./styles/styles.css";
import QuizPage from "./components/quiz"
import EditorPage from "./components/editor"
import getModel from "./assets/3dModelList";

export default function App() {

  const searchParams = new URLSearchParams(window.location.search);
  const modelIDParam = searchParams.get('modelID');
  const hotspotsArrIDParam = searchParams.get('hotspotsArrID');
  const appModeParam = searchParams.get('mode');
  console.log(window.location);
  const getPage = () => {
    switch (appModeParam) {
      case 'editor':
        return EditorPage(modelIDParam, hotspotsArrIDParam)
      case 'quiz':
        return QuizPage(modelIDParam, hotspotsArrIDParam)
      default:
        return <div>
          model id = {getModel(modelIDParam)} or hotspots data = {hotspotsArrIDParam} is not right
        </div>
    }
  }
  return (
    <div id="main">
      {getPage()}
    </div> //main
  );
}
