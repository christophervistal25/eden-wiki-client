<template>
  <div>
    <div
      class="pagination__parent bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    >
      <div class="flex-1 flex justify-between sm:hidden">
        <a
          @click="previous"
          href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          Previous
        </a>
        <a
          @click="next"
          href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          Next
        </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm leading-5 text-gray-700">
            Showing
            <span class="font-medium">{{ page }}</span>
            to
            <span class="font-medium">{{ no_of_items }}</span>
            of
            <span class="font-medium">{{ total_items }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex shadow-sm">
            <a
              style="cursor: pointer"
              @click="previous"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Previous"
            >
              <!-- Heroicon name: chevron-left -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <div v-if="no_of_items <= no_of_display">
              <a
                v-for="(count, i) in no_of_items"
                v-bind:key="i"
                style="cursor: pointer"
                @click="go(count)"
                :class="count == page ? 'bg-gray-300' : ''"
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                {{ count }}
              </a>
            </div>
            <div v-else>
              <!-- v-if="count >= page" -->
              <span v-for="(count, i) in no_of_display" v-bind:key="i">
                <a
                  style="cursor: pointer"
                  @click="go(count)"
                  :class="count == page ? 'bg-gray-300' : ''"
                  class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                >
                  {{ count }}
                </a>
              </span>

              <a
                style="cursor: pointer"
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                ...
              </a>

              <a
                style="cursor: pointer"
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                {{ no_of_items }}
              </a>
            </div>

            <a
              style="cursor: pointer"
              @click="next"
              class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Next"
            >
              <!-- Heroicon name: chevron-right -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    no_of_items: {
      type: Number,
      required: true,
    },
    main: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    total_items: {
      required: true,
    },
    page: {
      required: true,
    },
    previous_link: {
      required: true,
    },
    next_link: {
      required: true,
    },
  },
  data() {
    return {
      no_of_display: 10,
    };
  },
  watch: {
    page(pageNumber) {
      this.get(pageNumber);
    },
  },
  methods: {
    get(page) {
      axios
        .get(`item/${this.main}/${this.type}/${page}`)
        .then((response) => this.$emit("on-data-changed", response.data));
    },
    go(page) {
      this.$router.push(`/docs/${this.main}/${this.type}/${page}`);
    },
    next() {
      if (this.next_link != null) {
        let link = this.next_link.replace("item", "docs");
        this.$router.push(`/${link}`);
      }
    },
    previous() {
      if (this.previous_link != null) {
        let link = this.previous_link.replace("item", "docs");
        this.$router.push(`/${link}`);
      }
    },
  },
  created() {
    // this.no_of_display = 9;
    // let calculation = parseInt(this.no_of_display) + parseInt(this.page);
    // if (calculation <= this.no_of_items) {
    //   this.no_of_display = calculation;
    // }
  },
};
</script>
<style scoped>
.pagination__parent {
  width: 50vw;
}

pointer__cursor {
  cursor: pointer;
}
</style>