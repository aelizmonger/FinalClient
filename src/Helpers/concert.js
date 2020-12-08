let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '':
        APIURL = 'http://localhost:5000';
}
console.log(window.location.hostname);
export default APIURL;