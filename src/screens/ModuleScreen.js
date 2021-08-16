import React, {useState} from 'react';
import {firebase} from '../services/firebase';
import Button from '../components/Button';
import Input from '../components/Input';
import TrainerSelect from '../components/TrainerSelect';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import {Video} from 'video-metadata-thumbnails';

var AWS = require('aws-sdk');
var sh = require('shorthash');
var s3;

var accessKeyId;
var secretAccessKey;
const bucketName = 'training-modules';

var getKeys = firebase.functions().httpsCallable('getSecretKeyAdminApp');
getKeys().then((result) => {
    if (result.data != null) {
        // Read result of the Cloud Function.
        accessKeyId = result.data.accessKeyId;
        secretAccessKey = result.data.secretAccessKey;
    }
});

function ModuleScreen() {
    //THIS IS WHERE YOU CHANGE THE MODULE OBJECT

    const [modName, setModName] = useState('');
    const [moduleFor, setModuleFor] = useState();
    let db = firebase.firestore();
    const history = useHistory();
    const [modNameIsSubmitted, setModNameIsSubmitted] = useState(false);
    const [videoNum, setVideoNum] = useState(1);
    const [videoName, setVideoName] = useState('');
    const [duration, setDuration] = useState();
    const [inputKey, setInputKey] = useState();
    const [videoLink, setVideoLink] = useState('');
    const [levelTitle, setLevelTitle] = useState();
    const [description, setDescription] = useState('');
    const [guidelines, setGuidelines] = useState('');
    const [trainers, setTrainers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [videoUploadInProgress, setVideoUploadInProgress] = useState(false);
    const queryResult = queryTrainers(); //causes function to run and get trainers in the background
    let allTrainers = [];
    let [module] = useState({});

    /**
     * Query all of the trainers in the 'trainers' collection
     * Creates a trainer object (trainerObj) for each trainer and assigns it a value and label
     * Value is their user/doc id, label is their name (what shows up in dropdown), and profile
     * pic is their profile picture
     * Pushes each trainer object to the allTrainers array
     * Returns allTrainers array
     *
     */
    function queryTrainers() {
        var db = firebase.firestore();
        db.collection('trainers')
            .where('_userType', '==', 'trainers') //can either be removed or changed
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
                    setIsLoading(false);
                });
                return allTrainers;
            });
    }
    /**
     * Clears the videoName and videoLink states and on form
     */
    function clearVideoInfo() {
        setVideoName('');
        setVideoLink('');
        setDescription('');
        setGuidelines('');
    }

    /**
     * Takes the entered VideoName, and level number
     * Creates a video object that is then pushed to the module array
     * Change module to videoObjectArray
     */
    async function processVideoInfo() {
        const fileName =
            'modules/' +
            module.name.replace(/\s/g, '') +
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
        getKeys().then(
            (s3 = new AWS.S3({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            })),
            console.log(s3),
            s3.upload(videoParams, function (err, info) {
                if (err) {
                    alert('Upload Unsuccessful');
                    throw err;
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
                if (module.videos.length === 0) {
                    module.videos.push({data: [data], title: levelTitle});
                } else if (
                    module.videos[module.videos.length - 1].length === 0
                ) {
                    module.videos[module.videos.length - 1].data.push([data]);
                    module.videos[module.videos.length - 1].title = levelTitle;
                } else {
                    module.videos[module.videos.length - 1].data.push(data);
                    module.videos[module.videos.length - 1].title = levelTitle;
                }
                console.log(module);
                setVideoUploadInProgress(false);
                alert('Video Upload Successful!');
            }),
        );
    }

    /**
     * Runs once modName and trainers have been submitted ("initial click")
     * set mod object's name and trainer attributes and then set modNameIsSubmitted to true
     */
    function handleInitialClick(e) {
        e.preventDefault();
        if (modName !== '' && moduleFor) {
            module.name = modName;
            module.userType = moduleFor.value;
            module.trainers = trainers;
            module.videos = [];
            setModNameIsSubmitted(true);
        } else {
            alert(
                'Please enter a name for the module and select whether the module is for players or coaches',
            );
        }

        console.log(module);
    }

    /**
     * Handles the changing of files selected from the local device
     *
     * @param {*} e The event which was clicked
     */
    function handleVideoChange(e) {
        console.log(e.target.files);
        if (e.target.files[0]) {
            setVideoLink(e.target.files[0]);
            console.log(videoLink);
            console.log(videoName.replace(/\s/g, '') + '.mp4');
        }
    }

    /**
     * Only runs if the user is adding a new level to the module
     * sets a videoObject with the entered info using ProcessVideoInfo()
     * increments rendered level number
     * sets the rendered video number back to 1 because it is the first video in a new level
     * clears current video in form
     */
    function handleAddLevelClick(e) {
        // eslint-disable-next-line no-restricted-globals
        // if (
        //     confirm(
        //         'Make sure you have uploaded your last video. If all the fields are blank and you are done with the current level, press OK. If you have not finished uploading the current video, press Cancel and then press Upload Video',
        //     )
        // )
        {
            e.preventDefault();
            module.videos.push({data: []});
            setVideoNum(1); //always restart a new level at video 1
            setLevelTitle('');
            clearVideoInfo();
            console.log(module);
        }
    }
    /**
     * Only runs when user clicks to add additional video to a level
     * sets a videoObject with the entered info using ProcessVideoInfo()
     * increments rendered level number
     * clears current video info in form
     */
    function handleAddAdditionalVideo(e) {
        e.preventDefault();
        processVideoInfo();
        setVideoNum(videoNum + 1);
        clearVideoInfo();
    }
    /**
     * Runs when user clicks that module is complete
     * sets a videoObject with the entered info using ProcessVideoInfo()
     * Actually sets a module document in the database with the videos array, modName, and mod Trainers
     * clears the form and state
     */
    function handleModuleComplete(e) {
        //sets module in database
        e.preventDefault();
        db.collection('modules')
            .doc()
            .set({module: module})
            .then(() => console.log('Doc written successfully!'));
        clearVideoInfo();
        console.log(accessKeyId);
        history.push('/success');
    }

    return (
        <header className="App-header">
            <h1>Paul Easton 🏀 Admin Website</h1>
            <h2>Create New Training Module:</h2>
            {/* This input and dropdown render until they have been submitted */}
            {!modNameIsSubmitted ? (
                <div>
                    <h3>Module Name:</h3>

                    <Input
                        onChange={(modName) => setModName(modName.target.value)}
                        value={modName}
                        placeholder="Module name"
                    />
                    <br></br>
                    <p>Trainers: </p>
                    <TrainerSelect
                        trainers={trainers}
                        setTrainers={setTrainers}
                        allTrainers={allTrainers}
                        isLoading={isLoading}
                    />

                    <p>Module for:</p>
                    <Select
                        options={[
                            {value: 'players', label: 'Players'},
                            {value: 'coaches', label: 'Coaches'},
                        ]}
                        styles={customStyles}
                        value={moduleFor}
                        onChange={setModuleFor}
                    />
                    <Button onClick={handleInitialClick}>Submit</Button>
                </div>
            ) : (
                //***add video upload here!!***
                /**
                 * This div renders once the mod name and trainers have been submitted and
                 * is used to update the module object with new vides
                 */
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
                        onChange={(name) => setVideoName(name.target.value)}
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
                        onChange={(name) => setDescription(name.target.value)}
                        value={description}
                        placeholder="Description"
                        width="500px"
                    />
                    <p>Guidelines:</p>
                    <Input
                        onChange={(link) => setGuidelines(link.target.value)}
                        value={guidelines}
                        placeholder="Guidelines"
                        width="500px"
                    />
                    <br />
                    <br />
                    {/* These buttons render once the intial submit (mod name & trainers) has been submitted */}
                    <Button
                        onClick={handleAddAdditionalVideo}
                        disabled={videoUploadInProgress ? 'disabled' : ''}>
                        {videoUploadInProgress
                            ? 'Video Uploading...'
                            : 'Upload Video'}
                    </Button>
                    <Button
                        onClick={handleAddLevelClick}
                        disabled={videoUploadInProgress ? 'disabled' : ''}>
                        Add a new level
                    </Button>
                    <Button
                        onClick={handleModuleComplete}
                        disabled={videoUploadInProgress ? 'disabled' : ''}>
                        Complete module
                    </Button>
                </div>
            )}
        </header>
    );
}
export default ModuleScreen;

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 10,
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {...provided, opacity, transition};
    },
};
