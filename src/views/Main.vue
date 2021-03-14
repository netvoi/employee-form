<template>
  <div class="main">

    <h1 class="p-5 text-center">Employee forms</h1>

    <router-link
      tag="a"
      to="/create"
      class="mb-4 d-inline-block"
    >
      <b-button variant="outline-primary">Add new employee</b-button>
    </router-link>

    <b-table
      id="employee-table"
      striped
      hover
      show-empty
      bordered
      borderless
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #cell(actions)="row">
        <span class="main__action">
          <button @click="editHandler(row)">
            <b-icon icon="pencil" scale="1.2"></b-icon>
          </button>
          <button @click="warningModal(row)">
            <b-icon icon="bucket" scale="1.2"></b-icon>
          </button>
        </span>
      </template>
    </b-table>

    <div class="d-flex flex-column align-items-center">
      <b-pagination
        aria-controls="employee-table"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></b-pagination>
    </div>

    <b-modal id="modal-alert" title="The entry will be deleted. Sure?">
    </b-modal>
  </div>
</template>

<script>
import joinFullName from '../middlewares/joinFullName';
import splitFullName from '../middlewares/splitFullName';

export default {
  name: 'Main',
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      items: [],
      fields: [
        {
          key: 'firstName',
          label: 'First name',
          class: 'name-part',
        },
        {
          key: 'lastName',
          label: 'Last name',
          class: 'name-part',
        },
        {
          key: 'middleName',
          label: 'Middle name',
          class: 'name-part',
        },
        {
          key: 'birthDate',
          label: 'Birth date',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'action',
        },
      ],
    };
  },
  methods: {
    editHandler(row) {
      this.$router.push(`/edit/${row.index}`);
    },
    removeHandler(row) {
      const currentItems = [];

      this.items.forEach((item, index) => {
        if (row.index === index) {
          this.items.splice(index, 1);
        } else {
          currentItems.push(joinFullName(item));
        }
      });

      localStorage.setItem('employee', JSON.stringify(currentItems));
    },
    warningModal(row) {
      this.$bvModal.msgBoxConfirm('Are you sure?')
        .then((flag) => {
          if (flag) {
            this.removeHandler(row);
          }
        })
        .catch((err) => {
          throw (err);
        });
    },
    loadEmployeeList() {
      this.items = JSON.parse(localStorage.getItem('employee'));

      this.items.forEach((item, index) => {
        this.items[index] = splitFullName(item);
      });
    },
  },
  mounted() {
    this.loadEmployeeList();
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>

<style lang="scss">
.name-part {
  min-width: 130px;
  max-width: 180px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action {
  width: 100px;
  text-align: center;
}
</style>
