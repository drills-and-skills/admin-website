import React, {useState, useEffect} from 'react';
import ModNameSelect from '../components/ModNameSelect';
import Button from '../components/Button';
import {firebase} from '../services/firebase';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';


function OrderScreen() {
    let db = firebase.firestore();
    const history = useHistory();
    const queryPlayerModNameResult = queryPlayerModNames();
    const queryCoachModNameResult = queryCoachModNames();
    const [module, setModule] = useState('');
    const [actionChosen, setActionChosen] = useState('');
    const [modNamesIsLoading, setModNamesIsLoading] = useState(true);
    const [moduleFor, setModuleFor] = useState('');
    const [orderingPlayers, setOrderingPlayers] = useState(false);
    const [orderingCoaches, setOrderingCoaches] = useState(false);
    var counter = 1;
    let allPlayerModules = [];
    let allCoachModules = [];

    function queryPlayerModNames() {
        db.collection('modules')
            .where('module.userType', '==', 'players')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let modNameObj = {};
                    modNameObj.value = doc.id;
                    modNameObj.label = doc.data().module.name;
                    if (modNameObj.label !== 'Jumpshot Tutor') {
                        allPlayerModules.push(modNameObj);
                    }
                    setModNamesIsLoading(false);
                });
                // console.log(allPlayerModules);
                return allPlayerModules;
            });
    }

    function queryCoachModNames() {
        db.collection('modules')
            .where('module.userType', '==', 'coaches')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let modNameObj = {};
                    modNameObj.value = doc.id;
                    modNameObj.label = doc.data().module.name;
                    if (modNameObj.label !== 'Jumpshot Tutor') {
                        allCoachModules.push(modNameObj);
                    }
                    setModNamesIsLoading(false);
                });
                // console.log(allCoachModules);
                return allCoachModules;
            });
    }

    function choosePlayerModule() {
        console.log(module);
        console.log(allPlayerModules);
    }

    function chooseUserType(value) {
        setModuleFor(value);
        if (value === 'players') {
            setOrderingPlayers(true);
        } else if (value === 'coaches') {
            setOrderingCoaches(true);
        }
    }


    return (
        <header className="App-header">
          
                <div>
                    <h2>Do you want to set the module order for player modules or coaches modules?</h2>
                    <Select 
                        options={[{value: 'players', label: 'Players'}, {value: 'coaches', label: 'Coaches'}]}
                        styles={customStyles}
                        value={moduleFor}
                        onChange={e => {
                            chooseUserType(e.target)
                        }}
                    />
                    <Button onClick={chooseUserType()}>Next</Button>
                </div>
                <div>
                    <h2>Which module do you want to be ordered as #{counter.toString()}</h2>
                    {/* <ModNameSelect
                        module={module}
                        setModule={setModule}
                        allModules={allPlayerModules}
                        isLoading={modNamesIsLoading}
                    /> */}
                    <Button onClick={choosePlayerModule()}>Next</Button>
                </div>
            
        </header>
    );
}

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 10,
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {...provided, opacity, transition};
    }
}

export default OrderScreen;

