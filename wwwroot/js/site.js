function populate(s1, s2) {
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    s2.innerHTML = "";

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
}