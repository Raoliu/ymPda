<template>
	<view>
		<view class="page_header">
			<view class="header_item" v-for="(item,index) in pageList" @click="changePageNum(index)">
				<image v-if="pageNum==index" :src="item.imgUrl_c" mode="aspectFill"></image>
				<image v-else :src="item.imgUrl" mode="aspectFill"></image>
				<p :style="pageNum==index?'color:#3B57EA':'color:#000'">{{item.label}}</p>
			</view>
		</view>
		<retrieval v-if="pageNum==0"></retrieval>
		<warehouseing v-else-if="pageNum==1"></warehouseing>
		<cantact v-else-if="pageNum==2"></cantact>
		<dataPage v-else-if="pageNum==3"></dataPage>
	</view>
</template>

<script>
	import retrieval from '../../pages/retrieval/retrieval.vue'
	import warehouseing from '../../pages/warehouseing/warehouseing.vue'
	import cantact from '../../pages/cantact/cantact.vue'
	import dataPage from '../../pages/dataPage/dataPage.vue'
	export default {
		components:{
			retrieval,
			warehouseing,
			cantact,
			dataPage
		},
		data() {
			return {
				pageNum:0,
				pageList:[{
					imgUrl:'../../static/image/retrieval.png',
					imgUrl_c:'../../static/image/retrieval_c.png',
					label:'出库',
				},{
					imgUrl:'../../static/image/warehouseing.png',
					imgUrl_c:'../../static/image/warehouseing_c.png',
					label:'入库',
				},{
					imgUrl:'../../static/image/contact.png',
					imgUrl_c:'../../static/image/contact_c.png',
					label:'关联',
				},{
					imgUrl:'../../static/image/data.png',
					imgUrl_c:'../../static/image/data_c.png',
					label:'数据',
				}]
			}
		},
		methods: {
			changePageNum(index){
				this.pageNum = index
			}
		}
	}
</script>

<style>
	.page_header{
		display: flex;
		flex-direction: row;
		padding-top: 10rpx;
		font-size: 30rpx;
		/* color: #3B57EA; */
	}
	.header_item image{
		margin: 0rpx auto;
		width: 50rpx;
		height: 50rpx;
	}
.header_item{
	width: 25%;
	text-align: center;
	display: flex;
	flex-direction: column;
}
</style>
