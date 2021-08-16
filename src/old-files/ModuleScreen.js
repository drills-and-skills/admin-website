import React, {useState} from 'react';
import {firebase} from '../services/firebase';
import Input from '../components/Input';
import Button from '../components/Button';
import {Level} from './Level';
import {Module} from './Module';

function ModuleScreen() {
    const [modName, setModName] = useState('');
    const [progressNum, setProgressNum] = useState('');
    const [lev1Drill1Name, setLev1Drill1Name] = useState('');
    const [lev1Drill1Link, setLev1Drill1Link] = useState('');
    const [lev1Drill2Name, setLev1Drill2Name] = useState('');
    const [lev1Drill2Link, setLev1Drill2Link] = useState('');
    const [lev1Drill3Name, setLev1Drill3Name] = useState('');
    const [lev1Drill3Link, setLev1Drill3Link] = useState('');
    const [lev2Drill1Name, setLev2Drill1Name] = useState('');
    const [lev2Drill1Link, setLev2Drill1Link] = useState('');
    const [lev2Drill2Name, setLev2Drill2Name] = useState('');
    const [lev2Drill2Link, setLev2Drill2Link] = useState('');
    const [lev2Drill3Name, setLev2Drill3Name] = useState('');
    const [lev2Drill3Link, setLev2Drill3Link] = useState('');
    const [lev3Drill1Name, setLev3Drill1Name] = useState('');
    const [lev3Drill1Link, setLev3Drill1Link] = useState('');
    const [lev3Drill2Name, setLev3Drill2Name] = useState('');
    const [lev3Drill2Link, setLev3Drill2Link] = useState('');
    const [lev3Drill3Name, setLev3Drill3Name] = useState('');
    const [lev3Drill3Link, setLev3Drill3Link] = useState('');
    let db = firebase.firestore();
    let trainers = [];

    function handleSubmit(e) {
        e.preventDefault();
        const lev1Video1 = new Video(lev1Drill1Name, lev1Drill1Link, 1);
        const lev1Video2 = new Video(lev1Drill2Name, lev1Drill2Link, 2);
        const lev1Video3 = new Video(lev1Drill3Name, lev1Drill3Link, 3);
        const lev2Video1 = new Video(lev2Drill1Name, lev2Drill1Link, 1);
        const lev2Video2 = new Video(lev2Drill2Name, lev2Drill2Link, 2);
        const lev2Video3 = new Video(lev2Drill3Name, lev2Drill3Link, 3);
        const lev3Video1 = new Video(lev3Drill1Name, lev3Drill1Link, 1);
        const lev3Video2 = new Video(lev3Drill2Name, lev3Drill2Link, 2);
        const lev3Video3 = new Video(lev3Drill3Name, lev3Drill3Link, 3);
        const level1 = new Level(lev1Video1, lev1Video2, lev1Video3, 1);
        const level2 = new Level(lev2Video1, lev2Video2, lev2Video3, 2);
        const level3 = new Level(lev3Video1, lev3Video2, lev3Video3, 3);

        //const level1Parsed = jsonrepack(level1);
        //const level2Parsed = jsonrepack(level2);
        //const level3Parsed = jsonrepack(level3);

        const levels = {level1, level2, level3};

        const mod = new Module(levels, modName, progressNum, trainers);
        const stringMod = JSON.stringify(mod);
        const parsedMod = JSON.parse(stringMod);
        db.collection('modules')
            .doc(modName)
            // .withConverter(videoConverter)
            // .withConverter(levelConverter)
            // .withConverter(moduleConverter)
            .set({
                modName: parsedMod,
            })
            .then(() => console.log('Doc written successfully!'));
    }

    return (
        <header className="App-header">
            <h1>Drills and Skills Admin Website</h1>
            <h2>Create New Training Module:</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>Module Name:</h3>
                <Input
                    onChange={(modName) => setModName(modName.target.value)}
                    defaultValue={modName}
                    placeholder="Module name"
                />
                <h3>Progression #: </h3>
                <Input
                    onChange={(num) => setProgressNum(num.target.value)}
                    defaultValue={progressNum}
                    placeholder="Progression #"
                />
                <div>
                    <h3>Level 1:</h3>
                    <p>Drill 1 Name: </p>
                    <Input
                        onChange={(name) =>
                            setLev1Drill1Name(name.target.value)
                        }
                        defaultValue={lev1Drill1Name}
                        placeholder="Drill 1 Name"
                    />
                    <p>Drill 1 Link: </p>
                    <Input
                        onChange={(link) =>
                            setLev1Drill1Link(link.target.value)
                        }
                        defaultValue={lev1Drill1Link}
                        placeholder="Drill 1 Link"
                    />
                    <p>Drill 2 Name: </p>
                    <Input
                        onChange={(name) =>
                            setLev1Drill2Name(name.target.value)
                        }
                        defaultValue={lev1Drill2Name}
                        placeholder="Drill 2 Name"
                    />
                    <p>Drill 2 Link: </p>
                    <Input
                        onChange={(link) =>
                            setLev1Drill2Link(link.target.value)
                        }
                        defaultValue={lev1Drill2Link}
                        placeholder="Drill 2 Link"
                    />
                    <p>Drill 3 Name: </p>
                    <Input
                        onChange={(name) =>
                            setLev1Drill3Name(name.target.value)
                        }
                        defaultValue={lev1Drill3Name}
                        placeholder="Drill 3 Name"
                    />
                    <p>Drill 3 Link: </p>
                    <Input
                        onChange={(link) =>
                            setLev1Drill3Link(link.target.value)
                        }
                        defaultValue={lev1Drill3Link}
                        placeholder="Drill 3 Link"
                    />
                </div>

                <div>
                    <h3>Level 2:</h3>
                    <p>Drill 1 Name: </p>
                    <Input
                        onChange={(name) =>
                            setLev2Drill1Name(name.target.value)
                        }
                        defaultValue={lev2Drill1Name}
                        placeholder="Drill 1 Name"
                    />
                    <p>Drill 1 Link: </p>
                    <Input
                        onChange={(link) =>
                            setLev2Drill1Link(link.target.value)
                        }
                        defaultValue={lev2Drill1Link}
                        placeholder="Drill 1 Link"
                    />
                    <p>Drill 2 Name: </p>
                    <Input
                        onChange={(name) =>
                            setLev2Drill2Name(name.target.value)
                        }
                        defaultValue={lev2Drill2Name}
                        placeholder="Drill 2 Name"
                    />
                    <p>Drill 2 Link: </p>
                    <Input
                        onChange={(link) =>
                            setLev2Drill2Link(link.target.value)
                        }
                        defaultValue={lev2Drill2Link}
                        placeholder="Drill 2 Link"
                    />
                    <p>Drill 3 Name: </p>
                    <Input
                        onChange={(name) =>
                            setLev2Drill3Name(name.target.value)
                        }
                        defaultValue={lev2Drill3Name}
                        placeholder="Drill 3 Name"
                    />
                    <p>Drill 3 Link: </p>
                    <Input
                        onChange={(link) =>
                            setLev2Drill3Link(link.target.value)
                        }
                        defaultValue={lev2Drill3Link}
                        placeholder="Drill 3 Link"
                    />
                </div>
                <div>
                    <h3>Level 3:</h3>
                    <p>Drill 1 Name: </p>
                    <Input
                        onChange={(name) =>
                            setLev3Drill1Name(name.target.value)
                        }
                        defaultValue={lev3Drill1Name}
                        placeholder="Drill 1 Name"
                    />
                    <p>Drill 1 Link: </p>
                    <Input
                        onChange={(link) =>
                            setLev3Drill1Link(link.target.value)
                        }
                        defaultValue={lev3Drill1Link}
                        placeholder="Drill 1 Link"
                    />
                    <p>Drill 2 Name: </p>
                    <Input
                        onChange={(name) =>
                            setLev3Drill2Name(name.target.value)
                        }
                        defaultValue={lev3Drill2Name}
                        placeholder="Drill 2 Name"
                    />
                    <p>Drill 2 Link: </p>
                    <Input
                        onChange={(link) =>
                            setLev3Drill2Link(link.target.value)
                        }
                        defaultValue={lev3Drill2Link}
                        placeholder="Drill 2 Link"
                    />
                    <p>Drill 3 Name: </p>
                    <Input
                        onChange={(name) =>
                            setLev3Drill3Name(name.target.value)
                        }
                        defaultValue={lev3Drill3Name}
                        placeholder="Drill 3 Name"
                    />
                    <p>Drill 3 Link: </p>
                    <Input
                        onChange={(link) =>
                            setLev3Drill3Link(link.target.value)
                        }
                        defaultValue={lev3Drill3Link}
                        placeholder="Drill 3 Link"
                    />
                </div>
                <Button>Submit</Button>
            </form>
        </header>
    );
}

export default ModuleScreen;
