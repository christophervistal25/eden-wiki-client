<template>
  <div>
    <input
      class="float-left appearance-none w-64 bg-white border border-gray-400 hover:border-gray-800 px-4 py-2 rounded leading-tight"
      type="text"
      v-model="search"
      placeholder="Search"
    />
    <button
      @click="create"
      type="button"
      class="mb-2 float-right w-auto rounded-md border border-gray-300 px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
    >
      Add new Category
    </button>
  </div>
  <table class="table-fixed">
    <thead>
      <tr>
        <th class="border w-1/7 px-4 py-2">Title</th>
        <th class="border w-1/4 px-4 py-2">Description</th>
        <th class="border w-1/4 px-4 py-2">No. of sub category items</th>
        <th class="border w-1/4 px-4 py-2">Status</th>
        <th class="border w-1/4 px-4 py-2">Created At</th>
        <th class="border w-1/4 px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody v-if="categories.length">
      <tr
        v-for="(category, index) in chunkData[currentChunkDataIndex]"
        :key="index"
      >
        <td class="border px-4 py-2 capitalize">{{ category.name }}</td>
        <td class="border px-4 py-2 text-sm text-gray-700">
          {{ category.description }}
        </td>
        <td class="border px-4 py-2 text-center">
          {{ category.sub_category_count }}
        </td>
        <td class="border px-4 py-2 text-center">
          <small>
            <button
              v-if="category.status == 'active'"
              class="bg-green-500 cursor-default focus:outline-none shadow text-white font-body py-2 px-4 rounded-full capitalize"
            >
              {{ category.status }}
            </button>
            <button
              v-else
              class="bg-red-500 cursor-default focus:outline-none shadow text-white font-body py-2 px-4 rounded-full capitalize"
            >
              {{ category.status }}
            </button>
          </small>
        </td>
        <td class="border px-4 py-2 text-center">
          {{ formatDate(category.created_at) }}
        </td>
        <td class="border px-4 py-2 text-center">
          <small>
            <svg
              @click="edit(category)"
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
          </small>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td class="py-2 px-4 text-center border text-red-500" colspan="6">
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
              currentChunkDataIndex + 1
            }}</span>
            to
            <span class="font-semibold mr-2 ml-2">{{ chunkData.length }}</span>
            of
            <span class="semi-bold ml-2">{{ categories.length }}</span>
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

  <modal :display="displayAddModal">
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
        v-model="categoryCreate.name"
        placeholder="Category name"
      />

      <div class="flex flex-col flex-grow">
        <label for="new-category-description">Description</label>
        <textarea
          id="new-category-description"
          class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-5"
          v-model="categoryCreate.description"
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </template>

    <template v-slot:footer>
      <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button
          @click="store"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Create
        </button>
      </span>
      <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button
          @click="closeCreate"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Cancel
        </button>
      </span>
    </template>
  </modal>

  <modal :display="displayEditModal">
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
          @click="update"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          Update
        </button>
      </span>
      <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button
          @click="editClose"
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
import moment from "moment";
import axios from "axios";
import swal from "sweetalert";
import Modal from "./Modal.vue";
import { chunk } from "../../custom/helpers.js";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      categories: [],
      temp_categories: [],
      category: {},
      categoryBeforeEdit: {},
      categoryCreate: {
        sub_category_count: 0,
        status: "active",
      },

      search: "",

      errors: [],

      displayAddModal: false,
      displayEditModal: false,

      currentChunkDataIndex: 0,
      perPage: 5,
    };
  },
  props: {
    changed: Number,
  },
  watch: {
    search(value) {
      this.searchCategory(value);
    },
    changed() {
      this.get();
    },
  },
  methods: {
    get() {
      axios.get("admin/category").then((response) => {
        this.categories = response.data;
        this.temp_categories = response.data;
        this.$emit("category-count", response.data.length);
      });
    },

    create() {
      this.displayAddModal = true;
      this.errors = {};
    },
    closeCreate() {
      this.displayAddModal = false;
      this.errors = [];
    },
    store() {
      axios
        .post(`admin/category/create`, this.categoryCreate)
        .then((response) => {
          if (response.status === 200) {
            this.displayAddModal = false;
            this.categories.unshift(response.data);
            this.categoryCreate = {};
            this.errors = [];

            swal(
              "Good job!",
              "You Successfully create new category.",
              "success"
            );
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data;
          }
        });
    },
    edit(category) {
      this.displayEditModal = true;
      this.category = category;
      this.errors = {};
      this.categoryBeforeEdit = Object.assign({}, this.category);
    },
    editClose() {
      this.displayEditModal = false;
      Object.assign(this.category, this.categoryBeforeEdit);
      this.category = {};
      this.errors = {};
    },
    update() {
      axios
        .put(`admin/category/edit/${this.category.id}`, this.category)
        .then((response) => {
          if (response.status === 200) {
            this.displayEditModal = false;
            this.errors = [];
            this.category = {};
            swal("Good job!", "You Successfully update a category.", "success");
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data;
          }
        });
    },
    searchCategory(word) {
      if (word) {
        this.currentChunkIndex = 0;
        this.categories = this.temp_categories.filter((category) =>
          category.name.toLowerCase().includes(word.toLowerCase())
        );
      } else {
        this.categories = this.temp_categories;
      }
    },
    next() {
      if (
        this.currentChunkDataIndex <
        Math.ceil(this.categories.length / this.perPage) - 1
      ) {
        this.currentChunkDataIndex++;
      }
    },
    previous() {
      if (this.currentChunkDataIndex > 0) {
        this.currentChunkDataIndex--;
      }
    },
    chunk,
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    },
  },
  computed: {
    chunkData() {
      return this.chunk(this.categories, this.perPage);
    },
  },
  created() {
    this.get();
  },
};
</script>