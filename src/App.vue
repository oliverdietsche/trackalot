<template>
  <track-entry :trackEntry="trackEntry" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TrackEntry from './components/TrackEntry.vue';
import { ITrackEntry } from './types';

export default defineComponent({
  name: 'App',
  components: {
    TrackEntry,
  },
  data: function(): { trackEntry: ITrackEntry } {
    return {
      trackEntry: {
        id: '1',
        name: 'Example Log',
        logs: [
          {
            id: '1',
            name: 'Some Activity',
            entries: [{ start: new Date(1625640345341), duration: 6480 }],
          },
          {
            id: '2',
            name: 'Another Activity',
            entries: [{ start: new Date(1625646825341), duration: 580 }],
          },
          {
            id: '3',
            name: 'Work work',
            entries: [
              { start: new Date(1625647405341), duration: 5000 },
              { start: new Date(1625655605341), duration: 5000 },
            ],
          },
        ],
      },
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
