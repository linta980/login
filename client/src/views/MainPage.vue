<template>
  <div id="container">
    <nav class="navbar fixed-top navbar-dark bg-primary">
      <ul class="nav" style="margin:0px auto;">
        <li class="nav-item">
          <router-link to="/main">
            <a class="nav-link active" href="#!">Home</a>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link :to="{name:'About'}">
            <a class="nav-link active" href="#!">About</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'Vreme'}">
            <a class="nav-link active" href="#!">Vreme</a>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/admin" v-if="admin">
            <a class="nav-link active" href="#!">Admin</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'Profile'}">
            <a class="nav-link active" href="#!">Profile</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'Test'}">
            <a class="nav-link active" href="#!">Galerija</a>
          </router-link>
        </li>
        <li class="nav-item">
          <a @click="logout" class="nav-link active">Logout</a>
        </li>
      </ul>
    </nav>

    <h1 v-if="!user">Jos nema usera..</h1>

    <div class="jumbotron">
      <h1 v-if="user" style>Hello {{user.username}}, this is Main page</h1>
      
      <div class="text-center">
        <b-button variant="primary">
          Notifications
          <b-badge variant="light">4</b-badge>
        </b-button>
      </div>


      <hr class="my-5">
      <div v-if="picture">
        <!-- <img src="../../../server/public/uploads/file-1557992513767ja.png" alt="slika" height="200" width="200"> -->
        <img v-bind:src="picture" alt="slika" height="200" width="200">
      </div>
      <div v-else id="djokica">
        <p>{{djokica}}</p>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Approved by</th>
              <th scope="col">Zadatak</th>
              <th scope="col">Vreme zadavanja zadatka</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-info" v-for="zadatak in user_load" v-bind:key="zadatak._id">
              <th scope="row">{{zadatak.approved_by}}</th>
              <td>{{zadatak.program}}</td>
              <td>{{zadatak.vreme}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
const API = "http://localhost:5000/auth/main";
const API_USER = "http://localhost:5000/auth/register/";
const API_TERETANA = "http://localhost:5000/auth/teretana/";

export default {
  data() {
    return {
      user: null,
      admin: false,
      user_load: [],
      picture: "",
      djokica: ""
    };
  },
  name: "MainPage",
  computed: {
    // main call
    // register get po user_id-u koji sam ubacio u localStoridge a vracam nazad ime!
    //uz pomoc imena iz prethodnog poziva dobavljam podatke iz teretana tabele
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
    onloadFunc() {}
  },

  mounted() {
    fetch(API_USER + localStorage.user_id, {
      method: "GET",
      headers: {
        token: localStorage.token
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result) {
          this.user = result;
          this.user_load = result.domaci;

          if (result.username === "admin@admin.net") {
            this.admin = true;
            localStorage.admin = true;
            // localStorage.user_id = result._id;
            localStorage.username = result.username;
          } else {
            localStorage.user_id = result._id;
            localStorage.username = result.username;
          }
          if (result.file_path) {
            const test = result.file_path;
            const a = test.replace(/\\/g, "/");
            const testPic = a.split("/")[2];
            this.picture = "http://localhost:5000/" + testPic;
          } else {
            this.djokica = "Djokica...nemas sliku..";
          }
        } else {
          this.logout();
        }
      });
  }
};
</script>


<style scoped>
/* #nav {
  padding: 30px;
} */

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
.nav-tabs .nav-item.show .nav-link {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}
</style>
