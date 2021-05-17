import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

/* Private functions */

/**
 * Returns a date as a string value appropriate to the host environment's current locale.
 * @returns {string}
 */
function today() {
    return new Date().toLocaleDateString();
}

/**
 * Returns a time as a string value appropriate to the host environment's current locale.
 * @returns {string}
 */
function current() {
    return new Date().toLocaleTimeString();
}

/* Public functions */

/**
 * Time utilities.
 * @returns {{time_and_date: (function(): string)}}
 */
function time() {
    return {
        time_and_date: function () {
            return today() + " " + current();
        }
    };
}

function connect() {
    return {
        get: function (url) {
            return Vue.http.get(url);
        },
        post: function (url, body) {
            return Vue.http.post(url, body);
        }
    };
}

/**
 *
 * @returns {{to_json: (function(*=): string), from_json: (function(*=): any), unitRound: (function(*): number)}}
 */
function convert() {
    return {
        to_json: function (value) {
            return JSON.stringify(value);
        },
        from_json: function (value) {
            return JSON.parse(value);
        },
    };
}

export {time, convert, connect}