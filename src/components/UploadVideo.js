import React, {useState} from 'react';
import 'firebase/auth';
import {storage} from '../services/firebase';
import Input from './Input';
import Button from './Button';

function UploadVideo() {
    const [videoTitle, setVideoTitle] = useState('');
    const [error] = useState('');
    const [video, setVideo] = useState('');
    const [uploadInProgress, setUploadInProgress] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [inputKey, setInputKey] = useState();

    //FUNCTION UPLOADS VIDEO TO FIREBASE STORAGE
    function handleUpload(e) {
        e.preventDefault();
        console.log(video);
        const uploadTask = storage.ref(`videos/${videoTitle}`).put(video);
        uploadTask.on('state_changed', {
            next: function (snapshot) {
                setUploadInProgress(true);
            },
            error: function (error) {
                console.log(error);
            },
            complete: function () {
                console.log('upload complete!');
                setUploadInProgress(false);
                setUploadComplete(true);
                setVideoTitle('');
                setInputKey(Date.now()); //rerenders input file component to clear previous upload
            },
        });
    }

    //FUNCTION HANDLES FILE STATE UPDATE
    function handleVideoChange(e) {
        if (e.target.files[0]) {
            const video = e.target.files[0];
            setVideo(video);
        }
    }
    function handleVideoTitleChange(e) {
        setVideoTitle(e.target.value);
    }

    return (
        <div className="">
            <form onSubmit={(e) => handleUpload(e)}>
                <Input
                    type="text"
                    onChange={(e) => handleVideoTitleChange(e)}
                    placeholder="Video Name"
                    value={videoTitle}
                />
                <div></div>
                <Input
                    key={inputKey}
                    onChange={(e) => handleVideoChange(e)}
                    type="file"
                    name="file"
                    placeholder="file"
                />
                <div></div>
                <Button>Add Video</Button>
            </form>
            <p>{error}</p>
            {uploadInProgress ? <p>Uploading...</p> : ''}
            {uploadComplete ? <p>Upload Complete</p> : ''}
        </div>
    );
}

export default UploadVideo;
