import routerAlias from "./alias";

//需要登录的页面
//若需要显示页面 但是执行部分方法时才检测权限 可执行 强制检测登录方法 第二个参数为true
// this.$store.dispatch('user/checkAuth', true);
export default {
	login: [
		// routerAlias.HOME_PAGE,
		// routerAlias.LOTTERY_PAGE,
		routerAlias.MY_PAGE,
		routerAlias.MY_BAG_PAGE,
		routerAlias.INVITE_REBATE_INDEX,
		routerAlias.INVITE_RECORD_INDEX,
	],
};
