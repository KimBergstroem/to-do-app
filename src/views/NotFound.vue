<template>
  <div class="container">
    <div class="d-flex justify-content-center flex-column align-items-center">
      <h1>Not Found</h1>
      <p>
        Oops, we couldn't find that page. Try going
        <router-link to="/">HOME</router-link>
        or checking your URL for any errors.
      </p>
    </div>
  </div>
</template>

<style scoped>
a {
  color: var(--custom-color-brand);
  text-decoration: underline;
}
</style>
