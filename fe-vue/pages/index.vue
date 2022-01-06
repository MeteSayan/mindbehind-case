<template>
  <div>
    <section v-if="user.role === 'owner'" class="container mt-5">
      <div class="d-flex justify-content-end">
        <button class="btn btn-success" @click="newBranchModal = true">
          <i class="bi bi-plus"></i>Add New Branch
        </button>
      </div>
    </section>
    <section class="container">
      <div v-for="item in branchs" :key="item.branchId" class="row mt-3">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between">
              <h3>
                {{ item.name }}
              </h3>
              <button
                v-if="user.role === 'owner'"
                class="btn btn-info"
                @click="routeDetails(item.branchId)"
              >
                Edit
              </button>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  {{ item.fullAdress }}
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  {{ item.latitude }}
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  {{ item.longitude }}
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
    <b-modal v-model="newBranchModal" title="Add New Branch" @ok="newBranch">
      <div class="row mt-3">
        <div class="col-12">
          <label class="text-capitalize" for="fullAdress">fullAdress</label>
          <input
            id="fullAdress"
            v-model="newData.fullAdress"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <label class="text-capitalize" for="latitude">latitude</label>
          <input
            id="latitude"
            v-model="newData.latitude"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <label class="text-capitalize" for="longitude">longitude</label>
          <input
            id="longitude"
            v-model="newData.longitude"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <label class="text-capitalize" for="name">name</label>
          <input
            id="name"
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
            id="phone"
            v-model="newData.phone"
            type="text"
            class="form-control"
          />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',
  data() {
    return {
      user: {},
      branchs: [],
      newBranchModal: false,
      newData: {
        fullAdress: '',
        latitude: '',
        longitude: '',
        name: '',
        phone: '',
      },
    }
  },
  computed: {},
  beforeMount() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    } else {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.getAllBranch()
    }
  },
  methods: {
    routeDetails(id) {
      this.$router.push('/detail/' + id)
    },
    async getAllBranch() {
      const { status, data } = await this.$axios.get(`/branch/all-branch`)
      if (status === 200) {
        this.branchs = data
      }
    },
    async newBranch() {
      const { status } = await this.$axios.post(`/branch`, this.newData)
      if (status === 201) {
        this.getAllBranch()
        this.newBranchModal = false
      }
    },
  },
}
</script>
<style scoped lang="scss"></style>
