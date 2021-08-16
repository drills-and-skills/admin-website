import React, {useEffect} from 'react';
import 'firebase/app';
import firebase from 'firebase';
import 'firebase/firestore';

//This function retrieves links in storage where each video object is stored
export default function TrainerList() {
    const [trainers] = React.useState([]);

    useEffect(() => {
        let i = 0;
        var db = firebase.firestore();
        db.collection('trainers')
            .where('_userType', '==', 'trainers')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((trainer) => {
                    trainers[i] =
                        i +
                        1 +
                        ': ' +
                        trainer.data()._name.firstName +
                        ' ' +
                        trainer.data()._name.lastName;
                    i++;
                });
                //setLoading(false);
            });
    });
    return (
        <div>
            {trainers.map((trainer) => (
                <div key={trainer}>Trainer {trainer} </div>
            ))}
        </div>
    );
}
