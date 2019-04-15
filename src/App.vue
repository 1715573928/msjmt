<template>
 <div class="app-container">
	
    <router-view></router-view>
	<nav class="mui-bar mui-bar-tab" style=" box-shadow: 0 0 0px rgba(0, 0, 0, .85) !important;">
		<a class="mui-tab-item " href="#index"  @click="main('index')" :class="{active:tun=='index'}">
			<span class="mui-icon mui-icon-extra mui-icon-extra-rank"></span>
			<span class="mui-tab-label">推荐</span>
		</a>
		<a class="mui-tab-item" href="#List"  @click="main('List')" :class="{active:tun=='List'}">
			<span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
			<span class="mui-tab-label">菜谱分类</span>
		</a>
	
		<a class="mui-tab-item" href="#login"  @click="main('login')" :class="{active:tun=='login'}">
			<span class="mui-icon mui-icon-contact"></span>
			<span class="mui-tab-label">我的</span>
		</a>
	</nav>
 </div>
</template>
<script>
export default {
	data() {
		return {
			
			tun:"index",
		};
	},
	methods: {
		main(n){
			this.tun=n;
			this.$router.push("/"+n)
		}
	},
	
};
</script>
<style>
	.active{
		color: #007aff !important; 
	}
   .app-container{
     
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}

</style>
