<template>
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
            class="mr-6 mt-8 py-2 w-full flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 shadow-sm"
          >
            <h3
              class="flex flex-col px-5 py-2 my-2 text-2xl font-semibold dark:text-gray-300"
            >
              <span>Sets</span>
            </h3>

            <span class="text-sm text-gray-700 ml-5"
              ><small
                >Don't forget to press (ENTER) key after you typed.</small
              ></span
            >

            <div class="flex flex-row justify-between">
              <input
                type="text"
                class="w-64 ml-5 bg-white border border-gray-400 focus:border-gray-500 px-4 py-2 text-sm focus:outline-none"
                placeholder="Search by Name or Category"
                v-model="searchItem"
                @keyup.enter="search"
              />

              <router-link to="/admin/set/create">
                <div
                  class="float-right text-white bg-blue-400 rounded-full shadow w-10 animate-pulse mr-5 cursor-pointer"
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
              </router-link>
            </div>

            <div class="flex flex-col px-5 py-3">
              <table class="table-fixed border-collapse">
                <thead>
                  <tr>
                    <td
                      class="border border-gray-300 w-1/4 px-4 py-3 uppercase text-center font-medium"
                    >
                      Name
                    </td>
                    <td
                      class="border border-gray-300 w-1/4 px-4 py-3 uppercase text-center font-medium"
                    >
                      Category
                    </td>
                    <td
                      class="border border-gray-300 w-1/4 px-4 py-3 uppercase text-center font-medium"
                    >
                      Set effects
                    </td>
                    <td
                      class="border border-gray-300 w-1/4 px-4 py-3 uppercase text-center font-medium"
                    >
                      created at
                    </td>
                    <td
                      class="border border-gray-300 w-10 px-4 py-3 uppercase text-center font-medium"
                    >
                      Actions
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="set in sets" :key="set.id">
                    <td
                      class="border border-gray-300 w-1/4 px-4 py-3 capitalize align-middle text-center text-sm"
                    >
                      {{ set.name }}
                    </td>
                    <td
                      class="border border-gray-300 w-1/4 px-4 py-3 capitalize align-middle text-center text-sm"
                    >
                      <span class="bg-green-500 text-white p-1 rounded-sm">
                        {{ set.type }}
                      </span>
                    </td>
                    <td class="border border-gray-300 w-1/4 px-4 py-3">
                      <div
                        class="w-10 h-10 bg-blue-500 text-white rounded-full shadow p-2 mr-auto ml-auto cursor-pointer"
                        @click="viewSetEffects(set)"
                      >
                        <svg
                          class="w-6 h-6 ml-auto mr-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                    </td>
                    <td
                      class="border border-gray-300 w-10 p-2 capitalize align-middle text-center text-sm"
                    >
                      {{ formatDate(set.created_at) }}
                    </td>
                    <td
                      class="border border-gray-300 w-10 p-2 capitalize align-middle cursor-pointer"
                    >
                      <router-link
                        :to="{
                          name: 'AdminEditSet',
                          params: { id: set.id },
                        }"
                      >
                        <div
                          class="w-10 h-10 bg-green-500 text-white rounded-full shadow p-2 mr-auto ml-auto cursor-pointer"
                          @click="edit(category)"
                        >
                          <svg
                            class="w-6 h-6 mr-auto ml-auto"
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
                <tbody v-if="sets.length === 0 && !isUserSearch">
                  <tr>
                    <td class="px-4 py-3 border" colspan="5">
                      <spinner
                        class="ml-auto mr-auto"
                        height="h-10"
                        width="w-10"
                        color="text-green-500"
                      ></spinner>
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="sets.length === 0 && isUserSearch">
                  <tr>
                    <td
                      class="border text-sm text-red-500 px-4 py-3 text-center"
                      colspan="5"
                    >
                      No available data...
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="flex flex-row-reverse mt-2">
                <div>
                  <nav class="inline-flex shadow-sm">
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
                      <span v-if="!isUserSearch" class="mr-2">{{ page }}</span>
                      <span v-else class="mr-2">{{ searchPageIndex }}</span>
                      to
                      <span class="mr-2 ml-2">{{ pagination_total }}</span>
                      of
                      <span class="semi-bold ml-2">{{ total_items }}</span>
                    </a>

                    <a
                      @click="next"
                      class="cursor-pointer -ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
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
      </main>
    </div>
  </div>
  <div>
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div
        class="relative w-auto my-6 mx-auto max-w-3xl transition duration-500 ease-in-out bg-blue-600"
      >
        <!--content-->
        <div
          class="border-0 rounded-sm shadow-sm relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
          >
            <h3 class="text-2xl font-semibold capitalize">
              {{ selectedSet.name }} effects
            </h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="toggleModal()"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <span class="font-semibold">Parts : </span>
            <div class="container mt-0">
              <div class="flex flex-row">
                <img
                  class="object-scale-down mr-2 align-middle animate-pulse bg-gray-300 p-1 rounded-full shadow-lg"
                  v-for="(item, index) in selectedSet.items"
                  :key="index"
                  :src="'/images/' + item.icon"
                  alt=""
                />
              </div>

              <span
                class="capitalize"
                v-for="(effect, index) in JSON.parse(selectedSet.parts)"
                :key="index"
              >
                <button
                  class="ml-2 bg-green-500 text-white active:bg-green-600 uppercase text-sm px-3 outline-none focus:outline-none mt-3 rounded-sm"
                  style="transition: all 0.15s ease"
                >
                  {{
                    effect
                      .replace(/_/gi, " ")
                      .replace(/parts/gi, "")
                      .toLowerCase()
                  }}
                </button>
              </span>
            </div>

            <hr class="my-2" />
            <span class="font-semibold">Set Effect :</span>
            <table class="table-fixed mt-2 ml-auto mr-auto">
              <thead>
                <tr class="text-center font-semibold">
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 capitalize text-sm"
                  >
                    No of parts
                  </td>
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 capitalize text-sm"
                  >
                    Attributes
                  </td>
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 capitalize text-sm"
                  >
                    Attributes Value
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(effect, index) in JSON.parse(selectedSet.effects)"
                  :key="index"
                >
                  <td
                    class="text-center w-64 border border-gray-300 px-4 py-2 text-sm capitalize"
                  >
                    {{ index.split("_")[index.split("_").length - 1] }}/{{
                      selectedSet.items.length
                    }}
                  </td>
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 text-sm capitalize text-center"
                  >
                    {{
                      index
                        .replace(/_/gi, " ")
                        .replace(/^DST/, "")
                        .replace(/\d+/gi, "")
                    }}
                  </td>
                  <td
                    class="w-64 text-center border border-gray-300 px-4 py-2 text-sm capitalize"
                  >
                    {{ effect }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
          >
            <button
              class="border border-solid border-red-500 bg-red-500 text-white font-medium uppercase text-sm px-6 py-2 rounded-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all 0.15s ease"
              v-on:click="toggleModal()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import Sidebar from "../../components/Dashboard/Sidebar.vue";
import axios from "axios";
import moment from "moment";
import Spinner from "../../components/Spinner.vue";
export default {
  data() {
    return {
      showModal: false,

      sets: [],
      selectedSet: {},
      searchItem: "",
      searchPageIndex: 1,
      isUserSearch: false,
      page: 1,
      prevPage: "",
      nextPage: "",
      pagination_total: 0,
      total_items: 0,
    };
  },
  components: {
    Sidebar,
    Spinner,
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    },
    getSets() {
      axios.get(`admin/sets/${this.page}`).then((response) => {
        console.log(response.data);
        this.sets = response.data.items;
        this.pagination_total = response.data.pagination_total;
        this.nextPage = response.data.next;
        this.prevPage = response.data.previous;
        this.total_items = response.data.total_items;
      });
    },
    search() {
      axios
        .get(`admin/set/search/${this.searchItem}/${this.searchPageIndex}`)
        .then((response) => {
          console.log(response.data);
          this.sets = response.data.items;
          this.pagination_total = response.data.pagination_total;
          this.nextPage = response.data.next;
          this.prevPage = response.data.previous;
          this.total_items = response.data.total_items;
          this.isUserSearch = true;
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
    viewSetEffects(set) {
      this.showModal = true;
      this.selectedSet = set;
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
  watch: {
    page() {
      this.getSets();
    },
    searchPageIndex() {
      this.search();
    },
    searchItem(to) {
      if (!to) {
        this.getSets();
      }
    },
  },
  created() {
    this.getSets();
  },
  computed: {},
};
</script>
