<template>
  <div id="forma">
    <h1>Hello this is register page</h1>
    <form @submit.prevent="registrujSe">
      <fieldset>
        <div class="form-group">
          <label for="exampleInputEmail1">Ime</label>
          <input
            v-model="ime"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Prezime</label>
          <input v-model="prezime" type="text" class="form-control" id="exampleInputPassword1">
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Adresa</label>
          <input v-model="adresa" type="text" class="form-control" id="exampleInputPassword1">
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Broj telefona</label>
          <input
            v-model="broj_telefona"
            type="text"
            class="form-control"
            id="exampleInputPassword1"
          >
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">username</label>
          <input v-model="username" type="email" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link to="/login" style="margin-left:30px;">Login</router-link>
      </fieldset>
    </form>
  </div>
</template>


<script>
const API = "http://localhost:5000/auth/register";

export default {
  name: "Register",
  data() {
    return {
      ime: "aca",
      prezime: "acic",
      adresa: "5 Savska",
      broj_telefona: "041/688472",
      username: "aca@aca.net",
      password: "123"
    };
  },
  methods: {
    registrujSe() {
      const telo = {
        ime: this.ime,
        prezime: this.prezime,
        adresa: this.adresa,
        broj_telefona: this.broj_telefona,
        username: this.username,
        password: this.password
      };
      return fetch(API, {
        method: "POST",
        body: JSON.stringify(telo),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => {
          console.log(response);
          (this.ime = ""),
            (this.prezime = ""),
            (this.adresa = ""),
            (this.broj_telefona = ""),
            (this.username = ""),
            (this.password = "");
          if (response.error === null || response.status != 406) {
            this.$router.push("/main");
          } else {
            console.log("Izduvao si ga buraz..");
          }
        })
        .catch();
    }
  }
};
</script>


<style scoped>
#forma {
  widows: 400px;
  margin: 0px 25%;
}
#link {
  position: relative;
  float: right;
}
fieldset {
  padding: 30px;
  background-color: coral;
  border-radius: 20px;
}
</style>
