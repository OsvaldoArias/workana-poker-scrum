<template>
  <div>
    <h3>Notificaciones</h3>
    <b-alert v-for="lis in listReveal" :key="lis.index" show variant="success">
      The issue # {{ lis.issue }} has been revealed
    </b-alert>
    <hr />
    <b-alert v-for="lin in listNoti" :key="lin.index" show>
      New issue # {{ lin.newIssue }} created by {{ lin.userName }}
    </b-alert>
  </div>
</template>

<script>
export default {
  props: ['listReveal', 'listNoti'],
}
</script>

<style></style>
