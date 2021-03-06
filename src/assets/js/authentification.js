const ipcRenderer = require('electron').ipcRenderer;
const remote = require('electron').remote;
const {BrowserWindow} = require('electron').remote;
const path = require('path');

const valider = document.querySelector("#valider");
const loginInput = document.getElementById("login");
const passwordInput = document.getElementById("password");
const mainSection = document.getElementById("mainSection");


var window = remote.getCurrentWindow(); // remote module

let win;
let login = null;
let password = null;
let error = null;
const errorContainer = document.querySelector('#errorContainer');



valider.addEventListener('click', ()=> {
    this.authentification();
});

mainSection.addEventListener("keydown",(event)=> {
    if (event.keyCode == 13) {
        this.authentification();
    }
});
      
function authentification() {
    login = loginInput.value;
    password = passwordInput.value;
    // url = "http://localhost:90/gsb/login"
    url = "http://localhost:8080/gsb/login"

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
            error = 'Mauvais identifiant ou mot de passe'
            console.log('Unauthorized : ' + error);
            errorContainer.insertAdjacentHTML('afterbegin', `
            <p>${error}</p>
        `);
        }else{
            win = new BrowserWindow({
                width: 1200,
                height: 1400,
                frame: false,
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
}



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

