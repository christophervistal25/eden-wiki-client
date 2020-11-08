<template>
  <div class="about">
    <h1>Display the value of variable : {{ increment }}</h1>
    <p>
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Click me!
      </button>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      increment: 0,
    };
  },
  props: {},
  methods: {},
};
</script>
