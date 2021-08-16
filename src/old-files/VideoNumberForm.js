import React, {useState} from 'react';
import {firebase} from '../services/firebase';
import Input from '../components/Input';
function VideoNumberForm(props) {
    const [numVideos, setNumVideos] = useState();
    function check() {
        console.log(props.numVideosInLevel);
        props.numVideosInLevel.push(numVideos);
    }
    return (
        <div>
            <h3>Level #:</h3>
            <Input
                // onChange={(name) => setLev1Drill1Name(name.target.value)}
                // defaultValue={lev1Drill1Name}
                placeholder="Level #"></Input>
            <br />
            <h3># of Videos in Level:</h3>
            <Input
                onChange={(num) => setNumVideos(num.target.value)}
                //defaultValue={props.}
                placeholder="# videos"></Input>
            <br />
            {props.levelFormIsSubmitted ? check() : ''}
        </div>
    );
}

export default VideoNumberForm;
