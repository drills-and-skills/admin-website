import React, {useState} from 'react';
import 'firebase/auth';
import {firebase} from '../services/firebase';
import Button from '../components/Button';
import Input from '../components/Input';

//Eventually the form should include a drop down to edit what's in storage and ask which training program the video is for or whether it's a new one.

function TestWrite() {
    const [enteredData, setEnteredData] = useState('');
    const db = firebase.firestore();
    function handleSubmit(e) {
        e.preventDefault();
        db.collection('test').doc('test1').set({
            name: {enteredData},
        });
        setEnteredData('');
    }
    function handleDataChange(e) {
        setEnteredData(e.target.value);
    }
    return (
        <div className="">
            <form onSubmit={(e) => handleSubmit(e)}>
                <Input
                    type="text"
                    placeholder="Field Data"
                    value={enteredData}
                    onChange={(e) => {
                        handleDataChange(e);
                    }}
                />
                <div></div>
                <Button>Add Data</Button>
            </form>
            {/* <p>{error}</p> */}
            {/* {uploadInProgress ? <p>Uploading...</p> : ''}
            {uploadComplete ? <p>Upload Complete</p> : ''} */}
        </div>
    );
}

export default TestWrite;
