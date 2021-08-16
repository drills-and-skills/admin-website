import React from 'react';
import VideoList from './VideoList';
import AddVideo from '../components/UploadVideo';

function VideoScreen() {
    return (
        <header className="App-header">
            <h1>Drills and Skills Admin Website</h1>
            <h2>Current Videos:</h2>
            <VideoList />
            <h2>Add Videos: </h2>
            <AddVideo />
        </header>
    );
}

export default VideoScreen;
