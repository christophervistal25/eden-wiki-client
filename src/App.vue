<template>
  <div class="md:flex flex-col md:flex-row md:min-h-screen w-auto bg-gray-200">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  components: {},
  methods: {},
};
</script>

<style>
</style>
