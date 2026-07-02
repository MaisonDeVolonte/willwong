/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

var _o = Object.create;
var at = Object.defineProperty;
var Io = Object.getOwnPropertyDescriptor;
var Ro = Object.getOwnPropertyNames;
var Po = Object.getPrototypeOf,
  xo = Object.prototype.hasOwnProperty;
var ko = (n, e, t) =>
  e in n
    ? at(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (n[e] = t);
var m = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports);
var No = (n, e, t, r) => {
  if ((e && typeof e == "object") || typeof e == "function")
    for (let o of Ro(e))
      !xo.call(n, o) &&
        o !== t &&
        at(n, o, {
          get: () => e[o],
          enumerable: !(r = Io(e, o)) || r.enumerable,
        });
  return n;
};
var ar = (n, e, t) => (
  (t = n != null ? _o(Po(n)) : {}),
  No(
    e || !n || !n.__esModule
      ? at(t, "default", { value: n, enumerable: !0 })
      : t,
    n
  )
);
var pe = (n, e, t) => (ko(n, typeof e != "symbol" ? e + "" : e, t), t);
var cr = m((pt) => {
  "use strict";
  Object.defineProperty(pt, "__esModule", { value: !0 });
  function Fo(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Fo(pt, {
    CORE_OPERATORS: function () {
      return ut;
    },
    DEFAULTS: function () {
      return dt;
    },
    DEFAULT_CUSTOM_EASE: function () {
      return Vo;
    },
    EASE_DEFAULTS: function () {
      return lr;
    },
    PERCENT_CANVAS_DURATION_S: function () {
      return jo;
    },
    RELATIONSHIP_TYPES: function () {
      return ft;
    },
    STANDARD_TRIGGER_ALLOWED_CONTROLS: function () {
      return Uo;
    },
    TimelineControlType: function () {
      return lt;
    },
    TweenType: function () {
      return ct;
    },
    isValidControlType: function () {
      return Lo;
    },
    tweenTypeFromName: function () {
      return Do;
    },
    tweenTypeToName: function () {
      return Bo;
    },
  });
  var lt;
  (function (n) {
    (n.STANDARD = "standard"),
      (n.SCROLL = "scroll"),
      (n.LOAD = "load"),
      (n.CONTINUOUS = "continuous");
  })(lt || (lt = {}));
  function Lo(n) {
    return (
      n === "standard" || n === "scroll" || n === "load" || n === "continuous"
    );
  }
  var ct;
  (function (n) {
    (n[(n.To = 0)] = "To"),
      (n[(n.From = 1)] = "From"),
      (n[(n.FromTo = 2)] = "FromTo"),
      (n[(n.Set = 3)] = "Set");
  })(ct || (ct = {}));
  function Do(n) {
    switch (n) {
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
  function Bo(n) {
    switch (n) {
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
  var ut;
  (function (n) {
    (n.AND = "wf:and"), (n.OR = "wf:or");
  })(ut || (ut = {}));
  var dt;
  (function (n) {
    n[(n.DURATION = 0.5)] = "DURATION";
  })(dt || (dt = {}));
  var jo = 1,
    ft;
  (function (n) {
    (n.NONE = "none"),
      (n.WITHIN = "within"),
      (n.DIRECT_CHILD_OF = "direct-child-of"),
      (n.CONTAINS = "contains"),
      (n.DIRECT_PARENT_OF = "direct-parent-of"),
      (n.NEXT_TO = "next-to"),
      (n.NEXT_SIBLING_OF = "next-sibling-of"),
      (n.PREV_SIBLING_OF = "prev-sibling-of");
  })(ft || (ft = {}));
  var lr = {
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
    Vo = lr.back,
    Uo = [
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
var ur = m((gt) => {
  "use strict";
  Object.defineProperty(gt, "__esModule", { value: !0 });
  Object.defineProperty(gt, "RuntimeBuilder", {
    enumerable: !0,
    get: function () {
      return qo;
    },
  });
  var qo = class {
    baseInfo;
    extensions = [];
    lifecycle = {};
    constructor(e) {
      this.baseInfo = e;
    }
    addTrigger(e, t) {
      let r = `${this.baseInfo.namespace}:${e}`;
      return (
        this.extensions.push({
          extensionPoint: "trigger",
          id: r,
          triggerType: r,
          implementation: t,
        }),
        this
      );
    }
    addAction(e, t) {
      let r = `${this.baseInfo.namespace}:${e}`;
      return (
        this.extensions.push({
          extensionPoint: "action",
          id: r,
          actionType: r,
          implementation: t,
        }),
        this
      );
    }
    addTargetResolver(e, t) {
      let r = `${this.baseInfo.namespace}:${e}`;
      return (
        this.extensions.push({
          extensionPoint: "targetResolver",
          id: r,
          resolverType: r,
          implementation: t,
        }),
        this
      );
    }
    addCondition(e, t) {
      let r = `${this.baseInfo.namespace}:${e}`;
      return (
        this.extensions.push({
          extensionPoint: "condition",
          id: r,
          conditionType: r,
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
var gr = m((ht) => {
  "use strict";
  Object.defineProperty(ht, "__esModule", { value: !0 });
  function $o(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  $o(ht, {
    ConditionCategoryBuilder: function () {
      return pr;
    },
    DesignBuilder: function () {
      return zo;
    },
    TargetCategoryBuilder: function () {
      return dr;
    },
    TriggerCategoryBuilder: function () {
      return fr;
    },
  });
  var Ho = class {
      categoryBuilder;
      groupConfig;
      properties;
      constructor(e, t) {
        (this.categoryBuilder = e),
          (this.groupConfig = t),
          (this.properties = []);
      }
      addProperty(e, t, r) {
        return (
          this.properties.push({
            id: e,
            schema: { ...t, description: r?.description || t.description },
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
    Go = class {
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
          (this.currentGroupBuilder = new Ho(this, e)),
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
    dr = class {
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
    fr = class {
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
    pr = class {
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
    zo = class {
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
        let r = new Go(e, t);
        return this.categories.set(e, r), r;
      }
      addTargetCategory(e, t) {
        let r = new dr(e, t);
        return this.targetCategories.set(e, r), r;
      }
      addTriggerCategory(e, t) {
        let r = new fr(e, t);
        return this.triggerCategories.set(e, r), r;
      }
      addConditionCategory(e, t) {
        let r = new pr(e, t);
        return this.conditionCategories.set(e, r), r;
      }
      addActionPreset(e, t) {
        let r = `${this.baseInfo.namespace}:${e}`;
        return (
          this.actionPresets.set(r, {
            id: r,
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
        let r = [];
        for (let [, s] of this.triggerCategories) r.push(s.getDefinition());
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
          triggerCategories: r.length > 0 ? r : void 0,
          conditionCategories: o.length > 0 ? o : void 0,
          actionPresets: i.length > 0 ? i : void 0,
          reducerHooks:
            this.reducerHooks.length > 0 ? [...this.reducerHooks] : void 0,
        };
      }
    };
});
var hr = m((mt) => {
  "use strict";
  Object.defineProperty(mt, "__esModule", { value: !0 });
  Object.defineProperty(mt, "TransformBuilder", {
    enumerable: !0,
    get: function () {
      return Wo;
    },
  });
  var Wo = class {
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
var yr = m((mr) => {
  "use strict";
  Object.defineProperty(mr, "__esModule", { value: !0 });
});
var Z = m((oe) => {
  "use strict";
  Object.defineProperty(oe, "__esModule", { value: !0 });
  function Yo(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Yo(oe, {
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
  var U = cr();
  Ne(ur(), oe);
  Ne(gr(), oe);
  Ne(hr(), oe);
  Ne(yr(), oe);
  function Ne(n, e) {
    return (
      Object.keys(n).forEach(function (t) {
        t !== "default" &&
          !Object.prototype.hasOwnProperty.call(e, t) &&
          Object.defineProperty(e, t, {
            enumerable: !0,
            get: function () {
              return n[t];
            },
          });
      }),
      n
    );
  }
});
var ge = m((yt) => {
  "use strict";
  Object.defineProperty(yt, "__esModule", { value: !0 });
  function Xo(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Xo(yt, {
    EASING_NAMES: function () {
      return rs;
    },
    buildCustomEaseId: function () {
      return ns;
    },
    buildEaseContextId: function () {
      return ts;
    },
    debounce: function () {
      return Jo;
    },
    defaultSplitClass: function () {
      return Ko;
    },
    isValidControlType: function () {
      return Zo;
    },
    throttle: function () {
      return es;
    },
    toSeconds: function () {
      return Qo;
    },
  });
  var Fe = Z();
  function Zo(n) {
    return (
      n === Fe.TimelineControlType.STANDARD ||
      n === Fe.TimelineControlType.SCROLL ||
      n === Fe.TimelineControlType.LOAD ||
      n === Fe.TimelineControlType.CONTINUOUS
    );
  }
  function Qo(n) {
    return typeof n == "string" ? parseFloat(n) / 1e3 : n;
  }
  function Ko(n) {
    return `gsap_split_${n}++`;
  }
  var Jo = (
      n,
      e = 0,
      { leading: t = !1, trailing: r = !0, maxWait: o } = {}
    ) => {
      let i,
        s = 0,
        a,
        l,
        c = () => {
          (s = 0), (i = void 0), r && n.apply(a, l);
        };
      function u(...d) {
        (a = this), (l = d), s || ((s = performance.now()), t && n.apply(a, l));
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
    es = (n, e = 0, { leading: t = !0, trailing: r = !0, maxWait: o } = {}) => {
      let i = 0,
        s,
        a,
        l,
        c = (d) => {
          (i = d), (s = void 0), n.apply(a, l);
        };
      function u(...d) {
        let f = performance.now();
        !i && !t && (i = f);
        let g = e - (f - i);
        (a = this),
          (l = d),
          g <= 0 || (o && f - i >= o)
            ? (s && (clearTimeout(s), (s = void 0)), c(f))
            : r && !s && (s = setTimeout(() => c(performance.now()), g));
      }
      return (
        (u.cancel = () => {
          clearTimeout(s), (s = void 0), (i = 0);
        }),
        u
      );
    };
  function ts(n, e) {
    return `${n}-${e}`;
  }
  function ns(n, e) {
    return e ? `${n}-${e}` : n;
  }
  var rs = [
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
var vr = m((vt) => {
  "use strict";
  Object.defineProperty(vt, "__esModule", { value: !0 });
  Object.defineProperty(vt, "EventManager", {
    enumerable: !0,
    get: function () {
      return is;
    },
  });
  var Se = ge(),
    Q,
    is =
      ((Q = class {
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
          return Q.instance || (Q.instance = new Q()), Q.instance;
        }
        addEventListener(e, t, r, o) {
          try {
            let i = o?.kind === "custom",
              s = {
                ...(i ? { delegate: !1, passive: !0, batch: !1 } : ss[t] || {}),
                ...o,
                errorHandler: o?.errorHandler || this.defaultErrorHandler,
              };
            if (!i && t === "load" && "complete" in e && e.complete)
              return (
                setTimeout(() => {
                  try {
                    r(new Event("load"), e);
                  } catch (u) {
                    s.errorHandler?.(u, new Event("load"));
                  }
                }, 0),
                () => {}
              );
            if (!e || !e.addEventListener)
              throw new Error("Invalid element provided to addEventListener");
            let a = this.createWrappedHandler(r, s, e),
              l = this.registerHandler(e, t, r, a.handler, s, i, a.cleanup);
            if (i)
              return () => {
                this.removeHandler(e, t, r, !0), l.cleanup?.();
              };
            let c = new AbortController();
            return (
              this.ensureDelegatedHandler(t),
              s.delegate ||
                (os(s) || e).addEventListener(t, l.wrappedHandler, {
                  passive: s.passive,
                  signal: c.signal,
                }),
              () => {
                c.abort(), this.removeHandler(e, t, r, !1);
              }
            );
          } catch (i) {
            return o?.errorHandler?.(i, new Event(t)), () => {};
          }
        }
        emit(e, t, r, o) {
          try {
            let i = this.customEventTypes.get(e);
            if (!i?.size) return;
            let s = new CustomEvent(e, {
              detail: t,
              bubbles: o?.bubbles ?? !0,
              cancelable: !0,
            });
            for (let a of i)
              if (!r || r === a.element || a.element.contains(r))
                try {
                  a.wrappedHandler(s);
                } catch (l) {
                  console.error(`[EventManager] Error emitting ${e}:`, l);
                }
          } catch (i) {
            console.error(
              `[EventManager] Error emitting custom event ${e}:`,
              i
            );
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
          for (let [, e] of this.customEventTypes)
            for (let t of e) t.cleanup?.();
          this.delegatedHandlers.clear(),
            (this.elementHandlers = new WeakMap()),
            this.eventTypeHandlers.clear(),
            this.customEventTypes.clear();
        }
        createWrappedHandler(e, t, r) {
          let o = (i) => {
            try {
              let s =
                t.target === "window"
                  ? window
                  : t.target === "document"
                  ? document
                  : r;
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
                    target: r,
                    timestamp: s.timeStamp || performance.now(),
                  }),
                this.batchFrameId == null &&
                  (this.batchFrameId = requestAnimationFrame(() =>
                    this.processBatchedEvents()
                  ));
            };
            if (t.throttleMs && t.throttleMs > 0) {
              let s = (0, Se.throttle)(o, t.throttleMs);
              return { handler: i, cleanup: s.cancel };
            }
            if (t.debounceMs && t.debounceMs > 0) {
              let s = (0, Se.debounce)(o, t.debounceMs);
              return { handler: i, cleanup: s.cancel };
            }
            return { handler: i };
          }
          if (t.throttleMs && t.throttleMs > 0) {
            let i = (0, Se.throttle)(o, t.throttleMs);
            if (t.debounceMs && t.debounceMs > 0) {
              let s = (0, Se.debounce)(i, t.debounceMs);
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
            let i = (0, Se.debounce)(o, t.debounceMs);
            return { handler: i, cleanup: i.cancel };
          }
          return { handler: o };
        }
        processBatchedEvents() {
          if (this.batchFrameId === null) return;
          this.batchFrameId = null;
          let e = performance.now();
          for (let [t, r] of this.batchedEvents) {
            let o = this.eventTypeHandlers.get(t);
            if (!o?.size) continue;
            let i = r.filter((a) => e - a.timestamp < this.defaultMaxBatchAge);
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
            r = (i) => {
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
          document.addEventListener(e, r, {
            passive: !1,
            capture: o,
            signal: t.signal,
          }),
            this.delegatedHandlers.set(e, { handler: r, controller: t });
        }
        registerHandler(e, t, r, o, i, s, a) {
          let l = {
            element: e,
            originalHandler: r,
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
        removeHandler(e, t, r, o) {
          if (o) {
            let i = this.customEventTypes.get(t);
            if (!i?.size) return;
            for (let s of i)
              if (s.element === e && s.originalHandler === r) {
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
              if (l.originalHandler === r) {
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
      }),
      pe(Q, "instance"),
      Q);
  function os(n) {
    return n.target === "window"
      ? window
      : n.target === "document"
      ? document
      : null;
  }
  var ss = {
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
var Tt = m((bt) => {
  "use strict";
  Object.defineProperty(bt, "__esModule", { value: !0 });
  function as(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  as(bt, {
    convertEaseConfigToGSAP: function () {
      return Tr;
    },
    convertEaseConfigToLinear: function () {
      return cs;
    },
    isAdvancedEase: function () {
      return us;
    },
    isBasicEase: function () {
      return ds;
    },
  });
  var Ce = ge();
  function br() {
    return {
      gsap: window.gsap,
      CustomEase: window.CustomEase,
      CustomWiggle: window.CustomWiggle,
      CustomBounce: window.CustomBounce,
    };
  }
  function Tr(n, e = br(), t) {
    return n == null
      ? "none"
      : typeof n == "number"
      ? Ce.EASING_NAMES[n] || "none"
      : ls(n, e, t);
  }
  function ls(n, e, t) {
    switch (n.type) {
      case "back":
        return `back.${n.curve}(${n.power})`;
      case "elastic":
        return `elastic.${n.curve}(${n.amplitude}, ${n.period})`;
      case "steps":
        return `steps(${n.stepCount})`;
      case "rough": {
        let {
          templateCurve: r,
          points: o,
          strength: i,
          taper: s,
          randomizePoints: a,
          clampPoints: l,
        } = n;
        return `rough({ template: ${r}, strength: ${i}, points: ${o}, taper: ${s}, randomize: ${a}, clamp: ${l} })`;
      }
      case "slowMo":
        return `slow(${n.linearRatio}, ${n.power}, ${n.yoyoMode})`;
      case "expoScale":
        return `expoScale(${n.startingScale}, ${n.endingScale}, ${n.templateCurve})`;
      case "customWiggle": {
        let { CustomWiggle: r } = e;
        return r
          ? r.create((0, Ce.buildCustomEaseId)("customIX3Wiggle", t), {
              wiggles: n.wiggles,
              type: n.wiggleType,
            })
          : null;
      }
      case "customBounce": {
        let { CustomBounce: r } = e;
        return r
          ? r.create((0, Ce.buildCustomEaseId)("customIX3Bounce", t), {
              strength: n.strength,
              endAtStart: n.endAtStart,
              squash: n.squash,
              squashID: (0, Ce.buildCustomEaseId)("customIX3Squash", t),
            })
          : null;
      }
      case "customEase": {
        let { CustomEase: r } = e;
        return r
          ? r.create(
              (0, Ce.buildCustomEaseId)("customIX3Ease", t),
              n.bezierCurve
            )
          : null;
      }
      default:
        return "none";
    }
  }
  function cs(n, e = br(), t = 20) {
    if (n == null) return "linear";
    let r = Tr(n, e);
    if (r === null) return "linear";
    if (typeof n == "object" && n.type === "steps")
      return `steps(${n.stepCount})`;
    let { gsap: o } = e;
    if (!o) return "linear";
    let i = o.parseEase(r);
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
  function us(n) {
    return typeof n == "object" && n !== null;
  }
  function ds(n) {
    return typeof n == "number";
  }
});
var wr = m((wt) => {
  "use strict";
  Object.defineProperty(wt, "__esModule", { value: !0 });
  Object.defineProperty(wt, "PluginRuntimeBridge", {
    enumerable: !0,
    get: function () {
      return fs;
    },
  });
  var fs = class {
    intervalHandlers = new Map();
    channelSubscribers = new Map();
    registerIntervalHandler(e, t) {
      let r = this.intervalHandlers.get(e);
      r !== t &&
        (r !== void 0 &&
          console.warn(
            "IX3: registerIntervalHandler called twice. The previous handler is being replaced; verify the plugin is registered exactly once (or use a unique pluginKey per concurrent handler).",
            { pluginKey: e }
          ),
        this.intervalHandlers.set(e, t));
    }
    fireInterval(e) {
      for (let [t, r] of this.intervalHandlers)
        try {
          r(e);
        } catch (o) {
          console.error(
            "IX3: interval handler threw. Continuing with the remaining handlers. Investigate the plugin to prevent silent data drift.",
            { pluginKey: t },
            o
          );
        }
    }
    publish(e, t, r) {
      let o = this.channelSubscribers.get(e);
      if (o) {
        for (let i of o.values())
          for (let s of i.slice())
            if (!(s.element && r && s.element !== r))
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
    subscribe(e, t, r, o) {
      let i = this.channelSubscribers.get(t);
      i || ((i = new Map()), this.channelSubscribers.set(t, i));
      let s = i.get(e) ?? [],
        a = { element: r, cb: o };
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
      for (let [t, r] of this.channelSubscribers)
        r.delete(e), r.size === 0 && this.channelSubscribers.delete(t);
    }
  };
});
var Sr = m((St) => {
  "use strict";
  Object.defineProperty(St, "__esModule", { value: !0 });
  Object.defineProperty(St, "RuntimeMotionDriver", {
    enumerable: !0,
    get: function () {
      return ps;
    },
  });
  var ps = class {
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
      let r = this.env.win,
        o = 0,
        i = !0,
        s = () => {
          i && (e(), i && (o = r.requestAnimationFrame(s)));
        };
      return (
        (o = r.requestAnimationFrame(s)),
        () => {
          (i = !1), r.cancelAnimationFrame(o);
        }
      );
    }
    createObserver(...e) {
      return this.env.win.Observer?.create(...e) ?? null;
    }
  };
});
var Er = m((Mt) => {
  "use strict";
  Object.defineProperty(Mt, "__esModule", { value: !0 });
  Object.defineProperty(Mt, "AnimationCoordinator", {
    enumerable: !0,
    get: function () {
      return vs;
    },
  });
  var Ct = Z(),
    D = ge(),
    Et = Tt(),
    gs = wr(),
    hs = Sr();
  function ms(n) {
    return (
      typeof n == "string" &&
      (n.startsWith("+=") || n.startsWith("-=") || n.startsWith("random("))
    );
  }
  function ys(n) {
    for (let e of [n.to, n.from])
      if (e) {
        for (let t in e) if (ms(e[t])) return !0;
      }
    return !1;
  }
  var se,
    vs =
      ((se = class {
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
        resolveAlias(e, t = 0) {
          if (t > se.MAX_ALIAS_DEPTH)
            return (
              console.warn(
                `IX3: Timeline alias chain exceeded max depth for "${e}". Possible circular reference.`
              ),
              e
            );
          let r = this.aliases.get(e);
          return r ? this.resolveAlias(r, t + 1) : e;
        }
        shouldFlipEaseForTimeline(e) {
          let t = this.resolveSourceTimelineId(e),
            r = [t];
          for (let [l] of this.timelineDefs)
            l !== t && this.resolveSourceTimelineId(l) === t && r.push(l);
          let o = new Set(r),
            i = !1,
            s = (l) => {
              if (l === "reverseFlipEase" || l === "togglePlayReverseFlipEase")
                i = !0;
              else if (l === "reverse" || l === "togglePlayReverse") return !0;
              return !1;
            },
            a = new Map();
          for (let l of r) {
            let c = this.getInteractionForTimeline(l);
            c && a.set(c.id, c);
          }
          for (let l of a.values()) {
            let c = l.timelineIds ?? [];
            for (let [, u] of l.triggers) {
              let d = u?.assignedTimelineRole,
                f =
                  d != null
                    ? c.filter(
                        (p) =>
                          this.timelineDefs.get(p)?.triggerMetadata?.role === d
                      )
                    : null,
                g = (p) =>
                  (p != null ? [p] : c).filter(
                    (T) => (f == null || f.includes(T)) && o.has(T)
                  ),
                h = u?.conditionalLogic;
              if (h) {
                for (let p of [h.ifTrue, h.ifFalse])
                  if (
                    p &&
                    g(p.targetTimelineId ?? void 0).length > 0 &&
                    s(p.control)
                  )
                    return !1;
              } else
                for (let p of g()) {
                  let y = this.timelineDefs.get(p),
                    T = y?.triggerMetadata ? y.settings?.control : u?.control;
                  if (s(T)) return !1;
                }
            }
          }
          return i;
        }
        recomputeFlipEaseForSource(e) {
          let t = this.resolveSourceTimelineId(e),
            r = this.subs.get(t);
          if (!r) return;
          let o = this.shouldFlipEaseForTimeline(t);
          if (o !== this.flipEaseBySource.get(t)) {
            this.flipEaseBySource.set(t, o);
            for (let i of r.values()) this.scheduleRebuild(i);
          }
        }
        resolveSourceTimelineId(e) {
          let t = e;
          for (let r = 0; r <= se.MAX_ALIAS_DEPTH; r++) {
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
        constructor(e, t, r, o, i, s) {
          (this.timelineDefs = e),
            (this.getHandler = t),
            (this.getTargetResolver = r),
            (this.resolveFn = o),
            (this.getInteractionForTimeline = i),
            (this.env = s),
            (this.subs = new Map()),
            (this.dynamicFlags = new Map()),
            (this.cleanupFns = new Map()),
            (this.scrollTriggers = new Map()),
            (this.aliases = new Map()),
            (this.flipEaseBySource = new Map()),
            (this.pluginRuntimeBridge = new gs.PluginRuntimeBridge()),
            (this.globalSplitRegistry = new Map()),
            (this.timelineTargetsCache = new WeakMap()),
            (this.getStaggerConfig = (a, l) => {
              if (!a) return;
              let {
                  ease: c,
                  amount: u,
                  from: d,
                  grid: f,
                  axis: g,
                  each: h,
                } = a,
                p = {};
              if (
                (u != null && (p.amount = (0, D.toSeconds)(u)),
                h != null && (p.each = (0, D.toSeconds)(h)),
                d != null && (p.from = d),
                f != null && (p.grid = f),
                g != null && (p.axis = g),
                c != null)
              ) {
                let y = (0, Et.convertEaseConfigToGSAP)(c, void 0, l);
                y != null && (p.ease = y);
              }
              return p;
            }),
            (this.animation = new hs.RuntimeMotionDriver(s));
        }
        createTimeline(e, t) {
          this.destroy(e);
          let r = this.timelineDefs.get(e);
          if (!r) return;
          if (r.reuse?.sourceTimelineId) {
            this.aliases.set(e, r.reuse.sourceTimelineId),
              this.recomputeFlipEaseForSource(r.reuse.sourceTimelineId);
            return;
          }
          let o = this.isDynamicTimeline(r, t);
          this.dynamicFlags.set(e, o);
          let i = new Set(),
            s = new Set();
          for (let [, a, l] of t.triggers) {
            if (l) for (let u of this.resolveFn(l, {}, t)) s.add(u);
            let c = a?.controlType;
            c && (0, D.isValidControlType)(c) && i.add(c);
          }
          if (!s.size || !o) {
            let a = this.buildSubTimeline(e, null, i);
            a && this.ensureSubs(e).set(null, a);
          }
          if (s.size) {
            let a = this.ensureSubs(e);
            for (let l of s)
              if (!a.has(l)) {
                let c = o
                  ? this.buildSubTimeline(e, l, i)
                  : this.getSub(e, null);
                o && c && a.set(l, c);
              }
          }
          this.flipEaseBySource.set(e, this.shouldFlipEaseForTimeline(e));
        }
        getTimeline(e, t) {
          return this.getSub(e, t)?.timeline;
        }
        getAllTimelines(e) {
          let t = this.resolveAlias(e),
            r = this.subs.get(t);
          return r ? Array.from(r.values()).map((o) => o.timeline) : [];
        }
        invalidateVolatileFromStart(e, t) {
          let r = t != null ? t === 0 : e.timeline.progress() === 0;
          e.hasVolatileValues && r && e.timeline.invalidate();
        }
        play(e, t, r) {
          let o = this.getSub(e, t);
          o &&
            (this.invalidateVolatileFromStart(o, r),
            o.timeline.play(r ?? void 0));
        }
        pause(e, t, r) {
          let o = this.getSubOrNull(e, t);
          o && (r !== void 0 ? o.timeline.pause(r) : o.timeline.pause());
        }
        resume(e, t, r) {
          let o = this.getSubOrNull(e, t);
          o && (this.invalidateVolatileFromStart(o, r), o.timeline.resume(r));
        }
        reverse(e, t, r) {
          this.getSub(e, t)?.timeline.reverse(r);
        }
        restart(e, t) {
          let r = this.getSub(e, t);
          r &&
            (r.hasVolatileValues && r.timeline.invalidate(),
            r.timeline.restart());
        }
        getTriggerMetadata(e) {
          return this.timelineDefs.get(e)?.triggerMetadata ?? null;
        }
        fireInterval(e, t, r = {}) {
          this.pluginRuntimeBridge.fireInterval({
            coordinator: this,
            timelineId: e,
            element: t,
            options: r,
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
                getFirstActionTargets: (r) => this.getFirstActionTargets(e, r),
                getActionTweenConfig: (r, o, i) =>
                  this.getActionTweenConfig(r, o, i),
                buildActionTimeline: (r) =>
                  this.buildOneShotActionTimeline(e, r),
                registerCleanup: (r) => this.registerCleanup(e, r),
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
        getActionTweenConfig(e, t, r) {
          let o = this.getHandler(t);
          if (!o?.createTweenConfig) return null;
          let i = e.properties[t] || {};
          return o.createTweenConfig(i, r);
        }
        registerCleanup(e, t) {
          let r = this.cleanupFns.get(e) ?? new Set();
          return (
            this.cleanupFns.set(e, r),
            r.add(t),
            () => {
              r.delete(t);
            }
          );
        }
        publishChannel(e, t, r) {
          this.pluginRuntimeBridge.publish(e, t, r);
        }
        subscribeChannel(e, t, r, o) {
          return this.pluginRuntimeBridge.subscribe(e, t, r, o);
        }
        buildOneShotActionTimeline(e, t) {
          let r = this.getTimelineDef(e);
          if (!r?.actions?.length) return null;
          let o = this.animation.timeline();
          if (!o) return null;
          t.beforeTweens?.(o);
          for (let i of r.actions)
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
          let r = this.getSub(e, t);
          if (!r) return;
          let o = r.timeline,
            i = o.progress();
          this.invalidateVolatileFromStart(r),
            i === 0
              ? o.play()
              : i === 1
              ? o.reverse()
              : o.reversed()
              ? o.play()
              : o.reverse();
        }
        seek(e, t, r) {
          this.getSubOrNull(e, r)?.timeline.seek(t);
        }
        setTimeScale(e, t, r) {
          this.getSubOrNull(e, r)?.timeline.timeScale(t);
        }
        setTotalProgress(e, t, r) {
          this.getSubOrNull(e, r)?.timeline.totalProgress(t);
        }
        setContinuousProgress(e, t, r) {
          this.getSub(e, r)?.timeline.progress(Math.max(0, Math.min(1, t)));
        }
        isPlaying(e, t) {
          return !!this.getSubOrNull(e, t)?.timeline.isActive();
        }
        isPaused(e, t) {
          return !!this.getSubOrNull(e, t)?.timeline.paused();
        }
        destroy(e) {
          this.aliases.delete(e), this.pluginRuntimeBridge.destroyTimeline(e);
          let t = this.subs.get(e);
          if (t) {
            for (let [, r] of t) {
              if (
                ((r.rebuildState = "init"),
                r.timeline && (r.timeline.revert(), r.timeline.kill()),
                r.scrollTriggerIds)
              ) {
                for (let o of r.scrollTriggerIds) this.cleanupScrollTrigger(o);
                r.scrollTriggerIds.clear();
              }
              r.scrollTriggerConfigs && r.scrollTriggerConfigs.clear();
              for (let o of r.cleanupFns ?? []) o();
              r.cleanupFns?.clear(), this.timelineTargetsCache.delete(r);
            }
            for (let [, r] of this.globalSplitRegistry)
              r.splitInstance.revert();
            this.globalSplitRegistry.clear();
          }
          for (let r of this.cleanupFns.get(e) ?? []) r();
          this.cleanupFns.delete(e),
            this.subs.delete(e),
            this.dynamicFlags.delete(e),
            this.flipEaseBySource.delete(e);
        }
        isDynamicTimeline(e, t) {
          let r = t.triggers.some(
            ([, i]) => i?.controlType !== Ct.TimelineControlType.LOAD
          );
          if (t.scope?.type === "component" && r) return !0;
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
            if (r) {
              for (let s in i.properties)
                if (this.getHandler(s)?.requiresTriggerElementContext)
                  return !0;
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
          let r = this.resolveAlias(e),
            o = this.ensureSubs(r),
            i = this.dynamicFlags.get(r),
            s = o.get(i ? t : null);
          return (
            s ||
              ((s = this.buildSubTimeline(r, t)), s && o.set(i ? t : null, s)),
            s
          );
        }
        getSubOrNull(e, t) {
          let r = this.resolveAlias(e),
            o = this.dynamicFlags.get(r);
          return this.subs.get(r)?.get(o ? t ?? null : null);
        }
        convertToGsapDefaults(e, t) {
          let r = {},
            o = t ? (0, D.buildEaseContextId)(t, "defaults") : void 0,
            i = t ? (0, D.buildEaseContextId)(t, "defaults-stagger") : void 0;
          if (
            (e.duration != null && (r.duration = (0, D.toSeconds)(e.duration)),
            e.ease != null)
          ) {
            let s = (0, Et.convertEaseConfigToGSAP)(e.ease, void 0, o);
            s != null && (r.ease = s);
          }
          if (
            (e.delay != null &&
              (r.delay =
                typeof e.delay == "number"
                  ? e.delay
                  : (0, D.toSeconds)(e.delay)),
            e.repeat != null && (r.repeat = e.repeat),
            e.repeatDelay != null &&
              (r.repeatDelay = (0, D.toSeconds)(e.repeatDelay)),
            e.stagger != null)
          ) {
            let s = this.getStaggerConfig(e.stagger, i);
            s && (r.stagger = s);
          }
          return e.yoyo != null && (r.yoyo = e.yoyo), r;
        }
        buildSubTimeline(e, t, r) {
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
              controlTypes: r,
            };
          if (!i?.length) return u;
          if (this.env.win.SplitText) {
            let d = this.analyzeSplitRequirements(i, t, e);
            for (let [f, { types: g, masks: h }] of d) {
              let p = this.getSplitTypeString(g),
                y = this.getMaskString(h);
              this.doSplitText(
                { type: p, mask: y },
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
          let r = e.timeline;
          r.duration() < t && r.to({}, { duration: 0 }, t);
        }
        buildTimeline(e) {
          let t = e.timelineDef,
            r = e.elementContext,
            o = e.timeline,
            i = e.timelineId,
            s = new Map();
          for (let a = 0; a < t.actions.length; a++) {
            let l = t.actions[a];
            if (!l) continue;
            let c = JSON.stringify(l.targets),
              u = !0,
              d = Cr(l),
              f = d === "none" ? c : `${c}_split_${d}`;
            for (let p of Object.values(l.properties ?? {})) {
              let y = s.get(f) || new Set();
              s.set(f, y);
              for (let T of Object.keys(p || {}))
                y.has(T) ? (u = !1) : y.add(T);
            }
            let g = this.collectTargets(l, r, i);
            if (!g.length) {
              let p = !1;
              for (let y in l.properties)
                if (this.getHandler(y)?.createCustomTween) {
                  p = !0;
                  break;
                }
              if (!p) continue;
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
                r,
                t.triggerMetadata?.role,
                e
              );
          }
        }
        collectTargets(e, t, r) {
          if (!e.targets) return [];
          let o = [],
            i = this.getInteractionForTimeline(r);
          for (let s of e.targets ?? []) {
            let a = this.resolveFn(s, t ? { triggerElement: t } : {}, i);
            o.push(...a);
          }
          return o;
        }
        buildTweensForAction(e, t, r, o, i, s, a, l, c, u) {
          let d = this.shouldFlipEaseForTimeline(o),
            f = c?.timelineDef.canvasDuration != null;
          for (let g in e.properties) {
            let h = g,
              p = this.getHandler(h);
            if (!p) continue;
            let y = e.properties[h] || {};
            try {
              let T = e.timing?.position;
              T =
                typeof T == "string" && T.endsWith("ms")
                  ? (0, D.toSeconds)(T)
                  : T ?? 0;
              let A = e.timing?.duration ?? Ct.DEFAULTS.DURATION,
                C = this.getStaggerConfig(
                  e.timing?.stagger,
                  (0, D.buildEaseContextId)(e.id, "stagger")
                );
              C && A === 0 && (A = 0.001);
              let M = { id: e.id, presetId: e.presetId, color: e.color },
                b = {
                  force3D: !0,
                  ...(!i && { immediateRender: i }),
                  data: M,
                  ...(e.tt !== 3 && { duration: (0, D.toSeconds)(A) }),
                  ...(e.timing?.repeat != null && {
                    repeat: f && e.timing.repeat < 0 ? 0 : e.timing.repeat,
                  }),
                  ...(e.timing?.repeatDelay != null && {
                    repeatDelay: (0, D.toSeconds)(e.timing.repeatDelay),
                  }),
                  ...(e.timing?.yoyo != null && { yoyo: e.timing.yoyo }),
                  ...(C && { stagger: C }),
                };
              if (e.timing?.ease != null) {
                let v = (0, Et.convertEaseConfigToGSAP)(
                  e.timing.ease,
                  void 0,
                  (0, D.buildEaseContextId)(e.id, "timing")
                );
                v != null && (b.ease = v);
              }
              if ((d && (b.easeReverse = !0), p.createTweenConfig)) {
                let v = p.createTweenConfig(y, t);
                s?.(h, e, v),
                  v.modifiers &&
                    (b.modifiers = { ...b.modifiers, ...v.modifiers }),
                  c &&
                    !c.hasVolatileValues &&
                    ys(v) &&
                    (c.hasVolatileValues = !0);
                let w = Object.keys(v.from || {}).length > 0,
                  I = Object.keys(v.to || {}).length > 0,
                  E = e.tt ?? 0;
                if (E === 0 && !I) continue;
                if (E === 1 && !w) continue;
                if (E === 2 && !w && !I) continue;
                if (E === 3 && !I) continue;
                E === 1
                  ? r.from(t, { ...b, ...v.from }, T)
                  : E === 2
                  ? r.fromTo(t, { ...v.from }, { ...b, ...v.to }, T)
                  : E === 3
                  ? r.set(t, { ...b, ...v.to }, T)
                  : r.to(t, { ...b, ...v.to }, T);
              } else if (p.createCustomTween) {
                let v = p.createCustomTween(r, e, y, b, t, T || 0, {
                  triggerElement: a ?? null,
                  timelineRole: l,
                  subscribeChannel: (w, I) =>
                    this.subscribeChannel(o, w, a ?? null, I),
                  animation: this.animation,
                });
                if (v)
                  if (u != null) u.add(v);
                  else if (c != null) {
                    let w = c.cleanupFns ?? new Set();
                    (c.cleanupFns = w), w.add(v);
                  } else {
                    let w = this.cleanupFns.get(o) ?? new Set();
                    this.cleanupFns.set(o, w), w.add(v);
                  }
              }
            } catch (T) {
              console.error("Error building tween:", T);
            }
          }
        }
        analyzeSplitRequirements(e, t, r) {
          let o = new Map();
          for (let i of e) {
            let s = Cr(i);
            if (s === "none") continue;
            let a = typeof i.splitText == "object" ? i.splitText.mask : void 0;
            for (let l of this.collectTargets(i, t, r)) {
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
        doSplitText(e, t, r, o) {
          try {
            let i = Le(e.type);
            for (let s of t) {
              let a = this.globalSplitRegistry.get(s);
              if (a) {
                let d = new Set(Le(a.splitTextConfig.type));
                if (i.every((g) => d.has(g))) continue;
                a.splitInstance.revert(),
                  this.globalSplitRegistry.delete(s),
                  (e = {
                    type: [...new Set([...d, ...i])].join(", "),
                    mask: e.mask || a.splitTextConfig.mask,
                  });
              }
              let l = { type: e.type },
                c = Le(e.type);
              c.includes("lines") &&
                ((r.timeline.data.splitLines = !0),
                (l.linesClass = (0, D.defaultSplitClass)("line")),
                (l.autoSplit = !0),
                (l.onSplit = () => {
                  r.rebuildState !== "init"
                    ? this.scheduleRebuildForElement(s)
                    : (r.rebuildState = "idle");
                })),
                c.includes("words") &&
                  (l.wordsClass = (0, D.defaultSplitClass)("word")),
                c.includes("chars") &&
                  (l.charsClass = (0, D.defaultSplitClass)("letter")),
                e.mask && (l.mask = e.mask);
              let u = new o([s], l);
              this.globalSplitRegistry.set(s, {
                splitInstance: u,
                splitTextConfig: e,
              }),
                a && this.scheduleRebuildForElement(s);
            }
          } catch (i) {
            console.error("Error splitting text:", i);
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
            r = e.controlTypes?.has(Ct.TimelineControlType.LOAD) && t !== 1,
            o = e.timeline.isActive() || r;
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
          let r = [];
          for (let o of e) {
            let i = this.globalSplitRegistry.get(o);
            if (i && Le(i.splitTextConfig.type).includes(t)) {
              let a = i.splitInstance[t];
              a?.length && r.push(...a);
            }
          }
          return r.length > 0 ? r : e;
        }
        setupScrollControl(e, t, r, o) {
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
          let a = ws(
            r,
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
          for (let r of e.timelineDef.actions ?? [])
            for (let o of this.collectTargets(
              r,
              e.elementContext,
              e.timelineId
            ))
              t.add(o);
          return this.timelineTargetsCache.set(e, t), t;
        }
        scheduleRebuildForElement(e) {
          for (let [, t] of this.subs)
            for (let [, r] of t)
              this.getTimelineTargets(r).has(e) && this.scheduleRebuild(r);
        }
      }),
      pe(se, "MAX_ALIAS_DEPTH", 10),
      se);
  function bs(n, e, t) {
    let r = {},
      o = (i) =>
        i && (i.parentElement === document.body || i === document.body);
    if (n.pin !== void 0)
      if (typeof n.pin == "boolean") n.pin && !o(e) && (r.pin = n.pin);
      else {
        let i = t(n.pin, { triggerElement: e });
        i.length > 0 && !o(i[0]) && (r.pin = i[0]);
      }
    if (n.endTrigger) {
      let i = t(n.endTrigger, { triggerElement: e });
      i.length > 0 && (r.endTrigger = i[0]);
    }
    if (n.scroller) {
      let i = t(n.scroller, { triggerElement: e });
      i.length > 0 ? (r.scroller = i[0]) : (r.scroller = window);
    }
    return r;
  }
  function Ts(n, e, t = !1) {
    let [r, o, i, s] = n,
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
      r !== "none" && (l.onEnter = a(r)),
      o !== "none" && (l.onLeave = a(o)),
      i !== "none" && (l.onEnterBack = a(i)),
      s !== "none" && (l.onLeaveBack = a(s)),
      l
    );
  }
  function ws(n, e, t, r, o, i = !1) {
    let s = bs(n, e, o),
      a = [
        n.enter || "none",
        n.leave || "none",
        n.enterBack || "none",
        n.leaveBack || "none",
      ],
      l = {
        trigger: e,
        markers: n.showMarkers ?? !1,
        start: n.clamp ? `clamp(${n.start})` : n.start || "top bottom",
        end: n.clamp ? `clamp(${n.end})` : n.end || "bottom top",
        scrub: n.scrub ?? !1,
        horizontal: n.horizontal || !1,
        toggleActions: a.join(" "),
        id: t,
        ...s,
      };
    if (l.scrub !== !1) l.animation = r;
    else {
      let c = Ts(a, r, i);
      Object.assign(l, c);
    }
    return l;
  }
  function Cr(n) {
    return n.splitText
      ? typeof n.splitText == "string"
        ? n.splitText
        : n.splitText.type
      : "none";
  }
  function Le(n) {
    return n.split(", ");
  }
});
var Mr = m((At) => {
  "use strict";
  Object.defineProperty(At, "__esModule", { value: !0 });
  Object.defineProperty(At, "ConditionEvaluator", {
    enumerable: !0,
    get: function () {
      return Ss;
    },
  });
  var he = Z(),
    Ss = class {
      getConditionEvaluator;
      sharedObservers = new Map();
      conditionCache = new Map();
      CACHE_TTL = 100;
      constructor(e) {
        this.getConditionEvaluator = e;
      }
      evaluateConditionsForTrigger = async (e, t) => {
        if (!e?.length) return !0;
        let r = e.some(([o]) => o === he.CORE_OPERATORS.OR);
        return this.evaluateCondition(
          [r ? he.CORE_OPERATORS.OR : he.CORE_OPERATORS.AND, { conditions: e }],
          t
        );
      };
      observeConditionsForTrigger = (e, t) => {
        if (!e?.length) return () => {};
        let r = [],
          o = [];
        for (let s of e)
          this.getConditionEvaluator(s)?.isReactive ?? !1
            ? r.push(s)
            : o.push(s[0]);
        if (r.length === 0) return () => {};
        let i = r.map((s) => this.getOrCreateSharedObserver(s, t));
        return () => {
          for (let s of i) s();
        };
      };
      disposeSharedObservers = () => {
        for (let [e, t] of this.sharedObservers)
          try {
            t.cleanup();
          } catch (r) {
            console.error("Error disposing shared observer: %s", e, r);
          }
        this.sharedObservers.clear(), this.conditionCache.clear();
      };
      observeCondition = (e, t) => {
        let r = this.getEvaluator(e);
        if (r?.observe)
          try {
            return r.observe(e, t);
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
        evaluate: async (t, r) => {
          let [, o, i] = t,
            { conditions: s } = o || {};
          if (!Array.isArray(s)) return !1;
          if (!s.length) return !0;
          let a = e === he.CORE_OPERATORS.OR,
            l = i === 1;
          for (let c of s) {
            let u = await this.evaluateCondition(c, r);
            if (a ? u : !u) return a ? !l : !!l;
          }
          return a ? !!l : !l;
        },
        observe: (t, r) => {
          let [, o] = t,
            { conditions: i } = o || {};
          if (!Array.isArray(i)) return () => {};
          let s = i.map((a) =>
            this.observeCondition(a, async () =>
              r(await this.evaluateCondition(t))
            )
          );
          return () => s.forEach((a) => a && a());
        },
      });
      evaluateCondition = async (e, t) => {
        let r = this.generateConditionCacheKey(e, t),
          o = Date.now(),
          i = this.conditionCache.get(r);
        if (i && o - i.timestamp < this.CACHE_TTL) return i.result;
        let s = this.getEvaluator(e);
        if (!s)
          return (
            console.warn(`No evaluator found for condition type '${e[0]}'`), !1
          );
        try {
          let a = await s.evaluate(e, t);
          return this.conditionCache.set(r, { result: a, timestamp: o }), a;
        } catch (a) {
          return console.error("Error evaluating condition:", a), !1;
        }
      };
      generateConditionCacheKey = (e, t) => {
        let [r, o, i] = e,
          s = o ? JSON.stringify(o) : "",
          a = i ? ":negate" : "",
          l = t ? `:ctx:${t.id}` : "";
        return `${r}:${s}${a}${l}`;
      };
      invalidateConditionCache = (e) => {
        let [t] = e,
          r = [];
        for (let o of this.conditionCache.keys())
          o.startsWith(`${t}:`) && r.push(o);
        r.forEach((o) => this.conditionCache.delete(o));
      };
      generateObserverKey = (e) => {
        let [t, r, o] = e,
          i = r ? JSON.stringify(r) : "";
        return `${t}:${i}${o ? ":negate" : ""}`;
      };
      getOrCreateSharedObserver = (e, t) => {
        let r = this.generateObserverKey(e),
          o = this.sharedObservers.get(r);
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
            this.sharedObservers.set(r, o);
        }
        return (
          o.callbacks.add(t),
          o.refCount++,
          () => this.releaseSharedObserver(r, t)
        );
      };
      releaseSharedObserver = (e, t) => {
        let r = this.sharedObservers.get(e);
        if (
          !(!r || !r.callbacks.delete(t)) &&
          ((r.refCount = Math.max(0, r.refCount - 1)),
          r.refCount <= 0 && r.callbacks.size === 0)
        ) {
          try {
            r.cleanup();
          } catch (i) {
            console.error("Error cleaning up shared observer:", i);
          }
          this.sharedObservers.delete(e);
        }
      };
    };
});
var Ar = m((Ot) => {
  "use strict";
  Object.defineProperty(Ot, "__esModule", { value: !0 });
  Object.defineProperty(Ot, "ConditionalPlaybackManager", {
    enumerable: !0,
    get: function () {
      return Es;
    },
  });
  var Cs = Z(),
    Es = class {
      matchMediaInstances = new Map();
      setupConditionalContext = (e, t, r) => {
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
            ([, { controlType: u }]) => u === Cs.TimelineControlType.LOAD
          );
        a.add(this.buildConditionsObject(o), (u) => {
          if (c && !l) return !1;
          l = !1;
          let d = this.evaluateConditions(u.conditions || {}, o);
          return (!d || d.behavior === "skip-to-end") && t(d), r;
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
        for (let r of e)
          switch (r.type) {
            case "prefers-reduced-motion": {
              t.prefersReduced = "(prefers-reduced-motion: reduce)";
              break;
            }
            case "breakpoint": {
              (r.breakpoints || []).forEach((i) => {
                let s = Ms[i];
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
        let r = [];
        for (let s of t)
          s.type === "prefers-reduced-motion" &&
            e.prefersReduced &&
            r.push({ condition: s, type: "prefers-reduced-motion" }),
            s.type === "breakpoint" &&
              (s.breakpoints || []).some((c) => e[`breakpoint_${c}`]) &&
              r.push({ condition: s, type: "breakpoint" });
        if (r.length === 0) return null;
        let o = r.find(({ condition: s }) => s.behavior === "dont-animate");
        if (o)
          return {
            behavior: "dont-animate",
            matchedConditions: {
              prefersReduced: o.type === "prefers-reduced-motion",
              breakpointMatched: o.type === "breakpoint",
            },
          };
        let i = r[0];
        return {
          behavior: i.condition.behavior,
          matchedConditions: {
            prefersReduced: i.type === "prefers-reduced-motion",
            breakpointMatched: i.type === "breakpoint",
          },
        };
      }
    },
    Ms = {
      tiny: "(max-width: 479px) and (min-width: 0px)",
      small: "(max-width: 767px) and (min-width: 480px)",
      medium: "(max-width: 991px) and (min-width: 768px)",
      main: "(min-width: 992px)",
    };
});
var _r = m((_t) => {
  "use strict";
  Object.defineProperty(_t, "__esModule", { value: !0 });
  Object.defineProperty(_t, "PluginRegistry", {
    enumerable: !0,
    get: function () {
      return As;
    },
  });
  var As = class {
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
      let t = Or(e.manifest.id);
      if (this.plugins.has(t))
        throw new Error(`Plugin ${t} is already registered`);
      let r = Object.entries(e.manifest.dependencies ?? {});
      for (let [o] of r)
        if (!this.plugins.has(o))
          throw new Error(`Missing dependency: ${o} required by ${t}`);
      this.plugins.set(t, e), e.initialize && (await e.initialize());
      for (let o of e.extensions) this.registerExtension(o);
      r.length || (await this.activatePlugin(t));
    }
    registerExtension(e) {
      this.extensionsByPoint.has(e.extensionPoint) ||
        this.extensionsByPoint.set(e.extensionPoint, new Map());
      let t = this.extensionsByPoint.get(e.extensionPoint),
        r = e.id;
      if (t.has(r))
        throw new Error(
          `Extension ${r} is already registered for point ${e.extensionPoint}`
        );
      t.set(r, e);
    }
    async activatePlugin(e) {
      if (this.activePlugins.has(e)) return;
      let t = this.plugins.get(e);
      if (!t) throw new Error(`Cannot activate unknown plugin: ${e}`);
      let r = Object.keys(t.manifest.dependencies ?? {});
      for (let o of r) await this.activatePlugin(o);
      t.activate && (await t.activate()), this.activePlugins.add(e);
    }
    async deactivatePlugin(e) {
      if (!this.activePlugins.has(e)) return;
      let t = this.plugins.get(e);
      if (!t) throw new Error(`Cannot deactivate unknown plugin: ${e}`);
      t.deactivate && (await t.deactivate()), this.activePlugins.delete(e);
    }
    async unregisterPlugin(e, t) {
      let r = Or([e, t]),
        o = this.plugins.get(r);
      if (o) {
        this.activePlugins.has(r) && (await this.deactivatePlugin(r));
        for (let i of o.extensions)
          i.extensionPoint === "condition" &&
            i.implementation.dispose &&
            (await i.implementation.dispose()),
            this.extensionsByPoint
              .get(i.extensionPoint)
              ?.delete(`${r}:${i.id}`);
        o.dispose && (await o.dispose()),
          this.plugins.delete(r),
          this.pluginStorage.delete(r);
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
  function Or(n) {
    return `${n[0]}:${n[1]}`;
  }
});
var Ee = m((It) => {
  "use strict";
  Object.defineProperty(It, "__esModule", { value: !0 });
  Object.defineProperty(It, "BaseTriggerStrategy", {
    enumerable: !0,
    get: function () {
      return Os;
    },
  });
  var Os = class {
    runTrigger;
    runTimelineAction;
    skipToEndState;
    constructor(e, t, r) {
      (this.runTrigger = e),
        (this.runTimelineAction = t),
        (this.skipToEndState = r);
    }
  };
});
var Ir = m((Rt) => {
  "use strict";
  Object.defineProperty(Rt, "__esModule", { value: !0 });
  Object.defineProperty(Rt, "StandardTriggerStrategy", {
    enumerable: !0,
    get: function () {
      return Rs;
    },
  });
  var _s = Ee();
  function Is(n) {
    if (!n || typeof n != "object") return !1;
    let e = n;
    return e.type === "timeline-role" && typeof e.role == "string";
  }
  var Rs = class extends _s.BaseTriggerStrategy {
    getTimelineIdsForRole;
    constructor(e, t, r, o) {
      super(e, t, r), (this.getTimelineIdsForRole = o);
    }
    bind(e, t, r) {
      let {
          interactionId: o,
          elements: i,
          triggerHandler: s,
          eventManager: a,
          conditionalContext: l,
          cleanupMap: c,
          delay: u,
        } = r,
        d = e[1],
        f = d.assignedTimelineRole;
      for (let g of i) {
        if (!g) continue;
        let h = c.get(g);
        h || ((h = new Set()), c.set(g, h));
        let p = null,
          y = s(e, g, a, (T) => {
            let A = Is(T) ? T.role : f,
              C = A ? this.getTimelineIdsForRole(t, A) : void 0;
            if (C?.length === 0) return;
            if (l !== null) {
              l.behavior === "skip-to-end" &&
                this.skipToEndState(t, null, d, C);
              return;
            }
            let M = () => {
              this.runTrigger(e, g, o, C).catch((b) =>
                console.error("Error in trigger execution:", b)
              );
            };
            d.conditionalLogic || !u
              ? M()
              : p == null &&
                (p = setTimeout(() => {
                  (p = null), M();
                }, u * 1e3));
          });
        y && h.add(y),
          h.add(() => {
            p != null && (clearTimeout(p), (p = null));
          });
      }
    }
  };
});
var Rr = m((Pt) => {
  "use strict";
  Object.defineProperty(Pt, "__esModule", { value: !0 });
  Object.defineProperty(Pt, "LoadTriggerStrategy", {
    enumerable: !0,
    get: function () {
      return xs;
    },
  });
  var Ps = Ee(),
    xs = class extends Ps.BaseTriggerStrategy {
      loadInteractions;
      getTimeline;
      constructor(e, t, r, o, i) {
        super(e, t, r), (this.loadInteractions = o), (this.getTimeline = i);
      }
      bind(e, t, r) {
        if (window.__wf_ix3) return;
        let { conditionalContext: o, delay: i } = r,
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
var Pr = m((xt) => {
  "use strict";
  Object.defineProperty(xt, "__esModule", { value: !0 });
  Object.defineProperty(xt, "ScrollTriggerStrategy", {
    enumerable: !0,
    get: function () {
      return Ns;
    },
  });
  var ks = Ee(),
    Ns = class extends ks.BaseTriggerStrategy {
      setupScrollControl;
      constructor(e, t, r, o) {
        super(e, t, r), (this.setupScrollControl = o);
      }
      bind(e, t, r) {
        let { interactionId: o, elements: i, conditionalContext: s } = r,
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
var xr = m((kt) => {
  "use strict";
  Object.defineProperty(kt, "__esModule", { value: !0 });
  Object.defineProperty(kt, "ContinuousChannelManager", {
    enumerable: !0,
    get: function () {
      return Fs;
    },
  });
  var Fs = class {
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
        let r = new Ds(
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
        return this.channels.set(t, r), r;
      }
      fireInterval(e, t) {
        let r = this.resolveRole(e);
        r &&
          this.coordinator.fireInterval(r, t.element ?? null, {
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
      publishChannel(e, t, r) {
        this.coordinator.publishChannel(e, t, r);
      }
      cleanup() {
        for (let e of this.channels.values()) e.destroy();
        this.channels.clear();
      }
    },
    Ls = "power2.out",
    Ds = class {
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
        let r = (e.smoothing ?? 0) / 1e3;
        (this.setter =
          r > 0
            ? e.animation.quickTo(this.proxy, "p", {
                duration: r,
                ease: Ls,
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
var kr = m((Nt) => {
  "use strict";
  Object.defineProperty(Nt, "__esModule", { value: !0 });
  Object.defineProperty(Nt, "ContinuousTriggerStrategy", {
    enumerable: !0,
    get: function () {
      return Us;
    },
  });
  var Bs = Ee(),
    js = xr();
  function Vs(n) {
    return n != null && "type" in n && n.type === "continuous";
  }
  var Us = class extends Bs.BaseTriggerStrategy {
    continuousCleanups;
    triggerCleanupFunctions;
    coordinator;
    getTimelineIdForRole;
    constructor(e, t, r, o, i, s, a) {
      super(e, t, r),
        (this.continuousCleanups = o),
        (this.triggerCleanupFunctions = i),
        (this.coordinator = s),
        (this.getTimelineIdForRole = a);
    }
    bind(e, t, r) {
      let {
        interactionId: o,
        elements: i,
        triggerHandler: s,
        conditionalContext: a,
      } = r;
      for (let l of i) {
        if (!l) continue;
        if (a !== null) {
          a.behavior === "skip-to-end" && this.skipToEndState(t, l);
          continue;
        }
        let c = (f) => this.getTimelineIdForRole(t, f),
          u = new js.ContinuousChannelManager(this.coordinator, c),
          d = s(e, l, r.eventManager, (f) => {
            if (Vs(f)) {
              let g = f.setup(u),
                h = this.continuousCleanups.get(o);
              h || ((h = new Map()), this.continuousCleanups.set(o, h)),
                h.set(l, () => {
                  g(), u.cleanup();
                });
            }
          });
        if (d) {
          let f = this.triggerCleanupFunctions.get(o);
          f || ((f = new Map()), this.triggerCleanupFunctions.set(o, f));
          let g = f.get(l);
          g || ((g = new Set()), f.set(l, g)), g.add(d);
        }
      }
    }
  };
});
var Fr = m((Ft) => {
  "use strict";
  Object.defineProperty(Ft, "__esModule", { value: !0 });
  Object.defineProperty(Ft, "IX3", {
    enumerable: !0,
    get: function () {
      return Ks;
    },
  });
  var Me = Z(),
    qs = vr(),
    $s = Er(),
    Hs = Mr(),
    Gs = Ar(),
    zs = _r(),
    W = ge(),
    Ws = Ir(),
    Ys = Rr(),
    Xs = Pr(),
    Zs = kr(),
    Qs = 200,
    Nr = 210,
    me,
    Ks =
      ((me = class {
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
            (this.pluginReg = new zs.PluginRegistry()),
            (this.timelineDefs = new Map()),
            (this.interactions = new Map()),
            (this.triggeredElements = new Map()),
            (this.triggerCleanupFunctions = new Map()),
            (this.continuousCleanups = new Map()),
            (this.windowSize = { w: 0, h: 0 }),
            (this.prevWindowSize = { w: 0, h: 0 }),
            (this.windowResizeSubscribers = new Set()),
            (this.debouncedWindowResize = (0, W.debounce)(() => {
              for (let t of this.windowResizeSubscribers) t();
            }, Qs)),
            (this.bodyResizeObserver = null),
            (this.triggerObservers = new Map()),
            (this.timelineRefCounts = new Map()),
            (this.interactionTimelineRefs = new Map()),
            (this.timelineToInteractionId = new Map()),
            (this.reactiveCallbackQueues = new Map()),
            (this.pendingReactiveUpdates = new Map()),
            (this.reactiveExecutionContext = new Set()),
            (this.componentScopeSelectors = new Map()),
            (this.eventMgr = qs.EventManager.getInstance()),
            (this.loadInteractions = []),
            (this.addEventListener = this.eventMgr.addEventListener.bind(
              this.eventMgr
            )),
            (this.emit = this.eventMgr.emit.bind(this.eventMgr)),
            (this.resolveTargets = (t, r, o) => {
              let i = o?.scope?.type === "component" ? o.scope : null,
                s = i?.componentId
                  ? this.getComponentScopeSelector(i.componentId)
                  : null,
                a = i?.variants?.length ? i.variants : null,
                l = this.resolveTargetsImpl(t, r, o, s),
                c =
                  s && r.triggerElement
                    ? this.filterByInstance(l, s, r.triggerElement)
                    : l;
              return a && s ? this.filterByVariant(c, s, a) : c;
            }),
            (this.isTargetDynamic = (t) =>
              !!this.pluginReg.getTargetResolver(t)?.isDynamic),
            (this.getInteractionForTimeline = (t) => {
              let r = this.timelineToInteractionId.get(t);
              if (r) return this.interactions.get(r);
            }),
            window.addEventListener("resize", this.debouncedWindowResize),
            (this.coordinator = new $s.AnimationCoordinator(
              this.timelineDefs,
              this.pluginReg.getActionHandler.bind(this.pluginReg),
              this.pluginReg.getTargetResolver.bind(this.pluginReg),
              this.resolveTargets,
              this.getInteractionForTimeline,
              e
            )),
            (this.conditionEval = new Hs.ConditionEvaluator(
              this.pluginReg.getConditionEvaluator.bind(this.pluginReg)
            )),
            (this.conditionalPlaybackManager =
              new Gs.ConditionalPlaybackManager()),
            (this.triggerStrategies = new Map([
              [
                Me.TimelineControlType.STANDARD,
                new Ws.StandardTriggerStrategy(
                  this.runTrigger.bind(this),
                  this.runTimelineAction.bind(this),
                  this.skipToEndState.bind(this),
                  this.getTimelineIdsForRole.bind(this)
                ),
              ],
              [
                Me.TimelineControlType.LOAD,
                new Ys.LoadTriggerStrategy(
                  this.runTrigger.bind(this),
                  this.runTimelineAction.bind(this),
                  this.skipToEndState.bind(this),
                  this.loadInteractions,
                  this.coordinator.getTimeline.bind(this.coordinator)
                ),
              ],
              [
                Me.TimelineControlType.SCROLL,
                new Xs.ScrollTriggerStrategy(
                  this.runTrigger.bind(this),
                  this.runTimelineAction.bind(this),
                  this.skipToEndState.bind(this),
                  this.coordinator.setupScrollControl.bind(this.coordinator)
                ),
              ],
              [
                Me.TimelineControlType.CONTINUOUS,
                new Zs.ContinuousTriggerStrategy(
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
            (this.debouncedReactiveCallback = (0, W.debounce)(
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
          return (this.instance = new me(e)), this.instance;
        }
        async registerPlugin(e) {
          await this.pluginReg.registerPlugin(e);
        }
        register(e, t) {
          if (t?.length) for (let r of t) this.timelineDefs.set(r.id, r);
          if (e?.length) {
            for (let r of e) {
              if (this.interactions.has(r.id)) {
                console.warn(
                  `Interaction with ID ${r.id} already exists. Use update() to modify it.`
                );
                continue;
              }
              this.interactions.set(r.id, r);
              let o = new Set();
              this.interactionTimelineRefs.set(r.id, o),
                this.conditionalPlaybackManager.setupConditionalContext(
                  r,
                  (i) => {
                    for (let s of r.timelineIds ?? [])
                      o.add(s),
                        this.incrementTimelineRefCount(s),
                        this.timelineToInteractionId.set(s, r.id),
                        this.coordinator.createTimeline(s, r);
                    for (let s of r.triggers ?? []) this.bindTrigger(s, r, i);
                  },
                  () => {
                    this.cleanupInteractionAnimations(r.id);
                  }
                );
            }
            for (let r of this.loadInteractions) r();
            if (
              ((this.loadInteractions.length = 0),
              this.coordinator.getScrollTriggers().size > 0)
            ) {
              this.windowResizeSubscribers.add(() => {
                (this.windowSize.h = window.innerHeight),
                  (this.windowSize.w = window.innerWidth);
              });
              let r = (0, W.debounce)(
                  () => {
                    (this.prevWindowSize.h = this.windowSize.h),
                      (this.prevWindowSize.w = this.windowSize.w);
                  },
                  Nr,
                  { leading: !0, trailing: !1 }
                ),
                o = (0, W.debounce)(() => {
                  if (
                    !(
                      this.windowSize.h !== this.prevWindowSize.h ||
                      this.windowSize.w !== this.prevWindowSize.w
                    )
                  )
                    for (let a of this.coordinator.getScrollTriggers().values())
                      a.refresh();
                }, Nr),
                i = (s) => {
                  for (let a of s) a.target === document.body && (r(), o());
                };
              (this.bodyResizeObserver = new ResizeObserver(i)),
                document.body && this.bodyResizeObserver.observe(document.body);
            }
          }
          return this;
        }
        remove(e) {
          let t = Array.isArray(e) ? e : [e];
          for (let r of t) {
            if (!this.interactions.has(r)) {
              console.warn(
                `Interaction with ID ${r} not found, skipping removal.`
              );
              continue;
            }
            this.cleanupTriggerObservers(r),
              this.unbindAllTriggers(r),
              this.cleanupContinuousControlsForInteraction(r);
            let o = this.decrementTimelineReferences(r);
            this.cleanupUnusedTimelines(o),
              this.interactions.delete(r),
              this.triggeredElements.delete(r),
              this.interactionTimelineRefs.delete(r),
              this.conditionalPlaybackManager.cleanup(r);
          }
          return this;
        }
        update(e, t) {
          let r = Array.isArray(e) ? e : [e],
            o = t ? (Array.isArray(t) ? t : [t]) : [];
          o.length && this.register([], o);
          for (let i of r) {
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
          for (let [r, o] of this.coordinator.getScrollTriggers().entries())
            r.startsWith(t) &&
              (o.kill(), this.coordinator.getScrollTriggers().delete(r));
        }
        cleanupUnusedTimelines(e) {
          let t = new Set();
          for (let r of e)
            this.timelineDefs.get(r)?.reuse?.sourceTimelineId &&
              t.add(this.coordinator.resolveSourceTimelineId(r));
          for (let r of e)
            this.destroyTimelineInstance(r), this.timelineDefs.delete(r);
          for (let r of t)
            e.has(r) || this.coordinator.recomputeFlipEaseForSource(r);
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
        bindTrigger(e, t, r) {
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
            u = (0, W.toSeconds)(l),
            d = this.eventMgr,
            f = e[2],
            g = [];
          f && (g = this.resolveTargets(f, {}, t));
          let h =
              c && (0, W.isValidControlType)(c)
                ? c
                : Me.TimelineControlType.STANDARD,
            p = this.triggerStrategies.get(h);
          p
            ? p.bind(e, t, {
                interactionId: o,
                elements: g,
                triggerHandler: i,
                eventManager: d,
                conditionalContext: r,
                cleanupMap: a,
                delay: u || 0,
              })
            : console.warn("No strategy found for control type:", c),
            s.conditionalLogic && this.setupTriggerReactiveMonitoring(e, t);
        }
        setupTriggerReactiveMonitoring(e, t) {
          let { conditionalLogic: r, assignedTimelineRole: o } = e[1];
          if (!r) return;
          let i = o ? this.getTimelineIdsForRole(t, o) : void 0,
            s = `${t.id}:${t.triggers.indexOf(e)}`;
          try {
            let a = this.conditionEval.observeConditionsForTrigger(
                r.conditions,
                async () => {
                  await this.executeReactiveCallbackSafely(
                    t.id,
                    s,
                    async () => {
                      let u =
                        (await this.conditionEval.evaluateConditionsForTrigger(
                          r.conditions,
                          t
                        ))
                          ? r.ifTrue
                          : r.ifFalse;
                      if (u) {
                        if (i?.length === 0) return;
                        let d = this.triggeredElements.get(t.id);
                        if (!d) return;
                        let f = i ?? t.timelineIds ?? [],
                          g = [];
                        for (let h of d)
                          for (let p of f)
                            g.push({
                              timelineId: p,
                              element: h,
                              action: "pause-reset",
                            });
                        await this.executeTimelineOperationsAsync(g),
                          d.forEach((h) => {
                            this.executeConditionalOutcome(u, h, t, i);
                          });
                      }
                    }
                  );
                }
              ),
              l = this.triggerObservers.get(t.id);
            l || ((l = new Map()), this.triggerObservers.set(t.id, l)),
              l.set(s, a);
          } catch (a) {
            console.error("Error setting up trigger reactive monitoring:", a);
          }
        }
        async executeReactiveCallbackSafely(e, t, r) {
          this.reactiveExecutionContext.has(t) ||
            (this.pendingReactiveUpdates.set(t, r),
            this.debouncedReactiveCallback());
        }
        async processPendingReactiveUpdates() {
          if (this.pendingReactiveUpdates.size === 0) return;
          let e = new Map(this.pendingReactiveUpdates);
          this.pendingReactiveUpdates.clear();
          let t = new Map();
          for (let [r, o] of e) {
            let i = r.split(":")[0];
            t.has(i) || t.set(i, []),
              t.get(i).push({ triggerKey: r, callback: o });
          }
          for (let [r, o] of t)
            await this.processInteractionReactiveUpdates(r, o);
        }
        async processInteractionReactiveUpdates(e, t) {
          let r = this.reactiveCallbackQueues.get(e);
          if (r)
            try {
              await r;
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
          for (let { triggerKey: t, callback: r } of e) {
            this.reactiveExecutionContext.add(t);
            try {
              await r();
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
                e.forEach(({ timelineId: r, element: o, action: i }) => {
                  try {
                    if (!this.timelineDefs.has(r)) {
                      console.warn(
                        `Timeline ${r} not found, skipping operation`
                      );
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
                        this.coordinator.pause(r, o, 0);
                        break;
                      default:
                        console.warn(`Unknown timeline action: ${i}`);
                    }
                  } catch (s) {
                    console.error(
                      "Error executing timeline operation: %s, %s",
                      i,
                      r,
                      s
                    );
                  }
                }),
                  t();
              });
            });
        }
        getTimelineIdsForRole(e, t) {
          let r = e.timelineIds ?? [],
            o = r.filter(
              (i) => this.timelineDefs.get(i)?.triggerMetadata?.role === t
            );
          if (o.length === 0 && r.length > 0) {
            let i = r
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
        async runTrigger(e, t, r, o) {
          if (window.__wf_ix3) return;
          let i = e[1],
            s = this.triggeredElements.get(r);
          s || this.triggeredElements.set(r, (s = new Set())), s.add(t);
          let a = this.interactions.get(r);
          if (!a || !a.triggers.includes(e)) return;
          let l = o ?? a.timelineIds ?? [];
          if (i.conditionalLogic)
            try {
              let u = (await this.conditionEval.evaluateConditionsForTrigger(
                i.conditionalLogic.conditions,
                a
              ))
                ? i.conditionalLogic.ifTrue
                : i.conditionalLogic.ifFalse;
              u && this.executeConditionalOutcome(u, t, a, l);
            } catch (c) {
              console.error("Error evaluating trigger conditional logic:", c),
                l.forEach((u) => this.runTimelineAction(u, i, t));
            }
          else l.forEach((c) => this.runTimelineAction(c, i, t));
        }
        skipToEndState(e, t, r, o) {
          (o ?? e.timelineIds ?? []).forEach((s) => {
            let a = this.coordinator.getTimeline(s, t);
            if (!a) return;
            let l = r ? this.getEffectivePlaybackConfig(s, r).control : void 0;
            if (l === "pause" || l === "stop" || l === "none") return;
            let c;
            switch (l) {
              case "reverse":
              case "reverseFlipEase":
                c = 0;
                break;
              case "togglePlayReverse":
              case "togglePlayReverseFlipEase":
                c = Math.round(1 - a.totalProgress());
                break;
              case "resume":
                c = a.reversed() ? 0 : 1;
                break;
              case "play":
              case "restart":
              case void 0:
                c = 1;
                break;
              default: {
                let u = l;
                c = 1;
                break;
              }
            }
            this.coordinator.setTotalProgress(s, c, t ?? null);
          });
        }
        executeConditionalOutcome(e, t, r, o) {
          let {
              control: i,
              targetTimelineId: s,
              speed: a,
              jump: l,
              delay: c = 0,
            } = e,
            u = (0, W.toSeconds)(c);
          if (i === "none") return;
          let d = r.timelineIds ?? [],
            f;
          if (s) {
            if (!d.includes(s)) {
              console.warn(
                `Target timeline '${s}' not found in interaction '${
                  r.id
                }'. Available timelines: ${d.join(", ")}`
              );
              return;
            }
            f = [s];
          } else f = d;
          if (o) {
            let h = new Set(o);
            f = f.filter((p) => h.has(p));
          }
          if (f.length === 0) return;
          let g = () => {
            f.forEach((h) => {
              a !== void 0 && this.coordinator.setTimeScale(h, a, t);
              let p = (0, W.toSeconds)(l);
              switch (i) {
                case "play":
                  this.coordinator.play(h, t, p);
                  break;
                case "pause":
                  this.coordinator.pause(h, t, p);
                  break;
                case "resume":
                  this.coordinator.resume(h, t, p);
                  break;
                case "reverse":
                case "reverseFlipEase":
                  this.coordinator.reverse(h, t, p);
                  break;
                case "restart":
                  this.coordinator.restart(h, t);
                  break;
                case "stop":
                  this.coordinator.pause(h, t, p);
                  break;
                case "togglePlayReverse":
                case "togglePlayReverseFlipEase":
                  this.coordinator.togglePlayReverse(h, t);
                  break;
                default: {
                  this.coordinator.restart(h, t);
                  let y = i;
                  break;
                }
              }
            });
          };
          u
            ? setTimeout(() => {
                g();
              }, u * 1e3)
            : g();
        }
        getEffectivePlaybackConfig(e, t) {
          let r = this.timelineDefs.get(e);
          if (r?.triggerMetadata) {
            let o = r.settings;
            return {
              control: o?.control,
              delay: o?.delay,
              jump: o?.jump,
              speed: o?.speed,
            };
          }
          return {
            control: t.control,
            delay: void 0,
            jump: t.jump,
            speed: t.speed,
          };
        }
        runTimelineAction(e, t, r) {
          let {
              control: o,
              delay: i,
              jump: s,
              speed: a,
            } = this.getEffectivePlaybackConfig(e, t),
            l = this.timelineDefs.get(e);
          if (l?.reuse) {
            let d = l.reuse.sourceTimelineId;
            if (!this.timelineDefs.has(d)) {
              console.warn(
                `Timeline reuse: source '${d}' not found for '${e}'`
              );
              return;
            }
            e = d;
          }
          let c = () => {
              this.coordinator.setTimeScale(e, a ?? 1, r);
              let d = (0, W.toSeconds)(s);
              switch (o) {
                case "play":
                  this.coordinator.play(e, r, d);
                  break;
                case "pause":
                  this.coordinator.pause(e, r, d);
                  break;
                case "resume":
                  this.coordinator.resume(e, r, d);
                  break;
                case "reverse":
                case "reverseFlipEase":
                  this.coordinator.reverse(e, r, d);
                  break;
                case "restart":
                  this.coordinator.restart(e, r);
                  break;
                case "togglePlayReverse":
                case "togglePlayReverseFlipEase":
                  this.coordinator.togglePlayReverse(e, r);
                  break;
                case "stop":
                  this.coordinator.pause(e, r, d);
                  break;
                case "none":
                  break;
                case void 0:
                  this.coordinator.restart(e, r);
                  break;
                default: {
                  let f = o;
                  this.coordinator.restart(e, r);
                  break;
                }
              }
            },
            u = (0, W.toSeconds)(i);
          u && u > 0 ? setTimeout(c, u * 1e3) : c();
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
        resolveTargetsImpl(e, t, r, o) {
          let [i, s, a] = e;
          if (s === "*" && a && a.filterBy) {
            let d = this.resolveUniversalSelectorOptimized(a, t, r, o);
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
                this.resolveTargetsImpl(a.filterBy, t, r, o),
                a.firstMatchOnly
              );
        }
        resolveUniversalSelectorOptimized(e, t, r, o) {
          if (!e.filterBy) return null;
          let i = this.resolveTargetsImpl(e.filterBy, t, r, o),
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
                  let g = f.children;
                  for (let h = 0; h < g.length; h++) {
                    let p = g[h];
                    if (p !== d && !l.has(p) && (l.add(p), c.push(p), a)) break;
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
        applyRelationshipFilter(e, t, r, o) {
          if (!e.length || !r.length) return [];
          if (t === "none") return e;
          let i = [],
            s = new Set();
          switch (t) {
            case "direct-child-of": {
              let a = new Set(r);
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
              for (let l = 0; l < r.length; l++) {
                let c = r[l].parentElement;
                c && a.add(c);
              }
              for (let l = 0; l < e.length; l++) {
                let c = e[l];
                if (!s.has(c) && a.has(c) && (s.add(c), i.push(c), o)) return i;
              }
              return i;
            }
            case "next-sibling-of": {
              let a = new Set(r);
              for (let l = 0; l < e.length; l++) {
                let c = e[l];
                if (s.has(c)) continue;
                let u = c.previousElementSibling;
                if (u && a.has(u) && (s.add(c), i.push(c), o)) return i;
              }
              return i;
            }
            case "prev-sibling-of": {
              let a = new Set(r);
              for (let l = 0; l < e.length; l++) {
                let c = e[l];
                if (s.has(c)) continue;
                let u = c.nextElementSibling;
                if (u && a.has(u) && (s.add(c), i.push(c), o)) return i;
              }
              return i;
            }
            case "next-to": {
              let a = new Set(r),
                l = new Map();
              for (let c = 0; c < r.length; c++) {
                let u = r[c].parentElement;
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
              let a = new Set(r);
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
              for (let l = 0; l < r.length; l++) {
                let c = r[l].parentElement;
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
        filterByInstance(e, t, r) {
          if (!e.length) return e;
          let o = r.closest(t);
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
          let r = -1;
          for (let i = 0; i < e.length; i++)
            if (!e[i]?.closest(t)) {
              r = i;
              break;
            }
          if (r === -1) return e;
          let o = e.slice(0, r);
          for (let i = r + 1; i < e.length; i++) {
            let s = e[i];
            s?.closest(t) && o.push(s);
          }
          return o;
        }
        filterByVariant(e, t, r) {
          if (!e.length) return e;
          let o = (a) => {
              let l = a.closest(t);
              if (!l) return !1;
              let c = l.getAttribute("data-wf-variant-state");
              return c != null && r.includes(c);
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
            r = Math.max(0, t - 1);
          return this.timelineRefCounts.set(e, r), r;
        }
        decrementTimelineReferences(e) {
          let t = new Set(),
            r = this.interactionTimelineRefs.get(e);
          if (!r) return t;
          for (let o of r) this.decrementTimelineRefCount(o) === 0 && t.add(o);
          return t;
        }
        unbindAllTriggers(e) {
          let t = this.triggerCleanupFunctions.get(e);
          if (t) {
            for (let [, r] of t)
              for (let o of r)
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
            for (let [r, o] of t) {
              try {
                o();
              } catch (i) {
                console.error("Error during trigger observer cleanup:", i);
              }
              this.pendingReactiveUpdates.delete(r),
                this.reactiveExecutionContext.delete(r);
            }
            this.reactiveCallbackQueues.delete(e),
              this.triggerObservers.delete(e);
          }
        }
        cleanupContinuousControlsForInteraction(e) {
          let t = this.continuousCleanups.get(e);
          if (t) {
            for (let [, r] of t)
              try {
                r();
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
              } catch (r) {
                console.error("Error during continuous control cleanup:", r);
              }
          this.continuousCleanups.clear();
        }
        cleanupInteractionAnimations(e) {
          this.unbindAllTriggers(e),
            this.cleanupContinuousControlsForInteraction(e);
          let t = this.interactionTimelineRefs.get(e);
          if (t)
            for (let r of t)
              this.decrementTimelineRefCount(r) === 0 &&
                this.destroyTimelineInstance(r);
          this.triggeredElements.delete(e);
        }
      }),
      pe(me, "instance"),
      me);
});
var Dr = m((Lt) => {
  "use strict";
  Object.defineProperty(Lt, "__esModule", { value: !0 });
  function Js(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Js(Lt, {
    EASING_NAMES: function () {
      return ta.EASING_NAMES;
    },
    IX3: function () {
      return ea.IX3;
    },
    convertEaseConfigToGSAP: function () {
      return Lr.convertEaseConfigToGSAP;
    },
    convertEaseConfigToLinear: function () {
      return Lr.convertEaseConfigToLinear;
    },
  });
  var ea = Fr(),
    ta = ge(),
    Lr = Tt();
});
var Ae = m((Bt) => {
  "use strict";
  Object.defineProperty(Bt, "__esModule", { value: !0 });
  function na(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  na(Bt, {
    getScrollY: function () {
      return oa;
    },
    initScrollCache: function () {
      return ia;
    },
    noop: function () {
      return ra;
    },
  });
  var ra = () => {},
    Dt = 0,
    De = 0,
    ye = null;
  function ia() {
    (De += 1),
      ye ||
        ((ye = () => {
          Dt = window.scrollY;
        }),
        (Dt = window.scrollY),
        window.addEventListener("scroll", ye, { passive: !0 }));
    let n = !1;
    return () => {
      n ||
        ((n = !0),
        (De = Math.max(0, De - 1)),
        De === 0 &&
          ye &&
          (window.removeEventListener("scroll", ye), (ye = null)));
    };
  }
  function oa() {
    return Dt;
  }
});
var qt = m((Ut) => {
  "use strict";
  Object.defineProperty(Ut, "__esModule", { value: !0 });
  function sa(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  sa(Ut, {
    COMPONENT_TIMELINE_ROLES: function () {
      return Sa;
    },
    DEFAULT_MOUSE_FOLLOW_ANCHOR: function () {
      return ua;
    },
    DEFAULT_MOUSE_MOVE_INTERVAL_DISTANCE: function () {
      return da;
    },
    IX3_WF_EXTENSION_KEYS: function () {
      return jt;
    },
    MOUSE_MOVE_CHANNELS: function () {
      return Ta;
    },
    MOUSE_MOVE_TIMELINE_ROLES: function () {
      return fa;
    },
    TIMELINE_ROLE_NAMES: function () {
      return j;
    },
    TargetScope: function () {
      return Vt;
    },
    VELOCITY_CAPABLE_PROPS: function () {
      return Br;
    },
    canUseVelocityInfluenceProperty: function () {
      return ga;
    },
    getEffectiveFollowMode: function () {
      return la;
    },
    getMouseFollowConfig: function () {
      return aa;
    },
    getMouseMoveTimelineContext: function () {
      return Be;
    },
    getOppositeMouseFollowAxis: function () {
      return ya;
    },
    getSingleAxisMouseFollowMode: function () {
      return ca;
    },
    isMouseMoveIntervalRole: function () {
      return ha;
    },
    isVelocityInfluenceEnabled: function () {
      return pa;
    },
    mouseFollowAxisToRole: function () {
      return va;
    },
    mouseFollowRoleToAxis: function () {
      return ma;
    },
    mouseFollowRoleToSiblingRole: function () {
      return ba;
    },
    narrowMouseMoveIntervalPayload: function () {
      return wa;
    },
  });
  var jt;
  (function (n) {
    (n.CLASS = "wf:class"),
      (n.BODY = "wf:body"),
      (n.ID = "wf:id"),
      (n.TRIGGER_ONLY = "wf:trigger-only"),
      (n.TRIGGER_ONLY_PARENT = "wf:trigger-only-parent"),
      (n.SELECTOR = "wf:selector"),
      (n.ATTRIBUTE = "wf:attribute"),
      (n.INST = "wf:inst"),
      (n.ANY_ELEMENT = "wf:any-element"),
      (n.VIEWPORT = "wf:viewport"),
      (n.STYLE = "wf:style"),
      (n.TRANSFORM = "wf:transform"),
      (n.LOTTIE = "wf:lottie"),
      (n.SPLINE = "wf:spline"),
      (n.VARIABLE = "wf:variable"),
      (n.RIVE = "wf:rive"),
      (n.ANIMATE_RIVE = "wf:animate-rive"),
      (n.MOUSE_FOLLOW = "wf:mouse-follow"),
      (n.CLICK = "wf:click"),
      (n.HOVER = "wf:hover"),
      (n.LOAD = "wf:load"),
      (n.FOCUS = "wf:focus"),
      (n.BLUR = "wf:blur"),
      (n.SCROLL = "wf:scroll"),
      (n.CUSTOM = "wf:custom"),
      (n.CHANGE = "wf:change"),
      (n.MOUSE_MOVE = "wf:mouse-move"),
      (n.NAVBAR = "wf:navbar"),
      (n.DROPDOWN = "wf:dropdown"),
      (n.PREFERS_REDUCED_MOTION = "wf:prefersReducedMotion"),
      (n.WEBFLOW_BREAKPOINTS = "wf:webflowBreakpoints"),
      (n.CUSTOM_MEDIA_QUERY = "wf:customMediaQuery"),
      (n.COLOR_SCHEME = "wf:colorScheme"),
      (n.ELEMENT_DATA_ATTRIBUTE = "wf:elementDataAttribute"),
      (n.CURRENT_TIME = "wf:currentTime"),
      (n.ELEMENT_STATE = "wf:elementState");
  })(jt || (jt = {}));
  var Vt;
  (function (n) {
    (n.ALL = "all"),
      (n.PARENT = "parent"),
      (n.CHILDREN = "children"),
      (n.SIBLINGS = "siblings"),
      (n.NEXT = "next"),
      (n.PREVIOUS = "previous"),
      (n.FIRST_ANCESTOR = "first-ancestor"),
      (n.FIRST_DESCENDANT = "first-descendant"),
      (n.DESCENDANTS = "descendants"),
      (n.ANCESTORS = "ancestors");
  })(Vt || (Vt = {}));
  function aa(n) {
    let e = n?.properties?.["wf:mouse-follow"];
    if (!(typeof e != "object" || e === null || Array.isArray(e))) return e;
  }
  function la(n) {
    return n?.followMode ?? "full";
  }
  function ca(n) {
    return n === "x" ? "x-only" : "y-only";
  }
  var ua = "50% 50%",
    da = 100,
    j = {
      MOUSE_X: "mouseX",
      MOUSE_Y: "mouseY",
      INTERVAL: "interval",
      OPEN: "open",
      CLOSE: "close",
    };
  function Be(n) {
    return n === j.MOUSE_X
      ? { kind: "mouse-x", role: n, axis: "x", siblingRole: j.MOUSE_Y }
      : n === j.MOUSE_Y
      ? { kind: "mouse-y", role: n, axis: "y", siblingRole: j.MOUSE_X }
      : n === j.INTERVAL
      ? { kind: "interval", role: n }
      : { kind: "other", role: n ?? void 0 };
  }
  var fa = {
      MOUSE_X: { role: j.MOUSE_X, label: "Mouse X", usePercentCanvas: !0 },
      MOUSE_Y: { role: j.MOUSE_Y, label: "Mouse Y", usePercentCanvas: !0 },
      INTERVAL: { role: j.INTERVAL, label: "Interval" },
    },
    Br = new Set([
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
  function pa(n) {
    return (
      n?.pluginConfig?.type === "mouseMove" &&
      !!n.pluginConfig.velocityInfluence
    );
  }
  function ga(n) {
    return Br.has(n);
  }
  function ha(n) {
    return Be(n).kind === "interval";
  }
  function ma(n) {
    let e = Be(n);
    return e.kind === "mouse-x" || e.kind === "mouse-y" ? e.axis : null;
  }
  function ya(n) {
    return n === "x" ? "y" : "x";
  }
  function va(n) {
    return n === "x" ? j.MOUSE_X : j.MOUSE_Y;
  }
  function ba(n) {
    let e = Be(n);
    return e.kind === "mouse-x" || e.kind === "mouse-y" ? e.siblingRole : null;
  }
  var Ta = { POSITION: "wf:mouse-move:position", LEAVE: "wf:mouse-move:leave" };
  function wa(n) {
    if (typeof n != "object" || n === null) return {};
    let e = n,
      t = {},
      r = e.cursorPos;
    return (
      typeof r == "object" &&
        r !== null &&
        typeof r.x == "number" &&
        typeof r.y == "number" &&
        (t.cursorPos = { x: r.x, y: r.y }),
      typeof e.velocityFactor == "number" &&
        (t.velocityFactor = e.velocityFactor),
      typeof e.dirX == "number" && (t.dirX = e.dirX),
      typeof e.dirY == "number" && (t.dirY = e.dirY),
      t
    );
  }
  var Sa = {
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
  };
});
var $r = m((Gt) => {
  "use strict";
  Object.defineProperty(Gt, "__esModule", { value: !0 });
  function Ca(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Ca(Gt, {
    createLoadedMouseFollowActionNormalizer: function () {
      return Pa;
    },
    forTestSuite: function () {
      return xa;
    },
    getGroupedMouseFollowConfig: function () {
      return Ht;
    },
    getUnpairedMouseFollowAction: function () {
      return Aa;
    },
    getUnpairedMouseFollowConfig: function () {
      return jr;
    },
    remapMouseFollowActionGroupsInTimelines: function () {
      return Ra;
    },
    setGroupedMouseFollowActionConfig: function () {
      return Ma;
    },
    setMouseFollowActionConfig: function () {
      return Vr;
    },
    stripMouseFollowActionInstanceIds: function () {
      return Oa;
    },
    stripMouseFollowConfigInstanceIds: function () {
      return $t;
    },
  });
  var je = qt();
  function $t(n) {
    let { groupId: e, syncedActionId: t, ...r } = n;
    return r;
  }
  function Ea(n, e) {
    return { ...$t(n), groupId: e };
  }
  function Ht(n, e, t) {
    let r = Ea(n, e);
    return (
      t?.axis !== void 0 && (r.axis = t.axis),
      t?.followMode !== void 0 && (r.followMode = t.followMode),
      r
    );
  }
  function jr(n, e = n.axis) {
    let { syncedActionId: t, ...r } = n,
      o =
        r.followMode === "full" && e
          ? (0, je.getSingleAxisMouseFollowMode)(e)
          : r.followMode;
    return { ...r, ...(o !== void 0 ? { followMode: o } : {}) };
  }
  function Ve(n, e) {
    let t = (0, je.getMouseFollowConfig)(n);
    if (!t) return n;
    let r = e(t);
    return r === t
      ? n
      : {
          ...n,
          properties: {
            ...n.properties,
            [je.IX3_WF_EXTENSION_KEYS.MOUSE_FOLLOW]: r,
          },
        };
  }
  function Vr(n, e) {
    return {
      ...n,
      properties: {
        ...n.properties,
        [je.IX3_WF_EXTENSION_KEYS.MOUSE_FOLLOW]: e,
      },
    };
  }
  function Ma(n, e, t, r) {
    return Vr(n, Ht(e, t, r));
  }
  function Aa(n, e) {
    return Ve(n, (t) => jr(t, e));
  }
  function Oa(n) {
    return Ve(n, $t);
  }
  function _a(n, e, t) {
    return t[e] ? [n, e].sort().join(":") : `single:${n}`;
  }
  function Ia(n, e, t) {
    return (
      e.groupId ??
      (e.syncedActionId ? _a(n, e.syncedActionId, t) : `single:${n}`)
    );
  }
  function Ur(n, e) {
    let t = {};
    return (r, o = r.id) =>
      Ve(r, (i) => {
        let s = Ia(o, i, e),
          a = t[s] ?? n(s);
        return (t[s] = a), Ht(i, a);
      });
  }
  function qr(n, e, t) {
    let r = t ?? Object.fromEntries(n.map((i) => [i.id, i.id])),
      o = Ur(() => e(), r);
    return (i, s) => o(i, s ?? i.id);
  }
  function Ra(
    n,
    { generateGroupId: e, actionIdMap: t, mapAction: r = (o) => o }
  ) {
    let o = qr(
      n.flatMap((i) => i.actions ?? []),
      e,
      t
    );
    return n.map((i) => {
      let s = !1,
        a = i.actions?.map((l) => {
          let c = l.id,
            u = r(l),
            d = o(u, c);
          return (s = s || d !== l), d;
        });
      return s && a ? { ...i, actions: a } : i;
    });
  }
  function Pa(n) {
    let e = Object.fromEntries(n.map((r) => [r.id, r.id])),
      t = Ur((r) => r, e);
    return (r, o) => {
      let i = t(r);
      return o ? Ve(i, (s) => (s.axis ? s : { ...s, axis: o })) : i;
    };
  }
  var xa = { createMouseFollowActionGroupRemapper: qr };
});
var Gr = m((zt) => {
  "use strict";
  Object.defineProperty(zt, "__esModule", { value: !0 });
  function ka(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  ka(zt, {
    TRANSIENT_IX3_CLONE_ATTR: function () {
      return Hr;
    },
    isTransientIX3Clone: function () {
      return Na;
    },
  });
  var Hr = "data-ix3-clone",
    Na = (n) => !!n.closest?.(`[${Hr}]`);
});
var ne = m((ve) => {
  "use strict";
  Object.defineProperty(ve, "__esModule", { value: !0 });
  Object.defineProperty(ve, "CORE_PLUGIN_INFO", {
    enumerable: !0,
    get: function () {
      return Fa;
    },
  });
  Wt(qt(), ve);
  Wt($r(), ve);
  Wt(Gr(), ve);
  function Wt(n, e) {
    return (
      Object.keys(n).forEach(function (t) {
        t !== "default" &&
          !Object.prototype.hasOwnProperty.call(e, t) &&
          Object.defineProperty(e, t, {
            enumerable: !0,
            get: function () {
              return n[t];
            },
          });
      }),
      n
    );
  }
  var Fa = { namespace: "wf", pluginId: "core", version: "1.0.0" };
});
var Wr = m((Yt) => {
  "use strict";
  Object.defineProperty(Yt, "__esModule", { value: !0 });
  Object.defineProperty(Yt, "TouchScrollGuard", {
    enumerable: !0,
    get: function () {
      return Da;
    },
  });
  var zr = Ae();
  function La(n) {
    let e = n;
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
  var Da = class {
    isScrolling = !1;
    toleranceDeg;
    refX = 0;
    refY = 0;
    lastY = 0;
    locked = null;
    effectFromBoundary = !1;
    scroller = null;
    maxScroll = 0;
    constructor(e, t, r) {
      this.toleranceDeg = r?.tolerance ?? 18;
      let o = (0, zr.initScrollCache)();
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
            (this.scroller = La(l.target ?? e)),
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
            g = u > this.lastY,
            h = u < this.lastY,
            p = this.scroller ? this.scroller.scrollTop : (0, zr.getScrollY)(),
            y = this.maxScroll,
            T = p <= 1 && g,
            A = y > 0 && p >= y - 1 && h;
          this.locked === null && this.decide(d, f, T || A),
            this.locked === "scroll" &&
              (T || A) &&
              ((this.refX = c.clientX),
              (this.refY = u),
              (this.locked = "effect"),
              (this.effectFromBoundary = !0)),
            this.locked === "effect" &&
              this.effectFromBoundary &&
              !(T || A) &&
              ((this.refX = c.clientX),
              (this.refY = u),
              (this.locked = null),
              (this.effectFromBoundary = !1)),
            (this.lastY = u),
            (this.isScrolling =
              this.locked === "scroll" ||
              this.locked === null ||
              (this.locked === "effect" && !l.cancelable && !(T || A))),
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
    decide(e, t, r) {
      if (Math.abs(e) < 10 && Math.abs(t) < 10) return;
      Math.atan2(Math.abs(e), Math.abs(t)) * (180 / Math.PI) > this.toleranceDeg
        ? ((this.locked = "effect"), (this.effectFromBoundary = !1))
        : r
        ? ((this.locked = "effect"), (this.effectFromBoundary = !0))
        : (this.locked = "scroll");
    }
  };
});
var Yr = m((Xt) => {
  "use strict";
  Object.defineProperty(Xt, "__esModule", { value: !0 });
  Object.defineProperty(Xt, "VelocityController", {
    enumerable: !0,
    get: function () {
      return qa;
    },
  });
  var Ba = {
    adaptiveMax: 2800,
    adaptAlpha: 0.05,
    adaptDecay: 0.99,
    hardMin: 600,
    hardMax: 4e3,
  };
  function ja(n, e) {
    let t = Math.max(e.hardMin, Math.min(e.hardMax, n));
    (e.adaptiveMax = Math.max(t, e.adaptiveMax * e.adaptDecay)),
      (e.adaptiveMax += (t - e.adaptiveMax) * e.adaptAlpha),
      (e.adaptiveMax = Math.max(e.hardMin, Math.min(e.hardMax, e.adaptiveMax)));
  }
  var Va = (n) => n * n;
  function Ua(n, e, t, r) {
    let o = Math.hypot(n, e);
    ja(o, t);
    let i = Math.max(1, t.adaptiveMax),
      s = Va(Math.min(1, o / i)),
      a = 0,
      l = 0;
    return (
      r.x && r.y
        ? o > 0 && ((a = n / o), (l = e / o))
        : r.x
        ? n !== 0 && (a = Math.sign(n))
        : r.y && e !== 0 && (l = Math.sign(e)),
      { n: s, dirX: a, dirY: l }
    );
  }
  var qa = class {
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
        (this.velState = { ...Ba }),
        (this.lastDirX = 0),
        (this.lastDirY = 0),
        (this.lastNormVelocity = 0);
    }
    update(e, t) {
      let {
        n: r,
        dirX: o,
        dirY: i,
      } = Ua(e, t, this.velState, this.config.axes);
      (this.lastNormVelocity = r), (this.lastDirX = o), (this.lastDirY = i);
    }
    reset() {
      (this.lastDirX = 0), (this.lastDirY = 0), (this.lastNormVelocity = 0);
    }
    destroy() {
      this.reset();
    }
  };
});
var Xr = m((Zt) => {
  "use strict";
  Object.defineProperty(Zt, "__esModule", { value: !0 });
  Object.defineProperty(Zt, "IntervalController", {
    enumerable: !0,
    get: function () {
      return Ga;
    },
  });
  var $a = ne(),
    Ha = 16,
    Ga = class {
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
        let { x: t, y: r, velocityFactor: o, dirX: i, dirY: s } = e;
        if (!this.initialized) {
          (this.lastX = t), (this.lastY = r), (this.initialized = !0);
          return;
        }
        let a = t - this.lastX,
          l = r - this.lastY;
        (this.lastX = t), (this.lastY = r);
        let { axes: c, distance: u } = this.config;
        c.x && c.y
          ? (this.accum += Math.hypot(a, l))
          : c.x
          ? (this.accum += Math.abs(a))
          : c.y && (this.accum += Math.abs(l));
        let d = 0;
        for (; this.accum >= u && d < Ha; ) {
          this.accum -= u;
          let f = {
            cursorPos: { x: t, y: r },
            velocityFactor: o,
            dirX: i,
            dirY: s,
          };
          this.config.channelManager.fireInterval?.(
            $a.TIMELINE_ROLE_NAMES.INTERVAL,
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
var Ue = m((Qt) => {
  "use strict";
  Object.defineProperty(Qt, "__esModule", { value: !0 });
  function za(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  za(Qt, {
    TRANSIENT_IX3_CLONE_ATTR: function () {
      return Zr.TRANSIENT_IX3_CLONE_ATTR;
    },
    isTransientIX3Clone: function () {
      return Zr.isTransientIX3Clone;
    },
  });
  var Zr = ne();
});
var ii = m((Jt) => {
  "use strict";
  Object.defineProperty(Jt, "__esModule", { value: !0 });
  Object.defineProperty(Jt, "fireMouseMoveInterval", {
    enumerable: !0,
    get: function () {
      return sl;
    },
  });
  var Wa = ne(),
    ri = Ue(),
    Kt = new Set(["x", "y"]),
    Ya = new Set(["scale", "scaleX", "scaleY"]),
    Qr = new WeakMap(),
    Kr = new WeakMap();
  function Xa(n) {
    let e = Qr.get(n);
    return (
      e ||
        ((e = {
          activeIntervalEls: new Map(),
          intervalClones: new Set(),
          baselineValues: new Map(),
        }),
        Qr.set(n, e)),
      e
    );
  }
  function Za(n, e, t, r) {
    let o = Kr.get(n);
    o || ((o = new Set()), Kr.set(n, o)),
      !o.has(t) &&
        (o.add(t),
        r(() => {
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
  function Jr(n) {
    if (n)
      for (let e in n) {
        if (!Kt.has(e)) continue;
        let t = n[e];
        (typeof t == "string" && (t.startsWith("+=") || t.startsWith("-="))) ||
          ((typeof t == "number" || typeof t == "string") && (n[e] = `+=${t}`));
      }
  }
  var Qa = /^random\((.*)\)([a-z%]*)$/i,
    Ka = /^-?\d*\.?\d+$/;
  function Ja(n, e) {
    let t = Qa.exec(n);
    if (!t) return null;
    let r = t[1] ?? "",
      o = t[2] ?? "",
      i = r.startsWith("[") && r.endsWith("]"),
      a = (i ? r.slice(1, -1) : r).split(",").map((c) => c.trim());
    if (!a.every((c) => Ka.test(c))) return null;
    let l = a
      .map((c, u) => {
        let d = Number(c);
        return !i && u >= 2 ? Math.abs(e(d) - e(0)) : e(d);
      })
      .join(", ");
    return `random(${i ? `[${l}]` : l})${o}`;
  }
  function ei(n, e, t, r) {
    if (n)
      for (let o in n) {
        let i = n[o];
        if (typeof i != "number" && typeof i != "string") continue;
        let s = !1,
          a = typeof i == "string" ? i : "";
        typeof i == "string" &&
          (i.startsWith("+=") || i.startsWith("-=")) &&
          ((s = !0), (a = (i.startsWith("-=") ? "-" : "") + i.slice(2)));
        let l, c;
        if (Kt.has(o)) {
          let g = o === "y" ? r : t;
          (l = (h) => h * e * g), (c = !0);
        } else if (o === "rotation") {
          let g = Math.abs(t) >= Math.abs(r) ? t : -r;
          (l = (h) => h * e * g), (c = s);
        } else
          Ya.has(o)
            ? ((l = s ? (g) => g * e : (g) => 1 + (g - 1) * e), (c = s))
            : ((l = (g) => g * e), (c = s));
        if (typeof i == "string" && a.startsWith("random(")) {
          let g = Ja(a, l);
          if (g == null) continue;
          n[o] = c ? `+=${g}` : g;
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
        n[o] = c ? `+=${f}${d}` : f;
      }
  }
  function el(n, e) {
    let t = n.getOneShotTimelineContext(e),
      r = t?.timelineDef;
    if (!t || !r?.actions?.length) return null;
    let o = r.triggerMetadata,
      i = o?.pluginConfig?.type === "mouseMove" ? o.pluginConfig : void 0;
    return o?.role !== "interval" && !i
      ? null
      : {
          oneShot: t,
          mouseMoveMeta: i ?? { type: "mouseMove" },
          axes: o?.axes,
        };
  }
  function tl(n, e, t, r, o) {
    let i = n.cloneNode(!0);
    i.removeAttribute("style"),
      i.removeAttribute("id"),
      i.removeAttribute("data-w-id"),
      i.setAttribute(ri.TRANSIENT_IX3_CLONE_ATTR, "true"),
      (i.style.position = "absolute"),
      (i.style.margin = "0"),
      (i.style.pointerEvents = "none"),
      n.insertAdjacentElement("beforebegin", i);
    let s = e.baselineValues.get(o)?.get(n);
    return s && r.set(i, { ...s }), e.intervalClones.add(i), t.add(i), i;
  }
  function nl(n, e) {
    let t = [],
      r = new Set();
    for (let o of n.timelineDef.actions)
      for (let i in o.properties) {
        let s = n.getActionTweenConfig(o, i, [e]);
        if (s) {
          for (let a of [s.to, s.from])
            if (a)
              for (let l of Object.keys(a)) Kt.has(l) ? t.push(l) : r.add(l);
        }
      }
    return { clearProps: t, baselineProps: r };
  }
  function rl(n, e, t, r, o) {
    let { clearProps: i, baselineProps: s } = nl(n, t);
    if (s.size > 0) {
      let a = {};
      for (let c of s) a[c] = e.getProperty(t, c);
      let l = r.baselineValues.get(o);
      l || ((l = new WeakMap()), r.baselineValues.set(o, l)), l.set(t, a);
    }
    i.length !== 0 && e.set(t, { clearProps: i.join(",") });
  }
  function il(n, e, t) {
    return (r, o, i) => {
      (
        o.pluginConfig?.type === "mouseMove"
          ? o.pluginConfig.velocityInfluence
          : !1
      )
        ? n != null && (ei(i.to, n, e, t), i.from && ei(i.from, n, e, t))
        : (Jr(i.to), i.from && Jr(i.from));
    };
  }
  function ol(n, e, t, r, o, i, s, a) {
    let [l] = t;
    if (l && (n.set(l, { zIndex: r + 1 + o }, 0), !(!i || (!s && !a))))
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
        n.set(c, d, 0);
      }
  }
  function ti(n) {
    for (let e of n) e();
    n.clear();
  }
  function ni(n, e, t) {
    n.activeIntervalEls.get(e)?.delete(t),
      n.intervalClones.has(t) &&
        (t.isConnected && t.remove(), n.intervalClones.delete(t));
  }
  var sl = ({
    coordinator: n,
    timelineId: e,
    element: t,
    options: r,
    animation: o,
  }) => {
    if (!o.hasGsap()) return;
    let i = r.targetIndex;
    if (i == null) return;
    let s = el(n, e);
    if (!s) return;
    let { oneShot: a, mouseMoveMeta: l, axes: c } = s,
      u = Xa(n),
      d = a
        .getFirstActionTargets(t)
        .filter((V) => !(0, ri.isTransientIX3Clone)(V));
    if (!d.length) return;
    let f = [d[i % d.length]],
      g = f,
      h = f[0],
      p = u.activeIntervalEls.get(e);
    p || ((p = new Set()), u.activeIntervalEls.set(e, p)),
      p.has(h) ? (g = [tl(h, u, p, o, e)]) : (rl(a, o, h, u, e), p.add(h));
    let y = g[0],
      T = c?.x === !1 && c?.y === !1,
      A = T || (c?.x ?? l?.setMouseX ?? !0),
      C = T || (c?.y ?? l?.setMouseY ?? !0),
      M = (0, Wa.narrowMouseMoveIntervalPayload)(r.pluginPayload),
      b = M.cursorPos,
      v = M.velocityFactor,
      w = M.dirX ?? 0,
      I = M.dirY ?? 0,
      E = new Set(),
      P = a.buildActionTimeline({
        targets: g,
        cleanupBucket: E,
        varsTransform: il(v, w, I),
        beforeTweens: (V) => {
          ol(V, o, g, d.length, i, b, A, C);
        },
      });
    if (!P) {
      ti(E), ni(u, e, y);
      return;
    }
    let z = null,
      R = !1,
      O = (V) => {
        R || ((R = !0), z?.(), V && P.kill(), ti(E), ni(u, e, y));
      };
    (z = a.registerCleanup(() => O(!0))),
      P.eventCallback("onComplete", () => {
        O(!1);
      }),
      Za(n, u, e, a.registerCleanup);
  };
});
var ui = m((nn) => {
  "use strict";
  Object.defineProperty(nn, "__esModule", { value: !0 });
  Object.defineProperty(nn, "buildMouseMove", {
    enumerable: !0,
    get: function () {
      return ml;
    },
  });
  var re = ne(),
    Oe = Ae(),
    al = Wr(),
    ll = Yr(),
    cl = Xr(),
    ul = ii(),
    dl = 50,
    oi = 50,
    en = null;
  function fl() {
    return (
      en === null &&
        (en = "ontouchstart" in window || navigator.maxTouchPoints > 0),
      en
    );
  }
  var li = 0,
    ci = 0,
    qe = 0,
    ae = null;
  function pl() {
    (qe += 1),
      ae ||
        ((ae = () => {
          (li = window.innerWidth), (ci = window.innerHeight);
        }),
        ae(),
        window.addEventListener("resize", ae));
    let n = !1;
    return () => {
      n ||
        ((n = !0),
        (qe = Math.max(0, qe - 1)),
        qe === 0 &&
          ae &&
          (window.removeEventListener("resize", ae), (ae = null)));
    };
  }
  var $e = (n) => Math.max(0, Math.min(1, n));
  function gl(n, e, t) {
    return e === t || n === t || (n < t && e > t) || (n > t && e < t);
  }
  function _e(n, e, t) {
    let r = n.tween;
    (n.tween = null),
      (n.takeoverTarget = null),
      (n.proxy.value = e),
      (n.lastValue = e),
      n.channel?.setProgress(e),
      t && r?.kill();
  }
  function si(n, e) {
    if (n.tween) {
      if (n.proxy.value === e) {
        _e(n, e, !0);
        return;
      }
      let t = n.tweenTarget - n.proxy.value,
        r = e - n.proxy.value;
      if (t * r < 0) {
        _e(n, e, !0);
        return;
      }
      n.takeoverTarget = e;
      return;
    }
    (n.proxy.value = e), (n.lastValue = e), n.channel?.setProgress(e);
  }
  function tn(n) {
    let e = n.tween;
    (n.tween = null), (n.takeoverTarget = null), e?.kill();
  }
  function ai(n, e, t, r) {
    tn(e), (e.lastValue = e.proxy.value), (e.tweenTarget = t);
    let o = n.to(e.proxy, {
      value: t,
      duration: r,
      ease: "power2.out",
      onUpdate: () => {
        let i = e.proxy.value,
          s = e.takeoverTarget;
        if (s != null && gl(e.lastValue, i, s)) {
          _e(e, s, !0);
          return;
        }
        (e.lastValue = i), e.channel?.setImmediate(i);
      },
      onComplete: () => {
        let i = e.takeoverTarget;
        (e.tween = null), (e.takeoverTarget = null), i != null && _e(e, i, !1);
      },
    });
    if (!o) {
      _e(e, t, !1);
      return;
    }
    e.tween = o;
  }
  function hl(n, e, t, r) {
    let o = Math.abs(t - n),
      i = Math.abs(r - e),
      s = Math.max(o, i);
    return 0.1 + Math.min(s / 0.5, 1) * 0.5;
  }
  function ml(n) {
    n.addTrigger("mouse-move", (e, t, r, o) => {
      let i = e[1].pluginConfig,
        s = e[2]?.[0] === re.IX3_WF_EXTENSION_KEYS.VIEWPORT;
      return (
        o({
          type: "continuous",
          setup: (a) => {
            let { animation: l } = a;
            if (!l.hasGsap() || !l.hasObserver()) return Oe.noop;
            let c = s ? pl() : Oe.noop;
            a.registerIntervalHandler(
              re.IX3_WF_EXTENSION_KEYS.MOUSE_MOVE,
              ul.fireMouseMoveInterval
            );
            let u = i?.smoothness ?? dl,
              d = (i?.restingState?.x ?? oi) / 100,
              f = (i?.restingState?.y ?? oi) / 100,
              g = a.registerChannel({
                role: re.TIMELINE_ROLE_NAMES.MOUSE_X,
                initialValue: d,
                element: t,
                smoothing: u,
              }),
              h = a.registerChannel({
                role: re.TIMELINE_ROLE_NAMES.MOUSE_Y,
                initialValue: f,
                element: t,
                smoothing: u,
              }),
              p = new AbortController(),
              { signal: y } = p,
              T = a.getMetadata(re.TIMELINE_ROLE_NAMES.INTERVAL),
              A = {
                x: T?.axes?.x !== !1 || T?.axes?.y === !1,
                y: T?.axes?.y !== !1 || T?.axes?.x === !1,
              },
              C = T
                ? new cl.IntervalController({
                    distance:
                      T.distance ?? re.DEFAULT_MOUSE_MOVE_INTERVAL_DISTANCE,
                    axes: A,
                    channelManager: a,
                    element: t,
                    signal: y,
                  })
                : null,
              M = C ? new ll.VelocityController({ axes: A }) : null,
              b = {
                proxy: { value: d },
                channel: g,
                tween: null,
                takeoverTarget: null,
                lastValue: d,
                tweenTarget: d,
              },
              v = {
                proxy: { value: f },
                channel: h,
                tween: null,
                takeoverTarget: null,
                lastValue: f,
                tweenTarget: f,
              },
              w = !1,
              I = (N, $) => {
                let H = hl(b.proxy.value, v.proxy.value, N, $);
                ai(l, b, N, H), ai(l, v, $, H);
              },
              E = fl(),
              P = s ? document.documentElement : t,
              z = null;
            E && (z = new al.TouchScrollGuard(P, y));
            let R = null,
              O = () => {
                R = null;
              },
              V = () => (R || (R = t.getBoundingClientRect()), R);
            if (!s) {
              let N = new ResizeObserver(O);
              N.observe(t),
                y.addEventListener("abort", () => N.disconnect()),
                window.addEventListener("scroll", O, {
                  passive: !0,
                  capture: !0,
                  signal: y,
                }),
                window.visualViewport &&
                  window.visualViewport.addEventListener("resize", O, {
                    signal: y,
                  });
            }
            let ee;
            try {
              if (
                ((ee = l.createObserver({
                  target: P,
                  type: E ? "pointer,touch" : "pointer",
                  tolerance: 0,
                  onMove: (N) => {
                    if (z?.isScrolling || !a.isPreviewEnabled()) return;
                    let $ = N.x ?? 0,
                      H = N.y ?? 0,
                      G,
                      de;
                    if (s)
                      (G = $e($ / Math.max(1, li))),
                        (de = $e(H / Math.max(1, ci)));
                    else {
                      let X = V();
                      (G = $e(($ - X.left) / Math.max(1, X.width))),
                        (de = $e((H - X.top) / Math.max(1, X.height)));
                    }
                    w ? (si(b, G), si(v, de)) : ((w = !0), I(G, de)),
                      a.publishChannel(
                        re.MOUSE_MOVE_CHANNELS.POSITION,
                        { x: $, y: H, triggerEl: t, isViewport: s },
                        t
                      ),
                      M &&
                        (M.update(N.velocityX, N.velocityY),
                        C.update({
                          x: $,
                          y: H,
                          velocityFactor: M.lastNormVelocity,
                          dirX: M.dirX,
                          dirY: M.dirY,
                        }));
                  },
                })),
                !ee)
              )
                return C?.destroy(), M?.destroy(), p.abort(), c(), Oe.noop;
            } catch {
              return C?.destroy(), M?.destroy(), p.abort(), c(), Oe.noop;
            }
            let q = () => {
              a.isPreviewEnabled() &&
                ((w = !1),
                I(d, f),
                M?.reset(),
                a.publishChannel(re.MOUSE_MOVE_CHANNELS.LEAVE, void 0, t),
                C?.reset());
            };
            return (
              s
                ? (P.addEventListener("mouseleave", q, { signal: y }),
                  window.addEventListener("blur", q, { signal: y }))
                : t.addEventListener("mouseleave", q, { signal: y }),
              P.addEventListener("touchend", q, { signal: y, passive: !0 }),
              P.addEventListener("touchcancel", q, { signal: y, passive: !0 }),
              () => {
                ee.kill(),
                  p.abort(),
                  tn(b),
                  tn(v),
                  C?.destroy(),
                  M?.destroy(),
                  c();
              }
            );
          },
        }),
        Oe.noop
      );
    });
  }
});
var fi = m((rn) => {
  "use strict";
  Object.defineProperty(rn, "__esModule", { value: !0 });
  Object.defineProperty(rn, "build", {
    enumerable: !0,
    get: function () {
      return vl;
    },
  });
  var Ie = Ae(),
    yl = ui();
  function vl(n) {
    bl(n),
      Tl(n),
      (0, yl.buildMouseMove)(n),
      wl(n),
      Sl(n),
      n.addTrigger("load", (e, t, r, o) => {
        let i = e[1],
          s = !1,
          a = () => {
            s || ((s = !0), o({ target: t }));
          };
        switch (i.pluginConfig?.triggerPoint) {
          case "immediate":
            return a(), Ie.noop;
          case "fullyLoaded":
            return document.readyState === "complete"
              ? (a(), Ie.noop)
              : r.addEventListener(window, "load", a);
          case "DOMContentLoaded":
          default:
            return document.readyState === "complete" ||
              document.readyState === "interactive"
              ? (a(), Ie.noop)
              : r.addEventListener(document, "DOMContentLoaded", a);
        }
      }),
      n.addTrigger("focus", (e, t, r, o) => {
        let i = e[1];
        return r.addEventListener(
          t,
          i.pluginConfig?.useFocusWithin ? "focusin" : "focus",
          o,
          { delegate: !i.pluginConfig?.useFocusWithin }
        );
      }),
      n.addTrigger("blur", (e, t, r, o) => {
        let i = e[1];
        return r.addEventListener(
          t,
          i.pluginConfig?.useFocusWithin ? "focusout" : "blur",
          o,
          { delegate: !i.pluginConfig?.useFocusWithin }
        );
      }),
      n.addTrigger("scroll", (e, t, r, o) => (o({ target: t }), Ie.noop)),
      n.addTrigger("custom", (e, t, r, o) => {
        let s = e[1].pluginConfig?.eventName;
        return s
          ? r.addEventListener(t, s, o, { delegate: !1, kind: "custom" })
          : Ie.noop;
      }),
      n.addTrigger("change", (e, t, r, o) =>
        r.addEventListener(t, "change", o)
      );
  }
  function bl(n) {
    let e = new WeakMap();
    n.addTrigger("click", (t, r, o, i) => {
      let [, s] = t,
        a = o.addEventListener(
          r,
          "click",
          (l) => {
            let c = s.pluginConfig?.click,
              u = e.get(r) || new WeakMap();
            e.set(r, u);
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
                let g = s.pluginConfig?.custom;
                g && f === g && i(l);
                break;
              }
              default:
                i(l);
            }
          },
          { delegate: !0 }
        );
      return () => {
        a(), e.delete(r);
      };
    });
  }
  function Tl(n) {
    let e = new WeakMap();
    n.addTrigger("hover", (t, r, o, i) => {
      let [, s] = t,
        a = [],
        l = (c, u) => {
          if ((s.pluginConfig?.type ?? "mouseenter") !== u) return;
          let f = s.pluginConfig?.hover || "each",
            g = e.get(r) || new Map();
          e.set(r, g);
          let p = (g.get(u) || 0) + 1;
          switch ((g.set(u, p), f)) {
            case "each": {
              i(c);
              break;
            }
            case "first": {
              p === 1 && i(c);
              break;
            }
            case "second": {
              p === 2 && i(c);
              break;
            }
            case "odd": {
              p % 2 === 1 && i(c);
              break;
            }
            case "even": {
              p % 2 === 0 && i(c);
              break;
            }
            case "custom": {
              let y = s.pluginConfig?.custom;
              y && p === y && i(c);
              break;
            }
            default:
              i(c);
          }
        };
      return (
        a.push(
          o.addEventListener(r, "mouseenter", (c) => {
            l(c, "mouseenter");
          })
        ),
        a.push(
          o.addEventListener(r, "mouseover", (c) => {
            l(c, "mouseover");
          })
        ),
        a.push(
          o.addEventListener(r, "mouseleave", (c) => {
            l(c, "mouseleave");
          })
        ),
        () => {
          a.forEach((c) => c()), (a.length = 0), e.delete(r);
        }
      );
    });
  }
  function di(n, e) {
    n.addTrigger(e, (t, r, o, i) => {
      let s = t[1].pluginConfig?.event,
        a = "IX3_COMPONENT_STATE_CHANGE";
      return o.addEventListener(r, a, (l) => {
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
  function wl(n) {
    di(n, "navbar");
  }
  function Sl(n) {
    di(n, "dropdown");
  }
});
var be = m((on) => {
  "use strict";
  Object.defineProperty(on, "__esModule", { value: !0 });
  function Cl(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Cl(on, {
    resolveToNumber: function () {
      return El;
    },
    resolveToString: function () {
      return Ml;
    },
  });
  function El(n, e) {
    if (typeof n == "number") return n;
    if (typeof n == "string") {
      let t = n;
      if (t.startsWith("var(")) {
        let o = t.slice(4, -1).split(",")[0]?.trim() ?? "";
        if (!o || ((t = getComputedStyle(e).getPropertyValue(o).trim()), !t))
          return;
      }
      let r = parseFloat(t);
      return isNaN(r) ? void 0 : r;
    }
  }
  function Ml(n, e) {
    if (typeof n == "string") {
      if (n.startsWith("var(")) {
        let t = n.slice(4, -1).split(",")[0]?.trim() ?? "";
        return (t && getComputedStyle(e).getPropertyValue(t).trim()) || void 0;
      }
      return n;
    }
  }
});
var mi = m((ln) => {
  "use strict";
  Object.defineProperty(ln, "__esModule", { value: !0 });
  function Al(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Al(ln, {
    buildMouseFollowAction: function () {
      return xl;
    },
    forTestSuite: function () {
      return Rl;
    },
  });
  var sn = ne(),
    He = Ae(),
    Ol = 0.5,
    Ge = 50;
  function _l(n) {
    let e = 2166136261;
    for (let t = 0; t < n.length; t++)
      (e ^= n.charCodeAt(t)), (e = Math.imul(e, 16777619));
    return e >>> 0;
  }
  function Il(n) {
    let e = n >>> 0;
    return () => {
      e = (e + 1831565813) | 0;
      let t = Math.imul(e ^ (e >>> 15), 1 | e);
      return (
        (t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)),
        ((t ^ (t >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  function pi(n, e, t) {
    if (n <= 1) return [0];
    if (typeof e == "number") {
      let r = Math.max(0, Math.min(n - 1, Math.floor(e))),
        o = [r];
      for (let i = 1; o.length < n; i++)
        r + i < n && o.push(r + i), r - i >= 0 && o.push(r - i);
      return o;
    }
    switch (e) {
      case "start":
        return Array.from({ length: n }, (r, o) => o);
      case "center": {
        let r = [],
          o = Math.floor((n - 1) / 2);
        r.push(o);
        for (let i = 1; r.length < n; i++)
          o + i < n && r.push(o + i), o - i >= 0 && r.push(o - i);
        return r;
      }
      case "random": {
        let r = t != null && t !== "" ? Il(_l(t)) : Math.random,
          o = Array.from({ length: n }, (i, s) => s);
        for (let i = n - 1; i > 0; i--) {
          let s = Math.floor(r() * (i + 1));
          [o[i], o[s]] = [o[s], o[i]];
        }
        return o;
      }
      case "edges": {
        let r = [],
          o = 0,
          i = n - 1;
        for (; o <= i; ) r.push(o), o !== i && r.push(i), o++, i--;
        return r;
      }
      case "end":
      default:
        return Array.from({ length: n }, (r, o) => n - 1 - o);
    }
  }
  function an(n) {
    if (n == null) return Ge;
    let e = typeof n == "number" ? n * 1e3 : parseFloat(n);
    return Number.isFinite(e) && e >= 0 ? e : Ge;
  }
  var Re = (n) => {
      if (typeof n != "string") return 0.5;
      let e = /^(-?\d+(?:\.\d+)?)%$/.exec(n.trim());
      if (e) return Math.max(0, Math.min(1, parseFloat(e[1]) / 100));
      let t = n.trim().toLowerCase();
      return t === "left" || t === "top"
        ? 0
        : t === "right" || t === "bottom"
        ? 1
        : 0.5;
    },
    gi = (n, e) => {
      if (n?.amount != null) {
        let t = an(n.amount),
          r = e > 1 ? t / (e - 1) : Ge;
        return Math.max(1, r);
      }
      return n?.each != null ? Math.max(1, an(n.each)) : 1;
    },
    hi = (n) => {
      if (!n) return { x: 0.5, y: 0.5 };
      if (typeof n == "string") {
        let [e, t] = n.trim().split(/\s+/);
        return { x: Re(e ?? "50%"), y: Re(t ?? "50%") };
      }
      return { x: Re(n.x), y: Re(n.y) };
    },
    Rl = {
      DEFAULT_STAGGER_MS: Ge,
      computeMouseFollowSmoothingMs: gi,
      getChainOrder: pi,
      parseAnchor: hi,
      parseAnchorAxis: Re,
      staggerEachToMs: an,
    };
  function Pl(n, e, t, r) {
    if (!t.length) return;
    let o = r?.animation;
    if (!o?.hasGsap()) return;
    let i =
        typeof window < "u" &&
        typeof window.matchMedia == "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      s = e,
      a = s?.leaveBehavior ?? "return",
      l = s?.onEnter ?? "animate",
      c = r?.timelineRole,
      u = c === "mouseX" ? "x" : c === "mouseY" ? "y" : s?.axis ?? "x",
      d = u,
      f = s?.followMode;
    if (
      f != null &&
      f !== "full" &&
      f !== (0, sn.getSingleAxisMouseFollowMode)(u)
    )
      return;
    let g = hi(s?.anchor),
      h = u === "x" ? g.x : g.y,
      p = t.map((S) => o.getProperty(S, d)),
      y = t.map((S) => o.quickSetter(S, d, "px"));
    if (y.some((S) => S == null)) return;
    let T = y,
      A = (0, He.initScrollCache)(),
      C = t.map((S) => {
        let _ = S.getBoundingClientRect();
        return u === "x"
          ? _.left + _.width * h
          : _.top + _.height * h + (0, He.getScrollY)();
      }),
      M = n.timing?.stagger,
      b = t.length,
      v = gi(M, b),
      w = M?.from,
      E = pi(
        b,
        typeof w == "number" ||
          w === "start" ||
          w === "center" ||
          w === "edges" ||
          w === "end" ||
          w === "random"
          ? w
          : "end",
        s?.groupId ?? s?.syncedActionId
      );
    if (E.length === 0) return;
    let P = new Float64Array(b),
      z = E[0],
      R = { value: C[z] ?? 0 },
      O = null,
      V = !1,
      ee = 0,
      q = null,
      N = !1,
      $ = null,
      H = performance.now(),
      G = 0,
      de = () => {
        let S = performance.now(),
          _ = Math.min(S - H, 100);
        H = S;
        let B = 1 - Math.exp(-_ / v),
          F = !1;
        for (let L = 0; L < E.length; L++) {
          let k = E[L],
            fe;
          if (L === 0) fe = R.value;
          else {
            let sr = E[L - 1];
            fe = C[sr] + P[sr];
          }
          let or = fe - C[k],
            st = or - P[k];
          Math.abs(st) > Ol
            ? ((P[k] = P[k] + st * B), T[k](P[k]), (F = !0))
            : st !== 0 && ((P[k] = or), T[k](P[k]));
        }
        O?.isActive() && (F = !0), F || X();
      },
      X = () => {
        N && ($?.(), ($ = null), (N = !1));
      },
      rr = (S) => {
        O?.kill(), (O = null), (G = 0), (R.value = S);
        for (let _ = 0; _ < E.length; _++) {
          let B = E[_],
            F = S - C[B];
          (P[B] = F), T[B](F);
        }
        X();
      },
      To = () => {
        O?.kill(), (O = null), (G = 0), (R.value = C[z] ?? 0);
        for (let S = 0; S < E.length; S++) {
          let _ = E[S];
          (P[_] = 0), T[_](0);
        }
        X();
      },
      te = () => {
        N || ((H = performance.now()), ($ = o.addTicker(de)), (N = !0));
      },
      wo = (S, _) => {
        (q = S),
          (ee = _
            ? u === "x"
              ? window.innerWidth
              : window.innerHeight
            : u === "x"
            ? S.offsetWidth
            : S.offsetHeight);
      },
      So = (S) => {
        q || wo(S.triggerEl, S.isViewport);
        let _ = u === "x" ? S.x : S.y + (0, He.getScrollY)();
        if (i) {
          (V = !0), rr(_);
          return;
        }
        if (V)
          if (O) {
            let B = Math.max(G - performance.now(), 50);
            O.kill();
            let F = o.to(R, {
              value: _,
              duration: B / 1e3,
              ease: "power2.out",
              onUpdate: te,
              onComplete: () => {
                O === F && ((O = null), (G = 0));
              },
            });
            if (!F) {
              (R.value = _), te();
              return;
            }
            O = F;
          } else R.value = _;
        else {
          if (((V = !0), l === "snap")) {
            rr(_);
            return;
          }
          let B = Math.abs(_ - R.value),
            L = 0.1 + Math.min(B / (ee || 1), 1) * 0.5;
          (G = performance.now() + L * 1e3), O?.kill();
          let k = o.to(R, {
            value: _,
            duration: L,
            ease: "power2.out",
            onUpdate: te,
            onComplete: () => {
              O === k && ((O = null), (G = 0));
            },
          });
          if (!k) {
            (R.value = _), te();
            return;
          }
          O = k;
        }
        te();
      },
      Co = () => {
        if (((V = !1), a === "stay")) {
          te();
          return;
        }
        if (i) {
          To();
          return;
        }
        let S = C[z] ?? 0,
          _ = Math.abs(R.value - S),
          F = 0.1 + Math.min(_ / (ee || 1), 1) * 0.5;
        O?.kill();
        let L = o.to(R, {
          value: S,
          duration: F,
          ease: "power2.out",
          onUpdate: te,
          onComplete: () => {
            O === L && (O = null);
          },
        });
        if (!L) {
          (R.value = S), te();
          return;
        }
        O = L;
      },
      Eo = r?.subscribeChannel?.(sn.MOUSE_MOVE_CHANNELS.POSITION, So),
      Mo = r?.subscribeChannel?.(sn.MOUSE_MOVE_CHANNELS.LEAVE, Co),
      ir = new AbortController(),
      { signal: Ao } = ir,
      ot = 0,
      Oo = () => {
        clearTimeout(ot),
          (ot = window.setTimeout(() => {
            q && (ee = u === "x" ? q.offsetWidth : q.offsetHeight);
            for (let S = 0; S < t.length; S++) {
              let _ = t[S],
                B = o.getProperty(_, d),
                F = typeof B == "number" ? B : parseFloat(String(B)),
                L = Number.isFinite(F) ? F : 0,
                k = _.getBoundingClientRect(),
                fe = u === "x" ? k.left + k.width * h : k.top + k.height * h;
              (C[S] = u === "x" ? fe - L : fe - L + (0, He.getScrollY)()),
                (P[S] = L);
            }
            if (!V) {
              let S = C[z];
              S !== void 0 &&
                (O?.isActive() && (O.kill(), (O = null)), (R.value = S));
            }
          }, 250));
      };
    return (
      window.addEventListener("resize", Oo, { signal: Ao }),
      () => {
        O?.kill(), X(), clearTimeout(ot), ir.abort(), Eo?.(), Mo?.(), A();
        for (let S = 0; S < t.length; S++) o.set(t[S], { [d]: p[S] });
      }
    );
  }
  function xl(n) {
    n.addAction("mouse-follow", {
      requiresTriggerElementContext: !0,
      createCustomTween: (e, t, r, o, i, s, a) => Pl(t, r, i, a),
    });
  }
});
var vi = m((un) => {
  "use strict";
  Object.defineProperty(un, "__esModule", { value: !0 });
  function kl(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  kl(un, {
    applyAdditive: function () {
      return Dl;
    },
    formatRandom: function () {
      return yi;
    },
    formatRandomArray: function () {
      return Ll;
    },
    isAdditiveValue: function () {
      return Nl;
    },
    isRandomArrayValue: function () {
      return Fl;
    },
    isRandomValue: function () {
      return cn;
    },
    makeClamp: function () {
      return Bl;
    },
  });
  function cn(n) {
    if (typeof n != "object" || n === null) return !1;
    let e = n;
    return (
      e.type === "ix3-random" &&
      typeof e.min == "number" &&
      typeof e.max == "number" &&
      (e.step === void 0 || typeof e.step == "number") &&
      (e.unit === void 0 || typeof e.unit == "string")
    );
  }
  function Nl(n) {
    if (typeof n != "object" || n === null) return !1;
    let e = n;
    return (
      e.type === "ix3-additive" &&
      (typeof e.value == "number" || cn(e.value)) &&
      (e.unit === void 0 || typeof e.unit == "string")
    );
  }
  function Fl(n) {
    if (typeof n != "object" || n === null) return !1;
    let e = n;
    return (
      e.type === "ix3-random-array" &&
      Array.isArray(e.values) &&
      e.values.every((t) => typeof t == "number" || typeof t == "string") &&
      (e.unit === void 0 || typeof e.unit == "string")
    );
  }
  function yi(n, e) {
    let t = n.unit ?? e ?? "",
      r = n.step != null ? `, ${n.step}` : "";
    return `random(${n.min}, ${n.max}${r})${t}`;
  }
  function Ll(n, e) {
    let t = n.unit ?? e ?? "";
    return `random([${n.values.join(", ")}])${t}`;
  }
  function Dl(n, e) {
    let t = n.unit ?? e ?? "";
    return cn(n.value) ? `+=${yi(n.value, t)}` : `+=${n.value}${t}`;
  }
  function Bl(n, e) {
    let t = (r) => (r < n ? n : r > e ? e : r);
    return (r) => {
      if (typeof r == "number") return t(r);
      let o = parseFloat(r);
      if (Number.isNaN(o)) return r;
      let i = t(o);
      return i === o
        ? r
        : `${i}${r.replace(/^\s*[+-]?[\d.]+(?:e[+-]?\d+)?/i, "")}`;
    };
  }
});
var Si = m((dn) => {
  "use strict";
  Object.defineProperty(dn, "__esModule", { value: !0 });
  Object.defineProperty(dn, "build", {
    enumerable: !0,
    get: function () {
      return $l;
    },
  });
  var Pe = be(),
    jl = mi(),
    x = vi();
  function bi(n, e) {
    return e != null && typeof n == "string" && n.startsWith("var(")
      ? (0, Pe.resolveToString)(n, e) ?? n
      : n;
  }
  var Ti = new Set(["opacity", "autoAlpha"]),
    Vl = new Set(["scale", "scaleX", "scaleY", "z", "transformPerspective"]),
    Ul = new Set(["xPercent", "yPercent"]),
    wi = new Set(["width", "height"]);
  function ze(n) {
    return n.startsWith("+=") || n.startsWith("-=") || n.startsWith("random(");
  }
  function ql(n) {
    if (Ti.has(n)) return (0, x.makeClamp)(0, 1);
    if (Vl.has(n) || wi.has(n)) return (0, x.makeClamp)(0, Number.MAX_VALUE);
  }
  function We(n) {
    return (
      (0, x.isRandomValue)(n) ||
      (0, x.isAdditiveValue)(n) ||
      (0, x.isRandomArrayValue)(n)
    );
  }
  function Ye(n, e) {
    let t = Ti.has(n) ? 100 : 1,
      r = t !== 1 || Ul.has(n),
      o = (i) => ({
        type: "ix3-random",
        min: i.min / t,
        max: i.max / t,
        step: i.step != null ? i.step / t : void 0,
      });
    if ((0, x.isRandomArrayValue)(e)) {
      let i = r
        ? {
            type: "ix3-random-array",
            values: e.values.map((s) => (typeof s == "number" ? s / t : s)),
          }
        : e;
      return (0, x.formatRandomArray)(i);
    }
    if ((0, x.isRandomValue)(e)) return (0, x.formatRandom)(r ? o(e) : e);
    if (r) {
      let i = (0, x.isRandomValue)(e.value) ? o(e.value) : e.value / t;
      return (0, x.applyAdditive)({ type: "ix3-additive", value: i });
    }
    return (0, x.applyAdditive)(e);
  }
  function $l(n) {
    (0, jl.buildMouseFollowAction)(n),
      n
        .addAction("class", {
          createCustomTween: (e, t, r, o, i, s) => {
            let a = r.class,
              l = a?.selectors || [],
              c = a?.operation,
              u = l
                ? i.map((f) => ({ element: f, classList: [...f.classList] }))
                : [],
              d = () => {
                if (!(!c || !l))
                  for (let f of i)
                    c === "addClass"
                      ? l.forEach((g) => f.classList.add(g))
                      : c === "removeClass"
                      ? l.forEach((g) => f.classList.remove(g))
                      : c === "toggleClass" &&
                        l.forEach((g) => f.classList.toggle(g));
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
                      for (let g of f.classList) f.element.classList.add(g);
                }
              }
            );
          },
        })
        .addAction("style", {
          createTweenConfig: (e, t) => {
            let r = { to: {}, from: {} },
              o = t?.[0];
            for (let i in e) {
              let s = e[i],
                a = Array.isArray(s) ? s[1] : s,
                l = Array.isArray(s) ? s[0] : void 0,
                c = We(a) ? Ye(i, a) : bi(a, o),
                u = We(l) ? Ye(i, l) : l !== void 0 ? bi(l, o) : void 0;
              c != null && (r.to[i] = c),
                u != null && !(0, x.isAdditiveValue)(a) && (r.from[i] = u),
                wi.has(i) &&
                  (We(a) || We(l)) &&
                  (r.modifiers || (r.modifiers = {}),
                  (r.modifiers[i] = (0, x.makeClamp)(0, Number.MAX_VALUE)));
            }
            return r;
          },
        })
        .addAction("transform", {
          createTweenConfig: (e, t) => {
            let r = { to: {}, from: {} },
              o = t?.[0];
            for (let i in e) {
              let s = e[i],
                a = Array.isArray(s) ? s[1] : s,
                l = Array.isArray(s) ? s[0] : void 0,
                c = (0, x.isAdditiveValue)(a),
                u =
                  (0, x.isRandomValue)(a) || (0, x.isRandomArrayValue)(a) || c,
                d =
                  (0, x.isRandomValue)(l) ||
                  (0, x.isRandomArrayValue)(l) ||
                  (0, x.isAdditiveValue)(l);
              if (u || d) {
                let f = ql(i);
                f &&
                  (r.modifiers || (r.modifiers = {}),
                  (r.modifiers[i] = f),
                  i === "autoAlpha" && (r.modifiers.opacity = f),
                  i === "scale" &&
                    ((r.modifiers.scaleX = f), (r.modifiers.scaleY = f))),
                  u && (a = Ye(i, a)),
                  d && (l = Ye(i, l));
              }
              switch (i) {
                case "autoAlpha":
                case "opacity": {
                  if (a != null && typeof a == "string" && !ze(a)) {
                    let f = o ? (0, Pe.resolveToNumber)(a, o) : parseFloat(a);
                    a = f !== void 0 ? f / 100 : a;
                  }
                  if (l != null && typeof l == "string" && !ze(l)) {
                    let f = o ? (0, Pe.resolveToNumber)(l, o) : parseFloat(l);
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
                  if (a != null && typeof a == "string" && !ze(a)) {
                    let f = o ? (0, Pe.resolveToNumber)(a, o) : parseFloat(a);
                    a = f !== void 0 ? f : a;
                  }
                  if (l != null && typeof l == "string" && !ze(l)) {
                    let f = o ? (0, Pe.resolveToNumber)(l, o) : parseFloat(l);
                    l = f !== void 0 ? f : l;
                  }
                  break;
                }
              }
              a != null && (r.to[i] = a), l != null && !c && (r.from[i] = l);
            }
            return r;
          },
        });
  }
});
var Mi = m((fn) => {
  "use strict";
  Object.defineProperty(fn, "__esModule", { value: !0 });
  Object.defineProperty(fn, "buildLottieAction", {
    enumerable: !0,
    get: function () {
      return Gl;
    },
  });
  var Hl = be();
  function Gl(n) {
    n.addAction("lottie", {
      createCustomTween: (e, t, r, o, i, s) => {
        let a = r.lottie;
        if (!a || !i.length || !window.Webflow) return;
        let l = window.Webflow.require?.("lottie");
        if (!l) return;
        let c = [],
          u = !1;
        for (let d of i) {
          let f = Ei(a.from, d, Ci.FROM),
            g = Ei(a.to, d, Ci.TO),
            h = l.createInstance(d);
          if (!h) continue;
          c.push(h);
          let p = () => {
            if (u) return;
            let y = h.frames,
              T = Math.round(f * y),
              A = Math.round(g * y);
            h.gsapFrame === null && (h.gsapFrame = T);
            let C = o;
            C.ease || (C = { ...C, ease: "none" }),
              e.fromTo(h, { gsapFrame: T }, { gsapFrame: A, ...C }, s || 0);
          };
          h.isLoaded ? p() : h.onDataReady(p);
        }
        return () => {
          u = !0;
          for (let d of c) d.goToFrameAndStop(0), (d.gsapFrame = null);
        };
      },
    });
  }
  var Ci = { DURATION: 1, FROM: 0, TO: 1 };
  function Ei(n, e, t) {
    if (typeof n == "number") return n;
    let r = (0, Hl.resolveToNumber)(n, e);
    return r !== void 0 ? r / 100 : t;
  }
});
var gn = m((pn) => {
  "use strict";
  Object.defineProperty(pn, "__esModule", { value: !0 });
  Object.defineProperty(pn, "RIVE_CONSTANTS", {
    enumerable: !0,
    get: function () {
      return zl;
    },
  });
  var zl = { MINIMUM_TIME: 0.001, MAX_BYTE_VALUE: 255 };
});
var yn = m((mn) => {
  "use strict";
  Object.defineProperty(mn, "__esModule", { value: !0 });
  function Wl(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Wl(mn, {
    clearSurfaceCache: function () {
      return Yl;
    },
    surfaceCache: function () {
      return hn;
    },
  });
  var hn = new WeakMap();
  function Yl(n, e) {
    if (!e) return;
    let t = `${e.name}:${e.instanceName ?? ""}`,
      r = hn.get(n);
    r && (r.delete(t), r.size === 0 && hn.delete(n));
  }
});
var xe = m((vn) => {
  "use strict";
  Object.defineProperty(vn, "__esModule", { value: !0 });
  function Xl(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Xl(vn, {
    parseVmKey: function () {
      return Kl;
    },
    vmKey: function () {
      return Zl;
    },
  });
  function Zl(n, e, t) {
    return `vm:${n}:${e}:${t}`;
  }
  var Ql = new Set([
    "string",
    "number",
    "boolean",
    "color",
    "enum",
    "trigger",
    "artboard",
  ]);
  function Kl(n) {
    if (!n.startsWith("vm:")) return null;
    let e = n.lastIndexOf(":"),
      t = n.slice(e + 1);
    if (!Ql.has(t)) return null;
    let r = n.slice(3, e),
      o = r.indexOf(":");
    return o === -1
      ? null
      : { vmName: r.slice(0, o), propName: r.slice(o + 1), propType: t };
  }
});
var Xe = m((bn) => {
  "use strict";
  Object.defineProperty(bn, "__esModule", { value: !0 });
  function Jl(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Jl(bn, {
    getVmiProperty: function () {
      return Ai;
    },
    storeOriginalValues: function () {
      return tc;
    },
  });
  var ec = xe();
  function tc(n, e) {
    let t = { viewModelProperties: {} };
    for (let r of n) nc(e, r.propertyName, r.propertyType, t);
    return t;
  }
  function nc(n, e, t, r) {
    let o = (0, ec.vmKey)(n.name, e, t);
    if (!(o in r.viewModelProperties)) {
      if (t === "artboard") {
        let s = n.riveInstance.viewModelInstance?.artboard?.(e)?.name;
        s != null && (r.viewModelProperties[o] = s);
        return;
      }
      let i = n.riveInstance.viewModelInstance
        ? rc(n.riveInstance.viewModelInstance, t, e)
        : null;
      i != null && (r.viewModelProperties[o] = i);
    }
  }
  function Ai(n, e, t) {
    switch (e) {
      case "number":
        return n.number(t);
      case "boolean":
        return n.boolean(t);
      case "string":
        return n.string(t);
      case "color":
        return n.color(t);
      case "enum":
        return n.enum(t);
      default:
        return null;
    }
  }
  function rc(n, e, t) {
    let r = Ai(n, e, t);
    return r ? r.value : void 0;
  }
});
var wn = m((Tn) => {
  "use strict";
  Object.defineProperty(Tn, "__esModule", { value: !0 });
  Object.defineProperty(Tn, "parseColorToAARRGGBB", {
    enumerable: !0,
    get: function () {
      return oc;
    },
  });
  var ic = gn();
  function oc(n) {
    let e = n.trim();
    if (!e) return null;
    try {
      let { red: t, green: r, blue: o, alpha: i } = ac(e);
      return t === void 0 || r === void 0 || o === void 0
        ? null
        : ((Math.round(i * ic.RIVE_CONSTANTS.MAX_BYTE_VALUE) << 24) |
            (t << 16) |
            (r << 8) |
            o) >>>
            0;
    } catch {
      return null;
    }
  }
  var le = null;
  function sc(n) {
    if (!le) {
      let e = document.createElement("canvas");
      if (((e.width = 1), (e.height = 1), (le = e.getContext("2d")), !le))
        return null;
    }
    return (
      (le.fillStyle = "#000000"),
      (le.fillStyle = n),
      le.fillStyle === "#000000" && n.toLowerCase() !== "black"
        ? null
        : le.fillStyle
    );
  }
  function Oi(n, e, t) {
    let r = (1 - Math.abs(2 * t - 1)) * e,
      o = r * (1 - Math.abs(((n / 60) % 2) - 1)),
      i = t - r / 2,
      s,
      a,
      l;
    return (
      n >= 0 && n < 60
        ? ((s = r), (a = o), (l = 0))
        : n >= 60 && n < 120
        ? ((s = o), (a = r), (l = 0))
        : n >= 120 && n < 180
        ? ((s = 0), (a = r), (l = o))
        : n >= 180 && n < 240
        ? ((s = 0), (a = o), (l = r))
        : n >= 240 && n < 300
        ? ((s = o), (a = 0), (l = r))
        : ((s = r), (a = 0), (l = o)),
      {
        red: Math.round((s + i) * 255),
        green: Math.round((a + i) * 255),
        blue: Math.round((l + i) * 255),
      }
    );
  }
  function ac(n) {
    let e,
      t,
      r,
      o = 1,
      i = n.replace(/\s/g, "").toLowerCase(),
      s = i;
    if (!s.startsWith("#") && !s.startsWith("rgb") && !s.startsWith("hsl")) {
      let a = sc(i);
      a && (s = a);
    }
    if (s.startsWith("#")) {
      let a = s.substring(1);
      a.length === 3 || a.length === 4
        ? ((e = parseInt(a.charAt(0) + a.charAt(0), 16)),
          (t = parseInt(a.charAt(1) + a.charAt(1), 16)),
          (r = parseInt(a.charAt(2) + a.charAt(2), 16)),
          a.length === 4 && (o = parseInt(a.charAt(3) + a.charAt(3), 16) / 255))
        : (a.length === 6 || a.length === 8) &&
          ((e = parseInt(a.substring(0, 2), 16)),
          (t = parseInt(a.substring(2, 4), 16)),
          (r = parseInt(a.substring(4, 6), 16)),
          a.length === 8 && (o = parseInt(a.substring(6, 8), 16) / 255));
    } else if (s.startsWith("rgba")) {
      let a = s.match(/rgba\(([^)]+)\)/)?.[1]?.split(",");
      (e = parseInt(a?.[0] ?? "", 10)),
        (t = parseInt(a?.[1] ?? "", 10)),
        (r = parseInt(a?.[2] ?? "", 10)),
        (o = parseFloat(a?.[3] ?? ""));
    } else if (s.startsWith("rgb")) {
      let a = s.match(/rgb\(([^)]+)\)/)?.[1]?.split(",");
      (e = parseInt(a?.[0] ?? "", 10)),
        (t = parseInt(a?.[1] ?? "", 10)),
        (r = parseInt(a?.[2] ?? "", 10));
    } else if (s.startsWith("hsla")) {
      let a = s.match(/hsla\(([^)]+)\)/)?.[1]?.split(","),
        l = parseFloat(a?.[0] ?? ""),
        c = parseFloat(a?.[1]?.replace("%", "") ?? "") / 100,
        u = parseFloat(a?.[2]?.replace("%", "") ?? "") / 100;
      (o = parseFloat(a?.[3] ?? "")),
        ({ red: e, green: t, blue: r } = Oi(l, c, u));
    } else if (s.startsWith("hsl")) {
      let a = s.match(/hsl\(([^)]+)\)/)?.[1]?.split(","),
        l = parseFloat(a?.[0] ?? ""),
        c = parseFloat(a?.[1]?.replace("%", "") ?? "") / 100,
        u = parseFloat(a?.[2]?.replace("%", "") ?? "") / 100;
      ({ red: e, green: t, blue: r } = Oi(l, c, u));
    }
    if (
      Number.isNaN(e) ||
      Number.isNaN(t) ||
      Number.isNaN(r) ||
      Number.isNaN(o)
    )
      throw new Error(`Invalid color value: '${n}'`);
    return { red: e, green: t, blue: r, alpha: o };
  }
});
var Cn = m((Sn) => {
  "use strict";
  Object.defineProperty(Sn, "__esModule", { value: !0 });
  Object.defineProperty(Sn, "setVmiValue", {
    enumerable: !0,
    get: function () {
      return dc;
    },
  });
  var lc = xe(),
    cc = Xe(),
    uc = wn();
  function dc(n, e, t, r, o, i) {
    let s = n.riveInstance.viewModelInstance;
    if (e === "trigger") {
      if (i) return;
      s?.trigger?.(t)?.fire?.();
      return;
    }
    if (!s) return;
    let a = (0, cc.getVmiProperty)(s, e, t);
    if (!a) return;
    let l = o?.viewModelProperties[(0, lc.vmKey)(n.name, t, e)],
      c = i ? l ?? r : r,
      u = `${e}:${t}`;
    switch (e) {
      case "number":
        typeof c == "number" && ((a.value = c), (n.currentValues[u] = c));
        return;
      case "boolean":
        typeof c == "boolean" && ((a.value = c), (n.currentValues[u] = c));
        return;
      case "string":
        typeof c == "string" && ((a.value = c), (n.currentValues[u] = c));
        return;
      case "enum":
        typeof c == "string" && ((a.value = c), (n.currentValues[u] = c));
        return;
      case "color": {
        let d =
          typeof c == "number"
            ? c
            : typeof c == "string"
            ? (0, uc.parseColorToAARRGGBB)(c)
            : null;
        d != null && ((a.value = d), (n.currentValues[u] = d));
        return;
      }
      default:
        return;
    }
  }
});
var Ii = m((En) => {
  "use strict";
  Object.defineProperty(En, "__esModule", { value: !0 });
  function fc(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  fc(En, {
    createCleanupFunction: function () {
      return mc;
    },
    restoreViewModelProperties: function () {
      return _i;
    },
  });
  var pc = xe(),
    gc = Cn(),
    hc = yn();
  function _i(n, e, t) {
    let r = n.viewModelInstance ?? null;
    if (r)
      for (let [o, i] of Object.entries(t.viewModelProperties)) {
        let s = (0, pc.parseVmKey)(o);
        if (!s || s.vmName !== e) continue;
        let a = { name: e, riveInstance: n, currentValues: {} };
        if (s.propType === "artboard") {
          if (typeof i != "string") continue;
          let l = r.artboard?.(s.propName),
            c = n.getArtboard?.(i);
          l && c && (l.value = c);
          continue;
        }
        (0, gc.setVmiValue)(a, s.propType, s.propName, i);
      }
  }
  function mc(n, e, t) {
    return () => {
      !e || !n || (_i(n, e.name, t), (0, hc.clearSurfaceCache)(n, e));
    };
  }
});
var xi = m((Mn) => {
  "use strict";
  Object.defineProperty(Mn, "__esModule", { value: !0 });
  function yc(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  yc(Mn, {
    interpolateAARRGGBB: function () {
      return Pi;
    },
    setupAnimateTimeline: function () {
      return Tc;
    },
  });
  var vc = Xe(),
    bc = wn(),
    Ri = be();
  function Pi(n, e, t) {
    let r = (n >>> 24) & 255,
      o = (n >>> 16) & 255,
      i = (n >>> 8) & 255,
      s = n & 255,
      a = (e >>> 24) & 255,
      l = (e >>> 16) & 255,
      c = (e >>> 8) & 255,
      u = e & 255,
      d = Math.round(r + (a - r) * t),
      f = Math.round(o + (l - o) * t),
      g = Math.round(i + (c - i) * t),
      h = Math.round(s + (u - s) * t);
    return ((d << 24) | (f << 16) | (g << 8) | h) >>> 0;
  }
  function Tc(n, e, t, r, o, i) {
    if (t.length === 0) return;
    let s = e.riveInstance.viewModelInstance;
    if (s)
      for (let a of t) {
        if (
          a.value === null ||
          a.value === void 0 ||
          !(0, vc.getVmiProperty)(s, a.propertyType, a.propertyName)
        )
          continue;
        let c,
          u = a.value;
        if (typeof u == "string" && u.startsWith("var(")) {
          if (
            (a.propertyType === "number"
              ? (c = (0, Ri.resolveToNumber)(u, i))
              : a.propertyType === "color" &&
                (c = (0, Ri.resolveToString)(u, i)),
            c === void 0)
          )
            continue;
        } else c = u;
        a.propertyType === "number"
          ? wc(e, n, a.propertyName, c, r, o)
          : a.propertyType === "color" && Sc(e, n, a.propertyName, c, r, o);
      }
  }
  function wc(n, e, t, r, o, i) {
    let s = n.riveInstance.viewModelInstance;
    if (!s) return;
    let a = s.number(t);
    if (!a) return;
    let l = typeof r == "number" ? r : parseFloat(String(r));
    if (isNaN(l)) return;
    let c = { v: a.value };
    e.to(
      c,
      {
        ...o,
        v: l,
        onStart() {
          let u = n.currentValues[`number:${t}`];
          (c.v = typeof u == "number" ? u : a.value), this.invalidate();
        },
        onUpdate: () => {
          a.value = c.v;
        },
      },
      i ?? 0
    );
  }
  function Sc(n, e, t, r, o, i) {
    let s = n.riveInstance.viewModelInstance;
    if (!s) return;
    let a = s.color(t);
    if (!a) return;
    let l = typeof r == "number" ? r : (0, bc.parseColorToAARRGGBB)(String(r));
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
          let d = n.currentValues[`color:${t}`];
          (c.fromPacked = typeof d == "number" ? d : a.value),
            this.invalidate();
        },
        onUpdate: () => {
          a.value = Pi(c.fromPacked, l, u.t);
        },
      },
      i ?? 0
    );
  }
});
var Di = m((_n) => {
  "use strict";
  Object.defineProperty(_n, "__esModule", { value: !0 });
  function Cc(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Cc(_n, {
    resolveSurfaceArea: function () {
      return On;
    },
    setupAnimateAnimation: function () {
      return Ic;
    },
    setupAnimation: function () {
      return _c;
    },
    setupTimeline: function () {
      return Li;
    },
  });
  var ki = gn(),
    An = yn(),
    Ni = Xe(),
    Fi = Ii(),
    Ec = Cn(),
    Mc = xi(),
    Ac = xe(),
    Ze = be();
  function On(n, e) {
    if (!e) return null;
    let t = `${e.name}:${e.instanceName ?? ""}`,
      r = An.surfaceCache.get(n)?.get(t);
    if (r) return r;
    let i =
      (n.viewModelByName?.(e.name) ?? void 0)?.instanceByName?.(
        e.instanceName ?? ""
      ) ?? null;
    n.bindViewModelInstance?.(i);
    let s = { name: e.name, riveInstance: n, currentValues: {} },
      a = An.surfaceCache.get(n);
    return a || ((a = new Map()), An.surfaceCache.set(n, a)), a.set(t, s), s;
  }
  function Li(n, e, t, r, o, i) {
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
              ? (0, Ze.resolveToNumber)(c, i)
              : l.propertyType === "color"
              ? (0, Ze.resolveToString)(c, i)
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
                ? (u = (0, Ze.resolveToNumber)(d, i))
                : c.propertyType === "color" &&
                  (u = (0, Ze.resolveToString)(d, i)),
              u === void 0)
            )
              continue;
          } else u = d;
          Oc(e, c.propertyName, c.propertyType, u, r, l);
        }
      },
      a = { int: 0 };
    n.to(
      a,
      {
        int: 1,
        duration: ki.RIVE_CONSTANTS.MINIMUM_TIME,
        onStart: () => {
          s(!1);
        },
        onReverseComplete: () => {
          s(!0);
        },
      },
      o ?? ki.RIVE_CONSTANTS.MINIMUM_TIME
    );
  }
  function Oc(n, e, t, r, o, i) {
    if (t === "artboard") {
      if (typeof r != "string") return;
      let s = n.riveInstance.viewModelInstance?.artboard?.(e);
      if (!s) return;
      if (i) {
        let l = (0, Ac.vmKey)(n.name, e, t),
          c = o?.viewModelProperties[l];
        if (typeof c == "string") {
          let u = n.riveInstance.getArtboard?.(c);
          u && (s.value = u);
        }
        return;
      }
      let a = n.riveInstance.getArtboard?.(r);
      if (!a) return;
      s.value = a;
      return;
    }
    (0, Ec.setVmiValue)(n, t, e, r, o, i);
  }
  function _c(n, e, t, r, o) {
    let i = e.animationSource,
      s = On(n, i);
    if (!s) return;
    let a = e.addedProperties ?? {},
      l = Object.values(a),
      c = (0, Ni.storeOriginalValues)(l, s);
    return Li(t, s, l, c, r, o), (0, Fi.createCleanupFunction)(n, i, c);
  }
  function Ic(n, e, t, r, o, i) {
    let s = e.animationSource,
      a = On(n, s);
    if (!a) return;
    let l = e.addedProperties ?? {},
      c = Object.values(l),
      u = (0, Ni.storeOriginalValues)(c, a);
    return (
      (0, Mc.setupAnimateTimeline)(t, a, c, r, o, i),
      (0, Fi.createCleanupFunction)(n, s, u)
    );
  }
});
var $i = m((In) => {
  "use strict";
  Object.defineProperty(In, "__esModule", { value: !0 });
  function Rc(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Rc(In, {
    buildAnimateRiveAction: function () {
      return kc;
    },
    buildRiveAction: function () {
      return xc;
    },
  });
  var Vi = Di();
  function Bi(n) {
    return (
      typeof n == "object" &&
      n !== null &&
      "loaded" in n &&
      typeof n.loaded == "boolean"
    );
  }
  function ji(n) {
    !n.isPlaying && n.play && n.play();
  }
  function Pc(n, e, t) {
    let o = e.getInstance(n)?.rive,
      i = Bi(o) ? o : null;
    if (i?.loaded) return ji(i), t(i, n);
    let s,
      a = !1,
      l = () => {
        if (a || !n.isConnected) return;
        let u = e.getInstance(n)?.rive,
          d = Bi(u) ? u : null;
        d?.loaded && (ji(d), (s = t(d, n))),
          n.removeEventListener("w-rive-load", l);
      };
    return (
      n.addEventListener("w-rive-load", l),
      () => {
        (a = !0), n.removeEventListener("w-rive-load", l), s?.();
      }
    );
  }
  function Ui(n, e, t) {
    let r = [];
    for (let o of n) {
      let i = Pc(o, e, t);
      i && r.push(i);
    }
    if (r.length !== 0)
      return () => {
        for (let o of r) o();
      };
  }
  function qi() {
    return window.Webflow ? window.Webflow.require?.("rive") ?? null : null;
  }
  function xc(n) {
    n.addAction("rive", {
      createCustomTween: (e, t, r, o, i, s) => {
        let a = r.rive;
        if (!a || !i.length) return;
        let l = qi();
        if (l) return Ui(i, l, (c, u) => (0, Vi.setupAnimation)(c, a, e, s, u));
      },
    });
  }
  function kc(n) {
    n.addAction("animate-rive", {
      createCustomTween: (e, t, r, o, i, s) => {
        let a = r.rive;
        if (!a || !i.length) return;
        let l = qi();
        if (l)
          return Ui(i, l, (c, u) =>
            (0, Vi.setupAnimateAnimation)(c, a, e, o, s, u)
          );
      },
    });
  }
});
var ce = m((Rn) => {
  "use strict";
  Object.defineProperty(Rn, "__esModule", { value: !0 });
  function Nc(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Nc(Rn, {
    checkTt: function () {
      return jc;
    },
    hasBBoxUpdate: function () {
      return Dc;
    },
    hasIntensity: function () {
      return Fc;
    },
    hasMatrixUpdate: function () {
      return Bc;
    },
    hasRenderOrder: function () {
      return Lc;
    },
  });
  var Qe = Z(),
    Fc = (n) => "intensity" in n,
    Lc = (n) => "renderOrder" in n,
    Dc = (n) => "singleBBoxNeedsUpdate" in n && "recursiveBBoxNeedsUpdate" in n,
    Bc = (n) => "updateMatrix" in n && "updateMatrixWorld" in n,
    jc = (n, e) =>
      e === "from"
        ? n === Qe.TweenType.From || n === Qe.TweenType.FromTo
        : n === Qe.TweenType.To || n === Qe.TweenType.FromTo;
});
var xn = m((Pn) => {
  "use strict";
  Object.defineProperty(Pn, "__esModule", { value: !0 });
  Object.defineProperty(Pn, "colorDataToCss", {
    enumerable: !0,
    get: function () {
      return Vc;
    },
  });
  var Vc = ({ r: n, g: e, b: t, a: r }) => {
    let o = (c) => Math.round(Math.min(1, Math.max(0, c)) * 255),
      i = o(n),
      s = o(e),
      a = o(t);
    if (r === void 0 || r >= 1) return `rgba(${i}, ${s}, ${a}, 1)`;
    let l = Math.min(1, Math.max(0, r));
    return `rgba(${i}, ${s}, ${a}, ${l})`;
  };
});
var Hi = m((kn) => {
  "use strict";
  Object.defineProperty(kn, "__esModule", { value: !0 });
  Object.defineProperty(kn, "storeOriginalState", {
    enumerable: !0,
    get: function () {
      return $c;
    },
  });
  var Uc = ce(),
    qc = xn(),
    $c = (n, e, t) => {
      let r = n.material,
        o = Array.isArray(r) ? r : r ? [r] : [],
        i = e.spline._scene.entityByUuid[t]?.color,
        s = i ? (0, qc.colorDataToCss)(i) : void 0,
        a = n.rotation;
      return {
        position: { ...n.position },
        rotation: { x: a._x ?? 0, y: a._y ?? 0, z: a._z ?? 0 },
        scale: { ...n.scale },
        ...(s ? { color: s } : {}),
        intensity: n.intensity,
        renderOrder: (0, Uc.hasRenderOrder)(n) ? n.renderOrder : void 0,
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
var ke = m((Nn) => {
  "use strict";
  Object.defineProperty(Nn, "__esModule", { value: !0 });
  Object.defineProperty(Nn, "SPLINE_CONSTANTS", {
    enumerable: !0,
    get: function () {
      return Hc;
    },
  });
  var Hc = {
    OPACITY_RENDER_ORDER: 999,
    TRANSITION_END_OFFSET: 0.001,
    DEFAULT_TRANSITION_DURATION: 0.5,
    OPACITY_TRANSPARENCY_THRESHOLD: 0.01,
    DEFAULT_TRANSMISSION_IOR: 1.3,
    DEFAULT_TRANSMISSION_THICKNESS: 10,
    MIN_ZOOM_VALUE: 1e-4,
  };
});
var Ke = m((Fn) => {
  "use strict";
  Object.defineProperty(Fn, "__esModule", { value: !0 });
  function Gc(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Gc(Fn, {
    getAppZoom: function () {
      return Wc;
    },
    setAppZoom: function () {
      return Yc;
    },
  });
  var zc = ke(),
    Wc = (n) => {
      let e = n._camera;
      return e._cameraType === "OrthographicCamera"
        ? e.orthoCamera.zoom
        : e.perspCamera.zoom;
    },
    Yc = (n, e) => {
      let t = e > 0 ? e : zc.SPLINE_CONSTANTS.MIN_ZOOM_VALUE;
      n.setZoom?.(t);
    };
});
var Dn = m((Ln) => {
  "use strict";
  Object.defineProperty(Ln, "__esModule", { value: !0 });
  Object.defineProperty(Ln, "createCleanupFunction", {
    enumerable: !0,
    get: function () {
      return Zc;
    },
  });
  var Xc = Ke(),
    Je = ce(),
    Zc = (n, e, t, r, o, i) => () => {
      if (!(!n || !t)) {
        if (
          (i && (n.state = void 0),
          Object.assign(n.position, t.position),
          Object.assign(n.rotation, {
            x: t.rotation.x,
            y: t.rotation.y,
            z: t.rotation.z,
          }),
          Object.assign(n.scale, t.scale),
          t.color && (n.color = t.color),
          r.spline?.intensity &&
            typeof r.spline.intensity == "object" &&
            t.intensity !== void 0 &&
            (0, Je.hasIntensity)(n) &&
            (n.intensity = t.intensity),
          r.spline?.zoom && typeof r.spline.zoom == "object")
        ) {
          let s = e.spline;
          typeof s?.setZoom == "function" && (0, Xc.setAppZoom)(s, o ?? 1);
        }
        if (t.materials) {
          let s = n.material,
            a = Array.isArray(s) ? s : s ? [s] : [];
          (0, Je.hasRenderOrder)(n) && (n.renderOrder = t.renderOrder ?? 0);
          let l = Math.min(a.length, t.materials.length);
          for (let c = 0; c < l; c++) {
            let u = a[c],
              d = t.materials[c];
            if (!u || !d) continue;
            (u.transparent = d.transparent),
              (u.depthWrite = d.depthWrite),
              d.alpha !== void 0 && (u.alpha = d.alpha);
            let f = u.layers ?? [];
            for (let g = 0; g < f.length; g++) {
              let h = f[g],
                p = d.layers[g];
              !h ||
                !p ||
                ((h.visible = p.visible),
                p.alpha !== void 0 && (h.alpha = p.alpha),
                p.alphaOverride !== void 0 &&
                  (h.alphaOverride = p.alphaOverride),
                p.ior !== void 0 && (h.ior = p.ior),
                p.thickness !== void 0 && (h.thickness = p.thickness));
            }
          }
        }
        (0, Je.hasMatrixUpdate)(n) &&
          (n.updateMatrix(), n.updateMatrixWorld(!0)),
          (0, Je.hasBBoxUpdate)(n) &&
            ((n.singleBBoxNeedsUpdate = !0), (n.recursiveBBoxNeedsUpdate = !0)),
          e.spline.requestRender();
      }
    };
});
var Gi = m((Bn) => {
  "use strict";
  Object.defineProperty(Bn, "__esModule", { value: !0 });
  function Qc(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Qc(Bn, {
    warnNoObjectId: function () {
      return Kc;
    },
    warnNoObjectsFound: function () {
      return eu;
    },
    warnObjectNotFound: function () {
      return Jc;
    },
  });
  var Kc = () => {},
    Jc = (n) => {},
    eu = (n) => {};
});
var Yi = m((jn) => {
  "use strict";
  Object.defineProperty(jn, "__esModule", { value: !0 });
  Object.defineProperty(jn, "animateStateTransitions", {
    enumerable: !0,
    get: function () {
      return nu;
    },
  });
  var zi = ke(),
    tu = Dn(),
    Wi = ce(),
    nu = (n, e, t, r, o, i, s, a, l, c) => {
      let u = [];
      n.forEach((f) => {
        if (!f.transition) {
          u.push(null);
          return;
        }
        let g = l.duration ?? zi.SPLINE_CONSTANTS.DEFAULT_TRANSITION_DURATION,
          h = f.transition({
            from:
              e.stateName?.from && (0, Wi.checkTt)(a, "from")
                ? e.stateName.from
                : void 0,
            to:
              e.stateName?.to && (0, Wi.checkTt)(a, "to")
                ? e.stateName.to
                : null,
            autoPlay: !1,
            duration: g,
            delay: 0,
          });
        u.push(h);
        let p = { time: 0 };
        s.fromTo(
          p,
          { time: 0 },
          {
            ...l,
            time: g - zi.SPLINE_CONSTANTS.TRANSITION_END_OFFSET,
            onUpdate: () => {
              h.seek(p.time);
            },
          },
          c || 0
        );
      });
      let d = n.map((f, g) =>
        (0, tu.createCleanupFunction)(f, t, r[g], o, i, u[g])
      );
      return () => d.forEach((f) => f?.());
    };
});
var Zi = m((Vn) => {
  "use strict";
  Object.defineProperty(Vn, "__esModule", { value: !0 });
  function ru(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  ru(Vn, {
    animateColor: function () {
      return au;
    },
    animateIntensity: function () {
      return ou;
    },
    animateZoom: function () {
      return su;
    },
  });
  var Xi = Ke(),
    iu = xn(),
    ue = ce(),
    ou = (n, e, t, r, o, i) => {
      let s = e.intensity;
      if (!s || typeof s != "object") return;
      let a = n.intensity ?? 0,
        l = s.from && (0, ue.checkTt)(r, "from") ? s.from : a,
        c = s.to && (0, ue.checkTt)(r, "to") ? s.to : a,
        u = { v: l };
      t.fromTo(
        u,
        { v: l },
        {
          ...o,
          v: c,
          onUpdate: () => {
            (0, ue.hasIntensity)(n) && (n.intensity = u.v);
          },
        },
        i || 0
      );
    },
    su = (n, e, t, r, o, i) => {
      let s = e.zoom;
      if (!s || typeof s != "object" || typeof n.spline?.setZoom != "function")
        return;
      let a = (0, Xi.getAppZoom)(n.spline),
        l = s.from && (0, ue.checkTt)(r, "from") ? s.from : a,
        c = s.to && (0, ue.checkTt)(r, "to") ? s.to : a,
        u = { v: l };
      t.fromTo(
        u,
        { v: l },
        {
          ...o,
          v: c,
          onUpdate: () => {
            (0, Xi.setAppZoom)(n.spline, u.v);
          },
        },
        i || 0
      );
    },
    au = (n, e, t, r, o, i, s, a) => {
      let l = e.color;
      if (!l || typeof l != "object" || (!l.from && !l.to)) return;
      let c = s.spline._scene.entityByUuid[a]?.color,
        u = (0, iu.colorDataToCss)(c ?? { r: 255, g: 255, b: 255 }),
        d = l.from && (0, ue.checkTt)(r, "from") ? l.from : u,
        f = l.to && (0, ue.checkTt)(r, "to") ? l.to : u,
        g = window.gsap.utils.interpolate(d, f),
        h = { t: 0 };
      t.fromTo(
        h,
        { t: 0 },
        {
          ...o,
          t: 1,
          onUpdate: function () {
            n.color = g(h.t);
          },
        },
        i || 0
      );
    };
});
var Ki = m((Un) => {
  "use strict";
  Object.defineProperty(Un, "__esModule", { value: !0 });
  function lu(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  lu(Un, {
    createPropertyObject: function () {
      return Qi;
    },
    createTransformTargets: function () {
      return cu;
    },
  });
  var Qi = (n, e, t) => {
      let r = {},
        o = t[e];
      return (
        ["X", "Y", "Z"].forEach((i) => {
          let s = `${e}${i}`,
            a = n[s],
            l = i.toLowerCase(),
            c = o[l];
          a &&
            typeof a == "object" &&
            (r[l] = { from: a.from ?? c, to: a.to ?? c });
        }),
        { props: r }
      );
    },
    cu = (n, e) => {
      let t = ["position", "rotation", "scale"],
        r = [];
      return (
        t.forEach((o) => {
          let { props: i } = Qi(e, o, n);
          Object.keys(i).length > 0 && r.push({ object: n[o], props: i });
        }),
        r
      );
    };
});
var Ji = m(($n) => {
  "use strict";
  Object.defineProperty($n, "__esModule", { value: !0 });
  Object.defineProperty($n, "fadeObject", {
    enumerable: !0,
    get: function () {
      return gu;
    },
  });
  var et = ke(),
    qn = ce(),
    uu = (n, e, t, r, o, i) => {
      r.fromTo(n, { alpha: e }, { ...o, alpha: t }, i);
    },
    du = (n, e, t, r, o, i) => {
      let s = n.ior ?? et.SPLINE_CONSTANTS.DEFAULT_TRANSMISSION_IOR,
        a = n.thickness ?? et.SPLINE_CONSTANTS.DEFAULT_TRANSMISSION_THICKNESS;
      r.fromTo(
        n,
        { alpha: e, ior: s, thickness: a },
        {
          ...o,
          alpha: 1 - t,
          ior: window.gsap.utils.interpolate(s, 1, 1 - t),
          thickness: window.gsap.utils.interpolate(a, 0, 1 - t),
          onUpdate: () => {
            n.visible =
              n.alpha > et.SPLINE_CONSTANTS.OPACITY_TRANSPARENCY_THRESHOLD;
          },
        },
        i
      );
    },
    fu = (n, e, t, r, o, i) => {
      n.alphaOverride !== void 0 &&
        r.fromTo(n, { alphaOverride: e }, { ...o, alphaOverride: t }, i);
    },
    pu = (n, e, t, r, o, i) => {
      if (!n.visible) return;
      let s = n.type;
      s === "color" || s === "depth" || s === "outline"
        ? uu(n, e, t, r, o, i)
        : s === "transmission"
        ? du(n, e, t, r, o, i)
        : s === "light" && fu(n, e, t, r, o, i);
    },
    gu = (n, e, t, r, o, i) => {
      if (!n) return;
      let s = n.material,
        a = s?.layers;
      if (a) {
        (s.transparent = !0),
          (0, qn.hasRenderOrder)(n) &&
            (n.renderOrder = et.SPLINE_CONSTANTS.OPACITY_RENDER_ORDER);
        for (let l of a) {
          let c = l.type === "light" ? l.alphaOverride ?? 1 : l.alpha ?? 1,
            u = e.from !== void 0 && (0, qn.checkTt)(r, "from") ? e.from : c,
            d = e.to !== void 0 && (0, qn.checkTt)(r, "to") ? e.to : c;
          pu(l, u, d, t, o, i);
        }
      }
    };
});
var to = m((zn) => {
  "use strict";
  Object.defineProperty(zn, "__esModule", { value: !0 });
  Object.defineProperty(zn, "setupAnimation", {
    enumerable: !0,
    get: function () {
      return wu;
    },
  });
  var hu = Hi(),
    mu = Dn(),
    yu = Ke(),
    Hn = Gi(),
    vu = Yi(),
    Gn = Zi(),
    bu = Ki(),
    Tu = Ji(),
    tt = ce(),
    eo = ke(),
    wu = (n, e, t, r, o, i) => {
      t.ease || (t = { ...t, ease: "none" });
      let { force3D: s, ...a } = t;
      if (((t = { ...a }), !n.spline?.findObjectById)) return;
      let l = e.spline,
        c = (e.objectId || "").split(",").filter(Boolean);
      if (c.length === 0) {
        (0, Hn.warnNoObjectId)();
        return;
      }
      let u = c.flatMap((p) => {
        let y = n.spline.findObjectById?.(p);
        return y || ((0, Hn.warnObjectNotFound)(p), []);
      });
      if (u.length === 0) {
        (0, Hn.warnNoObjectsFound)(c);
        return;
      }
      let d = u.map((p) => (0, hu.storeOriginalState)(p, n, c[0] ?? "")),
        f = (0, yu.getAppZoom)(n.spline);
      if (
        e.animatingState &&
        l?.stateName &&
        (l.stateName.from || l.stateName.to)
      )
        return (0, vu.animateStateTransitions)(u, l, n, d, e, f, r, o, t, i);
      if (!l) return;
      let g = Object.keys(l);
      if (g.length === 0 || (g.length === 1 && g[0] === "stateName")) return;
      u.forEach((p) => {
        (0, Gn.animateIntensity)(p, l, r, o, t, i),
          (0, Gn.animateZoom)(n, l, r, o, t, i),
          (0, Gn.animateColor)(p, l, r, o, t, i, n, c[0] ?? "");
        let y = l.opacity && typeof l.opacity == "object" ? l.opacity : void 0;
        if (y !== void 0) {
          let A = {
              from: y.from !== void 0 ? y.from / 100 : void 0,
              to: y.to !== void 0 ? y.to / 100 : void 0,
            },
            C =
              t.immediateRender !== !1 &&
              A.from !== void 0 &&
              (0, tt.checkTt)(o, "from")
                ? A.from
                : void 0;
          if (((0, Tu.fadeObject)(p, A, r, o, t, i), C !== void 0)) {
            let M = p.material,
              b = Array.isArray(M) ? M : M ? [M] : [];
            for (let v of b)
              (v.transparent = !0),
                (v.depthWrite =
                  C > eo.SPLINE_CONSTANTS.OPACITY_TRANSPARENCY_THRESHOLD);
            (0, tt.hasRenderOrder)(p) &&
              (p.renderOrder = eo.SPLINE_CONSTANTS.OPACITY_RENDER_ORDER);
          }
        }
        (0, bu.createTransformTargets)(p, l).forEach(
          ({ object: A, props: C }) => {
            if (Object.keys(C).length === 0) return;
            let M = {},
              b = {};
            Object.keys(C).forEach((v) => {
              let w = C[v];
              w &&
                typeof w == "object" &&
                ((M[v] =
                  (0, tt.checkTt)(o, "from") && w.from ? w.from : A[v] ?? 0),
                (b[v] = (0, tt.checkTt)(o, "to") && w.to ? w.to : A[v] ?? 0));
            }),
              !(Object.keys(M).length === 0 && Object.keys(b).length === 0) &&
                r.fromTo(A, M, { ...t, ...b }, i || 0);
          }
        );
      });
      let h = u.map((p, y) => (0, mu.createCleanupFunction)(p, n, d[y], e, f));
      return () => h.forEach((p) => p?.());
    };
});
var io = m((Wn) => {
  "use strict";
  Object.defineProperty(Wn, "__esModule", { value: !0 });
  Object.defineProperty(Wn, "buildSplineAction", {
    enumerable: !0,
    get: function () {
      return Au;
    },
  });
  var no = to(),
    nt = be(),
    Su = new Set(["color", "stateName"]),
    Cu = new Set(["rotationX", "rotationY", "rotationZ"]),
    ro = Math.PI / 180;
  function Eu(n, e) {
    if (!n.spline) return n;
    let t = n.spline,
      r = {},
      o = !1;
    for (let [i, s] of Object.entries(t)) {
      if (!s || typeof s != "object") {
        r[i] = s;
        continue;
      }
      let a = s;
      if (Su.has(i)) {
        let l = a.from !== void 0 ? (0, nt.resolveToString)(a.from, e) : void 0,
          c = a.to !== void 0 ? (0, nt.resolveToString)(a.to, e) : void 0;
        (l !== a.from || c !== a.to) && (o = !0), (r[i] = { from: l, to: c });
      } else {
        let l = a.from !== void 0 ? (0, nt.resolveToNumber)(a.from, e) : void 0,
          c = a.to !== void 0 ? (0, nt.resolveToNumber)(a.to, e) : void 0,
          u = l !== a.from,
          d = c !== a.to;
        (u || d) && (o = !0),
          Cu.has(i)
            ? (r[i] = {
                from: l !== void 0 && u ? l * ro : l,
                to: c !== void 0 && d ? c * ro : c,
              })
            : (r[i] = { from: l, to: c });
      }
    }
    return o ? { ...n, spline: r } : n;
  }
  function Mu(n, e, t, r, o, i, s) {
    let a = e.getInstance(n);
    if (a) return (0, no.setupAnimation)(a, t, r, o, i, s);
    let l,
      c = () => {
        let u = e.getInstance(n);
        u && (l = (0, no.setupAnimation)(u, t, r, o, i, s)),
          n.removeEventListener("w-spline-load", c);
      };
    return (
      n.addEventListener("w-spline-load", c),
      () => {
        n.removeEventListener("w-spline-load", c), l?.();
      }
    );
  }
  function Au(n) {
    n.addAction("spline", {
      createCustomTween: (e, t, r, o, i, s) => {
        let a = t.tt ?? 0;
        if (!i.length || !window.Webflow || !r.objectId) return;
        let l = window.Webflow.require?.("spline");
        if (!l) return;
        let c = [];
        for (let u of i) {
          let d = Eu(r, u),
            f = Mu(u, l, d, o, e, a, s);
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
var uo = m((Xn) => {
  "use strict";
  Object.defineProperty(Xn, "__esModule", { value: !0 });
  Object.defineProperty(Xn, "buildVariableAction", {
    enumerable: !0,
    get: function () {
      return Ou;
    },
  });
  var Yn = Z();
  function Ou(n) {
    n.addAction("variable", {
      createCustomTween: (e, t, r, o, i, s) => {
        let a = r.variable;
        if (!a) return;
        let l = Object.keys(a),
          c = l.length;
        if (c === 0) return;
        let u = (t.targets?.length ?? 0) > 0;
        if (u && i.length === 0) return;
        let d = u ? Array.from(new Set(i)) : _u(l),
          f = d.length,
          g = new Array(f),
          h = new Array(f);
        for (let b = 0; b < f; b++) {
          let v = d[b].style;
          g[b] = v;
          let w = new Array(c);
          for (let I = 0; I < c; I++) {
            let E = l[I];
            (w[I] = v.getPropertyValue(E)), v.removeProperty(E);
          }
          h[b] = w;
        }
        let p = t.tt ?? Yn.TweenType.To,
          y = s || 0,
          { force3D: T, ...A } = o,
          C = l.some((b) => a[b].startsWith("var(")),
          M = (b) => {
            let v = {};
            for (let w = 0; w < c; w++) {
              let I = l[w],
                E = a[I];
              v[I] =
                (b &&
                  E.startsWith("var(") &&
                  b.getPropertyValue(E.slice(4, -1)).trim()) ||
                E;
            }
            return v;
          };
        if (u)
          for (let b = 0; b < f; b++) {
            let v = d[b],
              w = M(C ? getComputedStyle(v) : null);
            oo(e, p, v, { ...w, ...A }, y);
          }
        else {
          let v = {
            ...M(C ? getComputedStyle(document.documentElement) : null),
            ...A,
          };
          for (let w = 0; w < f; w++) oo(e, p, d[w], v, y);
        }
        return () => {
          for (let b = 0; b < f; b++) {
            let v = g[b],
              w = h[b];
            for (let I = 0; I < c; I++) {
              let E = w[I];
              E ? v.setProperty(l[I], E) : v.removeProperty(l[I]);
            }
          }
        };
      },
    });
  }
  function _u(n) {
    let e = [document.documentElement];
    if (n.length === 0) return e;
    let t = Iu(n) ?? Ru(n);
    for (let r = 0; r < t.length; r++) e.push(t[r]);
    return e;
  }
  function oo(n, e, t, r, o) {
    e === Yn.TweenType.From
      ? n.from(t, r, o)
      : e === Yn.TweenType.Set
      ? n.set(t, r, o)
      : n.to(t, r, o);
  }
  function Iu(n) {
    let e = new Set([document.documentElement]),
      t = [],
      r = new Map();
    try {
      let o = document.styleSheets;
      for (let i = 0; i < o.length; i++) ao(o[i].cssRules, n, t, e, r);
      return t;
    } catch {
      return null;
    }
  }
  function ao(n, e, t, r, o) {
    for (let i = 0; i < n.length; i++) {
      let s = n[i];
      if (s instanceof CSSMediaRule) {
        let l = s.conditionText,
          c = o.get(l);
        c === void 0 && ((c = matchMedia(l).matches), o.set(l, c)),
          c && ao(s.cssRules, e, t, r, o);
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
              r.has(d) || (r.add(d), t.push(d));
            }
          } catch {}
          break;
        }
    }
  }
  var lo = "__ix3__";
  function Ru(n) {
    let e = document.documentElement,
      t = document.body,
      r = [],
      o = n.length,
      i = [],
      s = [];
    co(e, n, o, i, s), so(t, n, o, r, i, s);
    let a = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT),
      l;
    for (; (l = a.nextNode()); ) so(l, n, o, r, i, s);
    for (let c = 0; c < i.length; c++) {
      let u = i[c].style,
        d = s[c];
      for (let f = 0; f < o; f++) {
        let g = d[f];
        g ? u.setProperty(n[f], g) : u.removeProperty(n[f]);
      }
    }
    return r;
  }
  function co(n, e, t, r, o) {
    let i = n.style,
      s = new Array(t);
    for (let a = 0; a < t; a++) {
      let l = e[a];
      (s[a] = i.getPropertyValue(l)), i.setProperty(l, lo);
    }
    r.push(n), o.push(s);
  }
  function so(n, e, t, r, o, i) {
    let s = getComputedStyle(n);
    for (let a = 0; a < t; a++)
      if (s.getPropertyValue(e[a]) !== lo) {
        r.push(n), co(n, e, t, o, i);
        return;
      }
  }
});
var fo = m((Zn) => {
  "use strict";
  Object.defineProperty(Zn, "__esModule", { value: !0 });
  function Pu(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Pu(Zn, {
    getFirst: function () {
      return xu;
    },
    getSecond: function () {
      return ku;
    },
    pair: function () {
      return Nu;
    },
  });
  var xu = (n) => n[0],
    ku = (n) => n[1],
    Nu = (n, e) => [n, e];
});
var Kn = m((Qn) => {
  "use strict";
  Object.defineProperty(Qn, "__esModule", { value: !0 });
  function Fu(n, e) {
    for (var t in e) Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
  }
  Fu(Qn, {
    elementTargetSelector: function () {
      return Uu;
    },
    safeClosest: function () {
      return ju;
    },
    safeGetElementById: function () {
      return Lu;
    },
    safeMatches: function () {
      return Vu;
    },
    safeQuerySelector: function () {
      return Bu;
    },
    safeQuerySelectorAll: function () {
      return Du;
    },
  });
  var rt = Ue(),
    Lu = (n) => {
      try {
        let e = document.getElementById(n);
        return e && !(0, rt.isTransientIX3Clone)(e) ? e : null;
      } catch {
        return null;
      }
    },
    Du = (n, e) => {
      try {
        let t = e.querySelectorAll(n);
        if (t.length === 0) return [];
        let r = [];
        for (let o of t) (0, rt.isTransientIX3Clone)(o) || r.push(o);
        return r;
      } catch {
        return null;
      }
    },
    Bu = (n, e) => {
      try {
        let t = e.querySelector(n);
        if (!t) return null;
        if (!(0, rt.isTransientIX3Clone)(t)) return t;
        let r = e.querySelectorAll(n);
        for (let o of r) if (!(0, rt.isTransientIX3Clone)(o)) return o;
        return null;
      } catch {
        return null;
      }
    },
    ju = (n, e) => {
      try {
        return n.closest(e);
      } catch {
        return null;
      }
    },
    Vu = (n, e) => {
      try {
        return n.matches(e);
      } catch {
        return null;
      }
    },
    Uu = (n) => `[data-wf-target*="${CSS.escape(`[${JSON.stringify(n)}`)}"]`;
});
var po = m((Jn) => {
  "use strict";
  Object.defineProperty(Jn, "__esModule", { value: !0 });
  Object.defineProperty(Jn, "applyScope", {
    enumerable: !0,
    get: function () {
      return $u;
    },
  });
  var K = ne(),
    it = Kn(),
    qu = Ue(),
    Y = (n) => n.filter((e) => !(0, qu.isTransientIX3Clone)(e)),
    $u = (n, e) => {
      let t = Y(n);
      if (!e) return t;
      if (Array.isArray(e)) {
        let [r, o] = e,
          i = [];
        switch (r) {
          case K.TargetScope.FIRST_ANCESTOR:
            for (let s of t) {
              let a = o ? (0, it.safeClosest)(s, o) : null;
              a && i.push(a);
            }
            return Y(i);
          case K.TargetScope.FIRST_DESCENDANT:
            for (let s of t) {
              let a = o ? (0, it.safeQuerySelector)(o, s) : s.firstElementChild;
              a && i.push(a);
            }
            return Y(i);
          case K.TargetScope.DESCENDANTS:
            for (let s of t)
              i.push(...((0, it.safeQuerySelectorAll)(o, s) || []));
            return Y(i);
          case K.TargetScope.ANCESTORS:
            for (let s of t) {
              let a = s.parentElement;
              for (; a; )
                (!o || (0, it.safeMatches)(a, o)) && i.push(a),
                  (a = a.parentElement);
            }
            return Y(i);
        }
      }
      switch (e) {
        case K.TargetScope.CHILDREN:
          return Y(t.flatMap((r) => [...r.children]));
        case K.TargetScope.PARENT:
          return Y(t.map((r) => r.parentElement).filter(Boolean));
        case K.TargetScope.SIBLINGS:
          return Y(
            t.flatMap((r) =>
              r.parentElement
                ? [...r.parentElement.children].filter((o) => o !== r)
                : []
            )
          );
        case K.TargetScope.NEXT:
          return Y(t.flatMap((r) => r.nextElementSibling || []));
        case K.TargetScope.PREVIOUS:
          return Y(t.flatMap((r) => r.previousElementSibling || []));
        default:
          return t;
      }
    };
});
var go = m((er) => {
  "use strict";
  Object.defineProperty(er, "__esModule", { value: !0 });
  Object.defineProperty(er, "build", {
    enumerable: !0,
    get: function () {
      return Hu;
    },
  });
  var Te = fo(),
    we = Kn(),
    ie = po();
  function Hu(n) {
    let e = [];
    n.addTargetResolver("id", {
      resolve: ([, t]) => {
        let [r, o] = Array.isArray(t) ? t : [t],
          i = r ? (0, we.safeGetElementById)(r) : null;
        return i ? (0, ie.applyScope)([i], o) : e;
      },
    })
      .addTargetResolver("trigger-only", {
        resolve: ([, t], { triggerElement: r }) =>
          r ? (0, ie.applyScope)([r], Array.isArray(t) ? t[1] : void 0) : e,
        isDynamic: !0,
      })
      .addTargetResolver("trigger-only-parent", {
        resolve: ([, t], { triggerElement: r }) => {
          if (!r) return e;
          let o = r.parentElement;
          return o instanceof HTMLElement
            ? (0, ie.applyScope)([o], Array.isArray(t) ? t[1] : void 0)
            : e;
        },
        isDynamic: !0,
      })
      .addTargetResolver("inst", {
        resolve: ([, t], { triggerElement: r }) => {
          if (!Array.isArray(t)) return e;
          let [o, i] = t,
            s = Array.isArray(o),
            a = s ? (0, Te.pair)(o[0], o[1]) : (0, Te.pair)(o, i),
            l = (0, we.safeQuerySelectorAll)(
              (0, we.elementTargetSelector)(a),
              document
            );
          if (!l?.length) return e;
          let c = [...l];
          if (!r) return (0, ie.applyScope)(c, s ? i : void 0);
          let u = r.dataset.wfTarget;
          if (!u) return c;
          try {
            let d = JSON.parse(u),
              f = (0, Te.getFirst)(a),
              g = d.find((h) => (0, Te.getFirst)((0, Te.getFirst)(h)) === f);
            return g
              ? (0, ie.applyScope)(
                  c.filter((h) =>
                    (h.dataset.wfTarget || "").includes(
                      `${JSON.stringify((0, Te.getSecond)(g))}]`
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
          let [r, o] = Array.isArray(t) ? t : [t],
            i = r ? (0, we.safeQuerySelectorAll)(`.${r}`, document) : null;
          return i ? (0, ie.applyScope)([...i], o) : e;
        },
      })
      .addTargetResolver("selector", {
        resolve: ([, t]) => {
          let [r, o] = Array.isArray(t) ? t : [t],
            i = r ? (0, we.safeQuerySelectorAll)(r, document) : null;
          return i ? (0, ie.applyScope)([...i], o) : e;
        },
      })
      .addTargetResolver("body", { resolve: () => [document.body] })
      .addTargetResolver("attribute", {
        resolve: ([, t]) => {
          let [r, o] = Array.isArray(t) ? t : [t],
            i = r ? (0, we.safeQuerySelectorAll)(r, document) : null;
          return i ? (0, ie.applyScope)([...i], o) : e;
        },
      })
      .addTargetResolver("any-element", { resolve: () => e })
      .addTargetResolver("viewport", {
        resolve: () => [document.documentElement],
      });
  }
});
var mo = m((tr) => {
  "use strict";
  Object.defineProperty(tr, "__esModule", { value: !0 });
  Object.defineProperty(tr, "plugin", {
    enumerable: !0,
    get: function () {
      return Ju;
    },
  });
  var Gu = fi(),
    zu = Si(),
    Wu = Mi(),
    ho = $i(),
    Yu = io(),
    Xu = uo(),
    Zu = go(),
    Qu = Z(),
    Ku = ne(),
    J = new Qu.RuntimeBuilder(Ku.CORE_PLUGIN_INFO);
  (0, Gu.build)(J);
  (0, zu.build)(J);
  (0, Wu.buildLottieAction)(J);
  (0, ho.buildRiveAction)(J);
  (0, ho.buildAnimateRiveAction)(J);
  (0, Yu.buildSplineAction)(J);
  (0, Xu.buildVariableAction)(J);
  (0, Zu.build)(J);
  var Ju = J.buildRuntime();
});
var yo = m((nr) => {
  "use strict";
  Object.defineProperty(nr, "__esModule", { value: !0 });
  Object.defineProperty(nr, "plugin", {
    enumerable: !0,
    get: function () {
      return ed.plugin;
    },
  });
  var ed = mo();
});
var vo = ar(Dr()),
  bo = ar(yo());
async function td() {
  try {
    let n = await vo.IX3.init({ doc: document, win: window });
    return (
      await n.registerPlugin(bo.plugin),
      { register: (e, t) => n.register(e, t), destroy: () => n.destroy() }
    );
  } catch (n) {
    throw (console.error("[Devlink IX3] Engine initialization failed:", n), n);
  }
}
var zf = { createIX3Engine: td };
export { td as createIX3Engine, zf as default };
