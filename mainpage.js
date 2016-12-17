var bullying = [
    {
        question: "How many deaths per year does bullying cause?",
        choices: [100, 1500, 6000, 4440],
        answer: 4440
    }, 
    {
        question: "How frequent is bullying?",
        choices: [
            "1 in 20 people",
            "1 in 10 people",
            "1 in 6 people",
            "1 in 4 people"
        ],
        answer: "1 in 4 people"
    }, 
    {
        question: "Which form of bullying is most common?",
        choices: [
            "Cyber bullying",
            "In person bullying"
        ],
        answer: "In person bullying"
    
    } 
];

var feminism = [
    {
        question: "For every dollar (100 cents) men make, women make",
        choices: [
            "Twice as much",
            "78 cents",
            "90 cents",
            "50 cents"
        ],
        answer: "78 cents"
    }, 
    {
        question: "Who is credited with starting the feminist movement?",
        choices: [
            "Hillary Clinton",
            "Elizabeth Cady Stanton",
            "Margaret Fuller",
            "Jacqueline Kennedy"
        ],
        answer: "Margaret Fuller"
    },
    {
        question: "How many women consider themselves feminist?",
        choices: [
            "60%",
            "30%",
            "55%",
            "20%"
    
        ],
        answer: "20%"
    }
];

var HIV = [
    {
        question: "How many people live with HIV?",
        choices: [
            "1 in 8",
            "1 in 5",
            "1 in 10",
            "1 in 2"
        ],
        answer: "1 in 8"
    },
    {
        question: "Which race is most affected by HIV/AIDS?",
        choices: [
        "African Americans",
        "Hispanic/Latinos",
        "Asians",
        "Caucasian",
        ],
        answer: "African Americans"
    
    },
    {
        question: "How many people are not aware of their HIV status?",
        choices: [
            "40%",
            "50%",
            "90%",
            "20%"
            ],
        answer: "40%"
    }
    
];

var domesticAbuse =[
    {
        question: "How many people are physically abused per minute?", 
        choices: ["10", "20", "60", "5"],
        answer: "20"
    },
    
    {
        question: "What age is abuse most common in?",
        choices: ["10-16", "18-24", "30-38", "50-60"],
        answer: "18-24",
    },
    
];

var immigration = [
    {
        question: "What country provides the US with the greatest number of immigrants?",
        choices: ["Mexico", "Ireland", "Alaska", "Denmark",],
        answer: "Mexico",
    
    },
    
    {
        question: "What president has deported the most immigrants?",
        choices: ["Clinton", "Eisenhower", "Kennedy", "Obama"],
        answer: "Obama",
    },
];


var educationalInequality = [
    {
        question: "Is public school a better option for academic diversity?",
        choices: ["Yes", "No",],
        answer: "No",
    }
    
];



var counter = 0;
var currentCategory = bullying;
var currentAnswer = null;

function getQuestions(category) {
    counter = 0;
    currentCategory = category;
    currentAnswer = null;
    $("#choices").empty();
    getQuestion(category, counter);
}

function getQuestion(category, i) {
    var question = category[i].question;
    $("#question").text(question);

    var choices = category[i].choices;
    $.each(choices, function(i, choice) {
        $("#choices").append("<li id='choice" + i + "'>" + choice + "</li>");
    
        var choiceSelector = "#choice" + i;
        $(choiceSelector).click(function() { 
            selectAnswer(choice); 
            $( "li" ).removeClass( "selected" );
            $(this).addClass( "selected" );
        });
    })
}

function selectAnswer(answer) {
    currentAnswer = answer;
}

function submitAnswer(category) {
    if (currentAnswer === category[counter].answer) {
        var score = $("#score").text();
        score = score + 2;
        $("#score").text(score);
        
        counter++;
        $("#choices").empty();
        getQuestion(category, counter);
    } else {
        $( "li.selected" ).addClass( "wrong" );
        setTimeout(function() {
            $( "li" ).removeClass( "wrong selected" );
        }, 500)
    }
}

var names = [{
    name: "Kevin",
    score: 30
}, {
    name: "Ken",
    score: 28
}, {
    name: "Melissa",
    score: 22
}, {
    name: "Candy",
    score: 18
}, {
    name: "Daniella",
    score: 15
}];

$(document).ready(function() {
    // Get first question
     $.each(names, function(index, name) {
        $("#order").append("<li>" + name.name + ": " + name.score + "</li>");
    
    });
    
    getQuestions(currentCategory);
    
    $("#category1").click(function () { 
        getQuestions(HIV);  
    })
    
    $("#category2").click(function () { 
        getQuestions(bullying);  
    })
    
    $("#category3").click(function () { 
        getQuestions(domesticAbuse);  
    })
    
    $("#category4").click(function () { 
        getQuestions(feminism);  
    })
    
    $("#category5").click( function () { 
        getQuestions(educationalInequality);  
    })
    
    $("#category6").click(function () { 
        getQuestions(immigration);  
    })
    
    $("#submit").click(function () {
        submitAnswer(currentCategory, currentAnswer)
    })
    
    sendMessage();
})

function getScores() {
    $.get("https://infinite-stream-52054.herokuapp.com/contacts", function(names) {
    });
}

var users = ["@cruiz18", "@mmmc", "@dgonza", "@kenp"];

function sendMessage(){
    $("#sendButton").click(function(){
        var text = $("#Textarea").val();
        var randomUser = Math.floor(users.length * Math.random());
        $("#feed").append("<p>" + users[randomUser] + " " +  text + "</p>");
        alert("Thank you for your positive message, our fellow lovely.")

    });
}