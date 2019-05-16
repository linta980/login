<template>
  <div id="container">
    <div class="page-header">
      <router-link to="/main">Home</router-link>|
      <router-link :to="{name:'About'}">About</router-link>|
      <router-link :to="{name:'Vreme'}">Vreme</router-link>|
      <router-link to="/admin" v-if="admin">Admin |</router-link>
      <router-link :to="{name:'Profile'}"> Profile |</router-link>
      <a @click="logout">Logout</a>
    </div>
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
      user: null,
      admin: false
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
    if (localStorage.getItem("admin")) {
      this.admin = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("admin");
      localStorage.removeItem("user_id");
      localStorage.removeItem("ime");
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