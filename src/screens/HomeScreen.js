import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Button from '../components/Button';
import {firebase} from '../services/firebase';

function HomeScreen() {
    const history = useHistory();
    const [nextPage, setNextPage] = useState('');

    useEffect(() => {
        if (nextPage === 'videos') {
            history.push('/videos');
        } else if (nextPage === 'trainers') {
            history.push('/trainers');
        } else if (nextPage === 'modules') {
            history.push('/modules');
        } else if (nextPage === 'jumpshot-tutor') {
            history.push('/jumpshot-tutor');
        } else if (nextPage === 'livestream') {
            history.push('/livestream');
        } else if (nextPage === 'challenge') {
            history.push('/challenge');
        } else if (nextPage === 'edit') {
            history.push('/edit');
        } else if (nextPage === 'order') {
            history.push('/order');
        } else if (nextPage === 'tutorials') {
            history.push('/tutorials');
        } else if (nextPage === 'login') {
            firebase
                .auth()
                .signOut()
                .then(function () {
                    history.push('/');
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            return;
        }
    });

    return (
        <header className="App-header">
            <h1>Paul Easton 🏀 Admin Website</h1>
            <Button onClick={() => setNextPage('modules')}>Create Module</Button>
            <Button onClick={() => setNextPage('edit')}>Edit Module</Button>
            {/* <Button onClick={() => setNextPage('order')}>Edit Order that Modules are Displayed</Button> */}
            <Button onClick={() => setNextPage('jumpshot-tutor')}>Add/Remove Trainers from Jumpshot Tutor</Button>
            <Button onClick={() => setNextPage('challenge')}>Create A Challenge</Button>
            <Button onClick={() => setNextPage('livestream')}>Livestream</Button>
            <Button onClick={() => setNextPage('tutorials')}>Tutorials</Button>
            <Button onClick={() => setNextPage('login')}>Log out</Button>
        </header>
    );
}

export default HomeScreen;
