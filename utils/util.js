import config from './config';


function ajax(options) {
	options = options || {};
	/**
	 * type
	 */
	options.type = (options.type || "GET").toUpperCase();

	/**
	 * dataType
	 */
	options.dataType = options.dataType || 'json';


	/**
	 * set url
	 */
	let url = config.urlPrefix + options.url;

	wx.request({
		url: url,
		data: options.data,
		method: options.type,
		dataType: 'json',
		header: {
			'content-type': 'application/json'
		},
		success: function(res) {
			options.callback && options.callback(true, res);
		},
		fail: function(res) {
			options.callback && options.callback(false, res);
		}
	});
	
}

function apiGet(url, data, callback) {
	ajax({
		url: url,
		type: 'get',
		data: data || {},
		callback: callback
	});
}

function setAjaxData(data) {
	let array = [];

	for (let key in data) {
		array.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	
	return array.join('&')
}

module.exports = {
	ajax: ajax,
	apiGet: apiGet
}
