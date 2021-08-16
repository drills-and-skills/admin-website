/* eslint-disable no-restricted-globals */
import React, {useState} from 'react';
import {firebase} from '../services/firebase';
import Button from '../components/Button';
import Input from '../components/Input';
import TrainerSelect from '../components/TrainerSelect';
import ModNameSelect from '../components/ModNameSelect';
import LevelSelect from '../components/LevelSelect';
import DisplayEntireModule from '../components/DisplayEntireModule';
import {useHistory} from 'react-router-dom';
import {Video} from 'video-metadata-thumbnails';
var AWS = require('aws-sdk');
var sh = require('shorthash');

var accessKeyId;
var secretAccessKey;
const bucketName = 'training-modules';
var s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});

var getKeys = firebase.functions().httpsCallable('getSecretKeyAdminApp');
getKeys().then((result) => {
    if (result.data != null) {
        // Read result of the Cloud Function.
        accessKeyId = result.data.accessKeyId;
        secretAccessKey = result.data.secretAccessKey;
    }
});

function ModuleScreen() {
    const [modName, setModName] = useState('');
    let db = firebase.firestore();
    const history = useHistory();
    const [videoNum, setVideoNum] = useState(1);
    const [videoName, setVideoName] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [levelTitle, setLevelTitle] = useState('');
    const [module, setModule] = useState('');
    const [isModuleLoading, setIsModuleLoading] = useState(true);
    const [editModuleObj, setEditModuleObj] = useState({});
    const [trainers, setTrainers] = useState();
    const [inputKey, setInputKey] = useState();
    const [description, setDescription] = useState('');
    const [guidelines, setGuidelines] = useState('');
    const [trainersIsLoading, setTrainersIsLoading] = useState(true);
    const [modNamesIsLoading, setModNamesIsLoading] = useState(true);
    const [modLevelsIsLoading, setModLevelsIsLoading] = useState(true);
    let [videos] = useState([]);
    const queryTrainerResult = queryTrainers();
    //causes trainers query to run at beginning so it is there if user needs to edit it
    const queryModNameResult = queryModNames();
    //causes modNames (all mods in database) to run at beginning so it is there if user needs to edit it
    const [moduleLevel, setModuleLevel] = useState('');
    const [actionChosen, setActionChosen] = useState('');
    const [changeName, setChangeName] = useState(false);
    const [changeTrainersNeeded, setChangeTrainersNeeded] = useState(false);
    const [addLevel, setAddLevel] = useState(false);
    const [addVideoToExisting, setAddVideoToExisting] = useState(false);
    const [editModule, setEditModule] = useState(false);

    const [videoUploadInProgress, setVideoUploadInProgress] = useState(false);
    const [levelToAddTo, setLevelToAddTo] = useState();
    let [levelAdded] = useState({});
    const [moduleVideos, setModuleVideos] = useState([]);
    let allTrainers = []; //array of allTrainers in db
    let allModules = []; //array of all modNames in db
    let allLevels = [];
    // var levelAdded = {};

    /**
     * Updates the modName for the module object chosen by user (module variable)
     */
    function changeModName() {
        //console.log('Modname' + modName);
        db.collection('modules')
            .doc(module.value)
            .update({
                'module.name': modName,
            })
            .then(function () {
                console.log('modName updated successfully');
                history.push('/success');
            });
    }

    /**
     * Updates the trainers for the module object chosen by user (module variable)
     */
    function changeTrainers() {
        if (trainers) {
            db.collection('modules')
                .doc(module.value)
                .update({'module.trainers': trainers})
                .then(function () {
                    console.log('trainers changed successfully');
                    history.push('/success');
                });
        } else {
            alert('Please select at least one trainer');
        }
    }
    /**
     * Deletes the module chosen from the database (module object)
     * Might want to keep Paul from doing this
     */
    function deleteMod() {
        // eslint-disable-next-line no-restricted-globals
        if (
            confirm(
                'Are you sure you want to delete this module? This cannot be undone.',
            )
        ) {
            db.collection('modules')
                .doc(module.value)
                .delete()
                .then(function () {
                    history.push('/success');
                    console.log('doc deleted successfully');
                    return true;
                });
        } else {
            return false;
        }
    }
    /**
     * Runs when any edit button is selected
     * 'a' param specifies which action is to be run
     * The actual action required is called (either rendering the form for a change or completing the change (delete))
     */
    async function handleAction(a) {
        if (module === '') {
            alert('Please select a module first.');
            return;
        }
        if (a === 'deleteMod') {
            let deleted = deleteMod(); //automatically deletes the mod on click
            if (!deleted) {
                return;
            }
        }
        if (a === 'changeModName') {
            setChangeName(true); //sets changeName to true so that the name change form renders
        }
        if (a === 'changeTrainers') {
            setChangeTrainersNeeded(true); //sets changeTrainersNeeded to true so that the change trainers form renders
        }
        if (a === 'addLevel') {
            await getModuleInfoFromFirebase(); //waits for query of all videos in selected module
            setAddLevel(true); //renders add level form
        }
        if (a === 'addVideoToExisting') {
            // await getModuleInfoFromFirebase(); //waits for query of all videos in selected module
            await queryLevelNames();
        }
        if (a === 'editModule') {
            queryModObject(module);
        }
        setActionChosen(a);
    }
    /**
     * Same queryTrainers function as in ModuleScreen (can be moved but still need to update state in this file?)
     * Querys all trainers in database in case user wants to edit them
     */
    function queryTrainers() {
        db.collection('trainers')
            .where('_userType', '==', 'trainers')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let trainerObj = {};
                    trainerObj.value = doc.id;
                    trainerObj.label =
                        doc.data()._name.firstName +
                        ' ' +
                        doc.data()._name.lastName;
                    trainerObj.profilePic = doc.data()._profilePic;
                    allTrainers.push(trainerObj);
                    setTrainersIsLoading(false);
                });
                return allTrainers;
            });
    }
    /**
     * Queries all of the mods in the database
     * creates a ModNameObj that contains a value (user facing mod Name) and label (mod doc id) for the dropdown
     */
    function queryModNames() {
        db.collection('modules')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let modNameObj = {};
                    modNameObj.value = doc.id;
                    modNameObj.label = doc.data().module.name;
                    if (modNameObj.label !== 'Jumpshot Tutor') {
                        allModules.push(modNameObj);
                    }
                    setModNamesIsLoading(false);
                });
                return allModules;
            });
    }

    async function queryLevelNames() {
        await db
            .collection('modules')
            .doc(module.value)
            .get()
            .then((doc) => {
                doc.data().module.videos.forEach((level) => {
                    let levelObj = {};
                    levelObj.value = level.title;
                    levelObj.label = level.title;
                    allLevels.push(levelObj);
                });
            })
            .then(() => {
                setModLevelsIsLoading(false);
                setAddVideoToExisting(true);
            });

        console.log(allLevels);
        return allLevels;
    }

    async function queryModObject(modName) {
        await db
            .collection('modules')
            .where('module.name', '==', modName.label)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    setEditModuleObj(doc.data());
                });
            })
            .then(() => {
                setIsModuleLoading(false);
                setEditModule(true);
            });
    }
    /**
     * Same function as in ModuleScreen (can be moved but needs to update state in this)
     * clears videoName and videoLink state and form for user
     */
    function clearVideoInfo() {
        setVideoName('');
        setVideoLink('');
        setDescription('');
        setGuidelines('');
    }

    /**
     * Similar function as in ModuleScreen (can be moved but still needs to update state)
     * Creates a video object and pushes it to the moduleVideos array
     * Handle however you want to define key here
     */
    async function processVideoInfo() {
        console.log(moduleVideos);
        console.log(levelTitle);
        console.log(videoName);
        const fileName =
            'modules/' +
            moduleVideos.module.name.replace(/\s/g, '') +
            '/' +
            levelTitle.replace(/\s/g, '') +
            '/' +
            videoName.replace(/\s/g, '') +
            '.mp4';

        const video = new Video(videoLink);
        const metadata = await video.getMetadata();

        const videoParams = {
            Bucket: bucketName,
            Key: fileName,
            Body: videoLink,
            ContentType: 'video/mp4',
        };

        setVideoUploadInProgress(true);

        var getKeys = await firebase.functions().httpsCallable('getSecretKeyAdminApp');
        await getKeys().then((result) => {
            if (result.data != null) {
                // Read result of the Cloud Function.
                s3 = new AWS.S3({
                    accessKeyId: result.data.accessKeyId,
                    secretAccessKey: result.data.secretAccessKey,
                })
            }
        });
        
        s3.upload(videoParams, function (err, info) {
            if (err) {
                alert('Upload Unsuccessful');
                throw err;
            }

            if (!levelAdded.title) {
                levelAdded.title = levelTitle;
                levelAdded.data = [];
            }

            const data = {
                level: levelTitle,
                drill: videoName,
                source: info.Location,
                duration: metadata.duration,
                description: description,
                guidelines: guidelines,
                key: sh.unique(videoNum.toString()),
            };

            levelAdded.data.push(data);
            console.log(levelAdded);
            setVideoUploadInProgress(false);
            alert('Video Upload Successful!');
        });
    }

    /**
     * Queries all module info in db for the selected module
     * sets moduleVideos array to contain all videos already in module
     * sets the level number displayed to the user when adding a new level as 1 + the number of the last level
     */
    async function getModuleInfoFromFirebase() {
        console.log(module.value);
        db.collection('modules')
            .doc(module.value)
            .get()
            .then((doc) => {
                setModuleVideos(doc.data());
            });
    }

    /**
     * creates a new video object to be inserted into the video module
     * iterates through all vidoes in the module until it finds the END of the level
     * that the user wants to add the video to OR it has reached the last video in the module
     * sets the key of the of the video object equal to its position in the array + 1 (key stuff commented out)
     * inserts the new videoObject in that position
     * iterates through all videos after the one that was inserted to update their keys by 1
     * updates the videos array in the database
     */
    function handleVideoInsertion() {
        //HANDLE GETTING RID OF KEY
        var videoObject = {};
        videoObject.drill = videoName;
        videoObject.source = videoLink;
        videoObject.level = parseInt(levelToAddTo); //this level is indicated by the user
        let i;
        //let savedIndex = 0;
        for (i = 0; i < moduleVideos.length; i++) {
            if (
                moduleVideos[i].level > levelToAddTo ||
                i === moduleVideos.length - 1
            ) {
                //videoObject.key = i;
                moduleVideos.splice(i - 1, 0, videoObject);
                //savedIndex = i;
                break;
            }
        }
        // let j;
        // for (j = savedIndex; j < moduleVideos.length; j++) {
        //     moduleVideos[j].key += 1;
        // }
        db.collection('modules')
            .doc(module.value)
            .update({
                'module.videos': moduleVideos,
            })
            .then(() => console.log('Doc written successfully!'));
        clearVideoInfo();
        history.push('/success');
    }
    /**
     * calls handleVideoInsertion
     */
    async function handleAddAdditionalVideoToLevel(e) {
        e.preventDefault();
        console.log(editModuleObj);
        // handleVideoInsertion();
    }
    /**
     * Processes video info
     * increments videoNum (what is rendered to user)
     * clears video info state
     */
    function handleAddAdditionalVideo(e) {
        e.preventDefault();
        processVideoInfo();
        setVideoNum(videoNum + 1);
        clearVideoInfo();
    }
    /**
     * Processes last video entered info
     * Updates the module's videos and pushes
     * Sends user to succeses page
     */
    async function handleModuleComplete(e) {
        if (
            confirm(
                'Please make sure your last video has uploaded. If you are sure that you have completed your level, press OK. If not, press cancel and continue to upload videos.',
            )
        ) {
            setModuleVideos(moduleVideos.module.videos.unshift(levelAdded));
            e.preventDefault();
            db.collection('modules')
                .doc(module.value)
                .update({
                    'module.videos': moduleVideos.module.videos,
                })
                .then(() => console.log('Doc written successfully!'));
            clearVideoInfo();
            history.push('/success');
        }
    }

    function handleVideoChange(e) {
        console.log(e.target.files);
        if (e.target.files[0]) {
            setVideoLink(e.target.files[0]);
            console.log(videoLink);
            console.log(videoName.replace(/\s/g, '') + '.mp4');
        }
    }

    return (
        <header className="App-header">
            <h1>Paul Easton 🏀 Admin Website</h1>
            <h2>Edit Existing Training Module:</h2>
            <div>
                {!editModule ? (
                    <div>
                        <h3>Module Name:</h3>
                        <ModNameSelect
                            module={module}
                            setModule={setModule}
                            allModules={allModules}
                            isLoading={modNamesIsLoading}
                        />
                    </div>
                ) : (
                    <div></div>
                )}
                {/* Renders when an edit action button has been clicked */}
                {actionChosen ? (
                    <div>
                        {changeName ? ( //renders when user clicks name change button
                            <div>
                                <p>New Name: </p>
                                <Input
                                    onChange={(name) =>
                                        setModName(name.target.value)
                                    }
                                    value={modName}
                                    placeholder="Module Name"
                                />
                                <Button onClick={changeModName}>Submit</Button>
                            </div>
                        ) : (
                            ''
                        )}
                        {changeTrainersNeeded ? ( //renders when user wants to edit trainers
                            <div>
                                <p>Trainers: </p>
                                <TrainerSelect
                                    trainers={trainers}
                                    setTrainers={setTrainers}
                                    allTrainers={allTrainers}
                                    isLoading={trainersIsLoading}
                                />
                                <Button onClick={changeTrainers}>Submit</Button>
                            </div>
                        ) : (
                            ''
                        )}
                        {addLevel ? ( //renders when user wants to add a new level (to end of module only)
                            <div>
                                <div>
                                    <h3>Name of Level: </h3>
                                    <Input
                                        onChange={(text) =>
                                            setLevelTitle(text.target.value)
                                        }
                                        value={levelTitle}
                                        placeholder="Name The Level"
                                    />
                                </div>

                                <br />
                                <p>Video {videoNum}</p>
                                <p>Video Name:</p>
                                <Input
                                    onChange={(name) =>
                                        setVideoName(name.target.value)
                                    }
                                    value={videoName}
                                    placeholder="Video Name"
                                />
                                <p>Video File:</p>
                                <Input
                                    key={inputKey}
                                    onChange={(e) => handleVideoChange(e)}
                                    accept="video/mp4"
                                    type="file"
                                    name="file"
                                    placeholder="file"
                                    width="400px"
                                />
                                <p>Description:</p>
                                <Input
                                    onChange={(name) =>
                                        setDescription(name.target.value)
                                    }
                                    value={description}
                                    placeholder="Description"
                                    width="500px"
                                />
                                <p>Guidelines:</p>
                                <Input
                                    onChange={(link) =>
                                        setGuidelines(link.target.value)
                                    }
                                    value={guidelines}
                                    placeholder="Guidelines"
                                    width="500px"
                                />
                                <br></br>
                                <br></br>
                                <Button
                                    onClick={handleAddAdditionalVideo}
                                    disabled={
                                        videoUploadInProgress ? 'disabled' : ''
                                    }>
                                    {videoUploadInProgress
                                        ? 'Video Uploading...'
                                        : 'Upload Video'}
                                </Button>
                                <Button
                                    onClick={(e) => handleModuleComplete(e)}
                                    disabled={
                                        videoUploadInProgress ? 'disabled' : ''
                                    }>
                                    Complete and Add Level to Module
                                </Button>
                            </div>
                        ) : (
                            ''
                        )}
                        {editModule ? (
                            <div>
                                <DisplayEntireModule
                                    module={editModuleObj}
                                    value={module.value}
                                    isLoading={isModuleLoading}
                                    onClick={handleAddAdditionalVideoToLevel}
                                />
                            </div>
                        ) : (
                            ''
                        )}
                        {addVideoToExisting ? (
                            <LevelSelect
                                moduleLevel={moduleLevel}
                                setModuleLevel={setModuleLevel}
                                allLevels={allLevels}
                                isLoading={modLevelsIsLoading}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                ) : (
                    //renders until action has been chosen
                    <div>
                        <br></br>
                        <Button onClick={() => handleAction('editModule')}>
                            Edit Module Info/Delete Levels
                        </Button>
                        <Button onClick={() => handleAction('addLevel')}>
                            Add level
                        </Button>
                        {/* <Button
                            onClick={() => handleAction('addVideoToExisting')}>
                            Add video to existing level
                        </Button> */}
                        <Button onClick={() => handleAction('changeTrainers')}>
                            Change assigned trainers
                        </Button>
                        <Button onClick={() => handleAction('changeModName')}>
                            Change module name
                        </Button>
                        <Button onClick={() => handleAction('deleteMod')}>
                            Delete module
                        </Button>
                    </div>
                )}
                <br></br>
            </div>
        </header>
    );
}
export default ModuleScreen;
