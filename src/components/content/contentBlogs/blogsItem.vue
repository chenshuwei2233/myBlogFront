<template>
	<div class="blogsItem">
		<div class="introduction" ref='introduction'>
			<div class="in-title" @click="toDetail(item.id)">
				{{item.title}}
			</div>
			<div class="in-html" v-show="false"></div>
			<div class="in-content">{{blogText}}</div>
			<div class="meta">
				<span class="author">{{item.author}}</span>
				<span class="praise"><i class="el-icon-star-on"></i> {{item.praise}}</span>
				<span><i class="el-icon-chat-dot-square"></i> {{item.commentNumber}}</span>
				<span class="date">{{item.createDate | showDate}}</span>
			</div>
		</div>
		<div class="in-img">
			<img :src="item.preview" alt="">
		</div>
	</div>
</template>

<script>
	import {
		EventBus
	} from '../../../eventbus/event-bus.js'
	import { formatDate } from '../../../common/utils/utils.js'
	export default {
		name: 'blogsItem',
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				blogText: '',
				isImg: false
			}
		},
		created() {
			console.log(formatDate(new Date(Date.now()), 'yyyy-MM-dd hh:mm:ss'))

		},
		mounted() {
			let html = document.querySelector('.in-html')
			html.innerHTML = this.item.content
			this.blogText = html.innerText
			if (this.item.preview) {
				let introduction = this.$refs.introduction
				introduction.style.width = '80%'
			}
		},
		computed: {
			dark() {
				return this.$store.state.dark
			}
		},
		watch: {
			dark(newVal, oldVal) {
				let blogsItem = document.querySelector('.blogsItem')
				if (newVal == 1) {
					blogsItem.style.backgroundColor = 'black'
					blogsItem.style.color = '#b3b3b3'
					return
				}
				blogsItem.style.backgroundColor = '#fff'
				blogsItem.style.color = 'black'
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
		filters: {
			showDate(createDate) {
				return formatDate(new Date(parseInt(createDate)), 'yyyy-MM-dd hh:mm:ss')
			}
		}
	}
</script>

<style>
	.blogsItem {
		width: 100%;
		height: 140px;
		border-bottom: 1px solid #f0f0f0;
		padding: 15px 2px 20px 0;
		display: flex;
		position: relative;
	}

	.introduction {
		width: 100%;
		height: 100%;

	}

	.in-title {
		font-size: 18px;
		font-weight: 700;
		margin-bottom: 7px;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.in-title:hover {
		cursor: pointer;
		color: #1E88E5;
	}

	.in-content {
		padding-right: 10px;
		font-size: 13px;
		height: 40px;
		line-height: 20px;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #999;
	}

	.meta {
		position: absolute;
		width: 100%;
		font-size: 12px;
		color: #B4B4B4;
		bottom: 10px;
	}
	
	.meta span {
		margin-right: 10px;
	}
	.meta span:hover {
		cursor: pointer;
		color: #393E46;
	}
	.in-img {
		flex: 1;
		text-align: right;

	}

	.in-img img {
		width: 100%;
		height: 100%;
	}
	
</style>
