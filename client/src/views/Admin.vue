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
      <h1>{{message}}</h1>
      <div style="widows: 400px; margin: 0px 40%;">
        <p>Zadaj stoki sta da radi</p>
        <div class="form-group">
          <label for="exampleSelect1"></label>
          <select class="form-control" id="exampleSelect1" v-if="useri" v-model="trener">
            <option
              v-for="us in useri"
              v-bind:key="us.trener"
              v-bind:value="us.username"
            >{{us.trener}}</option>
          </select>
          <label for="exampleSelect1">{{trener}}</label>
        </div>
        <div class="form-group">
          <label for="exampleTextarea">Zadaj Domaci</label>
          <textarea class="form-control" id="exampleTextarea" rows="3" v-model="domaci"></textarea>
        </div>
        <button type="submit" v-on:click="posalji_podatke" class="btn btn-primary">Posalji</button>
      </div>
    </div>
  </div>
</template>


<script>
const API_GET_USERS = "http://localhost:5000/auth/register";
const API_ADMIN = "http://localhost:5000/auth/admin";

export default {
  name: "Admin",
  data() {
    return {
      message: "Gde si Brate Admine",
      useri: [],
      trener: null,
      domaci: null,
      vreme: new Date(),
      approved_by: "admin",
      trener_username: "",
      choiceText: "",
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
    posalji_podatke() {
      const telo = {
        trener: this.trener,
        domaci: this.domaci,
        vreme: this.vreme,
        approved_by: this.approved_by
      };
      console.log(telo);
      fetch(API_ADMIN, {
        method: "POST",
        body: JSON.stringify(telo),
        headers: {
          "Content-type": "application/json",
          token: localStorage.token
        }
      }).then(result => result.json());
      this.trener = "";
      this.domaci = "";
    },

    getText() {
      var values = this.useri.map(function(o) {
        return o.value;
      });
      // console.log(values)
      var index = values.indexOf(this.trener);
      this.choiceText = this.useri[index].text;
    }
  },
  mounted() {
    fetch(API_GET_USERS, {
      headers: {
        token: localStorage.token
      }
    })
      .then(result => result.json())
      .then(res => {
        res.forEach(element => {
          console.log(element.ime);
          this.useri.push({ trener: element.ime, username: element.username });
        });
      });

    if ((localStorage.admin = true)) {
      this.admin = true;
    }
  }
};
</script>

// -4 serije po 50 trbusnjaka
// - 3 serije Noge 
// -4 serije mrtvo dizanje





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