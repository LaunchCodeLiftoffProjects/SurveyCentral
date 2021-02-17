// Defining utility functions that would be used in different JavaScript pages


const guidGenerator = () => {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const utilFunctions = {
    guidGenerator
}

window.utilFunctions = utilFunctions;

// Erases correct answers, and formats test details for printing or displaying in the Test Details page
function printableTest(questionsCount) {
    document.getElementById("testDates").remove();
    document.getElementById("name").innerHTML = "Name: ________________________________________";
    let answers = document.getElementsByClassName("answers");
    for (let i = 0; i < questionsCount; i++) {
        answers[i].classList.add('hiddenForPrinting');
    }
}
