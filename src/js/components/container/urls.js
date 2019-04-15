'use strict'
const host = 'http://127.0.0.1:8000';
let urls = {
    signupUrl: `${host}/api/auth/signup/`,
    activationUrl: `${host}/api/auth/activate/`,
    logInUrl: `${host}/api/auth/login/`,
    upcomingMeetups: function (page, pageLimit) {
        let url = `${host}/api/meetups/upcoming/?page=${page}&page_limit=${pageLimit}`;
        return url
    }
}
export default urls;
