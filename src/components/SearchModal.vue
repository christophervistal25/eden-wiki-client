<template>
  <div>
    <div
      v-if="display"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex flex-col items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
          >
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              @click="close"
            >
              <span
                class="bg-transparent text-red-500 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >
                ×
              </span>
            </button>

            <small class="text-green-700"
              >Don't forget to press enter after you input.</small
            >
            <input
              autofocus
              focus
              :class="hasError"
              class="rounded block w-full bg-white border border-gray-300 py-4 px-4 leading-tight focus:outline-none focus:border-gray-400"
              type="text"
              v-model="searchKeyword"
              placeholder="e.g. (Leaf Suit)"
              @keyup.enter="search"
            />
          </div>
          <!--body-->
          <div
            class="relative px-6 py-2 flex-auto overflow-y-auto"
            style="height: 60vh; width: 40vw"
          >
            <svg
              v-show="searchProcess"
              class="h-10 w-10 ml-auto mr-auto"
              viewBox="0 0 38 38"
              stroke="currentColor"
              stroke-opacity=".5"
            >
              <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                  <circle stroke-opacity=".3" cx="18" cy="18" r="18"></circle>
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </path>
                </g>
              </g>
            </svg>

            <div v-if="!hasItemSelect">
              <div
                class="cursor-pointer"
                v-for="(item, index) in items"
                v-bind:key="index"
              >
                <div
                  class="capitalize text-sm bg-green-500 text-white focus:outline-none px-1 h-full w-auto"
                >
                  <span>{{ item.sub_category.category.name }} </span>
                  -
                  <span
                    >{{
                      item.sub_category.name
                        .replace("IK3", "")
                        .replace(/_/gi, " ")
                        .replace("TEXT", "")
                        .toLowerCase()
                    }}
                  </span>
                </div>
                <div
                  @click="userSelectAnItem(item)"
                  class="px-2 py-3 bg-gray-100 mb-5 flex flex-row border-gray-100"
                >
                  <img
                    class="object-scale-down mr-5"
                    :src="'/images/' + item.icon"
                    alt=""
                  />
                  <div class="capitalize mt-auto">
                    {{ item.name }}
                  </div>
                  <span
                    v-if="item.set"
                    class="text-sm bg-blue-500 text-white focus:outline-none rounded-lg px-1 h-full capitalize ml-1"
                    >set part</span
                  >
                  <span class="text-sm mt-auto ml-auto text-green-700"
                    >Click for more info</span
                  >
                </div>
              </div>
              <div class="text-center mt-2" v-if="items.length >= maxNoDisplay">
                <button
                  class="bg-gray-200 hover:shadow text-sm font-semibold px-2 py-2 rounded-lg"
                >
                  Show more result
                </button>
              </div>
            </div>
            <div v-else>
              <img
                class="object-scale-down mr-auto ml-auto"
                :src="'/images/' + selectedItem.icon"
                alt=""
              />
              <p class="capitalize mt-2 text-center">
                <span>{{ selectedItem.sub_category.category.name }}</span>
                / {{ selectedItem.sub_category.name.toLowerCase() }} /
                <span class="font-semibold"> {{ selectedItem.name }}</span>
              </p>
              <div class="text-center">
                <p
                  v-if="selectedItem.description != 'N/A'"
                  class="text-gray-700 px-2"
                >
                  {{ selectedItem.description }}
                </p>
                <p
                  v-else-if="selectedItem.description == 'N/A'"
                  class="text-red-700 px-2"
                >
                  No available description
                </p>
                <p v-else class="text-red-700 px-2">No available description</p>
              </div>

              <table class="table-fixed mt-2 ml-auto mr-auto">
                <thead>
                  <tr>
                    <td
                      class="w-64 border border-gray-300 px-4 py-2 capitalize text-sm font-semibold text-center"
                    >
                      Gender
                    </td>
                    <td
                      class="w-64 border border-gray-300 px-4 py-2 capitalize text-sm font-semibold text-center"
                    >
                      Job
                    </td>
                    <td
                      class="w-64 border border-gray-300 px-4 py-2 text-sm font-semibold text-center"
                    >
                      Level
                    </td>
                    <td
                      class="w-64 border border-gray-300 px-4 py-2 text-sm font-semibold text-center"
                    >
                      Item Effect
                    </td>
                    <!-- <td class="w-64 border border-gray-300 px-4 py-2 text-sm">
                    Attack / Def
                  </td> -->
                    <td
                      class="w-64 border border-gray-300 px-4 py-2 text-sm font-semibold text-center"
                    >
                      Handed
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      class="w-64 border border-gray-300 px-4 py-2 text-sm capitalize text-center"
                    >
                      {{
                        selectedItem.gender === "="
                          ? "Any"
                          : selectedItem.gender.toLowerCase()
                      }}
                    </td>
                    <td
                      class="w-64 border border-gray-300 px-4 py-2 text-sm capitalize text-center"
                    >
                      {{
                        selectedItem.job === "="
                          ? "Any"
                          : selectedItem.job.replace("_", " ").toLowerCase()
                      }}
                    </td>
                    <td
                      class="w-64 border border-gray-300 px-4 py-2 text-sm text-center"
                    >
                      {{ selectedItem.level == 0 ? 1 : selectedItem.level }}
                    </td>
                    <td
                      class="w-64 border border-gray-300 px-4 py-2 text-sm align-middle text-center"
                    >
                      {{
                        selectedItem.effect_1 == "= : ="
                          ? ""
                          : selectedItem.effect_1
                      }}
                      <br />
                      {{
                        selectedItem.effect_2 == "= : ="
                          ? ""
                          : selectedItem.effect_2
                      }}
                      <br />
                      {{
                        selectedItem.effect_3 == "= : ="
                          ? ""
                          : selectedItem.effect_3
                      }}
                    </td>
                    <!-- <td
                    class="text-center w-64 border border-gray-300 px-4 py-2 text-sm"
                  >
                    {{ selectedItem.ability_min }} - {{ selectedItem.ability_max }}
                  </td> -->
                    <td
                      class="w-64 border border-gray-300 px-4 py-2 text-sm text-center"
                    >
                      <span v-if="selectedItem.handed === 'HD ONE'"
                        >One-Handed</span
                      >
                      <span v-else-if="selectedItem.handed === 'HD TWO'"
                        >Two-Handed</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="selectedItem.set">
                <hr class="my-2" />

                <span class="font-semibold">Parts : </span>
                <div class="container mt-0">
                  <div class="flex flex-row">
                    <img
                      class="object-contain mr-2"
                      v-for="(icon, index) in getIcons(
                        selectedItem.set.type,
                        selectedItem.icon
                      )"
                      :key="index"
                      :src="'/images/' + icon"
                      alt=""
                    />
                  </div>

                  <span
                    class="capitalize"
                    v-for="(effect, index) in JSON.parse(
                      selectedItem.set.parts
                    )"
                    :key="index"
                  >
                    <button
                      class="cursor-text ml-2 bg-green-500 text-white active:bg-green-600 uppercase text-sm px-3 outline-none focus:outline-none mt-3 rounded-lg"
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
                      v-for="(effect, index) in JSON.parse(
                        selectedItem.set.effects
                      )"
                      :key="index"
                    >
                      <td
                        class="text-center w-64 border border-gray-300 px-4 py-2 text-sm capitalize"
                      >
                        {{ index.split("_")[index.split("_").length - 1] }}/{{
                          Object.keys(JSON.parse(selectedItem.set.parts)).length
                        }}
                      </td>
                      <td
                        class="w-64 border border-gray-300 px-4 py-2 text-sm capitalize text-center"
                      >
                        {{
                          index
                            .replace(/_/gi, " ")
                            .replace(/^DST/, "")
                            .replace(/\d+/g, "")
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
            </div>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
          ></div>
        </div>
      </div>
    </div>
    <div v-if="display" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import axios from "axios";
import { getIcons } from "../custom/helpers.js";
export default {
  props: {
    display: Boolean,
  },
  data() {
    return {
      items: [],
      searchProcess: false,
      searchKeyword: "",
      hasError: "",
      selectedItem: {},
      hasItemSelect: false,

      maxNoDisplay: 11,
    };
  },
  methods: {
    getIcons,
    search() {
      this.items = [];
      if (this.searchKeyword) {
        this.hasError = "";
        this.searchProcess = true;

        axios
          .get(`user/search/item/${this.searchKeyword}`)
          .then((response) => {
            this.searchProcess = false;
            this.items = response.data;
          })
          .catch(() => {
            this.searchProcess = false;
          });
      } else {
        this.hasError = "border border-red-500  focus:border-red-500";
      }
    },
    close() {
      this.items = [];
      this.$emit("close");
      this.hasItemSelect = false;
      this.selectedItem = {};
      this.searchKeyword = "";
    },
    userSelectAnItem(item) {
      this.hasItemSelect = true;
      this.selectedItem = item;
      // this.selectedItem.set.no_of_parts = Object.keys(
      //   JSON.parse(item.set.parts)
      // ).length;
      // console.log(this.selectedItem);
    },
  },
  watch: {
    searchKeyword(to) {
      this.hasItemSelect = false;
      if (!to && to.length == 0) {
        this.items = [];
      }
    },
  },
};
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 1.5px rgb(66, 64, 64); */
  /* border-radius: 5px; */
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  /* border-radius: 15px; */
}
</style>