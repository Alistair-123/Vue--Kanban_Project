<!-- KanbanBoard.vue -->
<template>
  <div class="kanban-board">
    <div class="kanban-column" v-for="column in columns" :key="column.name">
      <KanbanColumn :title="column.name" :tasks="filteredTasks(column.name)" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import KanbanColumn from './KanbanColumn.vue'

export default {
  name: 'KanbanBoard',
  components: {
    KanbanColumn,
  },
  data() {
    return {
      columns: [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Done' }],
    }
  },
  computed: {
    ...mapState({
      tasks: (state) => state.tasks,
    }),
  },
  methods: {
    ...mapActions({
      fetchTasks: 'fetchTasks',
    }),
    filteredTasks(status) {
      return this.tasks.filter((task) => task.status === status)
    },
  },
  created() {
    this.fetchTasks()
  },
}
</script>

<style scoped>
.kanban-board {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.kanban-column {
  flex: 1;
  margin: 0 10px;
}
</style>
