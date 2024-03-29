import "./styles/styles.css";

import QuizPage from "./components/dndquiz"
import EditorPage from "./components/editor"
import getModel from "./assets/3dModelList";
import GithubFileUpload from "./components/uploadFile";
import ContentCreatorDashBoard from "./components/contentCreatorDashboard";
import ExerciseViewer from './components/exerciseViewer'
import Helper from "./components/helper";
export default function App() {

  const searchParams = new URLSearchParams(window.location.search);
  const modelIDParam = searchParams.get('modelID');
  const hotspotsArrIDParam = searchParams.get('hotspotsArrID');
  const exerciseIDParam = searchParams.get('exerciseID');
  const appModeParam = searchParams.get('mode');
  const getPage = () => {
    switch (appModeParam) {
      case 'editor':
        return EditorPage(modelIDParam, hotspotsArrIDParam)
      case 'quiz':
        return QuizPage(modelIDParam, hotspotsArrIDParam)
      case 'fileUpload':
        return <GithubFileUpload />
      case 'contentCreatorDashBoard':
        return <ContentCreatorDashBoard/>
      case 'exerciseViewer':
      return <ExerciseViewer exerciseID={exerciseIDParam}/>
      default:
        return <div>
          model id = {getModel(modelIDParam)} or hotspots data = {hotspotsArrIDParam} is not right
        </div>
    }
  }
  return (
    <div id="main">
      <Helper modeId={appModeParam}/>
      {getPage()}
    </div> //main
  );
}
