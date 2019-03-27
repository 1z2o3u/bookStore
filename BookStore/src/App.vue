<template>
  <div id="app">
    
    <router-view v-if="isRouterActive"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterActive:true
    }
  },

  methods:{
    reload(){
      this.isRouterActive=false
      this.$nextTick(function(){
        this.isRouterActive=true
      })
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
