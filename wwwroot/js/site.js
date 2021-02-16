//Adds next question for user to fill out upon clicking Add Question button:

let questionCounter = 0;

function addNewQuestion() {
    //change innerHTML of element with id questionType_Menu to <p> with selected type

    questionCounter++;

    let addQuestionNode = document.createElement("div");
    addQuestionNode.id = `q${questionCounter}`;

    addQuestionNode.innerHTML = `<h3>Question ${questionCounter}</h3>
    <div id="questionType${questionCounter}Menu">
        <label for="questionType${questionCounter}">Type:</label>
        <select name="questionType${questionCounter}" id="questionType${questionCounter}" onchange="populate(this.id)">
            <option value="${questionCounter}">Select One</option>
            <option value="trueFalse${questionCounter}">True/False</option>
            <option value="multipleChoice${questionCounter}">Multiple Choice</option>
            <option value="textInput${questionCounter}">Text Input</option>
        </select>
    </div><br>
    <div>
        <label for="prompt${questionCounter}">Prompt:</label>
        <input type="text" id="prompt${questionCounter}" name="prompt${questionCounter}">
    </div><br>
    <div>
      <label for="imageLink${questionCounter}">Add Link to Image (optional):</label>
      <input type="text" id="imageLink${questionCounter}" name="imageLink${questionCounter}">
    </div>
    <div id="restOfQuestion${questionCounter}">
    </div>`;

    document.getElementById("questionsSection").appendChild(addQuestionNode);
}

//Populates rest of question once user selects type from dropdown:

function populate(s1) {
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(`restOfQuestion${questionCounter}`);

    if (s1.value == `trueFalse${questionCounter}`) {
        s2.innerHTML = `<label for='trueFalse${questionCounter}'>Correct Answer:</label>
            <select name='trueFalse${questionCounter}' id="trueFalse${questionCounter}">
             <option value="${questionCounter}">Select One</option>
              <option value="true${questionCounter}">True</option>
              <option value="false${questionCounter}">False</option>
            </select>`;
    }
    else if (s1.value == `multipleChoice${questionCounter}`) {
        s2.innerHTML = `<p>Choices:</p>
            <label for="a${questionCounter}">A</label>
            <input type="text" id="a${questionCounter}" name="a${questionCounter}">
            <label for="b${questionCounter}">B</label>
            <input type="text" id="b${questionCounter}" name="b${questionCounter}">
            <label for="c${questionCounter}">C</label>
            <input type="text" id="c${questionCounter}" name="c${questionCounter}">
            <label for="d${questionCounter}">D</label>
            <input type="text" id="d${questionCounter}" name="d${questionCounter}">
            <label for="e${questionCounter}">E</label>
            <input type="text" id="e${questionCounter}" name="e${questionCounter}"><br>
            <label for="mulChoiceCorrect${questionCounter}">Correct Answer:</label>
            <select name="mulChoiceCorrect${questionCounter}" id="mulChoiceCorrect${questionCounter}">
              <option value="correct${questionCounter}">Select One</option>
              <option value="aCorrect${questionCounter}">A</option>
              <option value="bCorrect${questionCounter}">B</option>
              <option value="cCorrect${questionCounter}">C</option>
              <option value="dCorrect${questionCounter}">D</option>
              <option value="eCorrect${questionCounter}">E</option>
            </select>`;
    }
    else if (s1.value == `textInput${questionCounter}`) {
        s2.innerHTML = `<label for="input${questionCounter}">Correct Answer:</label>
            <input type="text" id="input${questionCounter}" name="input${questionCounter}">`;
    }
}

//Prevents form from sending upon click on Add Question button

window.onload = (event) => {
    document.getElementById("addQuestion").addEventListener("click", (ev) => {
        ev.preventDefault();
        addNewQuestion();
    });
};