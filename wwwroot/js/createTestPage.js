
const qSectionId = "questionsSection";
const addQuestionBtnId = "createTestFormAddQuestion";
const submitTestBtnId = "submit";



const buildH3Str = text => {
    return `<h3 class="questionNums">${text}</h3>`
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
    const questions = window.createTestPage.testQuestions.filter(id => id !== qId);
    window.createTestPage.testQuestions = questions;
    document.getElementById(`qdiv-${qId}`).remove();
    updateDisplayNum();
}

function updateDisplayNum() {
    const questionNums = document.getElementsByClassName("questionNums");
    for (let i = 0; i < questionNums.length; i++) {
        questionNums[i].innerHTML = i + 1;
    }
}


const saveNewTestRecord = (data) => {
    fetch("http://localhost:5001/test/ProcessAddTestForm", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        redirect: 'follow'
    }).then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    }).catch(error => {
        console.error(error);
    });
}

const isValid = (value, minLength = null, maxLength = null) => {
    let isValid = true;
    if (value === "") {
        isValid = false;
    }
    if (minLength || maxLength) {
        if (value.length < minLength || value.length > maxLength) {
            isValid = false;
        }
    }
    return isValid;
}

const compileNewTestData = () => {
    const testName = document.getElementById('testName').value;
    const description = document.getElementById('testDescription').value;
    const questions = window.createTestPage.testQuestions;
    
    

    const validationErrors = [];
    // For any value that is invalid, push an object to this array during this process
    /// an object with the fields defined below: the id of the html element, and a message to be appended to said element
    /// { htmlId: "", errorMsg: "" }

    if (!isValid(testName, 3, 50)) {
        validationErrors.push({
            htmlId: `testName`,
            errorMsg: "  Please provide a test name that is between 3 and 50 characters."
        });
    }

    if (!isValid(description, 5, 50)) {
        validationErrors.push({
            htmlId: `testDescription`,
            errorMsg: "  Please provide a description that is between 5 and 50 characters."
        });
    }

    if (!isValid(questions, 1, 100)) {
        validationErrors.push({
            htmlId: `questionsSection`,
            errorMsg: "  Please provide 1-100 questions."
        });
    }

    const newTest = {
        "NameOfTest": testName,
        "Description": description,
        "Questions": []
    }

    //loop through all questions of form
    //const questions = window.createTestPage.testQuestions; //moved up to use it for validation


    for (let qId of questions) {
        const type = document.getElementById(`type-${qId}`).value;

        if (type === "") {
            validationErrors.push({
                htmlId: `type-${qId}`,
                errorMsg: "Please select a type for this question"
            });
        }

        if (type === "Free Text") {
            let qAnswer = document.getElementById(`input${qId}`).value;

            if (!isValid(qAnswer, 1, 50)) {
                validationErrors.push({
                    htmlId: `qAnswer-${qId}`,
                    errorMsg: "Please provide an answer for this question that is between 1-50 characters"
                })
            }
        }
        

        const newQuestion = {
            "Prompt": document.getElementById(`prompt-${qId}`).value,
            "Type": type,
        }


        const imgUrl = document.getElementById(`imageLink-${qId}`).value
        const imgUrlValid = window.utilFunctions.validURL(imgUrl)

        if (!imgUrlValid && imgUrl != "") { //only requires it if the ImgUrl isn't blank
            validationErrors.push({
                htmlId: `imageLink-${qId}`,
                errorMsg: "Please provide a valid URL"
            });
        }

        if (imgUrl !== "" && imgUrlValid) {
            newQuestion["ImgRelatedToPrompt"] = imgUrl;
        }

        let answer;
        let options = null;

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

const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const submitTest = (ev) => {
    //clear off any existing span elements appended to inputs from previous invalid submitTest calls
    var spans = document.getElementsByTagName('span');
    for (let span of spans) {
        span.innerHTML = "";
    }


    const newTestJson = compileNewTestData();

    const { validationErrors } = newTestJson;

    if (validationErrors) {
        for (let e of validationErrors) {
            console.log(validationErrors);
            var inputNode = document.getElementById(e["htmlId"]);
            var spanTag = document.createElement("span");
            spanTag.style = "color: red";
            spanTag.innerHTML = e["errorMsg"];
            inputNode.parentNode.insertBefore(spanTag, inputNode.nextSibling);
        }
    } else {
        saveNewTestRecord(newTestJson);
    }
}

const createTestPageLoad = () => {
    window.onload = (ev) => {
        const addQuestionButton = document.getElementById(addQuestionBtnId);
        const submitTestButton = document.getElementById(submitTestBtnId);

        if (addQuestionButton !== null) {
            addQuestionButton.addEventListener("click", (ev) => {
                ev.preventDefault();
                addNewQuestion();
            });
        }
        if (submitTestButton !== null) {
            submitTestButton.addEventListener("click", (ev) => {
                ev.preventDefault();
                submitTest();
            });
        }
        
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