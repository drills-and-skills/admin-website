import React, {useEffect} from 'react';
import 'firebase/app';
import firebase from 'firebase';
import 'firebase/firestore';

//This function retrieves links in storage where each video object is stored
//Currenly focused only on week1 videos
export default function VideoList() {
    const [videos] = React.useState([]);
    const [setLoading] = React.useState(true);
    useEffect(() => {
        let i = 0;
        var db = firebase.firestore();
        db.collection('videos')
            .doc('program1')
            .collection('week1')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((video) => {
                    videos[i] = i + 1 + ': ' + video.data().link;
                    i++;
                });
                setLoading(false);
            });
    });
    return (
        <div>
            {videos.map((video) => (
                <div key={video}>Video {video} </div>
            ))}
        </div>
    );
}
