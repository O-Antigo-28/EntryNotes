import { createRoot } from 'react-dom/client';
import { MyRoutes } from './MyRoutes';
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom"
import ModeChoicePage from './pages/ModeChoicePage';
import NotExistsPage from './pages/NotExistsPage';
import AutomaticFileSelection from './pages/AutomaticFileSelection';
import ManualFileSelection from './pages/ManualFileSelection';
import AutomaticPage from './pages/AutomaticPage';
import ManualPage from './pages/ManualPage';
import { RecoilRoot } from 'recoil';
const routes = [
    {
        path: MyRoutes.HOME,
        element: <ModeChoicePage/>
    },
    {
        path: MyRoutes.AUTO_FILE_SELECTION, 
        element: <AutomaticFileSelection/>
    }, 
    {
        path: MyRoutes.MANUAL_FILE_SELECTION,
        element: <ManualFileSelection/>
    },
    {
        path: MyRoutes.MANUAL_MODE,
        element: <ManualPage/>
    },
    { 
        path: MyRoutes.AUTO_MODE, 
        element: <AutomaticPage/>
    }, 
    {
        path: MyRoutes.OTHERS, 
        element: <NotExistsPage/>
    }

]

const root = createRoot(document.getElementById("react-container"));

function App(){ 
    return (
        <RecoilRoot>
                <HashRouter>
                <Routes>
                    {routes.map((route, index) => { 
                        return <Route path={route.path} key={route.path + index} element={route.element}/>
                    })}
                </Routes>
            </HashRouter>
        </RecoilRoot>

    ) 
}
root.render(
    App()
);