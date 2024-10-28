<template>
  <div class="q-pa-md">
    <h1>Editar Elemento</h1>
    <form @submit.prevent="onSubmit">
      <q-input filled v-model="name" label="Nombre" class="q-mb-md" />
      <q-input filled type="date" v-model="fecha" label="Fecha" class="q-mb-md" />
      <q-select v-model="estado" :options="statusOptions" label="Estado" class="q-mb-md" />
      <q-btn label="Guardar Cambios" type="submit" color="primary" />
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const params = router.currentRoute.value.params;
    const name = ref('');
    const fecha = ref('');
    const estado = ref(null);
    
    const statusOptions = [
      { label: 'Activo', value: 'activo' },
      { label: 'Inactivo', value: 'inactivo' }
    ];

    const loadData = () => {
      const storedData = JSON.parse(localStorage.getItem('rows')) || [];
      const item = storedData[params.id]; // Aquí se accede al índice para editar
      if (item) {
        name.value = item.name;
        fecha.value = item.fecha;
        estado.value = item.estado;
      }
    };

    const onSubmit = () => {
      const storedData = JSON.parse(localStorage.getItem('rows')) || [];
      storedData[params.id] = { name: name.value, fecha: fecha.value, estado: estado.value };
      localStorage.setItem('rows', JSON.stringify(storedData));
      router.push('/'); // Redirige a la tabla después de guardar
    };

    onMounted(() => {
      loadData();
    });

    return {
      name,
      fecha,
      estado,
      statusOptions,
      onSubmit
    };
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
