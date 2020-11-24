<template>
  <div>
    <div
      class="bg-white px-4 py-3 flex flex-row items-center justify-between rounded shadow mb-2"
    >
      <div class="justify-between sm:hidden">
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
            <select class="px-5 border border-gray-300" @change="moveTo">
              <option
                :selected="page == item"
                v-for="(item, i) in no_of_items"
                :key="i"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
            <!-- <span class="font-medium">{{ page }}</span> -->
            to
            <span class="font-medium">{{ no_of_items }}</span>
            of
            <span class="font-medium">{{ total_items }}</span>
            results
          </p>
        </div>
        <div class="">
          <nav class="relative z-0 inline-flex shadow-sm">
            <a
              @click="previous"
              class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
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
                @click="go(count)"
                :class="count == page ? 'bg-gray-300' : ''"
                class="cursor-pointer -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                {{ count }}
              </a>
            </div>
            <div v-else>
              <!-- no_of_display < no_of_items - 1
                      ? count >= page
                      : count <= total_items &&
                        count >= no_of_items - 10 &&
                        count <= no_of_items -->
              <!-- !start.includes(parseInt(count)) &&
                    
                      ? count >= page
                      : count >= no_of_items - 4 && count <= no_of_items - 2 -->
              <span v-for="(c, k) in 2" v-bind:key="k">
                <a
                  @click="go(c)"
                  :class="c == page ? 'bg-gray-300' : ''"
                  class="cursor-pointer -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                >
                  {{ c }}
                </a>
              </span>

              <span class="mr-5"></span>

              <span v-for="(count, i) in no_of_items - 2" v-bind:key="i">
                <a
                  v-if="
                    ![1, 2].includes(parseInt(count)) &&
                    count >= parseInt(page) - 1 &&
                    count <= parseInt(page) + 4
                  "
                  @click="go(count)"
                  :class="count == page ? 'bg-gray-300' : ''"
                  class="cursor-pointer -ml-px relative inline-flex items-center px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                >
                  {{ count }}
                </a>
              </span>

              <span class="ml-5"></span>

              <span v-for="(c, z) in no_of_items" :key="z">
                <a
                  v-if="[no_of_items - 1, no_of_items].includes(parseInt(c))"
                  @click="go(c)"
                  :class="c == page ? 'bg-gray-300' : ''"
                  class="cursor-pointer -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                >
                  {{ c }}
                </a>
              </span>
            </div>

            <a
              @click="next()"
              class="cursor-pointer -ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
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
export default {
  props: {
    no_of_items: {
      required: true,
    },
    main: {
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
      no_of_display: 5,
    };
  },
  methods: {
    moveTo(e) {
      let page = e.target.value;
      this.$router.push(`/docs/${this.main}/${page}`);
    },
    go(page) {
      this.$router.push(`/docs/${this.main}/${page}`);
    },
    next() {
      if (this.next_link != null) {
        this.$router.push(`/docs/${this.main}/${this.next_link}`);
      }
    },
    previous() {
      if (this.previous_link != null) {
        this.$router.push(`/docs/${this.main}/${this.previous_link}`);
      }
    },
  },
};
</script>
