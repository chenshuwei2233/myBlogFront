<template>
	<div class="recommend">
		<div class="re-header"><slot></slot></div>	
		<div v-for="(item, index) in reData" class="re-blog" :key='index'> 
			<div class="re-title" @click="toDetail(item.id)">{{item.title}}</div>
			<div class="read-number">阅读605</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'recommend',
		props: {
			blog: {
				type: Array,
				default() {
					return []
				}
			}
		},
		
		created() {
			
		},
		mounted() {
			
				if(this.$store.state.dark == 1) {
					let recommend = document.querySelector('.recommend')
					recommend.style.backgroundColor = 'black'
				}
			
		},
		methods: {
			toDetail(id) {
				let flag = navigator.userAgent.match(
					/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
				);
				if (flag) {
					this.$router.push('/detail/' + id)
				} else {
					window.open('/detail/' + id);
					localStorage.setItem('dark', this.$store.state.dark)
				}
			}
		},
		computed: {
			reData() {
				var ary = []
				this.blog.forEach(item => {
					if(item.preview) {
						ary.push(item)
					}
				})
				
				return ary
			},
			dark() {
				return this.$store.state.dark
			}
		},
	
	}
</script>

<style scoped="scoped">
	.recommend {
		margin: 10px 0;
		width: 100%;
		padding: 35px 0;
		
	}
	.re-header {
		width: 100%;
		border-left: 4px solid #448EF6;
		padding-left: 12px;
		font-size: 16px;
	}
	.re-blog {
		margin: 20px 0;
	}
	.re-title {
		font-size: 14px;
		
		
	}
	.re-title:hover {
		cursor: pointer;
		color: #1E88E5;
	}
	.read-number {
		margin-top: 5px;
		font-size: 12px;
		color: #9CA0AD;
	}
</style>
