<template>
  <!-- This is an example component -->
  <div class="">
    <div class="h-full overflow-y-auto">
      <div class="">
        <!-- Cards -->
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <!-- Card -->
          <div
            class="flex items-center p-4 bg-white shadow-sm bord border-green-400 border-l-4"
          >
            <div
              class="p-3 mr-4 text-white bg-green-400 rounded-full"
              v-if="no_of_categories !== 0"
            >
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
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
            <div v-if="no_of_categories !== 0">
              <p
                class="mb-2 text-sm font-medium text-gray-800 dark:text-gray-400"
              >
                Categories
              </p>
              <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {{ no_of_categories }}
              </p>
            </div>
            <div v-if="no_of_categories === 0" class="mr-auto ml-auto">
              <spinner
                height="h-10"
                width="w-10"
                color="text-green-600"
              ></spinner>
            </div>
          </div>
          <!-- Card -->
          <div
            class="flex items-center p-4 bg-white shadow-sm border-green-400 border-l-4"
          >
            <div
              class="p-3 mr-4 text-white bg-green-400 rounded-full"
              v-if="no_sub_categories !== 0"
            >
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
                  d="M4 6h16M4 12h8m-8 6h16"
                ></path>
              </svg>
            </div>
            <div v-if="no_sub_categories !== 0">
              <p
                class="mb-2 text-sm font-medium text-gray-800 dark:text-gray-400"
              >
                Sub Categories
              </p>
              <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {{ no_sub_categories }}
              </p>
            </div>
            <div v-if="no_sub_categories === 0" class="mr-auto ml-auto">
              <spinner
                height="h-10"
                width="w-10"
                color="text-green-600"
              ></spinner>
            </div>
          </div>
          <!-- Card -->
          <div
            class="flex items-center p-4 bg-white shadow-sm border-green-400 border-l-4"
          >
            <div
              class="p-3 mr-4 text-white bg-green-400 rounded-full"
              v-if="no_of_items !== 0"
            >
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
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                ></path>
              </svg>
            </div>
            <div v-if="no_of_items !== 0">
              <p
                class="mb-2 text-sm font-medium text-gray-800 dark:text-gray-400"
              >
                Items
              </p>
              <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {{ no_of_items }}
              </p>
            </div>
            <div v-if="no_of_items === 0" class="mr-auto ml-auto">
              <spinner
                height="h-10"
                width="w-10"
                color="text-green-600"
              ></spinner>
            </div>
          </div>
          <!-- Card -->
          <div
            class="flex items-center p-4 bg-white shadow-sm border-green-400 border-l-4"
          >
            <div
              class="p-3 mr-4 text-white bg-green-400 rounded-full"
              v-if="
                no_of_items !== 0 &&
                no_sub_categories !== 0 &&
                no_of_categories !== 0
              "
            >
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
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <div
              v-if="
                no_of_items !== 0 &&
                no_sub_categories !== 0 &&
                no_of_categories !== 0
              "
            >
              <p
                class="mb-2 text-sm font-medium text-gray-800 dark:text-gray-400"
              >
                Total Records
              </p>
              <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {{ no_of_items + no_sub_categories + no_of_categories }}
              </p>
            </div>
            <div v-else class="mr-auto ml-auto">
              <spinner
                height="h-10"
                width="w-10"
                color="text-green-600"
              ></spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Spinner from "../../components/Spinner.vue";
export default {
  components: {
    Spinner,
  },
  props: {
    no_of_categories: Number,
    no_sub_categories: Number,
  },
  data() {
    return {
      no_of_items: 0,
    };
  },
  created() {
    axios
      .get("admin/item/count")
      .then((response) => (this.no_of_items = response.data));
  },
};
</script>