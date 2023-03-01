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

function extractValue(string, key) {
  var regex = new RegExp(`${key}:\\n([\\s\\S]+?)\\n`, "i");
  var match = string.match(regex);
  return match ? match[1].trim() : null;
};

var renderData = function(gson) {
  let check = false;
  let path = "";
  let question = "";
  let answer1 = "";
  let answer2 = "";
  let answer3 = "";
  let correctAnswer = "";
  let mess = "";
  let picture = "";
  const url = window.location.href;
  for(var i=0; i<gson.length; i++) {
    let row_data = gson[i];
    let row_html = row_data["formResponse"];
    let lst = row_html.split(/\r?\ n/);
    console.log("lst " + lst); 
    path = extractValue(row_html, "path");
    question = extractValue(row_html, "question");
    mess = extractValue(row_html, "mess");
    picture = extractValue(row_html, "picture");
    answer1 = extractValue(row_html, "answer1");
    answer2 = extractValue(row_html, "answer2");
    answer3 = extractValue(row_html, "answer3");
    correctAnswer = extractValue(row_html, "correctAnswer");
    for (var j = 0; j < lst.length; j++) {
      if (lst[j].includes("path")) {
        console.log(lst[j]);
        console.log((lst[j+1] ?? 'abc').substring(0,2));
        if (url.includes((lst[j+1].substring(0,2) ?? 'abc'))) {
          console.log("yes");
        }
        else {
          console.log("no");
        }
      }
    }
    if (url.includes(path)) {
      var el = document.getElementById('content');
      var content = `<main class="container"><div class="heart-1 heart"></div><div class="heart-2 heart"></div><div class="heart-3 heart"></div><div class="heart-4 heart"></div><div class="heart-5 heart"></div><div class="heart-6 heart"></div><div class="heart-7 heart"></div></main><h1>Valentine's Day Quiz</h1><form id="quiz-form"><div id="question"></div><div><input type="radio" id="answer1" name="answer"><label for="answer1" id="answer1-label"></label></div><div><input type="radio" id="answer2" name="answer"><label for="answer2" id="answer2-label"></label></div><div><input type="radio" id="answer3" name="answer"><label for="answer3" id="answer3-label"></label></div><button type="submit">Submit</button></form>`;
      el.innerHTML = content;
      document.getElementById('question').innerHTML = question;
      document.getElementById('answer1').value = answer1;
      document.getElementById('answer2').value = answer2;
      document.getElementById('answer3').value = answer3;
    }
    console.log("url:", url);
    console.log("path:", path);
    console.log("question:", question);
    console.log("answer1:", answer1);
  }
}
