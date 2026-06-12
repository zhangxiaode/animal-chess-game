System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, Node, Graphics, UITransform, Color, Vec3, UIManager, SoundManager, _dec, _class, _crd, ccclass, RULE_ITEMS, RulesPage;

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "../framework/UIManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "../framework/SoundManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Button = _cc.Button;
      Label = _cc.Label;
      Node = _cc.Node;
      Graphics = _cc.Graphics;
      UITransform = _cc.UITransform;
      Color = _cc.Color;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      UIManager = _unresolved_2.UIManager;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b22660fvNpFAoBrPZC+1Ktl", "RulesPage", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'Label', 'Node', 'Graphics', 'UITransform', 'Color', 'Vec3']);

      ({
        ccclass
      } = _decorator);
      RULE_ITEMS = [{
        text: '1、口袋杀：白子可杀同一田字方格内的其余三子',
        pattern: [],
        rows: [['black', 'black'], ['black', 'white']]
      }, {
        text: '2、点炮杀：白子可杀同一行内的连续三子',
        pattern: ['black', 'black', 'black', 'white']
      }, {
        text: '3、双顶杀：连续两个白子可杀同一行内紧挨着的黑子，要求剩余为空位',
        pattern: ['black', 'white', 'white', 'empty']
      }, {
        text: '4、三顶杀：连续三个白子可杀同一行内剩余的黑子',
        pattern: ['black', 'white', 'white', 'white']
      }, {
        text: '5、分割杀：中间两个白子可杀同一行内两边的黑子',
        pattern: ['black', 'white', 'white', 'black']
      }, {
        text: '6、双面杀：两边的两个白子可杀同一行内中间的两个黑子',
        pattern: ['white', 'black', 'black', 'white']
      }, {
        text: '7、对顶杀：一边的两个白子可杀同一行内另一边的两个黑子',
        pattern: ['black', 'black', 'white', 'white']
      }, {
        text: '8、单挑杀：单个白子可杀同一行内白子两边的两个黑子，要求另一子为空',
        pattern: ['black', 'white', 'black', 'empty']
      }, {
        text: '9、双夹杀：两个白子可杀同一行内白子中间的一个黑子，要求另一子为空',
        pattern: ['white', 'black', 'white', 'empty']
      }];

      _export("RulesPage", RulesPage = (_dec = ccclass('RulesPage'), _dec(_class = class RulesPage extends Component {
        constructor() {
          super(...arguments);
          this._backBtn = null;
        }

        start() {
          this._createUI();
        }

        _createUI() {
          var _pageSize$width, _pageSize$height;

          var pageRoot = this.node;
          var pageTransform = pageRoot.getComponent(UITransform);
          var pageSize = pageTransform == null ? void 0 : pageTransform.contentSize;
          var pageWidth = (_pageSize$width = pageSize == null ? void 0 : pageSize.width) != null ? _pageSize$width : 640;
          var pageHeight = (_pageSize$height = pageSize == null ? void 0 : pageSize.height) != null ? _pageSize$height : 960;
          var contentScale = Math.min(1.35, Math.max(1, pageWidth / 720));
          var backgroundNode = new Node('Background');
          backgroundNode.parent = pageRoot;
          backgroundNode.setPosition(Vec3.ZERO);
          backgroundNode.addComponent(UITransform).setContentSize(pageWidth, pageHeight);
          var backgroundGraphics = backgroundNode.addComponent(Graphics);
          backgroundGraphics.fillColor = new Color(238, 238, 238, 255);
          backgroundGraphics.rect(-pageWidth / 2, -pageHeight / 2, pageWidth, pageHeight);
          backgroundGraphics.fill();
          var titleNode = new Node('Title');
          titleNode.parent = pageRoot;
          titleNode.setPosition(new Vec3(0, pageHeight / 2 - 118 * contentScale, 0));
          titleNode.addComponent(UITransform).setContentSize(460, 104);
          var titleLabel = titleNode.addComponent(Label);
          titleLabel.string = '游戏规则';
          titleLabel.fontSize = Math.round(48 * contentScale);
          titleLabel.lineHeight = Math.round(58 * contentScale);
          titleLabel.color = new Color(40, 40, 40, 255);
          titleLabel.verticalAlign = Label.VerticalAlign.CENTER;
          var subtitleNode = new Node('Subtitle');
          subtitleNode.parent = pageRoot;
          subtitleNode.setPosition(new Vec3(0, pageHeight / 2 - 190 * contentScale, 0));
          subtitleNode.addComponent(UITransform).setContentSize(460, 48);
          var subtitleLabel = subtitleNode.addComponent(Label);
          subtitleLabel.string = '暂定敌方黑子，我方白子';
          subtitleLabel.fontSize = Math.round(24 * contentScale);
          subtitleLabel.color = new Color(70, 70, 70, 255);
          var dividerNode = new Node('Divider');
          dividerNode.parent = pageRoot;
          dividerNode.setPosition(new Vec3(0, pageHeight / 2 - 236 * contentScale, 0));
          dividerNode.addComponent(UITransform).setContentSize(pageWidth - 72, 2);
          var dividerGraphics = dividerNode.addComponent(Graphics);
          dividerGraphics.strokeColor = new Color(185, 185, 185, 255);
          dividerGraphics.lineWidth = 2;
          dividerGraphics.moveTo(-(pageWidth - 72) / 2, 0);
          dividerGraphics.lineTo((pageWidth - 72) / 2, 0);
          dividerGraphics.stroke();
          var listTopY = pageHeight / 2 - 306 * contentScale;
          var leftPadding = Math.round(34 * contentScale);
          var rightPadding = Math.round(34 * contentScale);
          var iconWidth = Math.round(102 * contentScale);
          var iconHeight = Math.round(68 * contentScale);
          var iconGap = Math.round(20 * contentScale);
          var textWidth = pageWidth - leftPadding - rightPadding - iconWidth - iconGap;
          var backButtonBottomOffset = Math.round(54 * contentScale);
          var backButtonTopSpace = Math.round(96 * contentScale);
          var listBottomY = -pageHeight / 2 + backButtonBottomOffset + backButtonTopSpace;
          var rowHeight = Math.max(78, Math.floor((listTopY - listBottomY) / RULE_ITEMS.length));
          RULE_ITEMS.forEach((item, index) => {
            var rowNode = new Node("RuleRow" + (index + 1));
            rowNode.parent = pageRoot;
            rowNode.setPosition(new Vec3(0, listTopY - rowHeight / 2 - index * rowHeight, 0));
            rowNode.addComponent(UITransform).setContentSize(pageWidth - leftPadding - rightPadding, rowHeight);
            var iconNode = new Node("RuleIcon" + (index + 1));
            iconNode.parent = rowNode;
            iconNode.setPosition(new Vec3(-pageWidth / 2 + leftPadding + iconWidth / 2, 0, 0));
            iconNode.addComponent(UITransform).setContentSize(iconWidth, iconHeight);

            this._drawRuleIcon(iconNode, item);

            var textNode = new Node("RuleText" + (index + 1));
            textNode.parent = rowNode;
            textNode.setPosition(new Vec3(-pageWidth / 2 + leftPadding + iconWidth + iconGap + textWidth / 2, 0, 0));
            textNode.addComponent(UITransform).setContentSize(textWidth, rowHeight);
            var textLabel = textNode.addComponent(Label);
            textLabel.string = item.text;
            textLabel.fontSize = Math.round(26 * contentScale);
            textLabel.lineHeight = Math.round(34 * contentScale);
            textLabel.color = new Color(40, 40, 40, 255);
            textLabel.overflow = Label.Overflow.RESIZE_HEIGHT;
            textLabel.verticalAlign = Label.VerticalAlign.CENTER;
            textLabel.horizontalAlign = Label.HorizontalAlign.LEFT;
          });
          var backBtnNode = new Node('BackBtn');
          backBtnNode.parent = pageRoot;
          backBtnNode.setPosition(new Vec3(0, -pageHeight / 2 + backButtonBottomOffset, 0));
          backBtnNode.addComponent(UITransform).setContentSize(Math.round(180 * contentScale), Math.round(62 * contentScale));
          var backGraphics = backBtnNode.addComponent(Graphics);
          backGraphics.fillColor = new Color(115, 165, 220, 255);
          backGraphics.roundRect(-90 * contentScale, -31 * contentScale, 180 * contentScale, 62 * contentScale, 16 * contentScale);
          backGraphics.fill();
          backGraphics.strokeColor = new Color(70, 120, 180, 255);
          backGraphics.lineWidth = 2;
          backGraphics.roundRect(-90 * contentScale, -31 * contentScale, 180 * contentScale, 62 * contentScale, 16 * contentScale);
          backGraphics.stroke();
          this._backBtn = backBtnNode.addComponent(Button);
          this._backBtn.interactable = true;

          this._backBtn.node.on(Button.EventType.CLICK, this._onBack, this);

          var backLabelNode = new Node('Label');
          backLabelNode.parent = backBtnNode;
          backLabelNode.addComponent(UITransform);
          var backLabel = backLabelNode.addComponent(Label);
          backLabel.string = '返回';
          backLabel.fontSize = Math.round(28 * contentScale);
          backLabel.color = new Color(255, 255, 255, 255);
        }

        _drawRuleIcon(iconNode, item) {
          var _iconTransform$conten, _iconTransform$conten2;

          var graphics = iconNode.addComponent(Graphics);
          var iconTransform = iconNode.getComponent(UITransform);
          var width = (_iconTransform$conten = iconTransform == null ? void 0 : iconTransform.contentSize.width) != null ? _iconTransform$conten : 102;
          var height = (_iconTransform$conten2 = iconTransform == null ? void 0 : iconTransform.contentSize.height) != null ? _iconTransform$conten2 : 68;
          graphics.fillColor = new Color(221, 181, 118, 255);
          graphics.rect(-width / 2, -height / 2, width, height);
          graphics.fill();
          graphics.strokeColor = new Color(138, 100, 45, 255);
          graphics.lineWidth = 1;

          if (item.rows) {
            this._drawGrid(graphics, width, height, 2, 2);

            var _stepX = width / 2;

            var stepY = height / 2;

            for (var row = 0; row < item.rows.length; row++) {
              for (var col = 0; col < item.rows[row].length; col++) {
                var x = -width / 2 + _stepX * (col + 0.5);
                var y = height / 2 - stepY * (row + 0.5);

                this._drawPiece(graphics, x, y, item.rows[row][col]);
              }
            }

            return;
          }

          var columns = item.pattern.length;

          this._drawGrid(graphics, width, height, columns, 1);

          var stepX = width / columns;

          for (var _col = 0; _col < columns; _col++) {
            var _x = -width / 2 + stepX * (_col + 0.5);

            this._drawPiece(graphics, _x, 0, item.pattern[_col]);
          }
        }

        _drawGrid(graphics, width, height, columns, rows) {
          for (var col = 0; col <= columns; col++) {
            var x = -width / 2 + width / columns * col;
            graphics.moveTo(x, -height / 2);
            graphics.lineTo(x, height / 2);
          }

          for (var row = 0; row <= rows; row++) {
            var y = -height / 2 + height / rows * row;
            graphics.moveTo(-width / 2, y);
            graphics.lineTo(width / 2, y);
          }

          graphics.stroke();
        }

        _drawPiece(graphics, x, y, piece) {
          if (piece === 'empty') {
            return;
          }

          var radius = 8.5;
          graphics.fillColor = piece === 'black' ? new Color(0, 0, 0, 255) : new Color(255, 255, 255, 255);
          graphics.circle(x, y, radius);
          graphics.fill();

          if (piece === 'white') {
            graphics.strokeColor = new Color(170, 170, 170, 255);
            graphics.lineWidth = 1;
            graphics.circle(x, y, radius);
            graphics.stroke();
          }
        }

        onShow() {
          console.log('规则页显示');
        }

        _onBack() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().backPage();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6667e0b77234e83ab6d321cc849150030c26b545.js.map