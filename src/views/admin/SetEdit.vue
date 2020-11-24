<template>
  <div>
    <div class="dashboard">
      <!-- component -->
      <div class="h-screen w-screen flex overflow-hidden select-none">
        <sidebar></sidebar>
        <main
          class="my-1 pt-2 pb-2 px-10 flex-1 bg-gray-200 dark:bg-black rounded-l-lg transition duration-500 ease-in-out overflow-y-auto"
        >
          <div class="flex flex-col capitalize text-2xl">
            <span class="font-semibold">hello,</span>
            <span>Administrator</span>
          </div>
          <br />
          <div class="flex">
            <div
              class="mr-6 mt-8 py-2 w-full flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-sm shadow-sm"
            >
              <h3
                class="flex flex-col px-5 py-1 text-2xl font-semibold dark:text-gray-300 capitalize"
              >
                <span>Edit Set {{ set.name }}</span>
              </h3>

              <div class="flex flex-col px-5 py-3">
                <ul class="text-red-500 px-8 mb-2 text-sm">
                  <li v-for="(error, key) in errors" :key="key">
                    {{ errors[key][0] }}
                  </li>
                </ul>

                <form @submit.prevent="updateSet">
                  <div class="w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      class="appearance-none block w-full text-gray-700 py-2 px-4 mb-3 focus:outline-none bg-white border border-gray-500 capitalize rounded-sm"
                      type="text"
                      v-model="name"
                      placeholder="Set name here"
                    />
                  </div>

                  <hr class="mb-2" />

                  <!-- :class="
                        set.items.length !== 0 ? 'bg-green-500' : 'bg-gray-700'
                      " -->
                  <div class="px-3 mb-2">
                    <button
                      :class="
                        selectedItems.length !== 0
                          ? 'bg-green-500'
                          : 'bg-gray-800'
                      "
                      class="text-white shadow py-2 px-2 rounded-sm focus:outline-none mb-2"
                      @click="linkItemModalShow = true"
                      type="button"
                    >
                      <span v-if="selectedItems.length" class="text-sm">
                        {{ selectedItems.length }} Parts Selected
                      </span>
                      <span class="text-sm" v-else> Select Parts </span>
                    </button>
                    <br />

                    <span
                      class="p-2 inline-block text-sm"
                      v-for="item in selectedItems"
                      :key="item.id"
                    >
                      <img
                        class="object-scale-down animate-pulse bg-gray-300 p-1 rounded-full shadow-lg mb-2 mr-auto ml-auto"
                        :src="/images/ + item.icon"
                      />
                      {{ item.name }}
                    </span>
                    <hr class="mb-2" />
                  </div>

                  <div class="w-full px-3 mb-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    >
                      Set effects
                    </label>
                    <button
                      class="rounded-full bg-blue-500 text-white w-10 py-2 hover:shadow-lg focus:outline-none mb-2"
                      @click="addSetEffectField"
                      type="button"
                    >
                      +
                    </button>
                    <div v-for="(item, i) in setEffects.length" :key="i">
                      <div class="flex flex-row px-3 space-x-3">
                        <input
                          class="appearance-none block w-1/2 text-gray-700 border rounded-sm py-3 px-4 mb-3 focus:outline-none bg-white border-gray-500"
                          type="text"
                          placeholder="e.g 4/4"
                          v-model="setEffects[i].no_of_parts"
                        />

                        <input
                          class="appearance-none block w-1/2 text-gray-700 border rounded-sm py-3 px-4 mb-3 focus:outline-none bg-white border-gray-500 uppercase"
                          type="text"
                          v-model="setEffects[i].attribute"
                          placeholder="e.g (STR)"
                        />

                        <input
                          class="appearance-none block w-1/2 text-gray-700 border rounded-sm py-3 px-4 mb-3 focus:outline-none bg-white border-gray-500"
                          type="text"
                          v-model="setEffects[i].attribute_value"
                          placeholder="e.g +20"
                        />

                        <button
                          class="rounded-full bg-red-500 text-white w-10 h-full mt-3 font-semibold hover:shadow-lg focus:outline-none"
                          @click="removeField(i)"
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <button
                    class="float-right shadow bg-green-500 hover:bg-green-400 mt-2 focus:border-green-500 focus:outline-none text-white py-2 px-4 rounded-sm uppercase"
                    type="submit"
                  >
                    Update Set
                  </button>
                  <div class="clearfix"></div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>

  <div>
    <div
      v-if="linkItemModalShow"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-screen my-6 mx-auto text-sm p-40 mt-40">
        <!--content-->
        <div
          class="border-0 rounded-sm shadow-sm relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
          >
            <h3 class="text-3xl font-semibold">Items</h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                @click="linkItemModalShow = false"
              >
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6">
            <span class="text-sm text-gray-700"
              ><small
                >Don't forget to press (ENTER) key after you typed.</small
              ></span
            >
            <br />
            <input
              id="search-item"
              class="mb-1 w-64 bg-white border border-gray-400 focus:border-gray-500 px-4 py-2 text-sm focus:outline-none"
              type="text"
              v-model="searchItem"
              @keyup.enter="search"
              placeholder="Search"
            />
            <table class="table-fixed">
              <thead>
                <tr>
                  <td
                    class="border border-gray-300 p-2 w-auto px-3 py-3 font-medium uppercase"
                  >
                    Select
                  </td>
                  <td
                    class="border border-gray-300 p-2 w-auto px-3 py-3 font-medium uppercase"
                  >
                    Icon
                  </td>
                  <td
                    class="border border-gray-300 p-2 w-1/2 font-medium uppercase text-center"
                  >
                    Name
                  </td>
                  <td
                    class="border border-gray-300 p-2 w-1/5 font-medium uppercase text-center"
                  >
                    Sub - Category
                  </td>
                  <td
                    class="border border-gray-300 p-2 w-auto font-medium uppercase"
                  >
                    Level
                  </td>
                  <td
                    class="border border-gray-300 p-2 w-1/3 font-medium uppercase text-center"
                  >
                    Job
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in items"
                  :key="item.id"
                  class="hover:bg-gray-300 cursor-pointer"
                  @click="select(item)"
                  style="transition: all 0.15s ease"
                >
                  <td
                    class="border border-gray-300 p-2 w-auto text-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :checked="selectedItems.includes(item)"
                    />
                  </td>
                  <td class="border border-gray-300 p-2 w-auto">
                    <img
                      class="object-contain mr-auto ml-auto"
                      :src="'/images/' + item.icon"
                      alt=""
                    />
                  </td>
                  <td
                    class="cursor-pointer border border-gray-300 p-2 w-1/2 capitalize"
                    style="transition: all 0.15s ease"
                  >
                    {{ item.name }}
                  </td>
                  <td
                    class="border border-gray-300 p-2 w-1/5 text-center capitalize"
                  >
                    {{ item.sub_category.name }}
                  </td>
                  <td class="border border-gray-300 p-2 w-auto text-center">
                    {{ item.level }}
                  </td>
                  <td class="border border-gray-300 p-2 w-1/3 text-center">
                    {{ item.job }}
                  </td>
                </tr>
              </tbody>
              <tbody v-if="items.length === 0 && isUserSearch">
                <tr>
                  <td
                    class="border text-sm text-red-500 px-4 py-3 text-center"
                    colspan="10"
                    rowspan="5"
                  >
                    No available data...
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex flex-row-reverse mt-2">
              <div>
                <nav class="inline-flex">
                  <a
                    @click="previous"
                    class="cursor-pointer relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
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
                    <span v-if="!isUserSearch" class="mr-2">{{ page }}</span>
                    <span v-else class="mr-2">{{ searchPageIndex }}</span>
                    to
                    <span class="mr-2 ml-2">{{ pagination_total }}</span>
                    of
                    <span class="semi-bold ml-2">{{ total_items }}</span>
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
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
          >
            <button
              class="text-white rounded-sm bg-green-500 px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 uppercase"
              type="button"
              @click="linkItemModalShow = false"
              style="transition: all 0.15s ease"
            >
              apply selected parts
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="linkItemModalShow"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script>
import Sidebar from "../../components/Dashboard/Sidebar.vue";
import axios from "axios";
import swal from "sweetalert";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      linkItemModalShow: false,

      isUserSearch: false,
      searchItem: "",
      searchPageIndex: 1,

      set: {},

      name: "",
      setEffects: [],
      selectedItems: [],
      errors: [],

      items: [],
      page: 1,
      prevPage: "",
      nextPage: "",
      pagination_total: 0,
      total_items: 0,
    };
  },
  methods: {
    getSet() {
      let setId = this.$route.params.id;
      axios.get(`admin/set/${setId}`).then((response) => {
        this.set = response.data;
        this.name = this.set.name;
        this.initializeSetItems(this.set.items);
        this.initializeSetEffectFields(JSON.parse(this.set.effects));
      });
    },
    getItems() {
      axios.get(`admin/set/item/list/${this.page}`).then((response) => {
        this.items = response.data.items;
        this.prevPage = response.data.previous;
        this.nextPage = response.data.next;
        this.pagination_total = response.data.pagination_total;
        this.total_items = response.data.total_items;
        // Push the set parts in select table.
        this.set.items.map((item) => this.items.unshift(item));
      });
    },
    initializeSetItems(items) {
      this.selectedItems = items;
    },
    initializeSetEffectFields(effects) {
      if (effects.length !== this.setEffects.length) {
        for (const [attribute, value] of Object.entries(effects)) {
          let noOfPartsRequire = attribute.match(/\d+/)[0];
          this.setEffects.push({
            no_of_parts: `${noOfPartsRequire} / ${this.selectedItems.length}`,
            attribute: attribute
              .replace(/_/gi, " ")
              .replace(/^DST/, "")
              .replace(/\d+/gi, "")
              .trim(),
            attribute_value: value,
          });
        }
      }
    },
    getSearchItems() {
      axios
        .get(
          `admin/set/item/list/search/${this.searchItem}/${this.searchPageIndex}`
        )
        .then((response) => {
          this.items = response.data.items;
          this.nextPage = response.data.next;
          this.prevPage = response.data.previous;
          this.total_items = response.data.total_items;
          this.pagination_total = response.data.pagination_total;
          this.isUserSearch = true;
        });
    },
    addSetEffectField() {
      this.setEffects.push({
        no_of_parts: "0 / " + this.selectedItems.length,
        attribute: "",
        attribute_value: "",
      });
    },
    removeField(index) {
      this.setEffects = this.setEffects.filter((data, i) => i !== index);
    },
    updateSet() {
      let selectedItems = [];

      this.selectedItems.map((data) => {
        selectedItems.push({
          id: data.id,
          type: data.sub_category.category.name,
        });
      });

      let data = {
        name: this.name,
        effects: JSON.stringify(this.setEffects),
        item_parts: JSON.stringify(selectedItems),
      };

      this.errors = [];
      let setId = this.$route.params.id;
      axios
        .put(`admin/set/edit/${setId}`, data)
        .then((response) => {
          if (response.status === 200) {
            swal(
              "Good job!",
              `Successfully update ${this.set.name} set.`,
              "success"
            );
          }
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.errors = err.response.data;
          }
        });
    },
    next() {
      if (this.nextPage !== null) {
        if (this.isUserSearch) {
          this.searchPageIndex = this.nextPage;
        } else {
          this.page = this.nextPage;
        }
      }
    },
    previous() {
      if (this.prevPage !== null) {
        if (this.isUserSearch) {
          this.searchPageIndex = this.prevPage;
        } else {
          this.page = this.prevPage;
        }
      }
    },
    select(item) {
      if (this.selectedItems.includes(item)) {
        // Remove the item
        this.selectedItems = this.selectedItems.filter(
          (data) => data.id !== item.id
        );
      } else {
        this.selectedItems.push(item);
      }
    },
    search() {
      this.getSearchItems();
    },
  },
  watch: {
    page() {
      this.getItems();
    },
    searchItem(to) {
      if (!to) {
        this.isUserSearch = false;
        this.getItems();
      }
    },
    searchPageIndex() {
      this.getSearchItems();
    },
  },
  created() {
    this.getSet();
    this.getItems();
  },
};
</script>

<style>
</style>