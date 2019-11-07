<template>
  <div class="github">
    <nav class="navbar navbar-dark bg-primary mb-3">
      <div class="container">
        <a href="#" class="navbar-brand">Github Finder</a>
      </div>
    </nav>

    <div  class="container searchContainer">
      <div class="search card card-body">
        <h1>Search Github Users</h1>
        <p class="lead">Enter a username to fetch a user profile and repos</p>
         <input type="text" id="searchUser" class="form-control" placeholder="Github Username" @keyup="searchUser" v-model="searchValue">
         
         <p class="text-danger" v-if="feedback">{{ feedback }}</p>
      </div>
      <br>
      <div id="profile">
        
        <div class="card card-body mb-3">

          <div class="row">
            <div class="col-md-3">
              <img class="img-fluid mb-2"  :src="users.avatar_url" >
              <a v-bind:href="users.html_url" class="btn btn-primary btn-block mb-4 text-white profiles">View Profile</a>
            </div> 
            <div class="col-md-9">
              <span class="badge badge-primary">Public Repos: {{ users.public_repos }}</span>
              <span class="badge badge-secondary">Public Gist: {{ users.public_gists }}</span>
              <span class="badge badge-success">Followers: {{ users.followers }}</span>
              <span class="badge badge-info">Following: {{ users.following }}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: {{ users.company }}</li>
                <li class="list-group-item">Website/Blog: {{ users.blog }}</li>
                <li class="list-group-item">Location: {{ users.location }}</li>
                <li class="list-group-item">Member since: {{ users.created_at }}</li>
              </ul>
            </div>
          </div>
       </div>
    </div>

        <!-- Repositories -->
       <div id="repos">
          <h3 class="page-heading mb-3">Latest Repositories</h3>
          <div class="card card-body mb-2">
            <div v-for="repo in users_repos" :key="repo.id" class="row">
              <div class="col-md-6">
                <ul class="list-group">
                   <li class="list-group-item"> <a v-bind:href="repo.html_url">{{ repo.name }}</a></li>
                 </ul>
              </div>
              <div class="col-md-6">
                  <span class="badge badge-primary">Stars: {{ repo.stargazers_count }}</span>
                  <span class="badge badge-secondary">Watchers: {{ repo.watchers_count }}</span>
                  <span class="badge badge-success">Forks: {{ repo.forms_count }}</span>
              </div>
            </div>
          </div>
       </div>
    </div>
    
    <footer class="mt-5 p-3 text-center bg-light">Github Finder &copy;</footer>
  </div> 
</template>

<script>
import axios from 'axios'
const client_id = 'd4b547dea1bbb8fa7433'
const client_secret = '59bbc1c3f975e598de08746b3ba4e7c031e2b787'
export default {
  name: 'Github',
  data () {
    return {
      searchValue: null,
      users: [],
      users_repos: [],
      feedback: null,
      repos_count: 5,
      repos_sort: 'created: asc'
    }
  },
  methods: {
   async searchUser(){
     if(this.searchValue){
      let one = `https://api.github.com/users/${this.searchValue}?client_id=${client_id}&client_secret=${client_secret}`
      let two = `https://api.github.com/users/${this.searchValue}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${client_id}&client_secret=${client_secret}`

      let requestOne = axios.get(one)
      let requestTwo = axios.get(two)

      axios.all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
    
          let responseOne = responses[0]
          let responseTwo = responses[1]
          
          this.users = responseOne.data
          this.users_repos = responseTwo.data

      })
        )
      .catch(error => {
        this.feedback = 'Users not found'
        setTimeout(() => {
          this.feedback = null
        }, 2000);
      })
   } else {
     this.users = []
   }
  }

  }
}
</script>


<style scoped>
.profiles{
  cursor: pointer;
}
</style>
