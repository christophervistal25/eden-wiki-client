<template>

<div class="md:flex flex-col md:flex-row md:min-h-screen w-auto bg-gray-200">

  <sidebar></sidebar>
  <router-view/>
</div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'
  export default {
    data() {
      return {
        open : false
      }
    },
    components : {
      Sidebar,
    },
    methods : {
    
    }
  }
</script>

<style>

</style>
