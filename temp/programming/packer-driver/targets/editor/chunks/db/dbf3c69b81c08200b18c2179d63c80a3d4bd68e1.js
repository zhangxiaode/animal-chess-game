System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, GameRuleSystem, AIOpponentSystem, _crd;

  function _reportPossibleCrUseOfRankPhase(extras) {
    _reporterNs.report("RankPhase", "./RankSystem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRankTier(extras) {
    _reporterNs.report("RankTier", "./RankSystem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameRuleSystem(extras) {
    _reporterNs.report("GameRuleSystem", "./GameRuleSystem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPosition(extras) {
    _reporterNs.report("Position", "./GameRuleSystem", _context.meta, extras);
  }

  _export("AIOpponentSystem", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      GameRuleSystem = _unresolved_2.GameRuleSystem;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "89a2fYCDSJJP6Cs+M+WkiDh", "AIOpponentSystem", undefined);

      _export("AIOpponentSystem", AIOpponentSystem = class AIOpponentSystem {
        constructor() {
          this.ruleSystem = void 0;
          this.ruleSystem = (_crd && GameRuleSystem === void 0 ? (_reportPossibleCrUseOfGameRuleSystem({
            error: Error()
          }), GameRuleSystem) : GameRuleSystem).getInstance();
        }

        static getInstance() {
          if (!AIOpponentSystem.instance) {
            AIOpponentSystem.instance = new AIOpponentSystem();
          }

          return AIOpponentSystem.instance;
        }

        chooseMove(board, aiType, playerType, tier, phase) {
          const empties = this.getEmptyCells(board);

          if (empties.length === 0) {
            return null;
          }

          const difficulty = this.getDifficulty(tier, phase);
          const candidates = [];

          for (let i = 0; i < empties.length; i++) {
            const cell = empties[i];
            const aiResult = this.simulateMove(board, cell.row, cell.col, aiType);
            const opponentMaxKill = this.getMaxKillForSide(aiResult.board, playerType);
            const centerScore = this.getCenterScore(cell.row, cell.col);
            const score = aiResult.kills * difficulty.captureWeight - opponentMaxKill * difficulty.dangerWeight + centerScore * difficulty.centerWeight;
            candidates.push({
              row: cell.row,
              col: cell.col,
              score
            });
          }

          candidates.sort((a, b) => b.score - a.score);
          const topCount = Math.min(difficulty.randomTopCount, candidates.length);
          const pickIndex = Math.floor(Math.random() * topCount);
          const picked = candidates[pickIndex];
          return {
            row: picked.row,
            col: picked.col
          };
        }

        chooseStepMove(board, aiType, playerType, tier, phase) {
          const legalMoves = this.getLegalStepMoves(board, aiType);

          if (legalMoves.length === 0) {
            return null;
          }

          const difficulty = this.getDifficulty(tier, phase);
          const candidates = [];

          for (let i = 0; i < legalMoves.length; i++) {
            const move = legalMoves[i];
            const simulatedBoard = this.cloneBoard(board);
            simulatedBoard[move.fromRow][move.fromCol] = 0;
            const aiResult = this.simulateMove(simulatedBoard, move.toRow, move.toCol, aiType);
            const opponentMaxKill = this.getMaxKillForSide(aiResult.board, playerType);
            const centerScore = this.getCenterScore(move.toRow, move.toCol);
            const score = aiResult.kills * difficulty.captureWeight - opponentMaxKill * difficulty.dangerWeight + centerScore * difficulty.centerWeight;
            candidates.push({
              fromRow: move.fromRow,
              fromCol: move.fromCol,
              toRow: move.toRow,
              toCol: move.toCol,
              score
            });
          }

          candidates.sort((a, b) => b.score - a.score);
          const topCount = Math.min(difficulty.randomTopCount, candidates.length);
          const pickIndex = Math.floor(Math.random() * topCount);
          const picked = candidates[pickIndex];
          return {
            fromRow: picked.fromRow,
            fromCol: picked.fromCol,
            toRow: picked.toRow,
            toCol: picked.toCol
          };
        }

        shouldCapture(tier, phase) {
          const level = tier * 3 + phase; // 低段位存在一定概率放弃吃子，高段位几乎必吃

          const captureChance = Math.min(0.95, 0.55 + level * 0.02);
          return Math.random() < captureChance;
        }

        getDifficulty(tier, phase) {
          const level = tier * 3 + phase; // 0 ~ 20

          return {
            captureWeight: 9 + level * 0.9,
            dangerWeight: 5 + level * 0.8,
            centerWeight: 2 + level * 0.15,
            // 低段位随机性更大，高段位更接近最优
            randomTopCount: Math.max(1, 5 - Math.floor(level / 5))
          };
        }

        simulateMove(board, row, col, pieceType) {
          const copiedBoard = this.cloneBoard(board);
          copiedBoard[row][col] = pieceType;
          const list = this.boardToPieceList(copiedBoard);
          const current = {
            point: [row, col],
            type: pieceType
          };
          const kills = this.ruleSystem.checkKill(current, list);

          for (let i = 0; i < kills.length; i++) {
            const p = kills[i];
            copiedBoard[p.point[0]][p.point[1]] = 0;
          }

          return {
            board: copiedBoard,
            kills: kills.length
          };
        }

        getMaxKillForSide(board, pieceType) {
          const empties = this.getEmptyCells(board);
          let maxKill = 0;

          for (let i = 0; i < empties.length; i++) {
            const cell = empties[i];
            const result = this.simulateMove(board, cell.row, cell.col, pieceType);

            if (result.kills > maxKill) {
              maxKill = result.kills;
            }
          }

          return maxKill;
        }

        getCenterScore(row, col) {
          // 4x4 棋盘中心偏好：中间四点分更高
          const centerTargets = [[1, 1], [1, 2], [2, 1], [2, 2]];

          for (let i = 0; i < centerTargets.length; i++) {
            if (centerTargets[i][0] === row && centerTargets[i][1] === col) {
              return 2;
            }
          }

          const edge = row === 0 || row === 3 || col === 0 || col === 3;
          return edge ? 0.5 : 1;
        }

        getEmptyCells(board) {
          const cells = [];

          for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
              if (board[row][col] === 0) {
                cells.push({
                  row,
                  col
                });
              }
            }
          }

          return cells;
        }

        getLegalStepMoves(board, pieceType) {
          const moves = [];
          const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

          for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
              if (board[row][col] !== pieceType) continue;

              for (let i = 0; i < dirs.length; i++) {
                const nextRow = row + dirs[i][0];
                const nextCol = col + dirs[i][1];
                if (nextRow < 0 || nextRow >= 4 || nextCol < 0 || nextCol >= 4) continue;
                if (board[nextRow][nextCol] !== 0) continue;
                moves.push({
                  fromRow: row,
                  fromCol: col,
                  toRow: nextRow,
                  toCol: nextCol
                });
              }
            }
          }

          return moves;
        }

        boardToPieceList(board) {
          const list = [];

          for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
              const type = board[row][col];

              if (type !== 0) {
                list.push({
                  point: [row, col],
                  type
                });
              }
            }
          }

          return list;
        }

        cloneBoard(board) {
          const copied = [];

          for (let i = 0; i < board.length; i++) {
            copied[i] = [];

            for (let j = 0; j < board[i].length; j++) {
              copied[i][j] = board[i][j];
            }
          }

          return copied;
        }

      });

      AIOpponentSystem.instance = void 0;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=dbf3c69b81c08200b18c2179d63c80a3d4bd68e1.js.map