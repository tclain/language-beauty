import {request} from './http';

/**
 * @param {String} API_ROOT the base uri for backend API
 */
const API_ROOT = "http://"+window.location.host;

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
    return request(apiURI("rpc/"+name), payload, "POST");    
}