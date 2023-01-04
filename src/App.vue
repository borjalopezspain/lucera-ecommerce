<template>
  <div id="app">
    <Header />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
<style lang="scss" src="./styles/main.scss"/>
