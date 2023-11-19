import React, { useState, useEffect, useRef } from 'react';

const MetronomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const click = './audio/1.ogg';
  const audioRef = useRef(null);
  const [timerId, setTimerId] = useState(null);
  const [skipClicks, setSkipClicks] = useState(false);

  useEffect(() => {
    const unlockAudioContext = () => {
      if (audioRef.current && audioRef.current.state === 'suspended') {
        audioRef.current.resume();
      }
    };

    audioRef.current = new (window.AudioContext || window.webkitAudioContext)();

    unlockAudioContext();

    return () => {
      if (audioRef.current) {
        audioRef.current.close();
      }
    };
  }, []);

  const NumbersForMiss = [1, 2, 3];

  const handleButtonClick = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const checkNumberForMiss = () => {
    const randomInteger = getRandomInteger(1, 10);
    console.log(randomInteger);
    return NumbersForMiss.some((number) => number === randomInteger);
  };

  const getClick = () => {
    if (skipClicks && !checkNumberForMiss()) {
      audioRef.current.load();
      audioRef.current.play();
    }

    if (!skipClicks) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (timerId) {
      clearInterval(timerId);
    }

    if (isPlaying) {
      const newTimerId = setInterval(() => {
        getClick();
      }, (60 / bpm) * 1000);
      setTimerId(newTimerId);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isPlaying, bpm, skipClicks]);

  return (
    <div>
      <div>
        <label htmlFor="tempo">Темп:</label>
        <input
          id="tempo"
          type="number"
          value={bpm}
          min={20}
          max={300}
          onChange={(e) => {
            setBpm(parseInt(e.target.value));
          }}
        />
      </div>
      <div>
        <input
          type="range"
          value={bpm}
          min={20}
          max={300}
          onChange={(e) => {
            setBpm(parseInt(e.target.value));
          }}
        />
      </div>
      <div>
        <button onClick={handleButtonClick}>{isPlaying ? 'Стоп' : 'Старт'}</button>
      </div>
      <div style={{ paddingTop: '0px' }}>
        <button
          onClick={() => {
            setSkipClicks(!skipClicks);
          }}
        >
          {skipClicks ? 'Не пропускать доли' : 'Пропускать доли'}
        </button>
      </div>
      <audio ref={audioRef}>
        <source src={click} type="audio/ogg" />
      </audio>
    </div>
  );
};

export default MetronomePage;

