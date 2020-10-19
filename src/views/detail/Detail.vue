<template>
	<div>
		<Card :b_detail='blog' class='card' ref='card'></Card>
		<cardBottom class='c-bottom'></cardBottom>
		<!-- <div class="fgx"></div> -->
		<Comment :blogTitle='blog.title' ></Comment>
		
	</div>
</template>

<script>
	import Card from './Card.vue'
	import cardBottom from './cardBottom.vue'
	import { login } from 'network/login.js'
	import { getBlogDetail } from 'network/front.js'
	import Comment from './Comment.vue'
	import {
		EventBus
	} from '../../eventbus/event-bus.js'
	export default {
		name: 'Detail',
		data() {
			return {
				blogId: 0,
				blog: {}
			} 
		},
		components: {
			Card,
			cardBottom,
			Comment
		},
		created() {
			this.blogId = this.$route.params.id
			login({username: 'admin', password: 'admin'}).then(res =>{
				localStorage.setItem('authorization', 'Bearer ' + res.data.token)
				getBlogDetail(this.blogId).then(res => {
					this.blog = res.data.data[0]
					
				})
			})
		},
		mounted() {
			document.querySelector('body').style.backgroundColor = 'rgb(246,246,246)'
			if(this.dark == 1) {
				let card = document.querySelector('.card')
				let cardBottom = document.querySelector('.c-bottom')
				document.querySelector('body').style.backgroundColor = 'black'
				card.style.backgroundColor = '#1d1F20'
				cardBottom.style.backgroundColor = '#1d1f20'
			}
		}, 
		computed: {
			dark() {
				return this.$store.state.dark
			}
		},
		watch: {
			'$route.path': {
				handler: function(newVal, oldVal) {
					this.$parent.reload();
				}
			},
			dark(newVal, oldVal) {
				let card = document.querySelector('.card')
				let cardBottom = document.querySelector('.c-bottom')
				let d_title = this.$refs.card
				console.log(d_title)
				if(newVal == 1) {
					card.style.backgroundColor = '#1d1F20'
					cardBottom.style.backgroundColor = '#1d1f20'
					return 
				}
				card.style.backgroundColor = '#fff'
				cardBottom.style.backgroundColor = '#fff'
				
			}
		}
	}
</script>

<style scoped="scoped">

	.footer {
		width: 100%;
		margin-top: 58px;
		text-align: center;
		color: #888888;
		font-size: 12px;
	}
</style>
