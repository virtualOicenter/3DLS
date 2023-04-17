export default function reviewAnswers(initialHotspotsArr, hotspots,score) {
    return (
      <div style={{ color: "#343a40", height: "auto", direction: "rtl", marginBottom:"10px" }}>
        <p style={{ fontSize: "1.2em" }}>
          כל הכבוד, ענית נכון על {score} מתוך {initialHotspotsArr.length} שאלות
        </p>
        <div className="grid-container">
          <div>
            התשובות הנכונות:
            <br />
            {initialHotspotsArr.map((m) => (
              <ul
                key={m.id}
                className={
                  hotspots.find((f) => f.id == m.id).answer == m.userAnswer
                    ? "answerListCorrect"
                    : "answerList"
                }
              >
                {m.title + ". " + m.answer}
              </ul>
            ))}
          </div>
          <div>
            התשובות שענית:
            <br />
            {hotspots.map(
              (
                m // style={{backgroundColor: m.userAnswer==m.answer? "black" :"white" }}
              ) => (
                <ul
                  key={m.id}
                  className={
                    m.userAnswer == m.answer ? "answerListCorrect" : "answerList"
                  }
                >
                  {m.title + ". " + m.userAnswer}
                </ul>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
  