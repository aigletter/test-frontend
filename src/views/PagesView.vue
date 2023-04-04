<script>
export default {
  data() {
    return {
      path: '/api/pages',
      pages: []
    }
  },
  mounted() {
    this.getPages();
  },
  methods: {
    getPages() {
      const uri = this.baseUri + this.path;
      this.fetchWithAuth(uri, {
        method: 'GET',
        //credentials: 'include',
      })
        .then((response) => {
          return response.json()
        })
        .then((pages) => {
          this.pages = pages;
        }
      )
    }
  }
}
</script>

<template>
  <div class="row">
    <div v-for="page in pages" class="col-3">
      <div class="card">
        <div class="card-title text-center">
          <h5>{{ page.title }}</h5>
        </div>
        <div class="card-body">
          <p class="card-text">
            {{ page.content }}
          </p>
          <div>
            <RouterLink :to="{name: 'pages.view', params: {id: page.id}}">View</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>