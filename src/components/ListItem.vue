<template>
  <div
    class="flex justify-between py-6 mx-6 border-gray-300 sm:py-8 sm:mx-8 border-t-1 first:border-t-0"
  >
    <form
      :class="[
        { 'flex items-center text-left h-min': true },
        { 'w-full': !entries },
      ]"
      v-on:submit="handleFormSubmission"
    >
      <button v-if="svgIcon" type="submit" class="focus:outline-transparent">
        <component
          :is="svgIcon"
          class="mr-4 align-middle duration-500 transform h-7 fill-purple-800 transition-fill hover:fill-teal-400"
        />
      </button>
      <div :class="{ 'flex-grow': true, 'text-xl font-bold': isBold }">
        <slot />
      </div>
    </form>
    <div v-if="entries" class="min-w-41">
      <p
        v-for="entry in entries"
        :class="{ 'text-right text-gray-500': true, 'text-sm': !isBold }"
      >
        {{ entry }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TSvgIcon } from '../types';
import CancelIcon from '../assets/cancel.svg?component';
import PlayIcon from '../assets/play.svg?component';

export default defineComponent({
  name: 'ListItem',
  components: { CancelIcon, PlayIcon },
  props: {
    svgIcon: {
      type: String as PropType<TSvgIcon>,
      required: false,
    },
    entries: {
      type: Object as PropType<string[]>,
      required: false,
    },
    isBold: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      required: false,
    },
  },
  methods: {
    handleFormSubmission: function(e: Event) {
      e.preventDefault();
      this.$emit('form-submission', this.id);
    },
  },
});
</script>
