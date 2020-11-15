<template>
  <router-link
    :to="`/docs/${category.toLowerCase()}/${sub_category.name
      .replace('IK3_', '')
      .toLowerCase()}/1`"
  >
    <button
      ref="btnRef"
      v-on:mouseenter="toggleTooltip()"
      v-on:mouseleave="toggleTooltip()"
      class="bg-green-500 text-white active:bg-green-600 uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
      type="button"
      style="transition: all 0.15s ease"
    >
      {{ sub_category.name }}
    </button>
  </router-link>
  <div
    ref="tooltipRef"
    v-bind:class="{ hidden: !tooltipShow, block: tooltipShow }"
    class="bg-green-600 border-0 mt-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
  >
    <div>
      <div
        class="bg-green-600 text-white p-3 mb-0 border-b border-dotted border-gray-200 uppercase rounded"
      >
        {{ sub_category.name }}
      </div>
      <div class="text-white p-2 bg-white text-gray-900 shadow">
        Lot's information about
        <span class="font-semibold"
          >{{ sub_category.name.toLowerCase() }}
        </span>
        click the button to learn more.
      </div>
    </div>
  </div>
</template>

<script>
import Popper from "popper.js";

export default {
  name: "bottom-green-tooltip",
  data() {
    return {
      tooltipShow: false,
    };
  },
  props: {
    category: String,
    sub_category: {
      require: true,
    },
  },
  methods: {
    toggleTooltip: function () {
      if (this.tooltipShow) {
        this.tooltipShow = false;
      } else {
        this.tooltipShow = true;
        new Popper(this.$refs.btnRef, this.$refs.tooltipRef, {
          placement: "bottom",
        });
      }
    },
  },
};
</script>