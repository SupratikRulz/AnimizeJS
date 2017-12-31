// check for hot module is enabled in webpack-dev-server (this will not be added in final build)
if (module.hot) {
    module.hot.accept();
}
// import AnimizeJS information such as version
import appInfo from './animize.info';
/*eslint-disable no-unused-vars*/
import css from './../../css/bounce/bounceIn.scss';
/*eslint-enable no-unused-vars*/
// IIFE
(function (global) {
    
    (function (){
        var path   = '.';
        var style   = document.createElement( 'link' );
        style.rel   = 'stylesheet';
        style.type  = 'text/css';
        style.href  = path + '/main.bundle.css';
        document.getElementsByTagName('head')[0].appendChild(style);
    }());

    var Animizeit = function (arrayOfDomId, animationName) {
        return new Animizeit.constructor(arrayOfDomId, animationName);
    };

    Animizeit.__proto__ = {
        version: appInfo.version,
        name: appInfo.name,
        description: appInfo.description,
        author: appInfo.author
    };

    Animizeit.prototype = {

    };

    Animizeit.constructor = function (arrayOfDomId, animationName) {
        this.arrayOfDomId = arrayOfDomId;
        this.animationName = animationName;
        document.getElementById(arrayOfDomId[0]).className = animationName;
    };

    Animizeit.constructor.prototype = Animizeit.prototype;

    global.animizeit = global.A$ = Animizeit;
}(window));
