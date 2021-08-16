import React, {useEffect} from 'react';
import {firebase} from '../services/firebase';
import {Input} from '../components/Input';
import Button from '../components/Button';
import {Level} from '../utils/Level';
import LevelForm from './LevelForm';
import VideoInfoForm from './VideoInfoForm';

function LevelInfoForm(props) {
    useEffect(() => {
        // props.levels.push(new Level();
        //props.videos.push(videoObj);
        //console.log(props.videos);
        console.log('Levels:' + props.levels);
    }, [props.isSubmitted]);

    function createLevel() {
        console.log('props.numVideosInLevel: ' + props.numVideosInLevel);
        for (let i = 0; i < props.numVideosInLevel; i++) {
            // console.log('i: ' + i);
            // console.log('videos: ' + props.videos);
            props.videos[i] = (
                <VideoInfoForm
                    setVideoObj={props.setVideoObj}
                    videos={props.videos}
                    isSubmitted={props.isSubmitted}
                />
            );
            console.log('pushed a VideoInfoForm');
        }
        console.log('videos ' + props.videos);
        return props.videos;
    }
    return createLevel();
    // .map((element, index) => (
    //     <div key={index}>{element}</div>
    // ));
}

export default LevelInfoForm;
