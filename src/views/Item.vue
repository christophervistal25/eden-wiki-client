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
              <input
                id="search-item"
                class="float-left ml-5 w-64 bg-white border border-gray-400 hover:border-gray-800 px-4 py-2 rounded leading-tight"
                type="text"
                v-model="searchItem"
                placeholder="Search"
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
                    <td class="border px-4 py-2 capitalize">
                      {{ item.name }}
                    </td>
                    <td
                      class="border px-4 py-2 capitalize text-sm text-gray-800 text-center"
                    >
                      {{ item.description }}
                    </td>
                    <td
                      class="border px-4 py-2 capitalize text-sm text-gray-800 text-center capitalize"
                    >
                      {{ item.gender }}
                    </td>
                    <td
                      class="border px-4 py-2 capitalize text-sm text-gray-800 text-center"
                    >
                      {{ item.level }}
                    </td>
                    <td
                      class="border px-4 py-2 capitalize text-sm text-gray-800 text-center"
                    >
                      {{ item.job }}
                    </td>
                    <td class="text-center border px-4 py-2">
                      <small>
                        <button
                          class="bg-blue-500 w-48 cursor-default focus:outline-none shadow text-white font-body py-2 px-4 rounded-full capitalize"
                        >
                          {{ item.sub_category.category.name }} /
                          {{ item.sub_category.name.toLowerCase() }}
                        </button>
                      </small>
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

                    <td class="border px-4 py-2 text-center">
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
                    <td
                      colspan="9"
                      class="border px-4 py-2 text-center text-red-600"
                    >
                      No available data
                    </td>
                  </tr>
                </tbody>
              </table>
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
import { config } from "../custom/auth.js";

export default {
  data() {
    return {
      items: [],
      temp_items: [],
      addNewItemDisplay: false,
      editItemDisplay: false,
      sub_categories: [],
      errors: [],
      item: {},
      selected_item: {},
      searchItem: "",
    };
  },
  components: {
    Sidebar,
    Modal,
  },
  watch: {
    searchItem(to) {
      if (to) {
        this.items = this.temp_items.filter((item) =>
          item.name.toLowerCase().includes(to.toLowerCase())
        );
      } else {
        this.items = this.temp_items;
      }
    },
  },
  methods: {
    getItems() {
      axios.get(`items`).then((response) => {
        this.items = response.data;
        this.temp_items = response.data;
      });
    },
    addNewItem() {
      axios
        .post("create/item", this.item, config)
        .then((response) => {
          if (response.status === 200) {
            this.errors = [];
            this.addNewItemDisplay = true;
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
      this.editItemDisplay = true;
    },
    updateItem() {
      axios
        .put(`item/edit/${this.selected_item.id}`, this.selected_item, config)
        .then((response) => {
          if (response.status === 200) {
            this.errors = [];
            this.editItemDisplay = false;
            this.selected_item = {};
            swal("Good job!", "You Successfully update item.", "success");
          }
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.editItemDisplay = false;
            this.errors = err.response.data;
          }
        });
    },
    closeEditModal() {
      this.errors = [];
      this.editItemDisplay = false;
    },
    closeAddModal() {
      this.addNewItemDisplay = false;
      this.errors = [];
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    },
  },
  created() {
    this.getItems();
    axios
      .get(`sub-categories`)
      .then((response) => (this.sub_categories = response.data));
  },
};
</script>
