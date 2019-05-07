<template>
  <div>
    <router-link to="/main">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <router-link to="/vreme">Vreme</router-link>|
    <a @click="logout">Logout</a>
    <br>
    <h1 v-if="!user">Jos nema Usera..</h1>
    <h1 v-if="user">Hello {{user}}, this is About page</h1>
  </div>
</template>


<script>
const API = "http://localhost:5000/auth/about";

export default {
  name: "About",
  data() {
    return {
      user: null
    };
  },
  mounted() {
    fetch(API, {
      headers: {
        token: localStorage.token
      }
    })
      .then(result => result.json())
      .then(data => {
        if (data.user) {
          this.user = data.user.username;
        } else {
          this.logout();
        }
      });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #ccc;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
