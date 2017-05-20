var KEY_YEATERYS = "WODIAN_EATERYS";
var KEY_USER_INFO = "WODIAN_USER_INFO";
var KEY_CURRENT_ORDER = "CURRENT_ORDER";
angular.module("wodian", ['resource'])
	.controller("menuController", function($scope,ResourceFactory) {
		this.loadData = function() {
			var userStr = plus.storage.getItem(KEY_USER_INFO);
			var user = angular.fromJson(userStr);
			console.log("当前用户为：" + user.name);
			ResourceFactory.get("foods").get().then(function(data, status, headers, config) {
					$scope.foods = data.data;
				},function(data, status, headers, config) {
					mui.toast("获取商户菜单异常！")
				});
		};
		// 获取本地用户信息
		var that = this;
		mui.plusReady(function() {
			var userStr = plus.storage.getItem(KEY_USER_INFO);
			if (!userStr) { // 进入登录
				mui.toast("请先登陆！");
				var w = plus.webview.create("examples/login.html");
				w.show(); // 显示窗口
			} else {
				that.loadData();
			}
		});
	})
	.controller("loginController", function($scope, ResourceFactory) {
		$scope.user = {};

		this.login = function() {
			var userInfo = $scope.user;
			if (!angular.isString(userInfo.name)) {
				mui.toast("请填写用户姓名");
				return;
			}
			if (!angular.isString(userInfo.companyName)) {
				mui.toast("请填写群组");
				return;
			}
			if (!angular.isString(userInfo.companyNickName)) {
				mui.toast("请填写群组简称");
				return;
			}
			var imei = plus.device.imei;
			var uuid = plus.device.uuid;
			userInfo.imei = imei;
			userInfo.uuid = uuid;
			ResourceFactory.get("saveUser").get(userInfo)
				.then(function(data, status, headers, config) {
					plus.storage.setItem(KEY_USER_INFO, angular.toJson(data.data));
					var pv = plus.webview.getWebviewById("list");
					pv.reload();
					mui.back();
				},function(data, status, headers, config) {
					mui.toast(data.cause);
				});
		}
	});