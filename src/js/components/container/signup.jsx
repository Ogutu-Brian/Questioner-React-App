import SignUp from '../presentational/signup.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import '../presentational/column.css';
import urls from './urls.js';
import { Checkers } from '../presentational/signup.jsx';

let errorLogs = {};
class SingupRender extends React.Component {
    constructor(props) {
        super(props);
        document.body.style.height = '100%';
        document.body.style.minHeight = '100%';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
    }
    render() {
        return (
            <SignUp />
        );
    }
}
class EventHandler {
    constructor(data) {
        this.data = data;
    }
    handleClick() {
        let formHandler = new HandleFormData(this.data);
        formHandler.postData();
        return errorLogs;
    }
}
class HandleFormData {
    constructor(data) {
        this.Data = () => {
            let logs;
            if (!data) {
                logs = {};
                logs['invalidInput'] = 'Please fill in all the fields';
                let errorString = 'Please fill in all the fields';
                renderError(errorString);
            } else {
                logs = {};
                const fieldNames = [
                    'name',
                    'password',
                    'nick_name',
                    'email'
                ];
                for (let key of fieldNames) {
                    if (!Object.keys(data).includes(key)) {
                        logs['invalidInput'] = 'Please fill in all the fields';
                        let errorString = 'Please fill in all the fields';
                        renderError(errorString);
                    }
                }
            }
            errorLogs = logs;
            return data;
        };
    }
    postData() {
        let data = this.Data();
        if (Checkers.isEmptyOject(errorLogs)) {
            clearError();
            fetch(urls.signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    let dataKeys = Object.keys(data);
                    if (dataKeys.includes('detail')) {
                        let errorString = data.detail;
                        renderError(errorString);
                    } else if (dataKeys.includes('password')) {
                        let errorString = data.password[0];
                        renderError(errorString);
                    } else {
                        fetch(urls.activationUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        });
                    }
                });
        }
    }
}
let renderError = (errorString) => {
    clearError();
    document.getElementById('error').innerHTML += `
    <div id='err-log'>
        <div class="alert alert-danger alert-dismissible fade show">
            <button type="button" class="close" data-dismiss="alert">&times;
            </button>
            <strong>
                ${errorString}
            </strong>
        </div>
    </div>
    `;
};
let clearError = () => {
    if (document.getElementById('err-log')) {
        document.getElementById('error').innerHTML = '';
    }
}
ReactDOM.render(
    <SingupRender />,
    document.getElementById('root')
);
export { EventHandler }
