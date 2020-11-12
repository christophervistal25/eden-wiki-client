<template>
  <div class="dashboard">
    <!-- component -->
    <div class="h-screen w-screen flex overflow-hidden select-none">
      <sidebar></sidebar>
      <main
        class="my-1 pt-2 pb-2 px-10 flex-1 bg-gray-200 dark:bg-black rounded-l-lg transition duration-500 ease-in-out overflow-y-auto"
      >
        <div class="flex flex-col capitalize text-3xl">
          <span class="font-semibold">hello,</span>
          <span>{{ name }}</span>
        </div>
        <widgets></widgets>

        <div class="flex">
          <div
            class="mr-6 mt-8 py-2 w-full flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-lg"
          >
            <h3
              class="flex flex-col px-5 py-1 text-lg font-semibold dark:text-gray-300"
            >
              <span>Categories</span>
            </h3>
            <div class="flex flex-col px-5 py-3">
              <category-table
                :changed="updatedRecordInSubCategory"
              ></category-table>
            </div>
          </div>
        </div>

        <div class="flex">
          <sub-category @changed="updateCategory"></sub-category>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Dashboard/Sidebar.vue";
import CategoryTable from "../components/Dashboard/Table.vue";
import SubCategory from "../components/Dashboard/SubCategory.vue";
import Widgets from "../components/Dashboard/Widgets.vue";

export default {
  data() {
    return {
      updatedRecordInSubCategory: 0,
    };
  },
  components: {
    Sidebar,
    CategoryTable,
    SubCategory,
    Widgets,
  },
  computed: {
    name() {
      return localStorage.getItem("name");
    },
  },
  methods: {
    updateCategory() {
      this.updatedRecordInSubCategory++;
    },
  },
};
</script>
