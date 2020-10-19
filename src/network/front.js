import { request } from 'network/request.js'

export function getBlogsData(sort, page) {
	return request({
		url: '/fronts/list',
		params: {
			sort,
			page
		}
	})
}

export function getLabelBlogs(label) {
	return request({
		url: '/fronts/labelBlogs',
		params: {
			label
		}
	})
}

export function getBlogDetail(id) {
	return request({
		url: '/fronts/blogDetail',
		params: {
			id
		}
	})
}

export function addBlogComment(data) {
	return request({
		method: 'post',
		url: '/fronts/addComment',
		data
	})
}

export function getBlogComment(title) {
	return request({
		url: '/fronts//blogComment',
		params: {
			title
		}
	})
}

export function updatePraise(id, data) {
	return request({
		method: 'post',
		url: '/fronts/updatePraise',
		params: {
			id
		},
		data
	})
}

export function updateCommentNumber(data) {
	return request({
		method: 'post',
		url: '/fronts/updateCommentNumber',
		data
	})
}