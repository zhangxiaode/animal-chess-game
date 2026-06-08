System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Singleton, _crd, singletonInstances;

  _export("Singleton", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "478ddKTTZZAXbTgb3IOA9Pi", "Singleton", undefined);

      singletonInstances = new WeakMap();

      _export("Singleton", Singleton = class Singleton {
        constructor() {}

        static getInstance() {
          if (!singletonInstances.has(this)) {
            singletonInstances.set(this, new this());
          }

          return singletonInstances.get(this);
        }

        static destroyInstance() {
          singletonInstances.delete(this);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b8da35b56d1023f35a5ca3c3935c1f34238dca05.js.map