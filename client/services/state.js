/**
 * 
 * simple action creator
 * 
 * @export
 * @param {String} type 
 * @returns {any}
 */
export function action(type){
    return function(payload){
        return {
            type, 
            payload
        }
    }
}
