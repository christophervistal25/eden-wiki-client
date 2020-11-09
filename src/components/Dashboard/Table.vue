<template>
  <table class="table-fixed">
    <thead>
      <tr>
        <th class="border w-1/7 px-4 py-2">Title</th>
        <th class="border w-1/4 px-4 py-2">Description</th>
        <th class="border w-1/4 px-4 py-2">No. of sub category items</th>
        <th class="border w-1/4 px-4 py-2">Created At</th>
        <th class="border w-1/4 px-4 py-2">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(category, index) in data" v-bind:key="index">
        <td class="border px-4 py-2">{{ category.name }}</td>
        <td class="border px-4 py-2">{{ category.description }}</td>
        <td class="border px-4 py-2 text-center">
          {{ category.sub_category.length }}
        </td>
        <td class="border px-4 py-2">{{ category.created_at }}</td>
        <td class="border px-4 py-2 text-center">Status</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>