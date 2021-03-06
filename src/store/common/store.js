import * as types from '../types'
import store from '@/store/index'
export default {
    state: {
      user: {},
      token: null,
      uid:'',
      title: '',
      breadcrumb1:'',
      breadcrumb2:'',
      
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            sessionStorage.token = data;
            state.token = data;
        },
        [types.LOGOUT]: (state) => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('isselect');
            sessionStorage.removeItem('user');
            state.token = null
            state.user = null
            // localStorage.removeItem('username');
            // localStorage.removeItem('pss');
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        },
        [types.USER]: (state, data) => {
          sessionStorage.user=JSON.stringify(data);
          state.user = data;
        },
        [types.BREADCRUMB1]: (state, data) => {
          state.breadcrumb1 = data;
        },
        [types.BREADCRUMB2]: (state, data) => {
          state.breadcrumb2 = data;
        },
       
    },
	actions:{

	},
	getter:{
        
	}

}
