<template>
  <div>
    <router-link to="/main">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <router-link to="/vreme">Vreme</router-link>|
    <a @click="logout">Logout</a>
  

    <br>
    <h1 v-if="!user">Jos nema usera..</h1>
    <h1 v-if="user">Hello {{user.username}}, this is Main page</h1>
  </div>
</template>


<script>
const API = "http://localhost:5000/auth/main";

export default {
  data() {
    return {
      user: null
    };
  },
  name: "MainPage",
  mounted() {
      fetch(API, {
        headers: {
          token: localStorage.token
        }
      })
        .then(res => res.json())
        .then(result => {
          if (result.user) {
            this.user = result.user;
            console.log(result.user);
          }else{
            this.logout()
          }
        });
  },
  methods:{
    logout(){
      localStorage.removeItem('token')
      this.$router.push('/login')
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
