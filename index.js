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
  let regex = new RegExp(`${key}:\\n([\\s\\S]+?)\\n`, "i");
  let match = string.match(regex);
  return match ? match[1].trim() : null;
};

var renderData = function(gson) {
  const url = window.location.href;
  let check = false;
  for(var i=gson.length-1; i >= 0; i--) {
    let row_data = gson[i];
    let row_html = row_data["formResponse"];
    console.log(i + ": " + row_html);
    let path = extractValue(row_html, "path");
    let question = extractValue(row_html, "question");
    let answer1 = extractValue(row_html, "answer1");
    /*if (url.includes(path)) {
      check = true;
    }*/
    console.log("url:", url);
    console.log("path:", path);
    console.log("question:", question);
    console.log("answer1:", answer1);
  }
    console.log("row_html:",gson[1]["formResponse"]);
    console.log("path2:", extractValue(gson[1]["formResponse"], "path"));
    console.log("question2:", extractValue(gson[1]["formResponse"], "question"));
    console.log("answer12:", extractValue(gson[1]["formResponse"], "answer1"));
}
