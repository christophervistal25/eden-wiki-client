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
          <span>Administrator!</span>
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
              <div>
                <input
                  class="float-left appearance-none w-64 bg-white border border-gray-400 hover:border-gray-800 px-4 py-2 rounded leading-tight"
                  type="text"
                  v-model="searchCategory"
                  placeholder="Search"
                />
                <button
                  @click="openAddCategoryModal"
                  type="button"
                  class="mb-2 float-right w-auto rounded-md border border-gray-300 px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Add new Category
                </button>
              </div>
              <category-table
                :data="categories"
                @selected-category="editCategory"
              ></category-table>
            </div>
          </div>
        </div>

        <div class="flex">
          <sub-category :categories="categories"></sub-category>
        </div>
      </main>
    </div>
  </div>

  <modal :display="editCategoryDisplay">
    <template v-slot:header>
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
        Edit Category
      </h3>
      <li
        class="text-red-500"
        v-for="(error, index) in errors"
        v-bind:key="index"
      >
        {{ error[0] }}
      </li>
    </template>
    <template v-slot:body>
      <label for="edit-category-name">Name</label>
      <input
        id="edit-category-name"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-5"
        type="text"
        v-model="category.name"
        placeholder="Category name"
      />

      <div class="flex flex-col flex-grow">
        <label for="edit-category-description">Description</label>
        <textarea
          id="edit-category-description"
          class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-5"
          v-model="category.description"
          cols="30"
          rows="10"
        ></textarea>
      </div>

      <div class="flex flex-col flex-grow">
        <label for="edit-status">Status</label>
        <select
          id="edit-status"
          v-model="category.status"
          class="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="active">Active</option>
          <option value="in-active">In-active</option>
        </select>
      </div>
    </template>

    <template v-slot:footer>
      <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button
          @click="updateCategory"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Update
        </button>
      </span>
      <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button
          @click="closeEditCategoryModal"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Cancel
        </button>
      </span>
    </template>
  </modal>

  <modal :display="addCategoryDisplay">
    <template v-slot:header>
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
        Add Category
      </h3>
      <li
        class="text-red-500"
        v-for="(error, index) in errors"
        v-bind:key="index"
      >
        {{ error[0] }}
      </li>
    </template>
    <template v-slot:body>
      <label for="new-category-name">Name</label>
      <input
        id="new-category-name"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-5"
        type="text"
        v-model="categoryNew.name"
        placeholder="Category name"
      />

      <div class="flex flex-col flex-grow">
        <label for="new-category-description">Description</label>
        <textarea
          id="new-category-description"
          class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-5"
          v-model="categoryNew.description"
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </template>

    <template v-slot:footer>
      <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button
          @click="addCategory"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Create
        </button>
      </span>
      <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button
          @click="closeAddCategoryModal"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Cancel
        </button>
      </span>
    </template>
  </modal>
</template>

<script>
import Sidebar from "../components/Dashboard/Sidebar.vue";
import CategoryTable from "../components/Dashboard/Table.vue";
import SubCategory from "../components/Dashboard/SubCategory.vue";
import Widgets from "../components/Dashboard/Widgets.vue";
import Modal from "../components/Dashboard/Modal.vue";
import axios from "axios";
import swal from "sweetalert";
import { config } from "../custom/auth.js";

export default {
  data() {
    return {
      categories: [],
      temp_categories: [],
      category: {},
      categoryNew: {},
      editCategoryDisplay: false,
      errors: [],
      addCategoryDisplay: false,
      searchCategory: "",
    };
  },
  components: {
    Sidebar,
    CategoryTable,
    SubCategory,
    Modal,
    Widgets,
  },
  watch: {
    searchCategory(value) {
      if (value) {
        this.categories = this.temp_categories.filter((category) =>
          category.name.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.categories = this.temp_categories;
      }
    },
  },
  methods: {
    getCategories() {
      axios.get("category").then((response) => {
        this.categories = response.data;
        this.temp_categories = response.data;
      });
    },
    editCategory(category) {
      this.editCategoryDisplay = true;
      this.category = category;
    },
    closeEditCategoryModal() {
      this.editCategoryDisplay = false;
      this.errors = [];
    },
    updateCategory() {
      let id = this.category.id;
      axios
        .put(`category/edit/${id}`, this.category, config)
        .then((response) => {
          if (response.status === 200) {
            this.editCategoryDisplay = false;
            this.errors = [];
            swal("Good job!", "You Successfully update a category.", "success");
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data;
          }
        });
    },
    openAddCategoryModal() {
      this.addCategoryDisplay = true;
    },
    closeAddCategoryModal() {
      this.addCategoryDisplay = false;
      this.errors = [];
    },
    addCategory() {
      this.categoryNew.status = "active";
      axios
        .post(`category/create`, this.categoryNew, config)
        .then((response) => {
          if (response.status === 200) {
            this.addCategoryDisplay = false;
            swal(
              "Good job!",
              "You Successfully create new category.",
              "success"
            );
            this.getCategories();
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data;
          }
        });
    },
  },
  created() {
    this.getCategories();
  },
};
</script>
