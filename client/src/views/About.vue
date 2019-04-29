<template>
  <div>
    <router-link to="/main">Home</router-link>|
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Logout</router-link>
    <br>
    <h1>Hello Man, this is About page</h1>
  </div>
</template>


<script>
export default {
  name: "About"
};
</script>


<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color:#ccc
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
