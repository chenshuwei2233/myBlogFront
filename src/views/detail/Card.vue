<template>
	<div class="card" :class="{cardHeight: cardStatus}" ref='card'>
		<div class="d-title" >{{b_detail.title}}</div>
		<div class="b-author">
			<img :src="authorImage" alt="">
			<div class="blogInfo">
				<span class="authorName">{{user.username}}</span>
				<span>作者</span>
				<div class='otherInfo'>
					<span class="c-time">{{b_detail.createDate}}</span>
				</div>
			</div>
		</div>
		
		<blogPreview v-if='b_detail.preview' :blogPreview='b_detail.preview'></blogPreview>
		<blogContent :blogContent='b_detail.content'></blogContent>
		<div class="masks" v-if="cardStatus" ref='masks'>
			<button class="readMore" @click="readMore">阅读全文</button>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '../../eventbus/event-bus.js'
	import { getUser } from 'network/user.js'
	import { login } from 'network/login.js'
	import blogContent from './blogContent.vue'
	import blogPreview from './blogPreview.vue'
	export default {
		name: 'Card',
		components: {
			blogContent,
			blogPreview
		},
		data() {
			return {
				showTitle: false,
				authorImage: '',
				user: {},
				cardStatus: false,
				timer: null
			}
		},
		props: {
			b_detail: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			dark() {
				return this.$store.state.dark
			}
		},
		created() {
			setTimeout(() => {
				login({username: 'admin', password: 'admin'}).then(res => {
					localStorage.setItem('authorization', 'Bearer ' + res.data.token)
					getUser(this.b_detail.author).then(res => {
						this.user = res.data.data[0]
						console.log(this.user)
						this.authorImage = res.data.data[0].avatar
						EventBus.$emit('userInfo', this.user)
					})
				})
			},200)
			
			
		},
		watch: {
			showTitle: {
				handler: function(newVal, oldVal) {
					// EventBus.$emit('blogTitle', this.b_detail.title)
					let navContent = document.querySelector('.nav-content')
					let Htitle = document.querySelector('.h-title span')
					if (newVal) {
						navContent.style.top = '-60px'
						Htitle.style.top = '18px'
						return 
					}
					navContent.style.top = '0px'
					Htitle.style.top = '60px'
				}
			},
			dark(newVal, oldVal) {
				let d_title = document.querySelector('.d-title')
				if(newVal == 1) {
					d_title.style.color = '#b3b3b3'
					return
				}
				d_title.style.color = '#404040'
			}
					
		},
		mounted() {
			window.addEventListener('scroll', this.handlerScroll)
			
			new Promise((resolve, reject) => {
				this.timer = setTimeout(() => {
					let card = this.$refs.card
					EventBus.$emit('blogTitle', this.b_detail.title)
					resolve(card.offsetHeight)
				},700)
			}).then(res => {
				console.log(res)
				if(res > 2500) {
					this.cardStatus = true
				}
			})
		},
		destroyed() {
			window.removeEventListener('scroll',this.handlerScroll)
			clearTimeout(this.timer)
		},
		methods: {
			handlerScroll() {
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				let offsetTop = document.querySelector('.d-title').offsetTop
				if(window.matchMedia('(max-width: 800px)').matches) {
					return 
				} else {
					this.showTitle = scrollTop > offsetTop ? true : false;
				}
				
			},
			readMore() {
				this.cardStatus = false
			}
		}
	}
</script>

<style scoped="scoped">
	.card {
		background-color: #fff;
		padding: 24px;
		overflow: hidden;
		position: relative;
	}

	.d-title {
		color: #404040;
		font-size: 30px;
		font-weight: 1000;
		margin-bottom: 16px;
		word-break: break-word;
	}
	.b-author {
		width: 100%;
		overflow: hidden;
		margin-bottom: 32px;
	}
	.b-author img{
		width: 48px;
		height: 48px;
		border: 1px solid #eee ;
		border-radius: 50%;
		float: left;
	}
	.blogInfo {
		float: left;
		margin-left: 8px;
	}
	.blogInfo span:nth-child(2) {
		margin-left: 8px;
		font-size: 12px;
		border: 1px solid #1E88E5;
		padding: 2px 4px;
		border-radius: 20px;
		color: #1E88E5;
	}
	.otherInfo {
		margin-top: 16px;
		font-size: 12px;
		color: #969696;	
	}
	.cardHeight {
		height: 2500px;
	}
	.masks {
		position: absolute;
		width: 100%;
		height: 200px;
		background: -webkit-gradient(linear,0 top,0 bottom,from(rgba(255,255,255,0)),to(#fff));
		bottom: 0;
	}
	.readMore {
		position: absolute;
		width: 86px;
		height: 30px;
		color: #2980F9;
		border: 1px solid #2980F9;
		background-color: #FFFFFF;
		border-radius: 20px;
		font-size: 12px;
		outline: none;
		bottom: 50px;
		left: 50%;
		transform: translateX(-50%);
	}
	.readMore:hover {
		cursor: pointer;
	}
</style>
