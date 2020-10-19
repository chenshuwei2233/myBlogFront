<template>
	<div class="blogContent">
		<div class="b-content" ref='b_content' >
			
		</div>
		<!-- <div class="mask" v-if="contentStatus"></div> -->
	</div>
</template>

<script>
	export default {
		name: 'blogContent',
		data() {
				return {
					timer: null,
					contentStatus: false
				}
		},
		props: {
			blogContent: {
				type: String,
				default: ""
			}
		},
		created() {
			
		},
		mounted() {
			new Promise((resolve, reject) => {
					this.timer = setInterval(() => {
					if(this.blogContent != '') {
						resolve(this.blogContent)
					}
				},500)
			}).then(res => {
				let b_content = this.$refs.b_content
				
				b_content.innerHTML = res
				// if(b_content.offsetHeight > 3000) {
				// 	this.contentStatus = true
				// }
				clearInterval(this.timer)
			})
		},
		methods: {
		
		}
	}
</script>

<style >
	/* .blogContent {
		position: relative;
	} */
	.b-content {
		width: 100%;
		line-height: 2;
		overflow: hidden;
	}
	.b-content table {
	  border-top: 1px solid #ccc;
	  border-left: 1px solid #ccc;
	}
	.b-content table td
	 {
	  border-bottom: 1px solid #ccc;
	  border-right: 1px solid #ccc;
	  padding: 3px 5px;
	}
	.b-content table th {
		  border-right: 1px solid #ccc;
	  border-bottom: 2px solid #ccc;
	  text-align: center;
	}
	
	/* blockquote 样式 */
	.b-content blockquote {
	  display: block;
	  border-left: 8px solid #d0e5f2;
	  padding: 5px 10px;
	  margin: 10px 0;
	  line-height: 1.4;
	  font-size: 100%;
	  background-color: #f1f1f1;
	}
	
	/* code 样式 */
	.b-content code {
	  display: inline-block;
	  *display: inline;
	  *zoom: 1;
	  background-color: #f1f1f1;
	  border-radius: 3px;
	  padding: 3px 5px;
	  margin: 0 3px;
	}
	.b-content pre code {
	  display: block;
	}
	
	/* ul ol 样式 */
	.b-content ul, ol {
	  margin: 10px 0 10px 20px;
	}
	/* .contentHeight {
		height: 3000px;
	} */
	/* .mask {
		position: absolute;
		
		width: 100%;
		height: 200px;
		background-color: pink;
	} */
</style>
