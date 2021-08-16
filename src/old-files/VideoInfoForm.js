import React, {useState, useEffect} from 'react';
import Input from '../components/Input';

function VideoInfoForm(props) {
    const [videoNum, setVideoNum] = useState('');
    const [videoName, setVideoName] = useState('');
    const [videoLink, setVideoLink] = useState('');
    //const [inputKey, setInputKey] = useState();

    //const videoObj = new Video(videoName, videoLink, videoNum);

    // useEffect(() => {
    //     const videoObj = new Video(videoName, videoLink, videoNum);
    //     props.videoObjects.push(videoObj);
    //     props.videos.push(videoObj);
    //     //console.log(props.videos);
    // }, [props.isSubmitted])

    return (
        <div>
            <p>Video #: </p>
            <Input
                onChange={(num) => setVideoNum(num.target.value)}
                defaultValue={videoNum}
                placeholder="Video #"></Input>
            <p>Video Name:</p>
            <Input
                onChange={(name) => setVideoName(name.target.value)}
                defaultValue={videoName}
                placeholder="Video Name"></Input>
            <p>Link:</p>
            <Input
                onChange={(link) => setVideoLink(link.target.value)}
                defaultValue={videoLink}
                placeholder="Video Link"></Input>
            <p>Trainers: </p>
            {
                //will eventually have a trainer drop down menu}
            }
            {/* <Input
                key={inputKey}
                onChange={(e) => handleVideoChange(e)}
                type="file"
                name="file"
                placeholder="file"
            /> */}
            <br></br>
        </div>
    );
}
export default VideoInfoForm;
