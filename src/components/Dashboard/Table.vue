<template>
  <div>
    <input
      class="w-64 bg-white border border-gray-400 focus:border-gray-500 px-4 py-2 text-sm focus:outline-none"
      type="text"
      v-model="search"
      placeholder="Search"
    />

    <router-link to="/admin/create/category">
      <div
        class="float-right mb-2 text-white bg-blue-400 rounded-full shadow w-10 animate-pulse"
      >
        <svg
          ref="btnRef"
          v-on:mouseenter="toggleTooltip()"
          v-on:mouseleave="toggleTooltip()"
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
      <div
        ref="tooltipRef"
        v-bind:class="{ hidden: !tooltipShow, block: tooltipShow }"
        class="bg-white border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words shadow"
      >
        <div>
          <div
            class="bg-white text-gray-800 opacity-75 font-semibold p-1 border-b border-solid border-gray-200 uppercase text-center"
          >
            Add Category
          </div>
          <div class="text-gray-800 p-3">
            Click this button if you want to add new category.
          </div>
        </div>
      </div>
    </router-link>
  </div>

  <table class="table-auto border-collapse">
    <thead>
      <tr>
        <td
          class="border w-1/7 px-4 py-4 text-sm uppercase text-gray-700 font-medium text-center"
        >
          Title
        </td>
        <td
          class="border w-1/7 px-4 py-4 text-sm uppercase text-gray-700 font-medium text-center"
        >
          Description
        </td>
        <td
          class="border w-1/7 px-4 py-4 text-sm uppercase text-gray-700 font-medium text-center"
        >
          No. of Sub-category
        </td>
        <td
          class="border w-1/7 px-4 py-4 text-sm uppercase text-gray-700 font-medium text-center"
        >
          Status
        </td>
        <td
          class="border w-1/7 px-4 py-4 text-sm uppercase text-gray-700 font-medium text-center"
        >
          Created At
        </td>
        <td
          class="border w-1/7 px-4 py-4 text-sm uppercase text-gray-700 font-medium text-center"
        >
          Actions
        </td>
      </tr>
    </thead>
    <tbody v-if="categories.length">
      <tr
        class="hover:bg-gray-200"
        v-for="(category, index) in chunkData[currentChunkDataIndex]"
        :key="index"
      >
        <td class="border px-4 py-3 capitalize text-sm">
          {{ category.name }}
        </td>
        <td class="border px-4 py-3 text-sm text-gray-700">
          {{
            category.description
              ? category.description.substring(0, 20) + "..."
              : ""
          }}
        </td>
        <td class="border px-4 py-3 text-center text-sm">
          {{ category.sub_category_count }}
        </td>
        <td class="border px-4 py-3 text-center text-sm">
          <button
            v-if="category.status == 'active'"
            class="bg-green-500 cursor-default focus:outline-none w-20 text-white font-body p-1 capitalize rounded-sm"
          >
            {{ category.status }}
          </button>

          <button
            v-else
            class="bg-red-500 cursor-default focus:outline-none w-20 text-white font-body p-1 capitalize rounded-sm"
          >
            {{ category.status }}
          </button>
        </td>
        <td class="border px-4 py-3 text-center text-sm">
          {{ formatDate(category.created_at) }}
        </td>
        <td class="border px-4 py-3 text-center">
          <router-link
            :to="{
              name: 'AdminEditCategory',
              params: { id: category.id },
            }"
          >
            <div
              class="w-10 h-10 bg-green-500 text-white rounded-full shadow p-2 mr-auto ml-auto cursor-pointer"
              @click="edit(category)"
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
          </router-link>
        </td>
      </tr>
    </tbody>
    <tbody v-if="categories.length === 0 && !isUserSearch">
      <tr>
        <td class="px-4 py-3 border" colspan="6" rowspan="5">
          <spinner
            class="ml-auto mr-auto"
            height="h-10"
            width="w-10"
            color="text-green-500"
          ></spinner>
        </td>
      </tr>
    </tbody>
    <tbody v-if="categories.length === 0 && isUserSearch">
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

  <div class="flex flex-row-reverse mt-2" v-show="categories.length">
    <div>
      <nav class="inline-flex">
        <a
          @click="previous"
          class="cursor-pointer relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
          aria-label="Previous"
        >
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
          <span class="mr-2">{{ currentChunkDataIndex + 1 }}</span>
          to
          <span class="mr-2 ml-2">{{ chunkData.length }}</span>
          of
          <span class="ml-2">{{ categories.length }}</span>
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
</template>
<script>
import moment from "moment";
import axios from "axios";
import swal from "sweetalert";
import { chunk } from "../../custom/helpers.js";
import Popper from "popper.js";
import Spinner from "../../components/Spinner.vue";

export default {
  components: {
    Spinner,
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

      isUserSearch: false,
      search: "",

      errors: [],

      displayAddModal: false,
      displayEditModal: false,
      tooltipShow: false,

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
    toggleTooltip() {
      if (this.tooltipShow) {
        this.tooltipShow = false;
      } else {
        this.tooltipShow = true;
        new Popper(this.$refs.btnRef, this.$refs.tooltipRef, {
          placement: "left",
        });
      }
    },
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
      this.isUserSearch = true;
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