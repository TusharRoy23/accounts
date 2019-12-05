import client from '@client/utils/axios';

export const UPDATE_SUBHEAD = 'UPDATE_SUBHEAD';
export const CREATE_SUBHEAD = 'CREATE_SUBHEAD';
export const DELETE_SUBHEAD = 'DELETE_SUBHEAD';
export const GET_SUBHEAD_LIST = 'GET_SUBHEAD_LIST';
export const UPDATE_STATUS   = 'UPDATE_STATUS';

export const UPDATE_SUBSUBHEAD = 'UPDATE_SUBHEAD';
export const CREATE_SUBSUBHEAD = 'CREATE_SUBHEAD';
export const DELETE_SUBSUBHEAD = 'DELETE_SUBHEAD';
export const GET_SUBSUBHEAD_LIST = 'GET_SUBHEAD_LIST';
export const UPDATE_SUB_STATUS   = 'UPDATE_SUB_STATUS';

export default {
    [UPDATE_SUBHEAD]: (context, data) => client.post('subHead/updateSubHead', data),
    [CREATE_SUBHEAD]: (context, data) => client.post('subHead/createSubHead', data),
    [DELETE_SUBHEAD]: (context, data) => client.post('subHead/deleteSubHead', data),
    [GET_SUBHEAD_LIST]: (context) => client.get('subHead/getSubHeadList'),
    [UPDATE_STATUS]: (context, data) => client.post('subHead/updateStatus', data),

    // [UPDATE_SUBSUBHEAD]: (context, data) => client.post('subHead/updateSubSubHead', data),
    // [CREATE_SUBSUBHEAD]: (context, data) => client.post('subHead/createSubSubHead', data),
    // [DELETE_SUBSUBHEAD]: (context, data) => client.post('subHead/deleteSubSubHead', data),
    // [GET_SUBSUBHEAD_LIST]: (context) => client.get('subHead/getSubSubHeadList'),
    // [UPDATE_SUB_STATUS]: (context, data) => client.post('subHead/updateSubSubStatus', data)
};