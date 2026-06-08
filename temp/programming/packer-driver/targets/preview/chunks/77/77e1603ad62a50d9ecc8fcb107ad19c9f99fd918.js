System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, GameRuleSystem, _crd;

  _export("GameRuleSystem", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e544cZHTwJJ1qP68jds3ZdI", "GameRuleSystem", undefined);
      /**
       * 游戏规则系统 - 与KML项目完全相同的吃子规则逻辑
       */


      _export("GameRuleSystem", GameRuleSystem = class GameRuleSystem {
        constructor() {}

        static getInstance() {
          if (!GameRuleSystem.instance) {
            GameRuleSystem.instance = new GameRuleSystem();
          }

          return GameRuleSystem.instance;
        }
        /**
         * 过滤满足条件的吃子规则
         */


        filterKills(kills, selfPoints, rivalPoints, emptyPoints) {
          return kills.filter(item => {
            return item.self.every(child => selfPoints.some(it => it.point[0] === child[0] && it.point[1] === child[1])) && item.rival.every(child => rivalPoints.some(it => it.point[0] === child[0] && it.point[1] === child[1])) && item.empty.every(child => emptyPoints.some(it => it[0] === child[0] && it[1] === child[1]));
          });
        }
        /**
         * 检查当前位置是否可以吃掉对手的棋子
         * @param current 当前移动的棋子
         * @param oldList 棋盘上的所有棋子列表
         * @returns 返回被吃掉的棋子列表
         */


        checkKill(current, oldList) {
          // 定义所有棋位
          var allPoints = [];

          for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
              allPoints.push([i, j]);
            }
          } // 对手剩余棋子


          var rivalPoints = oldList.filter(item => item.type !== current.type); // 自己剩余棋子

          var selfPoints = oldList.filter(item => item.type === current.type); // 空余棋位

          var emptyPoints = allPoints.filter(item => oldList.every(child => !(item[0] === child.point[0] && item[1] === child.point[1])) && !(item[0] === current.point[0] && item[1] === current.point[1])); // 获取所有可能的吃子规则

          var allKills = this.getAllKillPatterns(current); // 过滤满足条件的规则

          var matchedKills = this.filterKills(allKills, selfPoints, rivalPoints, emptyPoints); // 提取被吃掉的棋子

          var killedPieces = [];

          for (var killPattern of matchedKills) {
            var _loop = function _loop(rivalPoint) {
              var killedPiece = oldList.find(item => item.point[0] === rivalPoint[0] && item.point[1] === rivalPoint[1]);

              if (killedPiece && !killedPieces.find(p => p === killedPiece)) {
                killedPieces.push(killedPiece);
              }
            };

            for (var rivalPoint of killPattern.rival) {
              _loop(rivalPoint);
            }
          }

          return killedPieces;
        }
        /**
         * 获取当前棋子可能的所有吃子规则
         */


        getAllKillPatterns(current) {
          var patterns = []; // 添加口袋杀规则

          patterns.push(...this.getPocketKillPatterns(current)); // 添加点炮杀规则

          patterns.push(...this.getFirecrackersKillPatterns(current)); // 添加双顶杀规则

          patterns.push(...this.getDoubleKillPatterns(current)); // 添加三顶杀规则

          patterns.push(...this.getTripleKillPatterns(current)); // 添加分割杀规则

          patterns.push(...this.getSegmentationKillPatterns(current)); // 添加双面杀规则

          patterns.push(...this.getClampKillPatterns(current)); // 添加对顶杀规则

          patterns.push(...this.getAgainstKillPatterns(current)); // 添加单挑杀规则

          patterns.push(...this.getPoleKillPatterns(current)); // 添加双夹杀规则

          patterns.push(...this.getSidesKillPatterns(current));
          return patterns;
        }
        /**
         * 口袋杀 - 4种变化
         */


        getPocketKillPatterns(current) {
          return [{
            type: 0,
            model: {
              current: [1, 1],
              self: [],
              rival: [[0, 0], [0, 1], [1, 0]],
              empty: []
            },
            self: [],
            rival: [[current.point[0] - 1, current.point[1] - 1], [current.point[0] - 1, current.point[1]], [current.point[0], current.point[1] - 1]],
            empty: []
          }, {
            type: 1,
            model: {
              current: [1, 0],
              self: [],
              rival: [[0, 0], [0, 1], [1, 1]],
              empty: []
            },
            self: [],
            rival: [[current.point[0] - 1, current.point[1]], [current.point[0] - 1, current.point[1] + 1], [current.point[0], current.point[1] + 1]],
            empty: []
          }, {
            type: 2,
            model: {
              current: [0, 1],
              self: [],
              rival: [[0, 0], [1, 0], [1, 1]],
              empty: []
            },
            self: [],
            rival: [[current.point[0], current.point[1] - 1], [current.point[0] + 1, current.point[1] - 1], [current.point[0] + 1, current.point[1]]],
            empty: []
          }, {
            type: 3,
            model: {
              current: [0, 0],
              self: [],
              rival: [[0, 1], [1, 1], [1, 0]],
              empty: []
            },
            self: [],
            rival: [[current.point[0], current.point[1] + 1], [current.point[0] + 1, current.point[1] + 1], [current.point[0] + 1, current.point[1]]],
            empty: []
          }];
        }
        /**
         * 点炮杀 - 4种变化
         */


        getFirecrackersKillPatterns(current) {
          return [{
            type: 0,
            model: {
              current: [0, 3],
              self: [],
              rival: [[0, 0], [0, 1], [0, 2]],
              empty: []
            },
            self: [],
            rival: [[current.point[0], current.point[1] - 3], [current.point[0], current.point[1] - 2], [current.point[0], current.point[1] - 1]],
            empty: []
          }, {
            type: 1,
            model: {
              current: [0, 0],
              self: [],
              rival: [[0, 1], [0, 2], [0, 3]],
              empty: []
            },
            self: [],
            rival: [[current.point[0], current.point[1] + 1], [current.point[0], current.point[1] + 2], [current.point[0], current.point[1] + 3]],
            empty: []
          }, {
            type: 2,
            model: {
              current: [3, 0],
              self: [],
              rival: [[0, 0], [1, 0], [2, 0]],
              empty: []
            },
            self: [],
            rival: [[current.point[0] - 3, current.point[1]], [current.point[0] - 2, current.point[1]], [current.point[0] - 1, current.point[1]]],
            empty: []
          }, {
            type: 3,
            model: {
              current: [0, 0],
              self: [],
              rival: [[1, 0], [2, 0], [3, 0]],
              empty: []
            },
            self: [],
            rival: [[current.point[0] + 1, current.point[1]], [current.point[0] + 2, current.point[1]], [current.point[0] + 3, current.point[1]]],
            empty: []
          }];
        }
        /**
         * 双顶杀 - 16种变化
         */


        getDoubleKillPatterns(current) {
          return [{
            type: 0,
            model: {
              current: [0, 2],
              self: [[0, 1]],
              rival: [[0, 0]],
              empty: [[0, 3]]
            },
            self: [[current.point[0], current.point[1] - 1]],
            rival: [[current.point[0], current.point[1] - 2]],
            empty: [[current.point[0], current.point[1] + 1]]
          }, {
            type: 1,
            model: {
              current: [0, 3],
              self: [[0, 2]],
              rival: [[0, 1]],
              empty: [[0, 0]]
            },
            self: [[current.point[0], current.point[1] - 1]],
            rival: [[current.point[0], current.point[1] - 2]],
            empty: [[current.point[0], current.point[1] - 3]]
          }, {
            type: 2,
            model: {
              current: [0, 2],
              self: [[0, 1]],
              rival: [[0, 3]],
              empty: [[0, 0]]
            },
            self: [[current.point[0], current.point[1] - 1]],
            rival: [[current.point[0], current.point[1] + 1]],
            empty: [[current.point[0], current.point[1] - 2]]
          }, {
            type: 3,
            model: {
              current: [0, 1],
              self: [[0, 0]],
              rival: [[0, 2]],
              empty: [[0, 3]]
            },
            self: [[current.point[0], current.point[1] - 1]],
            rival: [[current.point[0], current.point[1] + 1]],
            empty: [[current.point[0], current.point[1] + 2]]
          }, {
            type: 4,
            model: {
              current: [0, 1],
              self: [[0, 2]],
              rival: [[0, 3]],
              empty: [[0, 0]]
            },
            self: [[current.point[0], current.point[1] + 1]],
            rival: [[current.point[0], current.point[1] + 2]],
            empty: [[current.point[0], current.point[1] - 1]]
          }, {
            type: 5,
            model: {
              current: [0, 0],
              self: [[0, 1]],
              rival: [[0, 2]],
              empty: [[0, 3]]
            },
            self: [[current.point[0], current.point[1] + 1]],
            rival: [[current.point[0], current.point[1] + 2]],
            empty: [[current.point[0], current.point[1] + 3]]
          }, {
            type: 6,
            model: {
              current: [0, 1],
              self: [[0, 2]],
              rival: [[0, 0]],
              empty: [[0, 3]]
            },
            self: [[current.point[0], current.point[1] + 1]],
            rival: [[current.point[0], current.point[1] - 1]],
            empty: [[current.point[0], current.point[1] + 2]]
          }, {
            type: 7,
            model: {
              current: [0, 2],
              self: [[0, 3]],
              rival: [[0, 1]],
              empty: [[0, 0]]
            },
            self: [[current.point[0], current.point[1] + 1]],
            rival: [[current.point[0], current.point[1] - 1]],
            empty: [[current.point[0], current.point[1] - 2]]
          }, {
            type: 8,
            model: {
              current: [2, 0],
              self: [[1, 0]],
              rival: [[0, 0]],
              empty: [[3, 0]]
            },
            self: [[current.point[0] - 1, current.point[1]]],
            rival: [[current.point[0] - 2, current.point[1]]],
            empty: [[current.point[0] + 1, current.point[1]]]
          }, {
            type: 9,
            model: {
              current: [3, 0],
              self: [[2, 0]],
              rival: [[1, 0]],
              empty: [[0, 0]]
            },
            self: [[current.point[0] - 1, current.point[1]]],
            rival: [[current.point[0] - 2, current.point[1]]],
            empty: [[current.point[0] - 3, current.point[1]]]
          }, {
            type: 10,
            model: {
              current: [2, 0],
              self: [[1, 0]],
              rival: [[3, 0]],
              empty: [[0, 0]]
            },
            self: [[current.point[0] - 1, current.point[1]]],
            rival: [[current.point[0] + 1, current.point[1]]],
            empty: [[current.point[0] - 2, current.point[1]]]
          }, {
            type: 11,
            model: {
              current: [1, 0],
              self: [[0, 0]],
              rival: [[2, 0]],
              empty: [[3, 0]]
            },
            self: [[current.point[0] - 1, current.point[1]]],
            rival: [[current.point[0] + 1, current.point[1]]],
            empty: [[current.point[0] + 2, current.point[1]]]
          }, {
            type: 12,
            model: {
              current: [1, 0],
              self: [[2, 0]],
              rival: [[3, 0]],
              empty: [[0, 0]]
            },
            self: [[current.point[0] + 1, current.point[1]]],
            rival: [[current.point[0] + 2, current.point[1]]],
            empty: [[current.point[0] - 1, current.point[1]]]
          }, {
            type: 13,
            model: {
              current: [0, 0],
              self: [[1, 0]],
              rival: [[2, 0]],
              empty: [[3, 0]]
            },
            self: [[current.point[0] + 1, current.point[1]]],
            rival: [[current.point[0] + 2, current.point[1]]],
            empty: [[current.point[0] + 3, current.point[1]]]
          }, {
            type: 14,
            model: {
              current: [1, 0],
              self: [[2, 0]],
              rival: [[0, 0]],
              empty: [[3, 0]]
            },
            self: [[current.point[0] + 1, current.point[1]]],
            rival: [[current.point[0] - 1, current.point[1]]],
            empty: [[current.point[0] + 2, current.point[1]]]
          }, {
            type: 15,
            model: {
              current: [2, 0],
              self: [[3, 0]],
              rival: [[1, 0]],
              empty: [[0, 0]]
            },
            self: [[current.point[0] + 1, current.point[1]]],
            rival: [[current.point[0] - 1, current.point[1]]],
            empty: [[current.point[0] - 2, current.point[1]]]
          }];
        }
        /**
         * 三顶杀 - 12种变化
         */


        getTripleKillPatterns(current) {
          return [{
            type: 0,
            model: {
              current: [0, 3],
              self: [[0, 2], [0, 1]],
              rival: [[0, 0]],
              empty: []
            },
            self: [[current.point[0], current.point[1] - 1], [current.point[0], current.point[1] - 2]],
            rival: [[current.point[0], current.point[1] - 3]],
            empty: []
          }, {
            type: 1,
            model: {
              current: [0, 2],
              self: [[0, 1], [0, 3]],
              rival: [[0, 0]],
              empty: []
            },
            self: [[current.point[0], current.point[1] - 1], [current.point[0], current.point[1] + 1]],
            rival: [[current.point[0], current.point[1] - 2]],
            empty: []
          }, {
            type: 2,
            model: {
              current: [0, 1],
              self: [[0, 2], [0, 3]],
              rival: [[0, 0]],
              empty: []
            },
            self: [[current.point[0], current.point[1] + 1], [current.point[0], current.point[1] + 2]],
            rival: [[current.point[0], current.point[1] - 1]],
            empty: []
          }, {
            type: 3,
            model: {
              current: [0, 0],
              self: [[0, 1], [0, 2]],
              rival: [[0, 3]],
              empty: []
            },
            self: [[current.point[0], current.point[1] + 1], [current.point[0], current.point[1] + 2]],
            rival: [[current.point[0], current.point[1] + 3]],
            empty: []
          }, {
            type: 4,
            model: {
              current: [0, 1],
              self: [[0, 0], [0, 2]],
              rival: [[0, 3]],
              empty: []
            },
            self: [[current.point[0], current.point[1] - 1], [current.point[0], current.point[1] + 1]],
            rival: [[current.point[0], current.point[1] + 2]],
            empty: []
          }, {
            type: 5,
            model: {
              current: [0, 2],
              self: [[0, 1], [0, 0]],
              rival: [[0, 3]],
              empty: []
            },
            self: [[current.point[0], current.point[1] - 1], [current.point[0], current.point[1] - 2]],
            rival: [[current.point[0], current.point[1] + 1]],
            empty: []
          }, {
            type: 6,
            model: {
              current: [3, 0],
              self: [[2, 0], [1, 0]],
              rival: [[0, 0]],
              empty: []
            },
            self: [[current.point[0] - 1, current.point[1]], [current.point[0] - 2, current.point[1]]],
            rival: [[current.point[0] - 3, current.point[1]]],
            empty: []
          }, {
            type: 7,
            model: {
              current: [2, 0],
              self: [[1, 0], [3, 0]],
              rival: [[0, 0]],
              empty: []
            },
            self: [[current.point[0] - 1, current.point[1]], [current.point[0] + 1, current.point[1]]],
            rival: [[current.point[0] - 2, current.point[1]]],
            empty: []
          }, {
            type: 8,
            model: {
              current: [1, 0],
              self: [[2, 0], [3, 0]],
              rival: [[0, 0]],
              empty: []
            },
            self: [[current.point[0] + 1, current.point[1]], [current.point[0] + 2, current.point[1]]],
            rival: [[current.point[0] - 1, current.point[1]]],
            empty: []
          }, {
            type: 9,
            model: {
              current: [0, 0],
              self: [[1, 0], [2, 0]],
              rival: [[3, 0]],
              empty: []
            },
            self: [[current.point[0] + 1, current.point[1]], [current.point[0] + 2, current.point[1]]],
            rival: [[current.point[0] + 3, current.point[1]]],
            empty: []
          }, {
            type: 10,
            model: {
              current: [1, 0],
              self: [[0, 0], [2, 0]],
              rival: [[3, 0]],
              empty: []
            },
            self: [[current.point[0] - 1, current.point[1]], [current.point[0] + 1, current.point[1]]],
            rival: [[current.point[0] + 2, current.point[1]]],
            empty: []
          }, {
            type: 11,
            model: {
              current: [2, 0],
              self: [[0, 0], [1, 0]],
              rival: [[3, 0]],
              empty: []
            },
            self: [[current.point[0] - 1, current.point[1]], [current.point[0] - 2, current.point[1]]],
            rival: [[current.point[0] + 1, current.point[1]]],
            empty: []
          }];
        }
        /**
         * 分割杀 - 4种变化
         */


        getSegmentationKillPatterns(current) {
          return [{
            type: 0,
            model: {
              current: [0, 1],
              self: [[0, 2]],
              rival: [[0, 0], [0, 3]],
              empty: []
            },
            self: [[current.point[0], current.point[1] + 1]],
            rival: [[current.point[0], current.point[1] - 1], [current.point[0], current.point[1] + 2]],
            empty: []
          }, {
            type: 1,
            model: {
              current: [0, 2],
              self: [[0, 1]],
              rival: [[0, 0], [0, 3]],
              empty: []
            },
            self: [[current.point[0], current.point[1] - 1]],
            rival: [[current.point[0], current.point[1] - 2], [current.point[0], current.point[1] + 1]],
            empty: []
          }, {
            type: 2,
            model: {
              current: [1, 0],
              self: [[2, 0]],
              rival: [[0, 0], [3, 0]],
              empty: []
            },
            self: [[current.point[0] + 1, current.point[1]]],
            rival: [[current.point[0] - 1, current.point[1]], [current.point[0] + 2, current.point[1]]],
            empty: []
          }, {
            type: 3,
            model: {
              current: [2, 0],
              self: [[1, 0]],
              rival: [[0, 0], [3, 0]],
              empty: []
            },
            self: [[current.point[0] - 1, current.point[1]]],
            rival: [[current.point[0] - 2, current.point[1]], [current.point[0] + 1, current.point[1]]],
            empty: []
          }];
        }
        /**
         * 双面杀 - 4种变化
         */


        getClampKillPatterns(current) {
          return [{
            type: 0,
            model: {
              current: [0, 0],
              self: [[0, 3]],
              rival: [[0, 1], [0, 2]],
              empty: []
            },
            self: [[current.point[0], current.point[1] + 3]],
            rival: [[current.point[0], current.point[1] + 1], [current.point[0], current.point[1] + 2]],
            empty: []
          }, {
            type: 1,
            model: {
              current: [0, 3],
              self: [[0, 0]],
              rival: [[0, 2], [0, 1]],
              empty: []
            },
            self: [[current.point[0], current.point[1] - 3]],
            rival: [[current.point[0], current.point[1] - 1], [current.point[0], current.point[1] - 2]],
            empty: []
          }, {
            type: 2,
            model: {
              current: [0, 0],
              self: [[3, 0]],
              rival: [[1, 0], [2, 0]],
              empty: []
            },
            self: [[current.point[0] + 3, current.point[1]]],
            rival: [[current.point[0] + 1, current.point[1]], [current.point[0] + 2, current.point[1]]],
            empty: []
          }, {
            type: 3,
            model: {
              current: [3, 0],
              self: [[0, 0]],
              rival: [[2, 0], [1, 0]],
              empty: []
            },
            self: [[current.point[0] - 3, current.point[1]]],
            rival: [[current.point[0] - 1, current.point[1]], [current.point[0] - 2, current.point[1]]],
            empty: []
          }];
        }
        /**
         * 对顶杀 - 8种变化
         */


        getAgainstKillPatterns(current) {
          return [{
            type: 0,
            model: {
              current: [0, 0],
              self: [[0, 1]],
              rival: [[0, 2], [0, 3]],
              empty: []
            },
            self: [[current.point[0], current.point[1] + 1]],
            rival: [[current.point[0], current.point[1] + 2], [current.point[0], current.point[1] + 3]],
            empty: []
          }, {
            type: 1,
            model: {
              current: [0, 1],
              self: [[0, 0]],
              rival: [[0, 2], [0, 3]],
              empty: []
            },
            self: [[current.point[0], current.point[1] - 1]],
            rival: [[current.point[0], current.point[1] + 1], [current.point[0], current.point[1] + 2]],
            empty: []
          }, {
            type: 2,
            model: {
              current: [0, 2],
              self: [[0, 3]],
              rival: [[0, 1], [0, 0]],
              empty: []
            },
            self: [[current.point[0], current.point[1] + 1]],
            rival: [[current.point[0], current.point[1] - 1], [current.point[0], current.point[1] - 2]],
            empty: []
          }, {
            type: 3,
            model: {
              current: [0, 3],
              self: [[0, 2]],
              rival: [[0, 1], [0, 0]],
              empty: []
            },
            self: [[current.point[0], current.point[1] - 1]],
            rival: [[current.point[0], current.point[1] - 2], [current.point[0], current.point[1] - 3]],
            empty: []
          }, {
            type: 4,
            model: {
              current: [0, 0],
              self: [[1, 0]],
              rival: [[2, 0], [3, 0]],
              empty: []
            },
            self: [[current.point[0] + 1, current.point[1]]],
            rival: [[current.point[0] + 2, current.point[1]], [current.point[0] + 3, current.point[1]]],
            empty: []
          }, {
            type: 5,
            model: {
              current: [1, 0],
              self: [[0, 0]],
              rival: [[2, 0], [3, 0]],
              empty: []
            },
            self: [[current.point[0] - 1, current.point[1]]],
            rival: [[current.point[0] + 1, current.point[1]], [current.point[0] + 2, current.point[1]]],
            empty: []
          }, {
            type: 6,
            model: {
              current: [2, 0],
              self: [[3, 0]],
              rival: [[1, 0], [0, 0]],
              empty: []
            },
            self: [[current.point[0] + 1, current.point[1]]],
            rival: [[current.point[0] - 1, current.point[1]], [current.point[0] - 2, current.point[1]]],
            empty: []
          }, {
            type: 7,
            model: {
              current: [3, 0],
              self: [[2, 0]],
              rival: [[1, 0], [0, 0]],
              empty: []
            },
            self: [[current.point[0] - 1, current.point[1]]],
            rival: [[current.point[0] - 2, current.point[1]], [current.point[0] - 3, current.point[1]]],
            empty: []
          }];
        }
        /**
         * 单挑杀 - 4种变化
         */


        getPoleKillPatterns(current) {
          return [{
            type: 0,
            model: {
              current: [0, 1],
              self: [],
              rival: [[0, 0], [0, 2]],
              empty: [[0, 3]]
            },
            self: [],
            rival: [[current.point[0], current.point[1] - 1], [current.point[0], current.point[1] + 1]],
            empty: [[current.point[0], current.point[1] + 2]]
          }, {
            type: 1,
            model: {
              current: [0, 2],
              self: [],
              rival: [[0, 1], [0, 3]],
              empty: [[0, 0]]
            },
            self: [],
            rival: [[current.point[0], current.point[1] - 1], [current.point[0], current.point[1] + 1]],
            empty: [[current.point[0], current.point[1] - 2]]
          }, {
            type: 2,
            model: {
              current: [1, 0],
              self: [],
              rival: [[0, 0], [2, 0]],
              empty: [[3, 0]]
            },
            self: [],
            rival: [[current.point[0] - 1, current.point[1]], [current.point[0] + 1, current.point[1]]],
            empty: [[current.point[0] + 2, current.point[1]]]
          }, {
            type: 3,
            model: {
              current: [2, 0],
              self: [],
              rival: [[1, 0], [3, 0]],
              empty: [[0, 0]]
            },
            self: [],
            rival: [[current.point[0] - 1, current.point[1]], [current.point[0] + 1, current.point[1]]],
            empty: [[current.point[0] - 2, current.point[1]]]
          }];
        }
        /**
         * 双夹杀 - 8种变化
         */


        getSidesKillPatterns(current) {
          return [{
            type: 0,
            model: {
              current: [0, 0],
              self: [[0, 2]],
              rival: [[0, 1]],
              empty: [[0, 3]]
            },
            self: [[current.point[0], current.point[1] + 2]],
            rival: [[current.point[0], current.point[1] + 1]],
            empty: [[current.point[0], current.point[1] + 3]]
          }, {
            type: 1,
            model: {
              current: [0, 2],
              self: [[0, 0]],
              rival: [[0, 1]],
              empty: [[0, 3]]
            },
            self: [[current.point[0], current.point[1] - 2]],
            rival: [[current.point[0], current.point[1] - 1]],
            empty: [[current.point[0], current.point[1] + 1]]
          }, {
            type: 2,
            model: {
              current: [0, 1],
              self: [[0, 3]],
              rival: [[0, 2]],
              empty: [[0, 0]]
            },
            self: [[current.point[0], current.point[1] + 2]],
            rival: [[current.point[0], current.point[1] + 1]],
            empty: [[current.point[0], current.point[1] - 1]]
          }, {
            type: 3,
            model: {
              current: [0, 3],
              self: [[0, 1]],
              rival: [[0, 2]],
              empty: [[0, 0]]
            },
            self: [[current.point[0], current.point[1] - 2]],
            rival: [[current.point[0], current.point[1] - 1]],
            empty: [[current.point[0], current.point[1] - 3]]
          }, {
            type: 4,
            model: {
              current: [0, 0],
              self: [[2, 0]],
              rival: [[1, 0]],
              empty: [[3, 0]]
            },
            self: [[current.point[0] + 2, current.point[1]]],
            rival: [[current.point[0] + 1, current.point[1]]],
            empty: [[current.point[0] + 3, current.point[1]]]
          }, {
            type: 5,
            model: {
              current: [2, 0],
              self: [[0, 0]],
              rival: [[1, 0]],
              empty: [[3, 0]]
            },
            self: [[current.point[0] - 2, current.point[1]]],
            rival: [[current.point[0] - 1, current.point[1]]],
            empty: [[current.point[0] + 1, current.point[1]]]
          }, {
            type: 6,
            model: {
              current: [1, 0],
              self: [[3, 0]],
              rival: [[2, 0]],
              empty: [[0, 0]]
            },
            self: [[current.point[0] + 2, current.point[1]]],
            rival: [[current.point[0] + 1, current.point[1]]],
            empty: [[current.point[0] - 1, current.point[1]]]
          }, {
            type: 7,
            model: {
              current: [3, 0],
              self: [[1, 0]],
              rival: [[2, 0]],
              empty: [[0, 0]]
            },
            self: [[current.point[0] - 2, current.point[1]]],
            rival: [[current.point[0] - 1, current.point[1]]],
            empty: [[current.point[0] - 3, current.point[1]]]
          }];
        }

      });

      GameRuleSystem.instance = void 0;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=77e1603ad62a50d9ecc8fcb107ad19c9f99fd918.js.map