<template>
	<view class="agreement-page">
		<status-bar></status-bar>
		<view class="page-header" :style="mpHeaderStyle">
			<view class="back" @click="goBack"><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image></view>
			<view class="title">
				<text class="text">{{ title }}</text>
			</view>
			<view class="tmp"><text>1</text></view>
		</view>
		<view class="wrap">
			<view class="content">
				<text class="header-title center">火潮星球福袋服务协议</text>
				<text class="text mar-t-10 text-indent">
					《福袋服务协议》（简称为“本协议”）是您与深圳红兔文化传媒有限公司（简称为“红兔文化”）之间关于火潮星球平台（简称为“平台”）向您提供的火潮星球福袋服务（简称为“火潮星球服务”）相关事宜缔结的协议，具有法律效力。
				</text>
				<view class="mar-t-10 row text-indent">
					<text class="strong">特别提醒，请您在使用火潮星球服务前阅读井充分理解本协议，特别是免除或者限制责任的相应条款，</text>
					<text class="text">
						双方确认前述条款不属于《中华人民共和国民法典》第四百九十七条规定的“不合理地免除或者减轻其责任、加重对方责任、限制、排除对方主要权利”条款，您认可其合法性及有效性。
					</text>
				</view>
				<text class="mar-t-10 text-indent">
					火潮星球可能会根据平台整体规划等，对本协议进行修改或变更，修改或变更的内容将于相关页面进行公告。若您不同意平台及/或本协议的前述修改或变更，您可停止使用火潮星球服务。如您点击同意、接受或下一步，或您注册、使用火潮星球服务均视为您接受并同意本协议所有条款，包括但不限于前述修改及变更，您自此于平台发生的交易均受本协议约束。如您违反本协议约定，平台有权随时中止或终止向您提供火潮星球服务。
				</text>
				<text class="text text-indent">如果您因年龄（末满18周岁）、智力等因素而不具有完全民事行为能力，请在法定监护人的陪同下阅读本协议。</text>
				<text class="text text-indent">
					由于您使用的软件版本、设备、操作系统等不同以及第三方原因可能导致您实际可使用的具体服务有差别由此可能给您带来的不便，您表示理解，并不会因此向火潮星球和/或平台追究任何责任。
				</text>
				<text class="text mar-t-10 text-indent">除本协议另有说明，本协议项下所涉及的概念定义如下：</text>
				<text class="text">（1）“福袋”：系指一种购买模式；</text>
				<text class="text">（2）“背包”：系指俗称背包，福袋开出商品未提货会临时保留在背包；</text>
				<text class="text">（3）“优惠券”：系指一种可以抵扣支付金额的一种优惠券；</text>
				<text class="text">（4）“HCB”：系指一种可以抵扣支付金额的一种虚拟HCB。</text>
				<text class="strong mar-t-10">一、用户须知</text>
				<text class="text">1.福袋一经售出（即付款完成后，下同），不支持退款。所购福袋商品随机发货不指定款式，开出的商品不支持无理由退货退款。</text>
				<text class="text">
					2.付款完成后，页面会显示您开出商品，您可以在背包界面查看商品，福袋内商品（简称为“福袋商品”）随机出现，多次购买或一次购入多个福袋可能出现重复商品，请您理性购买。请您理解并确认，一旦付款完成后，除本协议其他条款特别约定的退款情形以外，均不支持退款。
				</text>
				<text class="text">3.福袋商品每款对应具体标签，每个标签对应不同的出现概率，购买时请仔细查阅每款商品标签和标签概率。一经购买即视为同意商品标签和概率。</text>
				<text class="text">4.平台界面展示的福袋商品图片，相较商品实物可能存在轻微色差，商品展示图片可能增加滤镜、道具、放大等效果，商品具体样式以收到实物为准。</text>
				<text class="text">5.部分商品展示图中出现的道具，均不在福袋开出商品范围内，请仔细阅读商品详情介绍并确认购买内容。</text>
				<text class="text">
					6.付款完成后，页面会品示您开出的商品，如未显示可能系因网络信号问题导致显示延迟，建议您切换网络或稍等片刻再进行操作，或进入【背包】界面查看已购商品，如仍未正常显示，请联系平台客服。
				</text>
				<text class="text">
					7.您可以根据您的需要对背包内商品进行提货。于背包保存超过30天的商品如未经您主动提货会自动发货（自动发货规则请查看本协议“二、使用说明”之“6.自动发货使用说明”）
				</text>
				<text class="strong mar-t-10">二、使用说明</text>
				<text class="strong">1.支付使用说明</text>
				<text class="text">①充值：您在平台消费，可以选择充值后，用账户余额购买福袋商品。账户余额未使用完可以申请退款。账户余额金币与人民币的兑换比率为1:1。</text>
				<text class="text">②直接购买：您在平台消费，可以选择不充值，直接使用微信和支付宝等第三方支付平台扣费购买。</text>
				<text class="text">当您消费通过第三方平台支付完成商品款项，或使用账户余额就商品款项进行足额兑换后，即视为付款完成。</text>
				<text class="strong">2.优惠券使用说明</text>
				<text class="text">
					在购买福袋商品时如符合规定的条件您可根据平台指引使用优惠券，请仔细阅读每张优惠券使用规则，福袋商品交易是否可以使用优惠券就商品价款进行抵扣，以支付页面的抵扣说明为准。如无法抵扣或抵扣金额不足，可能系由于不满足优惠券使用条件，请您仔细确认优惠
					券的使用规则及要求。
				</text>
				<text class="strong">3.HCB使用说明</text>
				<text class="text">HCB属于平台福袋商品，可以在购买福袋商品时抵扣商品金额。不同福袋抵扣HCB金额规则不一致，具体以福袋商品页面显示为准。</text>
				<text class="strong">4.物流及运费使用说明</text>
				<text class="text">福袋商品如需配送至境外或香港特别行政区、澳门特别行政区及台湾地区则不包邮，其余地区的邮费计算以提货页面显示为准。</text>
				<text class="text">
					福袋商品配送物流由平台决定，不支持指定物流。如因特殊情况确需指定物流的，请联系客服确认是否符合指定物流的特殊要求，经客服确认可指定物流时，您除需支付默认8元邮费外，还应根据指定物流公司的具体收费要求，额外支付邮费的差价部分。
				</text>
				<text class="text">因天气、路况等特殊因素可能造成商品的延期到货，请您谅解。</text>
				<text class="strong">5.背包提货使用说明</text>
				<text class="text">
					在您于平台第一次购买福袋商品时，需主动填写默认收货地址信息，请务必确保填写的默认收货地址真实有效．因末及时填写地址、地址填写错误或其他您个人原因导致的任何损失由您自行承担。您于背包选择就已购福袋商品进行提货后，会生成订单，订单自动生成的收件地址将为您填写的默认收件地址，如需更改收件地址需手动选择更改。请于点选确认发货前仔细确认您的收件地址，如因您未正确填写、选择收件地址导致的任何损失由您自行承担。
					在提交订单时请认真查阅《购买协议&隐私条款》，如您确定立即提货，生成订单，表示您同意本协议及《购买协议&隐私条款》项下的各项约定。
				</text>
				<text class="strong">6. 发货/寄售说明</text>
				<text class="text">
					①发货现货/预售商品发货：以商品页面显示为主。自动发货：如您未手动操作发货的商品将保存在背包，当您背包中存在保存超过30天的福袋商品时，平台将按照您填写的默认地址自动发货，一经发货后不支持修改收件地址。
					如您未填写过默认地址，平台可能通过短信/电话/平台通知/平台公告等途径联系您填写默认地址。已通知您，但您超过3天
					未填写，我司将商品按照平台规则自动寄售寄售金额以平台显示为准。产生的结果均由您自行承担。
				</text>
				<text class="text">② 平台寄售，平台将向您退回原支付开福袋金额的60%；寄售商品一经寄售成功则无法取消寄售。</text>
				<text class="strong">7.生成订单使用说明</text>
				<text class="text">①生成订单后可以在平台界面“我的-我的订单”中查询订单信息</text>
				<text class="text">②订单一旦生成，除因特殊原因长时间途期未发货或出现不可抗力事件外，将无法取消。</text>
				<text class="text">③订单生成后，如订单项下部分商品己经发货，部分商品未发货，订单不支持取消。</text>
				<text class="text">④订单生成后，无法将同一订单项下的商品进行拆分发货（即将同一订单下的商品发送至不同的收件地址)。</text>
				<text class="text">⑤订单生成后，平台可能会根据同一地址，多个订单合并发货情况，属于正常发货状态，不接受该种情况拒收快递或退款等情況。</text>
				<text class="text">⑥订单生成后，如因平台原因将同个订单项下的多个商品，拆分为多个包裹进行寄送，额外支出的运费由平台承担。</text>
				<text class="strong">8.地址填写及修改说明</text>
				<text class="text">①地址填写规则说明</text>
				<text class="text">
					(1）收件信息请填写详细，地址请精确到省、市、区、镇、乡、街、号和楼等。如手机地址填写不详细导致无法发货或派送不成功等情况，后果均由您自行承担。
				</text>
				<text class="text">(2）手机号码请勿填写空号、停机等不常用号码。如您填写信息不准确，导致商品无法发货或者派送不成功，后果均由您自行承担。</text>
				<text class="text">(3）填写信息准确，但快递多次派送不成功，后快递被退回，导致商品二次产生的运费，均由您自行承担。</text>
				<text class="text">(4）请设置好默认收件地址，如默认收件地址不准确(或者忘记更改默认收件地址），快件派送错误，所造成损失均由您自行承担。</text>
				<text class="text">②地址修改说明</text>
				<text class="text">
					生生成订单后不支持更改地址，请在提货时仔细确认好收件地址。如特殊情况需要更改地址请联系客服，但是否可以成功完成地址的修改以订单的实际情况及客服回复为准，同时无法保证修改成功，如修改不成功，产生的后果由您自行承担。
				</text>
				<text class="strong">9.签收商品说明</text>
				<text class="text">
					签收商品时，请您亲自检查包装情况，并就包装及拆箱情况以拍照、录视频等方式进行留底，方便您后续情况沟通，最好在快递员面前验货，并在确认无误后签收。
					如有问题请及时拒收快递。快递经签收后如发现：少件、损坏等人为问题如无有效相关证明，将无法进行退换货等售后操作。
				</text>
				<text class="strong">10.商品多系列说明</text>
				<text class="text">
					火潮星球包含一个或多个不同系列的商品，每个系列中一整盒对应的初始商品数量可能因种类不同而存在差。火潮星球商品可能存在拆盒售卖，由平台二次包装的情况。请谨慎考虑后购买。
				</text>
				<text class="strong">11. 防沉迷机制使用说明</text>
				<text class="text">
					火潮星球商品随机出现，并设有防沉迷机制，触发后将限制消费，具体以页面出现的提示为准，平台不提倡您过度游戏或过度消费，请您在购买前明确自身需求合理范围内理性消费。
				</text>
				<text class="strong">12. 平台概率说明</text>
				<text class="text">平台公布的概率为超稀有款标签、欧皇款标签、隐藏款标签、普通款标签的商品数量配比，不作为每个商品随机获得的实际概率。</text>
				<text class="strong">13.福袋说明</text>
				<text class="text">
					因福袋商品随机出现，如多次购买或一次购入多个福袋可能存在商品重复出现的情况。鉴于火潮星球商品的随机性和特殊性，不适用无理由退换货。如因您不喜欢背包中的商品或商品重复，可以寄售不喜欢的商品。若选择寄售，平台将向您退回原支付开福袋金额的60%；寄售商品一经寄售成功则无法取消寄售。
				</text>
				<text class="strong">14.商品使用说明</text>
				<text class="text">您购买的商品可能有部分小配件，请监护好您身边14岁以下儿童谨慎把玩，如14岁以下儿童因把玩商品发生事故．平台对此不承担任何责任。</text>
				<text class="strong">15.库存数量不足说明：</text>
				<text class="text">您购买的商品可能有部分小配件，请监护好您身边14岁以下儿童谨慎把玩，如14岁以下儿童因把玩商品发生事故．平台对此不承担任何责任。</text>
				<text class="strong">14.商品使用说明</text>
				<text class="text">
					如提货提示库存不足时，请及时联系客服，客服将尽力协调补充库存。如提示库存不足，您可以隔段时间再进行提货。如您提货的商品中间有1个库存不足都会提示库存不足的情況，请您分开提货。
				</text>
				<text class="strong  mar-t-10">三、售后</text>
				<text class="text">
					售后时效：快递签收7天内支持售后，超过7天不支持售后手办、潮玩、潮鞋等因商品性质特殊，为了避免不必要的售后纠纷，请在签收时及时录制完整开箱视频，如无录制完整开箱视频或提供其他明确证明错发、漏发、瑕疵、物流破损等情况的材料，可能无法安排售后，敬请理解。
				</text>
				<text class="strong">（一)商品质量问题售后服务说明：</text>
				<text class="text">
					1.福袋商品购买后，因福袋商品特殊性质，如因商品存在质量问题支持换货，不支持退款。（具体更换规则如下）请提供证明商品存在质量问题的有效凭证（包括但不限于完整开箱视频+商品质量问题图片等）。前述“完整开箱祝频”系指：快递外包装完好，从拆开外包装，到
					拆开所有商品的完整视频，商品请不要移出视频框内。
				</text>
				<text class="text">①盲盒：质量问题，更换全新盲盒，无法更换明盒。</text>
				<text class="text">②明盒：质量问题，更换同系列同款式拆盒拆袋无质量问题商品。</text>
				<text class="text">③精品大娃：质量问题具体以商品原官方渠道售后标准为准。</text>
				<text class="text">④景品手办：严重质量问题，更换全新商品（严重质量问题指：断裂、破损等）</text>
				<text class="text">⑤拼装手办：严重质量问题，更换全新商品（严重质量问题指：拼装断裂，破损）</text>
				<text class="text">⑥周边商品（毛绒玩具、背包带、小商品）：商品质量问题，更换全新商品。</text>
				<text class="text">⑦积木商品：质量问题，更换全新商品，少积木重新补。</text>
				<text class="text">⑧潮鞋：不支持尺码不合适换货。严重质量问题，可更换全新商品（严重质量问题指：断裂、破损等）</text>
				<text class="text">⑨电子产品 （3C产品）：如存在商品质量问题可换货不支持退款。换货以商品原官方销售渠道售后标准为准。</text>
				<text class="text">
					2.福袋商品购买后，部分商品可能存在轻微蹭色、溢色等涂装问题的等瑕疵（官瑕），不支持因此提出的退换货申请，此情况属于正常工艺范国内，请您知悉并谨慎考虑后购买。正常工艺范围内判断标准如下：
				</text>
				<text class="text">①轻微蹭色、溢色、染色、污渍、黑点、红点、凸点、凹点、磨痕、刮痕等情况。</text>
				<text class="text">②商品正面正常摆放在50CM处，无肉眼可见的明显瑕疵。</text>
				<text class="text">③商品背面/侧面/底部正常摆放在70CM处，无肉眼可见的明显瑕疵。</text>
				<text class="text">3.平台会对部分手办、景品手办、拼装手办、周边商品、积木商品进行抽查，对于抽查商品可能存在二次拆封/二次封胶/倒装的情况，此情况不支持售后。</text>
				<text class="text">4.收到的商品可能存在封胶不牢、封胶褶皱、倒装等情況，均属于正常。商品在包装的时候，无法保证百分之百商品包装完美的情况。</text>
				<text class="strong">（二）漏发/错发</text>
				<text class="text">
					当您收到商品时，请根据本协议“二、使用说明”之“9.签收商品说明”） 的要求就商品进行签收。如有问题请及时拒收快递，并与客服联系就漏发、错发商品进行补发或退换。
				</text>
				<text class="strong">（三）退款</text>
				<text class="text">1、超时发货退款：您购买的福袋商品，如从您提货成功并生成订单开始起30天仍未发货，您可以与客服联系申请退款。</text>
				<text class="text">2、退款的收款账户必须为经实名认证的有效收款账户如因账户相关信息提供错误导致退款延迟或失败的，平台不承担相对应的责任。</text>
				<text class="strong">(四）等价换货</text>
				<text class="text">1、您购买的福袋商品，从您提货成功，生成订单开始起15天末发货，您可以就该商品申请，以您生成订单的商品金额为准，等价兑换商品。</text>
				<text class="text">
					2、请您在生成订单后的15日满后的1周内确定等价换货商品，提交至客服申请，平台将在7个工作日内审核完成您的申请，审核通过后，平台会给您安排发货，发货期间自平台审核通过之日起重新起算。
				</text>
				<text class="strong">(五）售后运费承担</text>
				<text class="text">如由平台原因导致的售后问题，运费由平台承担。如由您导致的售后问题，运费由您自行承担。</text>
				<text class="strong">(六）物流运输</text>
				<text class="text">
					商品在运输途中可能存在轻微盒损的问题（折痕
					磨痕、污渍、压痕、变形、裂开等情况）均属于正常情况，针对该情况不予换货/退货。在前述情形下，若您末与平台就退/换货安排达成一致意见时就自行拒收/退回/拒收商品的，所产生的运费由您自行承担。
				</text>
				<text class="strong mar-t-10">四、缺货/延期</text>
				<text class="text">
					1、由于市场变化、供应商生产计划变化、系统问题、不可抗力等因素影响，您所提交的订单信息中的商品可能出现缺货情形。在此情形下，平台将以有效方式（包括但不限于在平台发布公告、发送邮件、【于平台内向您发送系统通知】、向您提供的联系电话发送手机短信等方式）通知您并提供解决方案
					（包括但不限于取消订单、换货调货等方式）。请您在未收到商品之前留意通知。
				</text>
				<text class="text">
					2、通知：平台将在确认缺货或需延期发货后一周内以站内信方式向您发送缺货或延期发货的通知。请您在收到通知后14天内主动联系在线客服，否则，平台将有权取消订单。
				</text>
				<text class="text">3、缺货商品是否补货不再另行通知，如您对此商品感兴趣，请您随时关注或联系客服。</text>
				<text class="text">
					4、请您知悉背包里预售商品列出的到货时间为参考时间，该参考时间可能因库存状况、送货时间、送货地点等客观因素存在误差，具体时间以商品实际到货时间为准。请您同样知悉预售类商品的实际到货时间会因受制作周期、物流周期、质检返工、不可抗力等诸多因素影
					响存在误差，导致预售类商品的实际到货时间可能延迟，您对上述情形表示同意及无异议。
				</text>
				<text class="strong mar-t-10">五、HCB</text>
				<text class="text">1、HCB专属于火潮星球盲盒福袋，可以在购买火潮星球商品时抵扣金额。</text>
				<text class="text">2、HCB获得的方式：签到、完成任务、充值赠送或活动赠送；消耗：开盒福袋。</text>
				<text class="text">
					3、如您使用HCB开盒盲盒福袋商品，则100个HCB可抵扣1元；如您组合使用余额及HCB购买商品，则每次购买商品时HCB可抵扣的金额，按照实际支付时页面展示为准。
				</text>
				<text class="text">4 如您在购买盲盒福袋商品时使用HCB抵扣金额的若寄售回收背包中该商品，使用HCB进行支付的部分将按原支付数量的60%返还。</text>
				<text class="text">5、HCB不能兑现，不可转让。</text>
				<text class="strong mar-t-10">六、末成年</text>
				<view class="row">
					<text class="text">
						1、未经监护人同意的情况下，任何未满18周岁的末成年人均不得自行注册账号或使用本服务。我们将依据您提供的个人信息判断您是否为未成年人。此外，如果您不具有完全民事行为能力，请在法定监护人（以下简称“监护人”）的陪同下完成阅读和判断是否同意本协议。您点击确认/册/登陆等按钮并继续使用本服务即视为您已经取得监护人的必要同意。
					</text>
					<text class="strong">
						若您在火潮星球明确提示后，您仍然进行了用户注册和产品购买，则视为该用户已经取得了家长或法定监护人的同意或追认，该用户的消费行为应当产生法律效力，并应当承担与用户相关的法律责任，火潮星球依据本协议及相关法律规定所实施的行为对该用户也具有法律约束力。如果火潮星球发现您是未成年人且未经过监护人的授权或同意，我们将按照法律规定、相关约定采取包括但不限于协商索取授权、限制访问、暂停服务、注销账户等措施。如有疑问，请提供针对未成年人消费行为未得到合理监管的相关证明，并积极配合平台处理。
					</text>
				</view>
				<text class="text">
					2、如果您隐瞒因年龄（未满18周岁）、智力等因素而不具有完全民事行为能力等情況，注册账号并购买商品后被平台发现，视为无效消费，请您联系客服处理封禁账号和处理退款事情。（如涉及商品已经发货或商品已在使用，无法让平台二次销售等情况，平台会对该商品
					视为正常购买）。
				</text>
				<text class="text">
					3、如果您因年龄（末满18周岁）、智力等因素而不具有完全民事行为能力等情况，在法定监护人陪同下或经过法定监护人同意下，注册账号并购买平台商品，视为正常消费。
				</text>
				<text class="text">4、如您账号是成年人注册，但因智力等因素而不具有完全民事行为能力，不管任何情况，您于平台上发生的交易及消费均视为正常、有效的消费。</text>
				<text class="strong mar-t-10">七、法律适用与争议解决</text>
				<text class="text">1、平台不行使、末能及时行使或者末充分行使本协议或者按照法律规定所享有的权利，不应被视为放弃该权利，也不影响平台在将来行使该权利。</text>
				<text class="text">
					2、本协议的订立、效力、解释、履行、修改和终止以及争议的解决适用中华人民共和国法律。因解释和履行本协议而发生的任何争议，应尽量通过友好协商的方式加以解決。如果在一方向其他方发出要求协商解决的书面通知后
					30天之内争议仍然得不到解决，则争议各方一致同意提交中国广州仲裁委员会解决。仲裁裁决是终局的，对双方均有约束力。
				</text>
				<text class="text">3、本协议条款无论因何种原因部分 无效，其余条款仍有效，对各方具有约束力。</text>
				<text class="text mar-t-10">本协议与2022年9月3日修订</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import routerAlias from '@/routers/alias';
import { navigateTo, redirectTo, switchTab, navigateBack, reLaunch, showLoading, hideLoading, showToast, showModal, showActionSheet, getRandomArray } from '@/shared';
export default {
	data() {
		return {
			type: 'user',
			title: '福袋买家购买须知',
			content: '协议协议协议协议协议'
		};
	},
	onLoad(e) {
		// this.type = e.type;
		// this.loadData();
	},
	methods: {
		goBack() {
			navigateBack();
		},
		computed: {
			/**
			 * 小程序 自定义顶部样式
			 */
			mpHeaderStyle() {
				//小程序内
				let headerStyle = '';
				// #ifdef MP-WEIXIN
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				// console.log('mpHeaderStyle-menuButtonInfo', menuButtonInfo)
				let systemInfo = uni.getSystemInfoSync();
				// console.log('mpHeaderStyle-systemInfo', systemInfo)
				let windowInfo = uni.getWindowInfo();
				// console.log('mpHeaderStyle-windowInfo', windowInfo)
				let top = menuButtonInfo.top - systemInfo.safeAreaInsets.top;
				let witdh = menuButtonInfo.width;
				//安卓
				if (systemInfo.safeAreaInsets.top == 0) {
					top = menuButtonInfo.top - windowInfo.statusBarHeight;
				}
				//pc版小程序
				if (systemInfo.platform == 'windows') {
					top = 0;
					witdh = 0;
				}
				headerStyle = `margin-top:${top}px;`;
				// #endif
				return headerStyle;
			}
		},
		loadData() {
			this.title = this.type == 'user' ? '用户协议' : '隐私协议';
			console.log('this.type', this.type);
		}
	}
};
</script>

<style lang="scss" scoped>
.page-header {
	@include flex(row);
	align-items: center;
	justify-content: space-between;
	padding: 0 new-sizing(15);
	height: new-sizing(32);

	//小程序内
	/*  #ifdef  MP-WEIXIN */
	height: 32px;
	/*  #endif */

	.back {
		@include flex(row);
		justify-content: center;
		align-items: center;
		.icon {
			width: new-sizing(28);
			height: new-sizing(28);
		}
	}
	.title {
		@include flex(row);
		justify-content: center;
		align-items: center;
		.text {
			font-size: new-sizing(18);
			line-height: new-sizing(25);
		}
	}
	.tmp {
		text {
			color: transparent;
		}
	}
}
.wrap {
	padding: 0 new-sizing(15);
	margin-top: new-sizing(15);
	.content {
		.center {
			text-align: center;
		}
		.header-title {
			font-size: new-sizing(20);
			color: #000;
			font-weight: 700;
		}
		.strong {
			font-size: new-sizing(16);
			color: #000;
			font-weight: 700;
		}
		text {
			display: block;
		}
		.row {
			display: block;
			text {
				display: initial;
			}
		}
		.text-indent{
			text-indent: new-sizing(10);
		}
	}
}
</style>
