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
          <span>Administrator</span>
        </div>
        <div class="flex">
          <div
            class="mr-6 mt-8 py-2 w-full flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-lg"
          >
            <h3
              class="flex flex-col px-5 py-1 text-lg font-semibold dark:text-gray-300"
            >
              <span>Items</span>
            </h3>

            <div>
              <span class="text-sm text-gray-700 ml-5"
                >Don't forget to press (ENTER) key after you typed.</span
              >
              <br />
              <input
                id="search-item"
                class="float-left ml-5 w-64 bg-white border border-gray-400 hover:border-gray-800 px-4 py-2 rounded leading-tight"
                type="text"
                v-model="searchItem"
                @keyup.enter="search"
                placeholder="Search name"
              />

              <button
                @click="addNewItemDisplay = true"
                type="button"
                class="mr-5 float-right w-auto rounded-md border border-gray-300 px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Add new item
              </button>
            </div>

            <div class="flex flex-col px-5 py-3">
              <table class="table-auto">
                <thead>
                  <tr>
                    <th class="px-4 border py-2">Name</th>
                    <th class="px-4 border py-2">Description</th>
                    <th class="px-4 border py-2">Gender</th>
                    <th class="px-4 border py-2">Level</th>
                    <th class="px-4 border py-2">Job</th>
                    <th class="px-4 border py-2">Category / Sub - Category</th>
                    <th class="px-4 border py-2">Status</th>
                    <th class="px-4 border py-2">Created At</th>
                    <th class="px-4 border py-2">Actions</th>
                  </tr>
                </thead>
                <tbody v-if="items.length != 0">
                  <tr v-for="item in items" v-bind:key="item.id">
                    <td class="border px-4 py-2 capitalize text-sm">
                      {{ item.name }}
                    </td>
                    <td
                      class="border px-4 py-2 capitalize text-sm text-gray-800"
                    >
                      {{ item.description }}
                    </td>
                    <td
                      class="border px-4 py-2 capitalize text-gray-800 text-center capitalize text-sm"
                    >
                      {{ item.gender }}
                    </td>
                    <td
                      class="border px-4 py-2 capitalize text-gray-800 text-center text-sm"
                    >
                      {{ item.level }}
                    </td>
                    <td
                      class="border px-4 py-2 capitalize text-gray-800 text-center"
                    >
                      {{ item.job }}
                    </td>
                    <td class="text-center border px-4 py-2">
                      <span
                        class="w-auto cursor-default focus:outline-none text-white font-body py-2 px-4 capitalize text-gray-800 text-sm"
                      >
                        {{ item.sub_category.category.name }} /
                        {{ item.sub_category.name.toLowerCase() }}
                      </span>
                    </td>
                    <td class="text-center border px-4 py-2">
                      <small>
                        <button
                          v-if="item.status == 'active'"
                          class="button-small bg-green-500 cursor-default focus:outline-none shadow text-white font-body py-2 px-4 rounded-full capitalize"
                        >
                          {{ item.status }}
                        </button>
                        <button
                          v-else
                          class="bg-red-500 cursor-default focus:outline-none shadow text-white font-body py-2 px-4 rounded-full capitalize"
                        >
                          {{ item.status }}
                        </button>
                      </small>
                    </td>

                    <td class="border px-4 py-2 text-center text-sm">
                      {{ formatDate(item.created_at) }}
                    </td>

                    <td class="border px-4 py-2 text-center">
                      <svg
                        @click="editItem(item)"
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
                    <td colspan="9" class="border px-4 py-2 text-center">
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
                v-if="!isSearch"
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
                        <span class="font-semibold mr-2">{{ page }}</span>
                        to
                        <span class="font-semibold mr-2 ml-2">{{
                          pagination_total
                        }}</span>
                        of
                        <span class="semi-bold ml-2">{{ total_items }}</span>
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
        </div>
      </main>
    </div>
  </div>
  <modal :display="addNewItemDisplay">
    <template v-slot:header>
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
        Add new Item
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
      <label for="add-item-name">Name</label>
      <input
        id="add-item-name"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
        type="text"
        v-model="item.name"
        placeholder="Name"
      />

      <label for="add-item-description">Description</label>
      <textarea
        id="add-item-description"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
        cols="30"
        rows="10"
        v-model="item.description"
        placeholder="Description"
      ></textarea>

      <label for="add-item-gender">Gender</label>
      <select
        id="add-item-gender"
        v-model="item.gender"
        class="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
      >
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>

      <label for="add-item-gender">Level</label>
      <input
        id="add-item-level"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
        type="number"
        v-model="item.level"
        placeholder="Level"
      />

      <label for="add-item-job">Job</label>
      <input
        id="add-item-job"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
        type="text"
        v-model="item.job"
        placeholder="Job"
      />

      <label for="add-item-category-and-sub">Category / Sub - Category</label>
      <select
        id="add-item-category-and-sub"
        v-model="item.sub_category_id"
        class="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3 capitalize"
      >
        <option
          v-for="sub_category in sub_categories"
          v-bind:key="sub_category.id"
          :value="`${sub_category.id}`"
        >
          {{ sub_category.category.name }} /
          {{ sub_category.name.toLowerCase() }}
        </option>
      </select>
    </template>

    <template v-slot:footer>
      <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button
          @click="addNewItem"
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

  <modal :display="editItemDisplay">
    <template v-slot:header>
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
        Update Item
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
      <label for="edit-item-name">Name</label>
      <input
        id="edit-item-name"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
        type="text"
        v-model="selected_item.name"
        placeholder="Name"
      />

      <label for="edit-item-description">Description</label>
      <textarea
        id="edit-item-description"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
        cols="30"
        rows="10"
        v-model="selected_item.description"
        placeholder="Description"
      ></textarea>

      <label for="edit-item-gender">Gender</label>
      <select
        id="edit-item-gender"
        v-model="selected_item.gender"
        class="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
      >
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>

      <label for="edit-item-gender">Level</label>
      <input
        id="edit-item-level"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
        type="number"
        v-model="selected_item.level"
        placeholder="Level"
      />

      <label for="edit-item-job">Job</label>
      <input
        id="edit-item-job"
        class="flex flex-col flex-grow appearance-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
        type="text"
        v-model="selected_item.job"
        placeholder="Job"
      />

      <label for="edit-item-category-and-sub">Category / Sub - Category</label>
      <select
        id="edit-item-category-and-sub"
        v-model="selected_item.sub_category_id"
        class="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3"
      >
        <option
          v-for="sub_category in sub_categories"
          v-bind:key="sub_category.id"
          :value="`${sub_category.id}`"
        >
          {{ sub_category.category.name }} / {{ sub_category.name }}
        </option>
      </select>
    </template>

    <template v-slot:footer>
      <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button
          @click="updateItem"
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
import Sidebar from "../components/Dashboard/Sidebar.vue";
import Modal from "../components/Dashboard/Modal.vue";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";

export default {
  data() {
    return {
      items: [],
      addNewItemDisplay: false,
      editItemDisplay: false,
      sub_categories: [],
      errors: [],
      item: {},
      selected_item: {},
      itemBeforeEdit: {},
      searchItem: "",

      page: 1,

      total_items: 0,
      pagination_total: 0,
      prevPage: "",
      nextPage: "",

      isSearch: false,
    };
  },
  components: {
    Sidebar,
    Modal,
  },
  watch: {
    searchItem(to) {
      // If the search input field has no value.
      if (!to) {
        this.getItems();
      }
    },
    page() {
      this.getItems();
    },
  },
  methods: {
    getItems() {
      axios.get(`admin/items/${this.page}`).then((response) => {
        this.total_items = response.data.total_items;
        this.pagination_total = response.data.pagination_total;
        this.nextPage = response.data.next;
        this.prevPage = response.data.previous;
        this.items = response.data.items;
        this.isSearch = false;
      });
    },
    addNewItem() {
      axios
        .post("admin/create/item", this.item)
        .then((response) => {
          if (response.status === 200) {
            this.errors = [];
            this.addNewItemDisplay = false;
            this.item = {};
            this.items.unshift(response.data);
            swal("Good job!", "You Successfully add new item.", "success");
          }
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.errors = err.response.data;
          }
        });
    },
    editItem(selected_item) {
      this.selected_item = selected_item;
      this.itemBeforeEdit = Object.assign({}, this.selected_item);
      this.editItemDisplay = true;
    },
    updateItem() {
      axios
        .put(`admin/item/edit/${this.selected_item.id}`, this.selected_item)
        .then((response) => {
          if (response.status === 200) {
            this.errors = [];
            this.editItemDisplay = false;

            this.items.map((item, index) => {
              if (item.id == response.data.id) {
                this.items[index] = response.data;
              }
            });

            this.selected_item = {};
            swal("Good job!", "You Successfully update item.", "success");
          }
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.errors = err.response.data;
          }
        });
    },
    search() {
      if (this.searchItem) {
        this.isSearch = true;
        this.items = [];
        axios
          .get(`admin/search/item/name/${this.searchItem}`)
          .then((response) => (this.items = response.data.items));
      }
    },
    closeEditModal() {
      this.errors = [];
      this.editItemDisplay = false;
      Object.assign(this.selected_item, this.itemBeforeEdit);
    },
    closeAddModal() {
      this.addNewItemDisplay = false;
      this.errors = [];
    },
    next() {
      if (this.nextPage != null) {
        this.page = this.nextPage;
      }
    },
    previous() {
      if (this.prevPage != null) {
        this.page = this.prevPage;
      }
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    },
  },
  created() {
    this.getItems();
    axios
      .get(`admin/sub-categories`)
      .then((response) => (this.sub_categories = response.data));
  },
  computed: {},
};
</script>
