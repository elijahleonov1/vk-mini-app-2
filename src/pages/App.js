import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from '../panels/Home';
import Persik from '../panels/Persik';

import {getUser} from '../utils/api';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

  useEffect(() => {
    // getUser();
    bridge.subscribe((d) => {
      console.log(d)
    });

    bridge.send("VKWebAppGetFriends", {});

    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  

  const go = e => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <View activePanel={activePanel} popout={popout}>
      <Home id='home' fetchedUser={fetchedUser} go={go} />
      <Persik id='persik' go={go} />
    </View>
  );
}

export default App;

