import { ipcRenderer } from "electron"



export function registerAcceleratorsDirections(){
    ipcRenderer.send('register-the-acceletators-directions-commands')
}
export function unregisterAcceleratorsDirections(){
    ipcRenderer.send('unregister-the-acceletators-directions-commands')
}