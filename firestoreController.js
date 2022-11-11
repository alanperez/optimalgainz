const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./optimal-gainz-firebase-adminsdk-8pphk-3f8b8778b7.json');

initializeApp({
 credential: cert(serviceAccount)
});
  
const db = getFirestore();

console.log("hi");
const authenticate = async (email,password) =>{
    
    const docRef = db.collection('users').doc(email);
    const doc = await docRef.get();
    if (!doc.exists){
        console.log("user does not exist")
        return false;
    }else{
        if (doc.data()['password'] === password){
            return true;
            //return doc.data();
        }else{
            return false;
        }
    }

    
}

const createObject = async (email,password,age,weight,heightFt, heightIn) =>{
    const docRef = db.collection('users').doc(email);

    await docRef.set({
        email: email,
        password: password,
        age: age,
        weight: weight,
        heightFt: heightFt,
        heightIn: heightIn
    })

    return ({
        email: email,
        password: password,
        age: age,
        weight: weight,
        heightFt: heightFt,
        heightIn: heightIn
    });
    
}

const createWorkout = async (workoutName,workoutType,workoutDate,workoutTime,workoutDuration,workoutNotes) => 
{
    const docRef = db.collection('users').doc(email).collection('workouts').doc(workoutName);
    await docRef.set({
        workoutName: workoutName,
        workoutType: workoutType,
        workoutDate: workoutDate,
        workoutTime: workoutTime,
        workoutDuration: workoutDuration,
        workoutNotes: workoutNotes
    })
    return ({
        workoutName: workoutName,
        workoutType: workoutType,
        workoutDate: workoutDate,
        workoutTime: workoutTime,
        workoutDuration: workoutDuration,
        workoutNotes: workoutNotes
    });
}


// const saveWorkoutObject = async (sets, reps, weight) => {

//     const docRef = db.collection('users').doc(email);

//     await docRef.set({
//         sets: sets,
//         reps: reps,
//         weight: weight
//     })

//     return ({
//         sets: sets,
//         reps: reps,
//         weight: weight
//     });

// }

module.exports = {authenticate,createObject, createWorkout};




