// gets a div and prints only that section to avoid printing the buttons
function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

// Erases correct answers, and formats test details for printing or displaying in the Test Details page
function printableTest() {
    document.getElementById("testDates").remove();
    document.getElementById("name").innerHTML = "Name: ________________________________________";

    let answers = document.getElementsByClassName("answers");
    for (let i = 0; i < answers.length; i++) {
        answers[i].innerHTML="";
    }
}

//Print only the answers
function printableKey() {
    let questionsPrompt = document.getElementsByClassName("questionsPromptArea");


    for (let i = 0; i < questionsPrompt.length; i++) {

        questionsPrompt[i].innerHTML = "";
    }
}

//Delete a question while editing a test. NOTE - you'll have to update the local host for your computer
function postDeleteQuestion(questionId) {
    if (window.confirm("Are you sure you want to delete this question?")) {
        fetch('http://localhost:63752/Question/DeleteQuestion/' + questionId,
            {
                method: 'POST'
            }).then(response => {
                console.log(response);
                let questionHTML = document.getElementById(`qform-${questionId}`);
                questionHTML.innerHTML = "";
                location.reload();
            })
            .catch(error => {
                console.error('There has been an issue');
            });
    }
    return;
}


