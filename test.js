const { authenticate, createWorkout } = require('./firestoreController');
const {loginUser,registerUser,personalInformationInput, makeUser, checkWorkoutMax, makeWorkout} = require('./functions');

test('1 - registering valid usesr', () => {
    email = "abrarzaman2003@gmail.com";
    password = "P@ssword123";
    retypedPassword = "P@ssword123";
  expect(registerUser(email, password, retypedPassword)).toBe("Account Generated");
});
// test('2 - registering valid usesr', () => {
//   email = "test@mail.com";
//   password = "P@ssword123";
//   retypedPassword = "P@ssword123";
// expect(registerUser(email, password, retypedPassword)).toBe("Account Generated");
// });

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

// test("creating a user", async () => {
//   email = "test@mail.com";
//   password = "P@ssword123";
//   retypedPassword = "P@ssword123";
//   age = 70;
//   weight = 170;
//   heightFt = 6;
//   heightIn = 2;
//   const data = await makeUser(email,password,retypedPassword,age,weight,heightFt,heightIn);
//   expect(data).toBe(true)
// })

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

test("creating workout for user", async () => {
  workoutName = "Overhead Press",
  workoutType = "Compound Exercise",
  workoutDate = "2022-11-11",
  workoutTime = "12:00 P.M",
  workoutDuration = "30min",
  workoutNotes = "Keep a tight grip on the bar at all times, a tighter grip equates to more tension in the lower arms, upper back and chest."
  workoutSets = 3, 
  workoutReps = 8, 
  workoutWeights = "135 lbs"
  // workoutSets = ["8 reps", "300lbs", "3 sets"]
  // const data = await createWorkout(workoutName,workoutType,workoutDate,workoutTime,workoutDuration,workoutNotes,workoutSets);

  const data = await makeWorkout(workoutName,workoutType,workoutDate,workoutTime,workoutDuration,workoutNotes,workoutSets, workoutReps, workoutWeights);
  expect(data).toBe(true)
})