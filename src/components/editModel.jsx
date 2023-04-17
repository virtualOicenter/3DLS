import React, { useState, useEffect, useRef } from "react";



const initialHotspotsArr = [
  {
    id: "hotspot-1",
    title: "forehead",
    question: "כיצד החלק העליון של הגולגולת מעיד על נפח המח והתפתחות חלקיו?",
    dataSurface: "12 0 1025 1017 1026 0.511 0.075 0.414",
  },
  {
    id: "hotspot-2",
    title: "chin",
    question: "לפי מבנה הגולגולת, מה היה סוג תזונת ההומוניד?",
    dataSurface: "6 0 20975 20976 20977 0.723 0.070 0.207",
  },
  {
    id: "hotspot-3",
    title: "stem bone connection",
    question:
      "על פי מיקום החיבור של הגולגולת לעמוד השדרה, מה נתן לשער אודות הומוניד זה?",
    dataSurface: "11 0 18952 18953 18954 0.427 0.293 0.280",
  },
];

export default function editModel() {
    const modelRef = useRef();
  const [bottomScreenContent, setBottomScreenContent] =
    useState("Instructions");
  const [answers, setAnswers] = useState([]);
  const [hotspots, setHotspots] = useState(initialHotspotsArr);
  const [userSetHotspots,setUserSetHotspots]=useState([])

  const handleSubmit = (input, id) => {
    setAnswers([...answers, { id, answer: input }]);
    setHotspots(hotspots.filter((hotspot) => hotspot.id !== id));
    setBottomScreenContent("Instructions");
    if (!hotspots.length) {
      alert(JSON.stringify(answers));
    }
  };
  const handleReset = () => {
    setHotspots(initialHotspotsArr);
    setAnswers([]);
    setBottomScreenContent("Instructions");
  };
  const handleShowAnswers = () => {
    alert(JSON.stringify(answers));
  };
  const handleModelClick = (event) => {
    const { clientX, clientY } = event;

    if (modelRef.current) {
      let hit = modelRef.current.surfaceFromPoint(clientX, clientY);
      if (hit) {
        setUserSetHotspots([...userSetHotspots,hit])
        console.log('hit',userSetHotspots)
        }
      }
  };

  return (
    <div id="main" style={{ align: "center",fontSize: "1.5em" }}>
      <div
        id="upperSection"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <button onClick={handleReset}>אתחול</button>
          <button onClick={handleShowAnswers}>הצג תשובות </button>
        </div>
        <div>
          <p style={{ margin: 5, direction: "rtl" }}>
            מספר שאלות שנותרו: {hotspots.length}
          </p>
        </div>
      </div>

      <model-viewer
        src="https://cdn.glitch.me/4655dc20-7ccb-43f9-b7c4-e283f5c94494/australopithecus_afarensis_replica%20(1).glb?v=1675681595336"
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        shadow-intensity="1"
        ref={(ref) => {
          modelRef.current = ref;
        }}
        onClick={handleModelClick}
      >
        {hotspots.map((hotspot) => {
          if (answers.indexOf(hotspot.id) === -1) {
            return (
              <button
                key={hotspot.id}
                className="Hotspot"
                slot={hotspot.id}
                data-surface={hotspot.dataSurface}
                data-visibility-attribute="visible"
                onClick={() =>
                  setBottomScreenContent(
                    bottomScreenContent != hotspot.id
                      ? hotspot.id
                      : "Instructions"
                  )
                }
              >
                <div className="HotspotAnnotation">{hotspot.title}</div>
              </button>
            );
          }
          return null;
        })}
        <div className="progress-bar hide" slot="progress-bar">
          <div className="update-bar"></div>
        </div>
      </model-viewer>
      <div id="bottomScreen" style={{ direction: "rtl", padding: "10px"}}>
        {bottomScreenContent === "Instructions" ? (
          <div id="instructions">
            <p>לפניכם מבדק ידע בנושא זיהוי מאפיינים בגולגולת:</p>
            <ol>
              <li>בחרו על גבי המודל נקודה</li>
              <li>ענו על השאלה המופיעה</li>
              <li>עברו לנקודה הבאה</li>
            </ol>
            <p>ניתן לראות את התשובות שהוזנו הלחיצה על הכפתור "הצג תשובות".</p>

            <h6>
              מודל מאת:{" "}
              <a
                href="https://sketchfab.com/3d-models/australopithecus-afarensis-replica-b23a6d2543ed4bd79ff327551ea77d10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Australopithecus afarensis (réplica) by Museo [UV] Historia
                Natural on Sketchfab
              </a>
            </h6>
          </div>
        ) : (
          <div id="questionScreen">
            {hotspots
              .filter((hotspot) => hotspot.id === bottomScreenContent)
              .map((hotspot) => (
                <div key={hotspot.id}>
                  <p>{hotspot.question}</p>
                  <input type="text" id="answerInput" />
                  <button
                    onClick={() =>
                      handleSubmit(
                        document.getElementById("answerInput").value,
                        hotspot.id
                      )
                    }
                  >
                    שלח
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}