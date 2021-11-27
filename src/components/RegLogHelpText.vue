<template>
  <div class="helper_text text-center  " >
    <p v-if="parentPage === 'login'">Нет аккаунта? <a href="/registration" class="text-primary decoration">Регистрация</a></p>
    <p v-else>Уже есть аккаунт? <a href="/login">Вход</a></p>
  </div>
</template>

<script>
export default {
  name: "regLogHelpText",
  props:['parentPage'],
}
</script>

<style lang="scss" scoped>
</style>
