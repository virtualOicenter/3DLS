import { Button } from 'primereact/button'
export default function instructions(exercise) {
  // const exercise.model= getModel(modelIDParam)
  if (exercise) {
    return (
      <div id="instructions">
        {/* <p>{`לפניכם פעילות לתרגול עצמי בנושא ${exercise.info}:`}</p> */}
        {exercise.type == "DND" ?
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
          : <ol>
            <li>
              התבוננו במודל התלת ממדי על ידי סיבובו באמצעות העכבר (ניתן להתקרב
              ולהתרחק באמצעות גלגלת העכבר)
            </li>
            <li>
              לחצו על הנקודות כדי להציג תוכן נוסף או שאלה
            </li>
          </ol>
        }
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

