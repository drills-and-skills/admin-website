import React, {useEffect, useState} from 'react';
import Button from '../components/Button';
import DateTimePicker from 'react-datetime-picker';
import {useHistory} from 'react-router-dom';
import Input from '../components/Input';
import {firebase} from '../services/firebase';

function ChallengeScreen() {
    const [date, setDate] = useState('');
    const [challenge, setChallenge] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const history = useHistory();
    let db = firebase.firestore();

    function clearData() {
        setDate('');
        setChallenge('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        db.collection('challenge')
            .doc('challenge')
            .set({
                date: date,
                challenge: challenge,
            })
            .then(() => {
                console.log('Doc written successfully!');
                clearData();
                setIsUploaded(true);
            });
        history.push('/success');
    }
    return (
        <div className="App-header">
            <h1>Paul Easton 🏀 Admin Website</h1>
            <h2>Create a New Challenge: </h2>
            <div></div>
            <div>
                <form onSubmit={handleSubmit}>
                    <p>Challenge: </p>
                    <Input
                        onChange={(name) => setChallenge(name.target.value)}
                        value={challenge}
                        placeholder="Live Session Name"></Input>

                    <br></br>
                    <p>End Date:</p>
                    <DateTimePicker
                        onChange={(date) => setDate(date)}
                        value={date}
                    />
                    <br></br>
                    <br></br>
                    <Button>Submit</Button>
                </form>
                {isUploaded ? <p>Upload successful</p> : ''}
            </div>
        </div>
    );
}

export default ChallengeScreen;
