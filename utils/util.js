import config from './config';


function ajax(options) {
	options = options || {};
	/**
	 * type
	 */
	options.type = (options.type || "GET").toUpperCase();

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

function getBackData(isOk, res) {
	if (!isOk) {
		return false
	}

	if (res && res.data) {
		return res.data
	}

	return false
}

function showLoading(msg) {
	wx.showLoading({
		title: msg || '加载中',
		mask: true
	}); 
}

function hideLoading() {
	wx.hideLoading();
}

function showToast(title, duration) {
	wx.showToast({
		title: title || '',
		duration: duration || 1500,
		mask: true,
		icon: 'none'
	});
}

module.exports = {
	ajax: ajax,
	apiGet: apiGet,
	getBackData: getBackData,
	showLoading: showLoading,
	hideLoading: hideLoading,
	showToast: showToast
}
