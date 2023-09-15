import React, { useRef, useState } from 'react';

function App() {
  const startTime = useRef(0);
  const intervalRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const start = () => {
    if (!intervalRef.current) {
      startTime.current = Date.now() - currentTime;
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTime.current);
      }, 10);
    }
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const lap = () => {
    if (intervalRef.current) {
      const lapTime = (currentTime / 1000).toFixed(3);
      setLaps([...laps, lapTime]);
    }
  };

  const reset = () => {
    stop();
    setCurrentTime(0);
    setLaps([]);
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{(currentTime / 1000).toFixed(3)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={start}>START</button>
          <button className="stop-btn" onClick={stop}>STOP</button>
          <button className="lap-btn" onClick={lap}>LAP</button>
          <button className="reset-btn" onClick={reset}>RESET</button>
        </section>
      </section>
      <section className='lap-section'>
        <h2>Laps</h2>
        <section className='laps'>
          {laps.map((lap, index) => (
            <p key={index}>Lap {index + 1}: {lap}s</p>
          ))}
        </section>
      </section>
    </div>
  );
}

export default App;
