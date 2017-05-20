angular.module("resource",[]).provider("resourceConfig",function() {
	this.server = "http://192.168.0.102/WoDianServer/service/";
	this.initConfig = function() {
		this.config = {};
		this.config["saveUser"] = {path:"saveUser.json",server:""};
		this.config["foods"] = {path:"foods.json",server:""};
		this.config["eaterys"] = {path:"eaterys.json",server:""};
		this.config["userInfo"] = {path:"userInfo.json",server:""};
		this.config["sendBill"] = {path:"sendBill.json",server:""};
	}
	this.initConfig();
	this.$get = function() {
		var config = this.config;
		var server = this.server;
		return {
			getConfig : function(key) {
				return config[key];
			},
			getServer : function() {
				return server;
			}
		};
	}
	
}).factory("ResourceFactory",function($http, $q, resourceConfig) {
	
	function Resource(config) {
		var server = config.server;
		if (!server) {
			server = resourceConfig.getServer();
		}
		this.action = server + config.path;
		this.header = {};
		this.params = {};
		this.addHeader = function(key,value) {
			this.header[key] = value;
		};
		this.addParam = function(key,value) {
			this.params[key] = value;
		};
		this.post = function(tmpParams) {
			this.gatherHeader();
			if (tmpParams) {
				 angular.extend(this.params,tmpParams);
			}
			var delay = $q.defer();
			var data = {};
			data["header"] = this.header;
			data["params"] = this.params;
			$http.post(this.action, data)
			.success(function(data, status, headers, config) {

				if (data.code !== "100") {
					delay.reject(data, status, headers, config);
				} else {
					delay.resolve(data, status, headers, config); 
				}

			}).error(function(data, status, headers, config) {
				delay.reject(data, status, headers, config);
			});

			return delay.promise;
			
		};
		this.get = function(tmpParams) {
			this.gatherHeader();
			if (tmpParams) {
				 angular.extend(this.params,tmpParams);
			}
			var delay = $q.defer();
			var data = {};
			data["header"] = this.header;
			data["params"] = this.params;
			$http.get(this.action, data).success(function(data, status, headers, config) {

				if (data.code !== "100") {
					delay.reject(data, status, headers, config);
				} else {
					delay.resolve(data, status, headers, config); 
				}

			}).error(function(data, status, headers, config) {
				delay.reject(data, status, headers, config);
			});

			return delay.promise;
		};
		this.gatherHeader = function() {
			
		}
	};
	
	return {
		get : function(rName) {
			if (!rName) {
				return null;
			}
			var conf = resourceConfig.getConfig(rName);
			if (!conf || !conf.path) {
				return null;
			}
			return new Resource(conf);
		}
	};
});
