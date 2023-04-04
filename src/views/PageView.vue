<script>
import router from "../router";

export default {
  data() {
    return {
      path: '/api/pages',
      page: {}
    }
  },
  mounted() {
    this.getPage();
  },
  methods: {
    getPage() {
      const uri = this.baseUri + this.path + '/' + this.$route.params.id;
      this.fetchWithAuth(uri, {
        method: 'GET'
      })
          .then((response) => {
            return response.json()
          })
          .then((page) => {
            this.page = page;
          })
    }
  }
}
</script>

<template>
  <div class="page">
    <h1>{{ page.title }}</h1>
    <p>{{ page.content }}</p>
  </div>
</template>

<style>

</style>
