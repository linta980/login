<template>
  <div>
    <router-link to="/main"> Home </router-link>|
    <router-link :to="{name:'About'}"> About </router-link>|
    <router-link :to="{name:'Vreme'}"> Vreme </router-link>|
    <router-link to="/admin" v-if="admin"> Admin |</router-link>
    <a @click="logout"> Logout </a>

    <br>

    <h1 v-if="!user">Jos nema usera..</h1>
    <h1 v-if="user">Hello {{user.username}}, this is Main page</h1>
    <br>
    <div style="position:relative; float:left;">
      <img src="../images/zen-planner-fit.png" alt srcset width="400px" height="400px">
    </div>
    <div style="position:relative; float:left; width:400px; height:400px; margin-left:10px;">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sxt of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sxt of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, wLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
  </div>
</template>


<script>
const API = "http://localhost:5000/auth/main";

export default {
  data() {
    return {
      user: null,
      admin: false
      
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
          if (this.user.username === "admin@admin.net") {
            this.admin = true;
            localStorage.admin=true
          }

        } else {
          this.logout();
        }
      });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("admin")
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
