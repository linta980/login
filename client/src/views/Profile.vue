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
      <fieldset id="field">
        <br>
        <br>
        <div class="alert alert-success" role="alert" v-if="promena_slike">
          <strong>Paznjica!</strong> Slika je promenjena klosarau
        </div>
        <div class="form-group">
          <div class="input-group mb-3">
            <form enctype="multipart/form-data" @submit.prevent="poslji_sliku">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile02"
                v-on:change="handelFileUpload()"
                ref="file"
                name="sampleFile"
              >
              <label class="custom-file-label" for="inputGroupFile02">{{file.name}}</label>

              <div style="margin:20px 30%;" v-if="file_selected">
                <button style="width:200px; color:red; background-color:yellow;">Upload</button>
              </div>
            </form>
          </div>
        </div>

        <fieldset>
          <legend>Licna pitanja za {{user}}</legend>

          <label for style="text-align:left">Ozenjen/a</label>
          <ul style="text-align:left">
            <li style="list-style-type: none; ">
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  id="customRadio1"
                  name="customRadio"
                  class="custom-control-input"
                >
                <label class="custom-control-label" for="customRadio1">Ozenjen</label>
              </div>
            </li>
            <li style="list-style-type: none; ">
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  id="customRadio2"
                  name="customRadio"
                  class="custom-control-input"
                >
                <label class="custom-control-label" for="customRadio2">Neozenjen</label>
              </div>
            </li>
          </ul>

          <label for>Broj dece</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Dropdown</button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
              </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with dropdown button">
          </div>
        </fieldset>
      </fieldset>
    </div>
  </div>
</template>



<script>
const API_FILE = "http://localhost:5000/auth/upload";
import axios from "axios";

export default {
  name: "Vreme",
  data() {
    return {
      temperature: null,
      admin: false,
      file: "",
      file_selected: false,
      user: "",
      promena_slike: false
    };
  },
  mounted() {
    if (localStorage.getItem("admin")) {
      this.admin = true;
    }
    this.user = localStorage.username;
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
    async poslji_sliku() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("token", localStorage.token);
      formData.append("username", localStorage.username);
      try {
        await axios.post(API_FILE, formData);
        this.file_selected = false;
        this.file = "";
        this.promena_slike = true;
      } catch (error) {
        console.log(error);
      }
    },
    handelFileUpload() {
      this.file = this.$refs.file.files[0];
      this.file_selected = true;
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
#field {
  margin: 0 550px;
}
.form-group {
  text-align: left;
}
</style>
