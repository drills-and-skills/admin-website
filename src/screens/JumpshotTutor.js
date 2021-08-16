import React, {useState} from 'react';
import Button from '../components/Button';
import {firebase} from '../services/firebase';
import TrainerSelect from '../components/TrainerSelect';
import {useHistory} from 'react-router-dom';

function JumpshotTutorScreen() {
    const [trainers, setTrainers] = useState([]);
    let db = firebase.firestore();
    let allTrainers = [];
    const [isLoading, setIsLoading] = useState(true);
    const queryResult = queryTrainers(); //causes function to run and get trainers in the background
    const history = useHistory();


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
                    trainerObj.profilePic = doc.data()._profilePic
                    allTrainers.push(trainerObj);
                    setIsLoading(false);
                });
                return allTrainers;
            });
    }
    function handleClick(e) {
        e.preventDefault();
        module.trainers = trainers;
        const jumpshotTutorObject = {
            name: 'Jumpshot Tutor',
            trainers: trainers,
        }
        if (module.trainers.length > 0) {
            db.collection('modules')
            .doc('xM2GnZdazKCLjtUuMwo4')
            .set({module: jumpshotTutorObject})
            .then(() => console.log('Doc written successfully!'));
            history.push('/success');
        } else {
            alert('Please select at least one trainer')
        }
    }

    return (
        <header className="App-header">
            <h1 className="Jumpshot-tutor">Select Jumpshot Tutor Trainers</h1>
            <h2>(When players send in videos for their jumpshot, a trainer will be randomly selected from this list to be sent the video)</h2>
                <TrainerSelect
                    trainers={trainers}
                    setTrainers={setTrainers}
                    allTrainers={allTrainers}
                    isLoading={isLoading}
                />
                <Button onClick={handleClick}>
                    Finish
                </Button>
        </header>
    );
}

export default JumpshotTutorScreen;
