import React, {useState} from 'react';
import {firebase} from '../services/firebase';
import {Input} from '../components/Input';
import Button from '../components/Button';
import {Level} from '../utils/Level';
import VideoInfoForm from 'VideoInfoForm';
function CompleteForm(props) {
    return (
        <form onSubmit={props.handleLevelSubmit}>
            {/* <h3>Level {levelNum}:</h3> */}
            <VideoInfoForm></VideoInfoForm>
            <Input
                onChange={(num) => props.setNumLevels(num.target.value)}
                defaultValue={props.numLevels}
                placeholder="# of Videos"></Input>
            <br />
            <Button>Submit</Button>
        </form>
    );
}

export default CompleteForm;
