export default function instructions(questionTitle) {
    return (
      <div id="instructions">
        <p>לפניכם מבדק לתרגול עצמי בנושא זיהוי מאפיינים בגזר:</p>
        <ol>
          <li>
            התבוננו במודל התלת ממדי על ידי סיבובו באמצעות העכבר (ניתן להתקרב
            ולהתרחק באמצעות גלגלת העכבר)
          </li>
          <li>
            {" "}
            גררו את הפעולה למקום המתאים במודל (שימו לב שהנקודה מחליפה צבע כשעומדים
            עליה)
          </li>
          <li>עמדו על <button id="btnInformation" style={{width:"120px",position:"static", left:"0px", margin:"5px"}}>הוראות</button> בכל שלב על מנת להציג שוב את ההוראות</li>
          <li>לחצו <button id="btnFinishQuiz" style={{width:"120px",position:"static", left:"0px", margin:"5px"}}> סיום הבוחן... </button> בכל שלב על מנת לסיים ולצפות במשוב</li>
          <li>לחצו <button style={{width:"120px",position:"static", left:"0px", margin:"5px"}} >נסיון מענה חדש </button> בכל שלב על מנת לאפס את הלומדה</li>
        </ol>
  
        <h6>
          מודל מאת:{" "}
          <a
            href="https://sketchfab.com/3d-models/human-cell-60ef7d2515b0403986ff9e8b7f234a66#download"
            target="_blank"
            rel="noopener noreferrer"
          >
            Human Cell by markdragan on Sketchfab
          </a>
        </h6>
      </div>
    );
  }
  