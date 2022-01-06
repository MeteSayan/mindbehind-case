<template>
  <div class="container">
    <div class="d-flex justify-content-center mt-5">
      <div class="card">
        <div class="card-header text-center">Logo</div>
        <div class="card-body d-flex justify-content-center flex-column">
          <div class="row">
            <div class="col-12">
              <label for="user">Username</label>
              <input
                id="user"
                v-model="username"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <label for="pass">Password</label>
              <input
                id="pass"
                v-model="pass"
                type="password"
                class="form-control"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12 text-center">
              <button class="w-50 btn btn-primary" @click="login">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'LoginPage',
  layout: 'unAuth',
  data() {
    return {
      username: '',
      pass: '',
    }
  },
  methods: {
    async login() {
      const payload = {
        username: this.username,
        password: this.pass,
      }
      const { status, data } = await this.$axios.post(
        `authentication/login`,
        payload
      )
      if (status === 201) {
        await this.$axios.setToken(data.token, 'Bearer')
        localStorage.setItem('token', data.token)
        localStorage.setItem(
          'user',
          JSON.stringify(VueJwtDecode.decode(data.token))
        )
        this.$router.push('/')
      }
    },
  },
}
</script>

<style></style>
