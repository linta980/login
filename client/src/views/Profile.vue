<template>
  <div id="container">
    <div class="page-header">
      <router-link to="/main"> Home </router-link>|
      <router-link :to="{name:'About'}"> About </router-link>|
      <router-link :to="{name:'Vreme'}"> Vreme </router-link>|
      <router-link to="/admin" v-if="admin"> Admin |</router-link>
      <router-link :to="{name:'Profile'}"> Profile |</router-link>
      <router-link :to="{name:'Test'}"> Galerija |</router-link>
      <a @click="logout"> Logout</a>

      <fieldset id="field">
        <br>
        <br>
        <h5>Upload Picture</h5>
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
          <legend>LIcna pitanja za {{user}}</legend>
          <div class="form-group">
            <div class="custom-control custom-radio">
              <input
                type="radio"
                id="customRadio1"
                name="customRadio"
                class="custom-control-input"
                checked
              >
              <label class="custom-control-label" for="customRadio1">Toggle this custom radio</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
              <label
                class="custom-control-label"
                for="customRadio2"
              >Or toggle this other custom radio</label>
            </div>
            <div class="custom-control custom-radio">
              <input
                type="radio"
                id="customRadio3"
                name="customRadio"
                class="custom-control-input"
                disabled
              >
              <label class="custom-control-label" for="customRadio3">Disabled custom radio</label>
            </div>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="customCheck1" checked>
              <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="customCheck2" disabled>
              <label class="custom-control-label" for="customCheck2">Disabled custom checkbox</label>
            </div>
          </div>
          <div class="form-group">
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="customSwitch1" checked>
              <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
            </div>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" disabled id="customSwitch2">
              <label class="custom-control-label" for="customSwitch2">Disabled switch element</label>
            </div>
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
      user: ""
    };
  },
  mounted() {
    if (localStorage.getItem("admin")) {
      this.admin = true;
      this.user = localStorage.ime;
    }
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
      } catch (error) {
        console.log(error);
      }
    },
    handelFileUpload() {
      this.file = this.$refs.file.files[0];
      this.file_selected = true;
      console.log(this.file.name);
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
