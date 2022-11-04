//const app = require('./index');
const {authenticate, createObject} = require('./firestoreController');

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

 
module.exports = {registerUser, loginUser, personalInformationInput,makeUser};