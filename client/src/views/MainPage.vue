/<template>
  <div id="container">
    <div class="page-header">
      <router-link to="/main"> Home </router-link>|
      <router-link :to="{name:'About'}"> About </router-link>|
      <router-link :to="{name:'Vreme'}"> Vreme </router-link>|
      <router-link to="/admin" v-if="admin"> Admin |</router-link>
      <router-link :to="{name:'Profile'}"> Profile |</router-link>
      <router-link :to="{name:'Test'}"> Galerija |</router-link>
      <a @click="logout"> Logout</a>
    </div>

    <h1 v-if="!user">Jos nema usera..</h1>

    <div class="jumbotron">
      <h1 v-if="user" style>Hello {{user.username}}, this is Main page</h1>

      <hr class="my-4">
      <div v-if="picture">
        <!-- <img src="../../../server/public/uploads/file-1557992513767ja.png" alt="slika" height="200" width="200"> -->
        <img v-bind:src="picture" alt="slika" height="200" width="200">
      </div>
      <div v-else id="djokica">
        <p>{{djokica}}</p>
      </div>
      <div>
        <table class="table table-hover" style="margin-top:20px;">
          <thead>
            <tr>
              <th scope="col">Approved by</th>
              <th scope="col">Zadatak</th>
              <th scope="col">Vreme zadavanja zadatka</th>
            </tr>
          </thead>
          <tbody>
            <!-- MOram da stavim ovde za v-bind:key = "zadatak._id" , ako stavim zadatak dobijam gresku koja kaze da ne mogu da bindujem 
            da mi key bude isto sto i zadatak u user_load-->
            <tr class="table-active" v-for="zadatak in user_load" v-bind:key="zadatak._id">
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
