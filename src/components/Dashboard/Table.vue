<template>
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
    <tbody v-if="data.length">
      <tr v-for="(category, index) in data" v-bind:key="index">
        <td class="border px-4 py-2 capitalize">{{ category.name }}</td>
        <td class="border px-4 py-2 text-sm text-gray-700">
          {{ category.description }}
        </td>
        <td class="border px-4 py-2 text-center">
          {{ category.sub_category.length }}
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
              @click="selected(category)"
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
          No available data
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import moment from "moment";
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    selected(category) {
      this.$emit("selected-category", category);
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    },
  },
};
</script>