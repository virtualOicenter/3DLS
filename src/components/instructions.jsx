import {Button} from 'primereact/button'
export default function instructions(exercise) {
  // const exercise.model= getModel(modelIDParam)
  console.log('instructions',exercise);
  if (exercise) {
    return (
      <div id="instructions">
        {/* <p>{`לפניכם פעילות לתרגול עצמי בנושא ${exercise.info}:`}</p> */}
        <ol>
          <li>
            התבוננו במודל התלת ממדי על ידי סיבובו באמצעות העכבר (ניתן להתקרב
            ולהתרחק באמצעות גלגלת העכבר)
          </li>
          <li>
            {" "}
            גררו את התשובה למקום המתאים במודל (שימו לב שהנקודה מחליפה צבע כשעומדים
            עליה)
          </li>
        </ol>
        {
          exercise.model &&
          <h6>
            מודל מאת:{" "}
            <a
              href={exercise.model.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {exercise.model.attribution}
            </a>
          </h6>
        }

      </div>
    );
  }
  return null
}

