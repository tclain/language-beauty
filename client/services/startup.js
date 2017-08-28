import data from './data';

export function startup(){
    return data.processsampledata()
            .then(ok => data.rawtext({offset : 0}));
}