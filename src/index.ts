import { app, BrowserWindow, globalShortcut, GlobalShortcut, ipcMain, nativeTheme} from 'electron';
import { Directions } from './Directions';
import { execFile } from 'child_process';
import { NoteSale } from './NoteSale';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();

}

let mainWindow: BrowserWindow = null
interface Accelerator{ 
  accelerator: string, message: number
}
interface AccelaratorsForIPC{
  channel: string,
  commands: Array<Accelerator>
}

const acceleratorsDirectionsForIPC: AccelaratorsForIPC = {
  channel: "accelerator-directions", 
  commands:[
    {accelerator: 'CmdOrCtrl+Left', message:  Directions.LEFT},
    {accelerator: 'CmdOrCtrl+Right', message: Directions.RIGHT}, 
    {accelerator: 'CmdOrCtrl+Up', message: Directions.UP},
    {accelerator: 'CmdOrCtrl+Down', message: Directions.DOWN}
  ]
}

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 400,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation:false,
      
    },
    alwaysOnTop:true
  });

  mainWindow.webContents.openDevTools()

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  //mainWindow.menuBarVisible = false
  // Open the DevTools.
};

function sendNoteSale(notesale:NoteSale){
  console.log("estamos tentando chefe")
  fetch("http://127.0.0.1:5000/receive_sale", {
    method: 'POST', 
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(notesale)}).then((response) => response.json()).then((data) => console.log(data)).catch((e) => console.log(e))

}

function registerAccelerators(accelerators: AccelaratorsForIPC){ 
  accelerators.commands.forEach((commandToRegister) => { 
    globalShortcut.register(commandToRegister.accelerator, () => {
      mainWindow.webContents.send(accelerators.channel, commandToRegister.message)
    })
  })
}
function UnregisterAccelerators(accelerator: AccelaratorsForIPC){
  accelerator.commands.forEach((commandToUnregister) => { 
    globalShortcut.unregister(commandToUnregister.accelerator)
  })
}

function listenersRegisterAccelerators(){
  ipcMain.on('register-the-acceletators-directions-commands', () => { 
    registerAccelerators(acceleratorsDirectionsForIPC)
    ipcMain.on("unregister-the-acceletators-directions-commands", () => {
      UnregisterAccelerators(acceleratorsDirectionsForIPC)
    })  
  })
}
function initServer(){
  execFile("fasjflkj", (error, stdout, stderr) => {
    if (error || stderr) {
        mainWindow.webContents.send("")
        return;
    }


    console.log(`Saída do programa: ${stdout}`);
});
}
function listenerInitServer(){
  ipcMain.on('init-server', initServer)
  

}

function listenerSendSales(){
  ipcMain.on("send-sales", (event, notesale) => { 
    sendNoteSale(notesale)
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  listenersRegisterAccelerators()
  listenerInitServer()
  listenerSendSales()
  nativeTheme.themeSource = 'dark'
   
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('will-quit', globalShortcut.unregisterAll)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// set shortcuts
ipcMain.on("program-activated", () => {

})