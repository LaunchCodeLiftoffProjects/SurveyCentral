
const qSectionId = "questionsSection";
const addQuestionBtnId = "createTestFormAddQuestion";
const submitTestBtnId = "submit";

const updateDisplayNum = (qId) => {
    // <!> Unfinished function <!>
    const displayNum = window.window.createTestPage.testQuestions.indexOf(qId);
    // Do some action to set relevant DOM element with that new number
}

//Adds additional question to test after upon Add Question button click:

const buildH3Str = text => {
    return `<h3>${text}</h3>`
}
const buildSelectOptionStr = (value, text) => {
    return `<option value="${value}">${text}</option>`
}
const buildTypeSelectStr = qId => {
    return `<label for="type-${qId}">Type:</label>
        <select name="Type" id="type-${qId}">
            <option value="none" selected disabled hidden> 
                Select an Option 
            </option> 
            ${buildSelectOptionStr("True/False", "True/False")}
            ${buildSelectOptionStr("Multiple Choice", "Multiple Choice")}
            ${buildSelectOptionStr("Free Text", "Text Input")}
        </select>`;
}

const addNewQuestion = () => {
    const qId = window.utilFunctions.guidGenerator();
    const questions = window.createTestPage.testQuestions;
    const qDisplayNum = questions.length + 1;
    questions.push(qId);

    const qNode = document.createElement("div");
    qNode.id = `qdiv-${qId}`;

    qNode.innerHTML = `${buildH3Str(qDisplayNum)} <button class="btn btn-danger" id="btnRemove-${qId}"> Delete Question </button>
    <div>
        <label for="type-${qId}">Type:</label>
        ${buildTypeSelectStr(qId)}
    </div><br>
    <div>
        <label for="prompt-${qId}">Prompt:</label>
        <input type="text" id="prompt-${qId}" name="Prompt">
    </div><br>
    <div>
//add validation for proper link
      <label for="imageLink-${qId}">Add Link to Image (optional):</label>
      <input type="text" id="imageLink-${qId}" name="ImgRelatedToPrompt">
    </div>
    <div id="qAnswer-${qId}">
    </div>`;

    document.getElementById(qSectionId).appendChild(qNode);
    document.getElementById(`type-${qId}`).addEventListener("change", ev => populate(qId));
    document.getElementById(`btnRemove-${qId}`).addEventListener("click", ev => {
        ev.preventDefault();
        deleteQuestion(qId);
    });
}

//Populates question type upon user selection:
//***** need to create objects to hold the strings of HTML

const populate = (qId) => {
    const selectedTypeElement = document.getElementById(`type-${qId}`);
    const qAnswerElement = document.getElementById(`qAnswer-${qId}`);
    const type = selectedTypeElement.value;

    if (type === "True/False") {
        qAnswerElement.innerHTML = `<label for='trueFalse${qId}'>Correct Answer:</label>
            <select name='trueFalse${qId}' id="trueFalse${qId}">
             <option disabled>Select One</option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>`;
    } else if (type === "Multiple Choice") {
        qAnswerElement.innerHTML = `<p>Choices:</p>
            <label for="a${qId}">A</label>
            <input type="text" id="a${qId}" name="a${qId}">
            <label for="b${qId}">B</label>
            <input type="text" id="b${qId}" name="b${qId}">
            <label for="c${qId}">C</label>
            <input type="text" id="c${qId}" name="c${qId}">
            <label for="d${qId}">D</label>
            <input type="text" id="d${qId}" name="d${qId}">
            <label for="e${qId}">E</label>
            <input type="text" id="e${qId}" name="e${qId}"><br>
            <label for="mulChoiceCorrect${qId}">Correct Answer:</label>
            <select name="mulChoiceCorrect${qId}" id="mulChoiceCorrect${qId}">
              <option disabled>Select One</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>`;
    } else if (type === "Free Text") {
        qAnswerElement.innerHTML = `<label for="input${qId}">Correct Answer:</label>
            <input type="text" id="input${qId}" name="input${qId}">`;
    }
}

//***delete unwanted previously added question:

const deleteQuestion = (qId) => {
    // <!> Will need to remove event listeners from DOM elements before removing <!>
    //$(`type-${qId}`).off();
    //$(`btnRemove-${qId}`).off();
    const questions = window.createTestPage.testQuestions.filter(id => id !== qId);
    window.createTestPage.testQuestions = questions;
    document.getElementById(`qdiv-${qId}`).remove();
}

const saveNewTestRecord = (json) => {
    fetch('http://localhost:5001/test/ProcessAddTestForm/', {
        method: 'post',
        body: json
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        return /* do something with data */
    });
}

const compileNewTestData = () => {
    const testName = document.getElementById('testName').value;
    const description = document.getElementById('testDescription').value;

    const validationErrors = [];
    // For any value that is invalid, push an object to this array during this process
    /// an object with the fields defined below: the id of the html element, and a message to be appended to said element
    /// { htmlId: "", errorMsg: "" }

    if (testName === "") {
        validationErrors.push({
            htmlId: `testName`,
            errorMsg: "Please provide a test name that is between 3 and 50 characters."
        });
    } else if (testName.length < 3 || testName.length > 50) {
        validationErrors.push({
            htmlId: `testName`,
            errorMsg: "Please provide a test name that is between 3 and 50 characters."
        });
    }

    const newTest = {
        "NameOfTest": testName,
        "Description": description,
        "Questions": []
    }

    //loop through all questions of form
    const questions = window.createTestPage.testQuestions;

    for (let qId of questions) {
        const type = document.getElementById(`type-${qId}`).value;

        if (type === "") {
            validationErrors.push({
                htmlId: `type-${qId}`,
                errorMsg: "Please select a type for this question"
            });
        }


        const newQuestion = {
            "Prompt": document.getElementById(`prompt-${qId}`).value,
            "Type": type,
            "ImgRelatedToPrompt": document.getElementById(`imageLink-${qId}`).value
        }

        let answer;
        let options = null;

        // free text, just grab value fro input
        // if true false, just grab value of select, and then set answer to "True" for true, or "False" for false
        // if multiple-choice, will need to define and grab the options, which will be objects with label and value,
        /// and then the answer is still set on the overall question object with the property "Answer", and the value will be the 
        /// letter value of the correct option (A,B,C,D,E)

        if (type === "True/False") {
            answer = document.getElementById(`trueFalse${qId}`).value;
        } else if (type === "Free Text") {
            answer = document.getElementById(`input${qId}`).value;
        } else if (type === "Multiple Choice") {
            answer = document.getElementById(`mulChoiceCorrect${qId}`).value;

            options = [
                {
                    "Value": "A",
                    "Label": document.getElementById(`a${qId}`).value
                },
                {
                    "Value": "B",
                    "Label": document.getElementById(`b${qId}`).value
                },
                {
                    "Value": "C",
                    "Label": document.getElementById(`c${qId}`).value
                },
                {
                    "Value": "D",
                    "Label": document.getElementById(`d${qId}`).value
                },
                {
                    "Value": "E",
                    "Label": document.getElementById(`e${qId}`).value
                },
            ];
        }


        newQuestion["Answer"] = answer;
        newQuestion["Options"] = options
        newTest["Questions"].push(newQuestion);
    }

    if (validationErrors.length > 0) {
        newTest["validationErrors"] = validationErrors;
    }

    return newTest;
}



const submitTest = (ev) => {
    // function call to clear off any existing span elements appended to inputs from previous invalid submitTest calls
    const newTestJson = compileNewTestData();

    if (newTestJson["validationErrors"]) {
        for (let e of validationErrors) {
            document.getElementById(e["htmlId"].appendChild(`<span>${e["errorMsg"]}</span>`));
        }
    } else {
        saveNewTestRecord(newTestJson);
    }
}

//*******HTML form input => JS object
//{
//    "NameOfTest": "Mini Quiz",
//        "Description": "A short quiz to test DB connection.",
//            "Questions": [{
//"Prompt": "Is the Earth is the 3rd planet from the sun?",
//    "Answer": "True",
//        "Type": "True/False"
//            },
//{
//    "Prompt": "What does API stand for?",
//        "Answer": "Application Programming Interface",
//            "Type": "Free Text"
//},
//{
//    "Prompt": "Which of the following states is the largest?",
//        "Type": "Multiple Choice",
//            "Options": [{
//                "Value": "A",
//                "Label": "Kansas"
//            },
//            {
//                "Value": "B",
//                "Label": "Texas"
//            },
//            {
//                "Value": "C",
//                "Label": "California"
//            },
//            {
//                "Value": "D",
//                "Label": "Alaska"
//            }],
//                "Answer": "D"
//            }]
//}



//Processes Add Question and Save Test; prevents form from sending upon click:

const createTestPageLoad = () => {
    window.onload = (event) => {
        document.getElementById(addQuestionBtnId).addEventListener("click", (ev) => {
            ev.preventDefault();
            addNewQuestion();
        });
        document.getElementById(submitTestBtnId).addEventListener("click", (ev) => {
            ev.preventDefault();
            submitTest();
        });
    };
}

const createTestPage = {
    createTestPageLoad,
    populate,
    addNewQuestion,
    updateDisplayNum,
    testQuestions: []
}

window.createTestPage = createTestPage;
window.createTestPage.createTestPageLoad();