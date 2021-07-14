<template>
  <a href="/" class="absolute focus:outline-transparent top-4 left-4">
    <back-icon class="h-8 duration-500 fill-gray-800" />
  </a>
  <div class="max-w-lg p-4 mx-auto">
    <div
      :class="{
        'fixed inset-x-0 z-10 mx-auto w-xl max-w-screen': true,
        'hidden ': !isEditOverlayOpen,
      }"
    >
      <form
        class="p-8 mx-4 bg-gray-800 rounded-xl"
        v-on:submit="saveEdit"
        @keydown.esc="cancelEdit"
      >
        <h2 class="mb-8 text-2xl font-bold text-left text-white">Editing</h2>
        <div class="mb-8">
          <label
            for="newTrackerName"
            class="block mb-2 text-lg font-bold text-left text-white"
            >Tracker Name</label
          >
          <input
            v-model="newTrackerName"
            class="block w-full p-1 rounded border-b-1 border-bg-gray-600 focus-visible:outline-transparent"
            type="text"
            id="newTrackerName"
            ref="newTrackerNameInput"
          />
        </div>
        <div class="text-left">
          <button
            v-on:click="deleteTracker"
            type="button"
            class="px-4 py-2 mr-8 text-white duration-500 bg-red-900 rounded focus:outline-transparent hover:bg-red-500 transition-bg"
          >
            Delete
          </button>
          <button
            v-on:click="cancelEdit"
            type="button"
            class="px-4 py-2 mr-8 text-white duration-500 bg-gray-700 rounded focus:outline-transparent hover:bg-gray-500 transition-bg"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-white duration-500 bg-green-700 rounded focus:outline-transparent hover:bg-green-500 transition-bg"
          >
            Save
          </button>
        </div>
      </form>
    </div>

    <h1 :class="styles.title">
      {{ tracker.name }}
      <button v-on:click="toggleEditOverlay" class="focus:outline-transparent">
        <edit-icon
          class="h-6 duration-500 transform fill-gray-800 transition-fill hover:fill-amber-500"
        />
      </button>
    </h1>
    <template v-if="activeActivity">
      <h2 :class="styles.subtitle">
        Currently Running
      </h2>
      <div class="box-border mb-8 bg-white rounded-xl shadow-teal">
        <list-item
          v-on:form-submission="handleEndActivity"
          :svgIcon="'cancel-icon'"
          :entries="
            formatActivityLogs([
              activeActivity.logs[activeActivity.logs.length - 1],
            ])
          "
          :isBold="true"
        >
          <p>
            {{ activeActivity.name }}
          </p>
        </list-item>
      </div>
    </template>
    <h2 :class="styles.subtitle">Start New Activity</h2>
    <div class="mb-8 bg-white rounded-xl">
      <list-item
        v-on:form-submission="handleNewActivitySubmission"
        :svgIcon="'play-icon'"
        :isForm="true"
      >
        <div>
          <label for="newActivityName" class="hidden">New Activity Name</label>
          <input
            v-model="newActivityName"
            class="block w-full p-1 border-b-1 border-bg-gray-600 focus-visible:outline-transparent"
            type="text"
            id="newActivityName"
            placeholder="Activity Name"
          />
        </div>
      </list-item>
    </div>
    <template v-if="tracker.activities && tracker.activities.length > 0">
      <h2 :class="styles.subtitle">
        History
      </h2>
      <div class="grid grid-cols-1 bg-white shadow-md rounded-xl">
        <list-item
          v-for="activity in tracker.activities"
          v-on:form-submission="handleContinueActivity"
          :svgIcon="'play-icon'"
          :entries="formatActivityLogs(activity.logs)"
          :id="activity.id"
        >
          <p>
            {{ activity.name }}
          </p>
        </list-item>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { format, formatRFC3339, isToday } from 'date-fns';
import { defineComponent } from 'vue';
import BackIcon from '../assets/back.svg?component';
import EditIcon from '../assets/edit.svg?component';
import ListItem from '../components/ListItem.vue';
import { IActivity, ILog, ITracker, TTrackerList } from '../types';

function endActivityLog(
  activities: ITracker['activities'],
  activityId: IActivity['id']
) {
  const activeActivityIndex = activities.findIndex(
    (activity) => activity.id === activityId
  );
  if (activeActivityIndex >= 0) {
    const activeActivity = activities[activeActivityIndex];
    const endingLog = activeActivity.logs[activeActivity.logs.length - 1];
    endingLog.end = formatRFC3339(new Date());
    activities.splice(activeActivityIndex, 1, activeActivity);
  }
}

export default defineComponent({
  name: 'TrackerPage',
  components: { ListItem, EditIcon, BackIcon },
  data: function(): {
    newTrackerName: string;
    newActivityName: string;
    isEditOverlayOpen: boolean;
    tracker: ITracker;
    trackerList: TTrackerList;
    styles: { [key: string]: string };
    $refs: { [key: string]: any };
  } {
    return {
      newTrackerName: '',
      newActivityName: '',
      isEditOverlayOpen: false,
      tracker: {
        id: '',
        name: '',
        activities: [],
      },
      trackerList: [],
      styles: {},
      $refs: {
        newTrackerNameInput: HTMLFormElement,
      },
    };
  },
  created: function() {
    this.styles = {
      title: 'mb-8 sm:mb-12 text-4xl font-bold text-gray-800',
      subtitle: 'mb-2 pl-2 text-left text-xl font-bold text-gray-800',
    };

    const trackerList = localStorage.getItem('trackerList');
    if (trackerList) this.trackerList = JSON.parse(trackerList);

    if (Array.isArray(this.$route.params.id)) return;
    const trackerString = localStorage.getItem(this.$route.params.id);
    if (trackerString) {
      this.tracker = JSON.parse(trackerString);
      this.newTrackerName = this.tracker.name;
    } else {
      const newTrackerName = prompt(
        `Tracker with id "${this.$route.params.id}" doesn't exist.\nWould you like to create a new one?\nEnter a name below:`
      );
      if (!newTrackerName) return this.$router.push('/');
      this.tracker.id = String(Date.now());
      this.tracker.name = newTrackerName;

      this.trackerList.push({
        id: this.tracker.id,
        name: this.tracker.name,
      });

      this.$router.push(`/tracker/${this.tracker.id}`);
    }
  },
  computed: {
    activeActivity(): IActivity | undefined {
      if (!this.tracker.activeActivityId) return;
      return this.tracker.activities.find(
        (activity) => activity.id === this.tracker.activeActivityId
      );
    },
  },
  watch: {
    tracker: {
      handler() {
        localStorage.setItem(this.tracker.id, JSON.stringify(this.tracker));
      },
      deep: true,
    },
    trackerList: {
      handler() {
        console.log(this.trackerList);
        localStorage.setItem('trackerList', JSON.stringify(this.trackerList));
      },
      deep: true,
    },
  },
  methods: {
    formatActivityLogs(logs: ILog[]): string[] {
      return logs.map((log) => {
        const startDate = new Date(log.start);
        const endDate = log.end ? new Date(log.end) : null;
        const startDateFormat = isToday(startDate)
          ? 'HH:mm'
          : 'dd.MM.yyyy, HH:mm';
        return `${format(startDate, startDateFormat)}${
          endDate ? ` - ${format(endDate, 'HH:mm')}` : ' - now'
        }`;
      });
    },
    toggleEditOverlay() {
      this.isEditOverlayOpen = !this.isEditOverlayOpen;
      if (this.isEditOverlayOpen)
        setTimeout(() => this.$refs.newTrackerNameInput.focus(), 1);
    },
    deleteTracker() {
      if (!confirm('Do you really want to delete this tracker?')) return;
      this.trackerList = this.trackerList.filter(
        (entry) => entry.id !== this.tracker.id
      );
      localStorage.removeItem(this.tracker.id);
      this.$router.push('/');
    },
    cancelEdit() {
      this.toggleEditOverlay();
      this.newTrackerName = this.tracker.name;
    },
    saveEdit(e: Event) {
      e.preventDefault();
      this.toggleEditOverlay();
      this.trackerList = this.trackerList.map((entry) =>
        entry.id === this.tracker.id
          ? { id: this.tracker.id, name: this.newTrackerName }
          : entry
      );
      this.tracker.name = this.newTrackerName;
    },
    handleNewActivitySubmission() {
      if (this.tracker.activeActivityId)
        endActivityLog(this.tracker.activities, this.tracker.activeActivityId);

      const newActivity: IActivity = {
        id: String(Date.now()),
        name: this.newActivityName,
        logs: [
          {
            start: formatRFC3339(new Date()),
          },
        ],
      };
      this.newActivityName = '';
      this.tracker.activities.push(newActivity);
      this.tracker.activeActivityId = newActivity.id;
    },
    handleContinueActivity(activityId: string) {
      if (this.tracker.activeActivityId)
        endActivityLog(this.tracker.activities, this.tracker.activeActivityId);

      const activity = this.tracker.activities.find(
        (activity) => activity.id === activityId
      );
      if (!activity) return;

      activity.logs.push({
        start: formatRFC3339(new Date()),
      });
      this.tracker.activeActivityId = activity.id;
    },
    handleEndActivity() {
      if (this.tracker.activeActivityId)
        endActivityLog(this.tracker.activities, this.tracker.activeActivityId);
      this.tracker.activeActivityId = undefined;
    },
  },
});
</script>
