<template>
  <header class="shadow bg-dark text-white">
    <div class="container">
      <div class="row" style="max-height: 100px">
        <div class="col-6 logo">
          <!-- Logo -->
          <nuxt-link class="" to="/">
            <h3 class="text-white mt-3">Logo</h3>
          </nuxt-link>
        </div>
        <div
          class="col-6 justify-content-end menu text-white d-flex align-items-center"
        >
          <!-- menu -->
          <nuxt-link class="menu-item" to="/">Branch</nuxt-link>
          <nuxt-link v-if="user.role === 'owner'" class="menu-item" to="/users"
            >User</nuxt-link
          >
          <button class="menu-item" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComp',
  data() {
    return {
      user: {},
    }
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>

<style>
button {
  background-color: #444c55;
  border-radius: 0px;
  transition-duration: 0.25s;
}
</style>
