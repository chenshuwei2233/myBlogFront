<template>
	<div class="content">
		<contentLeft class='left' :blogs='blogs' ></contentLeft>
		<contentRight class='right' :blogs='blogs' ></contentRight>
	</div>
</template>

<script>
	import contentLeft from './contentLeft.vue'
	import contentRight from './contentRight.vue'
	
	import { login } from 'network/login.js'
	import { getBlogData } from 'network/blog.js'
	
	export default {
		name: 'Content',
		components: {
			contentLeft,
			contentRight
		},
		data() {
			return {
				blogs: [],
				isAlive: true
			}
		},
		created() {
			login({
				username: 'admin',
				password: 'admin'
			}).then(res => {
				localStorage.setItem('authorization', 'Bearer ' + res.data.token)
				getBlogData('').then(res => {
					this.blogs = res.data.data
				}) 
			})
		},
		computed: {
			dark() {
				return this.$store.state.dark
			}
		},
		watch: {
			dark(newVal, oldVal) {
				let content = document.querySelector('.content')
				let left = document.querySelector('.left')
				let right = document.querySelector('.right')
				if(newVal == 1) {
					content.style.backgroundColor = 'black'
					content.style.color = '#b3b3b3'
					left.style.backgroundColor = 'black'
					return 
				}
				content.style.backgroundColor = '#fff'
				left.style.backgroundColor = '#fff'
				content.style.color = 'black'
			},
			
		}
	}
</script>

<style scoped="scoped">
	.content {
		width: 83%;
		margin: 108px auto; 
		margin-bottom: 16px;
	}
	.left {
		background-color: #FFFFFF;
	}
	@media screen and (max-width: 800px) {
		.content {
			padding: 0 2%;
			width: 98%;
			margin-top: 76px;
			margin-bottom: 0;
		}
		.left {
			
			width: 100%;
			padding: 0;
			margin-bottom: 20px;
		}
		.right {
			display: none;
		}
	}
</style>
