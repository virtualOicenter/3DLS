
export default function reviewAnswers(initialHotspotsArr, hotspots, score) {
  return (
    <div style={{ color: "#343a40", height: "auto", direction: "rtl", marginBottom: "10px" }}>
      <p style={{ fontSize: "1.2em" }}>
        כל הכבוד, ענית נכון על {score} מתוך {initialHotspotsArr.length} שאלות
      </p>
      <div className="grid-container">
        <div>
          התשובות הנכונות:
          <br />
          {hotspots.map(
            (hotspot, index) => (
              <ul
                key={hotspot.id}
                className={
                  hotspot.userAnswer == hotspot.answer ? "answerListCorrect" : "answerList"
                }
              >
                {(index+1) + ". " + hotspot.answer}
              </ul>
            )
          )}
        </div>
        <div>
          התשובות שענית:
          <br />
          {hotspots.map(
            (hotspot, index) => (
              <ul
                key={hotspot.id}
                className={
                  hotspot.userAnswer == hotspot.answer ? "answerListCorrect" : "answerList"
                }
              >
                {(index+1) + ". " + hotspot.userAnswer}
              </ul>
            )
          )}
        </div>
      </div>
    </div>
  );
}
