import React from 'react';
import './App.css';
import 'firebase/app';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import TrainerScreen from './old-files/TrainerScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import JumpshotTutorScreen from './screens/JumpshotTutor'
import {userIsSignedIn} from './services/db-call';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import LivestreamScreen from './screens/LivestreamScreen';
import ModuleScreen from './screens/ModuleScreen';
import ChallengeScreen from './screens/ChallengeOfTheWeek';
import TutorialsScreen from './screens/TutorialsScreen';
import SuccessfulUploadScreen from './screens/SuccessUpload';
import EditScreen from './screens/EditScreen';

function App() {
    let isLoggedIn = userIsSignedIn();
    console.log(isLoggedIn);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <PublicRoute exact path="/" component={LoginScreen} />
                    <PrivateRoute
                        restricted={false}
                        exact
                        path="/home"
                        component={HomeScreen}
                    />
                    <PrivateRoute
                        exact
                        path="/trainers"
                        component={TrainerScreen}
                    />
                    <PrivateRoute
                        exact
                        path="/success"
                        component={SuccessfulUploadScreen}
                    />
                    <PrivateRoute
                        exact
                        path="/modules"
                        component={ModuleScreen}
                    />
                    <PrivateRoute
                        exact
                        path="/jumpshot-tutor"
                        component={JumpshotTutorScreen}
                    />
                    <PrivateRoute
                        exact
                        path="/challenge"
                        component={ChallengeScreen}
                    />
                    <PrivateRoute
                        exact
                        path="/livestream"
                        component={LivestreamScreen}
                    />
                    <PrivateRoute exact path="/edit" component={EditScreen} />
                    <PrivateRoute
                        exact
                        path="/order"
                        component={OrderScreen}
                    />
                    <PrivateRoute
                        restricted={false}
                        exact
                        path="/tutorials"
                        component={TutorialsScreen}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
