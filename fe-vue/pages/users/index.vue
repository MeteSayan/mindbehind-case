<template>
  <div>
    <section v-if="user.role === 'owner'" class="container mt-5">
      <div class="d-flex justify-content-end">
        <button class="btn btn-success" @click="newusersModal = true">
          <i class="bi bi-plus"></i>Add New users
        </button>
      </div>
    </section>
    <section class="container">
      <div v-for="item in userss" :key="item.id" class="row mt-3">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between">
              <h3>
                {{ item.name }}
              </h3>
              <button
                v-if="user.role === 'owner'"
                class="btn btn-info"
                @click="routeDetails(item.id)"
              >
                Edit
              </button>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  {{ item.username }}
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  {{ item.role }}
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  {{ item.phone }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal v-model="newusersModal" title="Add New users" @ok="newusers">
      <div class="row mt-3">
        <div class="col-12">
          <label class="text-capitalize" for="name">name</label>
          <input
            id="fullAdress"
            v-model="newData.name"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <label class="text-capitalize" for="phone">phone</label>
          <input
            id="latitude"
            v-model="newData.phone"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <label class="text-capitalize" for="username">username</label>
          <input
            id="longitude"
            v-model="newData.username"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <label class="text-capitalize" for="password">password</label>
          <input
            id="name"
            v-model="newData.password"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <label class="text-capitalize" for="role">role</label>
          <select id="" v-model="newData.role" class="form-control" name="">
            <option value="employee">Employee</option>
            <option value="owner">Owner</option>
          </select>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'UserPages',
  layout: 'default',
  data() {
    return {
      user: {},
      userss: [],
      newusersModal: false,
      newData: {
        name: '',
        phone: '',
        username: '',
        password: '',
        role: '',
      },
    }
  },
  computed: {},
  beforeMount() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    } else {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.getAllusers()
    }
  },
  methods: {
    routeDetails(id) {
      this.$router.push('/users/' + id)
    },
    async getAllusers() {
      const { status, data } = await this.$axios.get(`/users`)
      if (status === 200) {
        this.userss = data
      }
    },
    async newusers() {
      const { status } = await this.$axios.post(`/users`, this.newData)
      if (status === 201) {
        this.getAllusers()
        this.newusersModal = false
      }
    },
  },
}
</script>
<style scoped lang="scss"></style>
