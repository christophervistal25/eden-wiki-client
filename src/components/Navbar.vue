<template>
  <div
    class="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-auto py-3 items-center"
  >
    <div class="w-full max-w-screen-xl relative mx-auto px-6">
      <div class="flex items-center -mx-6">
        <div class="lg:w-1/4 xl:w-1/5 pl-6 pr-6 lg:pr-8">
          <div class="flex items-center">
            <a
              class="transition duration-500 ease-in-out block text-xl text-green-900 hover:text-green-700"
              href="/docs"
            >
              <svg
                class="fill-current h-6 inline-block text-green-900 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M16 2h4v15a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V0h16v2zm0 2v13a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4h-2zM2 2v15a1 1 0 0 0 1 1h11.17a2.98 2.98 0 0 1-.17-1V2H2zm2 8h8v2H4v-2zm0 4h8v2H4v-2zM4 4h8v4H4V4z"
                ></path>
              </svg>
              Eden Flyff Wiki
            </a>
          </div>
        </div>
        <div class="flex flex-grow min-w-0 lg:w-3/4 xl:w-4/5">
          <div class="w-full min-w-0 lg:px-6 xl:w-3/4 xl:px-12">
            <div class="relative">
              <button
                @click="clicked"
                class="transition-colors duration-100 ease-in-out text-gray-600 py-2 pr-4 pl-10 block w-full appearance-none leading-normal border border-transparent rounded focus:outline-none text-left select-none truncate focus:bg-white focus:border-gray-300 bg-gray-200"
              >
                Search
                <span class="hidden sm:inline">the docs</span>
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
              <a href="https://www.facebook.com/edenflyff" target="_blank">
                <svg
                  class="transition duration-500 ease-in-out fill-current w-5 h-5 text-green-800 hover:text-green-500"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m75 512h167v-182h-60v-60h60v-75c0-41.355469 33.644531-75 75-75h75v60h-60c-16.542969 0-30 13.457031-30 30v60h87.292969l-10 60h-77.292969v182h135c41.355469 0 75-33.644531 75-75v-362c0-41.355469-33.644531-75-75-75h-362c-41.355469 0-75 33.644531-75 75v362c0 41.355469 33.644531 75 75 75zm-45-437c0-24.8125 20.1875-45 45-45h362c24.8125 0 45 20.1875 45 45v362c0 24.8125-20.1875 45-45 45h-105v-122h72.707031l20-120h-92.707031v-30h90v-120h-105c-57.898438 0-105 47.101562-105 105v45h-60v120h60v122h-137c-24.8125 0-45-20.1875-45-45zm0 0"
                  />
                </svg>
              </a>

              <a href="https://edenflyff.com/" target="_blank">
                <svg
                  class="ml-5 fill-current w-5 h-5 text-green-800 transition duration-500 ease-in-out hover:text-green-500"
                  viewBox="0 0 512 512.00001"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m165.628906 240.980469c41.066406 0 74.476563-33.410157 74.476563-74.480469 0-41.066406-33.410157-74.476562-74.476563-74.476562s-74.476562 33.410156-74.476562 74.476562 33.410156 74.480469 74.476562 74.480469zm0-118.960938c24.527344 0 44.480469 19.957031 44.480469 44.480469 0 24.527344-19.953125 44.480469-44.480469 44.480469-24.523437 0-44.480468-19.953125-44.480468-44.480469s19.957031-44.480469 44.480468-44.480469zm0 0"
                  />
                  <path
                    d="m346.902344 240.980469c40.820312 0 74.03125-33.210938 74.03125-74.03125 0-40.820313-33.210938-74.03125-74.03125-74.03125-40.816406 0-74.027344 33.210937-74.027344 74.03125 0 40.820312 33.207031 74.03125 74.027344 74.03125zm0-118.0625c24.28125 0 44.035156 19.75 44.035156 44.03125s-19.753906 44.03125-44.035156 44.03125c-24.277344 0-44.03125-19.75-44.03125-44.03125 0-24.277344 19.753906-44.03125 44.03125-44.03125zm0 0"
                  />
                  <path
                    d="m503.226562 242.054688c-5.914062-6.089844-13.574218-9.210938-21.296874-9.269532v-187.789062c0-24.8125-20.1875-44.996094-44.996094-44.996094h-361.96875c-24.8125 0-44.996094 20.183594-44.996094 44.996094v187.921875c-7.769531.054687-15.4375 3.175781-21.347656 9.261719-10.871094 11.191406-11.53125 28.015624-1.574219 39.996093l1.761719 2.125c19.53125 23.539063 41.441406 49.953125 81.527344 67.238281-10.746094 78.265626 11.710937 117.542969 26.585937 134.316407 14.503906 16.355469 33.226563 25.496093 53.109375 26.089843v.007813h.453125c.535156.015625 1.070313.046875 1.605469.046875.65625 0 1.316406-.011719 1.976562-.027344l21.902344-.003906v-.015625c24.804688-.007813 44.980469-20.1875 44.980469-44.996094v-88.285156l29.996093 5v83.285156c0 24.8125 20.1875 44.996094 44.996094 44.996094h22.296875c.507813.011719 1.019531.019531 1.527344.019531 34.523437 0 70.617187-26.832031 81.367187-84.398437 4.15625-22.257813 4.292969-47.785157.421876-76.035157 38.085937-16.425781 58.75-39.785156 83.285156-69.359374 9.984375-12.007813 9.304687-28.886719-1.613282-40.125zm-428.261718-212.058594h361.96875c8.269531 0 14.996094 6.730468 14.996094 15v200.203125c-35.691407 18.425781-60.511719 23.824219-85.761719 25.777343h-50.226563c-17.019531 0-31.859375 9.5-39.503906 23.472657l-32.886719-16.441407c-9.199219-4.601562-19.496093-7.03125-29.78125-7.03125h-68.046875c-25.246094-1.953124-50.070312-7.351562-85.757812-25.773437v-200.207031c0-8.269532 6.726562-15 15-15zm135.988281 313.265625v123.695312c0 8.273438-6.730469 15-15 15h-25.402344c-38.144531-1.589843-63.253906-53.53125-48.773437-137.4375l2.148437-12.453125-11.910156-4.230468c-39.859375-14.160157-59.414063-37.734376-80.121094-62.6875l-1.734375-2.089844c.035156-.035156.070313-.066406.105469-.09375.078125.050781.179687.117187.300781.210937l.898438.703125.996094.5625c47.875 26.914063 79.222656 34.054688 111.5625 36.488282 81.269531.050781 68.324218.042968 69.746093.042968 5.652344 0 11.3125 1.335938 16.367188 3.863282l40.808593 20.40625v28.019531zm189.828125-15.75-13.015625 3.410156 2.34375 13.570313c15.488281 89.753906-14.683594 136.433593-49.28125 137.464843h-24.886719c-8.269531 0-15-6.726562-15-15v-150.984375c0-8.269531 6.730469-15 15-15 3.183594-.003906-14.875.011719 51.925782-.042968 32.339843-2.433594 63.6875-9.570313 111.5625-36.488282l.972656-.546875 1.261718-.980469c.035157.03125.066407.066407.097657.101563-24.582031 29.628906-42.863281 50.707031-80.980469 64.496094zm0 0"
                  />
                </svg>
              </a>
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
      component.$emit("display-search", e);
    },
  },
};
</script>