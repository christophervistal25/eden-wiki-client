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

        <div class="flex">
          <div
            class="mr-6 mt-8 py-2 w-full flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-lg"
          >
            <h3
              class="flex flex-col px-5 py-1 text-lg font-semibold dark:text-gray-300"
            >
              <span>Create Category</span>
            </h3>
            <div class="flex flex-col px-5 py-3">
              <div v-if="errors.length" class="mb-2">
                <p
                  class="text-red-500 text-sm ml-3"
                  v-for="(error, index) in errors"
                  :key="index"
                >
                  <span>&#9862;</span> {{ error }}
                </p>
                <hr class="my-2" />
              </div>

              <form @submit.prevent="">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    name
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    v-model="category.name"
                  />
                  <!-- <p class="text-gray-600 text-xs italic">
                    Make it as long and as crazy as you'd like
                  </p> -->
                </div>
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    class="w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    cols="30"
                    rows="10"
                    v-model="category.description"
                  ></textarea>
                </div>

                <div class="w-full px-3">
                  <div
                    class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
                  >
                    <input
                      type="checkbox"
                      name="toggle"
                      @click="switchChangeState"
                      id="toggle"
                      :checked="asMenu"
                      class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
                    />
                    <label
                      for="toggle"
                      class="list-none toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                  <label
                    for="toggle"
                    class="text-xs text-gray-700 font-bold cursor-pointer"
                    >Create as Menu</label
                  >
                </div>

                <div v-show="!asMenu">
                  <!-- Two columns -->
                  <ul class="flex mt-2 justify-center">
                    <li
                      @click="enableFeature('bold')"
                      :class="features.bold ? 'bg-gray-200' : ''"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M3 19V1h8a5 5 0 0 1 3.88 8.16A5.5 5.5 0 0 1 11.5 19H3zm7.5-8H7v5h3.5a2.5 2.5 0 1 0 0-5zM7 4v4h3a2 2 0 1 0 0-4H7z"
                        />
                      </svg>
                    </li>
                    <li
                      @click="enableFeature('italic')"
                      :class="features.italic ? 'bg-gray-200' : ''"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M8 1h9v2H8V1zm3 2h3L8 17H5l6-14zM2 17h9v2H2v-2z"
                        />
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('h1')"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="H">
                          <path
                            d="m174.496 301.117h163.008v210.883h128.496v-512h-128.496v189.921h-163.008v-189.921h-128.496v512h128.496z"
                          />
                        </g>
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('underline')"
                      :class="features.underline ? 'bg-gray-200' : ''"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M16 9A6 6 0 1 1 4 9V1h3v8a3 3 0 0 0 6 0V1h3v8zM2 17h16v2H2v-2z"
                        />
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('strike')"
                      :class="features.strike ? 'bg-gray-200' : ''"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 537.643 537.643"
                      >
                        <g>
                          <g>
                            <path
                              d="M399.768,239.341c-24.479-12.105-60.643-23.837-108.771-35.202c-51.035-12.051-83.17-23.624-96.402-34.731
			c-10.404-8.739-15.594-19.253-15.594-31.542c0-13.47,5.544-24.217,16.658-32.253c17.247-12.521,41.114-18.782,71.592-18.782
			c29.529,0,51.69,5.851,66.458,17.54c14.761,11.702,24.388,30.9,28.88,57.595l104.909-4.608
			c-1.658-47.724-18.96-85.882-51.928-114.475C382.62,14.296,333.525,0,268.316,0c-39.933,0-74.015,6.022-102.253,18.073
			c-28.231,12.05-49.847,29.59-64.848,52.632c-15.006,23.029-22.509,47.791-22.509,74.248c0,36.365,12.503,67.828,37.46,94.389
			H399.768L399.768,239.341z"
                            />
                            <path
                              d="M351.775,427.592c-17.13,14.303-42.59,21.445-76.372,21.445c-31.897,0-57.234-8.029-76.029-24.102
			c-18.776-16.064-31.242-41.23-37.387-75.49l-102.069,9.928c6.848,58.121,27.876,102.369,63.085,132.725
			c35.202,30.361,85.643,45.545,151.335,45.545c45.129,0,82.81-6.322,113.061-18.961c30.239-12.643,53.63-31.951,70.172-57.949
			c16.536-25.986,24.811-53.869,24.811-83.643c0-22.582-3.348-42.619-9.884-60.232H306.529c9.97,2.766,17.467,5.012,22.388,6.713
			c17.95,6.377,30.538,13.881,37.742,22.504c7.209,8.629,10.813,19.088,10.813,31.371
			C377.473,396.582,368.911,413.297,351.775,427.592z"
                            />
                            <path
                              d="M28.101,298.498h207.486h228.41h45.545c10.142,0,18.36-8.221,18.36-18.361v-4.082c0-10.141-8.219-18.36-18.36-18.36
			h-80.453H136.89H28.101c-10.141,0-18.36,8.219-18.36,18.36v4.082C9.74,290.277,17.959,298.498,28.101,298.498z"
                            />
                          </g>
                        </g>
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('center')"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM4 5h12v2H4V5zm0 8h12v2H4v-2z"
                        />
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('left')"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM1 5h12v2H1V5zm0 8h12v2H1v-2z"
                        />
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('right')"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM7 5h12v2H7V5zm0 8h12v2H7v-2z"
                        />
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('indent')"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M1 1h18v2H1V1zm6 8h12v2H7V9zm-6 8h18v2H1v-2zM7 5h12v2H7V5zm0 8h12v2H7v-2zM1 6l4 4-4 4V6z"
                        />
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('outdent')"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M1 1h18v2H1V1zm6 8h12v2H7V9zm-6 8h18v2H1v-2zM7 5h12v2H7V5zm0 8h12v2H7v-2zM5 6v8l-4-4 4-4z"
                        />
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('unordered-list')"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z"
                        />
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('horizontal')"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-6"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 612 612"
                        xml:space="preserve"
                      >
                        <g>
                          <rect y="287.468" width="612" height="37.064" />
                        </g>
                      </svg>
                    </li>

                    <li
                      @click="enableFeature('image')"
                      class="list-none cursor-pointer mr-3 rounded hover:border-gray-200 text-black-500 hover:bg-gray-200 py-1 px-3"
                    >
                      <svg
                        class="fill-current w-6"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 550.801 550.8"
                      >
                        <path
                          d="M515.828,61.201H34.972C15.659,61.201,0,76.859,0,96.172v358.458C0,473.942,15.659,489.6,34.972,489.6h480.856
		c19.314,0,34.973-15.658,34.973-34.971V96.172C550.801,76.859,535.143,61.201,515.828,61.201z M515.828,96.172V350.51l-68.92-62.66
		c-10.359-9.416-26.289-9.04-36.186,0.866l-69.752,69.741L203.438,194.179c-10.396-12.415-29.438-12.537-39.99-0.271L34.972,343.219
		V96.172H515.828z M367.201,187.972c0-26.561,21.523-48.086,48.084-48.086c26.562,0,48.086,21.525,48.086,48.086
		c0,26.561-21.523,48.085-48.086,48.085C388.725,236.058,367.201,214.533,367.201,187.972z"
                        />
                      </svg>
                    </li>
                  </ul>

                  <div class="flex">
                    <div
                      id="editor"
                      @keydown="updateContent"
                      style="resize: vertical; overflow: auto"
                      class="w-4/5 ml-auto mr-auto bg-gray-700 text-white h-screen p-5 focus:outline-none shadow-2xl rounded"
                      contenteditable="true"
                    ></div>
                  </div>
                </div>
                <div class="mt-5 float-right mr-2">
                  <button
                    @click="createCategorySubmit"
                    class="bg-green-500 hover:bg-green-400 focus:border-green-500 focus:outline-none text-white py-2 px-4 rounded"
                    type="button"
                  >
                    Create Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../components/Dashboard/Sidebar.vue";
import axios from "axios";
import swal from "sweetalert";

export default {
  data() {
    return {
      asMenu: true,
      category: {},
      errors: [],

      features: {
        bold: false,
        italic: false,
        underline: false,
        h1: false,
        strike: false,
      },
    };
  },
  components: {
    Sidebar,
  },
  computed: {},

  methods: {
    switchChangeState() {
      this.asMenu = !this.asMenu;
    },
    updateContent(e) {
      if (e.key == "b" && e.ctrlKey) {
        this.features["bold"] = !document.queryCommandState("bold");
      } else if (e.key == "i" && e.ctrlKey) {
        this.features["italic"] = !document.queryCommandState("italic");
      } else if (e.key == "u" && e.ctrlKey) {
        this.features["underline"] = !document.queryCommandState("underline");
      }
    },
    enableFeature(feature) {
      let editor = document.querySelector("#editor");

      if (feature === "bold") {
        editor.focus();
        document.execCommand("bold", false, null);
        this.features[feature] = document.queryCommandState("bold");
      } else if (feature == "italic") {
        editor.focus();
        document.execCommand("italic", false, null);
        this.features[feature] = document.queryCommandState("italic");
      } else if (feature == "h1") {
        editor.focus();
        document.execCommand("formatBlock", false, "<h1>");
      } else if (feature == "underline") {
        editor.focus();
        document.execCommand("underline", false, null);
        this.features[feature] = document.queryCommandState("under");
      } else if (feature == "center") {
        document.execCommand("justifyCenter", false, null);
      } else if (feature == "left") {
        editor.focus();
        document.execCommand("justifyLeft", false, null);
      } else if (feature == "right") {
        document.execCommand("justifyRight", false, null);
      } else if (feature == "indent") {
        document.execCommand("indent", false, null);
      } else if (feature == "outdent") {
        document.execCommand("outdent", false, null);
      } else if (feature == "ordered-list") {
        editor.focus();
        document.execCommand("insertOrderedList");
      } else if (feature == "unordered-list") {
        editor.focus();
        document.execCommand("insertUnorderedList");
      } else if (feature == "strike") {
        editor.focus();
        document.execCommand("strikeThrough", false, null);
        this.features[feature] = document.queryCommandState("strikeThrough");
      } else if (feature == "horizontal") {
        editor.focus();
        document.execCommand("insertHorizontalRule");
      } else if (feature == "image") {
        let input = prompt("Please enter image link.");
        editor.focus();
        document.execCommand("insertimage", false, input);
      }
    },
    createCategorySubmit() {
      this.errors = [];
      let content = document.querySelector("#editor");
      if (!this.category.name) {
        this.errors.push("The name field is required.");
      }

      if (!this.category.description) {
        this.errors.push("The description field is required.");
      }

      if (!this.asMenu && !content.innerHTML) {
        this.errors.push("The content field is required.");
      }

      if (this.errors.length === 0) {
        this.category.content = content.innerHTML;
        this.category.type = this.asMenu;

        axios.post("admin/category/create", this.category).then(() => {
          this.category = {};
          swal("Good job!", `Successfully create a category`, "success");
        });
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
/* CHECKBOX TOGGLE SWITCH */
/* @apply rules for documentation, these do not work as inline style */
.toggle-checkbox:checked {
  right: 0;
  border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #68d391;
}
</style>