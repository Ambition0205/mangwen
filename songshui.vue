<template>
	<view style="display: flex;flex-direction: row;"> 
		<view style="flex: 1;flex-flow:column; " class="cont" @click="decreaseCart(product,parentId,type)"  v-show="product && product.count>0">
			<image src="/static/des.png" style="width: 27px;height: 27px;"></image>
		</view>
		<text style="padding: 0 10px;line-height: 27px;" v-show="product && product.count>0">{{product.count}}</text>
		
		<view style="flex: 1;flex-flow:column; " class="cont" @click="addCart(product,parentId,type)">
			<image src="/static/add.png" style="width: 27px;height: 27px;color: #CCCCCC;" mode=""></image>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		props: {
			product: {
				type: Object,
			},
			type:{
				type:Number,
				default:0
			},
			parentId:{
				type:String ,
				default:''
			}
		},
		data() {
			return {
			};
		},
		methods: {
			addCart: function(item,parentId,type) { 
				Vue.set(item, 'parentId', parentId)
				Vue.set(item, 'type', type)
				this.$emit('add',item)
			},
			decreaseCart(item,parentId,type) {
				Vue.set(item, 'parentId', parentId)
				Vue.set(item, 'type', type)
				this.$emit('dec',item)
			}
		}
	}
</script>

<style scoped> 

	.cont {
		width: 22px;
		height: 22px;
		line-height: 22px;
		box-sizing: border-box;
		border-radius: 50%;
		text-align: center;
	}
</style>
