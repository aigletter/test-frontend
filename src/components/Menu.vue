<template>
    <ul class="nav">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/pages" class="nav-link">Pages</RouterLink>
      </li>
    </ul>

    <RouterView />
</template>