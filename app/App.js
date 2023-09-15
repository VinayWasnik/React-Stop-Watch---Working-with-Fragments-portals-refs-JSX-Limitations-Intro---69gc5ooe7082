import React, { useState, useRef } from 'react';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const lapRef = useRef(null);
  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setRunning(true);
    }
  };

  const stop = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  };

  const lap = () => {
    if (running) {
      const lapTime = (time / 1000).toFixed(3);
      const lapElement = document.createElement('div');
      lapElement.textContent = `Lap ${lapRef.current.childElementCount + 1}: ${lapTime}s`;
      lapRef.current.appendChild(lapElement);
    }
  };

  const reset = () => {
    stop();
    setTime(0);
    lapRef.current.innerHTML = '';
  };

  return (
    <div className="App">
      <h1>{(time / 1000).toFixed(3)}</h1>
      <button onClick={start}>START</button>
      <button onClick={stop}>STOP</button>
      <button onClick={lap}>LAP</button>
      <button onClick={reset}>RESET</button>
      <div className="lap-section" ref={lapRef}></div>
    </div>
  );
}

export default App;
