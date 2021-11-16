import React from 'react';
import MainVideos from './MainVideos';
import ContentsMenu from '../ContentsMenu/ContentsMenu';
import Channels from './Channels';
import './MainVideos.css';


const HomePage = () => {
    return (
      <div className="homePage">
        <ContentsMenu />
        <MainVideos />
        <Channels />
      </div>
    );
}
export default HomePage;