import { request } from 'network/request.js'

export function getSortData(page) {
	return request({
		url: '/sorts/list',
		params: {
			page
		}
	}) 
}