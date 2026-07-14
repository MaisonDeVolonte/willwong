/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

var ns = Object.create;
var ft = Object.defineProperty;
var rs = Object.getOwnPropertyDescriptor;
var is = Object.getOwnPropertyNames;
var os = Object.getPrototypeOf,
  ss = Object.prototype.hasOwnProperty;
var as = (r, e, t) =>
  e in r
    ? ft(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (r[e] = t);
var m = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
var ls = (r, e, t, n) => {
  if ((e && typeof e == "object") || typeof e == "function")
    for (let o of is(e))
      !ss.call(r, o) &&
        o !== t &&
        ft(r, o, {
          get: () => e[o],
          enumerable: !(n = rs(e, o)) || n.enumerable,
        });
  return r;
};
var Nr = (r, e, t) => (
  (t = r != null ? ns(os(r)) : {}),
  ls(
    e || !r || !r.__esModule
      ? ft(t, "default", { value: r, enumerable: !0 })
      : t,
    r
  )
);
var fe = (r, e, t) => (as(r, typeof e != "symbol" ? e + "" : e, t), t);
var Lr = m((vt) => {
  "use strict";
  Object.defineProperty(vt, "__esModule", { value: !0 });
  function cs(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  cs(vt, {
    CORE_OPERATORS: function () {
      return ht;
    },
    DEFAULTS: function () {
      return mt;
    },
    DEFAULT_CUSTOM_EASE: function () {
      return gs;
    },
    EASE_DEFAULTS: function () {
      return Fr;
    },
    PERCENT_CANVAS_DURATION_S: function () {
      return ps;
    },
    RELATIONSHIP_TYPES: function () {
      return yt;
    },
    STANDARD_TRIGGER_ALLOWED_CONTROLS: function () {
      return hs;
    },
    TimelineControlType: function () {
      return pt;
    },
    TweenType: function () {
      return gt;
    },
    isValidControlType: function () {
      return us;
    },
    tweenTypeFromName: function () {
      return ds;
    },
    tweenTypeToName: function () {
      return fs;
    },
  });
  var pt;
  (function (r) {
    (r.STANDARD = "standard"),
      (r.SCROLL = "scroll"),
      (r.LOAD = "load"),
      (r.CONTINUOUS = "continuous");
  })(pt || (pt = {}));
  function us(r) {
    return (
      r === "standard" || r === "scroll" || r === "load" || r === "continuous"
    );
  }
  var gt;
  (function (r) {
    (r[(r.To = 0)] = "To"),
      (r[(r.From = 1)] = "From"),
      (r[(r.FromTo = 2)] = "FromTo"),
      (r[(r.Set = 3)] = "Set");
  })(gt || (gt = {}));
  function ds(r) {
    switch (r) {
      case "to":
        return 0;
      case "from":
        return 1;
      case "both":
        return 2;
      case "set":
        return 3;
    }
  }
  function fs(r) {
    switch (r) {
      case 0:
        return "to";
      case 1:
        return "from";
      case 2:
        return "both";
      case 3:
        return "set";
      default:
        return null;
    }
  }
  var ht;
  (function (r) {
    (r.AND = "wf:and"), (r.OR = "wf:or");
  })(ht || (ht = {}));
  var mt;
  (function (r) {
    r[(r.DURATION = 0.5)] = "DURATION";
  })(mt || (mt = {}));
  var ps = 1,
    yt;
  (function (r) {
    (r.NONE = "none"),
      (r.WITHIN = "within"),
      (r.DIRECT_CHILD_OF = "direct-child-of"),
      (r.CONTAINS = "contains"),
      (r.DIRECT_PARENT_OF = "direct-parent-of"),
      (r.NEXT_TO = "next-to"),
      (r.NEXT_SIBLING_OF = "next-sibling-of"),
      (r.PREV_SIBLING_OF = "prev-sibling-of");
  })(yt || (yt = {}));
  var Fr = {
      back: { type: "back", curve: "out", power: 1.7 },
      elastic: { type: "elastic", curve: "out", amplitude: 1, period: 0.3 },
      steps: { type: "steps", stepCount: 6 },
      rough: {
        type: "rough",
        templateCurve: "none.inOut",
        points: 20,
        strength: 1,
        taper: "none",
        randomizePoints: !0,
        clampPoints: !1,
      },
      slowMo: { type: "slowMo", linearRatio: 0.7, power: 0.7, yoyoMode: !1 },
      expoScale: {
        type: "expoScale",
        startingScale: 0.05,
        endingScale: 1,
        templateCurve: "none.inOut",
      },
      customWiggle: {
        type: "customWiggle",
        wiggles: 10,
        wiggleType: "easeOut",
      },
      customBounce: {
        type: "customBounce",
        strength: 0.7,
        squash: 1,
        endAtStart: !1,
      },
      customEase: {
        type: "customEase",
        bezierCurve: "M0,160 C40,160 24,96 80,96 136,96 120,0 160,0",
      },
    },
    gs = Fr.back,
    hs = [
      "restart",
      "play",
      "reverse",
      "reverseFlipEase",
      "pause",
      "resume",
      "togglePlayReverse",
      "togglePlayReverseFlipEase",
      "stop",
      "none",
    ];
});
var Dr = m((Tt) => {
  "use strict";
  Object.defineProperty(Tt, "__esModule", { value: !0 });
  Object.defineProperty(Tt, "RuntimeBuilder", {
    enumerable: !0,
    get: function () {
      return bt;
    },
  });
  var bt = class {
    baseInfo;
    extensions = [];
    lifecycle = {};
    constructor(e) {
      this.baseInfo = e;
    }
    addTrigger(e, t) {
      let n = `${this.baseInfo.namespace}:${e}`;
      return (
        this.extensions.push({
          extensionPoint: "trigger",
          id: n,
          triggerType: n,
          implementation: t,
        }),
        this
      );
    }
    addAction(e, t) {
      let n = `${this.baseInfo.namespace}:${e}`;
      return (
        this.extensions.push({
          extensionPoint: "action",
          id: n,
          actionType: n,
          implementation: t,
        }),
        this
      );
    }
    addTargetResolver(e, t) {
      let n = `${this.baseInfo.namespace}:${e}`;
      return (
        this.extensions.push({
          extensionPoint: "targetResolver",
          id: n,
          resolverType: n,
          implementation: t,
        }),
        this
      );
    }
    addCondition(e, t) {
      let n = `${this.baseInfo.namespace}:${e}`;
      return (
        this.extensions.push({
          extensionPoint: "condition",
          id: n,
          conditionType: n,
          implementation: t,
        }),
        this
      );
    }
    onInitialize(e) {
      return (this.lifecycle.initialize = e), this;
    }
    onActivate(e) {
      return (this.lifecycle.activate = e), this;
    }
    onDeactivate(e) {
      return (this.lifecycle.deactivate = e), this;
    }
    onDispose(e) {
      return (this.lifecycle.dispose = e), this;
    }
    createManifest() {
      let e = this.extensions.map((t) => `${t.extensionPoint}:${t.id}`);
      return {
        id: [this.baseInfo.namespace, this.baseInfo.pluginId],
        version: this.baseInfo.version,
        name: this.baseInfo.displayName || this.baseInfo.pluginId,
        description: this.baseInfo.description || "",
        dependencies: this.baseInfo.dependencies,
        features: e,
      };
    }
    buildRuntime() {
      return {
        manifest: this.createManifest(),
        extensions: this.extensions,
        ...this.lifecycle,
      };
    }
  };
});
var jr = m((Ct) => {
  "use strict";
  Object.defineProperty(Ct, "__esModule", { value: !0 });
  function ms(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  ms(Ct, {
    ConditionCategoryBuilder: function () {
      return Ne;
    },
    DesignBuilder: function () {
      return Et;
    },
    TargetCategoryBuilder: function () {
      return Pe;
    },
    TriggerCategoryBuilder: function () {
      return ke;
    },
  });
  var wt = class {
      categoryBuilder;
      groupConfig;
      properties;
      constructor(e, t) {
        (this.categoryBuilder = e),
          (this.groupConfig = t),
          (this.properties = []);
      }
      addProperty(e, t, n) {
        return (
          this.properties.push({
            id: e,
            schema: { ...t, description: n?.description || t.description },
          }),
          this
        );
      }
      addGroup(e) {
        return (
          this.categoryBuilder.finalizeGroup({
            ...this.groupConfig,
            properties: this.properties,
          }),
          this.categoryBuilder.clearCurrentGroupBuilder(),
          this.categoryBuilder.addGroup(e)
        );
      }
      getGroupData() {
        return { ...this.groupConfig, properties: this.properties };
      }
    },
    St = class {
      categoryId;
      config;
      displayGroups;
      currentGroupBuilder;
      constructor(e, t) {
        (this.categoryId = e),
          (this.config = t),
          (this.displayGroups = []),
          (this.currentGroupBuilder = null);
      }
      addGroup(e) {
        return (
          this.currentGroupBuilder &&
            this.finalizeGroup(this.currentGroupBuilder.getGroupData()),
          (this.currentGroupBuilder = new wt(this, e)),
          this.currentGroupBuilder
        );
      }
      finalizeGroup(e) {
        this.displayGroups.push(e);
      }
      clearCurrentGroupBuilder() {
        this.currentGroupBuilder = null;
      }
      getDefinition() {
        this.currentGroupBuilder &&
          (this.finalizeGroup(this.currentGroupBuilder.getGroupData()),
          (this.currentGroupBuilder = null));
        let e = this.displayGroups.flatMap((t) => t.properties);
        return {
          id: this.categoryId,
          properties: e,
          propertyType: this.config.propertyType || "tween",
          displayGroups: this.displayGroups,
        };
      }
    },
    Pe = class {
      categoryId;
      config;
      targets;
      constructor(e, t) {
        (this.categoryId = e), (this.config = t), (this.targets = []);
      }
      addTargetSchema(e, t) {
        return this.targets.push({ id: e, schema: t }), this;
      }
      getDefinition() {
        return {
          id: this.categoryId,
          label: this.config.label,
          order: this.config.order,
          targets: this.targets,
        };
      }
    },
    ke = class {
      categoryId;
      config;
      triggers;
      constructor(e, t) {
        (this.categoryId = e), (this.config = t), (this.triggers = []);
      }
      addTriggerSchema(e, t) {
        return this.triggers.push({ id: e, schema: t }), this;
      }
      getDefinition() {
        return {
          id: this.categoryId,
          label: this.config.label,
          order: this.config.order,
          triggers: this.triggers,
        };
      }
    },
    Ne = class {
      categoryId;
      config;
      conditions;
      constructor(e, t) {
        (this.categoryId = e), (this.config = t), (this.conditions = []);
      }
      addConditionSchema(e, t) {
        return this.conditions.push({ id: e, schema: t }), this;
      }
      getDefinition() {
        return {
          id: this.categoryId,
          label: this.config.label,
          order: this.config.order,
          conditions: this.conditions,
        };
      }
    },
    Et = class {
      baseInfo;
      categories = new Map();
      targetCategories = new Map();
      triggerCategories = new Map();
      conditionCategories = new Map();
      actionPresets = new Map();
      reducerHooks = [];
      constructor(e) {
        this.baseInfo = e;
      }
      addCategory(e, t = {}) {
        let n = new St(e, t);
        return this.categories.set(e, n), n;
      }
      addTargetCategory(e, t) {
        let n = new Pe(e, t);
        return this.targetCategories.set(e, n), n;
      }
      addTriggerCategory(e, t) {
        let n = new ke(e, t);
        return this.triggerCategories.set(e, n), n;
      }
      addConditionCategory(e, t) {
        let n = new Ne(e, t);
        return this.conditionCategories.set(e, n), n;
      }
      addActionPreset(e, t) {
        let n = `${this.baseInfo.namespace}:${e}`;
        return (
          this.actionPresets.set(n, {
            id: n,
            name: t.name,
            description: t.description,
            icon: t.icon,
            timelineIcon: t.timelineIcon,
            type: "plugin",
            categoryId: t.categoryId,
            action: t.action,
            customEditor: t.customEditor,
            targetFilter: t.targetFilter,
            designerTargetFilter: t.designerTargetFilter,
            customTargetComponent: t.customTargetComponent,
          }),
          this
        );
      }
      addReducerHooks(e) {
        return this.reducerHooks.push(e), this;
      }
      buildDesign() {
        let e = [];
        for (let [, s] of this.categories) e.push(s.getDefinition());
        let t = [];
        for (let [, s] of this.targetCategories) t.push(s.getDefinition());
        let n = [];
        for (let [, s] of this.triggerCategories) n.push(s.getDefinition());
        let o = [];
        for (let [, s] of this.conditionCategories) o.push(s.getDefinition());
        let i = [];
        for (let [, s] of this.actionPresets) i.push(s);
        return {
          namespace: this.baseInfo.namespace,
          pluginId: this.baseInfo.pluginId,
          version: this.baseInfo.version,
          displayName: this.baseInfo.displayName,
          description: this.baseInfo.description,
          categories: e.length > 0 ? e : void 0,
          targetCategories: t.length > 0 ? t : void 0,
          triggerCategories: n.length > 0 ? n : void 0,
          conditionCategories: o.length > 0 ? o : void 0,
          actionPresets: i.length > 0 ? i : void 0,
          reducerHooks:
            this.reducerHooks.length > 0 ? [...this.reducerHooks] : void 0,
        };
      }
    };
});
var Vr = m((At) => {
  "use strict";
  Object.defineProperty(At, "__esModule", { value: !0 });
  Object.defineProperty(At, "TransformBuilder", {
    enumerable: !0,
    get: function () {
      return Mt;
    },
  });
  var Mt = class {
    baseInfo;
    triggerTransforms = new Map();
    targetTransforms = new Map();
    conditionTransforms = new Map();
    actionTransforms = new Map();
    constructor(e) {
      this.baseInfo = e;
    }
    addTargetTransform(e, t) {
      return (
        this.targetTransforms.set(
          this.createExtensionKey(e),
          function (o, i, s) {
            return t(o, i, s);
          }
        ),
        this
      );
    }
    addTriggerTransform(e, t) {
      return (
        this.triggerTransforms.set(
          this.createExtensionKey(e),
          function (o, i, s) {
            return t(o, i, s);
          }
        ),
        this
      );
    }
    addConditionTransform(e, t) {
      return (
        this.conditionTransforms.set(
          this.createExtensionKey(e),
          function (o, i, s) {
            return t(o, i, s);
          }
        ),
        this
      );
    }
    addActionTransform(e, t) {
      return (
        this.actionTransforms.set(
          this.createExtensionKey(e),
          function (o, i, s) {
            return t(o, i, s);
          }
        ),
        this
      );
    }
    createExtensionKey(e) {
      return `${this.baseInfo.namespace}:${e}`;
    }
    buildTransform() {
      return {
        namespace: this.baseInfo.namespace,
        pluginId: this.baseInfo.pluginId,
        version: this.baseInfo.version,
        displayName: this.baseInfo.displayName,
        description: this.baseInfo.description,
        triggerTransforms: this.triggerTransforms,
        targetTransforms: this.targetTransforms,
        conditionTransforms: this.conditionTransforms,
        actionTransforms: this.actionTransforms,
      };
    }
  };
});
var Ur = m((Br) => {
  "use strict";
  Object.defineProperty(Br, "__esModule", { value: !0 });
});
var Y = m((ie) => {
  "use strict";
  Object.defineProperty(ie, "__esModule", { value: !0 });
  function ys(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  ys(ie, {
    CORE_OPERATORS: function () {
      return U.CORE_OPERATORS;
    },
    DEFAULTS: function () {
      return U.DEFAULTS;
    },
    DEFAULT_CUSTOM_EASE: function () {
      return U.DEFAULT_CUSTOM_EASE;
    },
    EASE_DEFAULTS: function () {
      return U.EASE_DEFAULTS;
    },
    PERCENT_CANVAS_DURATION_S: function () {
      return U.PERCENT_CANVAS_DURATION_S;
    },
    RELATIONSHIP_TYPES: function () {
      return U.RELATIONSHIP_TYPES;
    },
    STANDARD_TRIGGER_ALLOWED_CONTROLS: function () {
      return U.STANDARD_TRIGGER_ALLOWED_CONTROLS;
    },
    TimelineControlType: function () {
      return U.TimelineControlType;
    },
    TweenType: function () {
      return U.TweenType;
    },
    isValidControlType: function () {
      return U.isValidControlType;
    },
    tweenTypeFromName: function () {
      return U.tweenTypeFromName;
    },
    tweenTypeToName: function () {
      return U.tweenTypeToName;
    },
  });
  var U = Lr();
  Fe(Dr(), ie);
  Fe(jr(), ie);
  Fe(Vr(), ie);
  Fe(Ur(), ie);
  function Fe(r, e) {
    return (
      Object.keys(r).forEach(function (t) {
        t !== "default" &&
          !Object.prototype.hasOwnProperty.call(e, t) &&
          Object.defineProperty(e, t, {
            enumerable: !0,
            get: function () {
              return r[t];
            },
          });
      }),
      r
    );
  }
});
var pe = m((Ot) => {
  "use strict";
  Object.defineProperty(Ot, "__esModule", { value: !0 });
  function vs(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  vs(Ot, {
    EASING_NAMES: function () {
      return As;
    },
    buildCustomEaseId: function () {
      return Ms;
    },
    buildEaseContextId: function () {
      return Cs;
    },
    debounce: function () {
      return Ss;
    },
    defaultSplitClass: function () {
      return ws;
    },
    isValidControlType: function () {
      return bs;
    },
    throttle: function () {
      return Es;
    },
    toSeconds: function () {
      return Ts;
    },
  });
  var Le = Y();
  function bs(r) {
    return (
      r === Le.TimelineControlType.STANDARD ||
      r === Le.TimelineControlType.SCROLL ||
      r === Le.TimelineControlType.LOAD ||
      r === Le.TimelineControlType.CONTINUOUS
    );
  }
  function Ts(r) {
    return typeof r == "string" ? parseFloat(r) / 1e3 : r;
  }
  function ws(r) {
    return `gsap_split_${r}++`;
  }
  var Ss = (
      r,
      e = 0,
      { leading: t = !1, trailing: n = !0, maxWait: o } = {}
    ) => {
      let i,
        s = 0,
        a,
        l,
        c = () => {
          (s = 0), (i = void 0), n && r.apply(a, l);
        };
      function u(...d) {
        (a = this), (l = d), s || ((s = performance.now()), t && r.apply(a, l));
        let f = performance.now() - s;
        if (o && f >= o) {
          clearTimeout(i), c();
          return;
        }
        clearTimeout(i), (i = setTimeout(c, e));
      }
      return (
        (u.cancel = () => {
          clearTimeout(i), (i = void 0), (s = 0);
        }),
        u
      );
    },
    Es = (r, e = 0, { leading: t = !0, trailing: n = !0, maxWait: o } = {}) => {
      let i = 0,
        s,
        a,
        l,
        c = (d) => {
          (i = d), (s = void 0), r.apply(a, l);
        };
      function u(...d) {
        let f = performance.now();
        !i && !t && (i = f);
        let p = e - (f - i);
        (a = this),
          (l = d),
          p <= 0 || (o && f - i >= o)
            ? (s && (clearTimeout(s), (s = void 0)), c(f))
            : n && !s && (s = setTimeout(() => c(performance.now()), p));
      }
      return (
        (u.cancel = () => {
          clearTimeout(s), (s = void 0), (i = 0);
        }),
        u
      );
    };
  function Cs(r, e) {
    return `${r}-${e}`;
  }
  function Ms(r, e) {
    return e ? `${r}-${e}` : r;
  }
  var As = [
    "none",
    "power1.in",
    "power1.out",
    "power1.inOut",
    "power2.in",
    "power2.out",
    "power2.inOut",
    "power3.in",
    "power3.out",
    "power3.inOut",
    "power4.in",
    "power4.out",
    "power4.inOut",
    "back.in",
    "back.out",
    "back.inOut",
    "bounce.in",
    "bounce.out",
    "bounce.inOut",
    "circ.in",
    "circ.out",
    "circ.inOut",
    "elastic.in",
    "elastic.out",
    "elastic.inOut",
    "expo.in",
    "expo.out",
    "expo.inOut",
    "sine.in",
    "sine.out",
    "sine.inOut",
  ];
});
var qr = m((It) => {
  "use strict";
  Object.defineProperty(It, "__esModule", { value: !0 });
  Object.defineProperty(It, "EventManager", {
    enumerable: !0,
    get: function () {
      return De;
    },
  });
  var we = pe(),
    ge = class {
      elementHandlers = new WeakMap();
      eventTypeHandlers = new Map();
      customEventTypes = new Map();
      delegatedHandlers = new Map();
      batchedEvents = new Map();
      batchFrameId = null;
      defaultMaxBatchSize = 10;
      defaultMaxBatchAge = 100;
      defaultErrorHandler = (e, t) =>
        console.error("[EventManager] Error handling event:", e, t);
      constructor() {}
      static getInstance() {
        return ge.instance || (ge.instance = new ge()), ge.instance;
      }
      addEventListener(e, t, n, o) {
        try {
          let i = o?.kind === "custom",
            s = {
              ...(i ? { delegate: !1, passive: !0, batch: !1 } : Is[t] || {}),
              ...o,
              errorHandler: o?.errorHandler || this.defaultErrorHandler,
            };
          if (!i && t === "load" && "complete" in e && e.complete)
            return (
              setTimeout(() => {
                try {
                  n(new Event("load"), e);
                } catch (u) {
                  s.errorHandler?.(u, new Event("load"));
                }
              }, 0),
              () => {}
            );
          if (!e || !e.addEventListener)
            throw new Error("Invalid element provided to addEventListener");
          let a = this.createWrappedHandler(n, s, e),
            l = this.registerHandler(e, t, n, a.handler, s, i, a.cleanup);
          if (i)
            return () => {
              this.removeHandler(e, t, n, !0), l.cleanup?.();
            };
          let c = new AbortController();
          return (
            this.ensureDelegatedHandler(t),
            s.delegate ||
              (Os(s) || e).addEventListener(t, l.wrappedHandler, {
                passive: s.passive,
                signal: c.signal,
              }),
            () => {
              c.abort(), this.removeHandler(e, t, n, !1);
            }
          );
        } catch (i) {
          return o?.errorHandler?.(i, new Event(t)), () => {};
        }
      }
      emit(e, t, n, o) {
        try {
          let i = this.customEventTypes.get(e);
          if (!i?.size) return;
          let s = new CustomEvent(e, {
            detail: t,
            bubbles: o?.bubbles ?? !0,
            cancelable: !0,
          });
          for (let a of i)
            if (!n || n === a.element || a.element.contains(n))
              try {
                a.wrappedHandler(s);
              } catch (l) {
                console.error(`[EventManager] Error emitting ${e}:`, l);
              }
        } catch (i) {
          console.error(`[EventManager] Error emitting custom event ${e}:`, i);
        }
      }
      dispose() {
        this.batchFrameId !== null &&
          (cancelAnimationFrame(this.batchFrameId),
          (this.batchFrameId = null),
          this.batchedEvents.clear());
        for (let [, e] of this.delegatedHandlers) e.controller.abort();
        for (let [, e] of this.eventTypeHandlers)
          for (let t of e) t.cleanup?.();
        for (let [, e] of this.customEventTypes) for (let t of e) t.cleanup?.();
        this.delegatedHandlers.clear(),
          (this.elementHandlers = new WeakMap()),
          this.eventTypeHandlers.clear(),
          this.customEventTypes.clear();
      }
      createWrappedHandler(e, t, n) {
        let o = (i) => {
          try {
            let s =
              t.target === "window"
                ? window
                : t.target === "document"
                ? document
                : n;
            e(i, s);
          } catch (s) {
            (t.errorHandler || this.defaultErrorHandler)(s, i);
          }
        };
        if (t.batch) {
          let i = (s) => {
            let a = s.type || "unknown";
            this.batchedEvents.has(a) || this.batchedEvents.set(a, []),
              this.batchedEvents
                .get(a)
                .push({
                  event: s,
                  target: n,
                  timestamp: s.timeStamp || performance.now(),
                }),
              this.batchFrameId == null &&
                (this.batchFrameId = requestAnimationFrame(() =>
                  this.processBatchedEvents()
                ));
          };
          if (t.throttleMs && t.throttleMs > 0) {
            let s = (0, we.throttle)(o, t.throttleMs);
            return { handler: i, cleanup: s.cancel };
          }
          if (t.debounceMs && t.debounceMs > 0) {
            let s = (0, we.debounce)(o, t.debounceMs);
            return { handler: i, cleanup: s.cancel };
          }
          return { handler: i };
        }
        if (t.throttleMs && t.throttleMs > 0) {
          let i = (0, we.throttle)(o, t.throttleMs);
          if (t.debounceMs && t.debounceMs > 0) {
            let s = (0, we.debounce)(i, t.debounceMs);
            return {
              handler: s,
              cleanup: () => {
                s.cancel?.(), i.cancel?.();
              },
            };
          }
          return { handler: i, cleanup: i.cancel };
        }
        if (t.debounceMs && t.debounceMs > 0) {
          let i = (0, we.debounce)(o, t.debounceMs);
          return { handler: i, cleanup: i.cancel };
        }
        return { handler: o };
      }
      processBatchedEvents() {
        if (this.batchFrameId === null) return;
        this.batchFrameId = null;
        let e = performance.now();
        for (let [t, n] of this.batchedEvents) {
          let o = this.eventTypeHandlers.get(t);
          if (!o?.size) continue;
          let i = n.filter((a) => e - a.timestamp < this.defaultMaxBatchAge);
          if (!i.length) continue;
          i.sort((a, l) => a.timestamp - l.timestamp);
          let s =
            i.length <= this.defaultMaxBatchSize
              ? i
              : i.slice(-this.defaultMaxBatchSize);
          for (let { event: a, target: l } of s) {
            let c = a;
            (c.batchTimestamp = e), (c.batchSize = s.length);
            for (let u of o)
              try {
                (u.config.delegate ||
                  u.config.target === "window" ||
                  u.config.target === "document" ||
                  l === a.target ||
                  l.contains(a.target)) &&
                  u.wrappedHandler(c);
              } catch (d) {
                (u.config.errorHandler || this.defaultErrorHandler)(d, c);
              }
          }
        }
        this.batchedEvents.clear();
      }
      ensureDelegatedHandler(e) {
        if (this.delegatedHandlers.has(e)) return;
        let t = new AbortController(),
          n = (i) => {
            let s = this.eventTypeHandlers.get(e);
            if (!s?.size) return;
            let a = i.composedPath
              ? i.composedPath()
              : i.target
              ? [i.target]
              : [];
            for (let l of a)
              if (l instanceof Element) {
                for (let c of s) {
                  if (!c.config.delegate) continue;
                  if (c.element === l || c.element.contains(l))
                    try {
                      c.wrappedHandler(i);
                    } catch (d) {
                      console.error(`[EventDelegator] Error for ${e}:`, d);
                    }
                }
                if (!i.bubbles) break;
              }
          },
          o = [
            "focus",
            "blur",
            "focusin",
            "focusout",
            "mouseenter",
            "mouseleave",
          ].includes(e);
        document.addEventListener(e, n, {
          passive: !1,
          capture: o,
          signal: t.signal,
        }),
          this.delegatedHandlers.set(e, { handler: n, controller: t });
      }
      registerHandler(e, t, n, o, i, s, a) {
        let l = {
          element: e,
          originalHandler: n,
          wrappedHandler: o,
          config: i,
          cleanup: a,
        };
        if (s) {
          let c = this.customEventTypes.get(t) || new Set();
          c.add(l), this.customEventTypes.set(t, c);
        } else {
          let c = this.elementHandlers.get(e) || new Set();
          c.add(l), this.elementHandlers.set(e, c);
          let u = this.eventTypeHandlers.get(t) || new Set();
          u.add(l), this.eventTypeHandlers.set(t, u);
        }
        return l;
      }
      removeHandler(e, t, n, o) {
        if (o) {
          let i = this.customEventTypes.get(t);
          if (!i?.size) return;
          for (let s of i)
            if (s.element === e && s.originalHandler === n) {
              i.delete(s),
                i.size || this.customEventTypes.delete(t),
                s.cleanup?.();
              break;
            }
        } else {
          let i = this.eventTypeHandlers.get(t);
          if (!i?.size) return;
          let s = this.elementHandlers.get(e);
          if (!s?.size) return;
          let a;
          for (let l of s)
            if (l.originalHandler === n) {
              a = l;
              break;
            }
          if (a) {
            if ((s.delete(a), i.delete(a), !i.size)) {
              this.eventTypeHandlers.delete(t);
              let l = this.delegatedHandlers.get(t);
              l && (l.controller.abort(), this.delegatedHandlers.delete(t));
            }
            a.cleanup?.();
          }
        }
      }
    },
    De = ge;
  fe(De, "instance");
  function Os(r) {
    return r.target === "window"
      ? window
      : r.target === "document"
      ? document
      : null;
  }
  var Is = {
    load: { delegate: !1, passive: !0 },
    DOMContentLoaded: { target: "document", passive: !0 },
    readystatechange: { target: "document", passive: !0 },
    beforeunload: { target: "window", passive: !1 },
    unload: { target: "window", passive: !1 },
    pageshow: { target: "window", passive: !0 },
    pagehide: { target: "window", passive: !0 },
    click: { delegate: !0, passive: !1 },
    dblclick: { delegate: !0, passive: !0 },
    mousedown: { delegate: !0, passive: !0 },
    mouseup: { delegate: !0, passive: !0 },
    mousemove: { delegate: !0, batch: !0, passive: !0 },
    mouseenter: { delegate: !1, passive: !0 },
    mouseleave: { delegate: !1, passive: !0 },
    mouseout: { delegate: !0, passive: !0 },
    contextmenu: { delegate: !0, passive: !1 },
    wheel: { delegate: !0, throttleMs: 16, passive: !0, batch: !0 },
    touchstart: { delegate: !0, passive: !0 },
    touchend: { delegate: !0, passive: !1 },
    touchmove: { delegate: !0, batch: !0, passive: !0 },
    touchcancel: { delegate: !0, passive: !0 },
    pointerdown: { delegate: !0, passive: !0 },
    pointerup: { delegate: !0, passive: !0 },
    pointermove: { delegate: !0, batch: !0, passive: !0 },
    pointerenter: { delegate: !1, passive: !0 },
    pointerleave: { delegate: !1, passive: !0 },
    pointercancel: { delegate: !0, passive: !0 },
    keydown: { delegate: !0, passive: !1 },
    keyup: { delegate: !0, passive: !1 },
    keypress: { delegate: !0, passive: !1 },
    input: { delegate: !0, passive: !1 },
    change: { delegate: !0, passive: !1 },
    focus: { delegate: !1, passive: !0 },
    blur: { delegate: !1, passive: !0 },
    focusin: { delegate: !0, passive: !0 },
    focusout: { delegate: !0, passive: !0 },
    submit: { delegate: !0, passive: !1 },
    reset: { delegate: !0, passive: !1 },
    select: { delegate: !0, passive: !0 },
    selectionchange: { target: "document", passive: !0 },
    dragstart: { delegate: !0, passive: !1 },
    drag: { delegate: !0, passive: !0 },
    dragenter: { delegate: !0, passive: !1 },
    dragleave: { delegate: !0, passive: !0 },
    dragover: { delegate: !0, passive: !1 },
    drop: { delegate: !0, passive: !1 },
    dragend: { delegate: !0, passive: !0 },
    play: { delegate: !0, passive: !0 },
    pause: { delegate: !0, passive: !0 },
    ended: { delegate: !0, passive: !0 },
    timeupdate: { delegate: !0, batch: !0, passive: !0 },
    canplay: { delegate: !0, passive: !0 },
    canplaythrough: { delegate: !0, passive: !0 },
    loadeddata: { delegate: !0, passive: !0 },
    animationstart: { delegate: !0, passive: !0 },
    animationend: { delegate: !0, passive: !0 },
    animationiteration: { delegate: !0, passive: !0 },
    transitionstart: { delegate: !0, passive: !0 },
    transitionend: { delegate: !0, passive: !0 },
    transitionrun: { delegate: !0, passive: !0 },
    transitioncancel: { delegate: !0, passive: !0 },
    scroll: { delegate: !1, throttleMs: 16, passive: !0 },
    resize: { target: "window", throttleMs: 16, passive: !0 },
    intersection: { delegate: !1, passive: !0 },
    orientationchange: { target: "window", passive: !0 },
    visibilitychange: { target: "document", passive: !0 },
    storage: { target: "window", passive: !0 },
    online: { target: "window", passive: !0 },
    offline: { target: "window", passive: !0 },
    hashchange: { target: "window", passive: !0 },
    popstate: { target: "window", passive: !0 },
    copy: { delegate: !0, passive: !1 },
    cut: { delegate: !0, passive: !1 },
    paste: { delegate: !0, passive: !1 },
    compositionstart: { delegate: !0, passive: !1 },
    compositionupdate: { delegate: !0, passive: !1 },
    compositionend: { delegate: !0, passive: !1 },
    beforeinput: { delegate: !0, passive: !1 },
  };
});
var Rt = m((_t) => {
  "use strict";
  Object.defineProperty(_t, "__esModule", { value: !0 });
  function _s(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  _s(_t, {
    convertEaseConfigToGSAP: function () {
      return Gr;
    },
    convertEaseConfigToLinear: function () {
      return xs;
    },
    isAdvancedEase: function () {
      return Ps;
    },
    isBasicEase: function () {
      return ks;
    },
  });
  var Se = pe();
  function $r() {
    return {
      gsap: window.gsap,
      CustomEase: window.CustomEase,
      CustomWiggle: window.CustomWiggle,
      CustomBounce: window.CustomBounce,
    };
  }
  function Gr(r, e = $r(), t) {
    return r == null
      ? "none"
      : typeof r == "number"
      ? Se.EASING_NAMES[r] || "none"
      : Rs(r, e, t);
  }
  function Rs(r, e, t) {
    switch (r.type) {
      case "back":
        return `back.${r.curve}(${r.power})`;
      case "elastic":
        return `elastic.${r.curve}(${r.amplitude}, ${r.period})`;
      case "steps":
        return `steps(${r.stepCount})`;
      case "rough": {
        let {
          templateCurve: n,
          points: o,
          strength: i,
          taper: s,
          randomizePoints: a,
          clampPoints: l,
        } = r;
        return `rough({ template: ${n}, strength: ${i}, points: ${o}, taper: ${s}, randomize: ${a}, clamp: ${l} })`;
      }
      case "slowMo":
        return `slow(${r.linearRatio}, ${r.power}, ${r.yoyoMode})`;
      case "expoScale":
        return `expoScale(${r.startingScale}, ${r.endingScale}, ${r.templateCurve})`;
      case "customWiggle": {
        let { CustomWiggle: n } = e;
        return n
          ? n.create((0, Se.buildCustomEaseId)("customIX3Wiggle", t), {
              wiggles: r.wiggles,
              type: r.wiggleType,
            })
          : null;
      }
      case "customBounce": {
        let { CustomBounce: n } = e;
        return n
          ? n.create((0, Se.buildCustomEaseId)("customIX3Bounce", t), {
              strength: r.strength,
              endAtStart: r.endAtStart,
              squash: r.squash,
              squashID: (0, Se.buildCustomEaseId)("customIX3Squash", t),
            })
          : null;
      }
      case "customEase": {
        let { CustomEase: n } = e;
        return n
          ? n.create(
              (0, Se.buildCustomEaseId)("customIX3Ease", t),
              r.bezierCurve
            )
          : null;
      }
      default:
        return "none";
    }
  }
  function xs(r, e = $r(), t = 20) {
    if (r == null) return "linear";
    let n = Gr(r, e);
    if (n === null) return "linear";
    if (typeof r == "object" && r.type === "steps")
      return `steps(${r.stepCount})`;
    let { gsap: o } = e;
    if (!o) return "linear";
    let i = o.parseEase(n);
    if (typeof i != "function") return "linear";
    let s = [];
    for (let a = 0; a <= t; a++) {
      let l = a / t,
        c = i(l);
      s.push({ t: Number(l.toFixed(4)), value: Number(c.toFixed(4)) });
    }
    return (
      "linear(" +
      s.map((a) => `${a.value} ${Math.round(a.t * 100)}%`).join(", ") +
      ")"
    );
  }
  function Ps(r) {
    return typeof r == "object" && r !== null;
  }
  function ks(r) {
    return typeof r == "number";
  }
});
var Hr = m((Pt) => {
  "use strict";
  Object.defineProperty(Pt, "__esModule", { value: !0 });
  Object.defineProperty(Pt, "PluginRuntimeBridge", {
    enumerable: !0,
    get: function () {
      return xt;
    },
  });
  var xt = class {
    intervalHandlers = new Map();
    channelSubscribers = new Map();
    registerIntervalHandler(e, t) {
      let n = this.intervalHandlers.get(e);
      n !== t &&
        (n !== void 0 &&
          console.warn(
            "IX3: registerIntervalHandler called twice. The previous handler is being replaced; verify the plugin is registered exactly once (or use a unique pluginKey per concurrent handler).",
            { pluginKey: e }
          ),
        this.intervalHandlers.set(e, t));
    }
    fireInterval(e) {
      for (let [t, n] of this.intervalHandlers)
        try {
          n(e);
        } catch (o) {
          console.error(
            "IX3: interval handler threw. Continuing with the remaining handlers. Investigate the plugin to prevent silent data drift.",
            { pluginKey: t },
            o
          );
        }
    }
    publish(e, t, n) {
      let o = this.channelSubscribers.get(e);
      if (o) {
        for (let i of o.values())
          for (let s of i.slice())
            if (!(s.element && n && s.element !== n))
              try {
                s.cb(t);
              } catch (a) {
                console.error(
                  "IX3: channel subscriber threw. Continuing with remaining subscribers.",
                  { channel: e },
                  a
                );
              }
      }
    }
    subscribe(e, t, n, o) {
      let i = this.channelSubscribers.get(t);
      i || ((i = new Map()), this.channelSubscribers.set(t, i));
      let s = i.get(e) ?? [],
        a = { element: n, cb: o };
      return (
        s.push(a),
        i.set(e, s),
        () => {
          let l = this.channelSubscribers.get(t)?.get(e);
          if (!l) return;
          let c = l.indexOf(a);
          c !== -1 && l.splice(c, 1),
            l.length === 0 &&
              (this.channelSubscribers.get(t)?.delete(e),
              this.channelSubscribers.get(t)?.size === 0 &&
                this.channelSubscribers.delete(t));
        }
      );
    }
    destroyTimeline(e) {
      for (let [t, n] of this.channelSubscribers)
        n.delete(e), n.size === 0 && this.channelSubscribers.delete(t);
    }
  };
});
var zr = m((Nt) => {
  "use strict";
  Object.defineProperty(Nt, "__esModule", { value: !0 });
  Object.defineProperty(Nt, "RuntimeMotionDriver", {
    enumerable: !0,
    get: function () {
      return kt;
    },
  });
  var kt = class {
    env;
    constructor(e) {
      this.env = e;
    }
    hasGsap() {
      return this.env.win.gsap != null;
    }
    hasObserver() {
      return this.env.win.Observer != null;
    }
    timeline() {
      return this.env.win.gsap?.timeline() ?? null;
    }
    to(...e) {
      return this.env.win.gsap?.to(...e) ?? null;
    }
    set(...e) {
      this.env.win.gsap?.set(...e);
    }
    getProperty(...e) {
      return this.env.win.gsap?.getProperty(...e) ?? 0;
    }
    quickSetter(...e) {
      return this.env.win.gsap?.quickSetter(...e) ?? null;
    }
    quickTo(...e) {
      return this.env.win.gsap?.quickTo(...e) ?? null;
    }
    addTicker(e) {
      let t = this.env.win.gsap;
      if (t?.ticker)
        return (
          t.ticker.add(e),
          () => {
            try {
              t.ticker?.remove(e);
            } catch {}
          }
        );
      let n = this.env.win,
        o = 0,
        i = !0,
        s = () => {
          i && (e(), i && (o = n.requestAnimationFrame(s)));
        };
      return (
        (o = n.requestAnimationFrame(s)),
        () => {
          (i = !1), n.cancelAnimationFrame(o);
        }
      );
    }
    createObserver(...e) {
      return this.env.win.Observer?.create(...e) ?? null;
    }
  };
});
var Yr = m((Dt) => {
  "use strict";
  Object.defineProperty(Dt, "__esModule", { value: !0 });
  Object.defineProperty(Dt, "AnimationCoordinator", {
    enumerable: !0,
    get: function () {
      return Ve;
    },
  });
  var Ft = Y(),
    D = pe(),
    Lt = Rt(),
    Ns = Hr(),
    Fs = zr();
  function Ls(r) {
    return (
      typeof r == "string" &&
      (r.startsWith("+=") || r.startsWith("-=") || r.startsWith("random("))
    );
  }
  function Ds(r) {
    for (let e of [r.to, r.from])
      if (e) {
        for (let t in e) if (Ls(e[t])) return !0;
      }
    return !1;
  }
  var Be = class {
      timelineDefs;
      getHandler;
      getTargetResolver;
      resolveFn;
      getInteractionForTimeline;
      env;
      subs;
      dynamicFlags;
      cleanupFns;
      scrollTriggers;
      aliases;
      flipEaseBySource;
      pluginRuntimeBridge;
      animation;
      sharedGroups;
      resolveAlias(e, t = 0) {
        if (t > Be.MAX_ALIAS_DEPTH)
          return (
            console.warn(
              `IX3: Timeline alias chain exceeded max depth for "${e}". Possible circular reference.`
            ),
            e
          );
        let n = this.aliases.get(e);
        return n ? this.resolveAlias(n, t + 1) : e;
      }
      shouldFlipEaseForTimeline(e) {
        let t = this.resolveSourceTimelineId(e),
          n = [t];
        for (let [l] of this.timelineDefs)
          l !== t && this.resolveSourceTimelineId(l) === t && n.push(l);
        let o = new Set(n),
          i = !1,
          s = (l) => {
            if (l === "reverseFlipEase" || l === "togglePlayReverseFlipEase")
              i = !0;
            else if (l === "reverse" || l === "togglePlayReverse") return !0;
            return !1;
          },
          a = new Map();
        for (let l of n) {
          let c = this.getInteractionForTimeline(l);
          c && a.set(c.id, c);
        }
        for (let l of a.values()) {
          let c = l.timelineIds ?? [];
          for (let [, u] of l.triggers) {
            let d = u?.assignedGroupId;
            if (d === null) continue;
            let f = u?.assignedTimelineRole,
              p =
                f != null
                  ? c.filter(
                      (y) =>
                        this.timelineDefs.get(y)?.triggerMetadata?.role === f
                    )
                  : null,
              g;
            if (d != null) {
              let y = c.filter((E) => this.timelineDefs.get(E)?.groupId === d);
              if (y.length > 0) g = y;
              else if (
                c.some((E) => this.timelineDefs.get(E)?.triggerMetadata != null)
              )
                g = p;
              else continue;
            } else g = p;
            let h = (y) =>
                (y != null ? [y] : c).filter(
                  (b) => (g == null || g.includes(b)) && o.has(b)
                ),
              v = u?.conditionalLogic;
            if (v) {
              for (let y of [v.ifTrue, v.ifFalse])
                if (
                  y &&
                  h(y.targetTimelineId ?? void 0).length > 0 &&
                  s(y.control)
                )
                  return !1;
            } else
              for (let y of h()) {
                let E = this.timelineDefs.get(y),
                  b = E?.triggerMetadata ? E.settings?.control : u?.control;
                if (s(b)) return !1;
              }
          }
        }
        return i;
      }
      recomputeFlipEaseForSource(e) {
        let t = this.resolveSourceTimelineId(e),
          n = this.subs.get(t);
        if (!n) return;
        let o = this.shouldFlipEaseForTimeline(t);
        if (o !== this.flipEaseBySource.get(t)) {
          this.flipEaseBySource.set(t, o);
          for (let i of n.values()) this.scheduleRebuild(i);
        }
      }
      resolveSourceTimelineId(e) {
        let t = e;
        for (let n = 0; n <= Be.MAX_ALIAS_DEPTH; n++) {
          let i = this.timelineDefs.get(t)?.reuse?.sourceTimelineId;
          if (!i) return t;
          t = i;
        }
        return (
          console.warn(
            `IX3: Timeline reuse chain exceeded max depth for "${e}". Possible circular reference.`
          ),
          t
        );
      }
      globalSplitRegistry;
      timelineTargetsCache;
      constructor(e, t, n, o, i, s) {
        (this.timelineDefs = e),
          (this.getHandler = t),
          (this.getTargetResolver = n),
          (this.resolveFn = o),
          (this.getInteractionForTimeline = i),
          (this.env = s),
          (this.subs = new Map()),
          (this.dynamicFlags = new Map()),
          (this.cleanupFns = new Map()),
          (this.scrollTriggers = new Map()),
          (this.aliases = new Map()),
          (this.flipEaseBySource = new Map()),
          (this.pluginRuntimeBridge = new Ns.PluginRuntimeBridge()),
          (this.sharedGroups = new Map()),
          (this.globalSplitRegistry = new Map()),
          (this.timelineTargetsCache = new WeakMap()),
          (this.getStaggerConfig = (a, l) => {
            if (!a) return;
            let { ease: c, amount: u, from: d, grid: f, axis: p, each: g } = a,
              h = {};
            if (
              (u != null && (h.amount = (0, D.toSeconds)(u)),
              g != null && (h.each = (0, D.toSeconds)(g)),
              d != null && (h.from = d),
              f != null && (h.grid = f),
              p != null && (h.axis = p),
              c != null)
            ) {
              let v = (0, Lt.convertEaseConfigToGSAP)(c, void 0, l);
              v != null && (h.ease = v);
            }
            return h;
          }),
          (this.animation = new Fs.RuntimeMotionDriver(s));
      }
      registerSharedGroup(e, t) {
        if (t.length < 2) return;
        let n = [e, e];
        for (let o of t)
          this.sharedGroups.set(o, n), o !== e && this.aliases.set(o, e);
      }
      createTimeline(e, t) {
        let n = this.timelineDefs.get(e);
        if (this.aliases.has(e)) return;
        let o = this.sharedGroups.get(e);
        if ((this.destroy(e), !n)) return;
        if ((o && this.sharedGroups.set(e, o), n.reuse?.sourceTimelineId)) {
          this.aliases.set(e, n.reuse.sourceTimelineId),
            this.recomputeFlipEaseForSource(n.reuse.sourceTimelineId);
          return;
        }
        let i = this.isDynamicTimeline(n, t);
        this.dynamicFlags.set(e, i);
        let s = new Set(),
          a = new Set();
        for (let [, l, c] of t.triggers) {
          if (c) for (let d of this.resolveFn(c, {}, t)) a.add(d);
          let u = l?.controlType;
          u && (0, D.isValidControlType)(u) && s.add(u);
        }
        if (!a.size || !i) {
          let l = this.buildSubTimeline(e, null, s);
          l && this.ensureSubs(e).set(null, l);
        }
        if (a.size) {
          let l = this.ensureSubs(e);
          for (let c of a)
            if (!l.has(c)) {
              let u = i ? this.buildSubTimeline(e, c, s) : this.getSub(e, null);
              i && u && l.set(c, u);
            }
        }
        this.flipEaseBySource.set(e, this.shouldFlipEaseForTimeline(e));
      }
      getTimeline(e, t) {
        return this.prepareIfShared(e, t), this.getSub(e, t)?.timeline;
      }
      prepareIfShared(e, t) {
        let n = this.sharedGroups.get(e);
        if (!n || n[1] === e) return;
        let o = this.timelineDefs.get(e);
        if (!o) return;
        let i = this.getSub(n[0], t);
        if (!i) return;
        let s = i.timelineId;
        for (let u of i.cleanupFns ?? []) u();
        i.cleanupFns?.clear();
        let a = this.cleanupFns.get(s);
        if (a) {
          for (let u of a) u();
          a.clear();
        }
        let l = i.timeline;
        l.clear(), l.progress(0);
        let c = this.convertToGsapDefaults(o.settings || {}, e);
        if (
          (l.repeat(typeof c.repeat == "number" ? c.repeat : 0),
          l.repeatDelay(typeof c.repeatDelay == "number" ? c.repeatDelay : 0),
          l.yoyo(c.yoyo === !0),
          l.delay(typeof c.delay == "number" ? c.delay : 0),
          l.reversed(!!o.playInReverse),
          l.timeScale(
            typeof o.settings?.speed == "number" ? o.settings.speed : 1
          ),
          (i.timelineDef = { ...o, actions: o.actions || [] }),
          (i.timelineId = e),
          this.timelineTargetsCache.delete(i),
          this.env.win.SplitText && o.actions?.length)
        ) {
          let u = this.analyzeSplitRequirements(o.actions, t, e);
          for (let [d, { types: f, masks: p }] of u)
            this.doSplitText(
              { type: this.getSplitTypeString(f), mask: this.getMaskString(p) },
              [d],
              i,
              this.env.win.SplitText
            );
        }
        this.buildTimeline(i), (n[1] = e);
      }
      getAllTimelines(e) {
        let t = this.resolveAlias(e),
          n = this.subs.get(t);
        if (!n) return [];
        for (let o of n.keys()) this.prepareIfShared(e, o);
        return Array.from(n.values()).map((o) => o.timeline);
      }
      invalidateVolatileFromStart(e, t) {
        let n = t != null ? t === 0 : e.timeline.progress() === 0;
        e.hasVolatileValues && n && e.timeline.invalidate();
      }
      play(e, t, n) {
        this.prepareIfShared(e, t);
        let o = this.getSub(e, t);
        o &&
          (this.invalidateVolatileFromStart(o, n),
          o.timeline.play(n ?? void 0));
      }
      pause(e, t, n) {
        this.prepareIfShared(e, t);
        let o = this.getSubOrNull(e, t);
        o && (n !== void 0 ? o.timeline.pause(n) : o.timeline.pause());
      }
      resume(e, t, n) {
        this.prepareIfShared(e, t);
        let o = this.getSubOrNull(e, t);
        o && (this.invalidateVolatileFromStart(o, n), o.timeline.resume(n));
      }
      reverse(e, t, n) {
        this.prepareIfShared(e, t), this.getSub(e, t)?.timeline.reverse(n);
      }
      restart(e, t) {
        this.prepareIfShared(e, t);
        let n = this.getSub(e, t);
        n &&
          (n.hasVolatileValues && n.timeline.invalidate(),
          n.timeline.restart());
      }
      getTriggerMetadata(e) {
        return this.timelineDefs.get(e)?.triggerMetadata ?? null;
      }
      fireInterval(e, t, n = {}) {
        this.pluginRuntimeBridge.fireInterval({
          coordinator: this,
          timelineId: e,
          element: t,
          options: n,
          animation: this.animation,
        });
      }
      registerIntervalHandler(e, t) {
        this.pluginRuntimeBridge.registerIntervalHandler(e, t);
      }
      getOneShotTimelineContext(e) {
        let t = this.getTimelineDef(e);
        return t
          ? {
              timelineId: e,
              timelineDef: t,
              getFirstActionTargets: (n) => this.getFirstActionTargets(e, n),
              getActionTweenConfig: (n, o, i) =>
                this.getActionTweenConfig(n, o, i),
              buildActionTimeline: (n) => this.buildOneShotActionTimeline(e, n),
              registerCleanup: (n) => this.registerCleanup(e, n),
            }
          : null;
      }
      getTimelineDef(e) {
        return this.timelineDefs.get(this.resolveAlias(e));
      }
      getFirstActionTargets(e, t) {
        let o = this.getTimelineDef(e)?.actions?.[0];
        return o ? this.collectTargets(o, t, e) : [];
      }
      getActionTweenConfig(e, t, n) {
        let o = this.getHandler(t);
        if (!o?.createTweenConfig) return null;
        let i = e.properties[t] || {};
        return o.createTweenConfig(i, n);
      }
      registerCleanup(e, t) {
        let n = this.cleanupFns.get(e) ?? new Set();
        return (
          this.cleanupFns.set(e, n),
          n.add(t),
          () => {
            n.delete(t);
          }
        );
      }
      publishChannel(e, t, n) {
        this.pluginRuntimeBridge.publish(e, t, n);
      }
      subscribeChannel(e, t, n, o) {
        return this.pluginRuntimeBridge.subscribe(e, t, n, o);
      }
      buildOneShotActionTimeline(e, t) {
        let n = this.getTimelineDef(e);
        if (!n?.actions?.length) return null;
        let o = this.animation.timeline();
        if (!o) return null;
        t.beforeTweens?.(o);
        for (let i of n.actions)
          this.buildTweensForAction(
            i,
            t.targets,
            o,
            e,
            !1,
            t.varsTransform,
            void 0,
            void 0,
            void 0,
            t.cleanupBucket
          );
        return o;
      }
      togglePlayReverse(e, t) {
        this.prepareIfShared(e, t);
        let n = this.getSub(e, t);
        if (!n) return;
        let o = n.timeline,
          i = o.progress();
        this.invalidateVolatileFromStart(n),
          i === 0
            ? o.play()
            : i === 1
            ? o.reverse()
            : o.reversed()
            ? o.play()
            : o.reverse();
      }
      seek(e, t, n) {
        this.getSubOrNull(e, n)?.timeline.seek(t);
      }
      setTimeScale(e, t, n) {
        this.prepareIfShared(e, n),
          this.getSubOrNull(e, n)?.timeline.timeScale(t);
      }
      setTotalProgress(e, t, n) {
        this.getSubOrNull(e, n)?.timeline.totalProgress(t);
      }
      setContinuousProgress(e, t, n) {
        this.getSub(e, n)?.timeline.progress(Math.max(0, Math.min(1, t)));
      }
      isPlaying(e, t) {
        return !!this.getSubOrNull(e, t)?.timeline.isActive();
      }
      isPaused(e, t) {
        return !!this.getSubOrNull(e, t)?.timeline.paused();
      }
      destroy(e) {
        this.aliases.delete(e), this.pluginRuntimeBridge.destroyTimeline(e);
        let t = this.subs.get(e),
          n = new Set();
        if (t) {
          for (let [, o] of t) {
            if (
              (o.timelineId !== e && n.add(o.timelineId),
              (o.rebuildState = "init"),
              o.timeline && (o.timeline.revert(), o.timeline.kill()),
              o.scrollTriggerIds)
            ) {
              for (let i of o.scrollTriggerIds) this.cleanupScrollTrigger(i);
              o.scrollTriggerIds.clear();
            }
            o.scrollTriggerConfigs && o.scrollTriggerConfigs.clear();
            for (let i of o.cleanupFns ?? []) i();
            o.cleanupFns?.clear(), this.timelineTargetsCache.delete(o);
          }
          for (let [, o] of this.globalSplitRegistry) o.splitInstance.revert();
          this.globalSplitRegistry.clear();
        }
        for (let o of this.cleanupFns.get(e) ?? []) o();
        for (let o of n) {
          for (let i of this.cleanupFns.get(o) ?? []) i();
          this.cleanupFns.delete(o);
        }
        this.cleanupFns.delete(e),
          this.subs.delete(e),
          this.dynamicFlags.delete(e),
          this.flipEaseBySource.delete(e),
          this.sharedGroups.delete(e);
      }
      isDynamicTimeline(e, t) {
        let n = t.triggers.some(
          ([, i]) => i?.controlType !== Ft.TimelineControlType.LOAD
        );
        if (t.scope?.type === "component" && n) return !0;
        let o = e.actions;
        if (!o?.length) return !1;
        for (let i of o) {
          for (let s of i.targets ?? []) {
            if (this.getTargetResolver(s)?.isDynamic) return !0;
            if (s.length === 3 && s[2]) {
              let l = s[2];
              if (
                l.filterBy &&
                l.relationship !== "none" &&
                this.getTargetResolver(l.filterBy)?.isDynamic
              )
                return !0;
            }
          }
          if (n) {
            for (let s in i.properties)
              if (this.getHandler(s)?.requiresTriggerElementContext) return !0;
          }
        }
        return !1;
      }
      ensureSubs(e) {
        return (
          this.subs.has(e) || this.subs.set(e, new Map()), this.subs.get(e)
        );
      }
      getSub(e, t) {
        let n = this.resolveAlias(e),
          o = this.ensureSubs(n),
          i = this.dynamicFlags.get(n),
          s = o.get(i ? t : null);
        return (
          s || ((s = this.buildSubTimeline(n, t)), s && o.set(i ? t : null, s)),
          s
        );
      }
      getSubOrNull(e, t) {
        let n = this.resolveAlias(e),
          o = this.dynamicFlags.get(n);
        return this.subs.get(n)?.get(o ? t ?? null : null);
      }
      convertToGsapDefaults(e, t) {
        let n = {},
          o = t ? (0, D.buildEaseContextId)(t, "defaults") : void 0,
          i = t ? (0, D.buildEaseContextId)(t, "defaults-stagger") : void 0;
        if (
          (e.duration != null && (n.duration = (0, D.toSeconds)(e.duration)),
          e.ease != null)
        ) {
          let s = (0, Lt.convertEaseConfigToGSAP)(e.ease, void 0, o);
          s != null && (n.ease = s);
        }
        if (
          (e.delay != null &&
            (n.delay =
              typeof e.delay == "number" ? e.delay : (0, D.toSeconds)(e.delay)),
          e.repeat != null && (n.repeat = e.repeat),
          e.repeatDelay != null &&
            (n.repeatDelay = (0, D.toSeconds)(e.repeatDelay)),
          e.stagger != null)
        ) {
          let s = this.getStaggerConfig(e.stagger, i);
          s && (n.stagger = s);
        }
        return e.yoyo != null && (n.yoyo = e.yoyo), n;
      }
      buildSubTimeline(e, t, n) {
        let o = this.timelineDefs.get(e),
          i = o?.actions,
          s = o?.settings,
          a = this.env.win.gsap;
        if (!a) return;
        let l = a.timeline({
            ...this.convertToGsapDefaults(s || {}, e),
            paused: !0,
            reversed: !!o?.playInReverse,
            data: { id: e, triggerEl: t || void 0 },
          }),
          c = o
            ? { ...o, actions: i || [] }
            : { id: e, pageId: "", deleted: !1, actions: [] },
          u = {
            timeline: l,
            timelineId: e,
            elementContext: t,
            timelineDef: c,
            rebuildState: "init",
            controlTypes: n,
          };
        if (!i?.length) return u;
        if (this.env.win.SplitText) {
          let d = this.analyzeSplitRequirements(i, t, e);
          for (let [f, { types: p, masks: g }] of d) {
            let h = this.getSplitTypeString(p),
              v = this.getMaskString(g);
            this.doSplitText(
              { type: h, mask: v },
              [f],
              u,
              this.env.win.SplitText
            );
          }
        }
        return this.buildTimeline(u), this.padTimelineToCanvas(u), u;
      }
      padTimelineToCanvas(e) {
        let { canvasDuration: t } = e.timelineDef;
        if (t == null) return;
        let n = e.timeline;
        n.duration() < t && n.to({}, { duration: 0 }, t);
      }
      buildTimeline(e) {
        let t = e.timelineDef,
          n = e.elementContext,
          o = e.timeline,
          i = e.timelineId,
          s = new Map();
        for (let a = 0; a < t.actions.length; a++) {
          let l = t.actions[a];
          if (!l) continue;
          let c = JSON.stringify(l.targets),
            u = !0,
            d = Wr(l),
            f = d === "none" ? c : `${c}_split_${d}`,
            p = (l.tt ?? 0) !== 0;
          for (let v of Object.values(l.properties ?? {})) {
            let y = s.get(f) || new Set();
            s.set(f, y);
            for (let E of Object.keys(v || {}))
              y.has(E) ? p && (u = !1) : y.add(E);
          }
          let g = this.collectTargets(l, n, i);
          if (!g.length) {
            let v = !1;
            for (let y in l.properties)
              if (this.getHandler(y)?.createCustomTween) {
                v = !0;
                break;
              }
            if (!v) continue;
          }
          let h = g;
          (d !== "none" &&
            g.length > 0 &&
            this.env.win.SplitText &&
            ((h = this.getSplitElements(g, d)), h.length === 0)) ||
            this.buildTweensForAction(
              l,
              h,
              o,
              i,
              u,
              void 0,
              n,
              t.triggerMetadata?.role,
              e
            );
        }
      }
      collectTargets(e, t, n) {
        if (!e.targets) return [];
        let o = [],
          i = this.getInteractionForTimeline(n);
        for (let s of e.targets ?? []) {
          let a = this.resolveFn(s, t ? { triggerElement: t } : {}, i);
          o.push(...a);
        }
        return o;
      }
      buildTweensForAction(e, t, n, o, i, s, a, l, c, u) {
        let d = this.shouldFlipEaseForTimeline(o),
          f = c?.timelineDef.canvasDuration != null;
        for (let p in e.properties) {
          let g = p,
            h = this.getHandler(g);
          if (!h) continue;
          let v = e.properties[g] || {};
          try {
            let y = e.timing?.position;
            y =
              typeof y == "string" && y.endsWith("ms")
                ? (0, D.toSeconds)(y)
                : y ?? 0;
            let E = e.timing?.duration ?? Ft.DEFAULTS.DURATION,
              b = this.getStaggerConfig(
                e.timing?.stagger,
                (0, D.buildEaseContextId)(e.id, "stagger")
              );
            b && E === 0 && (E = 0.001);
            let M = { id: e.id, presetId: e.presetId, color: e.color },
              w = {
                force3D: !0,
                ...(!i && { immediateRender: i }),
                data: M,
                ...(e.tt !== 3 && { duration: (0, D.toSeconds)(E) }),
                ...(e.timing?.repeat != null && {
                  repeat: f && e.timing.repeat < 0 ? 0 : e.timing.repeat,
                }),
                ...(e.timing?.repeatDelay != null && {
                  repeatDelay: (0, D.toSeconds)(e.timing.repeatDelay),
                }),
                ...(e.timing?.yoyo != null && { yoyo: e.timing.yoyo }),
                ...(b && { stagger: b }),
              };
            if (e.timing?.ease != null) {
              let T = (0, Lt.convertEaseConfigToGSAP)(
                e.timing.ease,
                void 0,
                (0, D.buildEaseContextId)(e.id, "timing")
              );
              T != null && (w.ease = T);
            }
            if ((d && (w.easeReverse = !0), h.createTweenConfig)) {
              let T = h.createTweenConfig(v, t);
              s?.(g, e, T),
                T.modifiers &&
                  (w.modifiers = { ...w.modifiers, ...T.modifiers }),
                c &&
                  !c.hasVolatileValues &&
                  Ds(T) &&
                  (c.hasVolatileValues = !0);
              let S = Object.keys(T.from || {}).length > 0,
                _ = Object.keys(T.to || {}).length > 0,
                A = e.tt ?? 0;
              if (A === 0 && !_) continue;
              if (A === 1 && !S) continue;
              if (A === 2 && !S && !_) continue;
              if (A === 3 && !_) continue;
              A === 1
                ? n.from(t, { ...w, ...T.from }, y)
                : A === 2
                ? n.fromTo(t, { ...T.from }, { ...w, ...T.to }, y)
                : A === 3
                ? n.set(t, { ...w, ...T.to }, y)
                : n.to(t, { ...w, ...T.to }, y);
            } else if (h.createCustomTween) {
              let T = h.createCustomTween(n, e, v, w, t, y || 0, {
                triggerElement: a ?? null,
                timelineRole: l,
                subscribeChannel: (S, _) =>
                  this.subscribeChannel(o, S, a ?? null, _),
                animation: this.animation,
              });
              if (T)
                if (u != null) u.add(T);
                else if (c != null) {
                  let S = c.cleanupFns ?? new Set();
                  (c.cleanupFns = S), S.add(T);
                } else {
                  let S = this.cleanupFns.get(o) ?? new Set();
                  this.cleanupFns.set(o, S), S.add(T);
                }
            }
          } catch (y) {
            console.error("Error building tween:", y);
          }
        }
      }
      analyzeSplitRequirements(e, t, n) {
        let o = new Map();
        for (let i of e) {
          let s = Wr(i);
          if (s === "none") continue;
          let a = typeof i.splitText == "object" ? i.splitText.mask : void 0;
          for (let l of this.collectTargets(i, t, n)) {
            if (l === document.body) continue;
            let c = o.get(l) || { types: new Set(), masks: new Set() };
            o.set(l, c), c.types.add(s), a && c.masks.add(a);
          }
        }
        return o;
      }
      getSplitTypeString(e) {
        return (
          e.has("chars") && !e.has("words") && (e = new Set([...e, "words"])),
          ["lines", "words", "chars"].filter((o) => e.has(o)).join(", ")
        );
      }
      getMaskString(e) {
        if (e.size !== 0) {
          if (e.has("lines")) return "lines";
          if (e.has("words")) return "words";
          if (e.has("chars")) return "chars";
        }
      }
      doSplitText(e, t, n, o) {
        try {
          let i = je(e.type);
          for (let s of t) {
            let a = this.globalSplitRegistry.get(s);
            if (a) {
              let f = new Set(je(a.splitTextConfig.type));
              if (i.every((g) => f.has(g))) continue;
              a.splitInstance.revert(),
                this.globalSplitRegistry.delete(s),
                (e = {
                  type: [...new Set([...f, ...i])].join(", "),
                  mask: e.mask || a.splitTextConfig.mask,
                });
            }
            let l = { type: e.type, tag: "span" },
              c = je(e.type),
              { mask: u } = e;
            c.includes("lines") &&
              ((n.timeline.data.splitLines = !0),
              (l.linesClass = (0, D.defaultSplitClass)("line")),
              (l.autoSplit = !0),
              (l.onSplit = (f) => {
                this.applySplitElementStyles(f, u),
                  n.rebuildState !== "init"
                    ? this.scheduleRebuildForElement(s)
                    : (n.rebuildState = "idle");
              })),
              c.includes("words") &&
                (l.wordsClass = (0, D.defaultSplitClass)("word")),
              c.includes("chars") &&
                (l.charsClass = (0, D.defaultSplitClass)("letter")),
              u && (l.mask = u);
            let d = new o([s], l);
            this.applySplitElementStyles(d, u),
              this.globalSplitRegistry.set(s, {
                splitInstance: d,
                splitTextConfig: e,
              }),
              a && this.scheduleRebuildForElement(s);
          }
        } catch (i) {
          console.error("Error splitting text:", i);
        }
      }
      applySplitElementStyles(e, t) {
        let n = [
          [e.lines, "block"],
          [e.words, "inline-block"],
          [e.chars, "inline-block"],
        ];
        t && n.push([e.masks, t === "lines" ? "block" : "inline-block"]);
        for (let [o, i] of n)
          for (let s of o) {
            let { style: a } = s;
            (a.position = "relative"), (a.display = i);
          }
      }
      scheduleRebuild(e) {
        if (
          e.rebuildState === "building" ||
          e.rebuildState === "rebuild_pending"
        ) {
          e.rebuildState = "rebuild_pending";
          return;
        }
        (e.rebuildState = "building"),
          this.timelineTargetsCache.delete(e),
          this.rebuildTimelineOnTheFly(e);
      }
      rebuildTimelineOnTheFly(e) {
        let t = e.timeline.progress(),
          n = e.controlTypes?.has(Ft.TimelineControlType.LOAD) && t !== 1,
          o = e.timeline.isActive() || n;
        e.timeline.pause(), e.timeline.revert(), e.timeline.clear();
        for (let i of e.cleanupFns ?? []) i();
        if (
          (e.cleanupFns?.clear(),
          this.buildTimeline(e),
          this.padTimelineToCanvas(e),
          e.timeline.progress(t),
          e.scrollTriggerIds && e.scrollTriggerConfigs)
        )
          for (let i of e.scrollTriggerIds) {
            let s = this.scrollTriggers.get(i),
              a = e.scrollTriggerConfigs.get(i);
            if (s && a) {
              let l = { ...a, animation: e.timeline };
              if ((s.kill(), this.env.win.ScrollTrigger)) {
                let c = this.env.win.ScrollTrigger.create(l);
                this.scrollTriggers.set(i, c);
              }
            }
          }
        else o && e.timeline.play();
        e.rebuildState === "rebuild_pending"
          ? ((e.rebuildState = "building"), this.rebuildTimelineOnTheFly(e))
          : (e.rebuildState = "idle");
      }
      getStaggerConfig;
      getSplitElements(e, t) {
        let n = [];
        for (let o of e) {
          let i = this.globalSplitRegistry.get(o);
          if (i && je(i.splitTextConfig.type).includes(t)) {
            let a = i.splitInstance[t];
            a?.length && n.push(...a);
          }
        }
        return n.length > 0 ? n : e;
      }
      setupScrollControl(e, t, n, o) {
        if (typeof this.env.win.ScrollTrigger > "u") {
          console.warn("ScrollTrigger plugin is not available.");
          return;
        }
        let i = `st_${e}_${t}_${
          o.id || window.crypto.randomUUID().slice(0, 8)
        }`;
        this.cleanupScrollTrigger(i);
        let s = this.getTimeline(e, o);
        if (!s) {
          console.warn(`Timeline ${e} not found`);
          return;
        }
        let a = Bs(
          n,
          o,
          i,
          s,
          this.resolveFn,
          this.getSubOrNull(e, o)?.hasVolatileValues ?? !1
        );
        try {
          let l = this.env.win.ScrollTrigger.create(a);
          this.scrollTriggers.set(i, l);
          let c = this.getSub(e, o);
          c.scrollTriggerIds || (c.scrollTriggerIds = new Set()),
            c.scrollTriggerConfigs || (c.scrollTriggerConfigs = new Map()),
            c.scrollTriggerIds.add(i),
            c.scrollTriggerConfigs.set(i, a);
        } catch (l) {
          console.error("Failed to create ScrollTrigger:", l);
        }
      }
      cleanupScrollTrigger(e) {
        let t = this.scrollTriggers.get(e);
        t && (t.kill(), this.scrollTriggers.delete(e));
      }
      getScrollTriggers() {
        return this.scrollTriggers;
      }
      getTimelineTargets(e) {
        let t = this.timelineTargetsCache.get(e);
        if (t) return t;
        t = new WeakSet();
        for (let n of e.timelineDef.actions ?? [])
          for (let o of this.collectTargets(n, e.elementContext, e.timelineId))
            t.add(o);
        return this.timelineTargetsCache.set(e, t), t;
      }
      scheduleRebuildForElement(e) {
        for (let [, t] of this.subs)
          for (let [, n] of t)
            this.getTimelineTargets(n).has(e) && this.scheduleRebuild(n);
      }
    },
    Ve = Be;
  fe(Ve, "MAX_ALIAS_DEPTH", 10);
  function js(r, e, t) {
    let n = {},
      o = (i) =>
        i && (i.parentElement === document.body || i === document.body);
    if (r.pin !== void 0)
      if (typeof r.pin == "boolean") r.pin && !o(e) && (n.pin = r.pin);
      else {
        let i = t(r.pin, { triggerElement: e });
        i.length > 0 && !o(i[0]) && (n.pin = i[0]);
      }
    if (r.endTrigger) {
      let i = t(r.endTrigger, { triggerElement: e });
      i.length > 0 && (n.endTrigger = i[0]);
    }
    if (r.scroller) {
      let i = t(r.scroller, { triggerElement: e });
      i.length > 0 ? (n.scroller = i[0]) : (n.scroller = window);
    }
    return n;
  }
  function Vs(r, e, t = !1) {
    let [n, o, i, s] = r,
      a = (c) => () => {
        if (c !== void 0)
          switch (c) {
            case "play":
              t && e.progress() === 0 && e.invalidate(), e.play();
              break;
            case "pause":
              e.pause();
              break;
            case "resume":
              t && e.progress() === 0 && e.invalidate(), e.resume();
              break;
            case "reverse":
              e.reverse();
              break;
            case "restart":
              t && e.invalidate(), e.restart();
              break;
            case "reset":
              e.pause(0);
              break;
            case "complete":
              t && e.progress() === 0 && e.invalidate(), e.progress(1);
              break;
            case "none":
              break;
            default: {
              let u = c;
              break;
            }
          }
      },
      l = {};
    return (
      n !== "none" && (l.onEnter = a(n)),
      o !== "none" && (l.onLeave = a(o)),
      i !== "none" && (l.onEnterBack = a(i)),
      s !== "none" && (l.onLeaveBack = a(s)),
      l
    );
  }
  function Bs(r, e, t, n, o, i = !1) {
    let s = js(r, e, o),
      a = [
        r.enter || "none",
        r.leave || "none",
        r.enterBack || "none",
        r.leaveBack || "none",
      ],
      l = {
        trigger: e,
        markers: r.showMarkers ?? !1,
        start: r.clamp ? `clamp(${r.start})` : r.start || "top bottom",
        end: r.clamp ? `clamp(${r.end})` : r.end || "bottom top",
        scrub: r.scrub ?? !1,
        horizontal: r.horizontal || !1,
        toggleActions: a.join(" "),
        id: t,
        ...s,
      };
    if (l.scrub !== !1) l.animation = n;
    else {
      let c = Vs(a, n, i);
      Object.assign(l, c);
    }
    return l;
  }
  function Wr(r) {
    return r.splitText
      ? typeof r.splitText == "string"
        ? r.splitText
        : r.splitText.type
      : "none";
  }
  function je(r) {
    return r.split(", ");
  }
});
var Qr = m((jt) => {
  "use strict";
  Object.defineProperty(jt, "__esModule", { value: !0 });
  Object.defineProperty(jt, "analyzeSharedTimelineGroups", {
    enumerable: !0,
    get: function () {
      return Us;
    },
  });
  var Xr = Y();
  function Us(r, e, t, n, o) {
    let i = r.timelineIds ?? [];
    if (i.length < 2) return [];
    for (let [, c] of r.triggers) {
      if (c?.controlType === Xr.TimelineControlType.CONTINUOUS) return [];
      if (Gs(c)) return [];
    }
    if (Xs(r.triggers, t, r)) return [];
    let s = [];
    for (let c of i) {
      let u = e.get(c);
      if (!u || u.reuse || !u.actions?.length || Qs(u, n) || o?.(u, r))
        continue;
      let d = new Set();
      for (let f of u.actions)
        if (f.targets)
          for (let p of f.targets) for (let g of t(p, {}, r)) d.add(g);
      s.push({ id: c, targets: d });
    }
    let a = [],
      l = new Set();
    for (let c = 0; c < s.length; c++) {
      if (l.has(c)) continue;
      let u = [s[c].id],
        d = new Set(s[c].targets);
      l.add(c);
      let f = !0;
      for (; f; ) {
        f = !1;
        for (let p = c + 1; p < s.length; p++)
          if (!l.has(p) && Zr(d, s[p].targets)) {
            u.push(s[p].id);
            for (let g of s[p].targets) d.add(g);
            l.add(p), (f = !0);
          }
      }
      if (u.length >= 2) {
        let p = u.findIndex((g) => qs(e.get(g), n));
        if (p > 0) {
          let [g] = u.splice(p, 1);
          u.unshift(g);
        }
        a.push({ primary: u[0], members: u });
      }
    }
    return a;
  }
  function qs(r, e) {
    if (!r?.actions) return !1;
    let t = new Map();
    for (let n of r.actions) {
      if (!n) continue;
      let o = n.tt ?? 0,
        i = n.splitText
          ? typeof n.splitText == "string"
            ? n.splitText
            : n.splitText.type
          : "none",
        s =
          i === "none"
            ? JSON.stringify(n.targets)
            : `${JSON.stringify(n.targets)}_split_${i}`,
        a = t.get(s) ?? new Set();
      t.set(s, a);
      let l = !1;
      for (let c of Object.values(n.properties ?? {}))
        for (let u of Object.keys(c || {})) a.has(u) ? (l = !0) : a.add(u);
      if ((o === 1 || o === 2) && !l && $s(n, e)) return !0;
    }
    return !1;
  }
  function $s(r, e) {
    for (let t in r.properties) {
      let n = e(t),
        o = r.properties[t];
      if (!(!n?.createTweenConfig || !o))
        try {
          let i = n.createTweenConfig(o);
          if (Object.keys(i.from ?? {}).length > 0) return !0;
        } catch {}
    }
    return !1;
  }
  function Gs(r) {
    return !r ||
      (r.controlType !== void 0 &&
        r.controlType !== Xr.TimelineControlType.STANDARD)
      ? !0
      : !(
          r.assignedGroupId !== void 0 ||
          r.assignedTimelineRole ||
          Hs(r.pluginConfig)
        );
  }
  function Hs(r) {
    return typeof r == "object" && r !== null && r.multiTimeline === !0;
  }
  function zs(r) {
    return typeof r?.assignedGroupId == "string" ? r.assignedGroupId : void 0;
  }
  function Ws(r) {
    let e = zs(r);
    return e !== void 0
      ? `group:${e}`
      : r?.assignedTimelineRole
      ? `role:${r.assignedTimelineRole}`
      : void 0;
  }
  function Ys(r) {
    let e = r?.pluginConfig;
    if (typeof e == "object" && e !== null) {
      let t = e.eventMode;
      return t === "enter" || t === "leave" ? t : void 0;
    }
  }
  function Xs(r, e, t) {
    let n = [];
    for (let [, o, i] of r) {
      let s = Ws(o);
      s !== void 0 &&
        n.push({
          route: s,
          eventMode: Ys(o),
          elements: i ? new Set(e(i, {}, t)) : new Set(),
        });
    }
    for (let o = 0; o < n.length; o++)
      for (let i = o + 1; i < n.length; i++) {
        if (n[o].route === n[i].route) continue;
        let s = n[o].eventMode,
          a = n[i].eventMode,
          l = Zr(n[o].elements, n[i].elements),
          c = s !== void 0 && a !== void 0;
        if (l) {
          if (!(c && s !== a)) return !0;
        } else if (c || Zs(n[o].elements, n[i].elements)) return !0;
      }
    return !1;
  }
  function Zr(r, e) {
    let [t, n] = r.size <= e.size ? [r, e] : [e, r];
    for (let o of t) if (n.has(o)) return !0;
    return !1;
  }
  function Zs(r, e) {
    for (let t of r)
      for (let n of e)
        if (t !== n && (t.contains(n) || n.contains(t))) return !0;
    return !1;
  }
  function Qs(r, e) {
    for (let t of r.actions ?? [])
      for (let n in t.properties) if (e(n)?.createCustomTween) return !0;
    return !1;
  }
});
var Kr = m((Bt) => {
  "use strict";
  Object.defineProperty(Bt, "__esModule", { value: !0 });
  Object.defineProperty(Bt, "ConditionEvaluator", {
    enumerable: !0,
    get: function () {
      return Vt;
    },
  });
  var he = Y(),
    Vt = class {
      getConditionEvaluator;
      sharedObservers = new Map();
      conditionCache = new Map();
      CACHE_TTL = 100;
      constructor(e) {
        this.getConditionEvaluator = e;
      }
      evaluateConditionsForTrigger = async (e, t) => {
        if (!e?.length) return !0;
        let n = e.some(([o]) => o === he.CORE_OPERATORS.OR);
        return this.evaluateCondition(
          [n ? he.CORE_OPERATORS.OR : he.CORE_OPERATORS.AND, { conditions: e }],
          t
        );
      };
      observeConditionsForTrigger = (e, t) => {
        if (!e?.length) return () => {};
        let n = [],
          o = [];
        for (let s of e)
          this.getConditionEvaluator(s)?.isReactive ?? !1
            ? n.push(s)
            : o.push(s[0]);
        if (n.length === 0) return () => {};
        let i = n.map((s) => this.getOrCreateSharedObserver(s, t));
        return () => {
          for (let s of i) s();
        };
      };
      disposeSharedObservers = () => {
        for (let [e, t] of this.sharedObservers)
          try {
            t.cleanup();
          } catch (n) {
            console.error("Error disposing shared observer: %s", e, n);
          }
        this.sharedObservers.clear(), this.conditionCache.clear();
      };
      observeCondition = (e, t) => {
        let n = this.getEvaluator(e);
        if (n?.observe)
          try {
            return n.observe(e, t);
          } catch (o) {
            console.error("Error setting up condition observer:", o);
          }
      };
      getEvaluator = (e) => {
        let [t] = e;
        return t === he.CORE_OPERATORS.AND || t === he.CORE_OPERATORS.OR
          ? this.getLogicalEvaluator(t)
          : this.getConditionEvaluator(e);
      };
      getLogicalEvaluator = (e) => ({
        evaluate: async (t, n) => {
          let [, o, i] = t,
            { conditions: s } = o || {};
          if (!Array.isArray(s)) return !1;
          if (!s.length) return !0;
          let a = e === he.CORE_OPERATORS.OR,
            l = i === 1;
          for (let c of s) {
            let u = await this.evaluateCondition(c, n);
            if (a ? u : !u) return a ? !l : !!l;
          }
          return a ? !!l : !l;
        },
        observe: (t, n) => {
          let [, o] = t,
            { conditions: i } = o || {};
          if (!Array.isArray(i)) return () => {};
          let s = i.map((a) =>
            this.observeCondition(a, async () =>
              n(await this.evaluateCondition(t))
            )
          );
          return () => s.forEach((a) => a && a());
        },
      });
      evaluateCondition = async (e, t) => {
        let n = this.generateConditionCacheKey(e, t),
          o = Date.now(),
          i = this.conditionCache.get(n);
        if (i && o - i.timestamp < this.CACHE_TTL) return i.result;
        let s = this.getEvaluator(e);
        if (!s)
          return (
            console.warn(`No evaluator found for condition type '${e[0]}'`), !1
          );
        try {
          let a = await s.evaluate(e, t);
          return this.conditionCache.set(n, { result: a, timestamp: o }), a;
        } catch (a) {
          return console.error("Error evaluating condition:", a), !1;
        }
      };
      generateConditionCacheKey = (e, t) => {
        let [n, o, i] = e,
          s = o ? JSON.stringify(o) : "",
          a = i ? ":negate" : "",
          l = t ? `:ctx:${t.id}` : "";
        return `${n}:${s}${a}${l}`;
      };
      invalidateConditionCache = (e) => {
        let [t] = e,
          n = [];
        for (let o of this.conditionCache.keys())
          o.startsWith(`${t}:`) && n.push(o);
        n.forEach((o) => this.conditionCache.delete(o));
      };
      generateObserverKey = (e) => {
        let [t, n, o] = e,
          i = n ? JSON.stringify(n) : "";
        return `${t}:${i}${o ? ":negate" : ""}`;
      };
      getOrCreateSharedObserver = (e, t) => {
        let n = this.generateObserverKey(e),
          o = this.sharedObservers.get(n);
        if (!o) {
          let i = this.getEvaluator(e);
          if (!i?.observe) return () => {};
          let s = new Set(),
            a = i.observe(e, async () => {
              this.invalidateConditionCache(e);
              let l = Array.from(s, async (c) => {
                try {
                  await c();
                } catch (u) {
                  console.error("Error in shared observer callback:", u);
                }
              });
              await Promise.allSettled(l);
            });
          if (!a) return () => {};
          (o = { cleanup: a, refCount: 0, callbacks: s }),
            this.sharedObservers.set(n, o);
        }
        return (
          o.callbacks.add(t),
          o.refCount++,
          () => this.releaseSharedObserver(n, t)
        );
      };
      releaseSharedObserver = (e, t) => {
        let n = this.sharedObservers.get(e);
        if (
          !(!n || !n.callbacks.delete(t)) &&
          ((n.refCount = Math.max(0, n.refCount - 1)),
          n.refCount <= 0 && n.callbacks.size === 0)
        ) {
          try {
            n.cleanup();
          } catch (i) {
            console.error("Error cleaning up shared observer:", i);
          }
          this.sharedObservers.delete(e);
        }
      };
    };
});
var Jr = m((qt) => {
  "use strict";
  Object.defineProperty(qt, "__esModule", { value: !0 });
  Object.defineProperty(qt, "ConditionalPlaybackManager", {
    enumerable: !0,
    get: function () {
      return Ut;
    },
  });
  var Ks = Y(),
    Ut = class {
      matchMediaInstances = new Map();
      setupConditionalContext = (e, t, n) => {
        let { conditionalPlayback: o, triggers: i, id: s } = e;
        if (!o || o.length === 0) {
          t(null);
          return;
        }
        this.cleanup(s);
        let a = window.gsap?.matchMedia();
        if (!a) {
          t(null);
          return;
        }
        this.matchMediaInstances.set(s, a);
        let l = !0,
          c = i.some(
            ([, { controlType: u }]) => u === Ks.TimelineControlType.LOAD
          );
        a.add(this.buildConditionsObject(o), (u) => {
          if (c && !l) return !1;
          l = !1;
          let d = this.evaluateConditions(u.conditions || {}, o);
          return (!d || d.behavior === "skip-to-end") && t(d), n;
        });
      };
      cleanup = (e) => {
        let t = this.matchMediaInstances.get(e);
        t && (t.revert(), this.matchMediaInstances.delete(e));
      };
      destroy = () => {
        for (let [e] of this.matchMediaInstances) this.cleanup(e);
        this.matchMediaInstances.clear();
      };
      buildConditionsObject = (e) => {
        let t = {};
        for (let n of e)
          switch (n.type) {
            case "prefers-reduced-motion": {
              t.prefersReduced = "(prefers-reduced-motion: reduce)";
              break;
            }
            case "breakpoint": {
              (n.breakpoints || []).forEach((i) => {
                let s = Js[i];
                s && (t[`breakpoint_${i}`] = s);
              });
              break;
            }
            default:
              break;
          }
        return (t.fallback = "(min-width: 0px)"), t;
      };
      evaluateConditions(e, t) {
        let n = [];
        for (let s of t)
          s.type === "prefers-reduced-motion" &&
            e.prefersReduced &&
            n.push({ condition: s, type: "prefers-reduced-motion" }),
            s.type === "breakpoint" &&
              (s.breakpoints || []).some((c) => e[`breakpoint_${c}`]) &&
              n.push({ condition: s, type: "breakpoint" });
        if (n.length === 0) return null;
        let o = n.find(({ condition: s }) => s.behavior === "dont-animate");
        if (o)
          return {
            behavior: "dont-animate",
            matchedConditions: {
              prefersReduced: o.type === "prefers-reduced-motion",
              breakpointMatched: o.type === "breakpoint",
            },
          };
        let i = n[0];
        return {
          behavior: i.condition.behavior,
          matchedConditions: {
            prefersReduced: i.type === "prefers-reduced-motion",
            breakpointMatched: i.type === "breakpoint",
          },
        };
      }
    },
    Js = {
      tiny: "(max-width: 479px) and (min-width: 0px)",
      small: "(max-width: 767px) and (min-width: 480px)",
      medium: "(max-width: 991px) and (min-width: 768px)",
      main: "(min-width: 992px)",
    };
});
var ti = m((Gt) => {
  "use strict";
  Object.defineProperty(Gt, "__esModule", { value: !0 });
  Object.defineProperty(Gt, "PluginRegistry", {
    enumerable: !0,
    get: function () {
      return $t;
    },
  });
  var $t = class {
    plugins = new Map();
    extensionsByPoint = new Map();
    activePlugins = new Set();
    pluginStorage = new Map();
    constructor() {
      ["trigger", "action", "targetResolver", "condition"].forEach((e) =>
        this.extensionsByPoint.set(e, new Map())
      );
    }
    async registerPlugin(e) {
      let t = ei(e.manifest.id);
      if (this.plugins.has(t))
        throw new Error(`Plugin ${t} is already registered`);
      let n = Object.entries(e.manifest.dependencies ?? {});
      for (let [o] of n)
        if (!this.plugins.has(o))
          throw new Error(`Missing dependency: ${o} required by ${t}`);
      this.plugins.set(t, e), e.initialize && (await e.initialize());
      for (let o of e.extensions) this.registerExtension(o);
      n.length || (await this.activatePlugin(t));
    }
    registerExtension(e) {
      this.extensionsByPoint.has(e.extensionPoint) ||
        this.extensionsByPoint.set(e.extensionPoint, new Map());
      let t = this.extensionsByPoint.get(e.extensionPoint),
        n = e.id;
      if (t.has(n))
        throw new Error(
          `Extension ${n} is already registered for point ${e.extensionPoint}`
        );
      t.set(n, e);
    }
    async activatePlugin(e) {
      if (this.activePlugins.has(e)) return;
      let t = this.plugins.get(e);
      if (!t) throw new Error(`Cannot activate unknown plugin: ${e}`);
      let n = Object.keys(t.manifest.dependencies ?? {});
      for (let o of n) await this.activatePlugin(o);
      t.activate && (await t.activate()), this.activePlugins.add(e);
    }
    async deactivatePlugin(e) {
      if (!this.activePlugins.has(e)) return;
      let t = this.plugins.get(e);
      if (!t) throw new Error(`Cannot deactivate unknown plugin: ${e}`);
      t.deactivate && (await t.deactivate()), this.activePlugins.delete(e);
    }
    async unregisterPlugin(e, t) {
      let n = ei([e, t]),
        o = this.plugins.get(n);
      if (o) {
        this.activePlugins.has(n) && (await this.deactivatePlugin(n));
        for (let i of o.extensions)
          i.extensionPoint === "condition" &&
            i.implementation.dispose &&
            (await i.implementation.dispose()),
            this.extensionsByPoint
              .get(i.extensionPoint)
              ?.delete(`${n}:${i.id}`);
        o.dispose && (await o.dispose()),
          this.plugins.delete(n),
          this.pluginStorage.delete(n);
      }
    }
    getExtensions(e) {
      return this.extensionsByPoint.get(e) || new Map();
    }
    getExtensionImpl(e, t) {
      return this.getExtensions(t).get(e)?.implementation;
    }
    getTriggerHandler([e]) {
      return this.getExtensionImpl(e, "trigger");
    }
    getActionHandler(e) {
      return this.getExtensionImpl(e, "action");
    }
    getTargetResolver([e]) {
      return this.getExtensionImpl(e, "targetResolver");
    }
    getConditionEvaluator([e]) {
      return this.getExtensionImpl(e, "condition");
    }
    getAllPlugins() {
      return this.plugins.values();
    }
  };
  function ei(r) {
    return `${r[0]}:${r[1]}`;
  }
});
var Ee = m((zt) => {
  "use strict";
  Object.defineProperty(zt, "__esModule", { value: !0 });
  Object.defineProperty(zt, "BaseTriggerStrategy", {
    enumerable: !0,
    get: function () {
      return Ht;
    },
  });
  var Ht = class {
    runTrigger;
    runTimelineAction;
    skipToEndState;
    constructor(e, t, n) {
      (this.runTrigger = e),
        (this.runTimelineAction = t),
        (this.skipToEndState = n);
    }
  };
});
var ni = m((Yt) => {
  "use strict";
  Object.defineProperty(Yt, "__esModule", { value: !0 });
  Object.defineProperty(Yt, "StandardTriggerStrategy", {
    enumerable: !0,
    get: function () {
      return Wt;
    },
  });
  var ea = Ee();
  function ta(r) {
    if (!r || typeof r != "object") return !1;
    let e = r;
    return e.type === "timeline-role" && typeof e.role == "string";
  }
  function na(r) {
    if (!r || typeof r != "object") return !1;
    let e = r;
    return e.type === "playback-control" && typeof e.control == "string";
  }
  var Wt = class extends ea.BaseTriggerStrategy {
    getTimelineIdsForRole;
    resolveAssignedTimelineIds;
    constructor(e, t, n, o, i) {
      super(e, t, n),
        (this.getTimelineIdsForRole = o),
        (this.resolveAssignedTimelineIds = i);
    }
    bind(e, t, n) {
      let {
          interactionId: o,
          elements: i,
          triggerHandler: s,
          eventManager: a,
          conditionalContext: l,
          cleanupMap: c,
          delay: u,
        } = n,
        d = e[1];
      for (let f of i) {
        if (!f) continue;
        let p = c.get(f);
        p || ((p = new Set()), c.set(f, p));
        let g = null,
          h,
          v = s(e, f, a, (y) => {
            let E = na(y) ? y.control : void 0,
              b;
            if (
              (ta(y)
                ? (b = this.getTimelineIdsForRole(t, y.role))
                : (b = this.resolveAssignedTimelineIds(e, t)),
              b?.length === 0)
            )
              return;
            if (l !== null) {
              l.behavior === "skip-to-end" &&
                this.skipToEndState(t, null, d, b, E);
              return;
            }
            let M = () => {
              this.runTrigger(e, f, o, b, E).catch((w) =>
                console.error("Error in trigger execution:", w)
              );
            };
            d.conditionalLogic || !u
              ? M()
              : (g == null || E !== h) &&
                (g != null && clearTimeout(g),
                (h = E),
                (g = setTimeout(() => {
                  (g = null), M();
                }, u * 1e3)));
          });
        v && p.add(v),
          p.add(() => {
            g != null && (clearTimeout(g), (g = null));
          });
      }
    }
  };
});
var ri = m((Zt) => {
  "use strict";
  Object.defineProperty(Zt, "__esModule", { value: !0 });
  Object.defineProperty(Zt, "LoadTriggerStrategy", {
    enumerable: !0,
    get: function () {
      return Xt;
    },
  });
  var ra = Ee(),
    Xt = class extends ra.BaseTriggerStrategy {
      loadInteractions;
      getTimeline;
      constructor(e, t, n, o, i) {
        super(e, t, n), (this.loadInteractions = o), (this.getTimeline = i);
      }
      bind(e, t, n) {
        if (window.__wf_ix3) return;
        let { conditionalContext: o, delay: i } = n,
          s = e[1];
        this.loadInteractions.push(() => {
          if (o !== null) {
            o.behavior === "skip-to-end" && this.skipToEndState(t, null);
            return;
          }
          let a = () => {
            for (let l of t.timelineIds ?? []) {
              let c = this.getTimeline(l, null);
              c &&
                (c.data.splitLines
                  ? document.fonts.ready.then(() => {
                      this.runTimelineAction(l, s, null);
                    })
                  : this.runTimelineAction(l, s, null));
            }
          };
          i ? setTimeout(a, i * 1e3) : a();
        });
      }
    };
});
var ii = m((Kt) => {
  "use strict";
  Object.defineProperty(Kt, "__esModule", { value: !0 });
  Object.defineProperty(Kt, "ScrollTriggerStrategy", {
    enumerable: !0,
    get: function () {
      return Qt;
    },
  });
  var ia = Ee(),
    Qt = class extends ia.BaseTriggerStrategy {
      setupScrollControl;
      constructor(e, t, n, o) {
        super(e, t, n), (this.setupScrollControl = o);
      }
      bind(e, t, n) {
        let { interactionId: o, elements: i, conditionalContext: s } = n,
          a = e[1].scrollTriggerConfig;
        if (a) {
          for (let l of i)
            if (l) {
              if (s !== null) {
                s.behavior === "skip-to-end" && this.skipToEndState(t, l);
                continue;
              }
              for (let c of t.timelineIds ?? [])
                this.setupScrollControl(c, o, a, l);
            }
        }
      }
    };
});
var oi = m((tn) => {
  "use strict";
  Object.defineProperty(tn, "__esModule", { value: !0 });
  Object.defineProperty(tn, "ContinuousChannelManager", {
    enumerable: !0,
    get: function () {
      return Jt;
    },
  });
  var Jt = class {
      coordinator;
      resolveRole;
      channels;
      animation;
      constructor(e, t) {
        (this.coordinator = e),
          (this.resolveRole = t),
          (this.channels = new Map()),
          (this.animation = e.animation);
      }
      isPreviewEnabled() {
        return !(window.__wf_ix3 && window.__wf_ix3_continuous_preview === !1);
      }
      registerChannel(e) {
        let t = this.resolveRole(e.role);
        if (!t)
          return (
            console.warn(
              `IX3 Continuous: Failed to resolve role '${e.role}' to timeline ID. Channel registration skipped.`
            ),
            null
          );
        let n = new en(
          {
            timelineId: t,
            initialValue: e.initialValue,
            element: e.element,
            smoothing: e.smoothing,
            animation: this.animation,
            isPreviewEnabled: () => this.isPreviewEnabled(),
          },
          this.coordinator
        );
        return this.channels.set(t, n), n;
      }
      fireInterval(e, t) {
        let n = this.resolveRole(e);
        n &&
          this.coordinator.fireInterval(n, t.element ?? null, {
            targetIndex: t.targetIndex,
            pluginPayload: t.pluginPayload,
          });
      }
      registerIntervalHandler(e, t) {
        this.coordinator.registerIntervalHandler(e, t);
      }
      getMetadata(e) {
        let t = this.resolveRole(e);
        return t ? this.coordinator.getTriggerMetadata(t) : null;
      }
      publishChannel(e, t, n) {
        this.coordinator.publishChannel(e, t, n);
      }
      cleanup() {
        for (let e of this.channels.values()) e.destroy();
        this.channels.clear();
      }
    },
    oa = "power2.out",
    en = class {
      coordinator;
      proxy;
      setter;
      timelineId;
      element;
      isPreviewEnabled;
      constructor(e, t) {
        (this.coordinator = t),
          (this.proxy = { p: e.initialValue }),
          (this.timelineId = e.timelineId),
          (this.element = e.element ?? null),
          (this.isPreviewEnabled = e.isPreviewEnabled);
        let n = (e.smoothing ?? 0) / 1e3;
        (this.setter =
          n > 0
            ? e.animation.quickTo(this.proxy, "p", {
                duration: n,
                ease: oa,
                onUpdate: () => this.updateTimeline(this.proxy.p),
              })
            : null),
          this.updateTimeline(e.initialValue);
      }
      setProgress(e) {
        this.setter
          ? this.setter(e)
          : ((this.proxy.p = e), this.updateTimeline(e));
      }
      setImmediate(e) {
        this.setter
          ? this.setter(e, e)
          : ((this.proxy.p = e), this.updateTimeline(e));
      }
      destroy() {
        this.setter?.tween.kill();
      }
      updateTimeline(e) {
        this.isPreviewEnabled() &&
          this.coordinator.setContinuousProgress(
            this.timelineId,
            e,
            this.element
          );
      }
    };
});
var si = m((rn) => {
  "use strict";
  Object.defineProperty(rn, "__esModule", { value: !0 });
  Object.defineProperty(rn, "ContinuousTriggerStrategy", {
    enumerable: !0,
    get: function () {
      return nn;
    },
  });
  var sa = Ee(),
    aa = oi();
  function la(r) {
    return r != null && "type" in r && r.type === "continuous";
  }
  var nn = class extends sa.BaseTriggerStrategy {
    continuousCleanups;
    triggerCleanupFunctions;
    coordinator;
    getTimelineIdForRole;
    constructor(e, t, n, o, i, s, a) {
      super(e, t, n),
        (this.continuousCleanups = o),
        (this.triggerCleanupFunctions = i),
        (this.coordinator = s),
        (this.getTimelineIdForRole = a);
    }
    bind(e, t, n) {
      let {
        interactionId: o,
        elements: i,
        triggerHandler: s,
        conditionalContext: a,
      } = n;
      for (let l of i) {
        if (!l) continue;
        if (a !== null) {
          a.behavior === "skip-to-end" && this.skipToEndState(t, l);
          continue;
        }
        let c = (f) => this.getTimelineIdForRole(t, f),
          u = new aa.ContinuousChannelManager(this.coordinator, c),
          d = s(e, l, n.eventManager, (f) => {
            if (la(f)) {
              let p = f.setup(u),
                g = this.continuousCleanups.get(o);
              g || ((g = new Map()), this.continuousCleanups.set(o, g)),
                g.set(l, () => {
                  p(), u.cleanup();
                });
            }
          });
        if (d) {
          let f = this.triggerCleanupFunctions.get(o);
          f || ((f = new Map()), this.triggerCleanupFunctions.set(o, f));
          let p = f.get(l);
          p || ((p = new Set()), f.set(l, p)), p.add(d);
        }
      }
    }
  };
});
var li = m((on) => {
  "use strict";
  Object.defineProperty(on, "__esModule", { value: !0 });
  Object.defineProperty(on, "IX3", {
    enumerable: !0,
    get: function () {
      return Ue;
    },
  });
  var oe = Y(),
    ca = qr(),
    ua = Yr(),
    da = Qr(),
    fa = Kr(),
    pa = Jr(),
    ga = ti(),
    z = pe(),
    ha = ni(),
    ma = ri(),
    ya = ii(),
    va = si(),
    ba = 200,
    ai = 210,
    sn = class {
      env;
      pluginReg;
      timelineDefs;
      interactions;
      triggeredElements;
      triggerCleanupFunctions;
      continuousCleanups;
      conditionalPlaybackManager;
      triggerStrategies;
      windowSize;
      prevWindowSize;
      windowResizeSubscribers;
      debouncedWindowResize;
      bodyResizeObserver;
      triggerObservers;
      timelineRefCounts;
      interactionTimelineRefs;
      timelineToInteractionId;
      reactiveCallbackQueues;
      debouncedReactiveCallback;
      pendingReactiveUpdates;
      reactiveExecutionContext;
      componentScopeSelectors;
      eventMgr;
      loadInteractions;
      coordinator;
      conditionEval;
      constructor(e) {
        (this.env = e),
          (this.pluginReg = new ga.PluginRegistry()),
          (this.timelineDefs = new Map()),
          (this.interactions = new Map()),
          (this.triggeredElements = new Map()),
          (this.triggerCleanupFunctions = new Map()),
          (this.continuousCleanups = new Map()),
          (this.windowSize = { w: 0, h: 0 }),
          (this.prevWindowSize = { w: 0, h: 0 }),
          (this.windowResizeSubscribers = new Set()),
          (this.debouncedWindowResize = (0, z.debounce)(() => {
            for (let t of this.windowResizeSubscribers) t();
          }, ba)),
          (this.bodyResizeObserver = null),
          (this.triggerObservers = new Map()),
          (this.timelineRefCounts = new Map()),
          (this.interactionTimelineRefs = new Map()),
          (this.timelineToInteractionId = new Map()),
          (this.reactiveCallbackQueues = new Map()),
          (this.pendingReactiveUpdates = new Map()),
          (this.reactiveExecutionContext = new Set()),
          (this.componentScopeSelectors = new Map()),
          (this.eventMgr = ca.EventManager.getInstance()),
          (this.loadInteractions = []),
          (this.addEventListener = this.eventMgr.addEventListener.bind(
            this.eventMgr
          )),
          (this.emit = this.eventMgr.emit.bind(this.eventMgr)),
          (this.resolveTargets = (t, n, o) => {
            let i = o?.scope?.type === "component" ? o.scope : null,
              s = i?.componentId
                ? this.getComponentScopeSelector(i.componentId)
                : null,
              a = i?.variants?.length ? i.variants : null,
              l = this.resolveTargetsImpl(t, n, o, s),
              c =
                s && n.triggerElement
                  ? this.filterByInstance(l, s, n.triggerElement)
                  : l;
            return a && s ? this.filterByVariant(c, s, a) : c;
          }),
          (this.isTargetDynamic = (t) =>
            !!this.pluginReg.getTargetResolver(t)?.isDynamic),
          (this.getInteractionForTimeline = (t) => {
            let n = this.timelineToInteractionId.get(t);
            if (n) return this.interactions.get(n);
          }),
          window.addEventListener("resize", this.debouncedWindowResize),
          (this.coordinator = new ua.AnimationCoordinator(
            this.timelineDefs,
            this.pluginReg.getActionHandler.bind(this.pluginReg),
            this.pluginReg.getTargetResolver.bind(this.pluginReg),
            this.resolveTargets,
            this.getInteractionForTimeline,
            e
          )),
          (this.conditionEval = new fa.ConditionEvaluator(
            this.pluginReg.getConditionEvaluator.bind(this.pluginReg)
          )),
          (this.conditionalPlaybackManager =
            new pa.ConditionalPlaybackManager()),
          (this.triggerStrategies = new Map([
            [
              oe.TimelineControlType.STANDARD,
              new ha.StandardTriggerStrategy(
                this.runTrigger.bind(this),
                this.runTimelineAction.bind(this),
                this.skipToEndState.bind(this),
                this.getTimelineIdsForRole.bind(this),
                this.resolveAssignedTimelineIds.bind(this)
              ),
            ],
            [
              oe.TimelineControlType.LOAD,
              new ma.LoadTriggerStrategy(
                this.runTrigger.bind(this),
                this.runTimelineAction.bind(this),
                this.skipToEndState.bind(this),
                this.loadInteractions,
                this.coordinator.getTimeline.bind(this.coordinator)
              ),
            ],
            [
              oe.TimelineControlType.SCROLL,
              new ya.ScrollTriggerStrategy(
                this.runTrigger.bind(this),
                this.runTimelineAction.bind(this),
                this.skipToEndState.bind(this),
                this.coordinator.setupScrollControl.bind(this.coordinator)
              ),
            ],
            [
              oe.TimelineControlType.CONTINUOUS,
              new va.ContinuousTriggerStrategy(
                this.runTrigger.bind(this),
                this.runTimelineAction.bind(this),
                this.skipToEndState.bind(this),
                this.continuousCleanups,
                this.triggerCleanupFunctions,
                this.coordinator,
                this.getTimelineIdForRole.bind(this)
              ),
            ],
          ])),
          (this.debouncedReactiveCallback = (0, z.debounce)(
            () => this.processPendingReactiveUpdates(),
            16,
            { leading: !1, trailing: !0, maxWait: 100 }
          ));
      }
      getCoordinator() {
        return this.coordinator;
      }
      addEventListener;
      emit;
      static async init(e) {
        return (this.instance = new sn(e)), this.instance;
      }
      async registerPlugin(e) {
        await this.pluginReg.registerPlugin(e);
      }
      register(e, t) {
        if (t?.length) for (let n of t) this.timelineDefs.set(n.id, n);
        if (e?.length) {
          for (let n of e) {
            if (this.interactions.has(n.id)) {
              console.warn(
                `Interaction with ID ${n.id} already exists. Use update() to modify it.`
              );
              continue;
            }
            this.interactions.set(n.id, n);
            let o = new Set();
            this.interactionTimelineRefs.set(n.id, o),
              this.conditionalPlaybackManager.setupConditionalContext(
                n,
                (i) => {
                  for (let a of n.timelineIds ?? [])
                    o.add(a),
                      this.incrementTimelineRefCount(a),
                      this.timelineToInteractionId.set(a, n.id);
                  let s = (0, da.analyzeSharedTimelineGroups)(
                    n,
                    this.timelineDefs,
                    this.resolveTargets,
                    this.pluginReg.getActionHandler.bind(this.pluginReg),
                    this.coordinator.isDynamicTimeline.bind(this.coordinator)
                  );
                  for (let a of s)
                    this.coordinator.registerSharedGroup(a.primary, a.members);
                  for (let a of n.timelineIds ?? [])
                    this.coordinator.createTimeline(a, n);
                  for (let a of n.triggers ?? []) this.bindTrigger(a, n, i);
                },
                () => {
                  this.cleanupInteractionAnimations(n.id);
                }
              );
          }
          for (let n of this.loadInteractions) n();
          if (
            ((this.loadInteractions.length = 0),
            this.coordinator.getScrollTriggers().size > 0)
          ) {
            this.windowResizeSubscribers.add(() => {
              (this.windowSize.h = window.innerHeight),
                (this.windowSize.w = window.innerWidth);
            });
            let n = (0, z.debounce)(
                () => {
                  (this.prevWindowSize.h = this.windowSize.h),
                    (this.prevWindowSize.w = this.windowSize.w);
                },
                ai,
                { leading: !0, trailing: !1 }
              ),
              o = (0, z.debounce)(() => {
                if (
                  !(
                    this.windowSize.h !== this.prevWindowSize.h ||
                    this.windowSize.w !== this.prevWindowSize.w
                  )
                )
                  for (let a of this.coordinator.getScrollTriggers().values())
                    a.refresh();
              }, ai),
              i = (s) => {
                for (let a of s) a.target === document.body && (n(), o());
              };
            (this.bodyResizeObserver = new ResizeObserver(i)),
              document.body && this.bodyResizeObserver.observe(document.body);
          }
        }
        return this;
      }
      remove(e) {
        let t = Array.isArray(e) ? e : [e];
        for (let n of t) {
          if (!this.interactions.has(n)) {
            console.warn(
              `Interaction with ID ${n} not found, skipping removal.`
            );
            continue;
          }
          this.cleanupTriggerObservers(n),
            this.unbindAllTriggers(n),
            this.cleanupContinuousControlsForInteraction(n);
          let o = this.decrementTimelineReferences(n);
          this.cleanupUnusedTimelines(o),
            this.interactions.delete(n),
            this.triggeredElements.delete(n),
            this.interactionTimelineRefs.delete(n),
            this.conditionalPlaybackManager.cleanup(n);
        }
        return this;
      }
      update(e, t) {
        let n = Array.isArray(e) ? e : [e],
          o = t ? (Array.isArray(t) ? t : [t]) : [];
        o.length && this.register([], o);
        for (let i of n) {
          let { id: s } = i;
          if (!this.interactions.has(s)) {
            console.warn(
              `Interaction with ID ${s} not found, registering as new.`
            ),
              this.register([i], []);
            continue;
          }
          this.remove(s), this.register([i], []);
        }
        return this;
      }
      destroyTimelineInstance(e) {
        this.coordinator.destroy(e);
        let t = `st_${e}_`;
        for (let [n, o] of this.coordinator.getScrollTriggers().entries())
          n.startsWith(t) &&
            (o.kill(), this.coordinator.getScrollTriggers().delete(n));
      }
      cleanupUnusedTimelines(e) {
        let t = new Set();
        for (let n of e)
          this.timelineDefs.get(n)?.reuse?.sourceTimelineId &&
            t.add(this.coordinator.resolveSourceTimelineId(n));
        for (let n of e)
          this.destroyTimelineInstance(n), this.timelineDefs.delete(n);
        for (let n of t)
          e.has(n) || this.coordinator.recomputeFlipEaseForSource(n);
      }
      destroy() {
        let e = Array.from(this.interactions.keys());
        this.remove(e),
          (this.loadInteractions.length = 0),
          this.env.win.ScrollTrigger &&
            (this.env.win.ScrollTrigger.getAll().forEach((t) => t.kill()),
            this.bodyResizeObserver?.disconnect(),
            (this.bodyResizeObserver = null)),
          window.removeEventListener("resize", this.debouncedWindowResize),
          this.cleanupAllContinuousControls();
        try {
          this.debouncedReactiveCallback.cancel();
        } catch (t) {
          console.error(
            "Error canceling debounced callback during destroy:",
            t
          );
        }
        this.pendingReactiveUpdates.clear(),
          this.reactiveCallbackQueues.clear(),
          this.reactiveExecutionContext.clear(),
          this.conditionEval.disposeSharedObservers(),
          this.conditionalPlaybackManager.destroy(),
          this.windowResizeSubscribers.clear(),
          this.timelineDefs.clear(),
          this.interactions.clear(),
          this.triggeredElements.clear(),
          this.triggerCleanupFunctions.clear(),
          this.triggerObservers.clear(),
          this.interactionTimelineRefs.clear(),
          this.timelineToInteractionId.clear(),
          this.componentScopeSelectors.clear();
      }
      bindTrigger(e, t, n) {
        let o = t.id,
          i = this.pluginReg.getTriggerHandler(e),
          s = e[1];
        if (!i) {
          console.warn("No trigger handler:", e[0]);
          return;
        }
        let a = this.triggerCleanupFunctions.get(o) || new Map();
        this.triggerCleanupFunctions.set(o, a);
        let { delay: l = 0, controlType: c } = s,
          u = (0, z.toSeconds)(l),
          d = this.eventMgr,
          f = e[2],
          p = [];
        f && (p = this.resolveTargets(f, {}, t));
        let g =
            c && (0, z.isValidControlType)(c)
              ? c
              : oe.TimelineControlType.STANDARD,
          h = this.triggerStrategies.get(g);
        h
          ? h.bind(e, t, {
              interactionId: o,
              elements: p,
              triggerHandler: i,
              eventManager: d,
              conditionalContext: n,
              cleanupMap: a,
              delay: u || 0,
            })
          : console.warn("No strategy found for control type:", c),
          s.conditionalLogic && this.setupTriggerReactiveMonitoring(e, t);
      }
      setupTriggerReactiveMonitoring(e, t) {
        let { conditionalLogic: n } = e[1];
        if (!n) return;
        let o = `${t.id}:${t.triggers.indexOf(e)}`;
        try {
          let i = this.conditionEval.observeConditionsForTrigger(
              n.conditions,
              async () => {
                await this.executeReactiveCallbackSafely(t.id, o, async () => {
                  let l =
                    (await this.conditionEval.evaluateConditionsForTrigger(
                      n.conditions,
                      t
                    ))
                      ? n.ifTrue
                      : n.ifFalse;
                  if (l) {
                    let c = this.triggeredElements.get(t.id);
                    if (!c) return;
                    let u = this.resolveAssignedTimelineIds(e, t);
                    if (u?.length === 0) return;
                    let d = u ?? t.timelineIds ?? [],
                      f = [];
                    for (let p of c)
                      for (let g of d)
                        f.push({
                          timelineId: g,
                          element: p,
                          action: "pause-reset",
                        });
                    await this.executeTimelineOperationsAsync(f),
                      c.forEach((p) => {
                        this.executeConditionalOutcome(l, p, t, u);
                      });
                  }
                });
              }
            ),
            s = this.triggerObservers.get(t.id);
          s || ((s = new Map()), this.triggerObservers.set(t.id, s)),
            s.set(o, i);
        } catch (i) {
          console.error("Error setting up trigger reactive monitoring:", i);
        }
      }
      async executeReactiveCallbackSafely(e, t, n) {
        this.reactiveExecutionContext.has(t) ||
          (this.pendingReactiveUpdates.set(t, n),
          this.debouncedReactiveCallback());
      }
      async processPendingReactiveUpdates() {
        if (this.pendingReactiveUpdates.size === 0) return;
        let e = new Map(this.pendingReactiveUpdates);
        this.pendingReactiveUpdates.clear();
        let t = new Map();
        for (let [n, o] of e) {
          let i = n.split(":")[0];
          t.has(i) || t.set(i, []),
            t.get(i).push({ triggerKey: n, callback: o });
        }
        for (let [n, o] of t)
          await this.processInteractionReactiveUpdates(n, o);
      }
      async processInteractionReactiveUpdates(e, t) {
        let n = this.reactiveCallbackQueues.get(e);
        if (n)
          try {
            await n;
          } catch (i) {
            console.error("Error waiting for pending reactive callback:", i);
          }
        let o = this.executeInteractionUpdates(t);
        this.reactiveCallbackQueues.set(e, o);
        try {
          await o;
        } finally {
          this.reactiveCallbackQueues.get(e) === o &&
            this.reactiveCallbackQueues.delete(e);
        }
      }
      async executeInteractionUpdates(e) {
        for (let { triggerKey: t, callback: n } of e) {
          this.reactiveExecutionContext.add(t);
          try {
            await n();
          } catch (o) {
            console.error("Error in reactive callback for %s:", t, o);
          } finally {
            this.reactiveExecutionContext.delete(t);
          }
        }
      }
      async executeTimelineOperationsAsync(e) {
        if (e.length)
          return new Promise((t) => {
            Promise.resolve().then(() => {
              e.forEach(({ timelineId: n, element: o, action: i }) => {
                try {
                  if (!this.timelineDefs.has(n)) {
                    console.warn(`Timeline ${n} not found, skipping operation`);
                    return;
                  }
                  if (!o.isConnected) {
                    console.warn(
                      "Element no longer in DOM, skipping timeline operation"
                    );
                    return;
                  }
                  switch (i) {
                    case "pause-reset":
                      this.coordinator.pause(n, o, 0);
                      break;
                    default:
                      console.warn(`Unknown timeline action: ${i}`);
                  }
                } catch (s) {
                  console.error(
                    "Error executing timeline operation: %s, %s",
                    i,
                    n,
                    s
                  );
                }
              }),
                t();
            });
          });
      }
      getTimelineIdsForRole(e, t) {
        let n = e.timelineIds ?? [],
          o = n.filter(
            (i) => this.timelineDefs.get(i)?.triggerMetadata?.role === t
          );
        if (o.length === 0 && n.length > 0) {
          let i = n
            .map(
              (s) => this.timelineDefs.get(s)?.triggerMetadata?.role || "none"
            )
            .join(", ");
          console.warn(
            `IX3: No timelines found for role '${t}' in interaction '${e.id}'. Available roles: [${i}]`
          );
        }
        return o;
      }
      getTimelineIdForRole(e, t) {
        return this.getTimelineIdsForRole(e, t)[0];
      }
      getTimelineIdsForGroup(e, t) {
        return (e.timelineIds ?? []).filter(
          (n) => this.timelineDefs.get(n)?.groupId === t
        );
      }
      resolveAssignedTimelineIds(e, t) {
        let n = e[1];
        if (n.assignedGroupId === null) return [];
        if (n.assignedGroupId)
          return this.getTimelineIdsForGroup(t, n.assignedGroupId);
        if (n.assignedTimelineRole)
          return this.getTimelineIdsForRole(t, n.assignedTimelineRole);
      }
      async runTrigger(e, t, n, o, i) {
        if (window.__wf_ix3) return;
        let s = e[1],
          a = this.triggeredElements.get(n);
        a || this.triggeredElements.set(n, (a = new Set())), a.add(t);
        let l = this.interactions.get(n);
        if (!l || !l.triggers.includes(e)) return;
        let c = o ?? l.timelineIds ?? [];
        if (s.conditionalLogic)
          try {
            let d = (await this.conditionEval.evaluateConditionsForTrigger(
              s.conditionalLogic.conditions,
              l
            ))
              ? s.conditionalLogic.ifTrue
              : s.conditionalLogic.ifFalse;
            d && this.executeConditionalOutcome(d, t, l, c);
          } catch (u) {
            console.error("Error evaluating trigger conditional logic:", u),
              c.forEach((d) => this.runTimelineAction(d, s, t, i));
          }
        else c.forEach((u) => this.runTimelineAction(u, s, t, i));
      }
      skipToEndState(e, t, n, o, i) {
        (o ?? e.timelineIds ?? []).forEach((a) => {
          let l = this.coordinator.getTimeline(a, t);
          if (!l) return;
          let c =
            i ?? (n ? this.getEffectivePlaybackConfig(a, n).control : void 0);
          if (c === "pause" || c === "stop" || c === "none") return;
          let u;
          switch (c) {
            case "reverse":
            case "reverseFlipEase":
              u = 0;
              break;
            case "togglePlayReverse":
            case "togglePlayReverseFlipEase":
              u = Math.round(1 - l.totalProgress());
              break;
            case "resume":
              u = l.reversed() ? 0 : 1;
              break;
            case "play":
            case "restart":
            case void 0:
              u = 1;
              break;
            default: {
              let d = c;
              u = 1;
              break;
            }
          }
          this.coordinator.setTotalProgress(a, u, t ?? null);
        });
      }
      executeConditionalOutcome(e, t, n, o) {
        let {
            control: i,
            targetTimelineId: s,
            speed: a,
            jump: l,
            delay: c = 0,
          } = e,
          u = (0, z.toSeconds)(c);
        if (i === "none") return;
        let d = n.timelineIds ?? [],
          f;
        if (s) {
          if (!d.includes(s)) {
            console.warn(
              `Target timeline '${s}' not found in interaction '${
                n.id
              }'. Available timelines: ${d.join(", ")}`
            );
            return;
          }
          f = [s];
        } else f = d;
        if (o) {
          let g = new Set(o);
          f = f.filter((h) => g.has(h));
        }
        if (f.length === 0) return;
        let p = () => {
          f.forEach((g) => {
            a !== void 0 && this.coordinator.setTimeScale(g, a, t);
            let h = (0, z.toSeconds)(l);
            switch (i) {
              case "play":
                this.coordinator.play(g, t, h);
                break;
              case "pause":
                this.coordinator.pause(g, t, h);
                break;
              case "resume":
                this.coordinator.resume(g, t, h);
                break;
              case "reverse":
              case "reverseFlipEase":
                this.coordinator.reverse(g, t, h);
                break;
              case "restart":
                this.coordinator.restart(g, t);
                break;
              case "stop":
                this.coordinator.pause(g, t, h);
                break;
              case "togglePlayReverse":
              case "togglePlayReverseFlipEase":
                this.coordinator.togglePlayReverse(g, t);
                break;
              default: {
                this.coordinator.restart(g, t);
                let v = i;
                break;
              }
            }
          });
        };
        u
          ? setTimeout(() => {
              p();
            }, u * 1e3)
          : p();
      }
      getEffectivePlaybackConfig(e, t) {
        let n = this.timelineDefs.get(e);
        if (n?.triggerMetadata) {
          let i = n.settings;
          return {
            control: i?.control,
            delay: i?.delay,
            jump: i?.jump,
            speed: i?.speed,
          };
        }
        let o =
          t.controlType && (0, z.isValidControlType)(t.controlType)
            ? t.controlType
            : oe.TimelineControlType.STANDARD;
        if (n?.groupId && o === oe.TimelineControlType.STANDARD) {
          let i = n.settings;
          return {
            control: t.control,
            delay: void 0,
            jump: i?.jump,
            speed: i?.speed,
          };
        }
        return {
          control: t.control,
          delay: void 0,
          jump: t.jump,
          speed: t.speed,
        };
      }
      runTimelineAction(e, t, n, o) {
        let {
            control: i,
            delay: s,
            jump: a,
            speed: l,
          } = this.getEffectivePlaybackConfig(e, t),
          c = o ?? i,
          u = this.timelineDefs.get(e);
        if (u?.reuse) {
          let p = u.reuse.sourceTimelineId;
          if (!this.timelineDefs.has(p)) {
            console.warn(`Timeline reuse: source '${p}' not found for '${e}'`);
            return;
          }
          e = p;
        }
        let d = () => {
            this.coordinator.setTimeScale(e, l ?? 1, n);
            let p = (0, z.toSeconds)(a);
            switch (c) {
              case "play":
                this.coordinator.play(e, n, p);
                break;
              case "pause":
                this.coordinator.pause(e, n, p);
                break;
              case "resume":
                this.coordinator.resume(e, n, p);
                break;
              case "reverse":
              case "reverseFlipEase":
                this.coordinator.reverse(e, n, p);
                break;
              case "restart":
                this.coordinator.restart(e, n);
                break;
              case "togglePlayReverse":
              case "togglePlayReverseFlipEase":
                this.coordinator.togglePlayReverse(e, n);
                break;
              case "stop":
                this.coordinator.pause(e, n, p);
                break;
              case "none":
                break;
              case void 0:
                this.coordinator.restart(e, n);
                break;
              default: {
                let g = c;
                this.coordinator.restart(e, n);
                break;
              }
            }
          },
          f = (0, z.toSeconds)(s);
        f && f > 0 ? setTimeout(d, f * 1e3) : d();
      }
      resolveTargets;
      isTargetDynamic;
      getComponentScopeSelector(e) {
        let t = this.componentScopeSelectors.get(e);
        return (
          t ||
            ((t = `[data-wf-component-id="${CSS.escape(e)}"]`),
            this.componentScopeSelectors.set(e, t)),
          t
        );
      }
      resolveTargetsImpl(e, t, n, o) {
        let [i, s, a] = e;
        if (s === "*" && a && a.filterBy) {
          let d = this.resolveUniversalSelectorOptimized(a, t, n, o);
          if (d) return d;
        }
        let l = this.pluginReg.getTargetResolver([i, s]);
        if (!l) return [];
        let c = l.resolve([i, s], t),
          u = o ? this.filterByScope(c, o) : c;
        return !u.length || !a || a.relationship === "none" || !a.filterBy
          ? u
          : this.applyRelationshipFilter(
              u,
              a.relationship,
              this.resolveTargetsImpl(a.filterBy, t, n, o),
              a.firstMatchOnly
            );
      }
      resolveUniversalSelectorOptimized(e, t, n, o) {
        if (!e.filterBy) return null;
        let i = this.resolveTargetsImpl(e.filterBy, t, n, o),
          s = i.length;
        if (!s) return [];
        let a = !!e.firstMatchOnly;
        switch (e.relationship) {
          case "direct-child-of": {
            let l = [];
            for (let c = 0; c < s; c++) {
              let u = i[c];
              if (!u) continue;
              let d = u.children;
              for (let f = 0; f < d.length; f++)
                if ((l.push(d[f]), a)) return l;
            }
            return l;
          }
          case "within": {
            let l = [];
            for (let c = 0; c < s; c++) {
              let u = i[c];
              if (!u) continue;
              let d = u.querySelectorAll("*");
              for (let f = 0; f < d.length; f++)
                if ((l.push(d[f]), a)) return l;
            }
            return l;
          }
          case "direct-parent-of": {
            let l = new Set(),
              c = [];
            for (let u = 0; u < s; u++) {
              let d = i[u];
              if (!d) continue;
              let f = d.parentElement;
              if (f && !l.has(f) && (l.add(f), c.push(f), a)) break;
            }
            return o ? this.filterByScope(c, o) : c;
          }
          case "next-sibling-of": {
            let l = [];
            for (let c = 0; c < s; c++) {
              let u = i[c];
              if (!u) continue;
              let d = u.nextElementSibling;
              if (d && (l.push(d), a)) break;
            }
            return o ? this.filterByScope(l, o) : l;
          }
          case "prev-sibling-of": {
            let l = [];
            for (let c = 0; c < s; c++) {
              let u = i[c];
              if (!u) continue;
              let d = u.previousElementSibling;
              if (d && (l.push(d), a)) break;
            }
            return o ? this.filterByScope(l, o) : l;
          }
          case "next-to": {
            let l = new Set(),
              c = [];
            for (let u = 0; u < s; u++) {
              let d = i[u];
              if (!d) continue;
              let f = d.parentElement;
              if (f) {
                let p = f.children;
                for (let g = 0; g < p.length; g++) {
                  let h = p[g];
                  if (h !== d && !l.has(h) && (l.add(h), c.push(h), a)) break;
                }
                if (a && c.length) break;
              }
            }
            return o ? this.filterByScope(c, o) : c;
          }
          case "contains": {
            let l = new Set(),
              c = [];
            for (let u = 0; u < s; u++) {
              let d = i[u];
              if (!d) continue;
              let f = d.parentElement;
              for (; f && !(l.has(f) || (l.add(f), c.push(f), a)); )
                f = f.parentElement;
              if (a && c.length) break;
            }
            return o ? this.filterByScope(c, o) : c;
          }
          default:
            return null;
        }
      }
      applyRelationshipFilter(e, t, n, o) {
        if (!e.length || !n.length) return [];
        if (t === "none") return e;
        let i = [],
          s = new Set();
        switch (t) {
          case "direct-child-of": {
            let a = new Set(n);
            for (let l = 0; l < e.length; l++) {
              let c = e[l];
              if (
                !s.has(c) &&
                c.parentElement &&
                a.has(c.parentElement) &&
                (s.add(c), i.push(c), o)
              )
                return i;
            }
            return i;
          }
          case "direct-parent-of": {
            let a = new Set();
            for (let l = 0; l < n.length; l++) {
              let c = n[l].parentElement;
              c && a.add(c);
            }
            for (let l = 0; l < e.length; l++) {
              let c = e[l];
              if (!s.has(c) && a.has(c) && (s.add(c), i.push(c), o)) return i;
            }
            return i;
          }
          case "next-sibling-of": {
            let a = new Set(n);
            for (let l = 0; l < e.length; l++) {
              let c = e[l];
              if (s.has(c)) continue;
              let u = c.previousElementSibling;
              if (u && a.has(u) && (s.add(c), i.push(c), o)) return i;
            }
            return i;
          }
          case "prev-sibling-of": {
            let a = new Set(n);
            for (let l = 0; l < e.length; l++) {
              let c = e[l];
              if (s.has(c)) continue;
              let u = c.nextElementSibling;
              if (u && a.has(u) && (s.add(c), i.push(c), o)) return i;
            }
            return i;
          }
          case "next-to": {
            let a = new Set(n),
              l = new Map();
            for (let c = 0; c < n.length; c++) {
              let u = n[c].parentElement;
              u && l.set(u, (l.get(u) ?? 0) + 1);
            }
            for (let c = 0; c < e.length; c++) {
              let u = e[c];
              if (s.has(u) || !u.parentElement) continue;
              let d = l.get(u.parentElement);
              if (d && !(a.has(u) && d <= 1) && (s.add(u), i.push(u), o))
                return i;
            }
            return i;
          }
          case "within": {
            let a = new Set(n);
            for (let l = 0; l < e.length; l++) {
              let c = e[l];
              if (s.has(c)) continue;
              let u = c.parentElement;
              for (; u; ) {
                if (a.has(u)) {
                  if ((s.add(c), i.push(c), o)) return i;
                  break;
                }
                u = u.parentElement;
              }
            }
            return i;
          }
          case "contains": {
            let a = new Set();
            for (let l = 0; l < n.length; l++) {
              let c = n[l].parentElement;
              for (; c && !a.has(c); ) a.add(c), (c = c.parentElement);
            }
            for (let l = 0; l < e.length; l++) {
              let c = e[l];
              if (!s.has(c) && a.has(c) && (s.add(c), i.push(c), o)) return i;
            }
            return i;
          }
          default:
            return [];
        }
      }
      filterByInstance(e, t, n) {
        if (!e.length) return e;
        let o = n.closest(t);
        if (!o) return e;
        let i = -1;
        for (let a = 0; a < e.length; a++)
          if (e[a]?.closest(t) !== o) {
            i = a;
            break;
          }
        if (i === -1) return e;
        let s = e.slice(0, i);
        for (let a = i + 1; a < e.length; a++) {
          let l = e[a];
          l?.closest(t) === o && s.push(l);
        }
        return s;
      }
      filterByScope(e, t) {
        if (!e.length) return e;
        let n = -1;
        for (let i = 0; i < e.length; i++)
          if (!e[i]?.closest(t)) {
            n = i;
            break;
          }
        if (n === -1) return e;
        let o = e.slice(0, n);
        for (let i = n + 1; i < e.length; i++) {
          let s = e[i];
          s?.closest(t) && o.push(s);
        }
        return o;
      }
      filterByVariant(e, t, n) {
        if (!e.length) return e;
        let o = (a) => {
            let l = a.closest(t);
            if (!l) return !1;
            let c = l.getAttribute("data-wf-variant-state");
            return c != null && n.includes(c);
          },
          i = -1;
        for (let a = 0; a < e.length; a++) {
          let l = e[a];
          if (!l || !o(l)) {
            i = a;
            break;
          }
        }
        if (i === -1) return e;
        let s = e.slice(0, i);
        for (let a = i + 1; a < e.length; a++) {
          let l = e[a];
          l && o(l) && s.push(l);
        }
        return s;
      }
      getInteractionForTimeline;
      incrementTimelineRefCount(e) {
        let t = this.timelineRefCounts.get(e) || 0;
        this.timelineRefCounts.set(e, t + 1);
      }
      decrementTimelineRefCount(e) {
        let t = this.timelineRefCounts.get(e) || 0,
          n = Math.max(0, t - 1);
        return this.timelineRefCounts.set(e, n), n;
      }
      decrementTimelineReferences(e) {
        let t = new Set(),
          n = this.interactionTimelineRefs.get(e);
        if (!n) return t;
        for (let o of n) this.decrementTimelineRefCount(o) === 0 && t.add(o);
        return t;
      }
      unbindAllTriggers(e) {
        let t = this.triggerCleanupFunctions.get(e);
        if (t) {
          for (let [, n] of t)
            for (let o of n)
              try {
                o();
              } catch (i) {
                console.error("Error during trigger cleanup:", i);
              }
          this.triggerCleanupFunctions.delete(e);
        }
      }
      cleanupTriggerObservers(e) {
        let t = this.triggerObservers.get(e);
        if (t) {
          for (let [n, o] of t) {
            try {
              o();
            } catch (i) {
              console.error("Error during trigger observer cleanup:", i);
            }
            this.pendingReactiveUpdates.delete(n),
              this.reactiveExecutionContext.delete(n);
          }
          this.reactiveCallbackQueues.delete(e),
            this.triggerObservers.delete(e);
        }
      }
      cleanupContinuousControlsForInteraction(e) {
        let t = this.continuousCleanups.get(e);
        if (t) {
          for (let [, n] of t)
            try {
              n();
            } catch (o) {
              console.error("Error during continuous control cleanup:", o);
            }
          this.continuousCleanups.delete(e);
        }
      }
      cleanupAllContinuousControls() {
        for (let [, e] of this.continuousCleanups)
          for (let [, t] of e)
            try {
              t();
            } catch (n) {
              console.error("Error during continuous control cleanup:", n);
            }
        this.continuousCleanups.clear();
      }
      cleanupInteractionAnimations(e) {
        this.unbindAllTriggers(e),
          this.cleanupContinuousControlsForInteraction(e);
        let t = this.interactionTimelineRefs.get(e);
        if (t)
          for (let n of t)
            this.decrementTimelineRefCount(n) === 0 &&
              this.destroyTimelineInstance(n);
        this.triggeredElements.delete(e);
      }
    },
    Ue = sn;
  fe(Ue, "instance");
});
var ui = m((an) => {
  "use strict";
  Object.defineProperty(an, "__esModule", { value: !0 });
  function Ta(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Ta(an, {
    EASING_NAMES: function () {
      return Sa.EASING_NAMES;
    },
    IX3: function () {
      return wa.IX3;
    },
    convertEaseConfigToGSAP: function () {
      return ci.convertEaseConfigToGSAP;
    },
    convertEaseConfigToLinear: function () {
      return ci.convertEaseConfigToLinear;
    },
  });
  var wa = li(),
    Sa = pe(),
    ci = Rt();
});
var dn = m((un) => {
  "use strict";
  Object.defineProperty(un, "__esModule", { value: !0 });
  function Ea(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Ea(un, {
    COMPONENT_TIMELINE_ROLES: function () {
      return Va;
    },
    DEFAULT_MOUSE_FOLLOW_ANCHOR: function () {
      return Oa;
    },
    DEFAULT_MOUSE_MOVE_INTERVAL_DISTANCE: function () {
      return Ia;
    },
    HOVER_TIMELINE_ROLES: function () {
      return Ba;
    },
    IX3_WF_EXTENSION_KEYS: function () {
      return ln;
    },
    MOUSE_MOVE_CHANNELS: function () {
      return Da;
    },
    MOUSE_MOVE_TIMELINE_ROLES: function () {
      return _a;
    },
    TIMELINE_ROLE_NAMES: function () {
      return j;
    },
    TargetScope: function () {
      return cn;
    },
    VELOCITY_CAPABLE_PROPS: function () {
      return di;
    },
    canUseVelocityInfluenceProperty: function () {
      return xa;
    },
    getEffectiveFollowMode: function () {
      return Ma;
    },
    getMouseFollowConfig: function () {
      return Ca;
    },
    getMouseMoveTimelineContext: function () {
      return qe;
    },
    getOppositeMouseFollowAxis: function () {
      return Na;
    },
    getSingleAxisMouseFollowMode: function () {
      return Aa;
    },
    isMouseMoveIntervalRole: function () {
      return Pa;
    },
    isVelocityInfluenceEnabled: function () {
      return Ra;
    },
    mouseFollowAxisToRole: function () {
      return Fa;
    },
    mouseFollowRoleToAxis: function () {
      return ka;
    },
    mouseFollowRoleToSiblingRole: function () {
      return La;
    },
    narrowMouseMoveIntervalPayload: function () {
      return ja;
    },
  });
  var ln;
  (function (r) {
    (r.CLASS = "wf:class"),
      (r.BODY = "wf:body"),
      (r.ID = "wf:id"),
      (r.TRIGGER_ONLY = "wf:trigger-only"),
      (r.TRIGGER_ONLY_PARENT = "wf:trigger-only-parent"),
      (r.SELECTOR = "wf:selector"),
      (r.ATTRIBUTE = "wf:attribute"),
      (r.INST = "wf:inst"),
      (r.ANY_ELEMENT = "wf:any-element"),
      (r.VIEWPORT = "wf:viewport"),
      (r.STYLE = "wf:style"),
      (r.TRANSFORM = "wf:transform"),
      (r.LOTTIE = "wf:lottie"),
      (r.SPLINE = "wf:spline"),
      (r.VARIABLE = "wf:variable"),
      (r.RIVE = "wf:rive"),
      (r.ANIMATE_RIVE = "wf:animate-rive"),
      (r.MOUSE_FOLLOW = "wf:mouse-follow"),
      (r.CLICK = "wf:click"),
      (r.HOVER = "wf:hover"),
      (r.LOAD = "wf:load"),
      (r.FOCUS = "wf:focus"),
      (r.BLUR = "wf:blur"),
      (r.SCROLL = "wf:scroll"),
      (r.CUSTOM = "wf:custom"),
      (r.CHANGE = "wf:change"),
      (r.MOUSE_MOVE = "wf:mouse-move"),
      (r.NAVBAR = "wf:navbar"),
      (r.DROPDOWN = "wf:dropdown"),
      (r.PREFERS_REDUCED_MOTION = "wf:prefersReducedMotion"),
      (r.WEBFLOW_BREAKPOINTS = "wf:webflowBreakpoints"),
      (r.CUSTOM_MEDIA_QUERY = "wf:customMediaQuery"),
      (r.COLOR_SCHEME = "wf:colorScheme"),
      (r.ELEMENT_DATA_ATTRIBUTE = "wf:elementDataAttribute"),
      (r.CURRENT_TIME = "wf:currentTime"),
      (r.ELEMENT_STATE = "wf:elementState");
  })(ln || (ln = {}));
  var cn;
  (function (r) {
    (r.ALL = "all"),
      (r.PARENT = "parent"),
      (r.CHILDREN = "children"),
      (r.SIBLINGS = "siblings"),
      (r.NEXT = "next"),
      (r.PREVIOUS = "previous"),
      (r.FIRST_ANCESTOR = "first-ancestor"),
      (r.FIRST_DESCENDANT = "first-descendant"),
      (r.DESCENDANTS = "descendants"),
      (r.ANCESTORS = "ancestors");
  })(cn || (cn = {}));
  function Ca(r) {
    let e = r?.properties?.["wf:mouse-follow"];
    if (!(typeof e != "object" || e === null || Array.isArray(e))) return e;
  }
  function Ma(r) {
    return r?.followMode ?? "full";
  }
  function Aa(r) {
    return r === "x" ? "x-only" : "y-only";
  }
  var Oa = "50% 50%",
    Ia = 100,
    j = {
      MOUSE_X: "mouseX",
      MOUSE_Y: "mouseY",
      INTERVAL: "interval",
      OPEN: "open",
      CLOSE: "close",
      MOUSE_ENTER: "mouseEnter",
      MOUSE_LEAVE: "mouseLeave",
    };
  function qe(r) {
    return r === j.MOUSE_X
      ? { kind: "mouse-x", role: r, axis: "x", siblingRole: j.MOUSE_Y }
      : r === j.MOUSE_Y
      ? { kind: "mouse-y", role: r, axis: "y", siblingRole: j.MOUSE_X }
      : r === j.INTERVAL
      ? { kind: "interval", role: r }
      : { kind: "other", role: r ?? void 0 };
  }
  var _a = {
      MOUSE_X: { role: j.MOUSE_X, label: "Mouse X", usePercentCanvas: !0 },
      MOUSE_Y: { role: j.MOUSE_Y, label: "Mouse Y", usePercentCanvas: !0 },
      INTERVAL: { role: j.INTERVAL, label: "Interval" },
    },
    di = new Set([
      "x",
      "y",
      "scale",
      "scaleX",
      "scaleY",
      "rotation",
      "skewX",
      "skewY",
      "opacity",
    ]);
  function Ra(r) {
    return (
      r?.pluginConfig?.type === "mouseMove" &&
      !!r.pluginConfig.velocityInfluence
    );
  }
  function xa(r) {
    return di.has(r);
  }
  function Pa(r) {
    return qe(r).kind === "interval";
  }
  function ka(r) {
    let e = qe(r);
    return e.kind === "mouse-x" || e.kind === "mouse-y" ? e.axis : null;
  }
  function Na(r) {
    return r === "x" ? "y" : "x";
  }
  function Fa(r) {
    return r === "x" ? j.MOUSE_X : j.MOUSE_Y;
  }
  function La(r) {
    let e = qe(r);
    return e.kind === "mouse-x" || e.kind === "mouse-y" ? e.siblingRole : null;
  }
  var Da = { POSITION: "wf:mouse-move:position", LEAVE: "wf:mouse-move:leave" };
  function ja(r) {
    if (typeof r != "object" || r === null) return {};
    let e = r,
      t = {},
      n = e.cursorPos;
    return (
      typeof n == "object" &&
        n !== null &&
        typeof n.x == "number" &&
        typeof n.y == "number" &&
        (t.cursorPos = { x: n.x, y: n.y }),
      typeof e.velocityFactor == "number" &&
        (t.velocityFactor = e.velocityFactor),
      typeof e.dirX == "number" && (t.dirX = e.dirX),
      typeof e.dirY == "number" && (t.dirY = e.dirY),
      t
    );
  }
  var Va = {
      OPEN: {
        role: j.OPEN,
        label: "Open",
        allowedControls: ["play", "restart"],
        defaultControl: "play",
      },
      CLOSE: {
        role: j.CLOSE,
        label: "Close",
        allowedControls: ["play", "restart", "reverse", "reverseFlipEase"],
        allowedControlsWhenReusing: ["reverse", "reverseFlipEase"],
        defaultControl: "play",
        defaultControlWhenReusing: "reverseFlipEase",
        autoReusesRole: j.OPEN,
      },
    },
    Ba = {
      MOUSE_ENTER: {
        role: j.MOUSE_ENTER,
        label: "Hover in actions",
        allowedControls: ["play", "restart"],
        defaultControl: "play",
      },
      MOUSE_LEAVE: {
        role: j.MOUSE_LEAVE,
        label: "Hover out actions",
        allowedControls: ["play", "restart", "reverse", "reverseFlipEase"],
        defaultControl: "play",
      },
    };
});
var mi = m((gn) => {
  "use strict";
  Object.defineProperty(gn, "__esModule", { value: !0 });
  function Ua(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Ua(gn, {
    createLoadedMouseFollowActionNormalizer: function () {
      return Xa;
    },
    forTestSuite: function () {
      return Za;
    },
    getGroupedMouseFollowConfig: function () {
      return pn;
    },
    getUnpairedMouseFollowAction: function () {
      return Ga;
    },
    getUnpairedMouseFollowConfig: function () {
      return fi;
    },
    remapMouseFollowActionGroupsInTimelines: function () {
      return Ya;
    },
    setGroupedMouseFollowActionConfig: function () {
      return $a;
    },
    setMouseFollowActionConfig: function () {
      return pi;
    },
    stripMouseFollowActionInstanceIds: function () {
      return Ha;
    },
    stripMouseFollowConfigInstanceIds: function () {
      return fn;
    },
  });
  var $e = dn();
  function fn(r) {
    let { groupId: e, syncedActionId: t, ...n } = r;
    return n;
  }
  function qa(r, e) {
    return { ...fn(r), groupId: e };
  }
  function pn(r, e, t) {
    let n = qa(r, e);
    return (
      t?.axis !== void 0 && (n.axis = t.axis),
      t?.followMode !== void 0 && (n.followMode = t.followMode),
      n
    );
  }
  function fi(r, e = r.axis) {
    let { syncedActionId: t, ...n } = r,
      o =
        n.followMode === "full" && e
          ? (0, $e.getSingleAxisMouseFollowMode)(e)
          : n.followMode;
    return { ...n, ...(o !== void 0 ? { followMode: o } : {}) };
  }
  function Ge(r, e) {
    let t = (0, $e.getMouseFollowConfig)(r);
    if (!t) return r;
    let n = e(t);
    return n === t
      ? r
      : {
          ...r,
          properties: {
            ...r.properties,
            [$e.IX3_WF_EXTENSION_KEYS.MOUSE_FOLLOW]: n,
          },
        };
  }
  function pi(r, e) {
    return {
      ...r,
      properties: {
        ...r.properties,
        [$e.IX3_WF_EXTENSION_KEYS.MOUSE_FOLLOW]: e,
      },
    };
  }
  function $a(r, e, t, n) {
    return pi(r, pn(e, t, n));
  }
  function Ga(r, e) {
    return Ge(r, (t) => fi(t, e));
  }
  function Ha(r) {
    return Ge(r, fn);
  }
  function za(r, e, t) {
    return t[e] ? [r, e].sort().join(":") : `single:${r}`;
  }
  function Wa(r, e, t) {
    return (
      e.groupId ??
      (e.syncedActionId ? za(r, e.syncedActionId, t) : `single:${r}`)
    );
  }
  function gi(r, e) {
    let t = {};
    return (n, o = n.id) =>
      Ge(n, (i) => {
        let s = Wa(o, i, e),
          a = t[s] ?? r(s);
        return (t[s] = a), pn(i, a);
      });
  }
  function hi(r, e, t) {
    let n = t ?? Object.fromEntries(r.map((i) => [i.id, i.id])),
      o = gi(() => e(), n);
    return (i, s) => o(i, s ?? i.id);
  }
  function Ya(
    r,
    { generateGroupId: e, actionIdMap: t, mapAction: n = (o) => o }
  ) {
    let o = hi(
      r.flatMap((i) => i.actions ?? []),
      e,
      t
    );
    return r.map((i) => {
      let s = !1,
        a = i.actions?.map((l) => {
          let c = l.id,
            u = n(l),
            d = o(u, c);
          return (s = s || d !== l), d;
        });
      return s && a ? { ...i, actions: a } : i;
    });
  }
  function Xa(r) {
    let e = Object.fromEntries(r.map((n) => [n.id, n.id])),
      t = gi((n) => n, e);
    return (n, o) => {
      let i = t(n);
      return o ? Ge(i, (s) => (s.axis ? s : { ...s, axis: o })) : i;
    };
  }
  var Za = { createMouseFollowActionGroupRemapper: hi };
});
var vi = m((hn) => {
  "use strict";
  Object.defineProperty(hn, "__esModule", { value: !0 });
  function Qa(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Qa(hn, {
    TRANSIENT_IX3_CLONE_ATTR: function () {
      return yi;
    },
    isTransientIX3Clone: function () {
      return Ka;
    },
  });
  var yi = "data-ix3-clone",
    Ka = (r) => !!r.closest?.(`[${yi}]`);
});
var Q = m((me) => {
  "use strict";
  Object.defineProperty(me, "__esModule", { value: !0 });
  Object.defineProperty(me, "CORE_PLUGIN_INFO", {
    enumerable: !0,
    get: function () {
      return Ja;
    },
  });
  mn(dn(), me);
  mn(mi(), me);
  mn(vi(), me);
  function mn(r, e) {
    return (
      Object.keys(r).forEach(function (t) {
        t !== "default" &&
          !Object.prototype.hasOwnProperty.call(e, t) &&
          Object.defineProperty(e, t, {
            enumerable: !0,
            get: function () {
              return r[t];
            },
          });
      }),
      r
    );
  }
  var Ja = { namespace: "wf", pluginId: "core", version: "1.0.0" };
});
var Ce = m((vn) => {
  "use strict";
  Object.defineProperty(vn, "__esModule", { value: !0 });
  function el(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  el(vn, {
    getScrollY: function () {
      return rl;
    },
    initScrollCache: function () {
      return nl;
    },
    noop: function () {
      return tl;
    },
  });
  var tl = () => {},
    yn = 0,
    He = 0,
    ye = null;
  function nl() {
    (He += 1),
      ye ||
        ((ye = () => {
          yn = window.scrollY;
        }),
        (yn = window.scrollY),
        window.addEventListener("scroll", ye, { passive: !0 }));
    let r = !1;
    return () => {
      r ||
        ((r = !0),
        (He = Math.max(0, He - 1)),
        He === 0 &&
          ye &&
          (window.removeEventListener("scroll", ye), (ye = null)));
    };
  }
  function rl() {
    return yn;
  }
});
var Ti = m((Tn) => {
  "use strict";
  Object.defineProperty(Tn, "__esModule", { value: !0 });
  Object.defineProperty(Tn, "TouchScrollGuard", {
    enumerable: !0,
    get: function () {
      return bn;
    },
  });
  var bi = Ce();
  function il(r) {
    let e = r;
    for (; e && e !== document.body && e !== document.documentElement; ) {
      if (e instanceof HTMLElement) {
        let t = getComputedStyle(e).overflowY;
        if (
          (t === "auto" || t === "scroll" || t === "overlay") &&
          e.scrollHeight > e.clientHeight
        )
          return e;
      }
      e = e.parentElement;
    }
    return null;
  }
  var bn = class {
    isScrolling = !1;
    toleranceDeg;
    refX = 0;
    refY = 0;
    lastY = 0;
    locked = null;
    effectFromBoundary = !1;
    scroller = null;
    maxScroll = 0;
    constructor(e, t, n) {
      this.toleranceDeg = n?.tolerance ?? 18;
      let o = (0, bi.initScrollCache)();
      t.addEventListener("abort", o);
      let i = (l) => {
          let c = l.touches[0];
          c &&
            ((this.refX = c.clientX),
            (this.refY = c.clientY),
            (this.lastY = c.clientY),
            (this.locked = null),
            (this.effectFromBoundary = !1),
            (this.isScrolling = !1),
            (this.scroller = il(l.target ?? e)),
            (this.maxScroll = this.scroller
              ? this.scroller.scrollHeight - this.scroller.clientHeight
              : document.documentElement.scrollHeight - window.innerHeight));
        },
        s = (l) => {
          let c = l.touches[0];
          if (!c) return;
          let u = c.clientY,
            d = c.clientX - this.refX,
            f = u - this.refY,
            p = u > this.lastY,
            g = u < this.lastY,
            h = this.scroller ? this.scroller.scrollTop : (0, bi.getScrollY)(),
            v = this.maxScroll,
            y = h <= 1 && p,
            E = v > 0 && h >= v - 1 && g;
          this.locked === null && this.decide(d, f, y || E),
            this.locked === "scroll" &&
              (y || E) &&
              ((this.refX = c.clientX),
              (this.refY = u),
              (this.locked = "effect"),
              (this.effectFromBoundary = !0)),
            this.locked === "effect" &&
              this.effectFromBoundary &&
              !(y || E) &&
              ((this.refX = c.clientX),
              (this.refY = u),
              (this.locked = null),
              (this.effectFromBoundary = !1)),
            (this.lastY = u),
            (this.isScrolling =
              this.locked === "scroll" ||
              this.locked === null ||
              (this.locked === "effect" && !l.cancelable && !(y || E))),
            this.locked === "effect" && l.cancelable && l.preventDefault();
        },
        a = () => {
          (this.locked = null), (this.isScrolling = !1);
        };
      e.addEventListener("touchstart", i, { passive: !0, signal: t }),
        e.addEventListener("touchmove", s, { passive: !1, signal: t }),
        e.addEventListener("touchend", a, { passive: !0, signal: t }),
        e.addEventListener("touchcancel", a, { passive: !0, signal: t });
    }
    decide(e, t, n) {
      if (Math.abs(e) < 10 && Math.abs(t) < 10) return;
      Math.atan2(Math.abs(e), Math.abs(t)) * (180 / Math.PI) > this.toleranceDeg
        ? ((this.locked = "effect"), (this.effectFromBoundary = !1))
        : n
        ? ((this.locked = "effect"), (this.effectFromBoundary = !0))
        : (this.locked = "scroll");
    }
  };
});
var wi = m((Sn) => {
  "use strict";
  Object.defineProperty(Sn, "__esModule", { value: !0 });
  Object.defineProperty(Sn, "VelocityController", {
    enumerable: !0,
    get: function () {
      return wn;
    },
  });
  var ol = {
    adaptiveMax: 2800,
    adaptAlpha: 0.05,
    adaptDecay: 0.99,
    hardMin: 600,
    hardMax: 4e3,
  };
  function sl(r, e) {
    let t = Math.max(e.hardMin, Math.min(e.hardMax, r));
    (e.adaptiveMax = Math.max(t, e.adaptiveMax * e.adaptDecay)),
      (e.adaptiveMax += (t - e.adaptiveMax) * e.adaptAlpha),
      (e.adaptiveMax = Math.max(e.hardMin, Math.min(e.hardMax, e.adaptiveMax)));
  }
  var al = (r) => r * r;
  function ll(r, e, t, n) {
    let o = Math.hypot(r, e);
    sl(o, t);
    let i = Math.max(1, t.adaptiveMax),
      s = al(Math.min(1, o / i)),
      a = 0,
      l = 0;
    return (
      n.x && n.y
        ? o > 0 && ((a = r / o), (l = e / o))
        : n.x
        ? r !== 0 && (a = Math.sign(r))
        : n.y && e !== 0 && (l = Math.sign(e)),
      { n: s, dirX: a, dirY: l }
    );
  }
  var wn = class {
    config;
    velState;
    lastDirX;
    lastDirY;
    lastNormVelocity;
    get dirX() {
      return this.lastDirX;
    }
    get dirY() {
      return this.lastDirY;
    }
    constructor(e) {
      (this.config = e),
        (this.velState = { ...ol }),
        (this.lastDirX = 0),
        (this.lastDirY = 0),
        (this.lastNormVelocity = 0);
    }
    update(e, t) {
      let { n, dirX: o, dirY: i } = ll(e, t, this.velState, this.config.axes);
      (this.lastNormVelocity = n), (this.lastDirX = o), (this.lastDirY = i);
    }
    reset() {
      (this.lastDirX = 0), (this.lastDirY = 0), (this.lastNormVelocity = 0);
    }
    destroy() {
      this.reset();
    }
  };
});
var Si = m((Cn) => {
  "use strict";
  Object.defineProperty(Cn, "__esModule", { value: !0 });
  Object.defineProperty(Cn, "IntervalController", {
    enumerable: !0,
    get: function () {
      return En;
    },
  });
  var cl = Q(),
    ul = 16,
    En = class {
      config;
      accum;
      lastX;
      lastY;
      initialized;
      cycleIndex;
      destroyed;
      constructor(e) {
        (this.config = e),
          (this.accum = 0),
          (this.lastX = 0),
          (this.lastY = 0),
          (this.initialized = !1),
          (this.cycleIndex = 0),
          (this.destroyed = !1),
          document.addEventListener(
            "visibilitychange",
            () => {
              document.visibilityState === "visible" && this.reset();
            },
            { signal: this.config.signal }
          );
      }
      get isActive() {
        return this.config.distance > 0;
      }
      update(e) {
        if (this.destroyed || !this.isActive) return;
        let { x: t, y: n, velocityFactor: o, dirX: i, dirY: s } = e;
        if (!this.initialized) {
          (this.lastX = t), (this.lastY = n), (this.initialized = !0);
          return;
        }
        let a = t - this.lastX,
          l = n - this.lastY;
        (this.lastX = t), (this.lastY = n);
        let { axes: c, distance: u } = this.config;
        c.x && c.y
          ? (this.accum += Math.hypot(a, l))
          : c.x
          ? (this.accum += Math.abs(a))
          : c.y && (this.accum += Math.abs(l));
        let d = 0;
        for (; this.accum >= u && d < ul; ) {
          this.accum -= u;
          let f = {
            cursorPos: { x: t, y: n },
            velocityFactor: o,
            dirX: i,
            dirY: s,
          };
          this.config.channelManager.fireInterval?.(
            cl.TIMELINE_ROLE_NAMES.INTERVAL,
            {
              targetIndex: this.cycleIndex++,
              element: this.config.element,
              pluginPayload: f,
            }
          ),
            d++;
        }
        this.accum >= u && (this.accum %= u);
      }
      reset() {
        (this.accum = 0), (this.initialized = !1), (this.cycleIndex = 0);
      }
      destroy() {
        (this.destroyed = !0), this.reset();
      }
    };
});
var ze = m((Mn) => {
  "use strict";
  Object.defineProperty(Mn, "__esModule", { value: !0 });
  function dl(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  dl(Mn, {
    TRANSIENT_IX3_CLONE_ATTR: function () {
      return Ei.TRANSIENT_IX3_CLONE_ATTR;
    },
    isTransientIX3Clone: function () {
      return Ei.isTransientIX3Clone;
    },
  });
  var Ei = Q();
});
var xi = m((On) => {
  "use strict";
  Object.defineProperty(On, "__esModule", { value: !0 });
  Object.defineProperty(On, "fireMouseMoveInterval", {
    enumerable: !0,
    get: function () {
      return Ml;
    },
  });
  var fl = Q(),
    Ri = ze(),
    An = new Set(["x", "y"]),
    pl = new Set(["scale", "scaleX", "scaleY"]),
    Ci = new WeakMap(),
    Mi = new WeakMap();
  function gl(r) {
    let e = Ci.get(r);
    return (
      e ||
        ((e = {
          activeIntervalEls: new Map(),
          intervalClones: new Set(),
          baselineValues: new Map(),
        }),
        Ci.set(r, e)),
      e
    );
  }
  function hl(r, e, t, n) {
    let o = Mi.get(r);
    o || ((o = new Set()), Mi.set(r, o)),
      !o.has(t) &&
        (o.add(t),
        n(() => {
          let i = e.activeIntervalEls.get(t);
          if (i)
            for (let s of i)
              e.intervalClones.has(s) &&
                (s.isConnected && s.remove(), e.intervalClones.delete(s));
          e.activeIntervalEls.delete(t),
            e.baselineValues.delete(t),
            o.delete(t);
        }));
  }
  function Ai(r) {
    if (r)
      for (let e in r) {
        if (!An.has(e)) continue;
        let t = r[e];
        (typeof t == "string" && (t.startsWith("+=") || t.startsWith("-="))) ||
          ((typeof t == "number" || typeof t == "string") && (r[e] = `+=${t}`));
      }
  }
  var ml = /^random\((.*)\)([a-z%]*)$/i,
    yl = /^-?\d*\.?\d+$/;
  function vl(r, e) {
    let t = ml.exec(r);
    if (!t) return null;
    let n = t[1] ?? "",
      o = t[2] ?? "",
      i = n.startsWith("[") && n.endsWith("]"),
      a = (i ? n.slice(1, -1) : n).split(",").map((c) => c.trim());
    if (!a.every((c) => yl.test(c))) return null;
    let l = a
      .map((c, u) => {
        let d = Number(c);
        return !i && u >= 2 ? Math.abs(e(d) - e(0)) : e(d);
      })
      .join(", ");
    return `random(${i ? `[${l}]` : l})${o}`;
  }
  function Oi(r, e, t, n) {
    if (r)
      for (let o in r) {
        let i = r[o];
        if (typeof i != "number" && typeof i != "string") continue;
        let s = !1,
          a = typeof i == "string" ? i : "";
        typeof i == "string" &&
          (i.startsWith("+=") || i.startsWith("-=")) &&
          ((s = !0), (a = (i.startsWith("-=") ? "-" : "") + i.slice(2)));
        let l, c;
        if (An.has(o)) {
          let p = o === "y" ? n : t;
          (l = (g) => g * e * p), (c = !0);
        } else if (o === "rotation") {
          let p = Math.abs(t) >= Math.abs(n) ? t : -n;
          (l = (g) => g * e * p), (c = s);
        } else
          pl.has(o)
            ? ((l = s ? (p) => p * e : (p) => 1 + (p - 1) * e), (c = s))
            : ((l = (p) => p * e), (c = s));
        if (typeof i == "string" && a.startsWith("random(")) {
          let p = vl(a, l);
          if (p == null) continue;
          r[o] = c ? `+=${p}` : p;
          continue;
        }
        let u,
          d = "";
        if (typeof i == "number") u = i;
        else {
          if (((u = parseFloat(a)), isNaN(u))) continue;
          d = a.replace(/^-?[\d.]+/, "");
        }
        let f = l(u);
        r[o] = c ? `+=${f}${d}` : f;
      }
  }
  function bl(r, e) {
    let t = r.getOneShotTimelineContext(e),
      n = t?.timelineDef;
    if (!t || !n?.actions?.length) return null;
    let o = n.triggerMetadata,
      i = o?.pluginConfig?.type === "mouseMove" ? o.pluginConfig : void 0;
    return o?.role !== "interval" && !i
      ? null
      : {
          oneShot: t,
          mouseMoveMeta: i ?? { type: "mouseMove" },
          axes: o?.axes,
        };
  }
  function Tl(r, e, t, n, o) {
    let i = r.cloneNode(!0);
    i.removeAttribute("style"),
      i.removeAttribute("id"),
      i.removeAttribute("data-w-id"),
      i.setAttribute(Ri.TRANSIENT_IX3_CLONE_ATTR, "true"),
      (i.style.position = "absolute"),
      (i.style.margin = "0"),
      (i.style.pointerEvents = "none"),
      r.insertAdjacentElement("beforebegin", i);
    let s = e.baselineValues.get(o)?.get(r);
    return s && n.set(i, { ...s }), e.intervalClones.add(i), t.add(i), i;
  }
  function wl(r, e) {
    let t = [],
      n = new Set();
    for (let o of r.timelineDef.actions)
      for (let i in o.properties) {
        let s = r.getActionTweenConfig(o, i, [e]);
        if (s) {
          for (let a of [s.to, s.from])
            if (a)
              for (let l of Object.keys(a)) An.has(l) ? t.push(l) : n.add(l);
        }
      }
    return { clearProps: t, baselineProps: n };
  }
  function Sl(r, e, t, n, o) {
    let { clearProps: i, baselineProps: s } = wl(r, t);
    if (s.size > 0) {
      let a = {};
      for (let c of s) a[c] = e.getProperty(t, c);
      let l = n.baselineValues.get(o);
      l || ((l = new WeakMap()), n.baselineValues.set(o, l)), l.set(t, a);
    }
    i.length !== 0 && e.set(t, { clearProps: i.join(",") });
  }
  function El(r, e, t) {
    return (n, o, i) => {
      (
        o.pluginConfig?.type === "mouseMove"
          ? o.pluginConfig.velocityInfluence
          : !1
      )
        ? r != null && (Oi(i.to, r, e, t), i.from && Oi(i.from, r, e, t))
        : (Ai(i.to), i.from && Ai(i.from));
    };
  }
  function Cl(r, e, t, n, o, i, s, a) {
    let [l] = t;
    if (l && (r.set(l, { zIndex: n + 1 + o }, 0), !(!i || (!s && !a))))
      for (let c of t) {
        let u = c.getBoundingClientRect(),
          d = {};
        if (s) {
          let f = Number(e.getProperty(c, "x")) || 0;
          d.x = i.x - (u.left + u.width / 2 - f);
        }
        if (a) {
          let f = Number(e.getProperty(c, "y")) || 0;
          d.y = i.y - (u.top + u.height / 2 - f);
        }
        r.set(c, d, 0);
      }
  }
  function Ii(r) {
    for (let e of r) e();
    r.clear();
  }
  function _i(r, e, t) {
    r.activeIntervalEls.get(e)?.delete(t),
      r.intervalClones.has(t) &&
        (t.isConnected && t.remove(), r.intervalClones.delete(t));
  }
  var Ml = ({
    coordinator: r,
    timelineId: e,
    element: t,
    options: n,
    animation: o,
  }) => {
    if (!o.hasGsap()) return;
    let i = n.targetIndex;
    if (i == null) return;
    let s = bl(r, e);
    if (!s) return;
    let { oneShot: a, mouseMoveMeta: l, axes: c } = s,
      u = gl(r),
      d = a
        .getFirstActionTargets(t)
        .filter((B) => !(0, Ri.isTransientIX3Clone)(B));
    if (!d.length) return;
    let f = [d[i % d.length]],
      p = f,
      g = f[0],
      h = u.activeIntervalEls.get(e);
    h || ((h = new Set()), u.activeIntervalEls.set(e, h)),
      h.has(g) ? (p = [Tl(g, u, h, o, e)]) : (Sl(a, o, g, u, e), h.add(g));
    let v = p[0],
      y = c?.x === !1 && c?.y === !1,
      E = y || (c?.x ?? l?.setMouseX ?? !0),
      b = y || (c?.y ?? l?.setMouseY ?? !0),
      M = (0, fl.narrowMouseMoveIntervalPayload)(n.pluginPayload),
      w = M.cursorPos,
      T = M.velocityFactor,
      S = M.dirX ?? 0,
      _ = M.dirY ?? 0,
      A = new Set(),
      x = a.buildActionTimeline({
        targets: p,
        cleanupBucket: A,
        varsTransform: El(T, S, _),
        beforeTweens: (B) => {
          Cl(B, o, p, d.length, i, w, E, b);
        },
      });
    if (!x) {
      Ii(A), _i(u, e, v);
      return;
    }
    let W = null,
      R = !1,
      O = (B) => {
        R || ((R = !0), W?.(), B && x.kill(), Ii(A), _i(u, e, v));
      };
    (W = a.registerCleanup(() => O(!0))),
      x.eventCallback("onComplete", () => {
        O(!1);
      }),
      hl(r, u, e, a.registerCleanup);
  };
});
var Di = m((Rn) => {
  "use strict";
  Object.defineProperty(Rn, "__esModule", { value: !0 });
  Object.defineProperty(Rn, "buildMouseMove", {
    enumerable: !0,
    get: function () {
      return Fl;
    },
  });
  var ne = Q(),
    Me = Ce(),
    Al = Ti(),
    Ol = wi(),
    Il = Si(),
    _l = xi(),
    Rl = 50,
    Pi = 50,
    In = null;
  function xl() {
    return (
      In === null &&
        (In = "ontouchstart" in window || navigator.maxTouchPoints > 0),
      In
    );
  }
  var Fi = 0,
    Li = 0,
    We = 0,
    se = null;
  function Pl() {
    (We += 1),
      se ||
        ((se = () => {
          (Fi = window.innerWidth), (Li = window.innerHeight);
        }),
        se(),
        window.addEventListener("resize", se));
    let r = !1;
    return () => {
      r ||
        ((r = !0),
        (We = Math.max(0, We - 1)),
        We === 0 &&
          se &&
          (window.removeEventListener("resize", se), (se = null)));
    };
  }
  var Ye = (r) => Math.max(0, Math.min(1, r));
  function kl(r, e, t) {
    return e === t || r === t || (r < t && e > t) || (r > t && e < t);
  }
  function Ae(r, e, t) {
    let n = r.tween;
    (r.tween = null),
      (r.takeoverTarget = null),
      (r.proxy.value = e),
      (r.lastValue = e),
      r.channel?.setProgress(e),
      t && n?.kill();
  }
  function ki(r, e) {
    if (r.tween) {
      if (r.proxy.value === e) {
        Ae(r, e, !0);
        return;
      }
      let t = r.tweenTarget - r.proxy.value,
        n = e - r.proxy.value;
      if (t * n < 0) {
        Ae(r, e, !0);
        return;
      }
      r.takeoverTarget = e;
      return;
    }
    (r.proxy.value = e), (r.lastValue = e), r.channel?.setProgress(e);
  }
  function _n(r) {
    let e = r.tween;
    (r.tween = null), (r.takeoverTarget = null), e?.kill();
  }
  function Ni(r, e, t, n) {
    _n(e), (e.lastValue = e.proxy.value), (e.tweenTarget = t);
    let o = r.to(e.proxy, {
      value: t,
      duration: n,
      ease: "power2.out",
      onUpdate: () => {
        let i = e.proxy.value,
          s = e.takeoverTarget;
        if (s != null && kl(e.lastValue, i, s)) {
          Ae(e, s, !0);
          return;
        }
        (e.lastValue = i), e.channel?.setImmediate(i);
      },
      onComplete: () => {
        let i = e.takeoverTarget;
        (e.tween = null), (e.takeoverTarget = null), i != null && Ae(e, i, !1);
      },
    });
    if (!o) {
      Ae(e, t, !1);
      return;
    }
    e.tween = o;
  }
  function Nl(r, e, t, n) {
    let o = Math.abs(t - r),
      i = Math.abs(n - e),
      s = Math.max(o, i);
    return 0.1 + Math.min(s / 0.5, 1) * 0.5;
  }
  function Fl(r) {
    r.addTrigger("mouse-move", (e, t, n, o) => {
      let i = e[1].pluginConfig,
        s = e[2]?.[0] === ne.IX3_WF_EXTENSION_KEYS.VIEWPORT;
      return (
        o({
          type: "continuous",
          setup: (a) => {
            let { animation: l } = a;
            if (!l.hasGsap() || !l.hasObserver()) return Me.noop;
            let c = s ? Pl() : Me.noop;
            a.registerIntervalHandler(
              ne.IX3_WF_EXTENSION_KEYS.MOUSE_MOVE,
              _l.fireMouseMoveInterval
            );
            let u = i?.smoothness ?? Rl,
              d = (i?.restingState?.x ?? Pi) / 100,
              f = (i?.restingState?.y ?? Pi) / 100,
              p = a.registerChannel({
                role: ne.TIMELINE_ROLE_NAMES.MOUSE_X,
                initialValue: d,
                element: t,
                smoothing: u,
              }),
              g = a.registerChannel({
                role: ne.TIMELINE_ROLE_NAMES.MOUSE_Y,
                initialValue: f,
                element: t,
                smoothing: u,
              }),
              h = new AbortController(),
              { signal: v } = h,
              y = a.getMetadata(ne.TIMELINE_ROLE_NAMES.INTERVAL),
              E = {
                x: y?.axes?.x !== !1 || y?.axes?.y === !1,
                y: y?.axes?.y !== !1 || y?.axes?.x === !1,
              },
              b = y
                ? new Il.IntervalController({
                    distance:
                      y.distance ?? ne.DEFAULT_MOUSE_MOVE_INTERVAL_DISTANCE,
                    axes: E,
                    channelManager: a,
                    element: t,
                    signal: v,
                  })
                : null,
              M = b ? new Ol.VelocityController({ axes: E }) : null,
              w = {
                proxy: { value: d },
                channel: p,
                tween: null,
                takeoverTarget: null,
                lastValue: d,
                tweenTarget: d,
              },
              T = {
                proxy: { value: f },
                channel: g,
                tween: null,
                takeoverTarget: null,
                lastValue: f,
                tweenTarget: f,
              },
              S = !1,
              _ = (N, $) => {
                let G = Nl(w.proxy.value, T.proxy.value, N, $);
                Ni(l, w, N, G), Ni(l, T, $, G);
              },
              A = xl(),
              x = s ? document.documentElement : t,
              W = null;
            A && (W = new Al.TouchScrollGuard(x, v));
            let R = null,
              O = () => {
                R = null;
              },
              B = () => (R || (R = t.getBoundingClientRect()), R);
            if (!s) {
              let N = new ResizeObserver(O);
              N.observe(t),
                v.addEventListener("abort", () => N.disconnect()),
                window.addEventListener("scroll", O, {
                  passive: !0,
                  capture: !0,
                  signal: v,
                }),
                window.visualViewport &&
                  window.visualViewport.addEventListener("resize", O, {
                    signal: v,
                  });
            }
            let ee;
            try {
              if (
                ((ee = l.createObserver({
                  target: x,
                  type: A ? "pointer,touch" : "pointer",
                  tolerance: 0,
                  onMove: (N) => {
                    if (W?.isScrolling || !a.isPreviewEnabled()) return;
                    let $ = N.x ?? 0,
                      G = N.y ?? 0,
                      H,
                      ue;
                    if (s)
                      (H = Ye($ / Math.max(1, Fi))),
                        (ue = Ye(G / Math.max(1, Li)));
                    else {
                      let Z = B();
                      (H = Ye(($ - Z.left) / Math.max(1, Z.width))),
                        (ue = Ye((G - Z.top) / Math.max(1, Z.height)));
                    }
                    S ? (ki(w, H), ki(T, ue)) : ((S = !0), _(H, ue)),
                      a.publishChannel(
                        ne.MOUSE_MOVE_CHANNELS.POSITION,
                        { x: $, y: G, triggerEl: t, isViewport: s },
                        t
                      ),
                      M &&
                        (M.update(N.velocityX, N.velocityY),
                        b.update({
                          x: $,
                          y: G,
                          velocityFactor: M.lastNormVelocity,
                          dirX: M.dirX,
                          dirY: M.dirY,
                        }));
                  },
                })),
                !ee)
              )
                return b?.destroy(), M?.destroy(), h.abort(), c(), Me.noop;
            } catch {
              return b?.destroy(), M?.destroy(), h.abort(), c(), Me.noop;
            }
            let q = () => {
              a.isPreviewEnabled() &&
                ((S = !1),
                _(d, f),
                M?.reset(),
                a.publishChannel(ne.MOUSE_MOVE_CHANNELS.LEAVE, void 0, t),
                b?.reset());
            };
            return (
              s
                ? (x.addEventListener("mouseleave", q, { signal: v }),
                  window.addEventListener("blur", q, { signal: v }))
                : t.addEventListener("mouseleave", q, { signal: v }),
              x.addEventListener("touchend", q, { signal: v, passive: !0 }),
              x.addEventListener("touchcancel", q, { signal: v, passive: !0 }),
              () => {
                ee.kill(),
                  h.abort(),
                  _n(w),
                  _n(T),
                  b?.destroy(),
                  M?.destroy(),
                  c();
              }
            );
          },
        }),
        Me.noop
      );
    });
  }
});
var Bi = m((xn) => {
  "use strict";
  Object.defineProperty(xn, "__esModule", { value: !0 });
  Object.defineProperty(xn, "build", {
    enumerable: !0,
    get: function () {
      return Dl;
    },
  });
  var ji = Q(),
    Oe = Ce(),
    Ll = Di();
  function Dl(r) {
    jl(r),
      Vl(r),
      (0, Ll.buildMouseMove)(r),
      Bl(r),
      Ul(r),
      r.addTrigger("load", (e, t, n, o) => {
        let i = e[1],
          s = !1,
          a = () => {
            s || ((s = !0), o({ target: t }));
          };
        switch (i.pluginConfig?.triggerPoint) {
          case "immediate":
            return a(), Oe.noop;
          case "fullyLoaded":
            return document.readyState === "complete"
              ? (a(), Oe.noop)
              : n.addEventListener(window, "load", a);
          case "DOMContentLoaded":
          default:
            return document.readyState === "complete" ||
              document.readyState === "interactive"
              ? (a(), Oe.noop)
              : n.addEventListener(document, "DOMContentLoaded", a);
        }
      }),
      r.addTrigger("focus", (e, t, n, o) => {
        let i = e[1];
        return n.addEventListener(
          t,
          i.pluginConfig?.useFocusWithin ? "focusin" : "focus",
          o,
          { delegate: !i.pluginConfig?.useFocusWithin }
        );
      }),
      r.addTrigger("blur", (e, t, n, o) => {
        let i = e[1];
        return n.addEventListener(
          t,
          i.pluginConfig?.useFocusWithin ? "focusout" : "blur",
          o,
          { delegate: !i.pluginConfig?.useFocusWithin }
        );
      }),
      r.addTrigger("scroll", (e, t, n, o) => (o({ target: t }), Oe.noop)),
      r.addTrigger("custom", (e, t, n, o) => {
        let s = e[1].pluginConfig?.eventName;
        return s
          ? n.addEventListener(t, s, o, { delegate: !1, kind: "custom" })
          : Oe.noop;
      }),
      r.addTrigger("change", (e, t, n, o) =>
        n.addEventListener(t, "change", o)
      );
  }
  function jl(r) {
    let e = new WeakMap();
    r.addTrigger("click", (t, n, o, i) => {
      let [, s] = t,
        a = o.addEventListener(
          n,
          "click",
          (l) => {
            let c = s.pluginConfig?.click,
              u = e.get(n) || new WeakMap();
            e.set(n, u);
            let f = (u.get(t) || 0) + 1;
            switch ((u.set(t, f), c)) {
              case "each": {
                i(l);
                break;
              }
              case "first": {
                f === 1 && i(l);
                break;
              }
              case "second": {
                f === 2 && i(l);
                break;
              }
              case "odd": {
                f % 2 === 1 && i(l);
                break;
              }
              case "even": {
                f % 2 === 0 && i(l);
                break;
              }
              case "custom": {
                let p = s.pluginConfig?.custom;
                p && f === p && i(l);
                break;
              }
              default:
                i(l);
            }
          },
          { delegate: !0 }
        );
      return () => {
        a(), e.delete(n);
      };
    });
  }
  function Vl(r) {
    let e = new WeakMap();
    r.addTrigger("hover", (t, n, o, i) => {
      let [, s] = t,
        a = [],
        l = s.pluginConfig?.multiTimeline,
        c = s.pluginConfig?.eventMode,
        u = c !== "leave",
        d = c !== "enter";
      if (l === !0)
        return (
          u &&
            a.push(
              o.addEventListener(n, "mouseenter", () =>
                i({
                  type: "timeline-role",
                  role: ji.TIMELINE_ROLE_NAMES.MOUSE_ENTER,
                })
              )
            ),
          d &&
            a.push(
              o.addEventListener(n, "mouseleave", () =>
                i({
                  type: "timeline-role",
                  role: ji.TIMELINE_ROLE_NAMES.MOUSE_LEAVE,
                })
              )
            ),
          () => {
            a.forEach((p) => p()), (a.length = 0);
          }
        );
      if (l === !1) {
        if (
          s.control === void 0 ||
          s.control === "togglePlayReverse" ||
          s.control === "togglePlayReverseFlipEase"
        ) {
          let g =
            s.control === "togglePlayReverseFlipEase"
              ? "reverseFlipEase"
              : "reverse";
          if (
            (u &&
              a.push(
                o.addEventListener(n, "mouseenter", () =>
                  i({ type: "playback-control", control: "play" })
                )
              ),
            d)
          ) {
            let h = u ? g : "play";
            a.push(
              o.addEventListener(n, "mouseleave", () =>
                i({ type: "playback-control", control: h })
              )
            );
          }
        } else
          u && a.push(o.addEventListener(n, "mouseenter", (g) => i(g))),
            d && a.push(o.addEventListener(n, "mouseleave", (g) => i(g)));
        return () => {
          a.forEach((g) => g()), (a.length = 0);
        };
      }
      let f = (p, g) => {
        if ((s.pluginConfig?.type ?? "mouseenter") !== g) return;
        let v = s.pluginConfig?.hover || "each",
          y = e.get(n) || new Map();
        e.set(n, y);
        let b = (y.get(g) || 0) + 1;
        switch ((y.set(g, b), v)) {
          case "each": {
            i(p);
            break;
          }
          case "first": {
            b === 1 && i(p);
            break;
          }
          case "second": {
            b === 2 && i(p);
            break;
          }
          case "odd": {
            b % 2 === 1 && i(p);
            break;
          }
          case "even": {
            b % 2 === 0 && i(p);
            break;
          }
          case "custom": {
            let M = s.pluginConfig?.custom;
            M && b === M && i(p);
            break;
          }
          default:
            i(p);
        }
      };
      return (
        a.push(
          o.addEventListener(n, "mouseenter", (p) => {
            f(p, "mouseenter");
          })
        ),
        a.push(
          o.addEventListener(n, "mouseover", (p) => {
            f(p, "mouseover");
          })
        ),
        a.push(
          o.addEventListener(n, "mouseleave", (p) => {
            f(p, "mouseleave");
          })
        ),
        () => {
          a.forEach((p) => p()), (a.length = 0), e.delete(n);
        }
      );
    });
  }
  function Vi(r, e) {
    r.addTrigger(e, (t, n, o, i) => {
      let s = t[1].pluginConfig?.event,
        a = "IX3_COMPONENT_STATE_CHANGE";
      return o.addEventListener(n, a, (l) => {
        let c = l.detail;
        if (!c || typeof c != "object") return;
        let { component: u, state: d } = c;
        u !== e ||
          !d ||
          (s && d !== s) ||
          i({ type: "timeline-role", role: d });
      });
    });
  }
  function Bl(r) {
    Vi(r, "navbar");
  }
  function Ul(r) {
    Vi(r, "dropdown");
  }
});
var ve = m((Pn) => {
  "use strict";
  Object.defineProperty(Pn, "__esModule", { value: !0 });
  function ql(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  ql(Pn, {
    resolveToNumber: function () {
      return $l;
    },
    resolveToString: function () {
      return Gl;
    },
  });
  function $l(r, e) {
    if (typeof r == "number") return r;
    if (typeof r == "string") {
      let t = r;
      if (t.startsWith("var(")) {
        let o = t.slice(4, -1).split(",")[0]?.trim() ?? "";
        if (!o || ((t = getComputedStyle(e).getPropertyValue(o).trim()), !t))
          return;
      }
      let n = parseFloat(t);
      return isNaN(n) ? void 0 : n;
    }
  }
  function Gl(r, e) {
    if (typeof r == "string") {
      if (r.startsWith("var(")) {
        let t = r.slice(4, -1).split(",")[0]?.trim() ?? "";
        return (t && getComputedStyle(e).getPropertyValue(t).trim()) || void 0;
      }
      return r;
    }
  }
});
var Gi = m((Fn) => {
  "use strict";
  Object.defineProperty(Fn, "__esModule", { value: !0 });
  function Hl(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Hl(Fn, {
    buildMouseFollowAction: function () {
      return Ql;
    },
    forTestSuite: function () {
      return Xl;
    },
  });
  var kn = Q(),
    Xe = Ce(),
    zl = 0.5,
    Ze = 50;
  function Wl(r) {
    let e = 2166136261;
    for (let t = 0; t < r.length; t++)
      (e ^= r.charCodeAt(t)), (e = Math.imul(e, 16777619));
    return e >>> 0;
  }
  function Yl(r) {
    let e = r >>> 0;
    return () => {
      e = (e + 1831565813) | 0;
      let t = Math.imul(e ^ (e >>> 15), 1 | e);
      return (
        (t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)),
        ((t ^ (t >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  function Ui(r, e, t) {
    if (r <= 1) return [0];
    if (typeof e == "number") {
      let n = Math.max(0, Math.min(r - 1, Math.floor(e))),
        o = [n];
      for (let i = 1; o.length < r; i++)
        n + i < r && o.push(n + i), n - i >= 0 && o.push(n - i);
      return o;
    }
    switch (e) {
      case "start":
        return Array.from({ length: r }, (n, o) => o);
      case "center": {
        let n = [],
          o = Math.floor((r - 1) / 2);
        n.push(o);
        for (let i = 1; n.length < r; i++)
          o + i < r && n.push(o + i), o - i >= 0 && n.push(o - i);
        return n;
      }
      case "random": {
        let n = t != null && t !== "" ? Yl(Wl(t)) : Math.random,
          o = Array.from({ length: r }, (i, s) => s);
        for (let i = r - 1; i > 0; i--) {
          let s = Math.floor(n() * (i + 1));
          [o[i], o[s]] = [o[s], o[i]];
        }
        return o;
      }
      case "edges": {
        let n = [],
          o = 0,
          i = r - 1;
        for (; o <= i; ) n.push(o), o !== i && n.push(i), o++, i--;
        return n;
      }
      case "end":
      default:
        return Array.from({ length: r }, (n, o) => r - 1 - o);
    }
  }
  function Nn(r) {
    if (r == null) return Ze;
    let e = typeof r == "number" ? r * 1e3 : parseFloat(r);
    return Number.isFinite(e) && e >= 0 ? e : Ze;
  }
  var Ie = (r) => {
      if (typeof r != "string") return 0.5;
      let e = /^(-?\d+(?:\.\d+)?)%$/.exec(r.trim());
      if (e) return Math.max(0, Math.min(1, parseFloat(e[1]) / 100));
      let t = r.trim().toLowerCase();
      return t === "left" || t === "top"
        ? 0
        : t === "right" || t === "bottom"
        ? 1
        : 0.5;
    },
    qi = (r, e) => {
      if (r?.amount != null) {
        let t = Nn(r.amount),
          n = e > 1 ? t / (e - 1) : Ze;
        return Math.max(1, n);
      }
      return r?.each != null ? Math.max(1, Nn(r.each)) : 1;
    },
    $i = (r) => {
      if (!r) return { x: 0.5, y: 0.5 };
      if (typeof r == "string") {
        let [e, t] = r.trim().split(/\s+/);
        return { x: Ie(e ?? "50%"), y: Ie(t ?? "50%") };
      }
      return { x: Ie(r.x), y: Ie(r.y) };
    },
    Xl = {
      DEFAULT_STAGGER_MS: Ze,
      computeMouseFollowSmoothingMs: qi,
      getChainOrder: Ui,
      parseAnchor: $i,
      parseAnchorAxis: Ie,
      staggerEachToMs: Nn,
    };
  function Zl(r, e, t, n) {
    if (!t.length) return;
    let o = n?.animation;
    if (!o?.hasGsap()) return;
    let i =
        typeof window < "u" &&
        typeof window.matchMedia == "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      s = e,
      a = s?.leaveBehavior ?? "return",
      l = s?.onEnter ?? "animate",
      c = n?.timelineRole,
      u = c === "mouseX" ? "x" : c === "mouseY" ? "y" : s?.axis ?? "x",
      d = u,
      f = s?.followMode;
    if (
      f != null &&
      f !== "full" &&
      f !== (0, kn.getSingleAxisMouseFollowMode)(u)
    )
      return;
    let p = $i(s?.anchor),
      g = u === "x" ? p.x : p.y,
      h = t.map((C) => o.getProperty(C, d)),
      v = t.map((C) => o.quickSetter(C, d, "px"));
    if (v.some((C) => C == null)) return;
    let y = v,
      E = (0, Xe.initScrollCache)(),
      b = t.map((C) => {
        let I = C.getBoundingClientRect();
        return u === "x"
          ? I.left + I.width * g
          : I.top + I.height * g + (0, Xe.getScrollY)();
      }),
      M = r.timing?.stagger,
      w = t.length,
      T = qi(M, w),
      S = M?.from,
      A = Ui(
        w,
        typeof S == "number" ||
          S === "start" ||
          S === "center" ||
          S === "edges" ||
          S === "end" ||
          S === "random"
          ? S
          : "end",
        s?.groupId ?? s?.syncedActionId
      );
    if (A.length === 0) return;
    let x = new Float64Array(w),
      W = A[0],
      R = { value: b[W] ?? 0 },
      O = null,
      B = !1,
      ee = 0,
      q = null,
      N = !1,
      $ = null,
      G = performance.now(),
      H = 0,
      ue = () => {
        let C = performance.now(),
          I = Math.min(C - G, 100);
        G = C;
        let V = 1 - Math.exp(-I / T),
          F = !1;
        for (let L = 0; L < A.length; L++) {
          let k = A[L],
            de;
          if (L === 0) de = R.value;
          else {
            let kr = A[L - 1];
            de = b[kr] + x[kr];
          }
          let Pr = de - b[k],
            dt = Pr - x[k];
          Math.abs(dt) > zl
            ? ((x[k] = x[k] + dt * V), y[k](x[k]), (F = !0))
            : dt !== 0 && ((x[k] = Pr), y[k](x[k]));
        }
        O?.isActive() && (F = !0), F || Z();
      },
      Z = () => {
        N && ($?.(), ($ = null), (N = !1));
      },
      Rr = (C) => {
        O?.kill(), (O = null), (H = 0), (R.value = C);
        for (let I = 0; I < A.length; I++) {
          let V = A[I],
            F = C - b[V];
          (x[V] = F), y[V](F);
        }
        Z();
      },
      Yo = () => {
        O?.kill(), (O = null), (H = 0), (R.value = b[W] ?? 0);
        for (let C = 0; C < A.length; C++) {
          let I = A[C];
          (x[I] = 0), y[I](0);
        }
        Z();
      },
      te = () => {
        N || ((G = performance.now()), ($ = o.addTicker(ue)), (N = !0));
      },
      Xo = (C, I) => {
        (q = C),
          (ee = I
            ? u === "x"
              ? window.innerWidth
              : window.innerHeight
            : u === "x"
            ? C.offsetWidth
            : C.offsetHeight);
      },
      Zo = (C) => {
        q || Xo(C.triggerEl, C.isViewport);
        let I = u === "x" ? C.x : C.y + (0, Xe.getScrollY)();
        if (i) {
          (B = !0), Rr(I);
          return;
        }
        if (B)
          if (O) {
            let V = Math.max(H - performance.now(), 50);
            O.kill();
            let F = o.to(R, {
              value: I,
              duration: V / 1e3,
              ease: "power2.out",
              onUpdate: te,
              onComplete: () => {
                O === F && ((O = null), (H = 0));
              },
            });
            if (!F) {
              (R.value = I), te();
              return;
            }
            O = F;
          } else R.value = I;
        else {
          if (((B = !0), l === "snap")) {
            Rr(I);
            return;
          }
          let V = Math.abs(I - R.value),
            L = 0.1 + Math.min(V / (ee || 1), 1) * 0.5;
          (H = performance.now() + L * 1e3), O?.kill();
          let k = o.to(R, {
            value: I,
            duration: L,
            ease: "power2.out",
            onUpdate: te,
            onComplete: () => {
              O === k && ((O = null), (H = 0));
            },
          });
          if (!k) {
            (R.value = I), te();
            return;
          }
          O = k;
        }
        te();
      },
      Qo = () => {
        if (((B = !1), a === "stay")) {
          te();
          return;
        }
        if (i) {
          Yo();
          return;
        }
        let C = b[W] ?? 0,
          I = Math.abs(R.value - C),
          F = 0.1 + Math.min(I / (ee || 1), 1) * 0.5;
        O?.kill();
        let L = o.to(R, {
          value: C,
          duration: F,
          ease: "power2.out",
          onUpdate: te,
          onComplete: () => {
            O === L && (O = null);
          },
        });
        if (!L) {
          (R.value = C), te();
          return;
        }
        O = L;
      },
      Ko = n?.subscribeChannel?.(kn.MOUSE_MOVE_CHANNELS.POSITION, Zo),
      Jo = n?.subscribeChannel?.(kn.MOUSE_MOVE_CHANNELS.LEAVE, Qo),
      xr = new AbortController(),
      { signal: es } = xr,
      ut = 0,
      ts = () => {
        clearTimeout(ut),
          (ut = window.setTimeout(() => {
            q && (ee = u === "x" ? q.offsetWidth : q.offsetHeight);
            for (let C = 0; C < t.length; C++) {
              let I = t[C],
                V = o.getProperty(I, d),
                F = typeof V == "number" ? V : parseFloat(String(V)),
                L = Number.isFinite(F) ? F : 0,
                k = I.getBoundingClientRect(),
                de = u === "x" ? k.left + k.width * g : k.top + k.height * g;
              (b[C] = u === "x" ? de - L : de - L + (0, Xe.getScrollY)()),
                (x[C] = L);
            }
            if (!B) {
              let C = b[W];
              C !== void 0 &&
                (O?.isActive() && (O.kill(), (O = null)), (R.value = C));
            }
          }, 250));
      };
    return (
      window.addEventListener("resize", ts, { signal: es }),
      () => {
        O?.kill(), Z(), clearTimeout(ut), xr.abort(), Ko?.(), Jo?.(), E();
        for (let C = 0; C < t.length; C++) o.set(t[C], { [d]: h[C] });
      }
    );
  }
  function Ql(r) {
    r.addAction("mouse-follow", {
      requiresTriggerElementContext: !0,
      createCustomTween: (e, t, n, o, i, s, a) => Zl(t, n, i, a),
    });
  }
});
var zi = m((Dn) => {
  "use strict";
  Object.defineProperty(Dn, "__esModule", { value: !0 });
  function Kl(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Kl(Dn, {
    applyAdditive: function () {
      return nc;
    },
    formatRandom: function () {
      return Hi;
    },
    formatRandomArray: function () {
      return tc;
    },
    isAdditiveValue: function () {
      return Jl;
    },
    isRandomArrayValue: function () {
      return ec;
    },
    isRandomValue: function () {
      return Ln;
    },
    makeClamp: function () {
      return rc;
    },
  });
  function Ln(r) {
    if (typeof r != "object" || r === null) return !1;
    let e = r;
    return (
      e.type === "ix3-random" &&
      typeof e.min == "number" &&
      typeof e.max == "number" &&
      (e.step === void 0 || typeof e.step == "number") &&
      (e.unit === void 0 || typeof e.unit == "string")
    );
  }
  function Jl(r) {
    if (typeof r != "object" || r === null) return !1;
    let e = r;
    return (
      e.type === "ix3-additive" &&
      (typeof e.value == "number" || Ln(e.value)) &&
      (e.unit === void 0 || typeof e.unit == "string")
    );
  }
  function ec(r) {
    if (typeof r != "object" || r === null) return !1;
    let e = r;
    return (
      e.type === "ix3-random-array" &&
      Array.isArray(e.values) &&
      e.values.every((t) => typeof t == "number" || typeof t == "string") &&
      (e.unit === void 0 || typeof e.unit == "string")
    );
  }
  function Hi(r, e) {
    let t = r.unit ?? e ?? "",
      n = r.step != null ? `, ${r.step}` : "";
    return `random(${r.min}, ${r.max}${n})${t}`;
  }
  function tc(r, e) {
    let t = r.unit ?? e ?? "";
    return `random([${r.values.join(", ")}])${t}`;
  }
  function nc(r, e) {
    let t = r.unit ?? e ?? "";
    return Ln(r.value) ? `+=${Hi(r.value, t)}` : `+=${r.value}${t}`;
  }
  function rc(r, e) {
    let t = (n) => (n < r ? r : n > e ? e : n);
    return (n) => {
      if (typeof n == "number") return t(n);
      let o = parseFloat(n);
      if (Number.isNaN(o)) return n;
      let i = t(o);
      return i === o
        ? n
        : `${i}${n.replace(/^\s*[+-]?[\d.]+(?:e[+-]?\d+)?/i, "")}`;
    };
  }
});
var Zi = m((jn) => {
  "use strict";
  Object.defineProperty(jn, "__esModule", { value: !0 });
  Object.defineProperty(jn, "build", {
    enumerable: !0,
    get: function () {
      return lc;
    },
  });
  var _e = ve(),
    ic = Gi(),
    P = zi();
  function Wi(r, e) {
    return e != null && typeof r == "string" && r.startsWith("var(")
      ? (0, _e.resolveToString)(r, e) ?? r
      : r;
  }
  var Yi = new Set(["opacity", "autoAlpha"]),
    oc = new Set(["scale", "scaleX", "scaleY", "z", "transformPerspective"]),
    sc = new Set(["xPercent", "yPercent"]),
    Xi = new Set(["width", "height"]);
  function Qe(r) {
    return r.startsWith("+=") || r.startsWith("-=") || r.startsWith("random(");
  }
  function ac(r) {
    if (Yi.has(r)) return (0, P.makeClamp)(0, 1);
    if (oc.has(r) || Xi.has(r)) return (0, P.makeClamp)(0, Number.MAX_VALUE);
  }
  function Ke(r) {
    return (
      (0, P.isRandomValue)(r) ||
      (0, P.isAdditiveValue)(r) ||
      (0, P.isRandomArrayValue)(r)
    );
  }
  function Je(r, e) {
    let t = Yi.has(r) ? 100 : 1,
      n = t !== 1 || sc.has(r),
      o = (i) => ({
        type: "ix3-random",
        min: i.min / t,
        max: i.max / t,
        step: i.step != null ? i.step / t : void 0,
      });
    if ((0, P.isRandomArrayValue)(e)) {
      let i = n
        ? {
            type: "ix3-random-array",
            values: e.values.map((s) => (typeof s == "number" ? s / t : s)),
          }
        : e;
      return (0, P.formatRandomArray)(i);
    }
    if ((0, P.isRandomValue)(e)) return (0, P.formatRandom)(n ? o(e) : e);
    if (n) {
      let i = (0, P.isRandomValue)(e.value) ? o(e.value) : e.value / t;
      return (0, P.applyAdditive)({ type: "ix3-additive", value: i });
    }
    return (0, P.applyAdditive)(e);
  }
  function lc(r) {
    (0, ic.buildMouseFollowAction)(r),
      r
        .addAction("class", {
          createCustomTween: (e, t, n, o, i, s) => {
            let a = n.class,
              l = a?.selectors || [],
              c = a?.operation,
              u = l
                ? i.map((f) => ({ element: f, classList: [...f.classList] }))
                : [],
              d = () => {
                if (!(!c || !l))
                  for (let f of i)
                    c === "addClass"
                      ? l.forEach((p) => f.classList.add(p))
                      : c === "removeClass"
                      ? l.forEach((p) => f.classList.remove(p))
                      : c === "toggleClass" &&
                        l.forEach((p) => f.classList.toggle(p));
              };
            return (
              e.to(
                {},
                { duration: 0.001, onComplete: d, onReverseComplete: d },
                !s || s === 0 ? 0.001 : s
              ),
              () => {
                if (l) {
                  for (let f of u)
                    if (
                      f.element &&
                      (f.element instanceof HTMLElement &&
                        (f.element.className = ""),
                      f.element.classList)
                    )
                      for (let p of f.classList) f.element.classList.add(p);
                }
              }
            );
          },
        })
        .addAction("style", {
          createTweenConfig: (e, t) => {
            let n = { to: {}, from: {} },
              o = t?.[0];
            for (let i in e) {
              let s = e[i],
                a = Array.isArray(s) ? s[1] : s,
                l = Array.isArray(s) ? s[0] : void 0,
                c = Ke(a) ? Je(i, a) : Wi(a, o),
                u = Ke(l) ? Je(i, l) : l !== void 0 ? Wi(l, o) : void 0;
              c != null && (n.to[i] = c),
                u != null && !(0, P.isAdditiveValue)(a) && (n.from[i] = u),
                Xi.has(i) &&
                  (Ke(a) || Ke(l)) &&
                  (n.modifiers || (n.modifiers = {}),
                  (n.modifiers[i] = (0, P.makeClamp)(0, Number.MAX_VALUE)));
            }
            return n;
          },
        })
        .addAction("transform", {
          createTweenConfig: (e, t) => {
            let n = { to: {}, from: {} },
              o = t?.[0];
            for (let i in e) {
              let s = e[i],
                a = Array.isArray(s) ? s[1] : s,
                l = Array.isArray(s) ? s[0] : void 0,
                c = (0, P.isAdditiveValue)(a),
                u =
                  (0, P.isRandomValue)(a) || (0, P.isRandomArrayValue)(a) || c,
                d =
                  (0, P.isRandomValue)(l) ||
                  (0, P.isRandomArrayValue)(l) ||
                  (0, P.isAdditiveValue)(l);
              if (u || d) {
                let f = ac(i);
                f &&
                  (n.modifiers || (n.modifiers = {}),
                  (n.modifiers[i] = f),
                  i === "autoAlpha" && (n.modifiers.opacity = f),
                  i === "scale" &&
                    ((n.modifiers.scaleX = f), (n.modifiers.scaleY = f))),
                  u && (a = Je(i, a)),
                  d && (l = Je(i, l));
              }
              switch (i) {
                case "autoAlpha":
                case "opacity": {
                  if (a != null && typeof a == "string" && !Qe(a)) {
                    let f = o ? (0, _e.resolveToNumber)(a, o) : parseFloat(a);
                    a = f !== void 0 ? f / 100 : a;
                  }
                  if (l != null && typeof l == "string" && !Qe(l)) {
                    let f = o ? (0, _e.resolveToNumber)(l, o) : parseFloat(l);
                    l = f !== void 0 ? f / 100 : l;
                  }
                  break;
                }
                case "transformOrigin": {
                  typeof s == "string"
                    ? ((a = a || s), (l = a))
                    : typeof l == "string"
                    ? (a = l)
                    : typeof a == "string" && (l = a);
                  break;
                }
                case "xPercent":
                case "yPercent": {
                  if (a != null && typeof a == "string" && !Qe(a)) {
                    let f = o ? (0, _e.resolveToNumber)(a, o) : parseFloat(a);
                    a = f !== void 0 ? f : a;
                  }
                  if (l != null && typeof l == "string" && !Qe(l)) {
                    let f = o ? (0, _e.resolveToNumber)(l, o) : parseFloat(l);
                    l = f !== void 0 ? f : l;
                  }
                  break;
                }
              }
              a != null && (n.to[i] = a), l != null && !c && (n.from[i] = l);
            }
            return n;
          },
        });
  }
});
var Ji = m((Vn) => {
  "use strict";
  Object.defineProperty(Vn, "__esModule", { value: !0 });
  Object.defineProperty(Vn, "buildLottieAction", {
    enumerable: !0,
    get: function () {
      return uc;
    },
  });
  var cc = ve();
  function uc(r) {
    r.addAction("lottie", {
      createCustomTween: (e, t, n, o, i, s) => {
        let a = n.lottie;
        if (!a || !i.length || !window.Webflow) return;
        let l = window.Webflow.require?.("lottie");
        if (!l) return;
        let c = [],
          u = !1;
        for (let d of i) {
          let f = Ki(a.from, d, Qi.FROM),
            p = Ki(a.to, d, Qi.TO),
            g = l.createInstance(d);
          if (!g) continue;
          c.push(g);
          let h = () => {
            if (u) return;
            let v = g.frames,
              y = Math.round(f * v),
              E = Math.round(p * v);
            g.gsapFrame === null && (g.gsapFrame = y);
            let b = o;
            b.ease || (b = { ...b, ease: "none" }),
              e.fromTo(g, { gsapFrame: y }, { gsapFrame: E, ...b }, s || 0);
          };
          g.isLoaded ? h() : g.onDataReady(h);
        }
        return () => {
          u = !0;
          for (let d of c) d.goToFrameAndStop(0), (d.gsapFrame = null);
        };
      },
    });
  }
  var Qi = { DURATION: 1, FROM: 0, TO: 1 };
  function Ki(r, e, t) {
    if (typeof r == "number") return r;
    let n = (0, cc.resolveToNumber)(r, e);
    return n !== void 0 ? n / 100 : t;
  }
});
var Un = m((Bn) => {
  "use strict";
  Object.defineProperty(Bn, "__esModule", { value: !0 });
  Object.defineProperty(Bn, "RIVE_CONSTANTS", {
    enumerable: !0,
    get: function () {
      return dc;
    },
  });
  var dc = { MINIMUM_TIME: 0.001, MAX_BYTE_VALUE: 255 };
});
var Gn = m(($n) => {
  "use strict";
  Object.defineProperty($n, "__esModule", { value: !0 });
  function fc(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  fc($n, {
    clearSurfaceCache: function () {
      return pc;
    },
    surfaceCache: function () {
      return qn;
    },
  });
  var qn = new WeakMap();
  function pc(r, e) {
    if (!e) return;
    let t = `${e.name}:${e.instanceName ?? ""}`,
      n = qn.get(r);
    n && (n.delete(t), n.size === 0 && qn.delete(r));
  }
});
var Re = m((Hn) => {
  "use strict";
  Object.defineProperty(Hn, "__esModule", { value: !0 });
  function gc(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  gc(Hn, {
    parseVmKey: function () {
      return yc;
    },
    vmKey: function () {
      return hc;
    },
  });
  function hc(r, e, t) {
    return `vm:${r}:${e}:${t}`;
  }
  var mc = new Set([
    "string",
    "number",
    "boolean",
    "color",
    "enum",
    "trigger",
    "artboard",
  ]);
  function yc(r) {
    if (!r.startsWith("vm:")) return null;
    let e = r.lastIndexOf(":"),
      t = r.slice(e + 1);
    if (!mc.has(t)) return null;
    let n = r.slice(3, e),
      o = n.indexOf(":");
    return o === -1
      ? null
      : { vmName: n.slice(0, o), propName: n.slice(o + 1), propType: t };
  }
});
var et = m((zn) => {
  "use strict";
  Object.defineProperty(zn, "__esModule", { value: !0 });
  function vc(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  vc(zn, {
    getVmiProperty: function () {
      return eo;
    },
    storeOriginalValues: function () {
      return Tc;
    },
  });
  var bc = Re();
  function Tc(r, e) {
    let t = { viewModelProperties: {} };
    for (let n of r) wc(e, n.propertyName, n.propertyType, t);
    return t;
  }
  function wc(r, e, t, n) {
    let o = (0, bc.vmKey)(r.name, e, t);
    if (!(o in n.viewModelProperties)) {
      if (t === "artboard") {
        let s = r.riveInstance.viewModelInstance?.artboard?.(e)?.name;
        s != null && (n.viewModelProperties[o] = s);
        return;
      }
      let i = r.riveInstance.viewModelInstance
        ? Sc(r.riveInstance.viewModelInstance, t, e)
        : null;
      i != null && (n.viewModelProperties[o] = i);
    }
  }
  function eo(r, e, t) {
    switch (e) {
      case "number":
        return r.number(t);
      case "boolean":
        return r.boolean(t);
      case "string":
        return r.string(t);
      case "color":
        return r.color(t);
      case "enum":
        return r.enum(t);
      default:
        return null;
    }
  }
  function Sc(r, e, t) {
    let n = eo(r, e, t);
    return n ? n.value : void 0;
  }
});
var Yn = m((Wn) => {
  "use strict";
  Object.defineProperty(Wn, "__esModule", { value: !0 });
  Object.defineProperty(Wn, "parseColorToAARRGGBB", {
    enumerable: !0,
    get: function () {
      return Cc;
    },
  });
  var Ec = Un();
  function Cc(r) {
    let e = r.trim();
    if (!e) return null;
    try {
      let { red: t, green: n, blue: o, alpha: i } = Ac(e);
      return t === void 0 || n === void 0 || o === void 0
        ? null
        : ((Math.round(i * Ec.RIVE_CONSTANTS.MAX_BYTE_VALUE) << 24) |
            (t << 16) |
            (n << 8) |
            o) >>>
            0;
    } catch {
      return null;
    }
  }
  var ae = null;
  function Mc(r) {
    if (!ae) {
      let e = document.createElement("canvas");
      if (((e.width = 1), (e.height = 1), (ae = e.getContext("2d")), !ae))
        return null;
    }
    return (
      (ae.fillStyle = "#000000"),
      (ae.fillStyle = r),
      ae.fillStyle === "#000000" && r.toLowerCase() !== "black"
        ? null
        : ae.fillStyle
    );
  }
  function to(r, e, t) {
    let n = (1 - Math.abs(2 * t - 1)) * e,
      o = n * (1 - Math.abs(((r / 60) % 2) - 1)),
      i = t - n / 2,
      s,
      a,
      l;
    return (
      r >= 0 && r < 60
        ? ((s = n), (a = o), (l = 0))
        : r >= 60 && r < 120
        ? ((s = o), (a = n), (l = 0))
        : r >= 120 && r < 180
        ? ((s = 0), (a = n), (l = o))
        : r >= 180 && r < 240
        ? ((s = 0), (a = o), (l = n))
        : r >= 240 && r < 300
        ? ((s = o), (a = 0), (l = n))
        : ((s = n), (a = 0), (l = o)),
      {
        red: Math.round((s + i) * 255),
        green: Math.round((a + i) * 255),
        blue: Math.round((l + i) * 255),
      }
    );
  }
  function Ac(r) {
    let e,
      t,
      n,
      o = 1,
      i = r.replace(/\s/g, "").toLowerCase(),
      s = i;
    if (!s.startsWith("#") && !s.startsWith("rgb") && !s.startsWith("hsl")) {
      let a = Mc(i);
      a && (s = a);
    }
    if (s.startsWith("#")) {
      let a = s.substring(1);
      a.length === 3 || a.length === 4
        ? ((e = parseInt(a.charAt(0) + a.charAt(0), 16)),
          (t = parseInt(a.charAt(1) + a.charAt(1), 16)),
          (n = parseInt(a.charAt(2) + a.charAt(2), 16)),
          a.length === 4 && (o = parseInt(a.charAt(3) + a.charAt(3), 16) / 255))
        : (a.length === 6 || a.length === 8) &&
          ((e = parseInt(a.substring(0, 2), 16)),
          (t = parseInt(a.substring(2, 4), 16)),
          (n = parseInt(a.substring(4, 6), 16)),
          a.length === 8 && (o = parseInt(a.substring(6, 8), 16) / 255));
    } else if (s.startsWith("rgba")) {
      let a = s.match(/rgba\(([^)]+)\)/)?.[1]?.split(",");
      (e = parseInt(a?.[0] ?? "", 10)),
        (t = parseInt(a?.[1] ?? "", 10)),
        (n = parseInt(a?.[2] ?? "", 10)),
        (o = parseFloat(a?.[3] ?? ""));
    } else if (s.startsWith("rgb")) {
      let a = s.match(/rgb\(([^)]+)\)/)?.[1]?.split(",");
      (e = parseInt(a?.[0] ?? "", 10)),
        (t = parseInt(a?.[1] ?? "", 10)),
        (n = parseInt(a?.[2] ?? "", 10));
    } else if (s.startsWith("hsla")) {
      let a = s.match(/hsla\(([^)]+)\)/)?.[1]?.split(","),
        l = parseFloat(a?.[0] ?? ""),
        c = parseFloat(a?.[1]?.replace("%", "") ?? "") / 100,
        u = parseFloat(a?.[2]?.replace("%", "") ?? "") / 100;
      (o = parseFloat(a?.[3] ?? "")),
        ({ red: e, green: t, blue: n } = to(l, c, u));
    } else if (s.startsWith("hsl")) {
      let a = s.match(/hsl\(([^)]+)\)/)?.[1]?.split(","),
        l = parseFloat(a?.[0] ?? ""),
        c = parseFloat(a?.[1]?.replace("%", "") ?? "") / 100,
        u = parseFloat(a?.[2]?.replace("%", "") ?? "") / 100;
      ({ red: e, green: t, blue: n } = to(l, c, u));
    }
    if (
      Number.isNaN(e) ||
      Number.isNaN(t) ||
      Number.isNaN(n) ||
      Number.isNaN(o)
    )
      throw new Error(`Invalid color value: '${r}'`);
    return { red: e, green: t, blue: n, alpha: o };
  }
});
var Zn = m((Xn) => {
  "use strict";
  Object.defineProperty(Xn, "__esModule", { value: !0 });
  Object.defineProperty(Xn, "setVmiValue", {
    enumerable: !0,
    get: function () {
      return Rc;
    },
  });
  var Oc = Re(),
    Ic = et(),
    _c = Yn();
  function Rc(r, e, t, n, o, i) {
    let s = r.riveInstance.viewModelInstance;
    if (e === "trigger") {
      if (i) return;
      s?.trigger?.(t)?.fire?.();
      return;
    }
    if (!s) return;
    let a = (0, Ic.getVmiProperty)(s, e, t);
    if (!a) return;
    let l = o?.viewModelProperties[(0, Oc.vmKey)(r.name, t, e)],
      c = i ? l ?? n : n,
      u = `${e}:${t}`;
    switch (e) {
      case "number":
        typeof c == "number" && ((a.value = c), (r.currentValues[u] = c));
        return;
      case "boolean":
        typeof c == "boolean" && ((a.value = c), (r.currentValues[u] = c));
        return;
      case "string":
        typeof c == "string" && ((a.value = c), (r.currentValues[u] = c));
        return;
      case "enum":
        typeof c == "string" && ((a.value = c), (r.currentValues[u] = c));
        return;
      case "color": {
        let d =
          typeof c == "number"
            ? c
            : typeof c == "string"
            ? (0, _c.parseColorToAARRGGBB)(c)
            : null;
        d != null && ((a.value = d), (r.currentValues[u] = d));
        return;
      }
      default:
        return;
    }
  }
});
var ro = m((Qn) => {
  "use strict";
  Object.defineProperty(Qn, "__esModule", { value: !0 });
  function xc(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  xc(Qn, {
    createCleanupFunction: function () {
      return Fc;
    },
    restoreViewModelProperties: function () {
      return no;
    },
  });
  var Pc = Re(),
    kc = Zn(),
    Nc = Gn();
  function no(r, e, t) {
    let n = r.viewModelInstance ?? null;
    if (n)
      for (let [o, i] of Object.entries(t.viewModelProperties)) {
        let s = (0, Pc.parseVmKey)(o);
        if (!s || s.vmName !== e) continue;
        let a = { name: e, riveInstance: r, currentValues: {} };
        if (s.propType === "artboard") {
          if (typeof i != "string") continue;
          let l = n.artboard?.(s.propName),
            c = r.getArtboard?.(i);
          l && c && (l.value = c);
          continue;
        }
        (0, kc.setVmiValue)(a, s.propType, s.propName, i);
      }
  }
  function Fc(r, e, t) {
    return () => {
      !e || !r || (no(r, e.name, t), (0, Nc.clearSurfaceCache)(r, e));
    };
  }
});
var so = m((Kn) => {
  "use strict";
  Object.defineProperty(Kn, "__esModule", { value: !0 });
  function Lc(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Lc(Kn, {
    interpolateAARRGGBB: function () {
      return oo;
    },
    setupAnimateTimeline: function () {
      return Vc;
    },
  });
  var Dc = et(),
    jc = Yn(),
    io = ve();
  function oo(r, e, t) {
    let n = (r >>> 24) & 255,
      o = (r >>> 16) & 255,
      i = (r >>> 8) & 255,
      s = r & 255,
      a = (e >>> 24) & 255,
      l = (e >>> 16) & 255,
      c = (e >>> 8) & 255,
      u = e & 255,
      d = Math.round(n + (a - n) * t),
      f = Math.round(o + (l - o) * t),
      p = Math.round(i + (c - i) * t),
      g = Math.round(s + (u - s) * t);
    return ((d << 24) | (f << 16) | (p << 8) | g) >>> 0;
  }
  function Vc(r, e, t, n, o, i) {
    if (t.length === 0) return;
    let s = e.riveInstance.viewModelInstance;
    if (s)
      for (let a of t) {
        if (
          a.value === null ||
          a.value === void 0 ||
          !(0, Dc.getVmiProperty)(s, a.propertyType, a.propertyName)
        )
          continue;
        let c,
          u = a.value;
        if (typeof u == "string" && u.startsWith("var(")) {
          if (
            (a.propertyType === "number"
              ? (c = (0, io.resolveToNumber)(u, i))
              : a.propertyType === "color" &&
                (c = (0, io.resolveToString)(u, i)),
            c === void 0)
          )
            continue;
        } else c = u;
        a.propertyType === "number"
          ? Bc(e, r, a.propertyName, c, n, o)
          : a.propertyType === "color" && Uc(e, r, a.propertyName, c, n, o);
      }
  }
  function Bc(r, e, t, n, o, i) {
    let s = r.riveInstance.viewModelInstance;
    if (!s) return;
    let a = s.number(t);
    if (!a) return;
    let l = typeof n == "number" ? n : parseFloat(String(n));
    if (isNaN(l)) return;
    let c = { v: a.value };
    e.to(
      c,
      {
        ...o,
        v: l,
        onStart() {
          let u = r.currentValues[`number:${t}`];
          (c.v = typeof u == "number" ? u : a.value), this.invalidate();
        },
        onUpdate: () => {
          a.value = c.v;
        },
      },
      i ?? 0
    );
  }
  function Uc(r, e, t, n, o, i) {
    let s = r.riveInstance.viewModelInstance;
    if (!s) return;
    let a = s.color(t);
    if (!a) return;
    let l = typeof n == "number" ? n : (0, jc.parseColorToAARRGGBB)(String(n));
    if (l == null) return;
    let c = { fromPacked: a.value },
      u = { t: 0 };
    e.fromTo(
      u,
      { t: 0 },
      {
        ...o,
        t: 1,
        onStart() {
          let d = r.currentValues[`color:${t}`];
          (c.fromPacked = typeof d == "number" ? d : a.value),
            this.invalidate();
        },
        onUpdate: () => {
          a.value = oo(c.fromPacked, l, u.t);
        },
      },
      i ?? 0
    );
  }
});
var fo = m((tr) => {
  "use strict";
  Object.defineProperty(tr, "__esModule", { value: !0 });
  function qc(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  qc(tr, {
    resolveSurfaceArea: function () {
      return er;
    },
    setupAnimateAnimation: function () {
      return Yc;
    },
    setupAnimation: function () {
      return Wc;
    },
    setupTimeline: function () {
      return uo;
    },
  });
  var ao = Un(),
    Jn = Gn(),
    lo = et(),
    co = ro(),
    $c = Zn(),
    Gc = so(),
    Hc = Re(),
    tt = ve();
  function er(r, e) {
    if (!e) return null;
    let t = `${e.name}:${e.instanceName ?? ""}`,
      n = Jn.surfaceCache.get(r)?.get(t);
    if (n) return n;
    let i =
      (r.viewModelByName?.(e.name) ?? void 0)?.instanceByName?.(
        e.instanceName ?? ""
      ) ?? null;
    r.bindViewModelInstance?.(i);
    let s = { name: e.name, riveInstance: r, currentValues: {} },
      a = Jn.surfaceCache.get(r);
    return a || ((a = new Map()), Jn.surfaceCache.set(r, a)), a.set(t, s), s;
  }
  function uo(r, e, t, n, o, i) {
    if (t.length === 0) return;
    for (let l of t) {
      if (
        l.propertyType === "trigger" ||
        l.propertyType === "artboard" ||
        l.value === null ||
        l.value === void 0
      )
        continue;
      let c = l.value,
        u;
      typeof c == "string" && c.startsWith("var(")
        ? (u =
            l.propertyType === "number"
              ? (0, tt.resolveToNumber)(c, i)
              : l.propertyType === "color"
              ? (0, tt.resolveToString)(c, i)
              : void 0)
        : (u = c),
        u !== void 0 &&
          (e.currentValues[`${l.propertyType}:${l.propertyName}`] = u);
    }
    let s = (l) => {
        for (let c of t) {
          if (
            (c.propertyType !== "trigger" && c.value === null) ||
            c.value === void 0
          )
            continue;
          let u,
            d = c.value;
          if (typeof d == "string" && d.startsWith("var(")) {
            if (
              (c.propertyType === "number"
                ? (u = (0, tt.resolveToNumber)(d, i))
                : c.propertyType === "color" &&
                  (u = (0, tt.resolveToString)(d, i)),
              u === void 0)
            )
              continue;
          } else u = d;
          zc(e, c.propertyName, c.propertyType, u, n, l);
        }
      },
      a = { int: 0 };
    r.to(
      a,
      {
        int: 1,
        duration: ao.RIVE_CONSTANTS.MINIMUM_TIME,
        onStart: () => {
          s(!1);
        },
        onReverseComplete: () => {
          s(!0);
        },
      },
      o ?? ao.RIVE_CONSTANTS.MINIMUM_TIME
    );
  }
  function zc(r, e, t, n, o, i) {
    if (t === "artboard") {
      if (typeof n != "string") return;
      let s = r.riveInstance.viewModelInstance?.artboard?.(e);
      if (!s) return;
      if (i) {
        let l = (0, Hc.vmKey)(r.name, e, t),
          c = o?.viewModelProperties[l];
        if (typeof c == "string") {
          let u = r.riveInstance.getArtboard?.(c);
          u && (s.value = u);
        }
        return;
      }
      let a = r.riveInstance.getArtboard?.(n);
      if (!a) return;
      s.value = a;
      return;
    }
    (0, $c.setVmiValue)(r, t, e, n, o, i);
  }
  function Wc(r, e, t, n, o) {
    let i = e.animationSource,
      s = er(r, i);
    if (!s) return;
    let a = e.addedProperties ?? {},
      l = Object.values(a),
      c = (0, lo.storeOriginalValues)(l, s);
    return uo(t, s, l, c, n, o), (0, co.createCleanupFunction)(r, i, c);
  }
  function Yc(r, e, t, n, o, i) {
    let s = e.animationSource,
      a = er(r, s);
    if (!a) return;
    let l = e.addedProperties ?? {},
      c = Object.values(l),
      u = (0, lo.storeOriginalValues)(c, a);
    return (
      (0, Gc.setupAnimateTimeline)(t, a, c, n, o, i),
      (0, co.createCleanupFunction)(r, s, u)
    );
  }
});
var vo = m((nr) => {
  "use strict";
  Object.defineProperty(nr, "__esModule", { value: !0 });
  function Xc(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Xc(nr, {
    buildAnimateRiveAction: function () {
      return Kc;
    },
    buildRiveAction: function () {
      return Qc;
    },
  });
  var ho = fo();
  function po(r) {
    return (
      typeof r == "object" &&
      r !== null &&
      "loaded" in r &&
      typeof r.loaded == "boolean"
    );
  }
  function go(r) {
    !r.isPlaying && r.play && r.play();
  }
  function Zc(r, e, t) {
    let o = e.getInstance(r)?.rive,
      i = po(o) ? o : null;
    if (i?.loaded) return go(i), t(i, r);
    let s,
      a = !1,
      l = () => {
        if (a || !r.isConnected) return;
        let u = e.getInstance(r)?.rive,
          d = po(u) ? u : null;
        d?.loaded && (go(d), (s = t(d, r))),
          r.removeEventListener("w-rive-load", l);
      };
    return (
      r.addEventListener("w-rive-load", l),
      () => {
        (a = !0), r.removeEventListener("w-rive-load", l), s?.();
      }
    );
  }
  function mo(r, e, t) {
    let n = [];
    for (let o of r) {
      let i = Zc(o, e, t);
      i && n.push(i);
    }
    if (n.length !== 0)
      return () => {
        for (let o of n) o();
      };
  }
  function yo() {
    return window.Webflow ? window.Webflow.require?.("rive") ?? null : null;
  }
  function Qc(r) {
    r.addAction("rive", {
      createCustomTween: (e, t, n, o, i, s) => {
        let a = n.rive;
        if (!a || !i.length) return;
        let l = yo();
        if (l) return mo(i, l, (c, u) => (0, ho.setupAnimation)(c, a, e, s, u));
      },
    });
  }
  function Kc(r) {
    r.addAction("animate-rive", {
      createCustomTween: (e, t, n, o, i, s) => {
        let a = n.rive;
        if (!a || !i.length) return;
        let l = yo();
        if (l)
          return mo(i, l, (c, u) =>
            (0, ho.setupAnimateAnimation)(c, a, e, o, s, u)
          );
      },
    });
  }
});
var le = m((rr) => {
  "use strict";
  Object.defineProperty(rr, "__esModule", { value: !0 });
  function Jc(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Jc(rr, {
    checkTt: function () {
      return iu;
    },
    hasBBoxUpdate: function () {
      return nu;
    },
    hasIntensity: function () {
      return eu;
    },
    hasMatrixUpdate: function () {
      return ru;
    },
    hasRenderOrder: function () {
      return tu;
    },
  });
  var nt = Y(),
    eu = (r) => "intensity" in r,
    tu = (r) => "renderOrder" in r,
    nu = (r) => "singleBBoxNeedsUpdate" in r && "recursiveBBoxNeedsUpdate" in r,
    ru = (r) => "updateMatrix" in r && "updateMatrixWorld" in r,
    iu = (r, e) =>
      e === "from"
        ? r === nt.TweenType.From || r === nt.TweenType.FromTo
        : r === nt.TweenType.To || r === nt.TweenType.FromTo;
});
var or = m((ir) => {
  "use strict";
  Object.defineProperty(ir, "__esModule", { value: !0 });
  Object.defineProperty(ir, "colorDataToCss", {
    enumerable: !0,
    get: function () {
      return ou;
    },
  });
  var ou = ({ r, g: e, b: t, a: n }) => {
    let o = (c) => Math.round(Math.min(1, Math.max(0, c)) * 255),
      i = o(r),
      s = o(e),
      a = o(t);
    if (n === void 0 || n >= 1) return `rgba(${i}, ${s}, ${a}, 1)`;
    let l = Math.min(1, Math.max(0, n));
    return `rgba(${i}, ${s}, ${a}, ${l})`;
  };
});
var bo = m((sr) => {
  "use strict";
  Object.defineProperty(sr, "__esModule", { value: !0 });
  Object.defineProperty(sr, "storeOriginalState", {
    enumerable: !0,
    get: function () {
      return lu;
    },
  });
  var su = le(),
    au = or(),
    lu = (r, e, t) => {
      let n = r.material,
        o = Array.isArray(n) ? n : n ? [n] : [],
        i = e.spline._scene.entityByUuid[t]?.color,
        s = i ? (0, au.colorDataToCss)(i) : void 0,
        a = r.rotation;
      return {
        position: { ...r.position },
        rotation: { x: a._x ?? 0, y: a._y ?? 0, z: a._z ?? 0 },
        scale: { ...r.scale },
        ...(s ? { color: s } : {}),
        intensity: r.intensity,
        renderOrder: (0, su.hasRenderOrder)(r) ? r.renderOrder : void 0,
        materials: o?.map((l) => ({
          transparent: l.transparent,
          depthWrite: l.depthWrite,
          alpha: l.alpha,
          layers: (l.layers ?? []).map((c) => ({
            visible: c.visible,
            alpha: c.alpha,
            alphaOverride: c.alphaOverride,
            ior: c.ior,
            thickness: c.thickness,
          })),
        })),
      };
    };
});
var xe = m((ar) => {
  "use strict";
  Object.defineProperty(ar, "__esModule", { value: !0 });
  Object.defineProperty(ar, "SPLINE_CONSTANTS", {
    enumerable: !0,
    get: function () {
      return cu;
    },
  });
  var cu = {
    OPACITY_RENDER_ORDER: 999,
    TRANSITION_END_OFFSET: 0.001,
    DEFAULT_TRANSITION_DURATION: 0.5,
    OPACITY_TRANSPARENCY_THRESHOLD: 0.01,
    DEFAULT_TRANSMISSION_IOR: 1.3,
    DEFAULT_TRANSMISSION_THICKNESS: 10,
    MIN_ZOOM_VALUE: 1e-4,
  };
});
var rt = m((lr) => {
  "use strict";
  Object.defineProperty(lr, "__esModule", { value: !0 });
  function uu(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  uu(lr, {
    getAppZoom: function () {
      return fu;
    },
    setAppZoom: function () {
      return pu;
    },
  });
  var du = xe(),
    fu = (r) => {
      let e = r._camera;
      return e._cameraType === "OrthographicCamera"
        ? e.orthoCamera.zoom
        : e.perspCamera.zoom;
    },
    pu = (r, e) => {
      let t = e > 0 ? e : du.SPLINE_CONSTANTS.MIN_ZOOM_VALUE;
      r.setZoom?.(t);
    };
});
var ur = m((cr) => {
  "use strict";
  Object.defineProperty(cr, "__esModule", { value: !0 });
  Object.defineProperty(cr, "createCleanupFunction", {
    enumerable: !0,
    get: function () {
      return hu;
    },
  });
  var gu = rt(),
    it = le(),
    hu = (r, e, t, n, o, i) => () => {
      if (!(!r || !t)) {
        if (
          (i && (r.state = void 0),
          Object.assign(r.position, t.position),
          Object.assign(r.rotation, {
            x: t.rotation.x,
            y: t.rotation.y,
            z: t.rotation.z,
          }),
          Object.assign(r.scale, t.scale),
          t.color && (r.color = t.color),
          n.spline?.intensity &&
            typeof n.spline.intensity == "object" &&
            t.intensity !== void 0 &&
            (0, it.hasIntensity)(r) &&
            (r.intensity = t.intensity),
          n.spline?.zoom && typeof n.spline.zoom == "object")
        ) {
          let s = e.spline;
          typeof s?.setZoom == "function" && (0, gu.setAppZoom)(s, o ?? 1);
        }
        if (t.materials) {
          let s = r.material,
            a = Array.isArray(s) ? s : s ? [s] : [];
          (0, it.hasRenderOrder)(r) && (r.renderOrder = t.renderOrder ?? 0);
          let l = Math.min(a.length, t.materials.length);
          for (let c = 0; c < l; c++) {
            let u = a[c],
              d = t.materials[c];
            if (!u || !d) continue;
            (u.transparent = d.transparent),
              (u.depthWrite = d.depthWrite),
              d.alpha !== void 0 && (u.alpha = d.alpha);
            let f = u.layers ?? [];
            for (let p = 0; p < f.length; p++) {
              let g = f[p],
                h = d.layers[p];
              !g ||
                !h ||
                ((g.visible = h.visible),
                h.alpha !== void 0 && (g.alpha = h.alpha),
                h.alphaOverride !== void 0 &&
                  (g.alphaOverride = h.alphaOverride),
                h.ior !== void 0 && (g.ior = h.ior),
                h.thickness !== void 0 && (g.thickness = h.thickness));
            }
          }
        }
        (0, it.hasMatrixUpdate)(r) &&
          (r.updateMatrix(), r.updateMatrixWorld(!0)),
          (0, it.hasBBoxUpdate)(r) &&
            ((r.singleBBoxNeedsUpdate = !0), (r.recursiveBBoxNeedsUpdate = !0)),
          e.spline.requestRender();
      }
    };
});
var To = m((dr) => {
  "use strict";
  Object.defineProperty(dr, "__esModule", { value: !0 });
  function mu(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  mu(dr, {
    warnNoObjectId: function () {
      return yu;
    },
    warnNoObjectsFound: function () {
      return bu;
    },
    warnObjectNotFound: function () {
      return vu;
    },
  });
  var yu = () => {},
    vu = (r) => {},
    bu = (r) => {};
});
var Eo = m((fr) => {
  "use strict";
  Object.defineProperty(fr, "__esModule", { value: !0 });
  Object.defineProperty(fr, "animateStateTransitions", {
    enumerable: !0,
    get: function () {
      return wu;
    },
  });
  var wo = xe(),
    Tu = ur(),
    So = le(),
    wu = (r, e, t, n, o, i, s, a, l, c) => {
      let u = [];
      r.forEach((f) => {
        if (!f.transition) {
          u.push(null);
          return;
        }
        let p = l.duration ?? wo.SPLINE_CONSTANTS.DEFAULT_TRANSITION_DURATION,
          g = f.transition({
            from:
              e.stateName?.from && (0, So.checkTt)(a, "from")
                ? e.stateName.from
                : void 0,
            to:
              e.stateName?.to && (0, So.checkTt)(a, "to")
                ? e.stateName.to
                : null,
            autoPlay: !1,
            duration: p,
            delay: 0,
          });
        u.push(g);
        let h = { time: 0 };
        s.fromTo(
          h,
          { time: 0 },
          {
            ...l,
            time: p - wo.SPLINE_CONSTANTS.TRANSITION_END_OFFSET,
            onUpdate: () => {
              g.seek(h.time);
            },
          },
          c || 0
        );
      });
      let d = r.map((f, p) =>
        (0, Tu.createCleanupFunction)(f, t, n[p], o, i, u[p])
      );
      return () => d.forEach((f) => f?.());
    };
});
var Mo = m((pr) => {
  "use strict";
  Object.defineProperty(pr, "__esModule", { value: !0 });
  function Su(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Su(pr, {
    animateColor: function () {
      return Au;
    },
    animateIntensity: function () {
      return Cu;
    },
    animateZoom: function () {
      return Mu;
    },
  });
  var Co = rt(),
    Eu = or(),
    ce = le(),
    Cu = (r, e, t, n, o, i) => {
      let s = e.intensity;
      if (!s || typeof s != "object") return;
      let a = r.intensity ?? 0,
        l = s.from && (0, ce.checkTt)(n, "from") ? s.from : a,
        c = s.to && (0, ce.checkTt)(n, "to") ? s.to : a,
        u = { v: l };
      t.fromTo(
        u,
        { v: l },
        {
          ...o,
          v: c,
          onUpdate: () => {
            (0, ce.hasIntensity)(r) && (r.intensity = u.v);
          },
        },
        i || 0
      );
    },
    Mu = (r, e, t, n, o, i) => {
      let s = e.zoom;
      if (!s || typeof s != "object" || typeof r.spline?.setZoom != "function")
        return;
      let a = (0, Co.getAppZoom)(r.spline),
        l = s.from && (0, ce.checkTt)(n, "from") ? s.from : a,
        c = s.to && (0, ce.checkTt)(n, "to") ? s.to : a,
        u = { v: l };
      t.fromTo(
        u,
        { v: l },
        {
          ...o,
          v: c,
          onUpdate: () => {
            (0, Co.setAppZoom)(r.spline, u.v);
          },
        },
        i || 0
      );
    },
    Au = (r, e, t, n, o, i, s, a) => {
      let l = e.color;
      if (!l || typeof l != "object" || (!l.from && !l.to)) return;
      let c = s.spline._scene.entityByUuid[a]?.color,
        u = (0, Eu.colorDataToCss)(c ?? { r: 255, g: 255, b: 255 }),
        d = l.from && (0, ce.checkTt)(n, "from") ? l.from : u,
        f = l.to && (0, ce.checkTt)(n, "to") ? l.to : u,
        p = window.gsap.utils.interpolate(d, f),
        g = { t: 0 };
      t.fromTo(
        g,
        { t: 0 },
        {
          ...o,
          t: 1,
          onUpdate: function () {
            r.color = p(g.t);
          },
        },
        i || 0
      );
    };
});
var Oo = m((gr) => {
  "use strict";
  Object.defineProperty(gr, "__esModule", { value: !0 });
  function Ou(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Ou(gr, {
    createPropertyObject: function () {
      return Ao;
    },
    createTransformTargets: function () {
      return Iu;
    },
  });
  var Ao = (r, e, t) => {
      let n = {},
        o = t[e];
      return (
        ["X", "Y", "Z"].forEach((i) => {
          let s = `${e}${i}`,
            a = r[s],
            l = i.toLowerCase(),
            c = o[l];
          a &&
            typeof a == "object" &&
            (n[l] = { from: a.from ?? c, to: a.to ?? c });
        }),
        { props: n }
      );
    },
    Iu = (r, e) => {
      let t = ["position", "rotation", "scale"],
        n = [];
      return (
        t.forEach((o) => {
          let { props: i } = Ao(e, o, r);
          Object.keys(i).length > 0 && n.push({ object: r[o], props: i });
        }),
        n
      );
    };
});
var Io = m((mr) => {
  "use strict";
  Object.defineProperty(mr, "__esModule", { value: !0 });
  Object.defineProperty(mr, "fadeObject", {
    enumerable: !0,
    get: function () {
      return ku;
    },
  });
  var ot = xe(),
    hr = le(),
    _u = (r, e, t, n, o, i) => {
      n.fromTo(r, { alpha: e }, { ...o, alpha: t }, i);
    },
    Ru = (r, e, t, n, o, i) => {
      let s = r.ior ?? ot.SPLINE_CONSTANTS.DEFAULT_TRANSMISSION_IOR,
        a = r.thickness ?? ot.SPLINE_CONSTANTS.DEFAULT_TRANSMISSION_THICKNESS;
      n.fromTo(
        r,
        { alpha: e, ior: s, thickness: a },
        {
          ...o,
          alpha: 1 - t,
          ior: window.gsap.utils.interpolate(s, 1, 1 - t),
          thickness: window.gsap.utils.interpolate(a, 0, 1 - t),
          onUpdate: () => {
            r.visible =
              r.alpha > ot.SPLINE_CONSTANTS.OPACITY_TRANSPARENCY_THRESHOLD;
          },
        },
        i
      );
    },
    xu = (r, e, t, n, o, i) => {
      r.alphaOverride !== void 0 &&
        n.fromTo(r, { alphaOverride: e }, { ...o, alphaOverride: t }, i);
    },
    Pu = (r, e, t, n, o, i) => {
      if (!r.visible) return;
      let s = r.type;
      s === "color" || s === "depth" || s === "outline"
        ? _u(r, e, t, n, o, i)
        : s === "transmission"
        ? Ru(r, e, t, n, o, i)
        : s === "light" && xu(r, e, t, n, o, i);
    },
    ku = (r, e, t, n, o, i) => {
      if (!r) return;
      let s = r.material,
        a = s?.layers;
      if (a) {
        (s.transparent = !0),
          (0, hr.hasRenderOrder)(r) &&
            (r.renderOrder = ot.SPLINE_CONSTANTS.OPACITY_RENDER_ORDER);
        for (let l of a) {
          let c = l.type === "light" ? l.alphaOverride ?? 1 : l.alpha ?? 1,
            u = e.from !== void 0 && (0, hr.checkTt)(n, "from") ? e.from : c,
            d = e.to !== void 0 && (0, hr.checkTt)(n, "to") ? e.to : c;
          Pu(l, u, d, t, o, i);
        }
      }
    };
});
var Ro = m((br) => {
  "use strict";
  Object.defineProperty(br, "__esModule", { value: !0 });
  Object.defineProperty(br, "setupAnimation", {
    enumerable: !0,
    get: function () {
      return Bu;
    },
  });
  var Nu = bo(),
    Fu = ur(),
    Lu = rt(),
    yr = To(),
    Du = Eo(),
    vr = Mo(),
    ju = Oo(),
    Vu = Io(),
    st = le(),
    _o = xe(),
    Bu = (r, e, t, n, o, i) => {
      t.ease || (t = { ...t, ease: "none" });
      let { force3D: s, ...a } = t;
      if (((t = { ...a }), !r.spline?.findObjectById)) return;
      let l = e.spline,
        c = (e.objectId || "").split(",").filter(Boolean);
      if (c.length === 0) {
        (0, yr.warnNoObjectId)();
        return;
      }
      let u = c.flatMap((h) => {
        let v = r.spline.findObjectById?.(h);
        return v || ((0, yr.warnObjectNotFound)(h), []);
      });
      if (u.length === 0) {
        (0, yr.warnNoObjectsFound)(c);
        return;
      }
      let d = u.map((h) => (0, Nu.storeOriginalState)(h, r, c[0] ?? "")),
        f = (0, Lu.getAppZoom)(r.spline);
      if (
        e.animatingState &&
        l?.stateName &&
        (l.stateName.from || l.stateName.to)
      )
        return (0, Du.animateStateTransitions)(u, l, r, d, e, f, n, o, t, i);
      if (!l) return;
      let p = Object.keys(l);
      if (p.length === 0 || (p.length === 1 && p[0] === "stateName")) return;
      u.forEach((h) => {
        (0, vr.animateIntensity)(h, l, n, o, t, i),
          (0, vr.animateZoom)(r, l, n, o, t, i),
          (0, vr.animateColor)(h, l, n, o, t, i, r, c[0] ?? "");
        let v = l.opacity && typeof l.opacity == "object" ? l.opacity : void 0;
        if (v !== void 0) {
          let E = {
              from: v.from !== void 0 ? v.from / 100 : void 0,
              to: v.to !== void 0 ? v.to / 100 : void 0,
            },
            b =
              t.immediateRender !== !1 &&
              E.from !== void 0 &&
              (0, st.checkTt)(o, "from")
                ? E.from
                : void 0;
          if (((0, Vu.fadeObject)(h, E, n, o, t, i), b !== void 0)) {
            let M = h.material,
              w = Array.isArray(M) ? M : M ? [M] : [];
            for (let T of w)
              (T.transparent = !0),
                (T.depthWrite =
                  b > _o.SPLINE_CONSTANTS.OPACITY_TRANSPARENCY_THRESHOLD);
            (0, st.hasRenderOrder)(h) &&
              (h.renderOrder = _o.SPLINE_CONSTANTS.OPACITY_RENDER_ORDER);
          }
        }
        (0, ju.createTransformTargets)(h, l).forEach(
          ({ object: E, props: b }) => {
            if (Object.keys(b).length === 0) return;
            let M = {},
              w = {};
            Object.keys(b).forEach((T) => {
              let S = b[T];
              S &&
                typeof S == "object" &&
                ((M[T] =
                  (0, st.checkTt)(o, "from") && S.from ? S.from : E[T] ?? 0),
                (w[T] = (0, st.checkTt)(o, "to") && S.to ? S.to : E[T] ?? 0));
            }),
              !(Object.keys(M).length === 0 && Object.keys(w).length === 0) &&
                n.fromTo(E, M, { ...t, ...w }, i || 0);
          }
        );
      });
      let g = u.map((h, v) => (0, Fu.createCleanupFunction)(h, r, d[v], e, f));
      return () => g.forEach((h) => h?.());
    };
});
var ko = m((Tr) => {
  "use strict";
  Object.defineProperty(Tr, "__esModule", { value: !0 });
  Object.defineProperty(Tr, "buildSplineAction", {
    enumerable: !0,
    get: function () {
      return Hu;
    },
  });
  var xo = Ro(),
    at = ve(),
    Uu = new Set(["color", "stateName"]),
    qu = new Set(["rotationX", "rotationY", "rotationZ"]),
    Po = Math.PI / 180;
  function $u(r, e) {
    if (!r.spline) return r;
    let t = r.spline,
      n = {},
      o = !1;
    for (let [i, s] of Object.entries(t)) {
      if (!s || typeof s != "object") {
        n[i] = s;
        continue;
      }
      let a = s;
      if (Uu.has(i)) {
        let l = a.from !== void 0 ? (0, at.resolveToString)(a.from, e) : void 0,
          c = a.to !== void 0 ? (0, at.resolveToString)(a.to, e) : void 0;
        (l !== a.from || c !== a.to) && (o = !0), (n[i] = { from: l, to: c });
      } else {
        let l = a.from !== void 0 ? (0, at.resolveToNumber)(a.from, e) : void 0,
          c = a.to !== void 0 ? (0, at.resolveToNumber)(a.to, e) : void 0,
          u = l !== a.from,
          d = c !== a.to;
        (u || d) && (o = !0),
          qu.has(i)
            ? (n[i] = {
                from: l !== void 0 && u ? l * Po : l,
                to: c !== void 0 && d ? c * Po : c,
              })
            : (n[i] = { from: l, to: c });
      }
    }
    return o ? { ...r, spline: n } : r;
  }
  function Gu(r, e, t, n, o, i, s) {
    let a = e.getInstance(r);
    if (a) return (0, xo.setupAnimation)(a, t, n, o, i, s);
    let l,
      c = () => {
        let u = e.getInstance(r);
        u && (l = (0, xo.setupAnimation)(u, t, n, o, i, s)),
          r.removeEventListener("w-spline-load", c);
      };
    return (
      r.addEventListener("w-spline-load", c),
      () => {
        r.removeEventListener("w-spline-load", c), l?.();
      }
    );
  }
  function Hu(r) {
    r.addAction("spline", {
      createCustomTween: (e, t, n, o, i, s) => {
        let a = t.tt ?? 0;
        if (!i.length || !window.Webflow || !n.objectId) return;
        let l = window.Webflow.require?.("spline");
        if (!l) return;
        let c = [];
        for (let u of i) {
          let d = $u(n, u),
            f = Gu(u, l, d, o, e, a, s);
          f && c.push(f);
        }
        if (c.length !== 0)
          return () => {
            for (let u of c) u?.();
          };
      },
    });
  }
});
var Vo = m((Sr) => {
  "use strict";
  Object.defineProperty(Sr, "__esModule", { value: !0 });
  Object.defineProperty(Sr, "buildVariableAction", {
    enumerable: !0,
    get: function () {
      return zu;
    },
  });
  var wr = Y();
  function zu(r) {
    r.addAction("variable", {
      createCustomTween: (e, t, n, o, i, s) => {
        let a = n.variable;
        if (!a) return;
        let l = Object.keys(a),
          c = l.length;
        if (c === 0) return;
        let u = (t.targets?.length ?? 0) > 0;
        if (u && i.length === 0) return;
        let d = u ? Array.from(new Set(i)) : Wu(l),
          f = d.length,
          p = new Array(f),
          g = new Array(f);
        for (let w = 0; w < f; w++) {
          let T = d[w].style;
          p[w] = T;
          let S = new Array(c);
          for (let _ = 0; _ < c; _++) {
            let A = l[_];
            (S[_] = T.getPropertyValue(A)), T.removeProperty(A);
          }
          g[w] = S;
        }
        let h = t.tt ?? wr.TweenType.To,
          v = s || 0,
          { force3D: y, ...E } = o,
          b = l.some((w) => a[w].startsWith("var(")),
          M = (w) => {
            let T = {};
            for (let S = 0; S < c; S++) {
              let _ = l[S],
                A = a[_];
              T[_] =
                (w &&
                  A.startsWith("var(") &&
                  w.getPropertyValue(A.slice(4, -1)).trim()) ||
                A;
            }
            return T;
          };
        if (u)
          for (let w = 0; w < f; w++) {
            let T = d[w],
              S = M(b ? getComputedStyle(T) : null);
            No(e, h, T, { ...S, ...E }, v);
          }
        else {
          let T = {
            ...M(b ? getComputedStyle(document.documentElement) : null),
            ...E,
          };
          for (let S = 0; S < f; S++) No(e, h, d[S], T, v);
        }
        return () => {
          for (let w = 0; w < f; w++) {
            let T = p[w],
              S = g[w];
            for (let _ = 0; _ < c; _++) {
              let A = S[_];
              A ? T.setProperty(l[_], A) : T.removeProperty(l[_]);
            }
          }
        };
      },
    });
  }
  function Wu(r) {
    let e = [document.documentElement];
    if (r.length === 0) return e;
    let t = Yu(r) ?? Xu(r);
    for (let n = 0; n < t.length; n++) e.push(t[n]);
    return e;
  }
  function No(r, e, t, n, o) {
    e === wr.TweenType.From
      ? r.from(t, n, o)
      : e === wr.TweenType.Set
      ? r.set(t, n, o)
      : r.to(t, n, o);
  }
  function Yu(r) {
    let e = new Set([document.documentElement]),
      t = [],
      n = new Map();
    try {
      let o = document.styleSheets;
      for (let i = 0; i < o.length; i++) Lo(o[i].cssRules, r, t, e, n);
      return t;
    } catch {
      return null;
    }
  }
  function Lo(r, e, t, n, o) {
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      if (s instanceof CSSMediaRule) {
        let l = s.conditionText,
          c = o.get(l);
        c === void 0 && ((c = matchMedia(l).matches), o.set(l, c)),
          c && Lo(s.cssRules, e, t, n, o);
        continue;
      }
      if (!(s instanceof CSSStyleRule)) continue;
      let a = s.style;
      for (let l = 0; l < e.length; l++)
        if (a.getPropertyValue(e[l])) {
          try {
            let c = document.querySelectorAll(s.selectorText);
            for (let u = 0; u < c.length; u++) {
              let d = c[u];
              n.has(d) || (n.add(d), t.push(d));
            }
          } catch {}
          break;
        }
    }
  }
  var Do = "__ix3__";
  function Xu(r) {
    let e = document.documentElement,
      t = document.body,
      n = [],
      o = r.length,
      i = [],
      s = [];
    jo(e, r, o, i, s), Fo(t, r, o, n, i, s);
    let a = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT),
      l;
    for (; (l = a.nextNode()); ) Fo(l, r, o, n, i, s);
    for (let c = 0; c < i.length; c++) {
      let u = i[c].style,
        d = s[c];
      for (let f = 0; f < o; f++) {
        let p = d[f];
        p ? u.setProperty(r[f], p) : u.removeProperty(r[f]);
      }
    }
    return n;
  }
  function jo(r, e, t, n, o) {
    let i = r.style,
      s = new Array(t);
    for (let a = 0; a < t; a++) {
      let l = e[a];
      (s[a] = i.getPropertyValue(l)), i.setProperty(l, Do);
    }
    n.push(r), o.push(s);
  }
  function Fo(r, e, t, n, o, i) {
    let s = getComputedStyle(r);
    for (let a = 0; a < t; a++)
      if (s.getPropertyValue(e[a]) !== Do) {
        n.push(r), jo(r, e, t, o, i);
        return;
      }
  }
});
var Bo = m((Er) => {
  "use strict";
  Object.defineProperty(Er, "__esModule", { value: !0 });
  function Zu(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  Zu(Er, {
    getFirst: function () {
      return Qu;
    },
    getSecond: function () {
      return Ku;
    },
    pair: function () {
      return Ju;
    },
  });
  var Qu = (r) => r[0],
    Ku = (r) => r[1],
    Ju = (r, e) => [r, e];
});
var Mr = m((Cr) => {
  "use strict";
  Object.defineProperty(Cr, "__esModule", { value: !0 });
  function ed(r, e) {
    for (var t in e) Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
  }
  ed(Cr, {
    elementTargetSelector: function () {
      return sd;
    },
    safeClosest: function () {
      return id;
    },
    safeGetElementById: function () {
      return td;
    },
    safeMatches: function () {
      return od;
    },
    safeQuerySelector: function () {
      return rd;
    },
    safeQuerySelectorAll: function () {
      return nd;
    },
  });
  var lt = ze(),
    td = (r) => {
      try {
        let e = document.getElementById(r);
        return e && !(0, lt.isTransientIX3Clone)(e) ? e : null;
      } catch {
        return null;
      }
    },
    nd = (r, e) => {
      try {
        let t = e.querySelectorAll(r);
        if (t.length === 0) return [];
        let n = [];
        for (let o of t) (0, lt.isTransientIX3Clone)(o) || n.push(o);
        return n;
      } catch {
        return null;
      }
    },
    rd = (r, e) => {
      try {
        let t = e.querySelector(r);
        if (!t) return null;
        if (!(0, lt.isTransientIX3Clone)(t)) return t;
        let n = e.querySelectorAll(r);
        for (let o of n) if (!(0, lt.isTransientIX3Clone)(o)) return o;
        return null;
      } catch {
        return null;
      }
    },
    id = (r, e) => {
      try {
        return r.closest(e);
      } catch {
        return null;
      }
    },
    od = (r, e) => {
      try {
        return r.matches(e);
      } catch {
        return null;
      }
    },
    sd = (r) => `[data-wf-target*="${CSS.escape(`[${JSON.stringify(r)}`)}"]`;
});
var Uo = m((Ar) => {
  "use strict";
  Object.defineProperty(Ar, "__esModule", { value: !0 });
  Object.defineProperty(Ar, "applyScope", {
    enumerable: !0,
    get: function () {
      return ld;
    },
  });
  var K = Q(),
    ct = Mr(),
    ad = ze(),
    X = (r) => r.filter((e) => !(0, ad.isTransientIX3Clone)(e)),
    ld = (r, e) => {
      let t = X(r);
      if (!e) return t;
      if (Array.isArray(e)) {
        let [n, o] = e,
          i = [];
        switch (n) {
          case K.TargetScope.FIRST_ANCESTOR:
            for (let s of t) {
              let a = o ? (0, ct.safeClosest)(s, o) : null;
              a && i.push(a);
            }
            return X(i);
          case K.TargetScope.FIRST_DESCENDANT:
            for (let s of t) {
              let a = o ? (0, ct.safeQuerySelector)(o, s) : s.firstElementChild;
              a && i.push(a);
            }
            return X(i);
          case K.TargetScope.DESCENDANTS:
            for (let s of t)
              i.push(...((0, ct.safeQuerySelectorAll)(o, s) || []));
            return X(i);
          case K.TargetScope.ANCESTORS:
            for (let s of t) {
              let a = s.parentElement;
              for (; a; )
                (!o || (0, ct.safeMatches)(a, o)) && i.push(a),
                  (a = a.parentElement);
            }
            return X(i);
        }
      }
      switch (e) {
        case K.TargetScope.CHILDREN:
          return X(t.flatMap((n) => [...n.children]));
        case K.TargetScope.PARENT:
          return X(t.map((n) => n.parentElement).filter(Boolean));
        case K.TargetScope.SIBLINGS:
          return X(
            t.flatMap((n) =>
              n.parentElement
                ? [...n.parentElement.children].filter((o) => o !== n)
                : []
            )
          );
        case K.TargetScope.NEXT:
          return X(t.flatMap((n) => n.nextElementSibling || []));
        case K.TargetScope.PREVIOUS:
          return X(t.flatMap((n) => n.previousElementSibling || []));
        default:
          return t;
      }
    };
});
var qo = m((Or) => {
  "use strict";
  Object.defineProperty(Or, "__esModule", { value: !0 });
  Object.defineProperty(Or, "build", {
    enumerable: !0,
    get: function () {
      return cd;
    },
  });
  var be = Bo(),
    Te = Mr(),
    re = Uo();
  function cd(r) {
    let e = [];
    r.addTargetResolver("id", {
      resolve: ([, t]) => {
        let [n, o] = Array.isArray(t) ? t : [t],
          i = n ? (0, Te.safeGetElementById)(n) : null;
        return i ? (0, re.applyScope)([i], o) : e;
      },
    })
      .addTargetResolver("trigger-only", {
        resolve: ([, t], { triggerElement: n }) =>
          n ? (0, re.applyScope)([n], Array.isArray(t) ? t[1] : void 0) : e,
        isDynamic: !0,
      })
      .addTargetResolver("trigger-only-parent", {
        resolve: ([, t], { triggerElement: n }) => {
          if (!n) return e;
          let o = n.parentElement;
          return o instanceof HTMLElement
            ? (0, re.applyScope)([o], Array.isArray(t) ? t[1] : void 0)
            : e;
        },
        isDynamic: !0,
      })
      .addTargetResolver("inst", {
        resolve: ([, t], { triggerElement: n }) => {
          if (!Array.isArray(t)) return e;
          let [o, i] = t,
            s = Array.isArray(o),
            a = s ? (0, be.pair)(o[0], o[1]) : (0, be.pair)(o, i),
            l = (0, Te.safeQuerySelectorAll)(
              (0, Te.elementTargetSelector)(a),
              document
            );
          if (!l?.length) return e;
          let c = [...l];
          if (!n) return (0, re.applyScope)(c, s ? i : void 0);
          let u = n.dataset.wfTarget;
          if (!u) return c;
          try {
            let d = JSON.parse(u),
              f = (0, be.getFirst)(a),
              p = d.find((g) => (0, be.getFirst)((0, be.getFirst)(g)) === f);
            return p
              ? (0, re.applyScope)(
                  c.filter((g) =>
                    (g.dataset.wfTarget || "").includes(
                      `${JSON.stringify((0, be.getSecond)(p))}]`
                    )
                  ),
                  s ? i : void 0
                )
              : e;
          } catch {
            return e;
          }
        },
        isDynamic: !0,
      })
      .addTargetResolver("class", {
        resolve: ([, t]) => {
          let [n, o] = Array.isArray(t) ? t : [t],
            i = n ? (0, Te.safeQuerySelectorAll)(`.${n}`, document) : null;
          return i ? (0, re.applyScope)([...i], o) : e;
        },
      })
      .addTargetResolver("selector", {
        resolve: ([, t]) => {
          let [n, o] = Array.isArray(t) ? t : [t],
            i = n ? (0, Te.safeQuerySelectorAll)(n, document) : null;
          return i ? (0, re.applyScope)([...i], o) : e;
        },
      })
      .addTargetResolver("body", { resolve: () => [document.body] })
      .addTargetResolver("attribute", {
        resolve: ([, t]) => {
          let [n, o] = Array.isArray(t) ? t : [t],
            i = n ? (0, Te.safeQuerySelectorAll)(n, document) : null;
          return i ? (0, re.applyScope)([...i], o) : e;
        },
      })
      .addTargetResolver("any-element", { resolve: () => e })
      .addTargetResolver("viewport", {
        resolve: () => [document.documentElement],
      });
  }
});
var Go = m((Ir) => {
  "use strict";
  Object.defineProperty(Ir, "__esModule", { value: !0 });
  Object.defineProperty(Ir, "plugin", {
    enumerable: !0,
    get: function () {
      return vd;
    },
  });
  var ud = Bi(),
    dd = Zi(),
    fd = Ji(),
    $o = vo(),
    pd = ko(),
    gd = Vo(),
    hd = qo(),
    md = Y(),
    yd = Q(),
    J = new md.RuntimeBuilder(yd.CORE_PLUGIN_INFO);
  (0, ud.build)(J);
  (0, dd.build)(J);
  (0, fd.buildLottieAction)(J);
  (0, $o.buildRiveAction)(J);
  (0, $o.buildAnimateRiveAction)(J);
  (0, pd.buildSplineAction)(J);
  (0, gd.buildVariableAction)(J);
  (0, hd.build)(J);
  var vd = J.buildRuntime();
});
var Ho = m((_r) => {
  "use strict";
  Object.defineProperty(_r, "__esModule", { value: !0 });
  Object.defineProperty(_r, "plugin", {
    enumerable: !0,
    get: function () {
      return bd.plugin;
    },
  });
  var bd = Go();
});
var zo = Nr(ui()),
  Wo = Nr(Ho());
async function Td() {
  try {
    let r = await zo.IX3.init({ doc: document, win: window });
    return (
      await r.registerPlugin(Wo.plugin),
      { register: (e, t) => r.register(e, t), destroy: () => r.destroy() }
    );
  } catch (r) {
    throw (console.error("[Devlink IX3] Engine initialization failed:", r), r);
  }
}
var $f = { createIX3Engine: Td };
export { Td as createIX3Engine, $f as default };
