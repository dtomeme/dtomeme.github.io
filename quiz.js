const quizForm = document.getElementById("quiz-form");
const questionElement = document.getElementById("question");
const answer1Label = document.getElementById("answer1-label");
const answer2Label = document.getElementById("answer2-label");
const answer3Label = document.getElementById("answer3-label");

quizForm.addEventListener("submit", event => {
  event.preventDefault();
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    alert("Please select an answer");
    return;
  }
  const selectedAnswerIndex = selectedAnswer.id.slice(-1);
  if (selectedAnswerIndex === correctAnswer) {
    alert("Correct!");
  } else {
    alert("Incorrect");
  }
});

gapi.client.init({
  apiKey: "API_KEY",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
}).then(() => {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: "SPREADSHEET_ID",
    range: "Sheet1!A1:E1"
  }).then(response => {
    const values = response.result.values;
    if (!values || !values.length) {
      console.log("No data found.");
      return;
    }
    const [question, answer1, answer2, answer3, correctAnswer] = values[0];
    questionElement.textContent = question;
    answer1Label.textContent = answer1;
    answer2Label.textContent = answer2;
    answer3Label.textContent = answer3;
    window.correctAnswer = correctAnswer;
  });
});
