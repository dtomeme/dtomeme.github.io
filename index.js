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
  console.log(gson.length);
  let check = false;
  for(var i=0; i<gson.length; i++) {
    var row_data = gson[i];
    var row_html = row_data["formResponse"];
    var path = extractValue(row_html, "path");
    var question = extractValue(row_html, "question");
    var answer1 = extractValue(row_html, "answer1");
    const url = window.location.href;
    if (url.includes(path)) {
      check = true;
    }
    console.log("url:", url);
    console.log("path:", path);
    console.log("question:", question);
    console.log("answer1:", answer1);
  }
}
