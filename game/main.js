//------------------ Do not remove -----------------//

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcRenderer, ipcMain, fs } = require('electron')
var remote = require('electron').remote;
//var fs = require('fs');
//var electronDialog = remote. //dialog;
const { promisify } = require('util');
//const path = require('path');
//const readFile = promisify(fs.readFile);
ipcMain.handle('lstat', async(event, filename) => await fs.promises.lstat(filename));

//-----Default Settings-------------//

var points = 0
var lives = 3
    //var shuffle = false

//-----------Files-------------//
let topContent = fs.readFile('top.txt')
let bottomAContent = fs.readFile('bottoma.txt')
let bottomQContent = fs.readFile('bottomq.txt')

//------------------ Electron Setup -----------------//

function createMainWindow() {
    const window = new BrowserWindow({
        width: 1000,
        height: 1000,
        name: "Game",
        transparent: false
    })
}

function createQAnswers(questionNum) {
    // Create the browser window.
    const window = new BrowserWindow({
        width: 500,
        height: 500,
        name: "a",
        transparent: true
    })
    const window1 = new BrowserWindow({
        width: 500,
        height: 500,
        name: "b",
        transparent: true
    })
    window.loadFile('q.html')
    window1.loadFile('a.html')
        // Open the DevTools.
        // mainWindow.webContents.openDevTools()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createMainWindow())
    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    /*
    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    */
app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createQAnswers()
    }
})
app.once('ready-to-show', () => {
    app.show()
})


//------------------ Game Setup -----------------//


// Triggers
var correctA = false
exports.correct = () => correctA = true
exports.incorrect = () => correctA = false
exports.next = () => false

function setupQuestions() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple', true)
    request.onload = function() {
            var data = JSON.parse(this.response)
            if (request.status >= 200) {
                console.log(data)
                document.write(data.results[1].question)
            } else {
                console.log('error')
            }
        }
        // Send request
    request.send()
    return data.results
}
var setupMessage = "Called API"
var question = setupQuestions()
var questionNum = -1

game(question, questionNum, lives, points)

function game(question, questionNum, lives, points, correctA) {
    while (lives > 0 || questionNum > 10) {
        fs.writeFile('a.html', topContent + question[questionNum].correct_answer + bottomAContent, function(err) {
            if (err) throw err;
            console.log('Replaced a.html!');
        });

        fs.writeFile('q.html', topContent + question[questionNum].question + bottomAContent, function(err) {
            if (err) throw err;
            console.log('Replaced q.html!');
        });
        //while (correctA === false) {; }
    }
}