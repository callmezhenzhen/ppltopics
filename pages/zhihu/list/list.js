import util from '../../../utils/util';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        /**
         * 列表数据
         */
        list: [],
        pindex: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let type = options.type;

        this.dispatchType(type);
    },

    /**
     * 分发请求
     */
    dispatchType: function(type) {
        switch(type) {
            case 1: 
                this.getTopAnswers();
                break;
            default:
                this.getTopAnswers();
        }
    },

    /**
     * 请求知乎跟话题精华回答
     */
    getTopAnswers: function() {
        if (this.data.pindex === 0) {
            util.showToast('没有更多数据了~');
            return
        }

        util.showLoading('数据加载中');
        util.apiGet(
			'topAnswers',
			{
				pindex: this.data.pindex
			},
			(isOk, res) => {
                util.hideLoading();
                let backData = util.getBackData(isOk, res);
                
                if (backData) {
                    let list = backData.list || [];
                    /**
                     * 有数据
                     */
                    if (list.length > 0) {
                        list = this.formatVoteComment(list);
                        this.setData({
                            list: this.data.list.concat(list)
                        });
                        return
                    }
                }
                
                /**
                 * 处理没有数据的情况
                 */
                this.data.pindex = 0;
                util.showToast('没有更多数据了~');
			}
		);
    },

    /**
     * 处理赞和评论数量
     */
    formatVoteComment: function(list) {
        list.forEach(
            (item) => {
                let vc = item.voteup_count;
                let cc = item.comment_count;
                if (vc >= 1000) {
                    item.voteup_count = Math.floor(vc / 1000) + 'K';
                }
                if (cc >= 1000) {
                    item.comment_count = (cc / 1000).toFixed(1) + 'K';
                }
            }
        );
        return list
    },

    goDetail: function(e) {
        let link = e.currentTarget.dataset.link;

        wx.navigateTo({
            url: '../transfer/transfer?link=' + link
        });
    },

    /**
     * 监听上拉触底
     */
    onReachBottom: function() {
        this.data.pindex++;
        this.getTopAnswers();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})