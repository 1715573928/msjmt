<template>
	<div class="app-listt">
		<header id="header" class="mui-bar ">
			<h1>
				<input type="text"  class="sever" placeholder="搜索你感兴趣的" v-model="seve">
				<img src="../img/fangdaj.png"  alt="" @click="jump">
			</h1>
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"  @click="go"></a>
		</header>

		<div class="listtbody">
			<div
				class="pro_filter_items"
				style="border: 1px #eee solid;background: #fff;height: 30px;"
			>
				<a
					style="color: #aaa;font-size: 15px;padding-left: 85%;"
					href="javascript:"
					class="mui-icon-extra mui-icon-extra-filter"
					@click="xshij"
				>
					筛选
				</a>
			</div>
			<mt-popup v-model="popupVisible" popup-transition="popup-fade" position="right">
				<div class="filtrate fl">
					<div>
						制作筛选
						<span class="" @click="xshij">x</span>
					</div>
					<ul class="tree">
						<li>
							<span>选择难度</span>
							<div>
								<a
									:value="n[0]"
									v-for="(n, i) of nandu"
									:key="'n' + i"
									@click="shaixu(n[0])"
								>
									{{ n[1] }}
								</a>
							</div>
						</li>
						<li>
							<span>选择工艺</span>
							<div>
								<a
									:value="n[0]"
									v-for="(n, i) of goangyi"
									:key="'n' + i"
									@click="shaixu(n[0])"
								>
									{{ n[1] }}
								</a>
							</div>
						</li>
						<li>
							<span>选择口味</span>
							<div>
								<a
									:value="n[0]"
									v-for="(n, i) of kouwei"
									:key="'n' + i"
									@click="shaixu(n[0])"
								>
									{{ n[1] }}
								</a>
							</div>
						</li>
						<li>
							<span>选择时间</span>
							<div>
								<a
									:value="n[0]"
									v-for="(n, i) of shijian"
									:key="'n' + i"
									@click="shaixu(n[0])"
								>
									{{ n[1] }}
								</a>
							</div>
						</li>
					</ul>
				</div>
			</mt-popup>

			<div
				v-if="lists.length > 0"
				class="mui-card"
				v-for="(list, i) of lists"
				:key="i + 'list'"
			 @click="jumpInfo(list.mid)">
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
			</div>
			<div v-if="lists.length < 1">暂无该分类的菜谱哦</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			seve:'',
			lists: [],
			popupVisible: false,
			nandu: [
				[31, '新手尝试'],
				[32, '初级入门'],
				[33, '初中水平'],
				[34, '中级掌勺'],
				[35, '高级厨师'],
				[36, '厨神级']
			],
			goangyi: [
				[11, '炒'],
				[12, '蒸'],
				[13, '煮'],
				[14, '炖'],
				[15, '拌'],
				[16, '煎'],
				[17, '炸'],
				[18, '烘焙'],
				[19, '烤'],
				[10, '榨汁'],
				[111, '其他']
			],
			kouwei: [
				[21, '家常味'],
				[22, '辣味'],
				[23, '鲜味'],
				[24, '甜味'],
				[25, '酸味'],
				[26, '香味'],
				[27, '果味'],
				[28, '怪味'],
				[29, '其他']
			],
			shijian: [
				[51, '5分钟'],
				[52, '30分钟'],
				[53, '60分钟'],
				[54, '数小时'],
				[55, '一天'],
				[56, '数天']
			],
			mname:this.$route.query.mname,
			arrtid: undefined,
			pag: 1,
			num: 0
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
		shaixu(x) {
			this.arrtid = x;
			this.lists = [];
			this.pag = 1;
			this.dataut();
			this.xshij();
		},
		dataut() {
			var url =
				'http://127.0.0.1:3000/seek?name=' +
				this.mname +
				'&arrtid=' +
				this.arrtid +
				'&pag=' +
				this.pag;
			this.axios.get(url).then(data => {
				this.lists = this.lists.concat(data.data.data.list);
				this.num = data.data.data.mus;
				console.log(data.data.data);
			});
		},
		xshij() {
			if (this.popupVisible) this.popupVisible = false;
			else this.popupVisible = true;
		},
		loadTop() {
			this.$refs.loadmore.onTopLoaded();
		},
		loadBottom() {
			// load more data .../
			this.allLoaded = true; // if all data are loaded
			this.$refs.loadmore.onBottomLoaded();
		}
	},
	created() {
		this.dataut(),
			(window.onscroll = () => {
				//变量scrollTop是滚动条滚动时，距离顶部的距离
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
				var windowHeight =
					document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
				var scrollHeight =
					document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
				if (scrollTop + windowHeight == scrollHeight) {
					//写后台加载数据的函数
					if (this.num / this.pag > 12) {
						this.pag++;
						this.dataut();
					} else {
						Toast('暂无跟多数据');
					}
				}
			});
	}
};
</script>
<style scoped>
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
.app-listt #header {
	margin-bottom: 70px;
}

.app-listt #header a {
	color: #aaa !important;
}

.app-listt #header {
	background: #fff url(../img/food_beauty_top_bg.png);
	background-size: 100%;
	height: 50px;
}
.pro_filter_items {
	position: fixed;
	top: 50px;
	z-index: 999;
	width: 100%;
}

.app-listt .mui-card-media {
	height: 200px;
}
.app-listt .mui-card {
	width: 47%;
	display: inline-block;
	margin: 1%;
	border-radius: 5%;
}
.app-listt .mui-card-header > img {
	width: 100%;
	height: 100%;
	border-radius: 5%;
}
.app-listt .mui-card-content-inner {
	height: 50px;
	padding: 8px;
}
.app-listt .listtbody {
	margin-bottom: 50px;
	padding-top: 80px;
}
.app-listt .mui-bar {
	box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.mint-popup {
	width: 95%;
}
.filtrate {
	background: #fff;
	width: 100%;
	position: relative;
	top: 0px;
}
.filtrate > div > span {
	float: right;
	color: #000;
	font-size: 20px;
	margin-right: 10px;
	display: inline-block;
	border-radius: 50%;
	background: #eee;
	width: 20px;
	height: 20px;
	line-height: 20px;
	margin-top: 10px;
	margin-right: 8px;
	text-indent: 0px;
}
.filtrate > div,
.tree > li {
	line-height: 30px;
	color: #333;
	text-indent: 14px;
	font-size: 14px;
	border-bottom: 1px solid #ddd;
	width: 100%;
	list-style: none;
	margin: 0;
}
.filtrate > div {
	text-align: center;
	color: red;
	font-size: 15px;
}

.tree {
	list-style: none;
	padding: 0;
	margin: 0;
}

.tree li div {
	padding: 14px 0px 6px 14px;
	width: 100%;
	background: #fafafa;

	float: left;
}

.tree li div a {
	display: inline-block;
	float: left;
	margin: 0px 8px 8px 0px;
	display: block;
	height: 30px;
	width: 60px;
	border: 1px solid #eee;
	background: #fff;
	color: #333;
	line-height: 30px;
	font-size: 12px;
	text-align: center;
	overflow: hidden;
	text-indent: 0px;
	cursor: pointer;
}
.tree li img {
	margin: 23px 10px;
}
</style>
