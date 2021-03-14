<template>
  <div class="create-form">
    <h1 class="p-5 text-center">Create form</h1>

    <Form
      @saveFormHandler="saveFormHandler"
      @cancelFormHandler="cancelFormHandler"
      :user="user"
    />

  </div>
</template>

<script>
import Form from '../components/Form.vue';

export default {
  name: 'Create-form',
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
    saveFormHandler(user) {
      this.user = { ...user };

      const list = JSON.parse(localStorage.getItem('employee')) || [];
      list.push({
        fullName: this.user.fullName,
        birthDate: this.user.birthDate,
        description: this.user.description,
      });

      localStorage.setItem('employee', JSON.stringify(list));
      this.$router.push('/');
    },
    cancelFormHandler() {
      this.$router.push('/');
    },
  },
};
</script>
