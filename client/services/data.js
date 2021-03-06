import {rpc} from './api';

const methods = [
    "process-sample-data",
    "raw-text",
    "similar",
    "concordance",
    "entities",
    "insights"
]

/**
 * dynamic building of rpc client function
 */
const rpcFn = methods.reduce((previous, current) => {
    return {
        ...previous,
        [current.replace(/-/g,'')] : function(payload={}){
            return new Promise((resolve, reject) => {
                // deserialize result of rpc
                rpc(current, {data : payload}).then(data => resolve(data.data)).catch(reject);
            })
        }
    }
}, {})

export default rpcFn;