<template>
  <div class="q-pa-md">
    <h1>Lista de Elementos</h1>
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      :title="'Lista de Elementos'"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td>
          <q-btn label="Editar" @click="editItem(props.row.id)" color="primary" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const rows = ref([]);
    const columns = [
      { name: 'name', label: 'Nombre', align: 'left', field: 'name' },
      { name: 'fecha', label: 'Fecha', align: 'center', field: 'fecha' },
      { name: 'estado', label: 'Estado', align: 'center', field: 'estado' },
      { name: 'actividad', label: 'Actividad', align: 'center', field: 'actividad' },
      { name: 'actions', label: 'Acciones', align: 'center' } // Columna para editar
    ];

    const loadData = () => {
      const storedData = JSON.parse(localStorage.getItem('rows')) || [];
      rows.value = storedData.map((item, index) => ({
        ...item,
        id: index // Agregamos un id basado en el índice
      }));
    };

    const editItem = (id) => {
      router.push({ path: `/Editar/${id}` }); // Redirige a la página de edición
    };

    onMounted(() => {
      loadData(); // Cargar datos al montar el componente
    });

    return {
      rows,
      columns,
      editItem,
    };
  },
};
</script>

<style scoped>

</style>
