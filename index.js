var inquirer = require("inquirer");
const cTable = require('console.table');

//switch case with inquirer prompts
function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Find songs by artist",
          "Find all artists who appear more than once",
          "Find data within a specific range",
          "Search for a specific song",
          "Find artists with a top song and top album in the same year"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Find songs by artist":
          artistSearch();
          break;
  
        case "Find all artists who appear more than once":
          multiSearch();
          break;
  
        case "Find data within a specific range":
          rangeSearch();
          break;
  
        case "Search for a specific song":
          songSearch();
          break;
  
        case "Find artists with a top song and top album in the same year":
          songAndAlbumSearch();
          break;
        }
      });
  }
//if they choose x option run this inquirer