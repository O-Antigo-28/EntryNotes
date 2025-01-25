import { createRoot } from 'react-dom/client';
import { MyRoutes } from './MyRoutes';
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom"
import NotExistsPage from './pages/NotExistsPage';
import {StrictMode} from 'react'

import { RecoilRoot } from 'recoil';
import 'swiper/css';
import Labels from './pages/Labels';

const routes= [
    {
        path: MyRoutes.HOME,
        element: <Labels/>
    }

]

const root = createRoot(document.getElementById("react-container") as Element);

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