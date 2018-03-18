var operators = ['+', '-', '/', '*'];
var expression = '';
var digit_limit = 13;
var numDigits = 0;

$(document).ready(function() {
    initApp();
});

function initApp() {
    var one = document.getElementById("one");
    var two = document.getElementById("two");
    var three = document.getElementById("three");
    var four = document.getElementById("four");
    var five = document.getElementById("five");
    var six = document.getElementById("six");
    var seven = document.getElementById("seven");
    var eight = document.getElementById("eight");
    var nine = document.getElementById("nine");
    var zero = document.getElementById("zero");
    var point = document.getElementById("point");

    var plus = document.getElementById("plus");
    var minus = document.getElementById("minus");
    var divide = document.getElementById("divide");
    var multiply = document.getElementById("multiply");

    var equals = document.getElementById("equals");

    var ac = document.getElementById("ac");
    var ce = document.getElementById("ce");

    one.onclick = displayDigit;
    two.onclick = displayDigit;
    three.onclick = displayDigit;
    four.onclick = displayDigit;
    five.onclick = displayDigit;
    six.onclick = displayDigit;
    seven.onclick = displayDigit;
    eight.onclick = displayDigit;
    nine.onclick = displayDigit;
    zero.onclick = displayDigit;
    point.onclick = displayDigit;

    plus.onclick = displayArithmetic;
    minus.onclick = displayArithmetic;
    divide.onclick = displayArithmetic;
    multiply.onclick = displayArithmetic;

    equals.onclick = displayAnswer;

    ac.onclick = clearAll;
    ce.onclick = clearEntry;
}

function clearAll(event) {
    $("#top-line p").text("0");
    $("#bottom-line p").text("0");
    expression = '';
}

function clearEntry(event) {
    var lastOperatorIndex = -1;
    $("#top-line p").text("0");
    var bottomLine = $("#bottom-line p").text();

    for (var i = 0; i < operators.length; i++) {
        if (bottomLine.lastIndexOf(operators[i]) > lastOperatorIndex) {
            lastOperatorIndex = bottomLine.lastIndexOf(operators[i]);
        }
    }
    if (lastOperatorIndex === -1) {
        $("#bottom-line p").text("0");
        expression = '';
    }
    else {
        $("#bottom-line p").text(bottomLine.substring(0, lastOperatorIndex));
        expression = expression.substring(0, lastOperatorIndex);
    }
}

function displayDigit(event) {
    var target = event.target || event.srcElement;
    var targetId = target.id;

    var selector = "#" + targetId;

    var digit = $(selector).text();

    // get last char of top line display
    var top = $("#top-line p").text();
    var bottomLineLength = $("#bottom-line p").text().length;

    var lastCharTop = top.charAt(--top.length);
    var topLineLength = top.length;

    if (topLineLength >= 12 || bottomLineLength >= 22) {
        $("#top-line p").text("0");
        $("#bottom-line p").text("Digit Limit Met");
    }
    else if ($("#top-line p").text() === "0") {
        $("#top-line p").text(digit);
        $("#bottom-line p").text(digit);
        expression += digit;
    }
    else if (lastCharTop === "+" || lastCharTop === "-" || lastCharTop === "\u00f7" || lastCharTop === "\u00d7") {
        $("#top-line p").text(digit);
        $("#bottom-line p").text($("#bottom-line p").text() + digit);
        expression += digit;
    }
    else {
        $("#top-line p").text($("#top-line p").text() + digit);
        $("#bottom-line p").text($("#bottom-line p").text() + digit);
        expression += digit;
    }
}

function displayArithmetic(event) {
    var target = event.target || event.srcElement;
    var targetId = target.id;

    var selector = "#" + targetId;

    var operation = $(selector).text();
    var displayOperation;

    if (operation === "\u00f7") {
        operation = '/';
        displayOperation = "\u00f7";
    } else if (operation === "\u00d7") {
        operation = '*';
        displayOperation = "\u00d7";
    } else if (operation === "+") {
        displayOperation = operation;
    } else if (operation === "-") {
        displayOperation = operation;
    }

    // get last char of bottom line display
    var bottom = $("#bottom-line p").text();
    var lastCharBtm = bottom.charAt(--bottom.length);
    
    // get last char of top line display
    var top = $("#top-line p").text();
    var lastCharTop = top.charAt(--top.length);

    if (lastCharBtm !== "+" && lastCharBtm !== "-" && lastCharBtm !== "\u00f7" && lastCharBtm !== "\u00d7" && bottom.indexOf('=') === -1) {
        $("#top-line p").text(displayOperation);
        $("#bottom-line p").text($("#bottom-line p").text() + displayOperation);
        expression = expression + operation;
    }
    else if (lastCharBtm !== "+" && lastCharBtm !== "-" && lastCharBtm !== "\u00f7" && lastCharBtm !== "\u00d7" && bottom.indexOf('=') > 0) {
        $("#top-line p").text(displayOperation);
        var getAnswer = bottom.indexOf('=') + 1;
        $("#bottom-line p").text(bottom.substring(bottom.indexOf('=') + 1) + displayOperation);
        expression = bottom.substring(bottom.indexOf('=') + 1) + operation;
    }
}

function displayAnswer(event) {

    // get equation on bottom line
    var bottom = $("#bottom-line p").text();
    var lastCharBtm = bottom.charAt(--bottom.length);
    var answer = 0;

    if (lastCharBtm !== "+" && lastCharBtm !== "-" && lastCharBtm !== "\u00f7" && lastCharBtm !== "\u00d7") {
        for (var i = 0; i < operators.length; i++) {
            var rg = new RegExp("\\" + operators[i], "g");
            expression = expression.replace(rg, ' ' + operators[i] + ' ');
        }
        answer = math.eval(expression);
        $("#top-line p").text(answer);
        $("#bottom-line p").text($("#bottom-line p").text() + "=" + answer);
    }
}
