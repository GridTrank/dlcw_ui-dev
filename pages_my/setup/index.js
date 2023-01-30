import { mapGetters, mapState } from 'vuex';
import { logOutService } from '@/service/index.js';
import routerAlias from '@/routers/alias.js';
import { updateUserinfoService,userinfoService } from '@/service/index.js';
import { setUserStorage } from '@/storage';
import { navigateTo, 
		navigateBack,
		showToast,
		showLoading,
		hideLoading,
		fuzzyPhone,
		getStaticFilePath
} from '@/shared';

export default {
	data(){
		return {
			defaultAvatarImg: getStaticFilePath('@/static/my/userImg.png'),
			showImgM: false,
			showSexM: false,
			showPhone: false,
			actions: [{
					name: '男',
				},
				{
					name: '女',
				}
			],
			imageList: ''
		}
	},
	computed:{
		...mapState({
			loginUser: state => state.user.userInfo
		}),
		...mapGetters({
			
		})
	},
	onShow(){
		this.userinfo();
	},
	methods:{
		fuzzyPhone,
		//复制到粘贴板
		copy(data){
			uni.setClipboardData({
				data: data,
				success: function () {
					console.log('success');
				}
			});
		},
		goBack() {
			navigateBack();
		},
		closeImg(){
			this.showImgM = false;
		},
		openImg(){
			this.imageList = this.$store.state.user.userInfo.headImg;
			this.showImgM = true;
		},
		closeSex(){
			this.showSexM = false;
		},
		openSex(){
			this.showSexM = true;
		},
		openPhone(){
			this.showPhone = true;
		},
		closePhone(){
			this.showPhone = false;
		},
		sexSelect(e) {
			showLoading('加载中');
			let sex = e.name == '男' ? 0 : 1;
			updateUserinfoService({sex:sex}).then(res => {
				userinfoService().then(res => {
					hideLoading();
					this.userinfo()
					showToast('修改成功~')
				})
			})
		},
		logout(){
			showLoading('退出中...')
			logOutService().then(res => {
				console.log('退出成功');
				console.log(res.data);
				this.$store.dispatch('user/logout');
				let url = routerAlias.LOGIN;
				navigateTo(url);
			}).catch((r) => {
				hideLoading()
				this.$store.dispatch('user/logout');
				showToast('未知错误，退出失败!')
			})
		},
		goPage(r){
			let url = routerAlias[r];
			navigateTo(url);
		},
		err(){
			showToast('暂未开放~');
		},
		test(){
			const that = this;
			uni.chooseImage({
				count: 1, // 最多可以选择的图片张数，默认9
				sizeType: ['original'], //original 原图，compressed 压缩图，默认二者都有
				sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
				success: function(res) {
					that.imageList = res.tempFilePaths[0];
				},
			})
		},
		imgM(){
			console.log('正在运行imgM事件');
			const that = this;
			console.log(that.imageList)
			uni.getFileSystemManager().readFile({
				filePath: that.imageList,
				encoding: 'base64',
				success: res => {
					//把arraybuffer转成base64
					let base64 = 'data:image/jpeg;base64,' + res.data;
					//不加上这串字符，在页面无法显示
					updateUserinfoService({ headImg : base64 }).then(res => {
						userinfoService().then(res => {
							this.userinfo()
							showToast('头像上传成功~');
							this.showImgM = false;
						}).catch(e => {
							console.log('图片上传失败');
						})
					})
				},
				fail: (e) => {
					console.log('失败',e)
				}
			})
		},
		//固定获取用户信息
		userinfo() {
			userinfoService().then(res => {
				console.log(res.data);
				this.$store.dispatch('user/login', res.data)
			})
		},
		//固定获取用户手机号码
		getPhoneNumber(e){
			console.log(e);
		}
	}
}