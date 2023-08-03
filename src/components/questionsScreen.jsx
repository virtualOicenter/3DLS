export default function questionsScreen(hotspots, bottomScreenContent, randomizeOptions, handleSubmit) {
  return (
    <div id="questionScreen">
      {hotspots
        .filter((hotspot) => hotspot.id === bottomScreenContent)
        .map((hotspot, index) => (
          <div
            key={hotspot.id}
            className="flex flex-row mt-2 gap-3 shadow-2 p-3"
          >
            <div
              id="questionTitle"
              className="p-2 w-1"
              style={{
                backgroundColor: "#dee2e6",
              }}
            >
              <div className="flex flex-column align-items-center justify-content-center  ">
                <span className="font-semibold">{hotspot.type == "QUESTION" ? "שאלה" : "מידע"}</span>
                <span className="font-normal">{hotspot.type != "QUESTION" && hotspot.title}</span>
              </div>
            </div>
            <div
              id="questionInfo"
              className="p-2 w-full"
              style={{
                backgroundColor: "#def2f8",
              }}
            >

              {/* {randomizeOptions(hotspot.id)} */}
              {hotspot.type == "QUESTION" ? (
                <>
                  <span
                    style={{
                      padding: "0px",
                      marginBottom: "10px",
                    }}
                  >
                    {hotspot.question}
                  </span>
                  {hotspot.options.map((option, optionIndex) => (
                    <div key={`optionIndex-${optionIndex}`}>
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
                </>
              ):(hotspot.type == "INFO" ? hotspot.info : "")}

            </div>
          </div>
        ))}
    </div>
  );
}
