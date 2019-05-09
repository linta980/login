<template>
  <div>
    <router-link to="/main">Home</router-link>|
    <router-link :to="{name:'About'}">About</router-link>|
    <router-link :to="{name:'Vreme'}">Vreme</router-link>|
    <router-link to="/admin" v-if="admin">Admin |</router-link>
    <a @click="logout">Logout</a>

    <br>

    <h1 v-if="!user">Jos nema usera..</h1>
    <h1 v-if="user">Hello {{user.username}}, this is Main page</h1>
    <br>
    <div style="position:relative; float:left;">
      <img src="../images/zen-planner-fit.png" alt srcset width="400px" height="400px">
    </div>
    <div style="position:relative; float:left; width:600px; height:400px; margin-left:10px;">
      <table class="table table-hover" >
        <thead>
          <tr>
            <th scope="col">Approved by</th>
            <th scope="col">Zadatak</th>
            <th scope="col">Trener</th>
            <th scope="col">Vreme zadavanja zadatka</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-active" v-for="zadatak in user_load" :key="zadatak">
            <th scope="row">{{zadatak.approved_by}}</th>
            <td>{{zadatak.domaci}}</td>
            <td>{{zadatak.trener}}</td>
            <td>{{zadatak.vreme}}</td>
          </tr>
          
        </tbody>
      </table>
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
      user_load:[]
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
            localStorage.admin = true;
          }
          fetch(API_USER + `${result.user._id}`, {
            method: "GET",
            headers: {
              token: localStorage.token
            }
          }).then(res => res.json())
          .then(result => {
            if(result){
              fetch(API_TERETANA +`${result.ime}`,{
                method:'GET',
                headers:{
                  token:localStorage.token
                }
              }).then(res =>res.json())
              .then(result =>{
                this.user_load=result;
              })
            }
          })
            
          
        } else {
          this.logout();
        }
      });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
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
