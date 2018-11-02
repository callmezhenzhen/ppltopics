import util from '../../../utils/util';

Page({
	data: {

	},

	onLoad(options) {

	},

	goList(e) {
		let index = e.currentTarget.dataset.index;

		wx.navigateTo({
			url: '../list/list?type=' + index
		});
	}
})
