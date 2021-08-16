import React, {useEffect, useState} from 'react';

import Button from '../components/Button';
import {useHistory} from 'react-router-dom';

function SuccessfulUploadScreen() {
    const [goHome, setGoHome] = useState(false);
    const history = useHistory();
    useEffect(() => {
        if (goHome) {
            history.push('/home');
        } else {
            return;
        }
    });
    return (
        <header className="App-header">
            <h1>Paul Easton 🏀 Admin Website</h1>
            <p>Your change has been submitted successfully</p>
            <Button
                onClick={() => {
                    setGoHome(true);
                }}>
                Go Home
            </Button>
        </header>
    );
}

export default SuccessfulUploadScreen;
