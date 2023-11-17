import {React, useState} from 'react';
import ReactDOM from 'react-dom';
import {
	AppRoot,
	View,
	Panel,
	Epic,
} from '@vkontakte/vkui';
import Header from './components/header/header';
import GetScalePage from './pages/get-scale-page/get-scale-page';
import AppTabbar from './components/tabbar/app-tabbar';
import MetronomePage from './pages/metronome-page/metronome-page';

const App = () => {
	const [activeStory, setActiveStory] = useState('get-scale');
	const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);

	return (
		<AppRoot>
			<Epic activeStory={activeStory} tabbar={<AppTabbar onStoryChange={onStoryChange} activeStory={activeStory}/>}>
				<View activePanel='get-scale' id='get-scale'>
					<Panel id='get-scale'>
						<Header />

						<GetScalePage />
					</Panel>
				</View>

				<View activePanel='metronome' id='metronome'>
					<Panel id='metronome'>
						<Header />
						<MetronomePage />
					</Panel>
				</View>
			</Epic>
    </AppRoot>
  );
}

export default App;
