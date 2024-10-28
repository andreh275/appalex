<template>
  <i class="q-icon notranslate material-icons q-select__dropdown-icon" aria-hidden="true" role="presentation">arrow_drop_down</i>
  <div class="q-pa-md" style="max-width: 400px; margin: auto; border: 1px solid #ccc; border-radius: 8px; padding: 20px; background-color: #f9f9f9; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
    <form @submit.prevent="onSubmit" class="q-gutter-md">|
      <q-input
        ref="nameRef"
        filled
        v-model="name"
        label="Tu nombre *"
        hint="Nombre y apellido"
        lazy-rules
        :rules="nameRules"
        class="q-mb-md"
        style="font-size: 1.5em; padding: 10px;"
      />

      <q-input
        ref="dateRef"
        filled
        type="date"
        v-model="date"
        label="Seleccionar Fecha *"
        lazy-rules
        :rules="dateRules"
        class="q-mb-md"
        style="font-size: 1.5em; padding: 10px;"
      />

      <q-select
        v-model="status"
        :options="statusOptions"
        label="Seleccionar Estado *"
        lazy-rules
        :rules="statusRules"
        class="q-mb-md"
        style="font-size: 1.5em; padding: 10px;"
      />

      <q-toggle v-model="accept" label="Acepto la licencia y términos" class="q-mb-md" style="font-size: 1.5em;" />

      <div>
        <q-btn label="Listo" type="submit" color="primary" class="q-mb-md" style="font-size: 1.5em; padding: 10px 20px;" />
      </div>
    </form>

    <!-- Sección para mostrar el estado guardado -->
    <div v-if="submittedData" class="q-mt-md" style="font-size: 1.5em; padding: 10px; background-color: #e0f7fa; border-radius: 8px;">
      <p><strong>Nombre:</strong> {{ submittedData.name }}</p>
      <p><strong>Fecha:</strong> {{ submittedData.fecha }}</p>
      <p><strong>Estado:</strong> {{ submittedData.estado }}</p>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const name = ref(null);
    const date = ref(null);
    const status = ref(null);
    const accept = ref(false);
    const submittedData = ref(null); // Nueva propiedad reactiva para los datos enviados

    const nameRules = [
      val => (val && val.length > 0) || 'Por favor, escribe algo'
    ];

    const dateRules = [
      val => (val !== null) || 'Por favor, selecciona una fecha'
    ];

    const statusOptions = [
      { label: 'Activo', value: 'activo' },
      { label: 'Inactivo', value: 'inactivo' }
    ];

    const statusRules = [
      val => (val !== null) || 'Por favor, selecciona un estado'
    ];

    const onSubmit = () => {
      if (!name.value || !date.value || !status.value) {
        $q.notify({
          color: 'negative',
          message: 'Por favor, completa todos los campos'
        });
        return;
      }

      // Crear un objeto con los datos
      const data = { name: name.value, fecha: date.value, estado: status.value };

      // Guardar los datos en el almacenamiento local (opcional) o directamente en un store
      const currentData = JSON.parse(localStorage.getItem('rows')) || [];
      currentData.push(data);
      localStorage.setItem('rows', JSON.stringify(currentData));

      // Guardar los datos enviados para mostrarlos
      submittedData.value = data;

      // Redirigir a la tabla (Inicio)
      router.push('/'); // Cambia a la ruta de inicio

      // Resetea el formulario
      name.value = null;
      date.value = null;
      status.value = null;
      accept.value = false;
    };

    return {
      name,
      date,
      status,
      statusOptions,
      accept,
      submittedData, // Devolver la propiedad reactiva
      nameRules,
      dateRules,
      statusRules,
      onSubmit
    };
  }
}
</script>

<style scoped>
.q-input, .q-select {
  border-radius: 8px;
}

.q-btn {
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}

.q-btn:hover {
  background-color: #1976D2; /* Color de hover para el botón */
  color: white; /* Color de texto al hacer hover */
}
</style>
