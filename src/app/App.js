import React from 'react';
import {FuseAuthorization, FuseLayout, FuseTheme} from '@fuse';
import Provider from 'react-redux/es/components/Provider';
import {Router} from 'react-router-dom';
import jssExtend from 'jss-extend';
import history from '@history';
import {Auth} from './auth';
import store from './store';
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
import {create} from 'jss';
import {StylesProvider, jssPreset, createGenerateClassName} from '@material-ui/styles';
// import setAuthToken from "../utils/setAuthToken";

const jss = create({
    ...jssPreset(),
    plugins       : [...jssPreset().plugins, jssExtend()],
    insertionPoint: document.getElementById('jss-insertion-point'),
});

const generateClassName = createGenerateClassName();

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZWFhNzkyYzQxYzMxMzIzMGY0YWE3NSIsImlhdCI6MTU5OTQwMTUwNCwiZXhwIjoxNjAxOTkzNTA0fQ.Grpld84HCqCaRzE75ixq97dBvfM1_GTKW3GIS5oFlmI';
const App = () => {
    // setAuthToken(token);
    return (
        <AppContext.Provider
            value={{
                routes
            }}
        >
            <StylesProvider jss={jss} generateClassName={generateClassName}>
                <Provider store={store}>
                    <Auth>
                        <Router history={history}>
                            <FuseAuthorization>
                                <FuseTheme>
                                    <FuseLayout/>
                                </FuseTheme>
                            </FuseAuthorization>
                        </Router>
                    </Auth>
                </Provider>
            </StylesProvider>
        </AppContext.Provider>
    );
};

export default App;
