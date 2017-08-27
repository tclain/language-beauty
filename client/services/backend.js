/**
 * @param {String} API_ROOT the base uri for backend API
 */
const API_ROOT = window.location.host;

/**
 * 
 * build an api URI for a given endpoint
 * 
 * @export
 * @param {String} endpoint 
 * @returns 
 */
export function apiURI(endpoint){
    return `${API_ROOT}/${endpoint}`
}

/**
 * 
 * 
 * @export
 * @param {String} name 
 * @param {Object} payload 
 * @returns 
 */
export function rpc(name, payload=null){
    return fetch({
        url : apiURI('methods'),
        method : 'POST',
        formData : payload
    }).then(response => response.json())
}