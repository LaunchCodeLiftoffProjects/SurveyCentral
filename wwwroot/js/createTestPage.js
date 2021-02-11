//Adds next question for user to fill out upon clicking Add Question button:


const qSectionId = "questionsSection";
const addQuestionBtnId = "createTestFormAddQuestion"


const updateDisplayNum = (qId) => {
    // <!> Unfinished function <!>
    const displayNum = window.window.createTestPage.testQuestions.indexOf(qId);
    // Do some action to set relevant DOM element with that new number
}

const buildH3Str = text => {
    return `<h3>${text}</h3>`
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

const buildSelectOptionStr = (value, text) => {
    return `<option value="${value}">${text}</option>`
}

const deleteQuestion = (qId) => {
    // <!> Will need to remove event listeners from DOM elements before removing <!>
    //$(`type-${qId}`).off();
    //$(`btnRemove-${qId}`).off();
    const questions = window.createTestPage.testQuestions.filter(id => id !== qId);
    window.createTestPage.testQuestions = questions;
    document.getElementById(`qdiv-${qId}`).innerHTML = "";
}

const addNewQuestion = () => {
    const qId = window.utilFunctions.guidGenerator();
    const questions = window.createTestPage.testQuestions
    const qDisplayNum = questions.length + 1
    questions.push(qId);

    const qNode = document.createElement("div");
    qNode.id = `qdiv-${qId}`;


    qNode.append

    qNode.innerHTML = `${buildH3Str(qDisplayNum)} <button class="btn btn-danger" id="btnRemove-${qId}"> X </button>
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
        deleteQuestion(qId)
    });
}

//Populates rest of question once user selects type from dropdown:

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

//Prevents form from sending upon click on Add Question button

const createTestPageLoad = () => {
    window.onload = (event) => {
        document.getElementById(addQuestionBtnId).addEventListener("click", (ev) => {
            ev.preventDefault();
            addNewQuestion();
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