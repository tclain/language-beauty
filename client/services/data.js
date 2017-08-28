import {rpc} from './api';

const methods = [
    "process-sample-data",
    "raw-text",
    "similar",
    "concordance",
    "entities"
]

const rpcFn = methods.reduce((previous, current) => {
    return {
        ...previous,
        [current.replace(/-/g,'')] : function(payload={}){
            return rpc(current, {data : payload});
        }
    }
}, {})



window.rpcs = rpcFn

export default rpcFn;