import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
export default function reviewAnswers( hotspots, score) {
  return (
    <div style={{ color: "#343a40", height: "auto", direction: "rtl", marginBottom: "10px" }}>
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
