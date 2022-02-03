<template>
  <div id="app">
    <Game />
    I'm rendering, ma!
  </div>
</template>

<script>
// @ is an alias to /src
import Game from "@/components/Game.vue";

console.log(Game);

export default {
  name: "Home",
  components: {
    Game,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
