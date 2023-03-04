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

var renderData = function(gson) {
  const url = window.location.href;
  let question = "";
  let answer1 = "";
  let answer2 = "";
  let answer3 = "";
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
        i = i + 2;
      }
      values[j] = row_html.substring(row_html.indexOf(vars[j])+vars[j].length+2+i,row_html.indexOf(vars[j+1])-i-3);
    }
    console.log("url:", url);
    for (var l = 0; l < 8; l++) {
      console.log(values[l]);
    }
    console.log(typeof values[0]);
    question = values[3];
    answer1 = values[4];
    answer2 = values[5];
    answer3 = values[6];
    if (url.includes(values[0])) {
      console.log("def");
    }
    else {
      console.log("abc");
    }
  }
}
