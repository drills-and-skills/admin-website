/* eslint-disable no-restricted-globals */
import React, {useState} from 'react';
import ModuleInput from '../components/ModuleInput';
import {firebase} from '../services/firebase';
import {useHistory} from 'react-router-dom';
import Button from '../components/Button';

function DisplayEntireModule(props) {
    const [propsVids, setPropsVids] = useState(props.module.module.videos);
    const history = useHistory();

    function handleSubmit(event) {
        let db = firebase.firestore();
        event.preventDefault();
        const data = new FormData(event.target);
        var levels = [];
        propsVids.forEach(propsVid => {
            levels.push({
                title: data.get(`${propsVid.title.replace(/\s/g,'')}`),
                data: [],
            })
            propsVid.data.forEach(vid => {
                var vidObj = {
                    key: vid.key,
                    level: data.get(`${propsVid.title.replace(/\s/g,'')}`),
                    drill: data.get(`${vid.drill.replace(/\s/g,'')}drill`),
                    source: vid.source,
                    description: data.get(`${vid.drill.replace(/\s/g,'')}description`),
                    guidelines: data.get(`${vid.drill.replace(/\s/g,'')}guidelines`)
                }
                levels[levels.length-1].data.push(vidObj)
            });
        });

        db.collection('modules')
            .doc(props.value)
            .update({
                'module.videos': levels,
            })
            .then(() => {
                console.log('Doc written successfully!');
                history.push('/success');
            });
    }

    function removeDrill(target, drill) {
        target.preventDefault();
        if (confirm('Please confirm you want to delete the level: ' + drill + '. If not, then press cancel.')) {
            for (var i = 0; i < propsVids.length; i++) {
                if (propsVids[i].title === drill) {
                    propsVids.splice(i, 1);
                }
            }
            alert('You have successfully deleted ' + drill + '. Note that the changes will not show up on this page or in the app until you press Complete Changes at the bottom of the screen.')
        }
    }

    const videos = propsVids.map(video => {
        const vids = video.data.map(drill => {
            return (
                <div id={drill.drill} key={drill.drill}>
                        <label htmlFor={`${drill.drill.replace(/\s/g,'')}drill`}>
                            Drill Name:
                        </label>
                        <ModuleInput id="drill" className="input" name={`${drill.drill.replace(/\s/g,'')}drill`} value={drill.drill} />
                        <label htmlFor={`${drill.drill.replace(/\s/g,'')}description`}>
                            Description:
                        </label>
                        <ModuleInput id="description" className="input" name={`${drill.drill.replace(/\s/g,'')}description`} value={drill.description} />
                        <label htmlFor={`${drill.drill.replace(/\s/g,'')}guidelines`}>
                            Guidelines:
                        </label>
                        <ModuleInput id="guidelines" className="input" name={`${drill.drill.replace(/\s/g,'')}guidelines`} value={drill.guidelines} />
                        {/* <div>
                            <Button onClick={(e) => removeDrill(e, drill.drill)}>Delete Drill</Button>
                            <Button onClick={(e) => removeDrill(e, drill.drill)}>Add Another Drill</Button>
                        </div> */}
                    <br/>
                </div>
            );
        });

    return (
        <div key={video.title}>
            <div>
                <label htmlFor={`${video.title.replace(/\s/g,'')}`}>Level:</label>
                <ModuleInput id="title" className="title" name={`${video.title.replace(/\s/g,'')}`} value={video.title} />
                <br/>
            </div>
            {vids}
            <Button onClick={(e) => removeDrill(e, video.title)}>Delete Entire Level: {video.title}</Button>
            <br/>
            <br/>
            <br/>
        </div>
    );
});


    return (
        <div>
            {props.isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        {videos}
                        <button>Complete Changes</button>
                    </form>

                </div>
            )}
            
        </div>
    )
}

export default DisplayEntireModule;
