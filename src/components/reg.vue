<template>
	<div>
		<header id="header" class="mui-bar ">
			<h1  class="sever" >
				注册美食杰
			</h1>
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"  @click="go"></a>
			
		</header>
		<div id="body">
			<div id="login1">
				<div class="loginhard">
					
				</div>
				<div class="loginbody">
					<div id="ehintt" style="color:#ec5541;">{{ phint }}</div>
					<div class=""><input type="text" class="text1" id="email" placeholder="请输入手机号/邮箱/昵称" v-model="email"  @blur.prevent="changeCount()"/></div>
					<div id="ehint" :style="{ color: ehintt1 }">{{ ehintt }}</div>
					<div class=""><input type="password" class="password" id="pwd" placeholder="请输入密码" v-model="pwd" /></div>
					<div id="phint" :style="{ color: ehint1 }">{{ ehint }}</div>
					<div class=""><input type="password" class="password"  id="agpwd" placeholder="请再次输入密码" v-model="agpwd"></div>
					<div id="ahint" :style="{ color: ehintt2 }">{{ ehinttt }}</div>
					<div class="gd fl">
						<input type="checkbox" id="deal" checked>我已阅读并且同意<span>美食杰用户使用协议</span>
					</div>
					<div style=" clear: both;"></div>
					<div>
						<a id="sbm" class="loginbnt" @click="dataut">注册</a>
					</div>
					<a class="mb50" href="login.html">
						已有账号？马上登陆</a>
					<table></table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			ehinttt:"",
			ulist: [],
			agpwd:"",
			ehintt2:"",
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
		changeCount(){
			var url = "http://127.0.0.1:3000/detail?email=" + this.email;
			this.axios.get(url).then(data => {
				console.log(data.data)
				if(data.data==0){
					if (this.re.test(this.email)) {
						this.ehintt = '邮箱格式正确';
						this.ehintt1 = '#8fc31f';
					} else {
						this.phint = '';
						this.ehintt = '请输入正确的邮箱格式';
						this.ehintt1 = '#7ecef4';
					}
					
				}else {
					this.ehintt = '该邮箱已经被注册';
					this.ehintt1 = '#ec5541';
				}
			});
			
			
		
		},
		dataut() {
			if(this.ehintt != '邮箱格式正确'){
				Toast('邮箱格式不正确');
				return;
			};
			if(this.ehint != '密码格式正确'){
				Toast('密码格式不正确');
				return;
			};
			if(this.ehinttt != '两次密码输入相同'){
				Toast('两次密码输入不同');
				return;
			};
			var url = "http://localhost:3000/reg";
			var data = `email=${this.email}&upwd=${this.pwd}`;
			this.axios.post(url, data).then(data => {
				if (data.data.code < 0) {
					
				} else {
					this.$router.push("/login")
					
				}
			});
		},
		dataut1() {
			console.log(this.a)
			var url = 'http://localhost:3000/uidlist?uid='+this.a ;
console.log(url)
			this.axios.get(url).then(data => {
				this.ulist = data.data.data;
				console.log(123123123);
				// console.log(this.ulist)
			});
		},
		
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
		},
		agpwd() {
			
			if (this.pwd.length==0) {
				this.phint = '';
				this.ehinttt = '请先输入密码';
				this.ehintt2 = '#ec5541';
			} else if(this.pwd==this.agpwd){
				this.phint = '';
				this.ehinttt = '两次密码输入相同';
				this.ehintt2 = '#8fc31f';
				
			}else{
				this.phint = '';
				this.ehinttt = '两次密码输入不同';
				this.ehintt2 = '#7ecef4';
			}
		}
	}
};
</script>


<style>
	#login1{
	    margin:0px auto;
	    
	}
	.loginhard{
	    padding: 50px 0;
	    margin:0px auto;
	    text-align: center;
	    font-size: 20px;
	}
	.loginbody{
	    width: 300px;
	    margin: 0 auto;
	    text-align: center;
	}
	.text1,.password{
	    height: 22px;
	    border: 1px solid #ddd;
	    border-radius: 4px;
	    line-height: 22px;
	    font-size: 14px;
	    color: #333;
	    padding: 11px;
	    width: 276px;
	    margin:11px 0px;
	}
	.gd {
		
		font-size: 13px;
		color: #555;
		margin-top: 10px;
	}
	.loginbnt{
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
	.mb50{
	    display: block;
	    margin-bottom: 50px;
	}
	.mb50:hover{
	    color: red;
	}
	.blue{
	    color:#7ecef4;
	}
	.green{
	    color: #8fc31f;
	}
	.red{
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
