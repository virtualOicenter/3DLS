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
              className="p-1 w-1"
              style={{
                backgroundColor: "#dee2e6",
              }}
            >
              <p className="font-semibold">
                {hotspot.type == "QUESTION" ? "שאלה" : "מידע"}
              </p>
            </div>
            <div
              id="questionInfo"
              className="p-3 w-full"
              style={{
                backgroundColor: "#def2f8",
              }}
            >

              {/* {randomizeOptions(hotspot.id)} */}
              {hotspot.type == "INFO" ? (hotspot.info) : (
                <>
                  <p
                    style={{
                      padding: "0px",
                      marginBottom: "10px",
                    }}
                  >
                    {hotspot.question}
                  </p>
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
              )}

            </div>
          </div>
        ))}
    </div>
  );
}
