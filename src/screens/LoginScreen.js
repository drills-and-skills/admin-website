import '../Login.css';
import React, {useState} from 'react';
import {signInUser, userIsSignedIn} from '../services/db-call';
import {useHistory} from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [userInvalidMessage, setUserInvalidMessage] = useState('');

    async function handleClick(e) {
        let signInError = signInUser(email, password);
        signInError.then((err) => {
            if (typeof err === 'string') {
                console.log(err);
                setEmail('');
                setPassword('');
                setUserInvalidMessage(true);
            } else {
                let isLoggedIn = userIsSignedIn();
                if (isLoggedIn && email == 'pauleastondevteam@gmail.com') {
                    console.log('isLogged in is True');
                    history.push('/home');
                }
            }
        });
    }

    return (
        <div className="Login">
            <h1>Paul Easton 🏀 Admin</h1>
            <h2>Sign In</h2>
            <div>
                <Input
                    onChange={(text) => setEmail(text.target.value)}
                    value={email}
                    placeholder="email"
                    required
                />
                <br></br>
                <Input
                    type="password"
                    onChange={(text) => setPassword(text.target.value)}
                    value={password}
                    placeholder="password"
                    required
                />
                <br></br>
                <Button onClick={(e) => handleClick(e)}>Submit</Button>
            </div>
            {userInvalidMessage ? (
                <p>Incorrect Login. Please try again.</p>
            ) : (
                ''
            )}
        </div>
    );
}

export default LoginScreen;
