<template>
	<div class="app-index">
		 <header id="header" class="mui-bar ">
			<h1>
				<input type="text"  class="sever" placeholder="搜索你感兴趣的" v-model="seve">
				<img src="../img/fangdaj.png"  alt="" @click="jump">
			</h1>
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"  @click="go"></a>
			
		</header>
		<mt-swipe :show-indicators="false" :auto="4000">
			<mt-swipe-item>
				<div v-for="(zao,i) of zaocan" :key="i+'zao'" class="banneritem" @click="jumpInfo(zao.mid)">
					<img :src="`http://127.0.0.1:3000/${zao.endp}`" width="100%" alt="" />
					<div class="bannertext">
						<p>{{zao.mtitle}}</p>
						<p>非常好吃</p>
					</div>
				</div>
				<h3 class="sct">早餐</h3>
				<p class="tdes">吃不腻的早餐饼，你值得拥有</p>
			</mt-swipe-item>
			<mt-swipe-item>
				<div v-for="(wu,i) of wucan" :key="i+'wu'" class="banneritem" @click="jumpInfo(wu.mid)">
					<img :src="`http://127.0.0.1:3000/${wu.endp}`" width="100%" alt="" />
					<div class="bannertext">
						<p>{{wu.mtitle}}</p>
						<p>非常好吃</p>
					</div>
				</div>
				<h3 class="sct">午餐</h3>
				<p class="tdes">别致午餐，带来新的味蕾体验</p>
			</mt-swipe-item>
			<mt-swipe-item>
				<div v-for="(xiawu,i) of xiawucha" :key="i+'xiawu'" class="banneritem" @click="jumpInfo(xiawu.mid)">
					<img :src="`http://127.0.0.1:3000/${xiawu.endp}`" width="100%" alt="" />
					<div class="bannertext">
						<p>{{xiawu.mtitle}}</p>
						<p>非常好吃</p>
					</div>
				</div>
				<h3 class="sct">下午茶</h3>
				<p class="tdes">从柔滑到香酥，你最爱哪种口感</p>
			</mt-swipe-item>
			<mt-swipe-item>
				<div v-for="(wan,i) of wancan" :key="i+'wan'" class="banneritem" @click="jumpInfo(wan.mid)">
					<img :src="`http://127.0.0.1:3000/${wan.endp}`" width="100%" alt="" />
					<div class="bannertext">
						<p>{{wan.mtitle}}</p>
						<p>非常好吃</p>
					</div>
				</div>
				<h3 class="sct">晚餐</h3>
				<p class="tdes">吃肉不怕腻，过足瘾</p>
			</mt-swipe-item>
			<mt-swipe-item>
				<div v-for="(ye,i) of yexiao" :key="i+'ye'" class="banneritem" @click="jumpInfo(ye.mid)">
					<img :src="`http://127.0.0.1:3000/${ye.endp}`" width="100%" alt="" />
					<div class="bannertext">
						<p>{{ye.mtitle}}</p>
						<p>非常好吃</p>
					</div>
				</div>
				<h3 class="sct">夜宵</h3>
				<p class="tdes">夜深人静，美食诱惑难挡</p>
			</mt-swipe-item>
		</mt-swipe>
		<div class="tuijian">
			<div>今日最新</div>
			<div v-for="(time,i) of menutime" v-if="i<3" :key="i+'time'" class="tjimg" @click="jumpInfo(time.mid)">
				<a href="javascript:;">
					<img :src="`http://127.0.0.1:3000/${time.endp}`" width="100%" />
				</a>
				
			</div>
			
		</div>
		<div class="cnxh-title">
			<img src="../img/love.png" />
			<div class="t">
				<strong>猜你喜欢</strong>
				<em>{{data|datatime}}为您更新</em>
			</div>
		</div>
		<div class="cnxh-body">
			<div class="mui-card" v-for="(dianj,i) of menudianj" :key="i+'dianj'" @click="jumpInfo(dianj.mid)">
				<div class="mui-card-header mui-card-media">
					<img :src="`http://127.0.0.1:3000/${dianj.endp}`" alt="">
				</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>{{dianj.mtitle}}</p>
						
					</div>
				</div>
				<div class="mui-card-footer">
					<a class="mui-card-link">{{dianj.diffculty}}</a>
					<a class="mui-card-link">{{dianj.dianj|dianj}}浏览</a>
				</div>
			</div>
			<div class="mui-card" v-for="(time,i) of menutime" v-if="i>3" :key="i+'time'"  @click="jumpInfo(time.mid)">
				<div class="mui-card-header mui-card-media">
					<img :src="`http://127.0.0.1:3000/${time.endp}`" alt="">
				</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>{{time.mtitle}}</p>
						
					</div>
				</div>
				<div class="mui-card-footer">
					<a class="mui-card-link">{{time.diffculty}}</a>
					<a class="mui-card-link">{{time.dianj|dianj}}</a>
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
export default {
	data() {
		return {
			menudianj: [],
			menutime: [],
			wucan: [],
			xiawucha: [],
			yexiao: [],
			zaocan: [],
			wancan: [],
			data:new Date(),
			seve:'',
		
		};
	},
		methods: {
			go(){
				history.go(-1);
			},
			jump(){
				this.$router.push("/listtt?mname="+this.seve)
			},
			jumpInfo(mid){
				var tid = tid;
				this.$router.push("/detail?mid="+mid)
			},
			dataut() {
				var url="http://127.0.0.1:3000/index";
				this.axios.post(url).then(data=>{
					this.menudianj = data.data.data.menudianj;
					this.menutime = data.data.data.menutime;
					this.wucan = data.data.data.wucan;
					this.xiawucha = data.data.data.xiawucha;
					this.yexiao = data.data.data.yexiao;
					this.zaocan = data.data.data.zaocan;
					this.wancan = data.data.data.wancan;
					console.log(data);
					
					
				})
			}
		},
		created(){
			this.dataut()
			
			
		},
};
</script>

<style scoped>

.app-index .mint-swipe {
	overflow: hidden;
	position: relative;
	height: 470px;
	width: 96%;

	margin: 0px auto;
	padding-top: 50px;
}
.app-index .banneritem {
	height: 110px;
	background: #ddd;
	margin-top: 5px;
	overflow: hidden;
	position: relative;
}
.app-index .banneritem img {
	margin-top: -50%;
}
.app-index .bannertext {
	position: absolute;
	bottom: 0;
	left: 3%;
}
.app-index .bannertext p:first-child {
	font-size: 20px;
	color: #fff;
	font-weight: bold;
	line-height: 10px;
}
.app-index .bannertext p:last-child {
	font-size: 12px;
	color: #fff;
	line-height: 10px;
	margin-bottom: 8px;
}
.app-index .sct {
	width: 100%;
	line-height: 20px;
	font-size: 16px;
	color: #333;
	text-align: center;
	padding-top: 12px;
}
.app-index .tdes {
	width: 100%;
	line-height: 20px;
	font-size: 12px;
	color: #333;
	text-align: center;
}
.app-index .tuijian {
	text-align: center;
	color: #000;
	width: 96%;
	margin: 0px auto;
}
.app-index .tuijian > .tjimg {
	width: 100%;
	height: 150px;
	overflow: hidden;
	margin-top:5px ;
}
.app-index .tuijian img {
	margin-top: -50%;
}
.cnxh-title {
	text-align: center;
	margin: 24px 0px 14px;
}
.app-index .cnxh-title img {
	display: inline-block;
	vertical-align: top;
	height: 30px;
	width: 30px;
}
.app-index .cnxh-title div {
	display: inline-block;
	vertical-align: top;
	height: 30px;
	padding-left: 4px;
	text-align: left;
}
.app-index .cnxh-title div em {
	display: block;
	font-size: 10px;
	color: #999;
	line-height: 9px;
}
.app-index .mui-card-media{
	height:200px;
	
}
.app-index .mui-card{
	width: 47%;
	display: inline-block;
	margin: 1%;
	border-radius: 5%;
}
.app-index .mui-card-header > img{
	width: 100%;
	height: 100%;
	border-radius: 5%;
}
.app-index .mui-card-content-inner {
	height: 50px;
	padding: 8px;
	
}
.app-index .cnxh-body{
	padding-bottom: 50px;
}
.app-index	.mui-bar {
		box-shadow: 0 0 1px rgba(0, 0, 0, 0);
	}

.app-index #header a {
	color: #aaa !important;
}
.app-index #header {
	background: #fff url(../img/food_beauty_top_bg.png);
	background-size: 100%;
	height: 50px;
}
.app-index #header .sever {
	height: 32px;
	border-radius: 4px;
	    font-weight: 200;
	background: #f5f5f5;
	line-height: 32px;
	margin: 0px 12%;
	color: #aaa;
	font-size: 13px;
	text-align: center;
	display: block;
	top: 10px;
	width: 70%;
	position: absolute;
}
.app-index #header img {
	position: absolute;
		top: 15px;
		right: 20%;
		height: 20px;
}

</style>
