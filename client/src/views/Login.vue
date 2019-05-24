<template>
  <div id="forma" @submit.prevent="ulogujSe">
    <!-- <LoginModal v-bind:login="login"/> -->

    <form>
      <p v-if="login">Kurcinaaaa! HA HA kretenu!</p>
      <fieldset>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            v-model="username"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
        <p id="link">
          <a href="/register">Register</a>
        </p>
      </fieldset>
    </form>
  </div>
</template>


<script>
const API = "http://localhost:5000/auth/login";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      login: false
    };
  },
  methods: {
    async ulogujSe() {
      const telo = {
        username: this.username,
        password: this.password
      };
      fetch(API, {
        method: "POST",
        body: JSON.stringify(telo),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 422) {
            this.login = true;
          }
          return response.json().then(error => {
            throw new Error(error.message);
          });
        })
        .then(data => {
          localStorage.token = data.token;
          localStorage.user_id=data.user_id
          this.$router.push("/main");
        });
    }
  }
};
</script>


<style scoped>
#forma {
  widows: 400px;
  margin: 0px 40%;
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


