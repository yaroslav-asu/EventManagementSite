<template>
  <div class="">
    <HeaderLayout/>
    <div class="column justify-center items-center text-center">
      <h3>Lorem ipsum dolor sit amet</h3>
      <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cum exercitationem neque officiis quo,
        similique. A consequuntur dolorum ea fugiat fugit id, nam nesciunt omnis placeat ratione rerum similique
        velit!</h5>
      <h5>
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aliquam assumenda at, beatae
          delectus dolore eaque expedita impedit maxime modi neque nisi officiis quam quis ratione suscipit veritatis.
          Eaque.
        </div>
        <div>Est eum facere repudiandae sint? Laboriosam laborum magnam officia possimus quia quidem quisquam rem
          temporibus veritatis. Ad autem commodi consectetur eligendi eveniet excepturi magni nobis, praesentium quidem
          quos soluta voluptatem!
        </div>
        <div>A ab amet blanditiis consectetur corporis, cum ducimus earum enim, facere natus odio omnis, porro quas
          saepe sequi similique tenetur! Assumenda at deleniti dicta laboriosam laudantium non repellat tempora
          voluptas.
        </div>
        <div>Adipisci aperiam excepturi mollitia porro quisquam tempore! Doloremque inventore ipsum minus quaerat! Cum
          error esse, explicabo impedit ipsam, nesciunt nulla officia ratione repellat repellendus sed, temporibus!
          Eaque earum facilis recusandae.
        </div>
        <div>Dolores itaque nobis quis recusandae sit tempore veniam. Consectetur cupiditate delectus dolore doloribus
          est nesciunt, omnis porro rem reprehenderit tenetur! Earum eveniet in magnam provident quae reprehenderit
          saepe sed tempora!
        </div>
      </h5>
    </div>

  </div>
</template>

<script>
import HeaderLayout from "layouts/HeaderLayout";

export default {
  name: "MainLayout",
  components: {
    HeaderLayout,
  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 450px) {
  header{
    justify-content: center;
  }
}
</style>
