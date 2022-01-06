<template>
  <div class="">
    <section class="container pt-5 mt-3">
      <div class="card">
        <div class="card-body">
          <div class="row mt-3">
            <div class="col-12">
              <label class="text-capitalize" for="fullAdress">fullAdress</label>
              <input
                id="fullAdress"
                v-model="fullAdress"
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
                v-model="latitude"
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
                v-model="longitude"
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
                v-model="name"
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
                v-model="phone"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12 d-flex justify-content-end">
              <button class="btn btn-danger mr-3" @click="deleteBranch">
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
  name: 'BranchDetails',
  layout: 'default',

  data() {
    return {
      branchId: '',
      fullAdress: '',
      latitude: '',
      longitude: '',
      name: '',
      phone: '',
    }
  },

  beforeMount() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    } else {
      this.getBranch()
    }
  },
  methods: {
    async getBranch() {
      const { id } = this.$route.params

      const { status, data } = await this.$axios.get(`/branch/${id}`)
      if (status === 200) {
        this.branchId = data.branchId
        this.fullAdress = data.fullAdress
        this.latitude = data.latitude
        this.longitude = data.longitude
        this.name = data.name
        this.phone = data.phone
      }
    },
    async edit() {
      const payload = {
        branchId: this.branchId,
        fullAdress: this.fullAdress,
        latitude: this.latitude,
        longitude: this.longitude,
        name: this.name,
        phone: this.phone,
      }
      const { status } = await this.$axios.put(`/branch`, payload)
      if (status === 200) {
        this.$router.push('/')
      }
    },
    async deleteBranch() {
      const { id } = this.$route.params
      const { status } = await this.$axios.delete(`/branch/${id}`)
      if (status === 200) {
        this.$router.push('/')
      }
    },
  },
}
</script>

<style lang="scss"></style>
