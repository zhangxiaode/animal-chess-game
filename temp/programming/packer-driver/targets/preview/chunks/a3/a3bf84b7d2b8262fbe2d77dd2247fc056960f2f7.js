System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, UserSystem, _crd;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  _export("UserSystem", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d4874pxD4ZLALMLeXOHJFXZ", "UserSystem", undefined);
      /**
       * 用户系统 - 管理用户信息
       * 包含用户名、等级(星数)、头像等信息
       * 游戏启动时自动创建或读取用户数据，数据存储在本地
       */


      _export("UserSystem", UserSystem = class UserSystem {
        constructor() {
          this.userData = null;
        }

        static getInstance() {
          if (!UserSystem.instance) {
            UserSystem.instance = new UserSystem();
          }

          return UserSystem.instance;
        }
        /**
         * 初始化用户系统 - 游戏启动时调用
         * 优先读取本地数据，如果不存在则创建新用户
         */


        initialize() {
          // 尝试从本地读取用户数据
          var storedData = this.loadFromLocalStorage();

          if (storedData) {
            this.userData = storedData; // 更新最后登录时间

            this.userData.lastLoginTime = Date.now();
            this.saveToLocalStorage();
            console.log("\u7528\u6237\u767B\u5F55\u6210\u529F: " + this.userData.username);
            return this.userData;
          } // 本地不存在用户数据，创建新用户


          var newUser = this.createNewUser();
          this.userData = newUser;
          this.saveToLocalStorage();
          console.log("\u65B0\u7528\u6237\u521B\u5EFA\u6210\u529F: " + this.userData.username);
          return newUser;
        }
        /**
         * 创建新用户
         */


        createNewUser() {
          return {
            userId: this.generateUserId(),
            username: this.generateDefaultUsername(),
            stars: 0,
            avatarUrl: null,
            createTime: Date.now(),
            lastLoginTime: Date.now()
          };
        }
        /**
         * 生成用户ID (UUID)
         */


        generateUserId() {
          return Date.now() + "-" + Math.random().toString(36).substring(2, 9);
        }
        /**
         * 生成默认用户名
         */


        generateDefaultUsername() {
          var adjectives = ['神秘', '勇敢', '聪慧', '俊美', '高尚', '优雅', '威武', '睿智', '灿烂', '非凡', '杰出', '伟大'];
          var nouns = ['剑客', '骑士', '术士', '猎手', '盗贼', '圣骑', '法师', '射手', '战士', '智者', '诗人', '骑兵'];
          var randomNum = Math.floor(Math.random() * 10000);
          var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
          var noun = nouns[Math.floor(Math.random() * nouns.length)];
          return "" + adjective + noun + randomNum;
        }
        /**
         * 修改用户名
         */


        setUsername(newUsername) {
          if (!this.userData) {
            console.error('用户数据未初始化');
            return false;
          }

          if (!newUsername || newUsername.trim().length === 0) {
            console.error('用户名不能为空');
            return false;
          }

          if (newUsername.length > UserSystem.MAX_USERNAME_LENGTH) {
            console.error("\u7528\u6237\u540D\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7 " + UserSystem.MAX_USERNAME_LENGTH + " \u4E2A\u5B57\u7B26");
            return false;
          }

          this.userData.username = newUsername.trim();
          this.saveToLocalStorage();
          console.log("\u7528\u6237\u540D\u5DF2\u4FEE\u6539\u4E3A: " + this.userData.username);
          return true;
        }
        /**
         * 获取用户名
         */


        getUsername() {
          var _this$userData$userna, _this$userData;

          return (_this$userData$userna = (_this$userData = this.userData) == null ? void 0 : _this$userData.username) != null ? _this$userData$userna : '未知用户';
        }
        /**
         * 获取用户ID
         */


        getUserId() {
          var _this$userData$userId, _this$userData2;

          return (_this$userData$userId = (_this$userData2 = this.userData) == null ? void 0 : _this$userData2.userId) != null ? _this$userData$userId : '';
        }
        /**
         * 获取用户星数
         */


        getStars() {
          var _this$userData$stars, _this$userData3;

          return (_this$userData$stars = (_this$userData3 = this.userData) == null ? void 0 : _this$userData3.stars) != null ? _this$userData$stars : 0;
        }
        /**
         * 设置用户星数
         */


        setStars(stars) {
          if (!this.userData) {
            console.error('用户数据未初始化');
            return false;
          }

          if (stars < 0) {
            console.error('星数不能为负数');
            return false;
          }

          this.userData.stars = stars;
          this.saveToLocalStorage();
          return true;
        }
        /**
         * 添加星数
         */


        addStars(count) {
          if (!this.userData) {
            console.error('用户数据未初始化');
            return 0;
          }

          if (count < 0) {
            console.error('添加的星数不能为负数');
            return this.userData.stars;
          }

          this.userData.stars += count;
          this.saveToLocalStorage();
          console.log("\u6DFB\u52A0\u4E86 " + count + " \u9897\u661F\uFF0C\u5F53\u524D\u603B\u661F\u6570: " + this.userData.stars);
          return this.userData.stars;
        }
        /**
         * 扣除星数
         */


        removeStars(count) {
          if (!this.userData) {
            console.error('用户数据未初始化');
            return 0;
          }

          if (count < 0) {
            console.error('扣除的星数不能为负数');
            return this.userData.stars;
          }

          this.userData.stars = Math.max(0, this.userData.stars - count);
          this.saveToLocalStorage();
          console.log("\u6263\u9664\u4E86 " + count + " \u9897\u661F\uFF0C\u5F53\u524D\u603B\u661F\u6570: " + this.userData.stars);
          return this.userData.stars;
        }
        /**
         * 设置用户头像
         */


        setAvatarUrl(url) {
          if (!this.userData) {
            console.error('用户数据未初始化');
            return false;
          }

          this.userData.avatarUrl = url;
          this.saveToLocalStorage();
          return true;
        }
        /**
         * 获取用户头像
         */


        getAvatarUrl() {
          var _this$userData$avatar, _this$userData4;

          return (_this$userData$avatar = (_this$userData4 = this.userData) == null ? void 0 : _this$userData4.avatarUrl) != null ? _this$userData$avatar : null;
        }
        /**
         * 获取完整用户数据
         */


        getUserData() {
          return this.userData ? _extends({}, this.userData) : null;
        }
        /**
         * 获取用户详细信息
         */


        getUserDetails() {
          if (!this.userData) return null;
          return {
            userId: this.userData.userId,
            username: this.userData.username,
            stars: this.userData.stars,
            avatarUrl: this.userData.avatarUrl,
            createTime: new Date(this.userData.createTime).toLocaleString(),
            lastLoginTime: new Date(this.userData.lastLoginTime).toLocaleString()
          };
        }
        /**
         * 重置用户数据（恢复初始状态）
         */


        resetUserData() {
          this.userData = this.createNewUser();
          this.saveToLocalStorage();
          console.log('用户数据已重置');
        }
        /**
         * 删除用户数据
         */


        deleteUserData() {
          this.userData = null;
          this.clearLocalStorage();
          console.log('用户数据已删除');
        }
        /**
         * 保存数据到本地存储
         */


        saveToLocalStorage() {
          try {
            if (this.userData) {
              var dataJson = JSON.stringify(this.userData);
              localStorage.setItem(UserSystem.STORAGE_KEY, dataJson);
            }
          } catch (error) {
            console.error('保存用户数据到本地存储失败:', error);
          }
        }
        /**
         * 从本地存储读取数据
         */


        loadFromLocalStorage() {
          try {
            var dataJson = localStorage.getItem(UserSystem.STORAGE_KEY);

            if (dataJson) {
              var data = JSON.parse(dataJson); // 验证数据的完整性

              if (this.isValidUserData(data)) {
                return data;
              }
            }
          } catch (error) {
            console.error('从本地存储读取用户数据失败:', error);
          }

          return null;
        }
        /**
         * 清除本地存储
         */


        clearLocalStorage() {
          try {
            localStorage.removeItem(UserSystem.STORAGE_KEY);
          } catch (error) {
            console.error('清除本地存储失败:', error);
          }
        }
        /**
         * 验证用户数据的完整性
         */


        isValidUserData(data) {
          return data && typeof data.userId === 'string' && typeof data.username === 'string' && typeof data.stars === 'number' && typeof data.createTime === 'number' && typeof data.lastLoginTime === 'number';
        }
        /**
         * 导出用户数据为JSON
         */


        exportUserData() {
          if (!this.userData) {
            return '{}';
          }

          return JSON.stringify(this.userData, null, 2);
        }
        /**
         * 导入用户数据（用于数据恢复）
         */


        importUserData(jsonData) {
          try {
            var data = JSON.parse(jsonData);

            if (this.isValidUserData(data)) {
              this.userData = data;
              this.saveToLocalStorage();
              console.log('用户数据导入成功');
              return true;
            } else {
              console.error('用户数据格式不正确');
              return false;
            }
          } catch (error) {
            console.error('导入用户数据失败:', error);
            return false;
          }
        }

      });

      UserSystem.instance = void 0;
      UserSystem.STORAGE_KEY = 'kuaimaolan_user_data';
      UserSystem.MAX_USERNAME_LENGTH = 20;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a3bf84b7d2b8262fbe2d77dd2247fc056960f2f7.js.map