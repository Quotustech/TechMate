import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechToText = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  console.log("the listen value is", transcript);

  const handleStartListening = () => {
    SpeechRecognition.startListening();
  };
  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };
  return (
    <div>
      <div>
        <button onClick={handleStartListening} disabled={listening}>
          Start Listening
        </button>
        <button onClick={handleStopListening} disabled={!listening}>
          Stop Listening
        </button>
        <button onClick={resetTranscript} disabled={!transcript}>
          Reset
        </button>
      </div>
      <div>
        <p>{listening ? "Listening..." : "Not Listening"}</p>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
