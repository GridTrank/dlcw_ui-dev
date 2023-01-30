<template>
	<view class="lottery-index">
		<status-bar></status-bar>
		<view class="wrap-bg"></view>
		<!-- :show-loading="false" -->
		<!-- <cover-view class="cover-view-video" v-if="lotteryPlay && enableEffect">
			<video
				:src="videoUrl"
				ref="video"
				id="video"
				autoplay
				object-fit="cover"
				:controls="false"
				:show-fullscreen-btn="false"
				:show-play-btn="false"
				:show-center-play-btn="false"
				:enable-progress-gesture="false"
				:style="{ width: systemInfo.windowWidth + 'px', height: systemInfo.windowHeight + 'px' }"
				class="play-video"
				@ended="videoPlayEnd"
			></video>
		</cover-view> -->

		<view class="cover-view-video" v-if="lotteryPlay && enableEffect">
			<video
				:src="videoUrl"
				ref="video"
				id="video"
				autoplay
				object-fit="cover"
				:controls="false"
				:show-fullscreen-btn="false"
				:show-play-btn="false"
				:show-center-play-btn="false"
				:enable-progress-gesture="false"
				:style="{ width: systemInfo.windowWidth + 'px', height: systemInfo.windowHeight + 'px' }"
				class="play-video"
				@play="videoPlayStart"
				@ended="videoPlayEnd"
			></video>
		</view>

		<view v-show="displayResults == false">
			<!-- <mp-menu-button></mp-menu-button> -->
			<view class="wrap">
				<view class="pd-lr-15">
					<view class="header">
						<view class="left">
							<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back-white.png')" class="icon"></image></view>
							<view class="users">
								<image v-for="(v, i) in onlineList" :src="v" class="avatar" :key="i"></image>
								<view class="avatar text">{{ onlineNumber > 99 ? '99+' : onlineNumber }}</view>
							</view>
						</view>
						<view class="buttons mar-l-10">
							<view class="but" @click="popupRuleOpen">
								<image :src="getStaticFilePath('@/static/lottery/rule.png')" class="icon"></image>
								<text class="text">规则</text>
							</view>
							<view class="but" @click="goPages('MY_BAG_PAGE')">
								<image :src="getStaticFilePath('@/static/lottery/backpack.png')" class="icon"></image>
								<text class="text">背包</text>
							</view>
							<view class="but" @click="enablePlayEffect">
								<image v-if="enableEffect == true" :src="getStaticFilePath('@/static/lottery/animation.png')" class="icon"></image>
								<image v-else :src="getStaticFilePath('@/static/lottery/animation-disable.png')" class="icon"></image>
								<text :class="['text', enableEffect == true ? '' : 'disable-text']">动画</text>
							</view>
							<view class="but" @click="switchBullet()">
								<image v-if="bulletShow == true" :src="getStaticFilePath('@/static/lottery/dan.png')" class="icon"></image>
								<image v-else :src="getStaticFilePath('@/static/lottery/dan-disable.png')" class="icon"></image>
								<text :class="['text', bulletShow == true ? '' : 'disable-text']">弹幕</text>
							</view>
						</view>
					</view>
				</view>

				<view class="stage">
					<swiper class="swiper" circular autoplay>
						<swiper-item v-for="(v, i) in mainProductList" :key="i">
							<view class="swiper-item product">
								<u--image :src="v.productPic" class="image" width="300rpx" height="320rpx" :showLoading="true" bgColor="transparent" mode="aspectFit">
									<template v-slot:loading>
										<u-loading-icon mode="circle" inactive-color="#6556FD"></u-loading-icon>
									</template>
								</u--image>
							</view>
						</swiper-item>
					</swiper>
					
					<!-- 弹幕 -->
					<view class="bullet" v-show="bulletShow && bulletOnload">
						<view :class="'bullet-item ' + (bulletOnload == true ? `bullet-scroll${index}` : '')" v-for="(item,index) in bulletList" :key="index" 
						:style="'top:' + positionList[index].y + 'rpx'">
							<image :src="getStaticFilePath('@/static/lottery/headimg-border.png')" mode="" class="himg-border"></image>
							<image :src="item.headImg" mode="" class="himg"></image>
							<view class="bullet-text">
								<text class="text">恭喜{{ item.username }}抽中了</text>
								<text :class="'text-' + item.rareLevel" >{{ item.productName }}</text>
							</view>
						 </view>
					</view>
					<!-- <view class="product">
						<image :src="mainProduct" class="image"></image>
					</view> -->

					<view class="card-warp">
						<!-- <view class="card-item" @click="popupPrizePoolOpenAndSwitch(0)">
							<image :src="getStaticFilePath('@/static/lottery/card-sss.png')" class="image" mode="scaleToFill"></image>
						</view>
						<view class="card-item" @click="popupPrizePoolOpenAndSwitch(1)">
							<image :src="getStaticFilePath('@/static/lottery/card-s.png')" class="image" mode="scaleToFill"></image>
						</view>
						<view class="card-item" @click="popupPrizePoolOpenAndSwitch(2)">
							<image :src="getStaticFilePath('@/static/lottery/card-a.png')" class="image" mode="scaleToFill"></image>
						</view>
						<view class="card-item" @click="popupPrizePoolOpenAndSwitch(3)">
							<image :src="getStaticFilePath('@/static/lottery/card-b.png')" class="image" mode="scaleToFill"></image>
						</view> -->

						<swiper class="card-swiper" circular autoplay :display-multiple-items="4" easing-function="linear" interval="1500" duration="15000" acceleration>
							<swiper-item v-for="(v, i) in mainProductList" :key="i" @click="popupPrizePoolOpenAndSwitch(0)">
								<view class="swiper-item card-product" :class="[`card_grade_${v.productGrade}`]">
									<u--image :src="v.productPic" width="130rpx" height="190rpx" :showLoading="true" bgColor="transparent" mode="aspectFit" lazyLoad>
										<template v-slot:loading>
											<u-loading-icon mode="circle" inactive-color="#6556FD"></u-loading-icon>
										</template>
									</u--image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>

				<!-- <view class="current-userBalance">
					<text class="text">余额:</text>
					<text class="text userBalance">{{ numberToFixed(this.userBalance) }}</text>
				</view> -->
				
				<view class="current-userBalance">
					<text class="text">商品存在概率，未成年人禁止参与，本合同与苹果公司无关</text>
				</view>

				<u-popup :show="popupRuleShow" mode="bottom" :round="10" :closeable="true" @close="popupRuleClose">
					<view class="popup popup-rule-warp">
						<view class="popup-header"><text class="title">规则</text></view>
						<view class="con">
							<text class="title">
								购买礼包时，可选择【来一发】【五连发】【十连发】，付款后出现抽盒按钮，点击即可抽盒，所抽中的盲盒款式将自动放入个人【背包】内。
							</text>
							<text class="title">风险提示：盲盒类商品存在概率性，付费请谨慎</text>
							<text class="title">寄售规则：</text>
							<text class="text">1、如不满意所购买的商品，可进行寄售。</text>
							<text class="text">
								2、寄售后将返还 60%的购买金额（以实际支付金额为准），金额返还至账号余额，余额支持退款提现（金额将于审核后 1-3个工作日原路退还）。
							</text>
							<text class="text">3、注意：寄售需谨慎，寄售后物品将从“我的背包”中删除，并且无法恢复。</text>
							<text class="title">发货规则：</text>
							<text class="text">1、“主界面”- “我的”- “我的背包” 选择需要发货的物品，一次选满3件物品自动包邮(仅限中国大陆地区）。</text>
							<text class="text">2、发货订单将会在 10天内为您发出（特殊订单除外），请您耐心等候。</text>
							<text class="text">3、受疫情影响，疫情管控区域将无法保证收件与派送的时效性，待解除限制后我们将第一时间为您发出。</text>
							<text class="text">4、如发货后受疫情影响导致物流无法及时配送，请联系客服，我们将为您跟进物流情况。</text>
							<text class="text">
								5、消费购买须知：
								盲盒为特殊商品，为了准确发货，盲盒类商品会通过拆盒不拆袋的方式来确认款式后发货（部分款式因特殊性将进行拆袋确认）。此为线上抽盒机玩法的必须流程，请知悉。
							</text>
							<text class="text">6、共克时艰，同心抗疫。</text>
						</view>
					</view>
				</u-popup>
				<!-- 奖池物品弹窗 -->
				<u-popup :show="popupPrizePoolShow" mode="bottom" :round="10" :closeable="true" @close="popupPrizePoolClose">
					<view class="popup popup-prizepool-warp">
						<view class="popup-header"><text class="title">福袋物品</text></view>
						<!-- <view class="popup-tips">(图片仅供参考，请以实物为准)</view> -->
						<view class="con">
							<view class="showitem" v-for="(item, index) in prizepoolTabList" :key="index">
								<view :class="['title',`title-${index}`]">
									<view class="left">{{item.key}}</view>
									<view class="right">概率:{{ item.probability }}%</view>
								</view>
								<view class="content">
									<scroll-view scroll-x="true" :enable-flex="true" class="s-v" lazy-load>
										<view class="listwarp">
											<view class="item" v-for="(v, i) in item.groupProductVOS" :key="i" @click="popupPrizePoolDetailOpen(v)">
												<view class="img" :class="[`card_grade_${v.rareLevel}`]">
													<u--image :src="v.pic" class="image" width="100rpx" height="100rpx" :showLoading="true" bgColor="transparent" mode="aspectFit">
														<template v-slot:loading>
															<u-loading-icon></u-loading-icon>
														</template>
													</u--image>
												</view>
												<view class="name">{{ v.productName }}</view>
											</view>
										</view>
									</scroll-view>
								</view>
							</view>
						</view>
					</view>
				</u-popup>
				<!-- 奖池物品详情弹窗 -->
				<u-popup :show="popupPrizePoolDetailShow" mode="bottom" :round="10" :closeable="true" @close="popupPrizePoolDetailClose">
					<view class="popup popup-prizepool-detail">
						<view class="popup-header"><text class="title">福袋物品</text></view>
						<view class="con">
							<view class="item">
								<view class="left" :class="[`card_grade_${prizePoolDetail.rareLevel}`]">
									<u--image :src="prizePoolDetail.pic" class="image" width="104rpx" height="104rpx" :showLoading="true" bgColor="transparent" mode="aspectFit">
										<template v-slot:loading>
											<u-loading-icon></u-loading-icon>
										</template>
									</u--image>
								</view>
								<view class="right">
									<text class="title">{{ prizePoolDetail.productName }}</text>
										<view class="price">
											<text class="text">参考价:</text>
										<text class="amount">{{ numberToFixed(prizePoolDetail.productPrice) }}</text>
									</view>
								</view>
							</view>
							<image :src="prizePoolDetail.pic" mode="" class="img"></image>
						</view>
					</view>
				</u-popup>
			</view>
		</view>

		<u-popup :show="popupPayShow" mode="bottom" :round="10" @open="popupPayOpen" :closeable="true" @close="openCancelPayShow()">
			<u-toast ref="Pay_uToast"></u-toast>
			<view class="popup popup-pay-warp">
				<view class="bg"></view>
				<view class="popup-header"><text class="title">收银台</text></view>
				<view class="con">
					<view class="m1">
						<view class="price">
							<text class="text">￥{{ numberToFixed(payAmount) }}</text>
						</view>
						<view class="info">
							<!-- <image :src="getStaticFilePath('@/static/common/icon-insufficient-balance.png')" class="icon"></image> -->
							<text class="text">支付后在背包进行手动发货</text>
						</view>
					</view>
					<view class="line"></view>
					<view class="m2 m">
						<view class="col">
							<text class="title">订单原价</text>
							<text class="right">￥{{ numberToFixed(lotteryDrawsButPrices.originalPrice)}}</text>
						</view>
					</view>
					<view class="line"></view>
					<view class="m2 m" >
						<view class="col">
							<text class="title">优惠券</text>
							<view class="right" @click.stop="openCouponShow()" v-if="couponList.length > 0">
								<text class="text" v-if="coupon == 'none'">当前未使用优惠券</text>
								<text class="text" v-if="coupon !== 'none'">{{coupon.typeName}}</text>
								<image :src="getStaticFilePath('@/static/common/arrow-right.png')" class="arrow-right"></image>
							</view>
							<view class="right" v-if="couponList.length == 0">
								<text class="text">当前暂无优惠券可使用</text>
							</view>
						</view>
						<view class="couponlist" v-if="couponShow">
							<view class="item noitem" @click.stop="noChoose()">不使用优惠券</view>
							<view class="item" @click.stop="chooseCoupon(item)" v-for="(item,index) in couponList" :key="item.id">
								<text v-if="item.couponConditionType === 0">(无门槛)</text>
								<text v-if="item.couponConditionType === 1">(单发)</text>
								<text v-if="item.couponConditionType === 2">(总金额)</text>
								<text>满{{item.couponConditionAmount}}减{{item.couponAmount}}元</text>
							</view>
						</view>
					</view>
					<view class="line"></view>
					<view class="m3 m">
						<view class="col">
							<view class="title f-row j-c-c a-i-c">
								<text>支付方式:</text>
							</view>
						</view>
					</view>
					<view class="mm3">
						<u-radio-group v-model="payChoose" iconPlacement="right" placement="column" @change="payMethod">
							<label>
								<view class="balance-pay">
									<image :src="getStaticFilePath('@/static/lottery/balpay.png')" mode="" class="icon"></image>
									<view class="text">
										<text>余额</text>
										<text class="num" v-if="balanceVisiable === false">********</text>
										<text class="num" v-if="balanceVisiable === true">￥{{ numberToFixed(userBalance) }}</text>
										<image :src="getStaticFilePath('@/static/lottery/v-open.png')" mode="" class="icon" v-if="balanceVisiable === true" @click="()=>{this.balanceVisiable = false}"></image>
										<image :src="getStaticFilePath('@/static/lottery/v-close.png')" mode="" class="icon" v-if="balanceVisiable === false" @click="()=>{this.balanceVisiable = true}"></image>									</view>
									<view class="btn"><u-radio activeColor="#6556FD" name="balpay"></u-radio></view>
								</view>
							</label>
							<label>
								<view class="wechat-pay">
									<image :src="getStaticFilePath('@/static/lottery/wechatpay.png')" mode="" class="icon"></image>
									<view class="">微信</view>
									<view class="btn"><u-radio activeColor="#6556FD" name="wechatpay"></u-radio></view>
								</view>
							</label>
						</u-radio-group>
					</view>
					<view class="line"></view>
					<view class="m4">
						<text class="title">购买须知</text>
						<!-- <text class="text">
							奖品抽奖存在概率，付费请谨慎，未满18周岁未成年人禁止参与
						</text> -->

						<view class="agreement-row">
							<checkbox-group @change="checkboxChange">
								<label>
									<checkbox :value="agreement" color="#6556FD" class="round" checked="true" />
									<text>我已满18周岁,已阅读并同意</text>
									<text class="src" @click="goPages('AGREEMENT_PURCHASE_NOTES_PAGE')">《福袋购买须知》</text>
								</label>
							</checkbox-group>
						</view>
					</view>
					<view class="footer">
						<!-- #ifndef MP-WEIXIN -->
						<view class="alipay" @click="alipay">
							<image :src="getStaticFilePath('@/static/common/ali-pay.png')" class="icon"></image>
							<text class="name">支付宝支付</text>
						</view>
						<view class="wechatpay" @click="wechatpay">
							<image :src="getStaticFilePath('@/static/common/wechat-pay.png')" class="icon"></image>
							<text class="name">微信支付</text>
						</view>
						<!-- #endif -->

						<!--  #ifdef  MP-WEIXIN	 -->
						<view class="wechatpay" @click="pay()">
							<text class="name">立即支付</text>
						</view>
						<!--  #endif -->
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 确认支付界面 -->
		<u-popup :show="popupConfirmPayShow" mode="bottom" :round="10" @open="popupConfirmPayOpen" :closeable="true" @close="openCancelPayShow()">
			<u-toast ref="Pay_uToast"></u-toast>
			<view class="popup popup-pay-warp">
				<view class="bg"></view>
				<view class="popup-header"><text class="title">收银台</text></view>
				<view class="con">
					<view class="m1">
						<view class="price">
							<text class="text">￥{{ numberToFixed(payAmount) }}</text>
						</view>
						<view class="info">
							<text class="text">支付后在背包进行手动发货</text>
						</view>
					</view>
					<view class="line"></view>
					<view class="m2 m">
						<view class="col">
							<text class="title">订单原价</text>
							<text class="right">￥{{ numberToFixed(lotteryDrawsButPrices.originalPrice) }}</text>
						</view>
					</view>
					<view class="line"></view>
					<view class="m2 m">
						<view class="col">
							<text class="title">优惠券</text>
							<view class="right">
								<text class="text">暂无可使用优惠券</text>
								<image :src="getStaticFilePath('@/static/common/arrow-right.png')" class="arrow-right"></image>
							</view>
						</view>
					</view>
					<view class="line"></view>
					<view class="m3 m">
						<view class="col">
							<view class="title f-row j-c-c a-i-c">
								<text>支付方式:</text>
							</view>
						</view>
						<view class="mm3">
							<u-radio-group v-model="payChoose" iconPlacement="right" placement="column">
								<label>
									<view class="balance-pay">
										<image :src="getStaticFilePath('@/static/lottery/balpay.png')" mode="" class="icon"></image>
										<view class="text">
											<text>余额</text>
											<text class="num" v-if="balanceVisiable === false">********</text>
											<text class="num" v-if="balanceVisiable === true">￥{{ numberToFixed(userBalance) }}</text>
											<image :src="getStaticFilePath('@/static/lottery/v-open.png')" mode="" class="icon" v-if="balanceVisiable === true" @click="()=>{this.balanceVisiable = false}"></image>
											<image :src="getStaticFilePath('@/static/lottery/v-close.png')" mode="" class="icon" v-if="balanceVisiable === false" @click="()=>{this.balanceVisiable = true}"></image>									</view>
										<view class="btn"><u-radio activeColor="#6556FD" name="balpay"></u-radio></view>
									</view>
								</label>
								<label>
									<view class="wechat-pay">
										<image :src="getStaticFilePath('@/static/lottery/wechatpay.png')" mode="" class="icon"></image>
										<view class="">微信</view>
										<view class="btn"><u-radio activeColor="#6556FD" name="wechatpay"></u-radio></view>
									</view>
								</label>
							</u-radio-group>
						</view>
					</view>
					<view class="line"></view>
					<view class="m4">
						<text class="title">购买须知</text>
						<view class="agreement-row">
							<checkbox-group @change="checkboxChange">
								<label>
									<checkbox :value="agreement" color="#6556FD" class="round" checked="true" />
									<text>我已满18周岁,已阅读并同意</text>
									<text class="src" @click="goPages('AGREEMENT_PURCHASE_NOTES_PAGE')">《福袋买家须知》</text>
								</label>
							</checkbox-group>
						</view>
					</view>
					<view class="footer">
						<view class="wechatpay" @click="balpay(count)">
							<text class="name">确认支付</text>
						</view>
					</view>
				</view>
			</view>
		</u-popup>

		<view v-show="displayResults">
			<view class="display-results-wrap" :class="{ 'all-flipping': allFlippingState }">
				<u-toast ref="confirmSell_uToast"></u-toast>
				<view class="sell-modal">
					<u-modal :show="sellModalSuccessShow" :closeOnClickOverlay="true" :showConfirmButton="false" @close="sellModaClose" width="240rpx">
						<image :src="getStaticFilePath('@/static/lottery/sell-success.png')" class="sell-success"></image>
					</u-modal>
				</view>

				<!-- <view class="wrap-bg"></view> -->
				<view class="tmp-header" v-if="!showFlippingBut">1</view>
				<view class="top-header" v-show="allFlippingState">
					<view class="back" @click="goMain"><image :src="getStaticFilePath('@/static/common/back-white.png')" class="icon"></image></view>
					<text class="title">恭喜你获得</text>
					<view class="text-tips">
						<view class="left">
							<text class="text">抽取到的物品请在背包中查看</text>
							<text class="price">价值：￥{{ totalPrice }}</text>
						</view>
						<!-- <view class="right" v-if="oneClickSellState == false" @click="oneClickSell"><text class="button">一键寄售</text></view> -->
						<!-- <view class="right right-confirm-sell" v-if="oneClickSellState" @click="confirmSell"><text class="button">确认寄售</text></view> -->
					</view>
				</view>
				<view
					:class="['card-wrap', `card-wrap-count-${lotteryPlayCardCount}`]"
					:style="{
						height: lotteryPlayCardWrapHeight + 'px'
					}"
					v-if="lotteryResultsList.length !== 5"
				>
					<view
						:class="[
							'card-item',
							`card-item-on${i}`,
						
							showFlippingBut ? 'deal-animation' : '',
							v.select ? 'select' : ''
						]"
						:id="`card-item-on${i}`"
						v-for="(v, i) in lotteryResultsList"
						:key="i"
						@click="cardClick(i)"
					>
						<!-- 如果是单抽 -->
						<!-- <image :src="getStaticFilePath('@/static/lottery/card.png')" :class="['card', 'front', `front-on${i}`]" style="transform: scale(3) ;" v-if="lotteryResultsList.length === 1"></image> -->
						<view :class="['card', 'back', `back-on${i}`, `card_grade_${v.productGrade}`]" style="transform: scale(3) ;" v-if="lotteryResultsList.length === 1">
							<image :src="v.card" class="card_image" mode="aspectFit"></image>
							<text class="productName">{{ v.productName }}</text>
							<view :class="['state', `price-${v.productGrade}`]" v-if="oneClickSellState && v.confirmSellState == false" @click.stop="oneSellClick(i)">
								<text class="text">寄售:{{ numberToFixed(oneSellPrice) }}</text>
							</view>
							<!-- <view class="state cancel" v-if="oneClickSellState && allFlippingState && v.sell == false && v.select"><text class="text">取消寄售</text></view> -->
							<view :class="['state',`sell-${v.productGrade}`]" v-if="oneClickSellState && confirmSellState && v.confirmSellState"><text class="text">已寄售</text></view>
						</view>
						<!-- 十连抽 -->
						<!-- <image :src="getStaticFilePath('@/static/lottery/card.png')" :class="['card', 'front', `front-on${i}`]" :id="`front-on${i}`" v-if="lotteryResultsList.length === 10"></image> -->
						<view :class="['card', 'back', `back-on${i}`, `card_grade_${v.productGrade}`]" v-if="lotteryResultsList.length === 10">
							<image :src="v.card" class="card_image" mode="aspectFit"></image>
							<text class="productName">{{ v.productName }}</text>
							<view :class="['state', `price-${v.productGrade}`]" v-if="oneClickSellState && v.confirmSellState == false" @click.stop="oneSellClick(i)">
								<text class="text">寄售:{{ numberToFixed(oneSellPrice) }}</text>
							</view>
							<!-- <view class="state cancel" v-if="oneClickSellState && allFlippingState && v.sell == false && v.select"><text class="text">取消寄售</text></view> -->
							<view :class="['state',`sell-${v.productGrade}`]" v-if="oneClickSellState && confirmSellState && v.confirmSellState"><text class="text">已寄售</text></view>
						</view>
					</view>
				</view>
				<view
					:class="['card-wrap', `card-wrap-count-${lotteryPlayCardCount}`]"
					:style="{
						height: lotteryPlayCardWrapHeight + 'px'
					}"
					v-if="lotteryResultsList.length === 5"
				>
					<view
						:class="[
							'card-item',
							`card-item-on${i}`,
						
							showFlippingBut ? 'deal-animation' : '',
							v.select ? 'select' : ''
						]"
						:id="`card-item-on${i}`"
						v-for="(v, i) in lotteryResultsList"
						:key="i"
						:style="lotteryResultsList.length === 5 ? 'margin:40rpx 80rpx;' : ''"
						@click="cardClick(i)"
					>
						<!-- 五连抽 -->
						<!-- <image :src="getStaticFilePath('@/static/lottery/card.png')" :class="['card', 'front', `front-on${i}`]" style="transform: scale(1.1);" v-if="lotteryResultsList.length === 5"></image> -->
						<view :class="['card', 'back', `back-on${i}`, `card_grade_${v.productGrade}`]" style="transform: scale(1.3);" v-if="lotteryResultsList.length === 5">
						    <image :src="v.card" class="card_image" mode="aspectFit"></image>
						    <text class="productName">{{ v.productName }}</text>
						    <view :class="['state', `price-${v.productGrade}`]" v-if="oneClickSellState && v.confirmSellState == false" @click.stop="oneSellClick(i)">
						    <text class="text">寄售:{{ numberToFixed(oneSellPrice) }}</text>
						</view>
						<!-- <view class="state cancel" v-if="oneClickSellState && allFlippingState && v.sell == false && v.select"><text class="text">取消寄售</text></view> -->
						    <view :class="['state',`sell-${v.productGrade}`]" v-if="oneClickSellState && confirmSellState && v.confirmSellState"><text class="text">已寄售</text></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="wrap-footer">
			<view class="bg"></view>
			<view class="buttons">
				<template v-if="showLotteryBut && allFlippingState == false">
					<view class="but" @click="lotteryBefore(1)">
						<view class="but_bg_outside"></view>
						<view class="but_bg_inside"></view>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
						<text class="text">{{ numberToFixed(lotteryDrawsButPrices.onePrice) }} 来一发</text>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
					</view>
					<view class="but" @click="lotteryBefore(5)">
						<view class="but_bg_outside"></view>
						<view class="but_bg_inside"></view>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
						<text class="text">{{ numberToFixed(lotteryDrawsButPrices.fivePrice) }} 五连发</text>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
					</view>
					<view class="but" @click="lotteryBefore(10)">
						<view class="but_bg_outside but_bg_outside_1"></view>
						<view class="but_bg_inside but_bg_inside_1"></view>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
						<text class="text">{{ numberToFixed(lotteryDrawsButPrices.tenPrice) }} 十连发</text>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
					</view>
				</template>

				<!-- <template v-if="showFlippingBut">
					<view class="but" @click="allFlipping">
						<view class="but_bg_outside but_bg_outside_2"></view>
						<view class="but_bg_inside but_bg_inside_2"></view>
						<image class="but-bg" src="@/static/lottery/btn-bg.png"></image>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
						<text class="text">一键全翻</text>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
					</view>
				</template> -->

				<template v-if="allFlippingState">
					<view class="but" @click="allConfirmSell">
						<!-- <view class="but_bg_outside but_bg_outside_2"></view>
						<view class="but_bg_inside but_bg_inside_2"></view> -->
						<image class="but-bg" :src="getStaticFilePath('@/static/lottery/btn-bg.png')"></image>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
						<text class="text">全部寄售:{{ numberToFixed(sellPriceTotal) }}</text>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
					</view>

					<view class="but" @tap="$u.throttle(again,500)">
						<!-- <view class="but_bg_outside but_bg_outside_2"></view>
						<view class="but_bg_inside but_bg_inside_2"></view> -->
						<image class="but-bg" :src="getStaticFilePath('@/static/lottery/btn-bg.png')"></image>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
						<text class="text">再来一次</text>
						<image :src="getStaticFilePath('@/static/lottery/star.png')" class="star"></image>
					</view>
				</template>
			</view>
		</view>
		
		<!-- 单个翻出高级卡片特效弹窗 -->
		<u-popup :show="popupCardShow" @close="closeCardShow()" mode="center">
			<view class="cardshow">
				<view class="cardshow-holder"></view>
				<view :class="'content ' + 'bg-' + popCard.productGrade">
					<view :class="'title ' + 'title-' + popCard.productGrade"></view>
					<image :src="popCard.productPic" mode="" class="item .item-ani2"></image>
				</view>
				<view class="text">
					<text>{{popCard.productName}}</text>
					<text>参考价:{{popCard.productMarketPrice}}</text>
				</view>
				<view class="button" @click="closeCardShow()">
					<image :src="getStaticFilePath('@/static/lottery/star-bg.png')" mode="" class="star"></image>
					<text class="text">点击继续</text>
				</view>
			</view>
		</u-popup>
		
		<!-- 一键全翻出高级卡牌特效弹窗 -->
		<u-popup :show="popupCardListShow" @close="closeCardListShow()" mode="center">
			<view class="cardshow">
				<view class="cardshow-holder"></view>
				<view :class="'content ' + 'bg-' + popCard.productGrade">
					<view :class="'title ' + 'title-' + popCard.productGrade"></view>
					<image :src="popCard.productPic" mode="" class="item .item-ani2"></image>
				</view>
				<view class="text">
					<text>{{popCard.productName}}</text>
					<text>参考价:{{popCard.productMarketPrice}}</text>
				</view>
				<view class="button" @click="nextPopCardShow()">
					<image :src="getStaticFilePath('@/static/lottery/star-bg.png')" mode="" class="star"></image>
					<text class="text">点击继续</text>
				</view>
			</view>
		</u-popup>
		
		<!-- 取消支付弹窗 -->
		<u-popup :show="popupCancelPayShow" @close="closeCancelPayShow()" mode="center" bgColor="transparent">
			<view class="cancelPayShow">
				<view class="content">
					<image :src="getStaticFilePath('@/static/lottery/logo.png')" mode="" class="logo"></image>
					<view class="title">确认弹窗</view>
					<view class="text">你真的要残忍离开吗</view>
					<view class="btn">
						<button class="cancel" @click="closeCancelPayShow()">取消</button>
						<button class="confirm" @click="closeDoubleShow()">确认</button>
					</view>
				</view>
			</view>
		</u-popup>
		
		<!-- 稀有物品确认是否寄售 -->
		<u-modal :show="false" title="提示" content="当前所寄售商品中包含着稀有物品,是否确认寄售?" :showCancelButton="true"
		@confirm="" @cancel=""></u-modal>
		 
	</view>
</template>
<script>
import index from './index.js';
export default index;
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
