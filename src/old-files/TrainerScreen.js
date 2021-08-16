import React from 'react';
import TrainerList from '../components/TrainerList';
import TestWrite from './TestWrite';

function TrainerScreen() {
    return (
        <header className="App-header">
            <h1>Drills and Skills Admin Website</h1>
            <h2>Current Trainers:</h2>
            <TrainerList></TrainerList>
            <h2>Write to database: </h2>
            <TestWrite></TestWrite>
        </header>
    );
}

export default TrainerScreen;
