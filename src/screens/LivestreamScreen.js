import '../Login.css';
import DateTimePicker from 'react-datetime-picker';
import React, {useState} from 'react';
import {firebase} from '../services/firebase';
import Button from '../components/Button';
import Input from '../components/Input';
import {useHistory} from 'react-router-dom';

function LivestreamScreen() {
    const [date, setDate] = useState('');
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const history = useHistory();

    let db = firebase.firestore();

    function clearData() {
        setDate('');
        setName('');
        setLink('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        db.collection('livestream')
            .doc('livestream')
            .set({
                date: date,
                name: name,
                link: link,
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
            <h2>Create a New Livestream: </h2>
            <div></div>
            <div>
                <form onSubmit={handleSubmit}>
                    <p>Session Name: </p>
                    <Input
                        onChange={(name) => setName(name.target.value)}
                        value={name}
                        placeholder="Live Session Name"></Input>
                    <p>Link: </p>

                    <Input
                        onChange={(link) => setLink(link.target.value)}
                        value={link}
                        placeholder="Live Session Link"></Input>

                    <br></br>
                    <p>Date & Time: </p>
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

export default LivestreamScreen;
