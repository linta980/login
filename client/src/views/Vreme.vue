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

    <div class="jumbotron">
      <div>
        <label for>Trenutno Vrmee : {{current_time}}</label>
      </div>
      <div v-if="temperature" id="content">
        <div class="title">
          <h2>Vreme u Beogradu</h2>
          <!-- <span class="byline">
            Trenutna temperatura je :
            <b>{{temperature.main.temp}} &#8451;</b>
          </span> -->

<div class="card-group">
  <div class="card">
    <div class="card-body">
      <h4 class="card-title"> Trenutna temperatura je :</h4>
      <p class="card-text">{{temperature.main.temp}} &#8451;</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Pritisak je :</h4>
      <p class="card-text">{{temperature.main.pressure}} mBar</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Brzina vetra je :</h4>
      <p class="card-text">{{temperature.wind.speed}} m/S</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title"> Stanje na nebu :</h4>
      <p class="card-text">{{temperature.weather[0].main}} </p>
    </div>
  </div>
</div>




          <!-- <span class="byline">
            Pritisak je :
            <b>{{temperature.main.pressure}} mBar</b>
          </span>
          <span class="byline">
            Vlaznost je :
            <b>{{temperature.main.humidity}} %;</b>
          </span>
          <span class="byline">
            Brzina vetra je :
            <b>{{temperature.wind.speed}} m/S;</b>
          </span> -->
          <!-- <span class="byline">
            Stanje na nebu :
            <b>{{temperature.weather[0].main}} ;</b>
          </span> -->
        </div>
      </div>
      <div v-else>
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <!-- <div v-else>loading weather data...</div> -->
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Vreme",
  data() {
    return {
      temperature: null,
      admin: false,
      current_time: null
    };
  },
  mounted() {
    if (localStorage.token != null) {
      setTimeout(() => {
        axios
          .get(
            "https://api.openweathermap.org/data/2.5/weather?q=Belgrade,Serbia&APPID=cb0aeb43b8923a51cfbda7edaf4ac7c6&units=metric"
          )
          .then(res => (this.temperature = res.data))
          .catch();
      }, 3000);
    } else {
      this.$router.push("/login");
    }
    if (localStorage.getItem("admin")) {
      this.admin = true;
    }
    this.current_time = new Date().toLocaleTimeString();
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
