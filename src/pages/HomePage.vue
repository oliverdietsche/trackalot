<template>
  <div class="max-w-lg p-4 mx-auto">
    <div class="box-border mb-8 bg-white rounded-xl">
      <list-item
        v-for="tracker in trackerList"
        v-on:form-submission="() => this.$router.push(`/tracker/${tracker.id}`)"
        :svgIcon="'play-icon'"
        :isBold="true"
      >
        <p>{{ tracker.name }}</p>
      </list-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListItem from '../components/ListItem.vue';
import { TTrackerList } from '../types';

export default defineComponent({
  name: 'HomePage',
  components: { ListItem },
  data: function(): {
    trackerList: TTrackerList;
  } {
    return {
      trackerList: [],
    };
  },
  created() {
    const trackerList = localStorage.getItem('trackerList');
    if (trackerList) this.trackerList = JSON.parse(trackerList);
  },
  watch: {
    trackerList: {
      handler() {
        console.log(this.trackerList);
        localStorage.setItem('trackerList', JSON.stringify(this.trackerList));
      },
      deep: true,
    },
  },
});
</script>
