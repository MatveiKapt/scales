import React from 'react';
import {Tabbar, TabbarItem} from '@vkontakte/vkui';

const AppTabbar = ({onStoryChange, activeStory}) => {
  return (
    <Tabbar>
      <TabbarItem data-story={'get-scale'} id={'1'} selected={activeStory === 'get-scale'} onClick={onStoryChange}>
        Гаммы
      </TabbarItem>

      <TabbarItem data-story={'metronome'} id={'2'} selected={activeStory === 'metronome'} onClick={onStoryChange}>
        Метроном
      </TabbarItem>
    </Tabbar>
  );
};

export default AppTabbar;