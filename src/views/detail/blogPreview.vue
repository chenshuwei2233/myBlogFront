<template>
	<div class="blogPreview">
		<img :src="blogPreview" alt="">
	</div>
</template>

<script>
	export default {
		name: 'blogPreview',
		props:{
			blogPreview: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style scoped="scoped">
	.blogPreview {
		width: 100%;
		margin-bottom: 32px;
	}
	.blogPreview img {
		width: 100%;
	}
</style>
