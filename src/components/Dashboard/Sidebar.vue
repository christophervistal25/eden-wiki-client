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

      <li
        class="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300 rounded-lg"
      >
        <a href="expenses-dashboard/" class="flex flex-col items-center">
          <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M21 18v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0
							012-2h14a2 2 0 012 2v1h-9a2 2 0 00-2 2v8a2 2 0 002
							2m0-2h10V8H12m4 5.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0
							011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5z"
            ></path>
          </svg>
          <span class="text-xs mt-2">earnings</span>
        </a>
      </li>

      <li
        class="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300 rounded-lg"
      >
        <a href="users-dashboard/" class="flex flex-col items-center">
          <svg class="fill-current h-5 w-5" viewBox="0 0 512 512">
            <path
              d="M505 442.7L405.3
							343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7
							44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208
							208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7
							17l99.7 99.7c9.4 9.4 24.6 9.4 33.9
							0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
							0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128
							57.2 128 128 0 70.7-57.2 128-128 128z"
            ></path>
          </svg>
          <span class="text-xs mt-2">jobs</span>
        </a>
      </li>

      <li
        class="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300 rounded-lg"
      >
        <a href="meetup/" class="flex flex-col items-center">
          <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M19 19H5V8h14m0-5h-1V1h-2v2H8V1H6v2H5a2 2 0 00-2
							2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m-2.47
							8.06L15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59
							17l5.94-5.94z"
            ></path>
          </svg>
          <span class="text-xs mt-2">schedule</span>
        </a>
      </li>

      <li class="mt-3 p-2 hover:text-blue-600 rounded-lg">
        <a href="social-media-dashboard/" class="flex flex-col items-center">
          <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0
							001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"
            ></path>
          </svg>
          <span class="text-xs mt-2">lesson</span>
        </a>
      </li>
    </ul>

    <div
      class="mt-auto flex items-center p-2 text-blue-700 bg-purple-200 dark:text-blue-500 rounded-full"
    >
      <!-- important action -->

      <a href="/">
        <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M12 1c-5 0-9 4-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 017-7
						7 7 0 017 7v2h-4v8h4v1h-7v2h6a3 3 0
						003-3V10c0-5-4.03-9-9-9z"
          ></path>
        </svg>
      </a>
    </div>
  </nav>
</template>
<script>
export default {};
</script>