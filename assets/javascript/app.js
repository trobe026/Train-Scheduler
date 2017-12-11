$( window ).on('load', function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCtS_aXBzOkMAnX94mlpNfhXwtZXGRdQf4",
    authDomain: "train-scheduler-d0f6e.firebaseapp.com",
    databaseURL: "https://train-scheduler-d0f6e.firebaseio.com",
    projectId: "train-scheduler-d0f6e",
    storageBucket: "train-scheduler-d0f6e.appspot.com",
    messagingSenderId: "620291073146"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    // , "DD/MM/YY").format("X")
    var freq = $("#freq-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: dest,
      firstTrainTime: trainTime,
      frequency: freq
    };

    // Uploads employee data to the database
    database.ref("trainList").push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);

    // Alert
    // alert("Train successfully added");

    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");

  });

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref("trainList").on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().firstTrainTime;
    var freq = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(dest);
    console.log(trainTime);
    console.log(freq);

    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    // var tFrequency = 3;

    // Time is 3:30 AM
    // var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

    // Prettify the employee start
    // var trainTimePretty = moment.unix(trainTime).format("MM/DD/YY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment.unix(trainTime, "X"), "months");
    // console.log(empMonths);
    //
    // // Calculate the total billed rate
    // var empBilled = empMonths * freq;
    // console.log(empBilled);

    // Add each train's data into the table
    $("#data > tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use mets this test case







// window load end
});
