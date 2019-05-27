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
      {{currentTime}}
      <ul>
        <li
          v-for="img in images"
          :key="img.img_id"
          style="position:relative; float:left; margin:10px 10px 10px 10px; list-style-type: none; "
        >
          <img v-bind:src="'http://localhost:5000/'+img.file_path" v-on:click="uvecajSliku(img.file_path)">

          <!-- The Modal -->
          <div id="myModal" class="modal">
            <!-- The Close Button -->
            <span class="close" v-on:click="zatvoriSLiku">&times;</span>

            <!-- Modal Content (The Image) -->
            <img
              class="modal-content"
              id="img01"
              v-bind:src="'http://localhost:5000/'+contemporary"
            >

            <!-- Modal Caption (Image Text) -->
            <div id="caption">{{img.ime_slike}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      currentTime: undefined,
      images: [],
      admin: false,
      contemporary: null
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
    load() {
      if (localStorage.token != null) {
        axios.get("http://localhost:5000/auth/test").then(res => {
          this.images = res.data;
        });
      } else {
        logout();
      }
    },
    uvecajSliku(file_path) {
      this.contemporary = file_path;
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      
    },
    zatvoriSLiku() {
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
    
  },
  cron: {
    time: 60000,
    method: "load"
  },
  mounted() {
    if (localStorage.token != null) {
      axios.get("http://localhost:5000/auth/test").then(res => {
        this.images = res.data;
      });
    } else {
      logout();
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
#slika {
  background-color: #42b983;
  width: 50;
  height: 50px;
}

/* Style the Image Used to Trigger the Modal */
#myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

#myImg:hover {
  opacity: 0.7;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

/* Modal Content (Image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}

/* Caption of Modal Image (Image Text) - Same Width as the Image */
#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

/* Add Animation - Zoom in the Modal */
.modal-content,
#caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* The Close Button */
.close {
  position: relative;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
}
</style>

