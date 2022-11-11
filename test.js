const { authenticate } = require('./firestoreController');
const {loginUser,registerUser,personalInformationInput, makeUser, checkWorkoutMax} = require('./functions');

test('1 - registering valid usesr', () => {
    email = "abrarzaman2003@gmail.com";
    password = "P@ssword123";
    retypedPassword = "P@ssword123";
  expect(registerUser(email, password, retypedPassword)).toBe("Account Generated");
});

test('attempting to register user with different inputted passwords', () =>{
    email = "abrarzaman2003@gmail.com";
    password = "P@ssword123";
    retypedPassword = "P@assword123";
  expect(registerUser(email, password, retypedPassword)).toBe("passwords do not match!");
})

test('attempting to register user with invalid password', () =>{
    email = "abrarzaman2003@gmail.com";
    password = "Password123";
    retypedPassword = "Password123";
  expect(registerUser(email, password, retypedPassword)).toBe("Password must be between 8 to 15 characters, must contain at least 1 upper case, one lower case, one numerical, and one special character");
})
test('attempting to register user with invalid email address', () =>{
    email = "abrarzaman2003gmail.com";
    password = "Password123";
    retypedPassword = "Password123";
  expect(registerUser(email, password, retypedPassword)).toBe("You have entered an invalid email address!");
})

test('valid personal information input', () =>{
    age = 20;
    weight = 150;
    heightFt = 5;
    heightIn = 8;
  expect(personalInformationInput(age,weight,heightFt,heightIn)).toBe("Personal Info Inputted");
})
test('attempting to enter invalid inches', () =>{
    age = 20;
    weight = 150;
    heightFt = 5;
    heightIn = 13;
  expect(personalInformationInput(age,weight,heightFt,heightIn)).toBe("invalid height (inches)");
})
test('attempting to enter invalid feet', () =>{
    age = 20;
    weight = 150;
    heightFt = -5;
    heightIn = 8;
  expect(personalInformationInput(age,weight,heightFt,heightIn)).toBe("invalid height (feet)");
})
test('attempting to enter invalid weight', () =>{
    age = 20;
    weight = -10;
    heightFt = 5;
    heightIn = 8;
  expect(personalInformationInput(age,weight,heightFt,heightIn)).toBe("invalid body weight");
})
test('attempting to enter invalid age', () =>{
    age = -1;
    weight = 150;
    heightFt = 5;
    heightIn = 8;
  expect(personalInformationInput(age,weight,heightFt,heightIn)).toBe("invalid age");
})

test("creating a user", async () => {
    email = "abrarzaman2003@gmail.com";
    password = "P@ssword123";
    retypedPassword = "P@ssword123";
    age = 20;
    weight = 150;
    heightFt = 5;
    heightIn = 8;
    const data = await makeUser(email,password,retypedPassword,age,weight,heightFt,heightIn);
    expect(data).toBe(true)
})


test("logging in a user", async () => {
    email = "abrarzaman2003@gmail.com";
    password = "P@ssword123";
    const data = await loginUser(email,password);
    expect(data).toBe(true)
})

test("logging in a user with invalid password", async () => {
    email = "abrarzaman2003@gmail.com";
    password = "Pssword123";
    const data = await loginUser(email,password);
    expect(data).toBe(false)
})


test("Workout input", () =>{
  pounds = 25;
  reps = 30;
  sets = 5;
  expect(checkWorkoutMax(pounds, sets, reps)).toBe("Workout Input information Successful");
})



test('attemping to enter workout(sets, reps, lbs)', () =>{
  pounds = 25;
  reps = 30;
  sets = 5;
  expect(checkWorkoutMax(pounds, sets, reps)).toBe("Workout Input information Successful");
})

test("attempting to enter invalid weights", () =>{

  pounds = 999;
  reps = 30;
  sets = 5;
  expect(checkWorkoutMax(pounds, sets, reps)).toBe("invalid weights (lbs), must be between 1 and 600");
})