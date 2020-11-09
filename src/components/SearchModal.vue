<template>
  <div
    v-show="display"
    class="fixed z-10 inset-0 overflow-y-auto"
    @keyup.esc="test"
  >
    <div
      class="items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
      >&#8203;
      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full overflow-y-scroll overscroll-y-auto"
        style="height: 80vh"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white pt-5 pb-4">
          <p class="p-2 text-sm text-gray-700 font-body">
            Press "/" again to close this dialog
          </p>
          <div class="sm:flex sm:items-start">
            <div class="px-2 flex flex-col flex-grow">
              <input
                autofocus
                focus
                :class="hasError"
                class="appearance-none block w-full bg-white text-gray-700 border border-gray- rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-300"
                type="text"
                v-model="searchKeyword"
                placeholder="Search Docs"
                @keyup.enter="search"
              />

              <hr />

              <div class="flex flex-wrap justify-center">
                <div class="mt-3">
                  <svg
                    v-show="searchProcess"
                    class="h-10 w-10"
                    viewBox="0 0 38 38"
                    stroke="currentColor"
                    stroke-opacity=".5"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g transform="translate(1 1)" stroke-width="2">
                        <circle
                          stroke-opacity=".3"
                          cx="18"
                          cy="18"
                          r="18"
                        ></circle>
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"
                          ></animateTransform>
                        </path>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>

              <!-- <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                      d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4"
                      stroke="currentColor"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                    ></path>
                  </svg> -->
              <div v-for="(item, index) in items" v-bind:key="index">
                <div
                  class="shadow max-w-screen-lg px-2 bg-white rounded-lg mt-2"
                >
                  <h2 class="rounded py-4 px-4 mb-1 cursor-pointer">
                    <span class="font-semibold">{{ item.category.name }}</span>
                    / {{ item.name }}
                    <br />
                    <span class="text-sm text-gray-600 break-all">{{
                      item.description
                    }}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    display: Boolean,
  },
  data() {
    return {
      items: [],
      searchProcess: false,
      searchKeyword: "",
      hasError: "",
    };
  },
  methods: {
    search() {
      this.searchProcess = true;
      axios
        .get(`search/item/${this.searchKeyword}`)
        .then((response) => {
          this.searchProcess = false;
          console.log(response.data);
          this.items = response.data;
        })
        .catch(() => {
          this.searchProcess = false;
        });
    },
    test() {},
  },
};
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #546070;
  border-radius: 15px;
}
</style>