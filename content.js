function startAnimation() {
  for (i = 10; i != 0; i--) {
    for (m of document.getElementsByClassName("start-button")) {
      m.click();
    }
  }
}

function activateDoubleSpeed() {
  const doublespeed = Array.from(
    document.querySelectorAll('input[type="checkbox"]'),
  ).filter((checkbox) => {
    const labelId = checkbox.getAttribute("aria-labelledby");
    const label = labelId ? document.getElementById(labelId) : null;
    return label && label.textContent.trim() === "2x speed";
  });
  for (button of doubleSpeed) {
    button.click();
  }
}
function solveAnimation() {
  //starting the animation
  activateDoubleSpeed();
  startAnimation();
  setInterval(function () {
    if (document.getElementsByClassName("start-button").length > 0) {
      for (s of document.getElementsByClassName("start-button")) {
        s.click();
      }
    } else console.log("Looks like we started all animations");

    if (document.getElementsByClassName("play-button").length > 0) {
      for (x of document.getElementsByClassName("play-button")) {
        x.click();
      }
    } else console.log("Play isn't found");
  }, 3000);
}

function solveMultipleChoice() {
  for (radio of document.querySelectorAll("input[type=radio]")) {
    radio.click();
  }
}

function solveShortAnswer() {
  for (var x = 3; x > 0; x--) {
    for (m of document.getElementsByClassName("show-answer-button")) {
      m.click();
    }
  }

  answers = document.getElementsByClassName("forfeit-answer");

  while (answers.length === 0) {
    for (m of document.getElementsByClassName("show-answer-button")) {
      m.click();
    }
    answers = document.getElementsByClassName("forfeit-answer");
  }
  console.log(answers);

  textBoxes = document.getElementsByClassName("zb-text-area");

  //copying answers to textBoxes
  for (var i = 0; i < answers.length; i++) {
    textBoxes[i].value = answers[i].innerText;
  }
}

function solveAll() {
  solveAnimation();
  solveMultipleChoice();
}

// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.message) {
    case "solveAll":
      solveAll();
      console.log("got message:" + request.message);
      break;
    case "solveAnimation":
      solveAnimation();
      break;
    case "solveMC":
      solveMultipleChoice();
      break;
    case "solveSA":
      solveShortAnswer();
      break;
    default:
      console.log("Caught unknown message: " + request.message);
  }
});

console.info("AutoZy Loaded");
