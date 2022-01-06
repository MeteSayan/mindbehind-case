<template>
  <div>
    <HeaderComp />
    <nuxt />
    <FooterComp />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      token: null,
    }
  },
  async beforeMount() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    } else {
      await this.$axios.setToken(localStorage.getItem('token'), 'Bearer')
    }
  },
}
</script>

<style></style>
