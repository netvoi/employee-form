<template>
  <div class="edit-form">

    <h1 class="p-5 text-center">Edit form</h1>

    <Form
      @saveFormHandler="saveFormHandler"
      @cancelFormHandler="cancelFormHandler"
      :user="currentUser"
    />

  </div>
</template>

<script>
import Form from '../components/Form.vue';

export default {
  name: 'Edit-form',
  data() {
    return {
      user: {
        fullName: '',
        birthDate: '',
        description: '',
      },
    };
  },
  components: {
    Form,
  },
  methods: {
    loadEmployee() {
      [this.user] = JSON.parse(localStorage.getItem('employee')).filter((item, index) => index === +this.$route.params.id);
    },
    saveFormHandler(user) {
      this.user = { ...user };

      const list = JSON.parse(localStorage.getItem('employee')) || [];
      list.forEach((item, index) => {
        if (index === +this.$route.params.id) {
          list[index].fullName = this.user.fullName;
          list[index].birthDate = this.user.birthDate;
          list[index].description = this.user.description;
        }
      });

      localStorage.setItem('employee', JSON.stringify(list));
      this.$router.push('/');
    },
    cancelFormHandler() {
      this.$router.push('/');
    },
  },
  mounted() {
    this.loadEmployee();
  },
  computed: {
    currentUser() {
      return this.user;
    },
  },
};
</script>
