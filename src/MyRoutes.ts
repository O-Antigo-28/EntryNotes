export enum MyRoutes{ 
    HOME = "/main_window",
    AUTO_FILE_SELECTION = "/automatic/fileSelection",
    MANUAL_FILE_SELECTION = "/manual/fileSelection",
    AUTO_MODE = "/automatic/:stockPath/:redePath/:caixaPath/",
    BASE_AUTO_MODE = "/automatic",
    BASE_MANUAL_MODE = "/manual", 
    MANUAL_MODE = "/manual/:stockPath",
    OTHERS = "*"
}


