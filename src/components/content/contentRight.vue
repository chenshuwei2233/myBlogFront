<template>
	<div class="right">
		<div v-if="isShow">
			<Time></Time>
			<recommend :blog='blogs' class="recommend1">
				<slot>本月推荐</slot>
			</recommend>
		</div>
		<div v-if="!isShow">
			<div class="author-box">
				<div class="author-img">
					<img :src="user.avatar" alt="">
					<div class="author-info">
						<div class="author-name"><span>{{user.username}}</span><span>作者</span></div>
						<div>努力工作，拼命玩</div>
					</div>
				</div>
				<div v-for="(item,index) in blogs" v-if="index <= 2" class="blog-box" @click="toDetail(item.id)">{{item.title}}
					<span>阅读142</span></div>
			</div>
		</div>
		<recommend :blog='blogs' v-if="!isShow" class="recommend">
			<slot>推荐阅读</slot>
		</recommend>
		<div class="re" :class="{'is_fixed': isFixed}">
			<Tag :tag-blog='blogs' class='tag1' v-if='isAlive'></Tag>
		</div>
		<backTop class='backTop' v-show='isFixed' @click.native='backTop'></backTop>
	</div>
</template>

<script>
	import Time from './time/Time.vue'
	import recommend from './recommend/recommend.vue'
	import Tag from './tag/Tag.vue'
	import backTop from './backTop/backTop.vue'
	import {
		EventBus
	} from '../../eventbus/event-bus.js'
	export default {
		name: 'contentRight',
		components: {
			Time,
			recommend,
			Tag,
			backTop
		},

		props: {
			blogs: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				isFixed: false,
				isShow: true,
				user: {},
				isAlive: true
			}
		},
		computed: {
			dark: function() {
				return this.$store.state.dark
			}
		},
		watch: {
			'$route.path': {
				handler(newVal, oldVla) {
					if (newVal == '/detail/' + this.$route.params.id) {
						this.isShow = false
						if(this.dark == 1) {
							setTimeout(() => {
								let author_box = document.querySelector('.author-box')
								author_box.style.backgroundColor = '#1d1f20'
								let recommend = document.querySelector('.recommend')
								recommend.style.backgroundColor = '#1d1f20'
							},100)
						}
						return
					}
					this.isAlive = false
					this.$nextTick(() => {
						this.isAlive = true
					})
					this.isShow = true
				}
			},
			dark(newVal, oldVal) {

				if (newVal == 1) {

					if (this.isShow === false) {
						let author_box = document.querySelector('.author-box')
						author_box.style.backgroundColor = '#1d1f20'
						let recommend = document.querySelector('.recommend')
						recommend.style.backgroundColor = '#1d1f20'
					} else {
						let recommend1 = document.querySelector('.recommend1')
						recommend1.style.backgroundColor = 'black'
					}
					return
				}
				if (this.isShow === false) {
					let author_box = document.querySelector('.author-box')
					author_box.style.backgroundColor = '#fff'
					let recommend = document.querySelector('.recommend')
					recommend.style.backgroundColor = '#fff'
				} else {
					let recommend1 = document.querySelector('.recommend1')
					recommend1.style.backgroundColor = '#fff'
				}
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
			EventBus.$on('userInfo', msg => {
				this.user = msg
			})
			
		},
		destroyed() {
			// 
		},
		methods: {
			handleScroll() {
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				let offsetTop = document.querySelector('.re').offsetTop
				this.isFixed = scrollTop > 800 ? true : false;
			},
			backTop() {
				var timer = setInterval(function() {
					let osTop = document.documentElement.scrollTop || document.body.scrollTop;
					let ispeed = Math.floor(-osTop / 5);
					document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
					if (osTop === 0) {
						clearInterval(timer);
					}
				}, 5)
			},
			toDetail(id) {
				this.$router.push('/detail/' + id)
			}
		}
	}
</script>

<style scoped="scoped">
	.right {
		width: 25%;
		padding-left: 15px;
		padding-right: 15px;
		position: relative;
	}

	.re {
		width: 100%;
	}

	.is_fixed {
		position: fixed;
		top: 65px;
		z-index: 99;
		width: calc(83% * 0.25 - 32px);
	}

	.backTop {
		position: fixed;
		right: 80px;
		bottom: 30px;
	}

	.author-box {
		width: 100%;
		height: 250px;
		background-color: #FFFFFF;
		padding: 16px;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}

	.author-box div {
		flex: 1;
		font-size: 14px;
	}
	
	.author-img {
		border-bottom: 1px solid #eee;
	}

	.author-img img {
		width: 45px;
		height: 45px;
		border-radius: 90px;
		float: left;
	}

	.author-info {
		float: left;
		margin-left: 8px;
	}
	
	.author-info div:first-child {
		margin-bottom: 8px;
	}
	
	.author-info div:last-child {
		font-size: 12px;
		color: #9cA0Ad;
	}

	.author-name span:first-child {
		margin-right: 8px;
	}

	.author-name span:last-child {
		border: 1px solid #1E88E5;
		font-size: 12px;
		padding: 2px;
		color: #1E88E5;
		border-radius: 2px;
	}

	.blog-box {
		padding-top: 8px;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;

		position: relative;
	}
	.blog-box:hover {
		cursor: pointer;
		color: #1E88E5;
	}
	.blog-box span {
		position: absolute;
		bottom: 0;
		left: 0;
		color: #9CA0AD;
		font-size: 12px;
	}

	.recommend {
		background-color: #fff;
		padding: 16px;
		margin-bottom: 10px;
		border-radius: 4px;
	}
</style>
