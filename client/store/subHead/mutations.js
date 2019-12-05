export const SUBHEAD_LIST = 'SUBHEAD_LIST';
export const SUBSUBHEAD_LIST = 'SUBSUBHEAD_LIST';
export default {
    [SUBHEAD_LIST](state, subhead){
        state.subHeadList = subhead;
    },
    [SUBSUBHEAD_LIST](state, subsubhead){
        state.subSubHeadList = subsubhead;
    }
};