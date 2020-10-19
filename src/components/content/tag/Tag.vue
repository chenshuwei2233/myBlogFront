<template>
	<div class="tag-cloud">
		<span class="tag-title">热门标签</span>
		<div class='tag-content'>
			<span v-for="item in tagData" class="tag" @click="toTag(item)">{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Tag',
		props: {
			tagBlog: {
				type: Array,
				default() {
					return []
				}
			}
		},
		mounted() {
			let tagCloud = document.querySelector('.tag-cloud')
			let tags = document.querySelectorAll('.tag')
			
			if(this.$route.path != '/detail/' + this.$route.params.id) {
				if(this.$store.state.dark == 1) {
					tagCloud.style.backgroundColor = 'black'
					tags.forEach((item) => {
						item.style.backgroundColor = 'black' 
					})
				}
			} 
			else {
					if(this.$store.state.dark == 1) {
						tagCloud.style.backgroundColor = '#1d1f20'
						tags.forEach((item) => {
							item.style.backgroundColor = '#1d1f23' 
						})
					}
			} 
		},
		computed: {
			tagData() {
				let ary = []
				var set;
				this.tagBlog.forEach((item,index) => {
					ary.push(item.label)
					set = new Set(ary)
				})
				return set
			},
			dark() {
				return this.$store.state.dark
			}
		},
		watch: {
			dark(newVal, oldVal) {
				let tag_cloud = document.querySelector('.tag-cloud')
				let tags = document.querySelectorAll('.tag')
				if(newVal == 1) {
					if(this.$route.path == '/detail/' + this.$route.params.id) {
						tag_cloud.style.backgroundColor = '#1d1f23'
						tags.forEach((item) => {
							item.style.backgroundColor = '#1d1f23' 
						})
					} else {
						tag_cloud.style.backgroundColor = 'black'
						tags.forEach((item) => {
							item.style.backgroundColor = 'black' 
						})
					}
					return 
				}
				tag_cloud.style.backgroundColor = '#fff'
				tags.forEach((item) => {
					item.style.backgroundColor = '#fff' 
				})
			},
			'$route.path': {
				handler: function(newVal, oldVal) {
					let tag_cloud = document.querySelector('.tag-cloud')
					let tags = document.querySelectorAll('.tag')
					if(newVal == '/detail/' + this.$route.params.id) {
						if(this.dark == 1) {
							tag_cloud.style.backgroundColor = '#1d1f23'
							tags.forEach((item) => {
								item.style.backgroundColor = '#1d1f23' 
							})
						}
					}
				}
			}
		},
		methods: {
			toTag(tag) {
				this.$router.push('/tag/'+ tag)
			}
		}
	}
</script>

<style>
	.tag-cloud {
		background-color: #fff;
		padding: 16px;
		width: 100%;
		border-radius: 4px;
	}
	.tag-title {
		width: 100%;
		font-size: 16px;
		border-left: 4px #448EF6 solid;
		padding-left: 12px;
	}
	.tag-content {
		margin-top: 10px;
	}
	.tag {
		display: inline-block;
		border: 1px solid #f2f2f5;
		background-color: #FFFFFF;
		border-radius: 20px;
		padding: 5px 12px;
		margin-right: 12px;
		margin-bottom: 8px;
		font-size: 12px;
	}
	.tag:hover {
		cursor: pointer;
	
		color: #1E88E5;
	}
</style>
