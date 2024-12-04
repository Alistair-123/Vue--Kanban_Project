<template>
  <div :style="backgroundStyle">
    <div class="w-screen h-[150px] flex items-center justify-center bg-overlay">
      <p class="font-semibold text-[30px] text-white">The Kanban Project</p>
    </div>
    <KanbanBoard />
  </div>
</template>

<script>
import KanbanBoard from './components/KanbanBoard.vue';
import backgroundImage from './components/th.jpeg'; // Import the image

export default {
  components: {
    KanbanBoard,
  },
  data() {
    return {
      backgroundStyle: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      },
    };
  },
  created() {
    this.$store.dispatch('fetchTasks');
  },
};
</script>

<style scoped>
.bg-overlay {
  background: rgba(0, 0, 0, 0.5); /* Optional overlay effect */
}
</style>
