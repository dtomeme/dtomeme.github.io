const quizForm = document.getElementById("quiz-form");
const questionInput = document.getElementById("question");
const answer1Input = document.getElementById("answer1");
const answer2Input = document.getElementById("answer2");
const answer3Input = document.getElementById("answer3");
const correctAnswerInput = document.getElementById("correct-answer");

quizForm.addEventListener("submit", event => {
  event.preventDefault();
  const question = questionInput.value;
  const answer1 = answer1Input.value;
  const answer2 = answer2Input.value;
  const answer3 = answer3Input.value;
  const correctAnswer = correctAnswerInput.value;

  gapi.client.init({
    apiKey: "AIzaSyAphI5rjr4HOM7c3tYupq2k4fpvktBdWtU",
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
  }).then(() => {
    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: "SPREADSHEET_ID",
      range: "Sheet1",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [[question, answer1, answer2, answer3, correctAnswer]]
      }
    }).then(() => {
      console.log("Data written to sheet successfully");
    });
  });
});
