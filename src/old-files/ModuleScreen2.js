import React, {useState} from 'react';

import VideoInfoForm from '../components/VideoInfoForm';
import Button from '../components/Button';
import Input from '../components/Input';

function ModuleScreen2() {
    const [modName, setModName] = useState('');
    const [progressNum, setProgressNum] = useState('');
    const [levelNeeded, setLevelNeeded] = useState(false);
    const [videoNeeded, setVideoNeeded] = useState(false);
    const [initialInfoSubmitted, setInitialInfoSubmitted] = useState(false);
    const [videoInfoSubmitted, setVideoInfoSubmitted] = useState(false);
    const [moduleComplete, setModuleComplete] = useState(false);

    function returnString() {
        return 'hello';
    }
    function handleInitialClick(e) {
        e.preventDefault();
        setInitialInfoSubmitted(true);
    }
    function handleAddLevelClick(e) {
        e.preventDefault();
        setVideoNeeded(false);
        console.log('handle add level click');
        setLevelNeeded(true);
    }
    function handleAddVideoClick(e) {
        e.preventDefault();
        setVideoInfoSubmitted(false);
        setVideoNeeded(true);
        setLevelNeeded(false);
    }
    function handleModuleComplete(e) {
        e.preventDefault();
        setLevelNeeded(false);
        setModuleComplete(true);
    }

    function handleAddAdditionalVideo(e) {
        e.preventDefault();
        setVideoInfoSubmitted(true);
        setVideoNeeded(true);
    }

    return (
        <header className="App-header">
            <h1>Drills and Skills Admin Website</h1>
            <h2>Create New Training Module:</h2>
            {!initialInfoSubmitted ? (
                <form onSubmit={handleInitialClick}>
                    <h3>Module Name:</h3>

                    <Input
                        onChange={(modName) => setModName(modName.target.value)}
                        defaultValue={modName}
                        placeholder="Module name"
                    />
                    <h3>Progression #: </h3>
                    <Input
                        onChange={(num) => setProgressNum(num.target.value)}
                        defaultValue={progressNum}
                        placeholder="Progression #"
                    />
                    <br></br>
                    <Button>Add Level</Button>
                </form>
            ) : !videoNeeded ? (
                <form onClick={handleAddVideoClick}>
                    <Button>Add Video</Button>
                </form>
            ) : !videoInfoSubmitted ? (
                <div>
                    <VideoInfoForm></VideoInfoForm>
                    <Button onClick={handleAddAdditionalVideo}>
                        Submit and Add another video to this level
                    </Button>
                    <Button onClick={handleAddLevelClick}>
                        Submit and add a new level
                    </Button>
                    <Button onClick={handleModuleComplete}>
                        Finish this module
                    </Button>
                </div>
            ) : videoNeeded ? (
                <div>
                    <h1>Video needed true</h1>
                    <VideoInfoForm></VideoInfoForm>
                    <Button onClick={handleAddAdditionalVideo}>
                        Submit and Add another video to this level
                    </Button>
                    <Button onClick={handleAddLevelClick}>
                        Submit and add a new level
                    </Button>
                    <Button onClick={handleModuleComplete}>
                        Finish this module
                    </Button>
                </div>
            ) : levelNeeded ? (
                <Button onClick={handleAddVideoClick}>Add Video</Button>
            ) : moduleComplete ? (
                <h1>complete</h1>
            ) : (
                <h1>not complete</h1>
            )}
        </header>
    );
}

export default ModuleScreen2;
