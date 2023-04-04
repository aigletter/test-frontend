<script>
export default {
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    send() {
      this.auth(this.login, this.password);
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-3">
      <form @submit="send" @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="login" class="form-label">Login</label>
          <input class="form-control" name="login" id="login" v-model="login">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" name="password" id="password" v-model="password">
        </div>
        <div class="mb-3">
          <button id="submit" type="submit" class="btn btn-primary">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>