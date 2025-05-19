import { createStore } from "vuex";


export default createStore({
    state:{
        url: "http://localhost:8088"
    },
    getters: {
        getUrl(state) {
            return state.url;
        }
    },
    mutations: {
        setUrl(state, url) {
            state.url = url;
        }
    },
    actions: {
        setUrl(context, url) {
            context.commit("setUrl", url);
        }
    }
})
