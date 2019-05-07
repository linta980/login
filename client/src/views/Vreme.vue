<template>
  <div>
    <router-link to="/main">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <router-link to>Vreme</router-link>|
    <a @click="logout">Logout</a>

    <div class="content">
      <div v-if="temperature" id="content">
        <div class="title">
          <h2>Vreme u Beogradu</h2>
          <span class="byline">
            Trenutna temperatura je :
            <b>{{temperature.main.temp}} &#8451;</b>
          </span>
          <span class="byline">
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
          </span>
          <span class="byline">
            Stanje na nebu :
            <b>{{temperature.weather[0].main}} ;</b>
          </span>
        </div>
      </div>
      <div v-else>loading weather data...</div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Vreme",
  data() {
    return {
      temperature: null
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
