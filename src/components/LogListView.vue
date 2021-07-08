<template>
  <div
    class="grid grid-cols-2 py-6 border-gray-300 border-t-1 first:border-t-0"
  >
    <div class="text-left">
      <play-button-icon
        class="inline-block h-7 mr-4 align-middle duration-500 ease-out transform cursor-pointer fill-purple-800 transition-fill hover:fill-teal-400 hover:duration-250"
      />
      <p class="inline-block align-middle">
        {{ log.name }}
      </p>
    </div>
    <div>
      <p
        v-for="entry in formattedEntries"
        class="text-sm text-right text-gray-500"
      >
        {{ entry.time }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { add, format } from 'date-fns';
import { defineComponent, PropType } from 'vue';
import { ILog } from '../types';
import PlayButtonIcon from '../assets/play-button.svg?component';

export default defineComponent({
  name: 'LogListView',
  components: { PlayButtonIcon },
  props: {
    log: {
      type: Object as PropType<ILog>,
      required: true,
    },
  },
  computed: {
    formattedEntries: function(): { time: string }[] {
      return this.log.entries.map((entry) => {
        return {
          time: `${format(entry.start, 'HH:mm')} - ${format(
            add(entry.start, { seconds: entry.duration }),
            'HH:mm'
          )}`,
        };
      });
    },
  },
});
</script>
