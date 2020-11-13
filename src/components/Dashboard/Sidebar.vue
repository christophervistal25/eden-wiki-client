<template>
  <nav class="w-24 flex flex-col items-center bg-white dark:bg-gray-800 py-4">
    <!-- Left side NavBar -->

    <div>
      <!-- App Logo -->

      <svg
        class="w-6 h-6 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        ></path>
      </svg>
    </div>

    <ul class="mt-2 text-gray-700 dark:text-gray-400 capitalize">
      <!-- Links -->

      <li class="mt-3 p-2 text-green-600 dark:text-green-300 rounded-lg">
        <router-link to="/admin">
          <a class="flex flex-col items-center">
            <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
							17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
							8h-8v10h8V11m-10 4H3v6h8v-6z"
              ></path>
            </svg>
            <span class="text-xs mt-2 capitalize">dashboard</span>
          </a>
        </router-link>
      </li>

      <li class="mt-3 p-2 hover:text-green-600 rounded-lg">
        <router-link to="/admin/items">
          <a class="flex flex-col items-center">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>

            <span class="text-xs mt-2 capitalize">Items</span>
          </a>
        </router-link>
      </li>
    </ul>

    <div
      @click="logout"
      class="mt-auto flex items-center p-2 text-white-800 bg-green-400 rounded-full cursor-pointer"
    >
      <a>
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
      </a>
    </div>
  </nav>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    logout() {
      axios.post("/logout").then(() => {
        this.$router.push("/admin/login");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
      });
    },
  },
};
</script>