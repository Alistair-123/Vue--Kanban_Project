import { createStore } from 'vuex'
import { db } from '../firebase'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks[index] = updatedTask
      }
    },
    deleteTask(state, taskId) {
      const index = state.tasks.findIndex((task) => task.id === taskId)
      if (index !== -1) {
        state.tasks.splice(index, 1)
      }
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const taskCollection = collection(db, 'tasks')
      const taskSnapshot = await getDocs(taskCollection)
      const tasks = taskSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      commit('setTasks', tasks)
    },
    async addTask({ commit }, newTask) {
      const taskRef = await addDoc(collection(db, 'tasks'), {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
      })
      const addedTask = { id: taskRef.id, ...newTask }
      commit('addTask', addedTask)
    },
    async updateTask({ commit }, updatedTask) {
      const taskRef = doc(db, 'tasks', updatedTask.id)
      await updateDoc(taskRef, {
        status: updatedTask.status,
        title: updatedTask.title,
        description: updatedTask.description,
      })
      commit('updateTask', updatedTask)
    },
    async deleteTask({ commit }, taskId) {
      const taskRef = doc(db, 'tasks', taskId)
      await deleteDoc(taskRef)
      commit('deleteTask', taskId)
    },
  },
})
