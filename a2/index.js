var papaparse_script = document.createElement("script");
papaparse_script.type = "text/javascript";
papaparse_script.src = "https://cdn.jsdelivr.net/npm/papaparse@5.3.2/papaparse.min.js";
document.body.appendChild(papaparse_script);

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
  if (Number.isInteger("1")) {
    console.log("true");
  }
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
    path = row_html.substring(row_html.indexOf("path:")+7,row_html.indexOf("path:")+9);
    question = row_html.substring(row_html.indexOf("question:")+11,row_html.indexOf("question:")+13);
    mess = row_html.substring(row_html.indexOf("mess:")+7,row_html.indexOf("mess:")+9);
    picture = row_html.substring(row_html.indexOf("picture:")+10,row_html.indexOf("picture:")+12);
    answer1 = row_html.substring(row_html.indexOf("answer1:")+10,row_html.indexOf("answer1:")+12);
    answer2 = row_html.substring(row_html.indexOf("answer2:")+10,row_html.indexOf("answer2:")+12);
    answer3 = row_html.substring(row_html.indexOf("answer3:")+10,row_html.indexOf("answer3:")+12);
    correctAnswer = row_html.substring(row_html.indexOf("correctAnswer:")+16,row_html.indexOf("correctAnswer:")+18);
    console.log(path);
    console.log(answer1);
    console.log(picture);
    console.log(correctAnswer);
    if (url.includes(path)) {
      var el = document.getElementById('content');
      var content = `<main class="container"><div class="heart-1 heart"></div><div class="heart-2 heart"></div><div class="heart-3 heart"></div><div class="heart-4 heart"></div><div class="heart-5 heart"></div><div class="heart-6 heart"></div><div class="heart-7 heart"></div></main><h1>Valentine's Day Quiz</h1><form id="quiz-form"><div id="question"></div><div><input type="radio" id="answer1" name="answer"><label for="answer1" id="answer1-label"></label></div><div><input type="radio" id="answer2" name="answer"><label for="answer2" id="answer2-label"></label></div><div><input type="radio" id="answer3" name="answer"><label for="answer3" id="answer3-label"></label></div><button type="submit">Submit</button></form>`;
      el.innerHTML = content;
      document.getElementById('question').innerHTML = question;
      document.getElementById('answer1').innerHTML = answer1;
      document.getElementById('answer2').innerHTML = answer2;
      document.getElementById('answer3').innerHTML = answer3;
    }
    console.log("url:", url);
    console.log("path:", path);
    console.log("question:", question);
    console.log("answer1:", answer1);
  }
}
