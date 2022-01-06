<template>
  <div class="">
    <section class="container pt-5 mt-3">
      <div class="card">
        <div class="card-body">
          <div class="row mt-3">
            <div class="col-12">
              <label class="text-capitalize" for="role">role</label>
              <select id="" v-model="role" class="form-control" name="">
                <option value="employee">Employee</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-12">
              <label class="text-capitalize" for="name">name</label>
              <input
                id="name"
                v-model="name"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <label class="text-capitalize" for="username">username</label>
              <input
                id="username"
                v-model="username"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <label class="text-capitalize" for="password">password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <label class="text-capitalize" for="phone">phone</label>
              <input
                id="phone"
                v-model="phone"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12 d-flex justify-content-end">
              <button class="btn btn-danger mr-3" @click="deleteusers">
                <i class="bi bi-trash mr-1"></i> Delete
              </button>
              <button class="btn btn-success" @click="edit">
                <i class="bi bi-save mr-1"></i> Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  password: 'UserDetails',
  layout: 'default',

  data() {
    return {
      id: '',
      role: '',
      username: '',
      name: '',
      password: '',
      phone: '',
    }
  },

  beforeMount() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    } else {
      this.getusers()
    }
  },
  methods: {
    async getusers() {
      const { id } = this.$route.params

      const { status, data } = await this.$axios.get(`/users/${id}`)
      if (status === 200) {
        this.id = data.id
        this.role = data.role
        this.username = data.username
        this.name = data.name
        this.password = data.password
        this.phone = data.phone
      }
    },
    async edit() {
      const payload = {
        id: this.id,
        role: this.role,
        username: this.username,
        name: this.name,
        password: this.password,
        phone: this.phone,
      }
      const { status } = await this.$axios.put(`/users`, payload)
      if (status === 200) {
        this.$router.push('/users')
      }
    },
    async deleteusers() {
      const { id } = this.$route.params
      const { status } = await this.$axios.delete(`/users/${id}`)
      if (status === 200) {
        this.$router.push('/users')
      }
    },
  },
}
</script>

<style lang="scss"></style>
