import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { Button, FormItem, Group, Slider } from '@vkontakte/vkui';
import { getRandomInteger } from '../../util';

const MetronomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const click = './audio/1.ogg';
  const [play] = useSound(click);
  const [timerId, setTimerId] = useState(null);
  const [skipClicks, setSkipClicks] = useState(false);

  const NumbersForMiss = [1, 2, 3];

  const unlock = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
    audioContext.resume();
  };

  const handleButtonClick = () => {
    unlock();
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      play();
    }
  };

  const checkNumberForMiss = () => {
    const randomInteger = getRandomInteger(1, 10);
    console.log(randomInteger);
    return NumbersForMiss.some((number) => number === randomInteger);
  };

  const getClick = () => {
    if (skipClicks && !checkNumberForMiss()) {
      play();
    }

    if (!skipClicks) {
      play();
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
    <Group>
      <FormItem top={'Темп:'} htmlFor={'tempo'}>
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
      </FormItem>

      <FormItem>
        <Slider
          value={bpm}
          min={20}
          max={300}
          onChange={(value) => {
            setBpm(Math.round(value));
          }}
        />
      </FormItem>

      <FormItem>
        <Button onClick={handleButtonClick}>
          {isPlaying ? 'Стоп' : 'Старт'}
        </Button>
      </FormItem>
      <FormItem style={{ paddingTop: '0px' }}>
        <Button
          onClick={() => {
            setSkipClicks(!skipClicks);
          }}
        >
          {skipClicks ? 'Не пропускать доли' : 'Пропускать доли'}
        </Button>
      </FormItem>
    </Group>
  );
};

export default MetronomePage;
