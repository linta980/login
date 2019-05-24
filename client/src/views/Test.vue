<template>
  <div>
    <div id="container">
      <div class="page-header">
        <router-link to="/main">Home</router-link>|
        <router-link :to="{name:'About'}">About</router-link>|
        <router-link :to="{name:'Vreme'}">Vreme</router-link>|
        <router-link to="/admin" v-if="admin">Admin |</router-link>
        <router-link :to="{name:'Profile'}">Profile |</router-link>
        <router-link :to="{name:'Test'}">Galerija |</router-link>
        <a @click="logout">Logout</a>
      </div>
      {{currentTime}}
      <ul>
        <li
          v-for="img in images"
          :key="img.img_id"
          style="position:relative; float:left; margin:10px 10px 10px 10px; list-style-type: none;"
        >
          <img v-bind:src="'http://localhost:5000/'+img.file_path" alt>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      currentTime: undefined,
      images: [],
      admin: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("admin");
      localStorage.removeItem("user_id");
      localStorage.removeItem("ime");
      this.$router.push("/login");
    },
    load() {
      if (localStorage.token != null) {
        this.currentTime = new Date().toLocaleTimeString();
        //   fetch("http://localhost:5000/auth/test", {
        //     headers: {
        //       token: localStorage.token
        //     }
        //   })
        //     .then(result => {
        //      return result.json();
        //     })
        //     .then(res => {
        //         this.images = res.file_path
        //         console.log(this.images[3].ime_slike)
        //     //   this.images = res;
        //     //   console.log(this.images.length())
        //     });
        axios.get("http://localhost:5000/auth/test").then(res => {
          this.images = res.data;
        });
      } else {
        logout();
      }
    }
  },
  cron: {
    time: 1000,
    method: "load"
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
#slika {
  background-color: #42b983;
  width: 50;
  height: 50px;
}
</style>

