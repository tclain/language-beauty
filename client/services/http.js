/**
 * 
 * simple json http client
 * 
 * @export
 * @param {any} uri 
 * @param {any} [data=null] 
 * @param {string} [method="GET"] 
 * @returns 
 */
export function request(uri, data=null, method="GET"){
    console.log(arguments);
    const config = {
        method,
        headers : new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(data || {})
    }
    console.log("config", config);
    return fetch(uri, config).then(res => res.json());
}

window.request = request