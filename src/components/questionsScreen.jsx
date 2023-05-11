export default function questionsScreen(hotspots, bottomScreenContent, randomizeOptions, handleSubmit) {
  return (
    <div id="questionScreen">
      {hotspots
        .filter((hotspot) => hotspot.id === bottomScreenContent)
        .map((hotspot, index) => (
          <div
            /*key={hotspot.id}*/
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div
              id="questionTitle"
              style={{
                margin: "0px 15px 15px 5px",
                padding: "7px",
                backgroundColor: "#dee2e6",
                width: "100px",
              }}
            >
              <p style={{ fontWeight: "600" }}>
                נקודה: {hotspot.title}
              </p>
            </div>
            <div
              id="questionInfo"
              style={{
                margin: "0px 15px 15px 20px",
                padding: "15px",
                backgroundColor: "#def2f8",
                width: "100%",
              }}
            >
              <p
                style={{
                  padding: "0px",
                  marginBottom: "10px",
                }}
              >
                {hotspot.question}
              </p>
              {randomizeOptions(hotspot.id, hotspot.answer)}
              {hotspot.options.map((option, optionIndex) => (
                <div>
                  <input
                    type="radio"
                    id={`question-${index}-option-${optionIndex}`}
                    name={`question-${index}`}
                    value={option}
                    checked={hotspot.userAnswer == option}
                    onChange={() => handleSubmit(option, hotspot.id)}
                  />
                  <label
                    htmlFor={`question-${index}-option-${optionIndex}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
