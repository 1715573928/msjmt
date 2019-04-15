<template>
	<div class="app-list">
		<header id="header" class="mui-bar ">
			<h1>
				<input type="text"  class="sever" placeholder="搜索你感兴趣的" v-model="seve">
				<img src="../img/fangdaj.png"  alt="" @click="jump">
			</h1>
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"  @click="go"></a>
		</header>
		<div class="cela-left">
			<ul class="main_nav">
				<li @click="main(1)" :class="{active:tun==1}">
					<div>
						<img src="../img/1.png" />
						<span>家常菜</span>
					</div>
				</li>
				<li @click="main(2)" :class="{active:tun==2}">
					<div>
						<img src="../img/2.png" />
						<span>中华菜系</span>
					</div>
				</li>
				<li @click="main(3)" :class="{active:tun==3}">
					<div>
						<img src="../img/3.png" />
						<span>各地小吃</span>
					</div>
				</li>
				<li @click="main(4)" :class="{active:tun==4}">
					<div>
						<img src="../img/4.png" />
						<span>外国料理</span>
					</div>
				</li>
				<li @click="main(5)" :class="{active:tun==5}">
					<div>
						<img src="../img/5.png" />
						<span>烘焙</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="cela-right">
			<ul>
				<li v-for="(nav,i) of miannav" :key="i+'i'">
					<a href="javascript:;" @click="jumpInfo(nav.tid)">
						<img :src="`http://127.0.0.1:3000/${nav.flimg}`" alt="">
						<span>{{nav.tog}}</span>
					</a>
				</li>
			
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			miannavs: [],
			miannav:[],
			seve:'',
			tun:0,
		};
	},
	methods: {
		go(){
			history.go(-1);
		},
		jump(){
			this.$router.push("/listtt?mname="+this.seve)
		},
		jumpInfo(tid){
			var tid = tid;
			this.$router.push("/listt?tid="+tid)
		},
		main(n) {
		this.miannav=[]
			for(var i of this.miannavs){
				if(i.toid==n){
					this.miannav.push(i);
				}
			}console.log(this.miannav);
			this.tun=n;
		},
		miandata(){
			var url="http://localhost:3000/header";
			this.axios.get(url).then(data=>{
				this.miannavs = data.data.data;
				
			this.main(1)
				
				
			})
		}
	},
	created(){
		this.miandata()
		
	},
};
</script>
<style scoped>
	.app-list .active{
		background: #eee;
	}
 .app-list .cela-right ul{
	    width: 100%;
    font-size: 0;
    position: relative;
    height: 550px;
    overflow: scroll;
	padding-left: 3%;
}
.app-list .cela-right li{
	width: 33%;
    display: inline-block;
    vertical-align: top;
    padding: 10px;
    box-sizing: border-box;

}
 .app-list .cela-right img{
	    display: block;
    width: 100%;
}
.app-list .cela-right span{
	    font-size: 12px;
    line-height: 24px;
    display: block;
    text-align: center;
    color: #000;
}
.app-list .cela-right {
	float: right;
	padding-top: 50px;
	height: 400px;
	width: 75%;
}
.app-list .cela-left {
	width: 25%;
	background: #fdfdfd;
	height: 100%;
	float: left;
	padding-top: 50px;
}
.app-list .cela-left ul {
	list-style: none;
	padding-left: 0px;
	height: 550px;
}
.app-list .cela-left li {
	width: 100%;
	height: 15%;
	position: relative;
	box-sizing: border-box;
	padding-top: 20px;
	margin-top: 20%;
}

.app-list .cela-left img {
	display: block;
	width: 30px;
	margin: 0px auto 0px;
}
.app-list .cela-left span {
	font-size: 14px;
	line-height: 34px;
	display: block;
	text-align: center;
	color: #333;
}
.app-list #header {
	margin-bottom: 70px;
}
.app-list #header a {
	color: #aaa !important;
}
.app-list #header {
	background: #fff url(../img/food_beauty_top_bg.png);
	background-size: 100%;
	height: 50px;
}

 #header .sever {
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
 #header img {
	position: absolute;
		top: 15px;
		right: 20%;
		height: 20px;
}
</style>
