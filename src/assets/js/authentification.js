const ipcRenderer = require('electron').ipcRenderer;
const remote = require('electron').remote;
const {BrowserWindow} = require('electron').remote;
const path = require('path');

const valider = document.querySelector("#valider");
const loginInput = document.getElementById("login");
const passwordInput = document.getElementById("password");

var window = remote.getCurrentWindow(); // remote module

let win;
let login = null;
let password = null;
let error = null;



valider.addEventListener('click', ()=> {
    login = loginInput.value;
    password = passwordInput.value;
    url = "http://localhost:90/gsb/login"

    //console.log(login);
    //console.log(password);

    const cryptedData = window.btoa(login + ':' + password)
    fetch(url, {
        method: 'GET',
        headers:{
            "Content-type": "application/json",
            "Authorization": "Basic " + cryptedData
            }
    })
    .then((response) => {
        if(response.status === 401){
            error = 'Bad login or password'
            console.log('Unauthorized')
        }else{
            win = new BrowserWindow({
                width: 1200,
                height: 1400,
                alwaysOnTop: true,
                webPreferences:{
                    nodeIntegration: true,
                    contextIsolation: false,
                    enableRemoteModule: true
                }
            });
        
            win.loadFile(path.join(__dirname, 'carto.html'));
        
            //ipcRenderer.send("datasFromAuth", win, login);
            window.close();
            return response.json()
        } 
        })
    .then((data) => {
        
    });
});
      




    // win = new BrowserWindow({
    //     width: 800,
    //     height: 800,
    //     alwaysOnTop: true,
    //     webPreferences:{
    //         nodeIntegration: true,
    //         contextIsolation: false,
    //         enableRemoteModule: true
    //     }
    // });

    // win.loadFile(path.join(__dirname, 'carto.html'));

    // //ipcRenderer.send("datasFromAuth", win, login);
    // window.close();

