import SpeechRecognition from "react-speech-recognition";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const SpeechMic = ({listening}) => {
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      // continuous: true,
      language: "en-GB",
    });
  };

  return (
    <div className="mt-5">
      {!SpeechRecognition.browserSupportsSpeechRecognition() ? (
        <Alert variant="warning">
          Browser not supported for speech recognition please type in your credentials or try a supoorted browser
        </Alert>
      ) : (
        <div>
          <Button type="button" variant={listening ? "success" : "secondary"} onClick={listenContinuously}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="60" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
              <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}

export default SpeechMic;
