<template>
	<div class="app-detail">
		<header id="header" class="mui-bar">
			<h1></h1>
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"  @click="go"></a>
		</header>
		<div class="head">
			<img :src="`http://127.0.0.1:3000/${datas.endp}`" width="100%" alt="" />
			<div class="headtext">
				<div style="font-size: 20px;">{{datas.mtitle}}</div>
				<div style="font-size: 10px;">
					上传时间：
					<span>{{datas.time|datatimeFilter}}</span>
					&nbsp;&nbsp;&nbsp;浏览量：
					<span>{{datas.dianj}}</span>
				</div>
				<p>
			{{datas.story}}
				</p>
			</div>
			<div class="detasx">
				<div>
					<div>
						<img src="../img/recipe_detailrl.png" alt="" />
						<div>{{datas.diffculty}}</div>
					</div>
					<div>
						<img src="../img/recipe_detail_sz.png" alt="" />
						<div>{{datas.craft}}</div>
					</div>
					<div>
						<img src="../img/recipe_detail_wd.png" alt="" />
						<div>{{datas.taste}}</div>
					</div>
					<div>
						<img src="../img/recipe_detail_time.png" alt="" />
						<div>{{datas.rtime}}</div>
					</div>
				</div>
			</div>
			<div style="clear: both; padding-bottom: 15px;"></div>
		</div>
		<div class="detabody">
			<div id="yongliao" class="procl" style="margin-bottom: 25px;">
				<div class="prozl1">
					<span>主料</span>
					<ul class="fr">
						<li v-for="(data,i) of datas.material" :key="'mat'+i">
							<div class="clzl">
								<div class="fl clzlname">{{data[0]}}</div>
								<div class="fr clzlyl">{{data[1]}}</div>
							</div>
						</li>
					</ul>
				</div>
				<div style="clear: both;"></div>
				<div class="clfl">
					<span>辅料</span>
					<ul class="fr">
						<li v-for="(data,i) of datas.acc" :key="'acc'+i">
							<div class="clzl">
								<div class="fl clzlname">{{data[0]}}</div>
								<div class="fr clzlyl">{{data[1]}}</div>
							</div>
						</li>
					</ul>
					<div style="clear: both;"></div>
				</div>
			</div>
			<div class="buzhou">
				<div v-for="(data,i) of datas.step" :key="'step'+i" class="buzhou1" style="margin-bottom: 20px;">
					<div style="position: relative;">
						<img
							:src="`http://127.0.0.1:3000/${data[1]}`"
							width="100%"
							alt=""
						/>
						<div
							style="position: absolute;top: 15px;background: #fff;width: 85px;height: 40px;border-top-right-radius:50px;border-bottom-right-radius:50px;line-height: 40px;text-indent: 10px;"
						>
							步骤{{data[0]}}
						</div>
					</div>
					<div class="buzhounr" style="text-indent: 35px;color: #555;padding: 10px 10px;">
						{{data[2]}}
					</div>
				</div>
				
			</div>
			<div style="margin-left: 10px;margin-bottom: 10px;font-size: 18px;">成品图</div>
			<div><img :src="`http://127.0.0.1:3000/${datas.finall}`" width="100%" alt="" /></div>
			<div style="margin:20px 10px;">烹饪技巧</div>
			<div style="text-indent: 35px;color: #555;padding:0 10px 10px 10px;">
				{{datas.skill}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			mid: this.$route.query.mid,
			datas: []
		};
	},
	methods: {
		go(){
			history.go(-1);
		},
		dataut() {
			var url = 'http://127.0.0.1:3000/lest?mid=' + this.mid;
			this.axios.get(url).then(data => {
				this.datas = data.data.data[0];
				console.log(this.datas);
				this.datas.material=eval("("+this.datas.material+")");
this.datas.acc = eval("("+this.datas.acc+")");
this.datas.step=eval("("+this.datas.step+")");

			});
		}
	},
	created() {
		this.dataut();
	}
};
</script>

<style scoped>
ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.procl span {
	font-size: 18px;
	color: #555;
}
.detabody {
	margin-top: 10px;
}
.procl {
	width: 370px;
	padding: 15px;
	box-sizing: border-box;
	background: #eee;
}
.prozl1 {
	margin-bottom: 20px;
}
.clzl {
	height: 21px;
	padding: 20px 5px;
	border-top: 1px solid #bbb;
	margin-top: 5px;
}
.clzl > div:first-child {
	float: left;
}
.clzlname {
	color: #666;
	font-size: 16px;
}
.clzlyl {
	display: block;
	color: #999;
	text-align: right;
	padding-right: 14px;
}
.clfl,
.prozl1 {
	padding-top: 10px;
}
.detabody li {
	padding-bottom: 5px;

}

/* .detabody {
	padding: 15px;
} */
.detasx > div > div {
	float: left;
	width: 25%;
	text-align: center;
}
.detasx > div > div > img {
	width: 45px;
}
.headtext > * {
	margin: 15px;
}
.headtext > p {
	text-indent: 20px;
}
.app-detail{
	margin-bottom: 50px;
}
#header{
	box-shadow: 0 0 0px 
}
.app-detail #header a {
	color: #aaa !important;
}
.app-detail #header {
	background: rgba(0, 0, 0, 0);
	background-size: 100%;
	height: 50px;
}
.app-detail #header .mui-bar {
	position: fixed;
	z-index: 10;
	right: 0;
	left: 0;
	height: 44px;
	padding-right: 10px;
	padding-left: 10px;
	border-bottom: 0;
	background-color: #f7f7f7;
	/* -webkit-box-shadow: 0 0 0px rgba(0, 0, 0, .85); !important */

	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}
</style>
