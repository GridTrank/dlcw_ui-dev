const http = uni.$u.http

//https://www.uviewui.com/js/http.html

/**
 * 验证码
 * @param {Object} params
 */
export function verificationCodeService(params) {
	return http.post('/client/verificationCode', params)
}

/**
 * 登录
 * @param {Object} params
 * 
 */
export function loginService(params) {
	return http.post('/client/login', params, {
		custom: {
			catch: true
		}
	})
}

/**
 * 退出
 */
export function logOutService() {
	return http.get('/client/logOut', {
		custom: {
			auth: true,
			catch: true
		}
	})
}

/**
 * 轮播图
 */
export function bannerService() {
	return http.post('/bannerSetting/all', {}, {
		custom: {
			auth: true
		}
	})
}

/**
 * 首页欧气福袋列表
 */
export function lotteryService() {
	return http.post('/lotteryGroup/ouqifubag', {}, {})
}

/**
 * 首页一番赏列表
 */
export function yfsService() {
	return http.post('/lotteryGroup/reward', {}, {})
}

/**
 * 社群福利图片
 */
export function clubService() {
	return http.post('/benefitSetting', {}, {

	})
}

/**
 * 获取个人用户信息
 */
export function userinfoService() {
	return http.get('/client/get', {
		custom: {
			auth: true
		}
	})
}

/**
 * 更新用户信息
 */
export function updateUserinfoService(params) {
	return http.post('/user/update', params, {
		custom: {
			auth: true
		}
	})
}

/**
 * 分页查询收货地址信息
 */
export function userAddressService() {
	return http.post('/userAddress/page/query', {
		pageSize: 10000,
		pageNum: 1
	}, {
		custom: {
			auth: true
		}
	})
}

/**
 * 添加收货地址信息
 */
export function addAddressService(params) {
	return http.post('/userAddress/add', params, {
		custom: {
			auth: true
		}
	})
}

/**
 * 修改收货地址信息
 */
export function updateAddressService(params) {
	return http.post('/userAddress/update', params, {
		custom: {
			auth: true
		}
	})
}

/**
 * 设置默认收货地址
 */
export function defaultAddressService(id) {
	return http.get('/userAddress/updateIsDefault/' + id, {
		custom: {
			auth: true
		}
	})
}

/**
 * 邀请返利 添加绑定关系
 * @param {Object} params
 */
export function bindingAddService(params) {
	return http.post('/binding/add', params, {
		custom: {
			catch: true,
			auth: true,
			toast: false
		}
	})
}

/**
 * 查询邀请信息
 */
export function inviteInfoService() {
	return http.get('/inviteInfo/get', {
		custom: {
			auth: true
		}
	})
}

/**
 * 单抽
 * @param {Object} params
 */
export function lotterySingleDrawsService(params) {
	return http.post('/luckDraw/single', params, {
		custom: {
			catch: true,
			auth: true,
			toast: false
		}
	})
}

/**
 * 五连抽
 * @param {Object} params
 */
export function lotteryFiveDrawsService(params) {
	return http.post('/luckDraw/fiveDraws', params, {
		custom: {
			catch: true,
			auth: true,
			toast: false
		}
	})
}

/**
 * 十连抽
 * @param {Object} params
 */
export function lotteryTenDrawsService(params) {
	return http.post('/luckDraw/tenDraws', params, {
		custom: {
			catch: true,
			auth: true,
			toast: false
		}
	})
}

/**
 * 获取抽奖奖池数据
 * @param {Object} id
 */
export function getLotteryPrizepoolListService(id) {
	return http.get('/groupProduct/' + id, {
		custom: {

		}
	})
}

/**
 * 抽奖首页首页 获取产品信息
 * @param {Object} id
 */
export function LotteryGroupProductListService(id) {
	return http.get('/groupProductList/' + id, {
		custom: {

		}
	})
}

/**
 * 欧气福袋 列表查询
 * @param {Object} params
 */
export function oqibagListService(params) {
	return http.post('/lotteryGroup/page/query/ouqifubag', params, {
		custom: {}
	})
}

/**
 * 返利好友列表
 * @param {Object} params
 */
export function inviteListService(params) {
	return http.post('/inviteInfo/page/query', params, {
		custom: {
			auth: true,
		}
	})
}

/**
 * 图鉴 右上角 公司系列
 * @param {Object} params
 */
export function mapViewCompanyListService(params) {
	return http.post('/mapView/company/list', params, {
		custom: {}
	})
}

/**
 * 根据公司查询所有的ip产品(无需登陆)
 * @param {Object} params
 */
export function mapViewIpListService(params) {
	return http.post('/mapView/ip/list', params, {
		custom: {}
	})
}

/**
 * 根据ip查询系列列表（无需登陆）
 * @param {Object} params
 */
export function mapViewSeriesListService(params) {
	return http.post('/mapView/series/list', params, {
		custom: {}
	})
}

/**
 * 根据产品id查询产品描述(无需登陆)
 * @param {Object} params
 */
export function mapViewProductDetailService(params) {
	return http.post('/mapView/product/detail', params, {
		custom: {}
	}, )
}

/**
 * 根据系列id查询产品列表(无需登陆)
 * @param {Object} params
 */
export function mapViewProductListService(params) {
	return http.post('/mapView/product/list', params, {
		custom: {}
	})
}

/**
 * 分页查询用户消费记录
 */
export function getUserChargeService(params) {
	return http.post('/userCharge/page/query', params, {
		custom: {
			auth: true
		}
	})
}

/**
 * 分页查询盲盒记录 
 */
export function getLotteryRecordService(params) {
	return http.post('/lotteryRecord/page/query',params,{
		custom: {
			auth: true
		}
	})
}


/*
 * 分页查询寄售记录
 */
export function getUserConsignmentService(params) {
	return http.post('/userConsignment/page/query', params, {
		custom: {
			auth: true
		}
	})
}

/*
 * 分页查询用户背包信息（目前只有盲盒）
 */
export function getUserKnapsackService(params) {
	return http.post('/userKnapsack/page/query', params,{
		custom: {
			auth: true
		}
	})
}

/*
 * 分页查询发货订单
 */
export function getUserOrderService(params) {
	return http.post('/userOrder/page/query',params,{
		custom: {
			auth: true
		}
	})
}


/*
 * 删除地址
 */
export function deleteUserAddressService(id) {
	return http.delete('/userAddress/delete/' + id, {}, {
		custom: {
			auth: true
		}
	})
}

/*
 * 寄售物品
 */
export function sellUserProductService(params) {
	return http.post('/userConsignment/add', params, {
		custom: {
			auth: true
		}
	})
}

/*
 * 添加用户发货订单
 */
export function addUserOrderService(params) {
	return http.post('/userOrder/add', params, {
		custom: {
			auth: true
		}
	})
}

/**
 * 首页tabs 分类
 * @param {Object} params
 */
export function indexGroupTypeServer(params) {
	return http.post('/groupType/page/query', params, {
		custom: {}
	})
}

/**
 * 微信小程序登录
 * @param {Object} params
 */
export function wehcatMiniLoginServer(params) {
	return http.get('/wx/login', params, {
		custom: {
			catch: true,
		}
	})
}

/**
 * 获取抽奖按钮价格
 * @param {Object} id
 */
export function getLotteryDrawsPricesServer(id) {
	return http.get('/lotteryGroup/groupPrice/' + id, {
		custom: {}
	})
}

/**
 * 微信小程序创建支付订单
 * @param {Object} params
 */
export function wechatMiniCreatePaymentServer(params) {
	return http.post('/payment/jsapi/order', params, {
		custom: {
			auth: true,
			toast: false
		}
	})
}

/**
 * 微信一键绑定手机号码
 * @param {String} mobileCode 
 */
export function wechatBindMobilePhone(mobileCode){
	return http.get('/wx/mobileChange?mobileCode=' + mobileCode,{
		custom: {
			auth: true
		}
	})
}

/**
 * 微信查询订单
 * @param {String} transactionIdOrOutTradeNo
 */
export function wechatQueryTransaction(transactionIdOrOutTradeNo){
	return http.get('/payment/jsapi/queryTransaction?transactionIdOrOutTradeNo=' + transactionIdOrOutTradeNo , {
		custom:{
			auth: true
		}
	})
}

/**
 * 获取充值金额设置
 * @param {Object} params
 */
export function getChargeSettingAll(params){
	return http.post('/chargeSetting/all',params,{
		custom: {
			
		}
	})
}

/**
 * 玩家之间相互赠送
 * @param {Object} params
 */
export function addGiftService(params){
	return http.post('/giftsRecord/add',params,{
		custom: {
			auth:true
		}
	})
}

/**
 * 礼包兑换码
 * @param {String} str
 */
export function ExchangeCodeService(code){
	return http.get('/exchange/use/' + code,{
		custom:{
			auth:true
		}
	})
}

/**
 * 分页查询用户优惠卷列表
 * @param {Object} params
 */
export function userCouponService(params){
	return http.post('/userCoupon/page/query',params,{
		custom:{
			auth:true
		}
	})
}

/**
 * 查询抽奖前可使用优惠券
 * @param {Object} params
 */
export function couponLuckDrawService(params){
	return http.post('/luckDraw/couponsAvailable',params,{
		custom:{
			auth:true
		}
	})
}

/**
 * 分页查询秒杀活动列表
 * @param {Object} params
 */
export function seckillListService(params){
	return http.post('/seckill/page/query',params,{
		custom: {
			auth:true
		}
	})
}

/**
 * 第一次参与秒杀活动拿到抽签码
 * @param {Number} id 
 */
export function seckillDrawService(id){
	return http.get('/seckillDraw/add?seckillId=' + id ,{
		custom: {
			auth:true,
			catch:true,
			toast: false
		}
	})
}

/**
 * 单个查询0元秒杀信息
 * @param {Number} id 
 */
export function seckillThisDetailService(id){
	return http.get('/seckill/query?seckillId=' + id,{
		custom: {
			auth: true,
			catch:true
		}
	})
}

/**
 * 查询秒杀活动已有抽签码
 * @param {Number} id 
 */
export function seckillThisCodeArrayService(id){
	return http.get('/seckillDraw/query?seckillId=' + id,{
		custom: {
			auth: true,
			catch:true
		}
	})
}

/**
 * 秒杀活动中奖列表
 * @param {Object} params 
 */
export function seckillGetPrizeListService(params){
	return http.post('/seckillDrawPrize/page/query',params,{
		custom:{
			catch:true
		}
	})
}

/**
 * 邀请助力进度条
 * @param {Number} id 
 */
export function seckillGetInviteProgressService(id){
	return http.get('/seckillDraw/inviteProgressBar?seckillId=' + id,{
		custom:{
			auth: true,
			catch:true
		}
	})
}

/**
 * 获取邀请凭证
 * @param {Number} id
 */
export function seckillGetInviteAuthService(id){
	return http.get('/wx/getInviteGenerateLinkUrl?inviteCode=wako6e&seckillId=' + id,{
		custom:{
			auth: true,
			catch:true
		}
	})
}

/**
 * 查询秒杀活动自己邀请的用户
 * @param {Object} params 
 */
export function seckillInviteUserListService(params){
	return http.post('/seckillInvite/page/query',params,{
		custom:{
			auth: true,
			catch:true
		}
	})
}

/**
 * 哆啦币兑换抽签码
 * @param {Object} params 
 */
export function seckillDlbBuyCode(params){
	return http.post('/seckillDraw/exchangeLotteryCode',params,{
		custom:{
			auth: true,
			catch:true
		}
	})
}

/**
 * 抽签码数量排行
 * @param {Object} params 
 */
export function seckillCodeRankService(params){
	return http.post('/seckillDraw/page/query',params,{
		custom:{
			auth: true,
			catch:true
		}
	})
}

/**
 * 查询自己秒杀活动抽签码数量排名
 * @param {Number} id
 */
export function seckillMyCodeRankService(id){
	return http.get('/seckillDraw/queryRank?seckillId=' + id,{
		custom: {
			auth: true,
			catch:true
		}
	})
}

/**
 * 通过邀请获取抽签码
 * @param {Object} params
 */
export function seckillInvitedToCodeService(params){
	return http.post('/seckillDraw/inviteLotteryCode',params,{
		custom:{
			auth: true,
			catch: true,
			toast: false
		}
	})
}

/**
 * 查询企业微信粉丝群邀请二维码
 * @param {none}
 */
export function wechatGroupService(){
	return http.get('/fansSetting/query',{
		custom:{
			catch:true,
		}
	})
}

/**
 * 用户首页领取可领礼包
 * @param {Object} params
 */
export function homeNewGiftService(params){
	return http.post('/giftbag/add',params,{
		custom: {
			auth:true,
			catch:true
		}
	})
}

/**
 * 分页查询用户首页可领取优惠券表
 * @param {Object} params
 */
export function getHomeNewGiftInfoService(params){
	return http.post('/giftbag/page/query',params,{
		custom:{
			auth:true,
			catch:true
		}
	})
}

/**
 * 分页查询抽奖界面的弹幕
 * @param {Object} params
 */
export function createBulletService(params){
	return http.post('/lotteryRecord/page/bulletScreen',params,{
		custom:{
			catch:true
		}
	})
}

/**
 * 分页查询抽奖界面的弹幕
 * @param {None}
 */
export function luckDrawOnLineService(){
	return http.get('/luckDraw/onlineNumber',{
		custom:{
			catch:true
		}
	})
}

/**
 * 签到之前查询列表
 * @param {Object} params
 */
export function getDailySignInfoService(){
	return http.get('/userSign/list/all',{
		custom:{
			auth:true,
			catch:true
		}
	})
}

/**
 * 签到功能
 * @param {Object} params
 */
export function DailySignService(){
	return http.get('/userSign/add',{
		custom:{
			auth:true,
			catch:true
		}
	})
}

/**
 * 用户通知列表
 * @param {Object} params
 */
export function userNoticeListService(params){
	return http.post('/userNotice/page/query',params,{
		custom:{
			auth:true,
			catch:true
		}
	})
}