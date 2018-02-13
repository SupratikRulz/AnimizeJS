// check for hot module is enabled in webpack-dev-server (this will not be added in final build)
if (module.hot) {
    module.hot.accept();
}
// import AnimizeJS information such as version
import appInfo from './animize.info';
// import css
import './../../css/bounce/bounceIn.scss';

/**
 * IIFE that gets executed when the library is loaded
 * @param {object} global - the global object, temporary it is limited to window
 */
(function (global) {
    /**
     * IIFE that adds the bundled css file to header of html when the library gets loaded
     */
    (function (){
        var path   = '.'; // the current directory
        var style   = document.createElement( 'link' ); // create a html link tag
        style.rel   = 'stylesheet'; // set attribute rel to stylesheet
        style.type  = 'text/css'; // set attribute type to text/css
        style.href  = path + '/main.bundle.css'; // sets the href attribute to the relative path
        document.getElementsByTagName('head')[0].appendChild(style); // fetches the head tag of html and appends the created link tag to the head
    }());
    /**
     * @param {array} arrayOfDomId - contains the list of all dom element id's on which animation is going to be applied
     * @param {string} animationName - the effect name (class-name) that is going to be applied
     * creates a new instance for every animizeit() or A$() calls
     */
    var Animizeit = function (arrayOfDomId, animationName) {
        return new Animizeit.constructor(arrayOfDomId, animationName);
    };
    // add app-information inside the __proto__ of Animizeit so that user can get quick information
    Animizeit.__proto__ = {
        version: appInfo.version,
        name: appInfo.name,
        description: appInfo.description,
        author: appInfo.author
    };

    // Add methods to the prototype of Animizeit so that it can be used with it's instance
    Animizeit.prototype = {
        /**
         * @param {string} className - name of the class that needs to be added to the DOM IDs
         * @returns {object} this - instance of itself so that method chaining can be applied
         * Method to add class to dom element
         */
        addClass: function (className) {
            let domElement;
            for (const domID of this.arrayOfDomId) { // const is used to check domID is not manipulated
                domElement = document.getElementById(domID); // gets the corresponding dom-element mapped with id
                if (domElement.classList) {
                    domElement.classList.add(className);
                }
                else { // support for old browsers
                    domElement.className += ' ' + className;
                }
            }
            return this;
        },
        /**
         * @param {string} className - name of the class that needs to be removed from the dom of specified id's
         * @returns {object} this - instance of itself so that method chaining can be applied
         * Method to remove class from dom element
         */
        removeClass: function (className) {
            let domElement;
            for (const domID of this.arrayOfDomId) { // const is used to check domID is not manipulated
                domElement = document.getElementById(domID); // gets the corresponding dom-element mapped with id
                if (domElement.classList) {
                    domElement.classList.remove(className);
                }
                else { // support for old browsers
                    domElement.className = domElement.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            }
            return this;
        },
        /**
         * Method to set the css of the DOM elements specified
         * @param {object} cssObj - json object that contains the css that needs to be appplied
         * @returns {object} this - instance of itself so that method chaining can be applied
         * @example
         * A$(['id']).css({
         *     'color': 'red',
         *     'font-size': '20px'
         * })
         */
        css: function (cssObj) {
            let domElement,
                style,
                properties = Object.getOwnPropertyNames(cssObj); // get all the css property names in an array inside cssObj
            for (const domID of this.arrayOfDomId) {
                domElement = document.getElementById(domID); // get the dom reference to the id
                style = domElement.style; // get the style of the dom reference
                properties.forEach((prop) => {
                    style[prop] = cssObj[prop]; // for each property mentioned add the same to the style of dom
                });
            }
            return this;
        },
        /**
         * Method to add class to dom element
         * @param {string} className - name of the class that needs to be added to the DOM IDs
         * @returns {object} this - instance of itself so that method chaining can be applied
         */
        with: function (className) {
            return this.addClass(className); // calls the addClass method internally
        }
    };

    /**
     * Constructor method that gets invoked on every A$() or animizeit() calls
     * Initializes arrayOfDomId and animationName for further use
     * @param {array} arrayOfDomId - contains the list of all dom element id's on which animation is going to be applied
     * @param {string} animationName - the effect name (class-name) that is going to be applied
     */
    Animizeit.constructor = function (arrayOfDomId = [], animationName = '') {
        this.arrayOfDomId = arrayOfDomId;
        this.animationName = animationName;
        // if there is no animation name then do nothing
        if(animationName) {
            this.addClass(animationName);
        }
    };

    // points the Animizeit.constructor's prototype to Animizeit's prototype so that it can use methods added to the prototype of Animizeit  
    Animizeit.constructor.prototype = Animizeit.prototype;

    // exposing animizeit and A$ to global namespace
    global.animizeit = global.A$ = Animizeit;
}(window));
