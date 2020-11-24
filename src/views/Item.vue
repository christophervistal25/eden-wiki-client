<template>
  <div class="dashboard">
    <!-- component -->
    <div class="h-screen w-screen flex overflow-hidden select-none">
      <sidebar></sidebar>
      <main
        class="pb-2 px-10 flex-1 bg-gray-200 transition duration-500 ease-in-out overflow-y-auto"
      >
        <div class="flex flex-col capitalize text-2xl">
          <span class="font-semibold">hello,</span>
          <span>Administrator</span>
        </div>
        <br />
        <div class="flex">
          <div
            class="mr-6 py-2 w-full flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 shadow-sm"
          >
            <h3
              class="flex flex-col px-5 py-1 text-lg font-semibold dark:text-gray-300"
            >
              <span>Items</span>
            </h3>

            <div>
              <span class="text-sm text-gray-700 ml-5"
                ><small
                  >Don't forget to press (ENTER) key after you typed.</small
                ></span
              >
              <br />
              <input
                id="search-item"
                class="ml-5 w-64 bg-white border border-gray-400 focus:border-gray-500 px-4 py-2 text-sm focus:outline-none"
                type="text"
                v-model="searchItem"
                @keyup.enter="search"
                placeholder="Search"
              />

              <div
                class="float-right text-white bg-blue-400 rounded-full shadow w-10 animate-pulse mr-5 cursor-pointer"
                @click="addNewItemModalDisplay = true"
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

            <div class="flex flex-col px-5 py-3">
              <table class="table-auto border-collapse">
                <thead>
                  <tr>
                    <td
                      class="px-4 border py-4 text-sm uppercase text-center font-medium"
                    >
                      Icon
                    </td>
                    <td
                      class="px-4 border py-4 text-sm uppercase text-center font-medium"
                    >
                      Name
                    </td>
                    <td
                      class="px-4 border py-4 text-sm uppercase text-center font-medium"
                    >
                      Description
                    </td>
                    <td
                      class="px-4 border py-4 text-sm uppercase text-center font-medium"
                    >
                      Gender
                    </td>
                    <td
                      class="px-4 border py-4 text-sm uppercase text-center font-medium"
                    >
                      Level
                    </td>
                    <td
                      class="px-4 border py-4 text-sm uppercase text-center font-medium"
                    >
                      Job
                    </td>
                    <td
                      class="px-4 border py-4 text-sm uppercase text-center font-medium"
                    >
                      Category / Sub-Category
                    </td>
                    <th
                      class="px-4 border py-4 text-sm uppercase text-center font-medium"
                    >
                      Status
                    </th>
                    <th
                      class="px-4 border py-4 text-sm uppercase text-center font-medium"
                    >
                      Created At
                    </th>
                    <th
                      class="px-4 border py-4 text-sm uppercase text-center font-medium"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody v-if="items.length != 0">
                  <tr v-for="item in items" v-bind:key="item.id">
                    <td class="border px-4 py-4 capitalize">
                      <img
                        class="object-contain mr-auto ml-auto"
                        :src="/images/ + item.icon"
                        alt=""
                      />
                    </td>
                    <td class="border px-4 py-4 capitalize text-sm">
                      {{ item.name }}
                    </td>
                    <td class="border px-4 py-4 text-sm text-gray-800">
                      {{ item.description.substring(0, 30) }}...
                    </td>
                    <td
                      class="border px-4 py-4 capitalize text-gray-800 text-center text-sm"
                    >
                      {{ item.gender.toLowerCase() }}
                    </td>
                    <td
                      class="border px-4 py-4 capitalize text-gray-800 text-center text-sm"
                    >
                      {{ item.level }}
                    </td>
                    <td
                      class="border px-4 py-4 capitalize text-gray-800 text-center text-sm"
                    >
                      {{ item.job.toLowerCase() }}
                    </td>
                    <td class="text-center border px-4 py-2">
                      <span
                        class="w-auto cursor-default focus:outline-none font-body py-4 px-4 capitalize text-gray-800 text-sm"
                      >
                        {{ item.sub_category.category.name }} /
                        {{ item.sub_category.name.toLowerCase() }}
                      </span>
                    </td>
                    <td class="text-center border px-4 py-4 text-sm">
                      <button
                        v-if="item.status == 'active'"
                        class="button-small bg-green-500 cursor-default focus:outline-none text-white font-body p-1 rounded-sm capitalize"
                      >
                        {{ item.status }}
                      </button>
                      <button
                        v-else
                        class="bg-red-500 cursor-default focus:outline-none text-white font-body p-1 rounded-sm capitalize"
                      >
                        {{ item.status }}
                      </button>
                    </td>

                    <td class="border px-4 py-4 text-center text-sm">
                      {{ formatDate(item.created_at) }}
                    </td>

                    <td class="border px-4 py-4 text-center">
                      <div
                        class="w-10 h-10 bg-green-500 text-white rounded-full shadow p-2 mr-auto ml-auto cursor-pointer"
                        @click="editItem(item)"
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
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="items.length === 0 && !isSearch">
                  <tr>
                    <td class="px-4 py-3 border" colspan="10" rowspan="5">
                      <spinner
                        class="ml-auto mr-auto"
                        height="h-10"
                        width="w-10"
                        color="text-green-500"
                      ></spinner>
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="items.length === 0 && isSearch">
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

              <div class="flex flex-row-reverse mt-2" v-if="!isSearch">
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
                      <span class="mr-2">{{ page }}</span>
                      to
                      <span class="mr-2 ml-2">{{ pagination_total }}</span>
                      of
                      <span class="ml-2">{{ total_items }}</span>
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
      v-if="addNewItemModalDisplay"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-screen my-6 mt-auto mx-auto max-w-3xl">
        <!--content-->
        <div
          class="border-0 rounded-sm mt-2 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between px-5 py-3 border-b border-solid border-gray-300"
          >
            <h3 class="text-2xl font-semibold">Add New Item</h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="closeAddModal"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative px-6 py-2 flex-auto">
            <div v-if="errors.length !== 0">
              <p
                class="text-red-400 text-sm"
                v-for="(error, index) in errors"
                v-bind:key="index"
              >
                <span>&#9862;</span> {{ error[0] }}
              </p>
              <hr class="my-2" />
            </div>

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Name <span class="text-red-500 align-middle">*</span>
            </label>
            <input
              class="flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="text"
              v-model="item.name"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Description <span class="text-red-500 align-middle">*</span>
            </label>

            <textarea
              class="flex flex-col flex-grow appearance-none w-full border text-gray-700 py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              rows="4"
              v-model="item.description"
            ></textarea>

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Category / Sub - Category
              <span class="text-red-500 align-middle">*</span>
            </label>
            <select
              v-model="item.sub_category_id"
              class="appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 capitalize rounded-sm"
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

            <hr class="mb-1" />
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Icon
              <span class="text-red-500 align-middle">*</span>
            </label>

            <label
              for="uploadFile"
              class="inline-flex appearance-none w-auto text-gray-700 bg-white rounded-sm border py-2 px-4 focus:outline-none cursor-pointer shadow"
            >
              <svg
                v-if="!icon"
                class="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
              {{ icon ? icon.name : "Add icon" }}

              <input
                id="uploadFile"
                class="hidden"
                type="file"
                @change="onImageAttach"
              />
            </label>

            <hr class="my-2" />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Gender
            </label>
            <select
              v-model="item.gender"
              class="appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
            >
              <option value=""></option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Level
            </label>
            <input
              class="flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="number"
              v-model="item.level"
              placeholder="1"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Job / class
            </label>
            <input
              class="flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="text"
              v-model="item.job"
              placeholder="Ringmaster"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Item effect 1
            </label>
            <input
              class="flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="text"
              v-model="item.effect_1"
              placeholder="INT : 50"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Item effect 2
            </label>
            <input
              class="flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="text"
              v-model="item.effect_2"
              placeholder="STR : 50"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Item effect 3
            </label>
            <input
              class="flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="text"
              v-model="item.effect_3"
              placeholder="DEX : 50"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Handed type
            </label>
            <select
              v-model="item.handed"
              class="appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
            >
              <option value=""></option>
              <option value="HD ONE">One Handed</option>
              <option value="HD TWO">Two Handed</option>
            </select>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
          >
            <button
              class="text-white border border-solid border-red-500 bg-red-500 uppercase px-6 py-2 rounded-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all 0.15s ease"
              v-on:click="closeAddModal"
            >
              Close
            </button>
            <button
              class="text-white bg-transparent border border-solid border-blue-500 bg-blue-500 uppercase px-6 py-2 rounded-sm focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all 0.15s ease"
              v-on:click="submitNewItem"
            >
              Create Item
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="addNewItemModalDisplay"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
  </div>

  <div>
    <div
      v-if="editItemModalDisplay"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-screen my-6 mt-auto mx-auto max-w-3xl">
        <!--content-->
        <div
          class="border-0 rounded-sm mt-2 shadow relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-gray-300"
          >
            <h3 class="text-2xl font-semibold capitalize">
              Edit {{ selectedItem.name }} Item
            </h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="closeEditModal"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative px-6 py-2 flex-auto">
            <div v-if="errors.length !== 0">
              <p
                class="text-red-400 text-sm"
                v-for="(error, index) in errors"
                v-bind:key="index"
              >
                <span>&#9862;</span> {{ error[0] }}
              </p>
              <hr class="my-2" />
            </div>

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Name <span class="text-red-500 align-middle">*</span>
            </label>
            <input
              class="flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 outline-none bg-white border-gray-500 rounded-sm"
              type="text"
              v-model="selectedItem.name"
              placeholder="Enter item name"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Description <span class="text-red-500 align-middle">*</span>
            </label>
            <textarea
              class="flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              rows="4"
              v-model="selectedItem.description"
              placeholder="Enter item description"
            ></textarea>

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Category / Sub-category
              <span class="text-red-500 align-middle">*</span>
            </label>
            <select
              v-model="selectedItem.sub_category_id"
              class="appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 capitalize rounded-sm"
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
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              icon
              <span class="text-blue-600 font-normal">
                - Attach icon to replace otherwise leave blank</span
              >
            </label>
            <hr class="mb-1" />
            <img
              :src="/images/ + selectedItem.icon"
              @load="onImageLoad"
              :class="
                isImageLoad
                  ? 'border shadow-sm border-gray-500 animate-pulse rounded-full'
                  : ''
              "
              class="bg-white p-1 object-contain"
              alt=""
            />
            <label
              for="uploadFile"
              class="inline-flex mt-3 appearance-none w-auto text-gray-700 bg-white rounded-sm border py-2 px-4 focus:outline-none cursor-pointer shadow"
            >
              <svg
                v-if="!icon"
                class="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
              {{ icon ? icon.name : "Replace icon" }}

              <input
                id="uploadFile"
                class="hidden"
                type="file"
                @change="onImageAttach"
              />
            </label>

            <hr class="my-2" />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              gender
            </label>
            <select
              v-model="selectedItem.gender"
              class="appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
            >
              <option value=""></option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              level
            </label>
            <input
              class="text-sm flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="number"
              v-model="selectedItem.level"
              placeholder="Level"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              job / class
            </label>
            <input
              class="text-sm flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="text"
              v-model="selectedItem.job"
              placeholder="Enter Job / Class"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              item effect 1
            </label>
            <input
              class="text-sm flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="text"
              v-model="selectedItem.effect_1"
              placeholder="INT : 50"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              item effect 2
            </label>
            <input
              class="text-sm flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="text"
              v-model="selectedItem.effect_2"
              placeholder="STR : 50"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              item effect 3
            </label>
            <input
              class="text-sm flex flex-col flex-grow appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
              type="text"
              v-model="selectedItem.effect_3"
              placeholder="DEX : 50"
            />

            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            >
              Handed type
            </label>
            <select
              v-model="selectedItem.handed"
              class="appearance-none w-full text-gray-700 border py-2 px-4 mb-3 focus:outline-none bg-white border-gray-500 rounded-sm"
            >
              <option value=""></option>
              <option value="HD ONE">One Handed</option>
              <option value="HD TWO">Two Handed</option>
            </select>

            <div
              class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
            >
              <input
                @click="changeState"
                type="checkbox"
                name="toggle"
                id="toggle"
                :checked="
                  selectedItem.status.toLowerCase() === 'active' ? true : false
                "
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
              />
              <label
                for="toggle"
                class="list-none toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <label
              for="toggle"
              class="text-xs text-gray-700 font-bold cursor-pointer capitalize"
              >{{ selectedItem.status }}</label
            >
          </div>

          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
          >
            <button
              class="border border-solid border-red-500 bg-red-500 text-white active:bg-red-600 uppercase text-sm px-6 py-2 rounded-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all 0.15s ease"
              v-on:click="closeEditModal"
            >
              Close
            </button>
            <button
              class="text-white bg-transparent border border-solid border-green-500 bg-green-500 uppercase text-sm px-6 py-2 rounded-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all 0.15s ease"
              v-on:click="submitUpdateItem"
            >
              Update Item
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="editItemModalDisplay"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script>
import Sidebar from "../components/Dashboard/Sidebar.vue";
// import Modal from "../components/Dashboard/Modal.vue";
import Spinner from "../components/Spinner.vue";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";

export default {
  data() {
    return {
      items: [],
      addNewItemModalDisplay: false,
      editItemModalDisplay: false,
      sub_categories: [],
      errors: [],

      item: {},
      icon: "",
      selectedItem: {},
      selectedItemBeforeEdit: {},
      searchItem: "",

      isImageLoad: false,

      page: 1,

      total_items: 0,
      pagination_total: 0,
      previousPageID: "",
      nextPageID: "",

      isSearch: false,
    };
  },
  components: {
    Sidebar,
    Spinner,
    // Modal,
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
    changeState() {
      if (this.selectedItem.status.toLowerCase() === "active") {
        this.selectedItem.status = "in-active";
      } else {
        this.selectedItem.status = "active";
      }
    },
    getItems() {
      axios.get(`admin/items/${this.page}`).then((response) => {
        this.total_items = response.data.total_items;
        this.pagination_total = response.data.pagination_total;
        this.nextPageID = response.data.next;
        this.previousPageID = response.data.previous;
        this.items = response.data.items;
        this.isSearch = false;
      });
    },
    submitNewItem() {
      let formData = new FormData();

      for (const [key, value] of Object.entries(this.item)) {
        formData.append(key, value);
      }
      formData.append("icon", this.icon);

      axios
        .post("admin/create/item", formData)
        .then((response) => {
          if (response.status === 200) {
            this.errors = [];
            this.addNewItemModalDisplay = false;
            this.item = {};
            this.items.unshift(response.data);
            swal("Good job!", "Successfully add new item.", "success");
          }
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.errors = err.response.data;
          }
        });
    },
    editItem(selectedItem) {
      this.selectedItem = selectedItem;
      this.selectedItemBeforeEdit = Object.assign({}, this.selectedItem);
      this.editItemModalDisplay = true;
    },
    submitUpdateItem() {
      let formData = new FormData();

      for (const [key, value] of Object.entries(this.selectedItem)) {
        formData.append(key, value);
      }

      formData.append("icon", this.icon);

      axios
        .post(`admin/item/edit/${this.selectedItem.id}`, formData)
        .then((response) => {
          if (response.status === 200) {
            this.errors = [];
            this.editItemModalDisplay = false;

            this.items.map((item, index) => {
              if (item.id == response.data.id) {
                this.items[index] = response.data;
              }
            });

            this.selectedItem = {};
            swal("Good job!", "Successfully update item.", "success");
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
      this.editItemModalDisplay = false;
      Object.assign(this.selectedItem, this.selectedItemBeforeEdit);
      this.isImageLoad = false;
      this.icon = "";
    },
    closeAddModal() {
      this.addNewItemModalDisplay = false;
      this.errors = [];
    },
    next() {
      if (this.nextPageID != null) {
        this.page = this.nextPageID;
      }
    },
    previous() {
      if (this.previousPageID != null) {
        this.page = this.previousPageID;
      }
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    },
    onImageAttach(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        console.log("no files");
      }
      this.icon = files[0];
    },
    onImageLoad() {
      this.isImageLoad = true;
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
