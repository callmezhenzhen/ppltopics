import util from '../../utils/util';

Page({
	data: {

	},

	onLoad(options) {

	},

	searchByKeyWords() {
		util.apiGet(
			'search',
			{
				name: 'ddz',
				age: 18
			},
			(isOk, res) => {
				
			}
		);
	}
})
