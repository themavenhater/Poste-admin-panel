import {FuseAnimate} from '@fuse';
import {Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import JWTLoginTab from './tabs/JWTLoginTab';

const useStyles = makeStyles(theme => ({
    root: {
        // background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        background: "gray",
        color: theme.palette.primary.contrastText
    }
}));

function Login()
{
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <FuseAnimate animation="transition.expandIn">
                    <img className="w-128 mb-32" src="assets/images/logos/logo.png" alt="logo"/>
                </FuseAnimate>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                            Ma poste
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                        Bienvenue
                    </Typography>
                </FuseAnimate>
            </div>

            <FuseAnimate animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="text-center md:w-full mb-48">SE CONNECTER</Typography>
                        <JWTLoginTab/>
                        {/* <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            className="mb-32"
                        >
                            <Tab
                                icon={<img className="h-40 p-4 bg-black rounded-12" src="assets/images/logos/jwt.svg" alt="firebase"/>}
                                className="min-w-0"
                                label="JWT"
                            />
                            <Tab
                                icon={<img className="h-40" src="assets/images/logos/firebase.svg" alt="firebase"/>}
                                className="min-w-0"
                                label="Firebase"
                            />
                            <Tab
                                icon={<img className="h-40" src="assets/images/logos/auth0.svg" alt="auth0"/>}
                                className="min-w-0"
                                label="Auth0"
                            />
                        </Tabs>

                        {selectedTab === 0 && <JWTLoginTab/>}
                        {selectedTab === 2 && <Auth0LoginTab/>} */}

                        {/* <div className="flex flex-col items-center justify-center pt-32">
                            <span className="font-medium">Don't have an account?</span>
                            <Link className="font-medium" to="/register">Create an account</Link>
                            <Link className="font-medium mt-8" to="/">Back to Dashboard</Link>
                        </div> */}

                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    )
}

export default Login;
