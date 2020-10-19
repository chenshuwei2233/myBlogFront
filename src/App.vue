<template>
	<div id="app">
		<Header class='hd' :class="{'isFixed': true}"></Header>
		<Content></Content>
	</div>
</template>



<script>
	import Header from '@/components/content/Header.vue'
	import Content from 'components/content/Content.vue'

	export default {
		name: 'App',
		components: {
			Header,
			Content
		},
		data() {
			return {
				isFixed: false,
				
			}
		},
		computed: {
			dark() {
				return this.$store.state.dark
			}
		},
		watch: {
			dark(newVal, oldVal) {
				let header = document.querySelector('.isFixed')
				if(newVal == 1) {
					header.style.backgroundColor = 'black'
					header.style.color = '#b3b3b3'
					return 
				}
				header.style.backgroundColor = '#fff'
				header.style.color = 'black'
			}
		}
	}
</script>

<style>
	@import url("assets/css/base.css");
	.isFixed {
		position: fixed;
		top: 0;
		z-index: 999;
		background-color: #fff;
	}
</style>
