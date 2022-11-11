//const app = require('./index');
const {authenticate, createObject, createWorkout} = require('./firestoreController');

function registerUser(email, password, retypedPassword) {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
    {
        return("You have entered an invalid email address!")
    }
    if (!( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password))){
        return ("Password must be between 8 to 15 characters, must contain at least 1 upper case, one lower case, one numerical, and one special character");
    }
    if (!(retypedPassword === password)){
        return ("passwords do not match!")
    }
    
    return ("Account Generated")
}

async function loginUser(email, password){
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
    {
        return("You have entered an invalid email address!")
    }
    const a = authenticate(email,password);
    return a;
}

function personalInformationInput(age,bodyweight,heightFt, heightIn){
    if (age < 0 ){
        return "invalid age";
    }
    if (bodyweight < 0){
        return "invalid body weight";
    }

    if (heightFt < 0 || heightFt > 9){
        return "invalid height (feet)"
    }

    if (heightIn < 0 || heightIn > 11){
        return "invalid height (inches)"
    }

    return ("Personal Info Inputted")


}

async function makeUser(email, password, retypedPassword, age,bodyweight,heightFt, heightIn){
    registerUser(email, password, retypedPassword);
    personalInformationInput(age, bodyweight,heightFt,heightIn );
    const a = await createObject(email, password, retypedPassword, age,bodyweight,heightFt, heightIn);
    return true;
    
}

async function makeWorkout(workoutName,workoutType,workoutDate,workoutTime,workoutDuration,workoutNotes, workoutSets, workoutReps, workoutWeights) {
    const a = await createWorkout(workoutName,workoutType,workoutDate,workoutTime,workoutDuration,workoutNotes, workoutSets, workoutReps, workoutWeights);
    return true;
}

// WORKOUT FUNCTIONS
    let min_sets = 1;
    let max_sets = 30;
    let min_reps = 1;
    let max_reps = 40;
    let min_lbs = 1;
    let max_lbs = 600;



    function checkWorkoutMax(pounds, sets, reps){
        // if (pounds >= 1  && pounds <= 600 && sets >= 1 && sets <= 30 &&
        //     reps >= 5 && reps <= 40){
        //     return "Workout Input information Successful";
        // }
        if (sets < 1 || sets > 30){
            return "invalid sets, must be between 1 and 30";
        }
    
        if (pounds < 1 || pounds > 600){
            return "invalid weights (lbs), must be between 1 and 600";
        }
    
        if (reps < 5 || reps > 40){
            return "invalid reps, must be between 1 and 40";
        }
    
        return ("Workout Input information Successful")
    }

// async function checkWorkoutMax(pounds, sets, reps){
//     if(pounds >= min_lbs  && pounds <= max_lbs && sets >= min_sets && sets <= max_sets &&
//     reps >= min_reps && reps <= max_reps){
//         return true;
//     }else{
//         return false;
//     }
// }





 
module.exports = {registerUser, loginUser,personalInformationInput,makeUser,checkWorkoutMax,makeWorkout};