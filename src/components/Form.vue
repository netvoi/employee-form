<template>
  <b-form @submit.prevent="saveFormHandler">
    <b-form-group
      label="Full name*"
      label-for="fullName"
    >
      <b-form-input
        id="fullName"
        v-model="$v.currentUser.fullName.$model"
        :state="validateState('fullName')"
      ></b-form-input>

      <b-form-invalid-feedback
        v-if="!this.$v.currentUser['fullName'].required"
      >This field will be required!
      </b-form-invalid-feedback>

      <b-form-invalid-feedback
        v-if="!this.$v.currentUser['fullName'].checkFullName"
      >First and last name fields must be required.
      </b-form-invalid-feedback>

    </b-form-group>
    <b-form-group
      label="Birth date*"
      label-for="birthDate"
    >
      <b-form-input
        id="birthDate"
        v-model="$v.currentUser.birthDate.$model"
        :state="validateState('birthDate')"
      ></b-form-input>

      <b-form-invalid-feedback
        v-if="!this.$v.currentUser['birthDate'].required"
      >This field will be required!
      </b-form-invalid-feedback>

      <b-form-invalid-feedback
        v-if="!this.$v.currentUser['birthDate'].formatDate"
      >Birth date field must be in the format: yyyy-mm-dd.
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      label="Description"
      label-for="description"
    >
      <b-form-textarea
        id="description"
        v-model="$v.currentUser.description.$model"
        :state="validateState('description')"
        class="create-form__textarea"
        no-resize
      ></b-form-textarea>
    </b-form-group>
    <span>
      <b-button
        class="mr-3"
        variant="outline-success"
        type="submit"
      >Save</b-button>
      <b-button
        @click="cancelFormHandler"
        variant="outline-danger"
      >Cancel</b-button>
    </span>
  </b-form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { maxLength, required } from 'vuelidate/lib/validators';

const checkFullName = (value) => {
  const [firstName, lastName] = [...value.split(' ', 2)];
  return firstName && lastName ? firstName.length && lastName.length : false;
};

const formatDate = (value) => {
  const re = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
  const currentDate = new Date(value);

  return re.test(value) && (currentDate instanceof Date && !Number.isNaN(currentDate));
};

export default {
  name: 'Form',
  mixins: [validationMixin],
  data() {
    return {
      currentUser: {
        fullName: '',
        birthDate: '',
        description: '',
      },
    };
  },
  props: {
    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  validations: {
    currentUser: {
      fullName: {
        required,
        checkFullName,
      },
      birthDate: {
        required,
        formatDate,
      },
      description: {
        maxLength: maxLength(100),
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.currentUser[name];
      return $dirty ? !$error : null;
    },
    saveFormHandler() {
      this.$v.currentUser.$touch();
      if (this.$v.currentUser.$anyError) {
        return;
      }

      this.currentUser.fullName = this.currentUser.fullName.trim().split(' ', 3).join(' ');

      this.$emit('saveFormHandler', this.currentUser);
      Object.keys(this.user).forEach((key) => {
        this.currentUser[key] = '';
      });
      this.$v.$reset();
    },
    cancelFormHandler() {
      this.$emit('cancelFormHandler');
    },
  },
  mounted() {
    this.currentUser = { ...this.user };
  },
  watch: {
    user(value) {
      this.currentUser = { ...value };
    },
  },
};
</script>
