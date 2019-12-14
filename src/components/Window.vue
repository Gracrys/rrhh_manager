<template>
	<transition name="swipe">
    <aside :class="['blinds_' + this.position, 'blinds', 'card' ]">
      <header class="columns card-header bg-blue p-2">
        <section class="col-11">
         <slot  name="header">
            This is the default tile!
        </slot>
        </section>
		          <button
            type="button"
            class="btn-close col-1 btn btn-link"
            @click="close"
          >
            <i class="icon icon-cross"></i>
          </button>
      </header>
      <slot name="body">
      	 I'm the default body!
      </slot>

	</aside>
	</transition>
</template>

<script>
  export default {
    name: 'Window',

    methods: {
      close() {
        this.$emit('close');
      },
    },
    props: {
    	//left or right
    	position: {
    		type: String,
    		required: true
    	}
    }
  };
</script>
<style lang="sass" scoped>
aside.blinds
  position: absolute
  width: calc(50vw - 60px)
  height: 100%
  top: 0
  &.blinds_
    &left
      left: 0
      header
        width: 90%
        margin-top: 2em
        margin-bottom: 2em

    &right
      right: 0
      header
        width: 90%
        margin-left: auto
        margin-top: 2em
        margin-bottom: 2em

.swipe-enter-active, .swipe-leave-active
  transition: all .5s
 

.swipe-enter, .swipe-leave-to /* .fade-leave-active below version 2.1.8 */
  &.blinds_left 
    transform: translateX(-50vw)
  &.blinds_right
    transform: translateX(50vw)  
</style>
