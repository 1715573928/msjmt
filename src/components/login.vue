<template>
	<div>
		<div v-if="this.a == -1">
			<header id="header" class="mui-bar ">
				<h1 class="sever">登录美食杰</h1>
				<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"  @click="go"></a>
			</header>
			<div id="body">
				<div id="login1">
					<div class="loginhard"></div>
					<div class="loginbody">
						<div id="ehintt" style="color:#ec5541;">{{ phint }}</div>
						<div class=""><input type="text" class="text1" id="email" placeholder="请输入手机号/邮箱/昵称" v-model="email" /></div>
						<div id="ehint" :style="{ color: ehintt1 }">{{ ehintt }}</div>
						<div class=""><input type="password" class="password" id="pwd" placeholder="请输入密码" v-model="pwd" /></div>
						<div id="phint" :style="{ color: ehint1 }">{{ ehint }}</div>
						<div class="">
							<label class="gd fl">
								<input type="checkbox" id="auto_login_next" value="auto" class="" />
								下次自动登录
							</label>
							<a class="gd fr" >忘记密码？</a>
						</div>
						<div style=" clear: both;"></div>
						<a @click="dataut" class="loginbnt" id="sbm">登录</a>
						<router-link class="mb50" to="/reg">还没有账号？免费注册</router-link>
						<table></table>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<header id="header" class="mui-bar ">
				<h1 class="sever">个人中心</h1>
				<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			</header>
			<div class="pt50">
				<div class="my_top_c">
					<a href="javascript:;" class="a1">
						<img src="https://s1.c.meishij.net/images/default/tx2_7.png" />
						<div class="c">
							<strong>杰米8028669635</strong>
							<span>正在通往美食达人的路上...</span>
						</div>
					</a>
					<div class="tc" @click="dataut2">退出登录</div>
				</div>
			</div>

<ul class="mui-table-view pt170">
	
    <li  class="mui-table-view-cell mui-media" v-if="ulist.length > 0"
				v-for="(list, i) of ulist"
				:key="i + 'list'"   @click="jumpInfo(list.tid)">
        <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" :src="`http://127.0.0.1:3000/${list.endp}`">
            <div class="mui-media-body">
                {{ list.mtitle }}
                <p class='mui-ellipsis' style="padding-top: 20px;">{{ list.story }}</p>
            </div>
        </a>
    </li>
  <li  class="mui-table-view-cell mui-media" v-else>
     暂无上传菜品，请在pc端添加菜品
  </li>
</ul>

			<!-- <div
				v-if="ulist.length > 0"
				class="mui-card"
				v-for="(list, i) of ulist"
				:key="i + 'list'"
			>
				<div class="mui-card-header mui-card-media">
					<img :src="`http://127.0.0.1:3000/${list.endp}`" alt="" />
				</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>{{ list.mtitle }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<a class="mui-card-link">{{ list.diffculty }}</a>
					<a class="mui-card-link">{{ list.dianj | dianj }}浏览</a>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			ulist: [],
			a: -1,
			phint: '',
			ehintt1: '',
			ehint1: '',
			ehintt: '',
			ehint: '',
			email: '',
			pwd: '',
			re: /^[\w]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[\w]{2,4}$/,
			pre: /^[\w]{6,17}$/
		};
	},
	methods: {
		go(){
			history.go(-1);
		},
		jumpInfo(mid){
			var tid = tid;
			this.$router.push("/detail?mid="+mid)
		},
		dataut() {
			var url = 'http://localhost:3000/login';
			var data = `email=${this.email}&upwd=${this.pwd}`;
			this.axios.post(url, data).then(data => {
				if (data.data.code < 0) {
					this.ehintt = '';
					this.ehint = '';
					this.phint = '用户名或密码错误';
				} else {
					console.log(data.data.data[0].uid);
					sessionStorage.setItem('uid', data.data.data[0].uid);
					this.a = sessionStorage.getItem('uid');
					//console.log(data.data);
				}
			});
		},
		dataut1() {
			console.log(this.a)
			var url = 'http://localhost:3000/uidlist?uid='+this.a ;
console.log(url)
			this.axios.get(url).then(data => {
				this.ulist = data.data.data;
				//console.log(123123123);
				// console.log(this.ulist)
			});
		},
		dataut2() {
			sessionStorage.setItem('uid', -1);
			this.a = sessionStorage.getItem('uid');
			history.go(0);
		}
	},
	created() {
		//this.dataut()

		this.a = sessionStorage.getItem('uid');

		// console.log(sessionStorage.getItem("uid"))
		if (this.a > -1) {
			this.dataut1();
		}
	},
	watch: {
		a() {
			if (this.a > -1) this.dataut1();
		},
		email() {
			if (this.re.test(this.email)) {
				this.ehintt = '邮箱格式正确';
				this.ehintt1 = '#8fc31f';
			} else {
				this.phint = '';
				this.ehintt = '请输入正确的邮箱格式';
				this.ehintt1 = '#7ecef4';
			}
		},
		pwd() {
			if (this.pre.test(this.pwd)) {
				this.ehint = '密码格式正确';
				this.ehint1 = '#8fc31f';
			} else {
				this.phint = '';
				this.ehint = '请输入6到17位密码';
				this.ehint1 = '#7ecef4';
			}
		}
	}
};
</script>

<style>
	.mui-table-view .mui-media-object {
    line-height: 42px;
    max-width: 70px;
    height: 70px;
}
	.pt170{
		margin-top: 120px;
		margin-bottom: 50px;
	}
.my_top_c .a1 .c span {
	color: #fff;
	font-size: 12px;
	line-height: 24px;
	display: block;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.tc,
.my_top_c .a1 .c strong {
	color: #fff;
	font-size: 16px;
	line-height: 24px;
	display: block;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	padding-top: 12px;
}
.tc {
	float: right;
	padding-top: 0px;
}
.my_top_c .a1 .c {
	height: 72px;
	width: 100%;
	padding-left: 80px;
	box-sizing: border-box;
}
.my_top_c .a1 img {
	display: block;
	height: 66px;
	width: 66px;
	border: 3px solid rgba(255, 255, 255, 0.5);
	border-radius: 100%;
	position: absolute;
	left: 0px;
	top: 0px;
}
.my_top_c .a1 {
	width: 80%;
	margin: 5% auto 0px;
	display: block;
	position: relative;
}
.my_top_c {
	display: block;
	height: 120px;
	width: 100%;
	position: absolute;
	left: 0px;
	top: 50px;
	background: url(../img/bg.png) center no-repeat;
}
.pt50 {
	padding-top: 50px;
	pos-bottom: 50px;
}
.redd {
	color: #ec5541;
}
.gre {
	color: #8fc31f;
}
.blu {
	color: #7ecef4;
}
#login1 {
	margin: 0px auto;
}
.loginhard {
	padding: 50px 0;
	margin: 0px auto;
	text-align: center;
	font-size: 20px;
}
.loginbody {
	width: 300px;
	margin: 0 auto;
	text-align: center;
}
.text1,
.password {
	height: 22px;
	border: 1px solid #ddd;
	border-radius: 4px;
	line-height: 22px;
	font-size: 14px;
	color: #333;
	padding: 11px;
	width: 276px;
	margin: 11px 0px;
}
.gd {
	font-size: 13px;
	color: #555;
	margin-top: 10px;
}
.loginbnt {
	display: block;
	height: 42px;
	border: 1px solid #db432e;
	line-height: 40px;
	font-size: 15px;
	color: #fff;
	padding: 0px 24px;
	background: #ec5541;
	border-radius: 5px;
	margin: 40px 0 60px 0;
}
.mb50 {
	display: block;
	margin-bottom: 50px;
}
.mb50:hover {
	color: red;
}
.blue {
	color: #7ecef4;
}
.green {
	color: #8fc31f;
}
.red {
	color: #ec5541;
}
.mui-bar {
	box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}

#header a {
	color: #aaa !important;
}
#header {
	background: #fff url(../img/food_beauty_top_bg.png);
	background-size: 100%;
	height: 50px;
}
#header .sever {
	font-weight: 400;

	margin: 0px 12%;

	font-size: 20px;
	text-align: center;
	display: block;
	top: 15px;
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
