<template>
  <div
    class="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center"
  >
    <div class="w-full max-w-screen-xl relative mx-auto px-6">
      <div class="flex items-center -mx-6">
        <div class="lg:w-1/4 xl:w-1/5 pl-6 pr-6 lg:pr-8">
          <div class="flex items-center">
            <a class="block lg:mr-4 font-body" href="/"> Eden Flyff Wiki </a>
          </div>
        </div>
        <div class="flex flex-grow min-w-0 lg:w-3/4 xl:w-4/5">
          <div class="w-full min-w-0 lg:px-6 xl:w-3/4 xl:px-12">
            <div class="relative">
              <button
                @click="clicked"
                class="transition-colors duration-100 ease-in-out text-gray-600 py-2 pr-4 pl-10 block w-full appearance-none leading-normal border border-transparent rounded-lg focus:outline-none text-left select-none truncate focus:bg-white focus:border-gray-300 bg-gray-200"
              >
                Search
                <span class="hidden sm:inline"
                  >the docs (Press "/" to focus)</span
                >
              </button>
              <div
                class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center"
              >
                <svg
                  class="fill-current pointer-events-none text-gray-600 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <button
            type="button"
            id="sidebar-open"
            class="flex px-6 items-center lg:hidden text-gray-500 focus:outline-none focus:text-gray-700"
            aria-label="Open site navigation"
          >
            <svg
              class="fill-current w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg></button
          ><button
            type="button"
            id="sidebar-close"
            class="flex px-6 items-center lg:hidden text-gray-500 focus:outline-none focus:text-gray-700 hidden"
            aria-label="Close site navigation"
          >
            <svg
              class="fill-current w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              ></path>
            </svg>
          </button>
          <div
            class="hidden lg:flex lg:items-center lg:justify-between xl:w-1/4 px-6"
          >
            <div class="flex justify-start items-center text-gray-500">
              <a
                v-for="c in 3"
                v-bind:key="c"
                class="block ml-2 flex items-center hover:text-gray-700"
                href="/discord"
                ><svg
                  class="fill-current w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 146 146"
                >
                  <title>Discord {{ c }}</title>
                  <path
                    d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z"
                    fill-rule="nonzero"
                  ></path></svg
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    const component = this;
    this.handler = function (e) {
      component.$emit("keyup", e);
    };
    window.addEventListener("keyup", this.handler);
  },
  beforeUnmount() {
    window.removeEventListener("keyup", this.handler);
  },
  methods: {
    clicked(e) {
      let component = this;
      component.$emit("keyup", e);
    },
  },
};
</script>