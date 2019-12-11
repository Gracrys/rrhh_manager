<template>
	<transition name="swipe">
	<aside :class="['blinds_' + this.position, 'blinds' ]">
		<slot name="header">
			This is the default tile!

          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            x
          </button>

      </slot>

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
		&right
			right: 0

.swipe-enter-active, .swipe-leave-active
	transition: all .5s
 

.swipe-enter, .swipe-leave-to /* .fade-leave-active below version 2.1.8 */
	&.blinds_left 
		transform: translateX(-50vw)
	&.blinds_right
		transform: translateX(50vw)  
</style>