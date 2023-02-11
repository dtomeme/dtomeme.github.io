var papaparse_script = document.createElement("script");
papaparse_script.type = "text/javascript";
papaparse_script.src = "https://cdn.jsdelivr.net/npm/papaparse@5.3.2/papaparse.min.js";
document.body.appendChild(papaparse_script)

//fetch the data
var sheet_csv = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSehJHcQEsfNWKn8_SumvGZ-Brnmlyw56iM6koUWFlrbcIH2To5gOTny43TQzbBW0rs78SYFd_8WzAb/pub?output=csv';
fetch(sheet_csv)
  .then(function(response){return response.text();})
  .then(function(data){
    parseData(data)
  });

//parse the data
var parseData = function(data){
  var gson = Papa.parse(data, {header:true}).data;
  renderData(gson);
};

const extractValue = (string, key) => {
  const regex = new RegExp(`${key}:\\n([\\s\\S]+?)\\n`, "i");
  const match = string.match(regex);
  return match ? match[1].trim() : null;
};

var renderData = function(gson) {
  let check = false;
  for(var i=0; i<gson.length; i++) {
    var row_data = gson[i];
    var row_html = row_data["formResponse"];
    const path = extractValue(row_html, "path");
    const question = extractValue(row_html, "question");
    const answer1 = extractValue(row_html, "answer1");
    const url = window.location.href;
    if (url.includes(path)) {
      check = true;
    }
    console.log("url:", url);
    console.log("path:", path);
    console.log("question:", question);
    console.log("answer1:", answer1);
  }
  if (check) {
    var el = document.getElementById('content');
    var content = `<main class="container"><div class="heart-1 heart"></div><div class="heart-2 heart"></div><div class="heart-3 heart"></div><div class="heart-4 heart"></div><div class="heart-5 heart"></div><div class="heart-6 heart"></div><div class="heart-7 heart"></div></main><h1>Valentine's Day Quiz</h1><form id="quiz-form"><div id="question"></div><div><input type="radio" id="answer1" name="answer"><label for="answer1" id="answer1-label"></label></div><div><input type="radio" id="answer2" name="answer"><label for="answer2" id="answer2-label"></label></div><div><input type="radio" id="answer3" name="answer"><label for="answer3" id="answer3-label"></label></div><button type="submit">Submit</button></form>`;
    el.innerHTML = content;
  }
}
