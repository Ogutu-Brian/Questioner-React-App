import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import React from 'react';
import SingupRender from './signup.jsx';
import LoginRender from './login.jsx';
import MeetupsRender from './meetups.jsx';

class NotFopund extends React.Component {
    render = () => {
        return (
            <div>Oops! Sorry there is no page like that in Questioner</div>
        );
    }
}
class Routes extends React.Component {
    render = () => {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={props => <SingupRender {...props} />} />
                    <Route path="/login" exact render={props => <LoginRender {...props} />} />
                    <Route path="/meetups" exact render={props => <MeetupsRender {...props} />} />
                    <Route component={NotFopund} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Routes;
