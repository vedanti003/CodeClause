import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faCopy, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import countries from "./countries";

function App() {
  const [selectedInputCountry, setSelectedInputCountry] = useState(null);
  const [selectedOutputCountry, setSelectedOutputCountry] = useState(null);
  const [translatedText, setTranslatedText] = useState("");
  const [isInputDropdownOpen, setIsInputDropdownOpen] = useState(false);
  const [isOutputDropdownOpen, setIsOutputDropdownOpen] = useState(false);

  const toggleInputDropdown = () => {
    setIsInputDropdownOpen(!isInputDropdownOpen);
    setIsOutputDropdownOpen(false);
  };

  const toggleOutputDropdown = () => {
    setIsOutputDropdownOpen(!isOutputDropdownOpen);
    setIsInputDropdownOpen(false);
  };

  const transText = () => {
    const inputText = document.querySelector(".enterText").value;
    const inputLang = selectedInputCountry || "en"; 
    const outputLang = selectedOutputCountry || "it"; 

    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      inputText
    )}&langpair=${inputLang}|${outputLang}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const translatedText = data.responseData.translatedText;
        setTranslatedText(translatedText);
      })
      .catch((error) => {
        console.error("Error translating text:", error);
      });
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });
  };

  return (
    <div className="App">
      <h1>Translation App</h1>

      <div className="container">
        <div className="text-area">
          <textarea
            spellCheck="false"
            className="enterText"
            placeholder="Enter text"
          ></textarea>
          <div className="panel">
            <FontAwesomeIcon icon={faVolumeUp} onClick={() => speakText(document.querySelector(".enterText").value)} />
            <FontAwesomeIcon icon={faCopy} onClick={() => copyText(document.querySelector(".enterText").value)} />
            <FontAwesomeIcon icon={faCaretDown} onClick={toggleInputDropdown} />

            {isInputDropdownOpen && (
              <div className="dropdown">
                {Object.entries(countries).map(([code, name]) => (
                  <div
                    key={code}
                    onClick={() => {
                      setSelectedInputCountry(code);
                      setIsInputDropdownOpen(false);
                    }}
                    className="dropdown-item"
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-area">
          <textarea
            readOnly
            spellCheck="false"
            className="translated-text"
            placeholder="Translation"
            value={translatedText}
          ></textarea>
          <div className="panel">
            <FontAwesomeIcon icon={faVolumeUp} onClick={() => speakText(translatedText)} />
            <FontAwesomeIcon icon={faCopy} onClick={() => copyText(translatedText)} />
            <FontAwesomeIcon icon={faCaretDown} onClick={toggleOutputDropdown} />

            {isOutputDropdownOpen && (
              <div className="dropdown">
                {Object.entries(countries).map(([code, name]) => (
                  <div
                    key={code}
                    onClick={() => {
                      setSelectedOutputCountry(code);
                      setIsOutputDropdownOpen(false);
                    }}
                    className="dropdown-item"
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <button onClick={transText}>Translate text</button>
    </div>
  );
}

export default App;
