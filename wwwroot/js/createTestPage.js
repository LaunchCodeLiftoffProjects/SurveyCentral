
const qSectionId = "questionsSection";
const addQuestionBtnId = "createTestFormAddQuestion";
const submitTestBtnId = "submitTest";

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
            ${buildSelectOptionStr("trueFalse", "True/False")}
            ${buildSelectOptionStr("multipleChoice", "Multiple Choice")}
            ${buildSelectOptionStr("textInput", "Text Input")}
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

    if (type === "trueFalse") {
        qAnswerElement.innerHTML = `<label for='trueFalse${qId}'>Correct Answer:</label>
            <select name='trueFalse${qId}' id="trueFalse${qId}">
             <option value="${qId}">Select One</option>
              <option value="true${qId}">True</option>
              <option value="false${qId}">False</option>
            </select>`;
    } else if (type === "multipleChoice") {
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
              <option value="correct${qId}">Select One</option>
              <option value="aCorrect${qId}">A</option>
              <option value="bCorrect${qId}">B</option>
              <option value="cCorrect${qId}">C</option>
              <option value="dCorrect${qId}">D</option>
              <option value="eCorrect${qId}">E</option>
            </select>`;
    } else if (type === "textInput") {
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
    document.getElementById(`qdiv-${qId}`).innerHTML = "";
}


let questionList = [];
const submitTest (ev) => {

    //loop through all questions of form
    for (i = 0; i++; i < questions.length) {

        let question = {
            "Prompt": document.getElementById(`prompt-${questions[i]}.value`),
            "Type": document.getElementById(`type-${questions[i]}.value`), //does this format work w backend?
            "Image": document.getElementById(`imageLink-${qId}.value`),
            "Answer": document.getElementById(), //how to isolate answer?
            //how to get options for MC?

        }

        questionList.push(question);
    }

    let test = {
        "NameOfTest": document.getElementById('testName'),
        "Description": document.getElementById('testDescription'),
        "Questions": questionList,
    }

    fetch('http://localhost:5001/test/ProcessAddTestForm/', {
        method: 'post',
        body: test
            }).then(function (response) {
            return response.json();
        }).then(function (data) {
            return /* do something with data */
        });

    document.querySelector('form').reset();
}

//*******HTML form input => JS object
//{
//    "NameOfTest": "Mini Quiz",
//        "Description": "A short quiz to test DB connection.",
//            "Questions": [{
                "Prompt": "Is the Earth is the 3rd planet from the sun?",
                "Answer": "True",
                "Type": "True/False"
            },
            {
                "Prompt": "What does API stand for?",
                "Answer": "Application Programming Interface",
                "Type": "Free Text"
            },
            {
                "Prompt": "Which of the following states is the largest?",
                "Type": "Multiple Choice",
                "Options": [{
                    "Value": "A",
                    "Label": "Kansas"
                },
                {
                    "Value": "B",
                    "Label": "Texas"
                },
                {
                    "Value": "C",
                    "Label": "California"
                },
                {
                    "Value": "D",
                    "Label": "Alaska"
                }],
                "Answer": "D"
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
        };
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