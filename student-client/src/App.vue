<template>
  <div id="app">
    
    <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>
    <StudentTable
      v-bind:students="students" 
      v-on:student-present="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted">
    </StudentTable>
    <StudentMessage v-bind:student="mostRecentStudent"></StudentMessage>

  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

export default {
  name: 'app',
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage
  },
  mounted() {
    this.updateStudents()
  },
  methods: {
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( student => {
        this.updateStudents()
      }).catch(err => {
        let msg = err.response.data.join(', ')
        alert('Error adding student.\n' + msg)
      })
    },
    studentArrivedOrLeft(student, present) {
      student.present = present  
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student 
        this.updateStudents()
      })
    },
    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {}  // clears welcome/goodbye messages
      })
    },
    updateStudents() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students
      })
    }
  }
}
</script>

<style>
/* Add any styles for this component here */
</style>
