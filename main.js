const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const template = require("./src/assets/js/menu");
const login = null;

let win = null;

const createWindow = () => {

    //On crée la fenetre 
    win = new BrowserWindow({
        width: 500,
        height: 800,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    //Dans cette fenetre là on charge ce fichier
    win.loadFile("./view/authentification.html");
}

// ipcMain.on("datasFromAuth",(event, window, login) => {
//     console.log(login);
//     this.login = login;
//     window.webContents.send("datasFromAuth", login);
// });

//Quand l'application est prête on crée la fenetre
app.whenReady()
.then(()=> {
    createWindow();
})

// const menu = Menu.buildFromTemplate(template);
// Menu.setApplicationMenu(menu);


//Ecouteur d'évènement
// app.on("window-all-closed", ()=> {

//     //process.platform = systeme d'exploitation
//     //darwin = mac os
//     if(process.platform !== "darwin"){
//         app.quit();
//     }
// })

// exitButton.on("click", ()=> {
//     app.quit();
// })

