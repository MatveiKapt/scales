import React, {useState} from 'react';
import {Button, Div, Text} from '@vkontakte/vkui';
import {SCALES} from '../../const';
import {getRandomInteger} from '../../util';
import bridge from '@vkontakte/vk-bridge';

const GetScalePage = () => {
  const [currentScale, setCurrentScale] = useState('?');

  const buttonClickHandler = () => {
    const ball = document.querySelector('.scale-ball');
    const getScale = () => SCALES[getRandomInteger(0, SCALES.length - 1)].name;

    ball.classList.add('shake');

    setTimeout(() => {
      setTimeout(() => {
        ball.classList.remove('shake');
      }, 200);

      bridge.send('VKWebAppTapticImpactOccurred', {
        style: 'heavy'
      })
        .then((data) => {
          if (result.data) {
            // вибро есть
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }, 200);

    setTimeout(() => {
      setCurrentScale(getScale());
    }, 200);
  }

  return (
    <Div className='wrapper'>
      <Text className='scale-ball'>{currentScale}</Text>
      <Button onClick={buttonClickHandler} size='l'>
        Получить гамму!
      </Button>
    </Div>
  );
};

export default GetScalePage;