import { request } from 'network/request.js'

export function getBlogData(title,page) {
	return request({
		url: '/blogs/list',
		params: {
			title,
			page
		}
	})
}