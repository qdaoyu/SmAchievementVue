<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <login></login> -->
    <!-- <HelloWorld></HelloWorld> -->
    <router-view/>
  </div>
</template>

<script>

// import Login from './components/Login.vue'
// import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  // components:{
  //   Login,HelloWorld
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
