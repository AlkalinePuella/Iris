// Name: 临时数组
// ID: mukyuTempArrays
// Description: 创建临时的运行时数组或线程数组。
// License: MIT

(function (Scratch) {
  "use strict";

  const label = (name, hidden) => ({
    blockType: Scratch.BlockType.LABEL,
    text: name,
    hideFromPalette: hidden,
  });

  // Object.create(null) avoids prototype pollution on user-controlled keys.
  const newStore = () => Object.create(null);

  class TempArrays {
    constructor() {
      this.runtimeArrays = newStore();

      Scratch.vm.runtime.on("PROJECT_START", () => {
        this.resetRuntimeArrays();
      });
      Scratch.vm.runtime.on("PROJECT_STOP_ALL", () => {
        this.resetRuntimeArrays();
      });
    }

    /* ---------- helpers ---------- */

    // Thread arrays live on the thread object, exactly like the example's
    // thread variables: each clone / hat invocation gets its own store.
    _threadStore(util) {
      const thread = util.thread;
      if (!thread.arrays) {
        thread.arrays = newStore();
      }
      return thread.arrays;
    }

    _getArray(store, name, create = true) {
      if (!Object.prototype.hasOwnProperty.call(store, name)) {
        if (!create) return null;
        store[name] = [];
      }
      return store[name];
    }

    getInfo() {
      return {
        id: "mukyuTempArrays",
        name: "临时数组",
        color1: "#FF791A",
        color2: "#E15D00",
        blocks: [
          label("线程数组", false),

          {
            opcode: "createThreadArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "新建线程数组 [VAR]",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "addToThreadArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "将 [STRING] 加入线程数组 [VAR]",
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "insertIntoThreadArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "在线程数组 [VAR] 的第 [INDEX] 项前插入 [STRING]",
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "replaceInThreadArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "将线程数组 [VAR] 的第 [INDEX] 项替换为 [STRING]",
            arguments: {
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
            },
          },
          {
            opcode: "deleteFromThreadArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "删除线程数组 [VAR] 的第 [INDEX] 项",
            arguments: {
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },

          "---",

          {
            opcode: "getThreadArrayItem",
            blockType: Scratch.BlockType.REPORTER,
            text: "线程数组 [VAR] 的第 [INDEX] 项",
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "getThreadArrayLength",
            blockType: Scratch.BlockType.REPORTER,
            text: "线程数组 [VAR] 的长度",
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "threadArrayContains",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "线程数组 [VAR] 包含 [STRING] ?",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
            },
          },
          {
            opcode: "indexInThreadArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "[STRING] 在线程数组 [VAR] 中的位置",
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "joinThreadArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "用 [SEP] 连接线程数组 [VAR]",
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
              SEP: { type: Scratch.ArgumentType.STRING, defaultValue: "," },
            },
          },

          "---",

          {
            opcode: "forEachThreadArrayItem",
            blockType: Scratch.BlockType.LOOP,
            text: "遍历线程数组 [VAR] 项存入 [ITEM] 下标存入 [INDEX]",
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: "item" },
              INDEX: { type: Scratch.ArgumentType.STRING, defaultValue: "index" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "threadArrayExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "线程数组 [VAR] 存在?",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "clearThreadArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "清空线程数组 [VAR]",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "deleteThreadArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "删除线程数组 [VAR]",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "listThreadArrays",
            blockType: Scratch.BlockType.REPORTER,
            text: "当前线程数组",
            disableMonitor: true,
          },

          "---",

          label("运行时数组", false),

          {
            opcode: "createRuntimeArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "新建运行时数组 [VAR]",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "addToRuntimeArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "将 [STRING] 加入运行时数组 [VAR]",
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "insertIntoRuntimeArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "在运行时数组 [VAR] 的第 [INDEX] 项前插入 [STRING]",
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "replaceInRuntimeArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "将运行时数组 [VAR] 的第 [INDEX] 项替换为 [STRING]",
            arguments: {
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
            },
          },
          {
            opcode: "deleteFromRuntimeArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "删除运行时数组 [VAR] 的第 [INDEX] 项",
            arguments: {
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },

          "---",

          {
            opcode: "getRuntimeArrayItem",
            blockType: Scratch.BlockType.REPORTER,
            text: "运行时数组 [VAR] 的第 [INDEX] 项",
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "getRuntimeArrayLength",
            blockType: Scratch.BlockType.REPORTER,
            text: "运行时数组 [VAR] 的长度",
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "runtimeArrayContains",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "运行时数组 [VAR] 包含 [STRING] ?",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
            },
          },
          {
            opcode: "indexInRuntimeArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "[STRING] 在运行时数组 [VAR] 中的位置",
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "joinRuntimeArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "用 [SEP] 连接运行时数组 [VAR]",
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
              SEP: { type: Scratch.ArgumentType.STRING, defaultValue: "," },
            },
          },

          "---",

          {
            opcode: "forEachRuntimeArrayItem",
            blockType: Scratch.BlockType.LOOP,
            text: "遍历运行时数组 [VAR] 项存入 [ITEM] 下标存入 [INDEX]",
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: "item" },
              INDEX: { type: Scratch.ArgumentType.STRING, defaultValue: "index" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "runtimeArrayExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "运行时数组 [VAR] 存在?",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "clearRuntimeArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "清空运行时数组 [VAR]",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "deleteRuntimeArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "删除运行时数组 [VAR]",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "array" },
            },
          },
          {
            opcode: "deleteAllRuntimeArrays",
            func: "resetRuntimeArrays",
            blockType: Scratch.BlockType.COMMAND,
            text: "删除所有运行时数组",
          },
          {
            opcode: "listRuntimeArrays",
            blockType: Scratch.BlockType.REPORTER,
            text: "当前运行时数组",
            disableMonitor: true,
          },
        ],
      };
    }

    /* ---------- shared array operations ---------- */

    _create(store, name) {
      store[name] = [];
    }

    _add(store, name, value) {
      this._getArray(store, name).push(value);
    }

    _insert(store, name, index, value) {
      const arr = this._getArray(store, name);
      let i = Math.floor(Scratch.Cast.toNumber(index));
      i = Scratch.Cast.compare(i, 1) < 0 ? 0 : i - 1;
      if (i > arr.length) i = arr.length;
      arr.splice(i, 0, value);
    }

    _replace(store, name, index, value) {
      const arr = this._getArray(store, name, false);
      if (!arr) return;
      const i = Math.floor(Scratch.Cast.toNumber(index));
      if (i >= 1 && i <= arr.length) arr[i - 1] = value;
    }

    _deleteAt(store, name, index) {
      const arr = this._getArray(store, name, false);
      if (!arr) return;
      const i = Math.floor(Scratch.Cast.toNumber(index));
      if (i >= 1 && i <= arr.length) arr.splice(i - 1, 1);
    }

    _item(store, name, index) {
      const arr = this._getArray(store, name, false);
      if (!arr) return "";
      const i = Math.floor(Scratch.Cast.toNumber(index));
      if (i < 1 || i > arr.length) return "";
      return arr[i - 1];
    }

    _length(store, name) {
      const arr = this._getArray(store, name, false);
      return arr ? arr.length : 0;
    }

    _contains(store, name, value) {
      const arr = this._getArray(store, name, false);
      if (!arr) return false;
      return arr.some((item) => Scratch.Cast.compare(item, value) === 0);
    }

    _indexOf(store, name, value) {
      const arr = this._getArray(store, name, false);
      if (!arr) return 0;
      const idx = arr.findIndex((item) => Scratch.Cast.compare(item, value) === 0);
      return idx === -1 ? 0 : idx + 1;
    }

    _join(store, name, sep) {
      const arr = this._getArray(store, name, false);
      return arr ? arr.join(Scratch.Cast.toString(sep)) : "";
    }

    _exists(store, name) {
      return Object.prototype.hasOwnProperty.call(store, name);
    }

    _clear(store, name) {
      const arr = this._getArray(store, name, false);
      if (arr) arr.length = 0;
    }

    _delete(store, name) {
      Reflect.deleteProperty(store, name);
    }

    // Shared "for item/index in array" loop, same stackFrame pattern as the
    // example's "for [VAR] in [NUM]" block. Item and index are exposed as
    // thread variables so they can be read with plain getter-style logic.
    _forEach(store, args, util) {
      const arr = this._getArray(store, args.VAR, false);
      const len = arr ? arr.length : 0;
      if (!Object.prototype.hasOwnProperty.call(util.stackFrame, "index")) {
        util.stackFrame.index = 0;
      }
      if (util.stackFrame.index < len) {
        if (!util.thread.variables) {
          util.thread.variables = newStore();
        }
        util.thread.variables[args.INDEX] = util.stackFrame.index + 1;
        util.thread.variables[args.ITEM] = arr[util.stackFrame.index];
        util.stackFrame.index++;
        return true;
      }
    }

    /* ---------- THREAD ARRAYS ---------- */

    createThreadArray(args, util) {
      this._create(this._threadStore(util), args.VAR);
    }
    addToThreadArray(args, util) {
      this._add(this._threadStore(util), args.VAR, args.STRING);
    }
    insertIntoThreadArray(args, util) {
      this._insert(this._threadStore(util), args.VAR, args.INDEX, args.STRING);
    }
    replaceInThreadArray(args, util) {
      this._replace(this._threadStore(util), args.VAR, args.INDEX, args.STRING);
    }
    deleteFromThreadArray(args, util) {
      this._deleteAt(this._threadStore(util), args.VAR, args.INDEX);
    }
    getThreadArrayItem(args, util) {
      return this._item(this._threadStore(util), args.VAR, args.INDEX);
    }
    getThreadArrayLength(args, util) {
      return this._length(this._threadStore(util), args.VAR);
    }
    threadArrayContains(args, util) {
      return this._contains(this._threadStore(util), args.VAR, args.STRING);
    }
    indexInThreadArray(args, util) {
      return this._indexOf(this._threadStore(util), args.VAR, args.STRING);
    }
    joinThreadArray(args, util) {
      return this._join(this._threadStore(util), args.VAR, args.SEP);
    }
    forEachThreadArrayItem(args, util) {
      return this._forEach(this._threadStore(util), args, util);
    }
    threadArrayExists(args, util) {
      return this._exists(this._threadStore(util), args.VAR);
    }
    clearThreadArray(args, util) {
      this._clear(this._threadStore(util), args.VAR);
    }
    deleteThreadArray(args, util) {
      this._delete(this._threadStore(util), args.VAR);
    }
    listThreadArrays(args, util) {
      return Object.keys(this._threadStore(util)).join(",");
    }

    /* ---------- RUNTIME ARRAYS ---------- */

    createRuntimeArray(args) {
      this._create(this.runtimeArrays, args.VAR);
    }
    addToRuntimeArray(args) {
      this._add(this.runtimeArrays, args.VAR, args.STRING);
    }
    insertIntoRuntimeArray(args) {
      this._insert(this.runtimeArrays, args.VAR, args.INDEX, args.STRING);
    }
    replaceInRuntimeArray(args) {
      this._replace(this.runtimeArrays, args.VAR, args.INDEX, args.STRING);
    }
    deleteFromRuntimeArray(args) {
      this._deleteAt(this.runtimeArrays, args.VAR, args.INDEX);
    }
    getRuntimeArrayItem(args) {
      return this._item(this.runtimeArrays, args.VAR, args.INDEX);
    }
    getRuntimeArrayLength(args) {
      return this._length(this.runtimeArrays, args.VAR);
    }
    runtimeArrayContains(args) {
      return this._contains(this.runtimeArrays, args.VAR, args.STRING);
    }
    indexInRuntimeArray(args) {
      return this._indexOf(this.runtimeArrays, args.VAR, args.STRING);
    }
    joinRuntimeArray(args) {
      return this._join(this.runtimeArrays, args.VAR, args.SEP);
    }
    forEachRuntimeArrayItem(args, util) {
      return this._forEach(this.runtimeArrays, args, util);
    }
    runtimeArrayExists(args) {
      return this._exists(this.runtimeArrays, args.VAR);
    }
    clearRuntimeArray(args) {
      this._clear(this.runtimeArrays, args.VAR);
    }
    deleteRuntimeArray(args) {
      this._delete(this.runtimeArrays, args.VAR);
    }
    listRuntimeArrays() {
      return Object.keys(this.runtimeArrays).join(",");
    }
    resetRuntimeArrays() {
      this.runtimeArrays = newStore();
    }
  }

  const extension = new TempArrays();
  Scratch.vm.runtime.ext_mukyuTempArrays = extension;
  Scratch.extensions.register(extension);
})(Scratch);
