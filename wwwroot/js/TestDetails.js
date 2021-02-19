// gets a div and prints only that section to avoid printing the buttons
function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

// Erases correct answers, and formats test details for printing or displaying in the Test Details page
function printableTest(questionsCount) {
    document.getElementById("testDates").remove();
    document.getElementById("name").innerHTML = "Name: ________________________________________";

    let answers = document.getElementsByClassName("answers");
    for (let i = 0; i < questionsCount; i++) {
        answers[i].classList.add('hiddenForPrinting');
    }
}

