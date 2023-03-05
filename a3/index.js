function bodyLoad() {
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
}

var renderData = function(gson) {
  const url = window.location.href;
  let path = "";
  let mess = "";
  let picture = "";
  let question = "";
  let answer1 = "";
  let answer2 = "";
  let answer3 = "";
  let correctAnswer = "";
  for(var k=0; k<gson.length; k++) {
    const vars = ["path","mess","picture","question","answer1","answer2","answer3","correct-answer","Submitted"];
    let i = 1;
    let values = new Array(8);
    let row_data = gson[k];
    let row_html = row_data["formResponse"];
    console.log(row_html);
    values[0] = row_html.substring(row_html.indexOf(vars[0])+6,row_html.indexOf(vars[0])+8);
    if (isNaN(values[0].charAt(0))) {
      i = 0;
    }
    for (var j = 0; j < 8; j++) {
      if (j == 7) {
        values[j] = row_html.substring(row_html.indexOf(vars[j])+vars[j].length+2+i,row_html.indexOf(vars[j])+vars[j].length+3+i);
      }
      else {
        values[j] = row_html.substring(row_html.indexOf(vars[j])+vars[j].length+2+i,row_html.indexOf(vars[j+1])-i-3);
      }
    }
    console.log("url:", url);
    for (var l = 0; l < 8; l++) {
      console.log(values[l]);
    }
    path = values[0].substring(0,2);
    mess = values[1];
    picture = values[2];
    question = values[3];
    answer1 = values[4];
    answer2 = values[5];
    answer3 = values[6];
    correctAnswer = values[7];
    if (url.includes(path)) {
      var el = document.getElementById('content');
      var content = `<main class="container"><div class="heart-1 heart"></div><div class="heart-2 heart"></div><div class="heart-3 heart"></div><div class="heart-4 heart"></div><div class="heart-5 heart"></div><div class="heart-6 heart"></div><div class="heart-7 heart"></div></main><h1>8 - 3 Quiz</h1><div id="question" style="font-size:200%;"><b>` + question + `</b></div><div><input type="radio" id="answer1" name="answer"><label for="answer1" id="answer1-label">` + answer1 + `</label></div><div><input type="radio" id="answer2" name="answer"><label for="answer2" id="answer2-label">` + answer2 + `</label></div><div><input type="radio" id="answer3" name="answer"><label for="answer3" id="answer3-label">` + answer3 + `</label></div><div><input type="text" id="correct-answer" value="` + correctAnswer + `" hidden /></div><div><input type="text" id="picture" value="` + picture + `" hidden /></div><div><input type="text" id="mess" value="` + mess + `" hidden /></div><button type="submit" onclick="checkSelect()">Submit</button>`;
      el.innerHTML = content;
    }
    else {
      console.log("abc");
    }
  }
}

function checkSelect() {
  for (var a = 1; a < 4; a++) {
        if (document.getElementById("answer"+a).checked && document.getElementById("correct-answer").value == ""+a) {
            var mess = document.getElementById('mess').value;
            var picture = document.getElementById('picture').value;
            var el = document.getElementById('content');
            var content = `<main class="container">
      <div class="heart-1 heart"></div>
      <div class="heart-2 heart"></div>
      <div class="heart-3 heart"></div>
      <div class="heart-4 heart"></div>
    </main>
    <div class="wrapper">
      <div class="centered">` + mess + `</div>
      <img src="` + picture + `"/>
      <div id="left-door" class="door">
      </div>
      <div id="right-door" class="door">
      </div>
    </div>
  <main class="container">
      <div class="heart-1 heart"></div>
      <div class="heart-2 heart"></div>
      <div class="heart-3 heart"></div>
      <div class="heart-4 heart"></div>
    </main>`;
            el.innerHTML = content;
            var theme = document.getElementsByTagName('link')[0];
            theme.setAttribute('href', 'style2.css');
        }
  }
}
