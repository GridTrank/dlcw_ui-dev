<template>
	<view class="pages-seckill-detail">
		<view class="header">
			<status-bar></status-bar>
			<view class="page-header">
				<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
				<view class="title"><text class="text">邀请</text></view>
				<view class="tmp">1</view>
			</view>
		</view>
		<view class="header-holder" :style="'height:' + (holderHeight + 36)*2 + 'rpx;'"></view>
		
		<view class="wrap mar-t-10">
			<view class="seckill-header">
				<div class="seckill-header_bg"></div>
				<view class="product-image">
					<image :src="prodDetail.pic" class="product"></image>
					<view class="mask"></view>
					<view class="info">
						<u-count-down
						    :time="countDownTime(prodDetail.startTime)"
						    format="DD:HH:mm:ss"
						    autoStart
						    @change="seckillTimeChange"
							v-if="prodDetail.seckillStatus == 0"
						>
						     <view class="text">
						        <text class="text">{{ seckillTimeData.days >= 10 ? seckillTimeData.days : '0' + seckillTimeData.days }}天</text>
						        <text class="text">{{ seckillTimeData.hours >= 10 ? seckillTimeData.hours : '0' + seckillTimeData.hours}}时</text>
						        <text class="text">{{ seckillTimeData.minutes >= 10 ? seckillTimeData.minutes : '0' + seckillTimeData.minutes  }}分</text>
						        <text class="text">{{ seckillTimeData.seconds >= 10 ? seckillTimeData.seconds : '0' + seckillTimeData.seconds  }}秒</text>
						    </view>
						</u-count-down>
						<!-- <view class="text" v-if="prodDetail.seckillStatus == 0">{{prodDetail.startTime}}后开奖</view> -->
						<view class="text" v-if="prodDetail.seckillStatus == 1">已开奖</view>
					</view>
					
					<view class="rule" @click="popupRuleOpen()">规则</view>
				</view>
				<view class="product-info">
					<view class="product-info_title"><text class="text">{{prodDetail.title}}</text></view>
					<view class="product-info_price-info">
						<view class="l">
							<text class="title">尾款:</text>
							<text class="price">￥0.00</text>
						</view>
						<view class="r">奖品数量: <text class="num">x1</text></view>
					</view>
					<view class="product-info_date-info">
						<view class="l">
							<view class="title">参与截止：</view>
							<view class="progress" v-if="prodDetail.seckillStatus == 0">
								<u-line-progress :percentage="prodDetail.progressBar" activeColor="#6556FD"
								inactiveColor="rgba(51, 60, 79, 0.3)">
									<view class="num" >
										<image class="star" :src="getStaticFilePath('@/static/seckill/blight.png')" v-if="prodDetail.progressBar != 0"></image>
									</view>
								</u-line-progress>
								<text class="nnum">{{prodDetail.progressBar}}%</text>
							</view>
							<view class="progress-end" v-if="prodDetail.seckillStatus == 1"></view>
						</view>
						<view class="r">
							<view class="text text-0" v-if="prodDetail.progressBarText == '名额充足' && prodDetail.seckillStatus == 0">{{prodDetail.progressBarText}}</view>
							<view class="text text-1" v-if="prodDetail.progressBarText == '名额少' && prodDetail.seckillStatus == 0">{{prodDetail.progressBarText}}</view>
							<view class="text text-2" v-if="prodDetail.progressBarText == '名额稀少' && prodDetail.seckillStatus == 0">{{prodDetail.progressBarText}}</view>
							<view class="text text-3" v-if="prodDetail.progressBarText == '名额极少' && prodDetail.seckillStatus == 0">{{prodDetail.progressBarText}}</view>
							<view class="text text-4" v-if="prodDetail.progressBarText == '即将截止' && prodDetail.seckillStatus == 0">{{prodDetail.progressBarText}}</view>
							<view class="text text-5" v-if="prodDetail.seckillStatus == 1">已结束</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 未参与时刻或已结束时刻 -->
			<template v-if="prodDetail.isParticipate == 0 || prodDetail.seckillStatus == 1">
				<view class="joingroup">
					<image :src="getStaticFilePath('@/static/logo.png')" mode="" class="logo"></image>
					<view class="text">加入粉丝群，领取更多福利~</view>
					<view class="add" @click="showWechatGroupQRCode()">添加</view>
				</view>
			</template>
						
			<!-- 未参与时刻且未结束时刻 -->
			<template v-if="prodDetail.isParticipate == 0 && prodDetail.seckillStatus == 0">
				<view class="explain">
					<view class="title">活动说明</view>
					<view class="elist">1.关注公众号:<text class="text">火潮星球</text></view>
					<view class="elist">2.关注小红书:<text class="text">火潮星球</text></view>
					<view class="elist">3.戳 “添加”按钮,进官方粉丝群</view>
					<view class="elist">4.分享公众号文章到朋友圈(限少量屏蔽)或>百人“非官方潮玩娃友群”</view>
				</view>
			</template>
			
			<!-- 已结束时刻 -->
			<template v-if="prodDetail.seckillStatus == 1">
				<view class="listbtn">
					<u-subsection :list="btnList" :current="current" bgColor="#efeefd" fontSize="14" activeColor="#6556FD"
						customStyle="width:345px;height:49px" @change="listChange"></u-subsection>
				</view>
				
				<u-transition :show="current == 0">
					<view class="winlist">
						<view class="title">{{prodDetail.title}}</view>
						<view class="nolist" v-if="winList.length === 0">暂无中奖名单哦~</view>
						<view class="listitem" v-for="(item,index) in winList" :key="index">
							<view class="info">
								<image :src="item.headImg" mode="" class="img"></image>
								<view class="name">{{fuzzyPhone(item.nickName)}}</view>
							</view>
							<view class="number">签号:<text class="num">{{item.lotteryCode}}</text></view>
						</view>
					</view>
				</u-transition>
				
				<u-transition :show="current == 1">
					<view class="delist">
						<image :src="prodDetail.pic" mode="" class="img"></image>
					</view>
				</u-transition>
			</template>
			
			<!-- 已参与但未结束时刻 -->
			<template v-if="prodDetail.isParticipate == 1 && prodDetail.seckillStatus == 0">
				<view class="sign">
					<view class="sign-header"><text class="text">邀请好友可得签号</text></view>
					<view class="sign-box">
						<text class="me">
							<text class="text">我的签号</text>
							<text class="num">{{ codeList.length || 0 }}</text>
							<text class="text">个</text>
						</text>
						<view class="ranking" @click="goRanking"><text class="text">签号详情</text></view>
					</view>
				</view>
			</template>
		</view>
		
		<!-- 已参与但未结束时刻 -->
		<template v-if="prodDetail.isParticipate == 1 && prodDetail.seckillStatus == 0">
			<view class="invite">
				<view class="invite_bg"></view>
				<view class="invite_section">
					<view class="invite_section_header">
						<text class="text">邀请新用户增加</text>
						<text class="num">1</text>
						<text class="text">倍</text>
					</view>
					<view class="invite_section_list">
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[0].headImg || ''" class="avatar"></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[1].headImg || ''" class="avatar" ></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[2].headImg || ''" class="avatar" ></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[3].headImg || ''" class="avatar" ></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[4].headImg || ''" class="avatar" ></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[5].headImg || ''" class="avatar" ></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[6].headImg || ''" class="avatar" ></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[7].headImg || ''" class="avatar" ></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[8].headImg || ''" class="avatar" ></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[9].headImg || ''" class="avatar" ></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[10].headImg || ''" class="avatar" ></image>
						</view>
						<view class="item">
							<view class="num"><text class="text">+1倍</text></view>
							<image :src="InviteUserList[11].headImg || ''" class="avatar" ></image>
						</view>
					</view>
					<view class="invite_section_box">
						<view class="l">
							<image :src="getStaticFilePath('@/static/seckill/group.png')" class="icon"></image>
							<text class="text">加入粉丝群，领取更多福利~</text>
						</view>
						<view class="r">
							<view class="button"><text class="text" @click="showWechatGroupQRCode()">添加</text></view>
						</view>
					</view>
			
					<view class="invite_section_intro">
						<view class="con">
							<view class="title">抽选要求</view>
							<view class="title-des">
								未在
								<text class="red">开奖前</text>
								完成中奖视为无效
							</view>
							<text class="text-des">1. 关注公众号：火潮星球</text>
							<text class="text-des">2. 关注小红书：火潮星球</text>
							<text class="text-des">3. 戳“添加”按钮，进官方粉丝群</text>
							<text class="text-des">4. 分享公众号文章到朋友圈(限少量屏蔽)或>百人“非 官方潮玩娃友群”</text>
							<view class="des-list">
								<view class="item">
									<image :src="getStaticFilePath('@/static/seckill/star.png')" class="icon"></image>
									<view class="text">中奖者限倒计时内上传截图审核，逾期失效！</view>
								</view>
								<view class="item">
									<image :src="getStaticFilePath('@/static/seckill/star.png')" class="icon"></image>
									<view class="text">分享保留至验证通过（非上传结束）</view>
								</view>
								<view class="item">
									<image :src="getStaticFilePath('@/static/seckill/star.png')" class="icon"></image>
									<view class="text">奖品不包邮，盒袋卡有无收货为准</view>
								</view>
								<view class="item">
									<image :src="getStaticFilePath('@/static/seckill/star.png')" class="icon"></image>
									<view class="text">
										<text class="text_strong">关注企业微信会邀请你进入玩家群，助你更快获得签号</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="delist">
						<image :src="prodDetail.pic" mode="" class="img"></image>
					</view>
				</view>
			</view>
		</template>
		
		<view class="footer-holder"></view>
		
		<!-- 未参与时刻 -->
		<template v-if="prodDetail.isParticipate == 0 && prodDetail.seckillStatus == 0">
			<view class="footer">
				<view class="refresh" @click=""><image :src="getStaticFilePath('@/static/invite_rebate/invite.png')" class="icon"></image></view>
				<view class="go-invite" @click="joinDraw()"><text class="text">立即参与抽选</text></view>
			</view>
		</template>
		
		<!-- 已参与未结束 -->
		<template v-if="prodDetail.isParticipate == 1 && prodDetail.seckillStatus == 0">
			<view class="footer">
				<view class="dlbbuy" @click="opendlbBuyShow()">HCB兑换签号</view>
				<button class="invite" open-type="share" :data-obj="{prodDetail,userInfo}">去邀请</button>
			</view>
		</template>
		
		<!-- 已结束 -->
		<template v-if="prodDetail.seckillStatus == 1">
			<view class="footer">
				<view class="refresh" @click=""><image :src="getStaticFilePath('@/static/invite_rebate/invite.png')" class="icon"></image></view>
				<view class="go-invite" @click="goPage('ACTIVE_ZEROBUY_PAGE')"><text class="text">参与更多抽选</text></view>
			</view>
		</template>
		
		<!-- 参与成功弹窗 -->
		<u-modal :show="joinSuccessShow" title="参与成功" content='订阅消息,可在开奖后第一时间向您发送消息'
			confirmText="同意" cancelText="拒绝" :showCancelButton='true' @confirm="getSubscribeMessage()" @cancel="openNumShow()"></u-modal>
		
		<!-- 报名弹窗 -->
		<u-popup :show="numShow" mode="center" @close="closeNumShow()" round="20">
			<view class="numshow">
				<view class="title">报名参与成功</view>
				<view class="title">{{ inviteProgress.title }}</view>
				<view class="progress" v-if="prodDetail.seckillStatus == 0">
					<u-line-progress :percentage="98" activeColor="#6556FD"
					inactiveColor="rgba(51, 60, 79, 0.3)">
						<view class="num">
							<image class="star" :src="getStaticFilePath('@/static/seckill/blight.png')"></image>
						</view>
					</u-line-progress>
					<view class="text">
						<text>{{ inviteProgress.winningRate }}</text>
						<text>{{ inviteProgress.lowerLevelWinningRate }}</text>
					</view>
					<button class="invite" open-type="share">邀请好友助力</button>
					<view class="tips">{{ inviteProgress.lowerLevelNumber }}</view>
				</view>
			</view>
		</u-popup>
		
		<!-- 购买签号弹窗 -->
		<u-popup :show="dlbBuyShow" mode="bottom" @close="closedlbBuyShow()">
			<view class="dlbbuyshow">
				<view class="line"></view>
				<view class="title">100HCB=1签号</view>
				<view class="list">
					<text class="list-title">HCB余额</text>
					<text class="num">{{ userInfo.useDlb || 0 }}</text>
				</view>
				<view class="list">
					<text class="list-title">兑换数量</text>	
					<u-number-box v-model="signNum" @change="valChange" :min="1" :disabledInput="true"></u-number-box>
				</view>
				<view class="confirm" @tap="$u.throttle(dlbBuy,500)" v-if="userInfo.useDlb > 100">确定兑换</view>
				<view class="nobuy" v-if="userInfo.useDlb < 100">HCB不足兑换</view>
			</view>
		</u-popup>
		
		<!-- 分享弹窗及其配套 -->
		<u-popup :show="shareShow" mode="center" @close="closeShareShow()" bgColor="transparent" :closeable="true" :overlayOpacity="1">
			<view>
				<image :src="wechatGroupImgUrl" mode="" class="wechatGroup" :show-menu-by-longpress="true"></image>
			</view>
		</u-popup>
		<u-popup :show="imgShow" mode="bottom" @close="closeImgShow()">
			
		</u-popup>
		
		<!-- 助力成功弹窗 -->
		<u-popup :show="assistSuccessShow" mode="center" @close="closeAssistSuccessShow()" :round="20" >
			<view class="assistSuccessShow">
				<image :src="getStaticFilePath('@/static/seckill/assist-success.png')" mode="" class="img"></image>
				<view class="title">助力成功</view>
				<view class="text">恭喜报名成功!</view>
				<view class="text">邀请好友助力提高中签率</view>
				<button class="button" open-type="share">去邀请</button>
			</view>
		</u-popup>
		<!-- 助力活动却结束弹窗 -->
		<u-popup :show="assistFailedShow" mode="center" @close="closeAssistFailedShow()" :round="20" >
			<view class="assistFailedShow">
				<image :src="getStaticFilePath('@/static/seckill/assist-failed.png')" mode="" class="img"></image>
				<view class="title">活动已结束</view>
				<view class="text">去参加其他活动吧</view>
				<button class="button" @click="goPage('ACTIVE_ZEROBUY_PAGE')">参与更多活动</button>
			</view>
		</u-popup>
		<!-- 重复助力弹窗 -->
		<u-popup :show="assistAgainShow" mode="center" @close="closeAssistAgainShow()" :round="20" >
			<view class="assistAgainShow">
				<image :src="getStaticFilePath('@/static/seckill/assist-again.png')" mode="" class="img"></image>
				<view class="title">你已经助力过了</view>
				<view class="text">恭喜报名成功!</view>
				<view class="text">邀请好友助力提高中签率</view>
				<button class="button" open-type="share">去邀请</button>
			</view>
		</u-popup>
		
		<!-- 正在开奖弹窗 -->
		<u-popup :show="drawingShow" mode="center" :round="20" :overlayOpacity="1">
			<view class="drawingShow">
				<image :src="getStaticFilePath('@/static/seckill/assist-success.png')" mode="" class="img"></image>
				<view class="title">正在努力地揭晓幸运儿</view>
				<view class="text">正在开奖，请耐心等待...</view>
				<view class="text">（点击按钮返回活动列表等待开奖完成哦）</view>
				<button class="button" @click="goBack()">返回活动列表</button>
			</view>
		</u-popup>
		
		<!-- 规则弹窗 -->
		<u-popup :show="popupRuleShow" mode="bottom" :round="10" :closeable="true" @close="popupRuleClose">
			<view class="popup popup-rule-warp">
				<view class="popup-header"><text class="title">规则</text></view>
				<view class="con">
					<view class="title">一、活动介绍</view>
					<view class="text">抽选方式分为“O元抽选”。抽选所以用户在每个活动中均可免费获得一个签号，在完成指定任务后，可以获得对应奖励的签号参与抽奖。请及时回到任务页领取签号，逾期未领的签号不算入获得签号内。奖品类型丰富，且不定期更新，包含平台在售的各种热门商品、优惠券等。参与的奖品抽奖，将于指定时间进行开奖。如您已获得购买资格，请在获得购买资格指定时间内成功付款，逾期将失去购买资格。请及时回到“抽选专区"活动页查看，避免错过领奖。</view>
					<view class="text">二、活动时间</view>
					<view class="text">本活动以自然日为周期，平台将于指定时间进行开奖，并会通过App/小程序站内推送、微信公众号提示的方式对用户推送中奖结果的信息。</view>
					<view class="text">三、参与方式</view>
					<view class="text">用户每日可通过选择活动区奖品，完成奖品对应的指定任务要求，以获取奖品的抽选签号。抽选签号获取</view>
					<view class="text">一般分为︰免费参与、每日签到、邀人助力、每日开箱、火潮钻兑换等。其中邀人助力类，每个用户每日邀请好友助力的次数无上限，被邀请用户为新用户可额外多获得一个抽选签号〈(最终以页面展示的助力结果为准)。</view>
					<view class="text">四、领奖说明</view>
					<view class="text">1.抽选活动奖品丰富，分为平台在售商品、优惠券等，且不定期会更新。</view>
					<view class="text">2.若用户中奖奖品为“0元抽选”奖品，则中奖用户可0元购买所中奖品;</view>
					<view class="text">3.累计签号数量7个及以上的可获得5元无门槛优惠券，优惠券在系统抽选中签用户后的24小时内联系客服领取</view>
					<view class="text">五、概率说明</view>
					<view class="text">因每日参与人数有未知，中奖概率=奖品数/参与人数。</view>
					<view class="text">六、其他说明</view>
					<view class="text">1.活动期间，用户存在下列情形的，包括但不限于同一手机号、同一设备号、同一身份信息、同一支付信息等，均视为同一用户，同一用户的认定以火潮星球平台认定结果为准，针对同一用户使用不同账户多次参与活动的，平台有权仅保留其中一个账户所获得的奖品。</view>
					<view class="text">2.用户参与活动所获得的优惠券等非实物类奖品仅限用户本人在平台交易时使用、不可提现。</view>
					<view class="text">3.活动期间，如发现用户存在违规行为(包括但不限于作弊、套现、刷单/量、虚假交易、洗钱、网络攻击，或损害其他用户、火潮星球平台及任何第三方合法权益的行为等)，火潮星球平台将有权撤销用户参与活动的资格、取消活动优惠并关闭使用优惠权益的相关订单、暂停且限制使用火潮星球平台服务(包括且不限于火潮星球平台上其他形式的营销活动等)。</view>
					<view class="text">4.如出现不可抗力或情势变更等情况(包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障导致活动中奖名单出错)导致活动暂停或取消的，则用户同意火潮星球App不对此承担任何责任。</view>
					<view class="text">5.偏远地区可能因物流运送能力原因无法送货，部分地区可能会出现无货，购买前请务必确认。</view>
					<view class="text">6.划线价:指配置抽选商品活动时，该商品的市场价(在平台的实际售卖价格)，</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
