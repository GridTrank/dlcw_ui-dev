<template>
  <view class="agreement-page">
    <status-bar></status-bar>
    <view class="page-header" :style="mpHeaderStyle">
      <view class="back" @click="goBack"
        ><image :src="getStaticFilePath('@/static/common/back.png')" class="icon"></image
      ></view>
      <view class="title">
        <text class="text">{{ title }}</text>
      </view>
      <view class="tmp">
        <text>1</text>
      </view>
    </view>
    <view class="wrap">
      <view class="content"><u-parse :content="content"></u-parse></view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import routerAlias from "@/routers/alias";
import {
  navigateTo,
  redirectTo,
  switchTab,
  navigateBack,
  reLaunch,
  showLoading,
  hideLoading,
  showToast,
  showModal,
  showActionSheet,
  getRandomArray,
} from "@/shared";
export default {
  data() {
    return {
      type: "user",
      title: "用户协议",
      content: "协议协议协议协议协议",
    };
  },
  onLoad(e) {
    this.type = e.type;
    this.loadData();
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
        let headerStyle = "";
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
        if (systemInfo.platform == "windows") {
          top = 0;
          witdh = 0;
        }
        headerStyle = `margin-top:${top}px;`;
        // #endif
        return headerStyle;
      },
    },
    loadData() {
      this.title = this.type == "user" ? "用户协议" : "隐私协议";
      console.log("this.type", this.type);
    },
  },
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
}
</style>
