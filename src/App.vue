<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <img src="@/assets/img/logo.png" style="height: 64px;">
    </div>
    <router-view/>
  </div>
</template>
<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);
export default {
  name: 'App',
};
</script>
<style lang="scss">
@import '../node_modules/uikit/dist/css/uikit.min.css';
@import '@/assets/scss/estilo.scss';
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Open Sans', sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
    padding: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0px 0px 8px -3px rgba($color-primary, 0.5);
    z-index: 3;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $color-primary;
    }

  }
}
</style>
