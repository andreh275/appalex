<template>
  <div class="main-container">
    <q-tabs v-model="tab" inline-label class="styled-tabs" @update:model-value="navigateToRoute">
      <q-tab name="/" label="Inicio" />
      <q-tab name="/agregar" label="Agregar" />
      <q-tab name="/editar/0" label="Editar" /> <!-- Proporciona un ID predeterminado para la edición -->
    </q-tabs>

    <section class="content-section">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tab: '/', 
    };
  },
  watch: {
    $route(to) {
      this.tab = to.path;
    },
  },
  methods: {
    navigateToRoute(route) {
      this.$router.push(route);
    },
  },
  mounted() {
    this.tab = this.$route.path;
  },
};
</script>

<style scoped>
.main-container {
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  margin: 0 auto;
}

/* Estilos para las pestañas */
.styled-tabs {
  width: 100%; /* Asegúrate de que ocupe todo el ancho */
  background: linear-gradient(45deg, #1e88e5, #42a5f5);
  border-radius: 0; /* Elimina el borde redondeado */
  padding: 10px 0; /* Añade un poco de padding vertical */
  margin-bottom: 20px;
}

.q-tab {
  font-weight: bold;
  font-size: 1rem;
  color: #ffffff;
}

.q-tab--active .q-tab__content {
  color: #ffd54f; /* Color para la pestaña activa */
}

.q-tab__icon {
  color: #ffffff;
}

/* Estilos para la sección de contenido */
.content-section {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
