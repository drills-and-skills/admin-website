import React, {useState} from 'react';
import {firebase} from '../services/firebase';
// import {Module, moduleConverter} from '../utils/Module';
// import {videoConverter} from '../utils/Video';
// import {levelConverter} from '../utils/Level';
import LevelForm from '../components/LevelForm';
import VideoNumberForm from '../components/VideoNumberForm';
import Button from '../components/Button';
import {useHistory} from 'react-router-dom';

function ModuleScreen1() {
    const [numLevels, setNumLevels] = useState(2);
    const [isNumLevelsSubmitted, setIsNumLevelsSubmitted] = useState(false);
    const [levelFormIsSubmitted, setLevelFormIsSubmitted] = useState(false);
    const [numVideosInLevel, setNumVideosInLevel] = useState([]);
    const [modName, setModName] = useState('');
    const levels = [];
    const module = {};
    const history = useHistory();

    function handleLevelSubmit(e) {
        e.preventDefault();
        setIsNumLevelsSubmitted(true);
    }

    function handleVideoNumberSubmit(e) {
        e.preventDefault();
        setLevelFormIsSubmitted(true);
        console.log(numVideosInLevel);
    }

    function renderLevels() {
        console.log(numLevels);
        for (let i = 0; i < numLevels; i++) {
            levels[i] = (
                <VideoNumberForm
                    handleVideoNumberSubmit={handleVideoNumberSubmit}
                    numVideosInLevel={numVideosInLevel}
                />
            );
        }
        return levels;
    }

    function completeSubmit(e) {
        e.preventDefault();
        history.push({
            pathname: './create-module',
            state: {numVideosInLevel: numVideosInLevel},
        });
    }
    return (
        <header className="App-header">
            <h1>Drills and Skills Admin Website</h1>
            <h2>Create New Training Module:</h2>

            {isNumLevelsSubmitted ? (
                <form onSubmit={completeSubmit}>
                    {renderLevels().map((level, index) => (
                        <div key={index}>{level}</div>
                    ))}
                    <Button onSubmit={completeSubmit}>Submit</Button>
                </form>
            ) : (
                //determine how to dynamically render the number of components that the user inputs for levels
                <LevelForm
                    handleLevelSubmit={handleLevelSubmit}
                    setNumLevels={setNumLevels}
                    setModName={setModName}
                    numLevels={numLevels}
                    modName={modName}
                    levelFormIsSubmitted={levelFormIsSubmitted}
                />
            )}
        </header>
    );
}

export default ModuleScreen1;
