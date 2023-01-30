import { navigateBack, navigateTo, showToast } from '@/shared'
import routerAlias from '@/routers/alias.js';

export default {
	data() {
		return {
			topTabList: [{
					name: '全部',
				},
				{
					name: '节日活动',
				},
				{
					name: '特殊活动'
				}
			],
			rightArrow: ('https://static.duolachaowan.com/static/my/cost-arrow.png'),
			testImg: ('https://static.duolachaowan.com/static/my/costimg-test.png'),
			topTablineBg: ('https://static.duolachaowan.com/static/common/tabdot.png'),
			topTabIndex: 0,
		}
	},
	methods: {
		topTabClick(){
			
		},
		goBack() {
			navigateBack();
		},
		show(str){
			if(str == '0元抽'){
				let url = routerAlias.ACTIVE_ZEROBUY_PAGE
				navigateTo(url);
			}else{
				showToast('暂未开放~')
			}
		}
	}
}