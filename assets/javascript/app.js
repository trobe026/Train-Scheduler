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

  var ref = firebase.database().ref();

  $("#addTrain").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var freq = $("#freq-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: dest,
      firstTrainTime: trainTime,
      frequency: freq
    };

    // Uploads newTrain to the database
    ref.push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#train-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");

  });

  // 3. Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
  ref.on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().firstTrainTime;
    var freq = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(dest);
    console.log(trainTime);
    console.log(freq);

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


    // Add each train's data into the table
    $("#data > tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

    // remove and edit buttons and logic
    var row = $("#data > tbody > tr:last-child");
  $(row).each(function() {
    console.log(this);
    var buttons = this;
    $(buttons).append(
              $(document.createElement('button'))
                  .addClass('remove btn-danger')
                  .text('Remove')
                  .click(function() {
                    // $(row).remove();
                    // $(ref.child).remove();
                    // $(ref.child(trainList)).remove();
                    // $(dest).remove();
                    // $(freq).remove();
                    // var firebaseData = ref.getInstance();
                    $(childSnapshot.val()).removeValue();
                    // console.log(firebaseData);
                    // console.log(child.val());
                    console.log(ref.val());
                    })
            )
            .append(
                $(document.createElement('button'))
                    .addClass('edit btn-primary')
                    .text('Edit')
                    .click(function() {
                      $(row)
                        // edit functions to be added here...
                    })
                  )
          });
  });

// window load end
});
