import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./store/reducers/Store";
import {ThemeProvider} from "./components/themeProvider/ThemeProvider";
import {AppHeader} from "./components/appHeader/AppHeader";
import {authTC} from "./store/reducers/authReducer";
import Routing from "./pages/rotes/Rotes";
import {getThemeTC} from "./store/reducers/appReducer";
import {AppMessagesBar} from "./components/appMessagesBar/AppMessagesBar";


function App() {

    const dispatch = useAppDispatch()

    const authInProgress = useAppSelector(state => state.app.authInProgress)
    console.log("app")
    useEffect(() => {
        dispatch(getThemeTC())
        localStorage.getItem('token') && dispatch(authTC())
    }, [])



    if (authInProgress) {
        return <div>Loading</div>
    }

    return (
        <ThemeProvider>
            <AppHeader/>
            <div className="rotes"><Routing/></div>
            <AppMessagesBar/>
        </ThemeProvider>
    );
}

export default App;
