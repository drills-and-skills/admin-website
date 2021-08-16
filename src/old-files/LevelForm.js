import React from 'react';
import {firebase} from '../services/firebase';
import Input from '../components/Input';
import Button from '../components/Button';

function LevelForm(props) {
    return (
        <form onSubmit={props.handleLevelSubmit}>
            <h3>Module Name:</h3>
            <Input
                onChange={(name) => props.setModName(name.target.value)}
                defaultValue={props.modName}
                placeholder="Module Name"></Input>
            <br />
            <h3>Number of Levels:</h3>
            <Input
                onChange={(num) => props.setNumLevels(num.target.value)}
                defaultValue={props.numLevels}
                placeholder="Module Name"></Input>
            <br />
            <Button>Submit</Button>
        </form>
    );
}

export default LevelForm;
