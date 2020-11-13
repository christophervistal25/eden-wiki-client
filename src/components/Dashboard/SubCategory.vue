<template>
  <div
    class="mr-6 mt-8 py-2 w-full flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-lg"
  >
    <h3
      class="flex flex-col px-5 py-1 text-lg font-semibold dark:text-gray-300"
    >
      <span>Sub Categories</span>
    </h3>

    <div class="flex flex-col px-5 py-3">
      <div>
        <input
          class="float-left appearance-none w-64 bg-white border border-gray-400 hover:border-gray-800 px-4 py-2 rounded leading-tight"
          type="text"
          v-model="searchSubCategory"
          placeholder="Search"
        />

        <button
          @click="addNewSubCategoryDisplay = true"
          type="button"
          class="mb-2 float-right w-auto rounded-md border border-gray-300 px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Add new Sub Category
        </button>
      </div>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 border py-2">Name</th>
            <th class="px-4 border py-2">No. of items</th>
            <th class="px-4 border py-2">Category</th>
            <th class="px-4 border py-2">Status</th>
            <th class="px-4 border py-2">Created At</th>
            <th class="px-4 border py-2">Actions</th>
          </tr>
        </thead>
        <tbody v-if="sub_categories.length">
          <tr
            v-for="sub_category in chunkData[currentChunkIndex]"
            v-bind:key="sub_category.id"
          >
            <td class="border px-4 py-2 capitalize">
              {{ sub_category.name }}
            </td>
            <td class="border px-4 py-2 capitalize text-center">
              {{ sub_category.items_count }}
            </td>
            <td class="text-center border px-4 py-2">
              <small>
                <button
                  class="bg-blue-500 cursor-default focus:outline-none shadow text-white font-body py-2 px-4 rounded-full capitalize"
                >
                  {{ sub_category.category.name }}
                </button>
              </small>
            </td>
            <td class="text-center border px-4 py-2">
              <small>
                <button
                  v-if="sub_category.status == 'active'"
                  class="button-small bg-green-500 cursor-default focus:outline-none shadow text-white font-body py-2 px-4 rounded-full capitalize"
                >
                  {{ sub_category.status }}
                </button>
                <button
                  v-else
                  class="bg-red-500 cursor-default focus:outline-none shadow text-white font-body py-2 px-4 rounded-full capitalize"
                >
                  {{ sub_category.status }}
                </button>
              </small>
            </td>

            <td class="border px-4 py-2 text-center">
              {{ formatDate(sub_category.created_at) }}
            </td>

            <td class="border px-4 py-2 text-center">
              <svg
                @click="edit(sub_category)"
                class="w-6 h-6 cursor-pointer ml-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="py-2 px-4 border text-center text-red-500" colspan="6">
              <div class="loadingio-spinner-ripple-gorw4pm31tf">
                <div class="ldio-z7lwnyf26q">
                  <div></div>
                  <div></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="bg-white px-4 pt-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <a
            @click="previous"
            class="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            Previous
          </a>
          <a
            @click="next"
            class="cursor-pointer ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            Next
          </a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:justify-between">
          <div>
            <nav class="inline-flex shadow-sm">
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

              <a
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:z-10"
              >
                Showing &nbsp;
                <span class="font-semibold mr-2">{{
                  currentChunkIndex + 1
                }}</span>
                to
                <span class="font-semibold mr-2 ml-2">{{
                  chunkData.length
                }}</span>
                of
                <span class="semi-bold ml-2">{{ sub_categories.length }}</span>
              </a>

              <a
                @click="next"
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
  </div>
  <modal :display="addNewSubCategoryDisplay">
    <template v-slot:header>
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
        Add new Sub Category
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
      <label for="add-sub-name">Name</label>
      <input
        id="add-sub-name"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-5"
        type="text"
        v-model="category.name"
        placeholder="Name"
      />

      <div class="flex flex-col flex-grow">
        <label for="add-sub-category">Category</label>
        <select
          id="add-sub-category"
          v-model="category.category_id"
          class="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option
            v-for="category in categories"
            v-bind:key="category.id"
            :value="`${category.id}`"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    </template>

    <template v-slot:footer>
      <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button
          @click="addSubCategory"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Create
        </button>
      </span>
      <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button
          @click="closeAddModal"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Cancel
        </button>
      </span>
    </template>
  </modal>

  <modal :display="openEditModalDisplay">
    <template v-slot:header>
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
        Add new Sub Category
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
      <label for="edit-sub-name">Name</label>
      <input
        id="edit-sub-name"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-5 capitalize"
        type="text"
        v-model="selected_category.name"
        placeholder="Name"
      />

      <div class="flex flex-col flex-grow">
        <label for="edit-sub-category">Category</label>
        <select
          id="edit-sub-category"
          v-model="selected_category.category_id"
          class="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-5"
        >
          <option
            v-for="category in categories"
            v-bind:key="category.id"
            :value="`${category.id}`"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col flex-grow">
        <label for="edit-sub-status">Status</label>
        <select
          id="edit-sub-status"
          v-model="selected_category.status"
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
          @click="updateSubCategory"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Update
        </button>
      </span>
      <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button
          @click="closeEditModal"
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
import axios from "axios";
import Modal from "./Modal.vue";
import swal from "sweetalert";
import moment from "moment";
import { chunk } from "../../custom/helpers.js";
export default {
  data() {
    return {
      sub_categories: [],
      sub_categories_filter: [],

      category: {
        name: "",
        category_id: "",
      },

      selected_category: {
        name: "",
        category_id: "",
        status: "",
      },

      beforeEditSelectedCategory: {},

      addNewSubCategoryDisplay: false,
      openEditModalDisplay: false,
      errors: [],
      searchSubCategory: "",
      categories: [],

      currentChunkIndex: 0,
      perPage: 10,
    };
  },
  components: {
    Modal,
  },
  watch: {
    searchSubCategory(value) {
      if (value) {
        this.currentChunkIndex = 0;
        this.sub_categories = this.sub_categories_filter.filter(
          (sub_category) =>
            sub_category.name.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.sub_categories = this.sub_categories_filter;
      }
    },
  },
  methods: {
    getCategories() {
      axios
        .get("admin/category/sub")
        .then((response) => (this.categories = response.data));
    },
    getSubCategories() {
      axios.get("admin/sub-categories").then((response) => {
        this.sub_categories = response.data;
        this.sub_categories_filter = response.data;
        this.$emit("sub-category-count", response.data.length);
      });
    },
    edit(selected_category) {
      this.selected_category = selected_category;
      this.beforeEditSelectedCategory = Object.assign(
        {},
        this.selected_category
      );
      this.openEditModalDisplay = true;
    },
    closeEditModal() {
      this.openEditModalDisplay = false;
      Object.assign(this.selected_category, this.beforeEditSelectedCategory);
      this.errors = [];
    },
    closeAddModal() {
      this.addNewSubCategoryDisplay = false;
      this.errors = [];
    },
    addSubCategory() {
      axios
        .post("admin/sub-category/create", this.category)
        .then((response) => {
          if (response.status === 200) {
            this.sub_categories.unshift(response.data);
            this.addNewSubCategoryDisplay = false;
            this.errors = [];
            this.category = {};

            swal(
              "Good job!",
              `You Successfully create new sub category.`,
              "success"
            );

            this.$emit("changed");
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data;
          }
        });
    },
    updateSubCategory() {
      axios
        .put(
          `admin/sub-category/edit/${this.selected_category.id}`,
          this.selected_category
        )
        .then((response) => {
          if (response.status === 200) {
            this.openEditModalDisplay = false;
            this.errors = [];

            swal(
              "Good job!",
              `You Successfully update sub category.`,
              "success"
            );

            this.sub_categories.map((sub_category, index) => {
              if (sub_category.id == response.data.id) {
                this.sub_categories[index] = response.data;
              }
            });

            this.$emit("changed");
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data;
          }
        });
    },
    chunk,
    next() {
      if (
        this.currentChunkIndex <
        Math.ceil(this.sub_categories.length / this.perPage) - 1
      ) {
        this.currentChunkIndex++;
      }
    },
    previous() {
      if (this.currentChunkIndex > 0) {
        this.currentChunkIndex--;
      }
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    },
  },
  computed: {
    chunkData() {
      return this.chunk(this.sub_categories, this.perPage);
    },
  },
  created() {
    this.getCategories();
    this.getSubCategories();
  },
};
</script>