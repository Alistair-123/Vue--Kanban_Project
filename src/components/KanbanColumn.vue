<template>
  <div class="kanban-column">
    <div class="header flex justify-between items-center mb-4">
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <button @click="showAddTaskForm = !showAddTaskForm" class="btn btn-add-task">Add Task</button>
    </div>

    <!-- Add Task Form -->
    <div v-if="showAddTaskForm" class="add-task-form">
      <input v-model="newTask.title" placeholder="Task Title" class="task-input" />
      <textarea
        v-model="newTask.description"
        placeholder="Task Description"
        class="task-input"
      ></textarea>
      <button @click="addTask" class="btn btn-save">Save Task</button>
      <button @click="cancelAddTask" class="btn btn-cancel">Cancel</button>
    </div>

    <draggable :list="tasks" group="tasks" @start="dragging = true" @end="onDragEnd" item-key="id">
      <template #item="{ element }">
        <div :key="element.id" class="task-card p-4 bg-white rounded-lg shadow-md">
          <h3 class="font-semibold">{{ element.title }}</h3>
          <p class="text-sm">{{ element.description }}</p>
          <div class="task-actions">
            <button @click="editTask(element)" class="btn btn-edit">Edit</button>
            <button @click="deleteTask(element.id)" class="btn btn-delete">Delete</button>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'KanbanColumn',
  props: {
    title: String,
    tasks: Array,
  },
  components: {
    draggable,
  },
  data() {
    return {
      showAddTaskForm: false,
      newTask: {
        title: '',
        description: '',
        status: this.title,
      },
      dragging: false,
    }
  },
  methods: {
    ...mapActions({
      updateTask: 'updateTask',
      addTask: 'addTask', // Add a Vuex action for adding tasks
      deleteTask: 'deleteTask',
    }),
    onDragEnd(event) {
      // Get the task from the list by its ID
      const task = this.tasks[event.oldIndex]
      task.status = this.title

      // Update task status in Firestore and Vuex store
      this.updateTask(task)
    },
    addTask() {
      if (this.newTask.title && this.newTask.description) {
        this.$store.dispatch('addTask', this.newTask)
        this.showAddTaskForm = false
        this.newTask = { title: '', description: '', status: this.title }
      }
    },
    cancelAddTask() {
      this.showAddTaskForm = false
      this.newTask = { title: '', description: '', status: this.title }
    },
    editTask(task) {
      // Implement edit logic as needed
      const newTitle = prompt('Edit task title', task.title)
      const newDescription = prompt('Edit task description', task.description)

      if (newTitle !== null && newDescription !== null) {
        task.title = newTitle
        task.description = newDescription
        this.updateTask(task)
      }
    },
    async deleteTask(taskId) {
      await this.$store.dispatch('deleteTask', taskId)
    },
  },
}
</script>

<style scoped>
.kanban-column {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}

.btn-add-task {
  background-color: #0080ff;
  color: white;
}

.add-task-form {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.task-input {
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
  border-radius: 5px;
}

.btn-save {
  background-color: #4caf50;
  color: white;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.task-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
