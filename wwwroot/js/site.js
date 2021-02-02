//Populates rest of question once user selects type from dropdown:

let questionCounter = 1;

function populate(s1) {
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(`restOfQuestion${questionCounter}`);

    // var restOfQuestionNode = document.createElement("div");
    // s2.appendChild(restOfQuestionNode);

    if (s1.value == "trueFalse") {
        s2.innerHTML = '<label for="trueFalse">Correct Answer:</label>' +
            '<select name="trueFalse" id="trueFalse">' +
            ' <option value="">Select One</option>' +
            '  <option value="true">True</option>' +
            '  <option value="false">False</option>' +
            '</select>';
    }
    else if (s1.value == "multipleChoice") {
        s2.innerHTML = '<p>Choices:</p>' +
            '<label for="a">A</label>' +
            '<input type="text" id="a" name="a">' +
            '<label for="b">B</label>' +
            '<input type="text" id="b" name="b">' +
            '<label for="c">C</label>' +
            '<input type="text" id="c" name="c">' +
            '<label for="d">D</label>' +
            '<input type="text" id="d" name="d">' +
            '<label for="e">E</label>' +
            '<input type="text" id="e" name="e">' + '<br>' +
            '<label for="multipleChoice">Correct Answer:</label>' +
            '<select name="multipleChoice" id="multipleChoice">' +
            '  <option value="">Select One</option>' +
            '  <option value="a">A</option>' +
            '  <option value="b">B</option>' +
            '  <option value="c">C</option>' +
            '  <option value="d">D</option>' +
            '  <option value="e">E</option>' +
            '</select>';
    }
    else if (s1.value == "textInput") {
        s2.innerHTML = '<label for="input">Correct Answer:</label>' +
            '<input type="text" id="input" name="input">';
    }
    console.log(s1.value);
}

//Adds next question for user to fill out upon clicking Add Question button:

function addNewQuestion() {
    questionCounter++;
    console.log(questionCounter);

    let addQuestionNode = document.createElement("div");
    addQuestionNode.id = `q${questionCounter}`;

    addQuestionNode.innerHTML = `<h3>Question ${questionCounter}</h3>
    <div>
        <label for="questionType">Type:</label>
        <select name="questionType" id="questionType" onchange="populate(this.id)">
            <option value="">Select One</option>
            <option value="trueFalse">True/False</option>
            <option value="multipleChoice">Multiple Choice</option>
            <option value="textInput">Text Input</option>
        </select>
    </div><br>
    <div>
        <label for="prompt">Prompt:</label>
        <input type="text" id="prompt" name="prompt">
    </div><br>
    <div>
      <label for="imageLink">Add Link to Image (optional):</label>
      <input type="text" id="imageLink" name="imageLink">
    </div>
    <div id="restOfQuestion${questionCounter}">
    </div>`;

    document.getElementById("questionsSection").appendChild(addQuestionNode);
}

//Prevents form from sending upon click on Add Question button:

window.onload = (event) => {
    document.getElementById("addQuestion").addEventListener("click", (ev) => {
        ev.preventDefault();
        addNewQuestion();
    });
};




//Two-arg version of populate:
// function populate(s1, s2) {
//     var s1 = document.getElementById(s1);
//     var s2 = document.getElementById(s2);
//     s2.innerHTML = "";

//     if (s1.value == "trueFalse") {
//         s2.innerHTML = '<label for="trueFalse">Correct Answer:</label>' +
//             '<select name="trueFalse" id="trueFalse">' +
//             ' <option value="">Select One</option>' +
//             '  <option value="true">True</option>' +
//             '  <option value="false">False</option>' +
//             '</select>';
//     }
//     else if (s1.value == "multipleChoice") {
//         s2.innerHTML = '<p>Choices:</p>' +
//             '<label for="a">A</label>' +
//             '<input type="text" id="a" name="a">' +
//             '<label for="b">B</label>' +
//             '<input type="text" id="b" name="b">' +
//             '<label for="c">C</label>' +
//             '<input type="text" id="c" name="c">' +
//             '<label for="d">D</label>' +
//             '<input type="text" id="d" name="d">' +
//             '<label for="e">E</label>' +
//             '<input type="text" id="e" name="e">' + '<br>' +
//             '<label for="multipleChoice">Correct Answer:</label>' +
//             '<select name="multipleChoice" id="multipleChoice">' +
//             '  <option value="">Select One</option>' +
//             '  <option value="a">A</option>' +
//             '  <option value="b">B</option>' +
//             '  <option value="c">C</option>' +
//             '  <option value="d">D</option>' +
//             '  <option value="e">E</option>' +
//             '</select>';
//     }
//     else if (s1.value == "textInput") {
//         s2.innerHTML = '<label for="input">Correct Answer:</label>' +
//             '<input type="text" id="input" name="input">';
//     }
// }

//Former version of addNewQuestion using innerHTML, not appendChild:
//let newQuestionContent;
// function addNewQuestion() {
//   var questionsSection = document.getElementById('questionsSection');
//   questionsSection.innerHTML += `<div id="question">
//     <h3>Question ${questionCounter}</h3>
//     <!-- <div>
//         <button id="button-edit">Edit</button>
//         <button id="button-delete">Delete</button>
//     </div> -->
//     <div>
//         <label for="questionType">Type:</label>
//         <select name="questionType" id="questionType" onchange="populate(this.id, 'restOfQuestion')">
//             <option value="">Select One</option>
//             <option value="trueFalse">True/False</option>
//             <option value="multipleChoice">Multiple Choice</option>
//             <option value="textInput">Text Input</option>
//         </select>
//     </div><br>
//     <div>
//         <label for="prompt">Prompt:</label>
//         <input type="text" id="prompt" name="prompt">
//         </div><br>
//         <div>
//           <label for="imageLink">Add Link to Image (optional):</label>
//           <input type="text" id="imageLink" name="imageLink">
//         </div>
//         <div id="restOfQuestion">
//         </div>
//       </div>`;
//     questionCounter++;
// }

//dynamic click options:
//document.getElementById("addQuestion").addEventListener("click", function () {
//    var questionsSection = document.getElementById('questionsSection');
//    questionsSection.innerHTML += newQuestionContent;
//});

//document.getElementById("addQuestion").addEventListener("click", addNewQuestion());