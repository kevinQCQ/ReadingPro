import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';


export default createStore({
    state:{
        url: "http://121.40.60.94:8088",
        user:null,
        userInfo:null,
    },
    getters: {
        getUrl(state) {
            return state.url;
        },
        getUser(state) {
            return state.user;
        },
        getUserInfo(state) {
            return state.userInfo;
        }

    },
    mutations: {
        setUrl(state, url) {
            state.url = url;
        },
        setUser(state, user) {
            state.user = user;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        setUrl(context, url) {
            context.commit("setUrl", url);
        },
        setUser(context, user) {
            context.commit("setUser", user);
        },
        setUserInfo(context, userInfo) {
            context.commit("setUserInfo", userInfo);
        }
    },
    plugins: [createPersistedState()]
})
