<template>
  <div class="max-w-md mx-auto">
    <h1 class="mb-8 text-3xl font-semibold text-gray-800">
      {{ trackEntry.name }}
    </h1>
    <h2 class="pl-2 mb-2 text-lg font-semibold text-left text-gray-800">
      Currently Running
    </h2>
    <div
      class="grid grid-cols-2 p-6 mb-8 bg-white border-8 border-teal-400 rounded-xl"
    >
      <div class="flex items-center">
        <cancel-button-icon
          class="inline-block mr-4 align-middle duration-500 ease-out transform cursor-pointer h-7 fill-purple-800 transition-fill hover:fill-red-500 hover:duration-250"
        />
        <p class="text-xl font-bold text-left">Active Activity</p>
      </div>
      <div class="text-right text-gray-500">
        <p>
          13:00 - 14:24
        </p>
        <p>
          1h 24min
        </p>
      </div>
    </div>
    <h2 class="pl-2 mb-2 text-lg font-semibold text-left text-gray-800">
      Start New Activity
    </h2>
    <form
      class="flex items-center p-6 mb-8 text-left bg-white border-8 border-transparent rounded-xl"
    >
      <button type="submit" class="focus:outline-transparent">
        <play-button-icon
          class="mr-4 align-middle duration-500 ease-out transform cursor-pointer h-7 fill-purple-800 transition-fill hover:fill-teal-400 hover:duration-250"
        />
      </button>
      <div class="flex-grow">
        <label for="activityName" class="hidden">New Activity Name</label>
        <input
          class="block w-full p-1 border-b-1 border-bg-gray-600 focus-visible:outline-transparent"
          type="text"
          id="activityName"
          placeholder="Activity Name"
        />
      </div>
    </form>
    <h2 class="pl-2 mb-2 text-lg font-semibold text-left text-gray-800">
      History
    </h2>
    <div
      class="grid max-w-md grid-cols-1 px-6 mx-auto bg-white border-8 border-transparent shadow-md rounded-xl"
    >
      <log-list-view v-for="log in trackEntry.logs" :log="log" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ITrackEntry } from '../types';
import LogListView from './LogListView.vue';
import CancelButtonIcon from '../assets/cancel-button.svg?component';
import PlayButtonIcon from '../assets/play-button.svg?component';

export default defineComponent({
  name: 'TrackEntry',
  components: { LogListView, CancelButtonIcon, PlayButtonIcon },
  props: {
    trackEntry: {
      type: Object as PropType<ITrackEntry>,
      required: true,
    },
  },
});
</script>
