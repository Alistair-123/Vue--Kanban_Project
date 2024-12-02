<template>
  <div>
    <div class="w-screen h-[150px] flex items-center justify-center">
      <p class="font-semibold text-[30px]">The Kanban Project</p>
    </div>
    <KanbanBoard />
  </div>
</template>

<script>
import KanbanBoard from './components/KanbanBoard.vue'

export default {
  components: {
    KanbanBoard,
  },
  created() {
    this.$store.dispatch('fetchTasks')
  },
}
</script>
