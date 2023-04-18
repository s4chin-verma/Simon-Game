// Define button colours and game variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChoosenColoursPattern = [];
var level = 0;
var started = false;

// Detect button clicks from user and store their choice
$(".butn").click(function (event) {
    var userColor = $(this).attr("id");
    userChoosenColoursPattern.push(userColor);
    play_sound(userColor);
    animatePress(userColor);
    checkAnswer(userChoosenColoursPattern);
});

// Detect when user starts the game and begin the first level
$(document).keydown(function () {
    if (!started) {
        $("h1").html("Level " + level);
        nextSequence();
        started = true;
    }
});

// Generate the next sequence of colours for the user to guess
function nextSequence() {
    userChoosenColoursPattern = []; // Clear the user's choices for the next level
    level++;
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColours);
    $("#" + randomChoosenColours).fadeOut(100, function () {
        $("#" + randomChoosenColours).fadeIn(1000);
    });
    play_sound(randomChoosenColours);
}

// Play the sound corresponding to a particular colour
function play_sound(Name) {
    var audio = new Audio("sounds/" + Name + ".mp3");
    audio.play();
}

// Animate the button press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Check the user's answer against the game pattern
function checkAnswer() {
    // Loop through each choice the user made
    for (var i = 0; i < userChoosenColoursPattern.length; i++) {
        // If the user's choice doesn't match the game's pattern, restart the game
        if (userChoosenColoursPattern[i] !== gamePattern[i]) {
            restart();
            return;
        }
    }

    // If the user correctly guesses the entire game pattern, generate the next sequence
    if (userChoosenColoursPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}

// Restart the game when the user fails to guess the correct pattern
function restart() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userChoosenColoursPattern = [];
    level = 0;
    started = false;
}
