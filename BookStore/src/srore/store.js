
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


var store= new Vuex.store({
    state:{
        searchList:[]
    },
    getters:{},
    mutation:{},
    actions:{}
})

export  default store