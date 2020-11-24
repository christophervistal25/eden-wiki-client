<template>
  <div>
    <input
      class="w-64 bg-white border border-gray-400 focus:border-gray-500 px-4 py-2 text-sm focus:outline-none"
      type="text"
      v-model="searchSubCategory"
      placeholder="Search"
    />

    <div
      class="float-right mb-2 text-white bg-blue-400 rounded-full shadow w-10 animate-pulse cursor-pointer"
      @click="addNewSubCategoryDisplay = true"
    >
      <svg
        class="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </div>
  </div>

  <table class="table-auto">
    <thead>
      <tr>
        <td
          class="border py-4 px-4 text-gray-700 text-sm uppercase text-center font-medium"
        >
          Name
        </td>
        <td
          class="border py-4 px-4 text-gray-700 text-sm uppercase text-center font-medium"
        >
          No. of items
        </td>
        <td
          class="border py-4 px-4 text-gray-700 text-sm uppercase text-center font-medium"
        >
          Category
        </td>
        <td
          class="border py-4 px-4 text-gray-700 text-sm uppercase text-center font-medium"
        >
          Status
        </td>
        <td
          class="border py-4 px-4 text-gray-700 text-sm uppercase text-center font-medium"
        >
          Created At
        </td>
        <td
          class="border py-4 px-4 text-gray-700 text-sm uppercase text-center font-medium"
        >
          Actions
        </td>
      </tr>
    </thead>
    <tbody v-if="sub_categories.length">
      <tr
        class="hover:bg-gray-200"
        v-for="sub_category in chunkData[currentChunkIndex]"
        v-bind:key="sub_category.id"
      >
        <td class="border px-4 py-3 capitalize text-sm">
          {{ sub_category.name }}
        </td>
        <td class="border px-4 py-3 capitalize text-center text-sm">
          {{ sub_category.items_count }}
        </td>
        <td class="text-center border px-4 py-3 text-sm">
          <button
            class="bg-blue-500 cursor-default focus:outline-none w-20 text-white font-body p-1 rounded-sm capitalize"
          >
            {{ sub_category.category.name }}
          </button>
        </td>
        <td class="text-center border px-4 py-3 text-sm">
          <button
            v-if="sub_category.status == 'active'"
            class="button-small bg-green-500 cursor-default focus:outline-none w-20 text-white font-body p-1 rounded-sm capitalize"
          >
            {{ sub_category.status }}
          </button>
          <button
            v-else
            class="bg-red-500 cursor-default focus:outline-none w-20 text-white font-body p-1 rounded-sm capitalize"
          >
            {{ sub_category.status }}
          </button>
        </td>

        <td class="border px-4 py-3 text-center text-sm">
          {{ formatDate(sub_category.created_at) }}
        </td>

        <td class="border px-4 py-3">
          <div
            class="w-10 h-10 bg-green-500 text-white rounded-full shadow p-2 mr-auto ml-auto cursor-pointer"
            @click="edit(sub_category)"
          >
            <svg
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
          </div>
          <!-- <svg
            @click="edit(sub_category)"
            class="w-5 h-5 cursor-pointer ml-auto mr-auto"
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
          </svg> -->
        </td>
      </tr>
    </tbody>
    <tbody v-if="sub_categories.length === 0 && !isUserSearch">
      <tr>
        <td class="border px-4 py-3" colspan="6" rowspan="5">
          <spinner
            class="ml-auto mr-auto"
            height="h-10"
            width="w-10"
            color="text-green-500"
          ></spinner>
        </td>
      </tr>
    </tbody>
    <tbody v-if="sub_categories.length === 0 && isUserSearch">
      <tr>
        <td
          class="border text-sm text-red-500 px-4 py-3 text-center"
          colspan="6"
          rowspan="5"
        >
          No available data...
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex flex-row-reverse mt-2" v-show="sub_categories.length">
    <div>
      <nav class="inline-flex">
        <a
          @click="previous"
          class="cursor-pointer relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
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
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 text-gray-700 focus:z-10"
        >
          <span>Showing &nbsp;</span>
          <span class="mr-2">{{ currentChunkIndex + 1 }}</span>
          to
          <span class="mr-2 ml-2">{{ chunkData.length }}</span>
          of
          <span class="ml-2">{{ sub_categories.length }}</span>
        </a>

        <a
          @click="next"
          class="cursor-pointer -ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
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
      <label
        for="add-sub-name"
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
      >
        Name <span class="text-red-500">*</span>
      </label>
      <input
        id="add-sub-name"
        class="appearance-none block w-full text-gray-700 border rounded-sm py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 capitalize"
        type="text"
        v-model="category.name"
      />

      <div class="flex flex-col flex-grow">
        <label
          for="add-sub-category"
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
        >
          Category <span class="text-red-500">*</span>
        </label>
        <select
          id="add-sub-category"
          v-model="category.category_id"
          class="appearance-none block w-full text-gray-700 border rounded-sm py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 capitalize"
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
          class="inline-flex justify-center w-full border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 rounded-sm"
        >
          Create
        </button>
      </span>
      <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button
          @click="closeAddModal"
          type="button"
          class="inline-flex justify-center w-full border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 rounded-sm"
        >
          Cancel
        </button>
      </span>
    </template>
  </modal>

  <modal :display="openEditModalDisplay">
    <template v-slot:header>
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
        Edit Sub Category
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
      <label
        for="edit-sub-name"
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
      >
        Name <span class="text-red-500">*</span>
      </label>
      <input
        id="edit-sub-name"
        class="appearance-none block w-full text-gray-700 border rounded-sm py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 capitalize"
        type="text"
        v-model="selected_category.name"
        placeholder="Name"
      />

      <div class="flex flex-col flex-grow">
        <label
          for="edit-sub-category"
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
        >
          Category <span class="text-red-500">*</span>
        </label>
        <select
          id="edit-sub-category"
          v-model="selected_category.category_id"
          class="appearance-none block w-full text-gray-700 border rounded-sm py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 capitalize"
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
        <label
          for="edit-sub-status"
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
        >
          Status <span class="text-red-500">*</span>
        </label>
        <select
          id="edit-sub-status"
          v-model="selected_category.status"
          class="appearance-none block w-full text-gray-700 border rounded-sm py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 capitalize"
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
          class="inline-flex justify-center w-full border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5 rounded-sm"
        >
          Update
        </button>
      </span>
      <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button
          @click="closeEditModal"
          type="button"
          class="inline-flex justify-center w-full border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 rounded-sm"
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
import Spinner from "../Spinner.vue";
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
      isUserSearch: false,
      categories: [],

      currentChunkIndex: 0,
      perPage: 10,
    };
  },
  components: {
    Modal,
    Spinner,
  },
  watch: {
    searchSubCategory(value) {
      this.isUserSearch = true;
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
              `Successfully create new sub category.`,
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

            swal("Good job!", `Successfully update sub category.`, "success");

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