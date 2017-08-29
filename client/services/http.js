/**
 * 
 * simple json http client based on fetch
 * 
 * @export
 * @param {any} uri 
 * @param {any} [data=null] 
 * @param {string} [method="GET"] 
 * @returns 
 */
export function request(uri, data=null, method="GET"){
    const config = {
        method,
        headers : new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(data || {})
    }
    return fetch(uri, config).then(res => res.json());
}