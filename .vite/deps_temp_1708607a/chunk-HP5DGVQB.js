import {
  createPopper
} from "./chunk-TAM2IQJX.js";
import {
  require_react_dom
} from "./chunk-KLGTMP6T.js";
import {
  ThemeProvider_default,
  colorChannel,
  createCssVarsProvider,
  createGetCssVar,
  createStyled,
  prepareCssVars_default,
  useThemeProps,
  useTheme_default
} from "./chunk-7KNQBXVU.js";
import {
  HTMLElementType,
  chainPropTypes,
  createChainedFunction,
  debounce,
  elementAcceptingRef_default,
  exactProp,
  getScrollbarSize,
  init_esm,
  init_useControlled,
  integerPropType_default,
  ownerDocument,
  ownerWindow,
  refType_default,
  setRef,
  useControlled,
  useEnhancedEffect_default,
  useEventCallback_default,
  useForkRef,
  useId,
  useIsFocusVisible,
  usePreviousProps_default,
  useTimeout,
  visuallyHidden_default
} from "./chunk-5EOUEVSN.js";
import {
  _objectWithoutPropertiesLoose,
  applyStyles,
  capitalize,
  clamp_default,
  clsx_default,
  composeClasses,
  createBreakpoints,
  createSpacing,
  css,
  deepmerge,
  defaultSxConfig_default,
  generateUtilityClass,
  generateUtilityClasses,
  globalStateClasses,
  init_clsx,
  init_createTheme,
  init_formatMuiErrorMessage,
  init_generateUtilityClass,
  init_objectWithoutPropertiesLoose,
  keyframes,
  require_jsx_runtime,
  styleFunctionSx_default
} from "./chunk-MNFB5OEH.js";
import {
  _extends,
  init_extends
} from "./chunk-72JO3JMQ.js";
import {
  require_prop_types
} from "./chunk-K4EYXPH5.js";
import {
  require_react
} from "./chunk-N4N5IM6X.js";
import {
  __toESM
} from "./chunk-LK32TJAX.js";

// node_modules/@mui/joy/ModalClose/ModalClose.js
init_objectWithoutPropertiesLoose();
init_extends();
var React87 = __toESM(require_react());
var import_prop_types34 = __toESM(require_prop_types());

// node_modules/@mui/base/utils/appendOwnerState.js
init_extends();

// node_modules/@mui/base/utils/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}

// node_modules/@mui/base/utils/appendOwnerState.js
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent(elementType)) {
    return otherProps;
  }
  return _extends({}, otherProps, {
    ownerState: _extends({}, otherProps.ownerState, ownerState)
  });
}

// node_modules/@mui/base/utils/areArraysEqual.js
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index2) => itemComparer(value, array2[index2]));
}

// node_modules/@mui/base/utils/ClassNameConfigurator.js
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var defaultContextValue = {
  disableDefaultClasses: false
};
var ClassNameConfiguratorContext = React.createContext(defaultContextValue);
if (true) {
  ClassNameConfiguratorContext.displayName = "ClassNameConfiguratorContext";
}
function useClassNamesOverride(generateUtilityClass4) {
  const {
    disableDefaultClasses
  } = React.useContext(ClassNameConfiguratorContext);
  return (slot) => {
    if (disableDefaultClasses) {
      return "";
    }
    return generateUtilityClass4(slot);
  };
}

// node_modules/@mui/base/utils/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}

// node_modules/@mui/base/utils/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState, slotState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState, slotState);
  }
  return componentProps;
}

// node_modules/@mui/base/utils/useRootElementName.js
var React2 = __toESM(require_react());
function useRootElementName(parameters) {
  const {
    rootElementName: rootElementNameProp = "",
    componentName
  } = parameters;
  const [rootElementName, setRootElementName] = React2.useState(rootElementNameProp.toUpperCase());
  if (true) {
    React2.useEffect(() => {
      if (rootElementNameProp && rootElementName !== rootElementNameProp.toUpperCase()) {
        console.error(`useRootElementName: the \`rootElementName\` prop of ${componentName ? `the ${componentName} component` : "a component"} expected the '${rootElementNameProp}' element, but a '${rootElementName.toLowerCase()}' was rendered instead`, "This may cause hydration issues in an SSR context, for example in a Next.js app");
      }
    }, [rootElementNameProp, rootElementName, componentName]);
  }
  const updateRootElementName = React2.useCallback((instance) => {
    var _instance$tagName;
    setRootElementName((_instance$tagName = instance == null ? void 0 : instance.tagName) != null ? _instance$tagName : "");
  }, []);
  return [rootElementName, updateRootElementName];
}

// node_modules/@mui/base/utils/useSlotProps.js
init_extends();
init_objectWithoutPropertiesLoose();
init_esm();

// node_modules/@mui/base/utils/mergeSlotProps.js
init_extends();
init_clsx();

// node_modules/@mui/base/utils/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}

// node_modules/@mui/base/utils/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_default(additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
    const mergedStyle2 = _extends({}, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
    const props2 = _extends({}, additionalProps, externalForwardedProps, externalSlotProps);
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers(_extends({}, externalForwardedProps, externalSlotProps));
  const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = _extends({}, internalSlotProps == null ? void 0 : internalSlotProps.style, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
  const props = _extends({}, internalSlotProps, additionalProps, otherPropsWithoutEventHandlers, componentsPropsWithoutEventHandlers);
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}

// node_modules/@mui/base/utils/useSlotProps.js
var _excluded = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function useSlotProps(parameters) {
  var _parameters$additiona;
  const {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false
  } = parameters, rest = _objectWithoutPropertiesLoose(parameters, _excluded);
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps(_extends({}, rest, {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_parameters$additiona = parameters.additionalProps) == null ? void 0 : _parameters$additiona.ref);
  const props = appendOwnerState(elementType, _extends({}, mergedProps, {
    ref
  }), ownerState);
  return props;
}

// node_modules/@mui/base/utils/prepareForSlot.js
init_extends();
init_objectWithoutPropertiesLoose();
var React3 = __toESM(require_react());

// node_modules/@mui/base/Badge/Badge.js
init_extends();
init_objectWithoutPropertiesLoose();
var React4 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/base/composeClasses/index.js
init_esm();

// node_modules/@mui/base/useBadge/useBadge.js
init_esm();
function useBadge(parameters) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false
  } = parameters;
  const prevProps = usePreviousProps_default({
    badgeContent: badgeContentProp,
    max: maxProp
  });
  let invisible = invisibleProp;
  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }
  const {
    badgeContent,
    max: max2 = maxProp
  } = invisible ? prevProps : parameters;
  const displayValue = badgeContent && Number(badgeContent) > max2 ? `${max2}+` : badgeContent;
  return {
    badgeContent,
    invisible,
    max: max2,
    displayValue
  };
}

// node_modules/@mui/base/generateUtilityClass/index.js
init_generateUtilityClass();
var GLOBAL_CLASS_PREFIX = "base";
function buildStateClass(state) {
  return `${GLOBAL_CLASS_PREFIX}--${state}`;
}
function buildSlotClass(componentName, slot) {
  return `${GLOBAL_CLASS_PREFIX}-${componentName}-${slot}`;
}
function generateUtilityClass2(componentName, slot) {
  const globalStateClass = globalStateClasses[slot];
  return globalStateClass ? buildStateClass(globalStateClass) : buildSlotClass(componentName, slot);
}

// node_modules/@mui/base/generateUtilityClasses/index.js
function generateUtilityClasses2(componentName, slots) {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass2(componentName, slot);
  });
  return result;
}

// node_modules/@mui/base/Badge/badgeClasses.js
var COMPONENT_NAME = "Badge";
function getBadgeUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME, slot);
}
var badgeClasses = generateUtilityClasses2(COMPONENT_NAME, ["root", "badge", "invisible"]);

// node_modules/@mui/base/Badge/Badge.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded2 = ["badgeContent", "children", "invisible", "max", "slotProps", "slots", "showZero"];
var useUtilityClasses = (ownerState) => {
  const {
    invisible
  } = ownerState;
  const slots = {
    root: ["root"],
    badge: ["badge", invisible && "invisible"]
  };
  return composeClasses(slots, useClassNamesOverride(getBadgeUtilityClass));
};
var Badge = React4.forwardRef(function Badge2(props, forwardedRef) {
  var _slots$root, _slots$badge;
  const {
    children,
    max: maxProp = 99,
    slotProps = {},
    slots = {},
    showZero = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const {
    badgeContent,
    max: max2,
    displayValue,
    invisible
  } = useBadge(_extends({}, props, {
    max: maxProp
  }));
  const ownerState = _extends({}, props, {
    badgeContent,
    invisible,
    max: max2,
    showZero
  });
  const classes = useUtilityClasses(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "span";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  const BadgeComponent = (_slots$badge = slots.badge) != null ? _slots$badge : "span";
  const badgeProps = useSlotProps({
    elementType: BadgeComponent,
    externalSlotProps: slotProps.badge,
    ownerState,
    className: classes.badge
  });
  return (0, import_jsx_runtime3.jsxs)(Root, _extends({}, rootProps, {
    children: [children, (0, import_jsx_runtime2.jsx)(BadgeComponent, _extends({}, badgeProps, {
      children: displayValue
    }))]
  }));
});
true ? Badge.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content rendered within the badge.
   */
  badgeContent: import_prop_types.default.node,
  /**
   * The badge will be added relative to this node.
   */
  children: import_prop_types.default.node,
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible: import_prop_types.default.bool,
  /**
   * Max count to show.
   * @default 99
   */
  max: import_prop_types.default.number,
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: import_prop_types.default.bool,
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    badge: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    badge: import_prop_types.default.elementType,
    root: import_prop_types.default.elementType
  })
} : void 0;

// node_modules/@mui/base/Button/Button.js
init_extends();
init_objectWithoutPropertiesLoose();
var React6 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/@mui/base/Button/buttonClasses.js
var COMPONENT_NAME2 = "Button";
function getButtonUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME2, slot);
}
var buttonClasses = generateUtilityClasses2(COMPONENT_NAME2, ["root", "active", "disabled", "focusVisible"]);

// node_modules/@mui/base/useButton/useButton.js
init_extends();
var React5 = __toESM(require_react());
init_esm();
function useButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    href,
    rootRef: externalRef,
    tabIndex,
    to,
    type,
    rootElementName: rootElementNameProp
  } = parameters;
  const buttonRef = React5.useRef();
  const [active, setActive] = React5.useState(false);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React5.useState(false);
  if (disabled && !focusableWhenDisabled && focusVisible) {
    setFocusVisible(false);
  }
  React5.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const [rootElementName, updateRootElementName] = useRootElementName({
    rootElementName: rootElementNameProp != null ? rootElementNameProp : href || to ? "a" : void 0,
    componentName: "Button"
  });
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    if (focusVisible) {
      event.preventDefault();
    }
    (_otherHandlers$onMous = otherHandlers.onMouseLeave) == null || _otherHandlers$onMous.call(otherHandlers, event);
  };
  const createHandleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu2;
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      var _otherHandlers$onFocu;
      setFocusVisible(true);
      (_otherHandlers$onFocu = otherHandlers.onFocusVisible) == null || _otherHandlers$onFocu.call(otherHandlers, event);
    }
    (_otherHandlers$onFocu2 = otherHandlers.onFocus) == null || _otherHandlers$onFocu2.call(otherHandlers, event);
  };
  const isNativeButton = () => {
    const button = buttonRef.current;
    return rootElementName === "BUTTON" || rootElementName === "INPUT" && ["button", "submit", "reset"].includes(button == null ? void 0 : button.type) || rootElementName === "A" && (button == null ? void 0 : button.href);
  };
  const createHandleClick = (otherHandlers) => (event) => {
    if (!disabled) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    }
  };
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    if (!disabled) {
      setActive(true);
      document.addEventListener("mouseup", () => {
        setActive(false);
      }, {
        once: true
      });
    }
    (_otherHandlers$onMous2 = otherHandlers.onMouseDown) == null || _otherHandlers$onMous2.call(otherHandlers, event);
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (event.target === event.currentTarget && event.key === " " && !disabled) {
      setActive(true);
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === "Enter" && !disabled) {
      var _otherHandlers$onClic2;
      (_otherHandlers$onClic2 = otherHandlers.onClick) == null || _otherHandlers$onClic2.call(otherHandlers, event);
      event.preventDefault();
    }
  };
  const createHandleKeyUp = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyU;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null || _otherHandlers$onKeyU.call(otherHandlers, event);
    if (event.target === event.currentTarget && !isNativeButton() && !disabled && event.key === " " && !event.defaultMuiPrevented) {
      var _otherHandlers$onClic3;
      (_otherHandlers$onClic3 = otherHandlers.onClick) == null || _otherHandlers$onClic3.call(otherHandlers, event);
    }
  };
  const handleRef = useForkRef(updateRootElementName, externalRef, focusVisibleRef, buttonRef);
  const buttonProps = {};
  if (tabIndex !== void 0) {
    buttonProps.tabIndex = tabIndex;
  }
  if (rootElementName === "BUTTON") {
    buttonProps.type = type != null ? type : "button";
    if (focusableWhenDisabled) {
      buttonProps["aria-disabled"] = disabled;
    } else {
      buttonProps.disabled = disabled;
    }
  } else if (rootElementName === "INPUT") {
    if (type && ["button", "submit", "reset"].includes(type)) {
      if (focusableWhenDisabled) {
        buttonProps["aria-disabled"] = disabled;
      } else {
        buttonProps.disabled = disabled;
      }
    }
  } else if (rootElementName !== "") {
    if (!href && !to) {
      buttonProps.role = "button";
      buttonProps.tabIndex = tabIndex != null ? tabIndex : 0;
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
      buttonProps.tabIndex = focusableWhenDisabled ? tabIndex != null ? tabIndex : 0 : -1;
    }
  }
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = _extends({}, extractEventHandlers(parameters), extractEventHandlers(externalProps));
    const props = _extends({
      type
    }, externalEventHandlers, buttonProps, externalProps, {
      onBlur: createHandleBlur(externalEventHandlers),
      onClick: createHandleClick(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      ref: handleRef
    });
    delete props.onFocusVisible;
    return props;
  };
  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    active,
    rootRef: handleRef
  };
}

// node_modules/@mui/base/Button/Button.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var _excluded3 = ["action", "children", "disabled", "focusableWhenDisabled", "onFocusVisible", "slotProps", "slots", "rootElementName"];
var useUtilityClasses2 = (ownerState) => {
  const {
    active,
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active"]
  };
  return composeClasses(slots, useClassNamesOverride(getButtonUtilityClass));
};
var Button = React6.forwardRef(function Button2(props, forwardedRef) {
  var _slots$root;
  const {
    action,
    children,
    focusableWhenDisabled = false,
    slotProps = {},
    slots = {},
    rootElementName: rootElementNameProp = "button"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  const buttonRef = React6.useRef();
  let rootElementName = rootElementNameProp;
  if (typeof slots.root === "string") {
    rootElementName = slots.root;
  } else if (other.href || other.to) {
    rootElementName = "a";
  }
  const {
    active,
    focusVisible,
    setFocusVisible,
    getRootProps
  } = useButton(_extends({}, props, {
    focusableWhenDisabled,
    rootElementName
  }));
  React6.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), [setFocusVisible]);
  const ownerState = _extends({}, props, {
    active,
    focusableWhenDisabled,
    focusVisible
  });
  const classes = useUtilityClasses2(ownerState);
  const defaultElement = other.href || other.to ? "a" : "button";
  const Root = (_slots$root = slots.root) != null ? _slots$root : defaultElement;
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime4.jsx)(Root, _extends({}, rootProps, {
    children
  }));
});
true ? Button.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.shape({
    current: import_prop_types2.default.shape({
      focusVisible: import_prop_types2.default.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  children: import_prop_types2.default.node,
  /**
   * @ignore
   */
  className: import_prop_types2.default.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types2.default.bool,
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled: import_prop_types2.default.bool,
  /**
   * @ignore
   */
  href: import_prop_types2.default.string,
  /**
   * @ignore
   */
  onFocusVisible: import_prop_types2.default.func,
  /**
   * The HTML element that is ultimately rendered, for example 'button' or 'a'
   * @default 'button'
   */
  rootElementName: import_prop_types2.default.string,
  /**
   * The props used for each slot inside the Button.
   * @default {}
   */
  slotProps: import_prop_types2.default.shape({
    root: import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object])
  }),
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types2.default.shape({
    root: import_prop_types2.default.elementType
  }),
  /**
   * @ignore
   */
  to: import_prop_types2.default.string
} : void 0;

// node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js
var React7 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
init_esm();
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}
function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
function ClickAwayListener(props) {
  const {
    children,
    disableReactTree = false,
    mouseEvent = "onClick",
    onClickAway,
    touchEvent = "onTouchEnd"
  } = props;
  const movedRef = React7.useRef(false);
  const nodeRef = React7.useRef(null);
  const activatedRef = React7.useRef(false);
  const syntheticEventRef = React7.useRef(false);
  React7.useEffect(() => {
    setTimeout(() => {
      activatedRef.current = true;
    }, 0);
    return () => {
      activatedRef.current = false;
    };
  }, []);
  const handleRef = useForkRef(
    // @ts-expect-error TODO upstream fix
    children.ref,
    nodeRef
  );
  const handleClickAway = useEventCallback_default((event) => {
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = ownerDocument(nodeRef.current);
    if (!activatedRef.current || !nodeRef.current || "clientX" in event && clickedRootScrollbar(event, doc)) {
      return;
    }
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM;
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(
        // @ts-expect-error returns `false` as intended when not dispatched from a Node
        event.target
      ) || nodeRef.current.contains(
        // @ts-expect-error returns `false` as intended when not dispatched from a Node
        event.target
      );
    }
    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  });
  const createHandleSynthetic = (handlerName) => (event) => {
    syntheticEventRef.current = true;
    const childrenPropsHandler = children.props[handlerName];
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const childrenProps = {
    ref: handleRef
  };
  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }
  React7.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener("touchmove", handleTouchMove);
      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener("touchmove", handleTouchMove);
      };
    }
    return void 0;
  }, [handleClickAway, touchEvent]);
  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }
  React7.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }
    return void 0;
  }, [handleClickAway, mouseEvent]);
  return (0, import_jsx_runtime5.jsx)(React7.Fragment, {
    children: React7.cloneElement(children, childrenProps)
  });
}
true ? ClickAwayListener.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The wrapped element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portaled elements are handled.
   * @default false
   */
  disableReactTree: import_prop_types3.default.bool,
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   * @default 'onClick'
   */
  mouseEvent: import_prop_types3.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: import_prop_types3.default.func.isRequired,
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   * @default 'onTouchEnd'
   */
  touchEvent: import_prop_types3.default.oneOf(["onTouchEnd", "onTouchStart", false])
} : void 0;
if (true) {
  ClickAwayListener["propTypes"] = exactProp(ClickAwayListener.propTypes);
}

// node_modules/@mui/base/Dropdown/Dropdown.js
var React11 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());
init_esm();

// node_modules/@mui/base/useDropdown/DropdownContext.js
var React8 = __toESM(require_react());
var DropdownContext = React8.createContext(null);
if (true) {
  DropdownContext.displayName = "DropdownContext";
}

// node_modules/@mui/base/useDropdown/useDropdown.js
var React10 = __toESM(require_react());

// node_modules/@mui/base/utils/useControllableReducer.js
init_extends();
var React9 = __toESM(require_react());
function areEqual(a, b) {
  return a === b;
}
var EMPTY_OBJECT = {};
var NOOP = () => {
};
function getControlledState(internalState, controlledProps) {
  const augmentedState = _extends({}, internalState);
  Object.keys(controlledProps).forEach((key) => {
    if (controlledProps[key] !== void 0) {
      augmentedState[key] = controlledProps[key];
    }
  });
  return augmentedState;
}
function useStateChangeDetection(parameters) {
  const {
    nextState,
    initialState,
    stateComparers,
    onStateChange,
    controlledProps,
    lastActionRef
  } = parameters;
  const internalPreviousStateRef = React9.useRef(initialState);
  React9.useEffect(() => {
    if (lastActionRef.current === null) {
      return;
    }
    const previousState = getControlledState(internalPreviousStateRef.current, controlledProps);
    Object.keys(nextState).forEach((key) => {
      var _stateComparers$key;
      const stateComparer = (_stateComparers$key = stateComparers[key]) != null ? _stateComparers$key : areEqual;
      const nextStateItem = nextState[key];
      const previousStateItem = previousState[key];
      if (previousStateItem == null && nextStateItem != null || previousStateItem != null && nextStateItem == null || previousStateItem != null && nextStateItem != null && !stateComparer(nextStateItem, previousStateItem)) {
        var _event, _type;
        onStateChange == null || onStateChange((_event = lastActionRef.current.event) != null ? _event : null, key, nextStateItem, (_type = lastActionRef.current.type) != null ? _type : "", nextState);
      }
    });
    internalPreviousStateRef.current = nextState;
    lastActionRef.current = null;
  }, [internalPreviousStateRef, nextState, lastActionRef, onStateChange, stateComparers, controlledProps]);
}
function useControllableReducer(parameters) {
  const lastActionRef = React9.useRef(null);
  const {
    reducer,
    initialState,
    controlledProps = EMPTY_OBJECT,
    stateComparers = EMPTY_OBJECT,
    onStateChange = NOOP,
    actionContext,
    componentName = ""
  } = parameters;
  const controlledPropsRef = React9.useRef(controlledProps);
  if (true) {
    React9.useEffect(() => {
      Object.keys(controlledProps).forEach((key) => {
        if (controlledPropsRef.current[key] !== void 0 && controlledProps[key] === void 0) {
          console.error(`useControllableReducer: ${componentName ? `The ${componentName} component` : "A component"} is changing a controlled prop to be uncontrolled: ${key}`);
        }
        if (controlledPropsRef.current[key] === void 0 && controlledProps[key] !== void 0) {
          console.error(`useControllableReducer: ${componentName ? `The ${componentName} component` : "A component"} is changing an uncontrolled prop to be controlled: ${key}`);
        }
      });
    }, [controlledProps, componentName]);
  }
  const reducerWithControlledState = React9.useCallback((state, action) => {
    lastActionRef.current = action;
    const controlledState = getControlledState(state, controlledProps);
    const newState = reducer(controlledState, action);
    return newState;
  }, [controlledProps, reducer]);
  const [nextState, dispatch] = React9.useReducer(reducerWithControlledState, initialState);
  const dispatchWithContext = React9.useCallback((action) => {
    dispatch(_extends({}, action, {
      context: actionContext
    }));
  }, [actionContext]);
  useStateChangeDetection({
    nextState,
    initialState,
    stateComparers: stateComparers != null ? stateComparers : EMPTY_OBJECT,
    onStateChange: onStateChange != null ? onStateChange : NOOP,
    controlledProps,
    lastActionRef
  });
  return [getControlledState(nextState, controlledProps), dispatchWithContext];
}

// node_modules/@mui/base/useDropdown/useDropdown.types.js
var DropdownActionTypes = {
  blur: "dropdown:blur",
  escapeKeyDown: "dropdown:escapeKeyDown",
  toggle: "dropdown:toggle",
  open: "dropdown:open",
  close: "dropdown:close"
};

// node_modules/@mui/base/useDropdown/dropdownReducer.js
function dropdownReducer(state, action) {
  switch (action.type) {
    case DropdownActionTypes.blur:
      return {
        open: false,
        changeReason: action.event
      };
    case DropdownActionTypes.escapeKeyDown:
      return {
        open: false,
        changeReason: action.event
      };
    case DropdownActionTypes.toggle:
      return {
        open: !state.open,
        changeReason: action.event
      };
    case DropdownActionTypes.open:
      return {
        open: true,
        changeReason: action.event
      };
    case DropdownActionTypes.close:
      return {
        open: false,
        changeReason: action.event
      };
    default:
      throw new Error(`Unhandled action`);
  }
}

// node_modules/@mui/base/useDropdown/useDropdown.js
function useDropdown(parameters = {}) {
  const {
    defaultOpen,
    onOpenChange,
    open: openProp,
    componentName = "useDropdown"
  } = parameters;
  const [popupId, setPopupId] = React10.useState("");
  const [triggerElement, setTriggerElement] = React10.useState(null);
  const lastActionType = React10.useRef(null);
  const handleStateChange = React10.useCallback((event, field, value, reason) => {
    if (field === "open") {
      onOpenChange == null || onOpenChange(event, value);
    }
    lastActionType.current = reason;
  }, [onOpenChange]);
  const controlledProps = React10.useMemo(() => openProp !== void 0 ? {
    open: openProp
  } : {}, [openProp]);
  const [state, dispatch] = useControllableReducer({
    controlledProps,
    initialState: defaultOpen ? {
      open: true,
      changeReason: null
    } : {
      open: false,
      changeReason: null
    },
    onStateChange: handleStateChange,
    reducer: dropdownReducer,
    componentName
  });
  React10.useEffect(() => {
    if (!state.open && lastActionType.current !== null && lastActionType.current !== DropdownActionTypes.blur) {
      triggerElement == null || triggerElement.focus();
    }
  }, [state.open, triggerElement]);
  const contextValue = {
    state,
    dispatch,
    popupId,
    registerPopup: setPopupId,
    registerTrigger: setTriggerElement,
    triggerElement
  };
  return {
    contextValue,
    open: state.open
  };
}

// node_modules/@mui/base/Dropdown/Dropdown.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
function Dropdown(props) {
  const {
    children,
    open,
    defaultOpen,
    onOpenChange
  } = props;
  const {
    contextValue
  } = useDropdown({
    defaultOpen,
    onOpenChange,
    open
  });
  return (0, import_jsx_runtime6.jsx)(DropdownContext.Provider, {
    value: contextValue,
    children
  });
}
true ? Dropdown.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types4.default.node,
  /**
   * If `true`, the dropdown is initially open.
   */
  defaultOpen: import_prop_types4.default.bool,
  /**
   * Callback fired when the component requests to be opened or closed.
   */
  onOpenChange: import_prop_types4.default.func,
  /**
   * Allows to control whether the dropdown is open.
   * This is a controlled counterpart of `defaultOpen`.
   */
  open: import_prop_types4.default.bool
} : void 0;
if (true) {
  Dropdown["propTypes"] = exactProp(Dropdown.propTypes);
}

// node_modules/@mui/base/FocusTrap/FocusTrap.js
var React12 = __toESM(require_react());
var import_prop_types5 = __toESM(require_prop_types());
init_esm();
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex") || "", 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== "INPUT" || node.type !== "radio") {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function FocusTrap(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = React12.useRef(false);
  const sentinelStart = React12.useRef(null);
  const sentinelEnd = React12.useRef(null);
  const nodeToRestore = React12.useRef(null);
  const reactFocusEventTarget = React12.useRef(null);
  const activated = React12.useRef(false);
  const rootRef = React12.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = React12.useRef(null);
  React12.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  React12.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        if (true) {
          console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join("\n"));
        }
        rootRef.current.setAttribute("tabIndex", "-1");
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  React12.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        if (sentinelEnd.current) {
          sentinelEnd.current.focus();
        }
      }
    };
    const contain = () => {
      const rootElement = rootRef.current;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (rootElement.contains(doc.activeElement)) {
        return;
      }
      if (disableEnforceFocus && doc.activeElement !== sentinelStart.current && doc.activeElement !== sentinelEnd.current) {
        return;
      }
      if (doc.activeElement !== reactFocusEventTarget.current) {
        reactFocusEventTarget.current = null;
      } else if (reactFocusEventTarget.current !== null) {
        return;
      }
      if (!activated.current) {
        return;
      }
      let tabbable = [];
      if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
        tabbable = getTabbable(rootRef.current);
      }
      if (tabbable.length > 0) {
        var _lastKeydown$current, _lastKeydown$current2;
        const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === "Tab");
        const focusNext = tabbable[0];
        const focusPrevious = tabbable[tabbable.length - 1];
        if (typeof focusNext !== "string" && typeof focusPrevious !== "string") {
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        }
      } else {
        rootElement.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement && doc.activeElement.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return (0, import_jsx_runtime8.jsxs)(React12.Fragment, {
    children: [(0, import_jsx_runtime7.jsx)("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-testid": "sentinelStart"
    }), React12.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), (0, import_jsx_runtime7.jsx)("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-testid": "sentinelEnd"
    })]
  });
}
true ? FocusTrap.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: import_prop_types5.default.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: import_prop_types5.default.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: import_prop_types5.default.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: import_prop_types5.default.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: import_prop_types5.default.func,
  /**
   * If `true`, focus is locked.
   */
  open: import_prop_types5.default.bool.isRequired
} : void 0;
if (true) {
  FocusTrap["propTypes"] = exactProp(FocusTrap.propTypes);
}

// node_modules/@mui/base/FormControl/FormControl.js
init_extends();
init_objectWithoutPropertiesLoose();
var React14 = __toESM(require_react());
var import_prop_types6 = __toESM(require_prop_types());
init_useControlled();

// node_modules/@mui/base/FormControl/FormControlContext.js
var React13 = __toESM(require_react());
var FormControlContext = React13.createContext(void 0);
if (true) {
  FormControlContext.displayName = "FormControlContext";
}

// node_modules/@mui/base/FormControl/formControlClasses.js
var COMPONENT_NAME3 = "FormControl";
function getFormControlUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME3, slot);
}
var formControlClasses = generateUtilityClasses2(COMPONENT_NAME3, ["root", "disabled", "error", "filled", "focused", "required"]);

// node_modules/@mui/base/FormControl/FormControl.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var _excluded4 = ["defaultValue", "children", "disabled", "error", "onChange", "required", "slotProps", "slots", "value"];
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== "";
}
function useUtilityClasses3(ownerState) {
  const {
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focused && "focused", error && "error", filled && "filled", required && "required"]
  };
  return composeClasses(slots, useClassNamesOverride(getFormControlUtilityClass));
}
var FormControl = React14.forwardRef(function FormControl2(props, forwardedRef) {
  var _slots$root;
  const {
    defaultValue,
    children,
    disabled = false,
    error = false,
    onChange,
    required = false,
    slotProps = {},
    slots = {},
    value: incomingValue
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  const [value, setValue] = useControlled({
    controlled: incomingValue,
    default: defaultValue,
    name: "FormControl",
    state: "value"
  });
  const filled = hasValue(value);
  const [focusedState, setFocused] = React14.useState(false);
  const focused = focusedState && !disabled;
  React14.useEffect(() => setFocused((isFocused) => disabled ? false : isFocused), [disabled]);
  const ownerState = _extends({}, props, {
    disabled,
    error,
    filled,
    focused,
    required
  });
  const childContext = React14.useMemo(() => {
    return {
      disabled,
      error,
      filled,
      focused,
      onBlur: () => {
        setFocused(false);
      },
      onChange: (event) => {
        setValue(event.target.value);
        onChange == null || onChange(event);
      },
      onFocus: () => {
        setFocused(true);
      },
      required,
      value: value != null ? value : ""
    };
  }, [disabled, error, filled, focused, onChange, required, setValue, value]);
  const classes = useUtilityClasses3(ownerState);
  const renderChildren = () => {
    if (typeof children === "function") {
      return children(childContext);
    }
    return children;
  };
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
      children: renderChildren()
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime9.jsx)(FormControlContext.Provider, {
    value: childContext,
    children: (0, import_jsx_runtime9.jsx)(Root, _extends({}, rootProps))
  });
});
true ? FormControl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types6.default.oneOfType([import_prop_types6.default.node, import_prop_types6.default.func]),
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types6.default.string,
  /**
   * @ignore
   */
  defaultValue: import_prop_types6.default.any,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: import_prop_types6.default.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: import_prop_types6.default.bool,
  /**
   * Callback fired when the form element's value is modified.
   */
  onChange: import_prop_types6.default.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: import_prop_types6.default.bool,
  /**
   * The props used for each slot inside the FormControl.
   * @default {}
   */
  slotProps: import_prop_types6.default.shape({
    root: import_prop_types6.default.oneOfType([import_prop_types6.default.func, import_prop_types6.default.object])
  }),
  /**
   * The components used for each slot inside the FormControl.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types6.default.shape({
    root: import_prop_types6.default.elementType
  }),
  /**
   * The value of the form element.
   */
  value: import_prop_types6.default.any
} : void 0;

// node_modules/@mui/base/FormControl/useFormControlContext.js
var React15 = __toESM(require_react());
function useFormControlContext() {
  return React15.useContext(FormControlContext);
}

// node_modules/@mui/base/Input/Input.js
init_extends();
init_objectWithoutPropertiesLoose();
var React17 = __toESM(require_react());
var import_prop_types7 = __toESM(require_prop_types());

// node_modules/@mui/base/Input/inputClasses.js
var COMPONENT_NAME4 = "Input";
function getInputUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME4, slot);
}
var inputClasses = generateUtilityClasses2(COMPONENT_NAME4, ["root", "formControl", "focused", "disabled", "error", "multiline", "input", "inputMultiline", "inputTypeSearch", "adornedStart", "adornedEnd"]);

// node_modules/@mui/base/useInput/useInput.js
init_extends();
init_formatMuiErrorMessage();
var React16 = __toESM(require_react());
init_esm();
function useInput(parameters = {}) {
  const {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    required: requiredProp = false,
    value: valueProp,
    inputRef: inputRefProp
  } = parameters;
  const formControlContext = useFormControlContext();
  let defaultValue;
  let disabled;
  let error;
  let required;
  let value;
  if (formControlContext) {
    var _formControlContext$d, _formControlContext$e, _formControlContext$r;
    defaultValue = void 0;
    disabled = (_formControlContext$d = formControlContext.disabled) != null ? _formControlContext$d : false;
    error = (_formControlContext$e = formControlContext.error) != null ? _formControlContext$e : false;
    required = (_formControlContext$r = formControlContext.required) != null ? _formControlContext$r : false;
    value = formControlContext.value;
    if (true) {
      const definedLocalProps = ["defaultValue", "disabled", "error", "required", "value"].filter((prop) => parameters[prop] !== void 0);
      if (definedLocalProps.length > 0) {
        console.warn(["MUI: You have set props on an input that is inside a FormControl.", "Set these props on a FormControl instead. Otherwise they will be ignored.", `Ignored props: ${definedLocalProps.join(", ")}`].join("\n"));
      }
    }
  } else {
    defaultValue = defaultValueProp;
    disabled = disabledProp;
    error = errorProp;
    required = requiredProp;
    value = valueProp;
  }
  const {
    current: isControlled
  } = React16.useRef(value != null);
  const handleInputRefWarning = React16.useCallback((instance) => {
    if (true) {
      if (instance && instance.nodeName !== "INPUT" && !instance.focus) {
        console.error(["MUI: You have provided a `slots.input` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join("\n"));
      }
    }
  }, []);
  const inputRef = React16.useRef(null);
  const handleInputRef = useForkRef(inputRef, inputRefProp, handleInputRefWarning);
  const [focused, setFocused] = React16.useState(false);
  React16.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false);
      onBlur == null || onBlur();
    }
  }, [formControlContext, disabled, focused, onBlur]);
  const handleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    if (formControlContext != null && formControlContext.disabled) {
      event.stopPropagation();
      return;
    }
    (_otherHandlers$onFocu = otherHandlers.onFocus) == null || _otherHandlers$onFocu.call(otherHandlers, event);
    if (formControlContext && formControlContext.onFocus) {
      var _formControlContext$o;
      formControlContext == null || (_formControlContext$o = formControlContext.onFocus) == null || _formControlContext$o.call(formControlContext);
    } else {
      setFocused(true);
    }
  };
  const handleBlur2 = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };
  const handleChange = (otherHandlers) => (event, ...args) => {
    var _formControlContext$o2, _otherHandlers$onChan;
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(true ? `MUI: Expected valid input target. Did you use a custom \`slots.input\` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.` : formatMuiErrorMessage(17));
      }
    }
    formControlContext == null || (_formControlContext$o2 = formControlContext.onChange) == null || _formControlContext$o2.call(formControlContext, event);
    (_otherHandlers$onChan = otherHandlers.onChange) == null || _otherHandlers$onChan.call(otherHandlers, event, ...args);
  };
  const handleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
  };
  const getRootProps = (externalProps = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters, ["onBlur", "onChange", "onFocus"]);
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: handleClick(externalEventHandlers)
    });
  };
  const getInputProps = (externalProps = {}) => {
    const propsEventHandlers = {
      onBlur,
      onChange,
      onFocus
    };
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    const mergedEventHandlers = _extends({}, externalEventHandlers, {
      onBlur: handleBlur2(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers)
    });
    return _extends({}, mergedEventHandlers, {
      "aria-invalid": error || void 0,
      defaultValue,
      value,
      required,
      disabled
    }, externalProps, {
      ref: handleInputRef
    }, mergedEventHandlers);
  };
  return {
    disabled,
    error,
    focused,
    formControlContext,
    getInputProps,
    getRootProps,
    inputRef: handleInputRef,
    required,
    value
  };
}

// node_modules/@mui/base/Input/Input.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var _excluded5 = ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "defaultValue", "disabled", "endAdornment", "error", "id", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "startAdornment", "value", "type", "rows", "slotProps", "slots", "minRows", "maxRows"];
var useUtilityClasses4 = (ownerState) => {
  const {
    disabled,
    error,
    focused,
    formControlContext,
    multiline,
    startAdornment,
    endAdornment
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", error && "error", focused && "focused", Boolean(formControlContext) && "formControl", multiline && "multiline", Boolean(startAdornment) && "adornedStart", Boolean(endAdornment) && "adornedEnd"],
    input: ["input", disabled && "disabled", multiline && "multiline"]
  };
  return composeClasses(slots, useClassNamesOverride(getInputUtilityClass));
};
var Input = React17.forwardRef(function Input2(props, forwardedRef) {
  var _slots$root, _slots$textarea, _slots$input;
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    defaultValue,
    disabled,
    endAdornment,
    error,
    id,
    multiline = false,
    name,
    onClick,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    placeholder,
    readOnly,
    required,
    startAdornment,
    value,
    type: typeProp,
    rows,
    slotProps = {},
    slots = {},
    minRows,
    maxRows
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
  const {
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState
  } = useInput({
    disabled,
    defaultValue,
    error,
    onBlur,
    onClick,
    onChange,
    onFocus,
    required,
    value
  });
  const type = !multiline ? typeProp != null ? typeProp : "text" : void 0;
  const ownerState = _extends({}, props, {
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    multiline,
    type
  });
  const classes = useUtilityClasses4(ownerState);
  const propsToForward = {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    autoComplete,
    autoFocus,
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type
  };
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: [classes.root, className]
  });
  const InputComponent = multiline ? (_slots$textarea = slots.textarea) != null ? _slots$textarea : "textarea" : (_slots$input = slots.input) != null ? _slots$input : "input";
  const inputProps = useSlotProps({
    elementType: InputComponent,
    getSlotProps: (otherHandlers) => {
      return getInputProps(_extends({}, propsToForward, otherHandlers));
    },
    externalSlotProps: slotProps.input,
    additionalProps: _extends({
      rows: multiline ? rows : void 0
    }, multiline && !isHostComponent(InputComponent) && {
      minRows: rows || minRows,
      maxRows: rows || maxRows
    }),
    ownerState,
    className: classes.input
  });
  if (true) {
    if (multiline) {
      if (rows) {
        if (minRows || maxRows) {
          console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.");
        }
      }
    }
  }
  return (0, import_jsx_runtime11.jsxs)(Root, _extends({}, rootProps, {
    children: [startAdornment, (0, import_jsx_runtime10.jsx)(InputComponent, _extends({}, inputProps)), endAdornment]
  }));
});
true ? Input.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  "aria-describedby": import_prop_types7.default.string,
  /**
   * @ignore
   */
  "aria-label": import_prop_types7.default.string,
  /**
   * @ignore
   */
  "aria-labelledby": import_prop_types7.default.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: import_prop_types7.default.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: import_prop_types7.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types7.default.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types7.default.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: import_prop_types7.default.bool,
  /**
   * Trailing adornment for this input.
   */
  endAdornment: import_prop_types7.default.node,
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `baseui--error` class on the root element.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: import_prop_types7.default.bool,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types7.default.string,
  /**
   * @ignore
   */
  inputRef: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.shape({
    current: import_prop_types7.default.object
  })]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: import_prop_types7.default.number,
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: import_prop_types7.default.number,
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: import_prop_types7.default.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: import_prop_types7.default.string,
  /**
   * @ignore
   */
  onBlur: import_prop_types7.default.func,
  /**
   * @ignore
   */
  onChange: import_prop_types7.default.func,
  /**
   * @ignore
   */
  onClick: import_prop_types7.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types7.default.func,
  /**
   * @ignore
   */
  onKeyDown: import_prop_types7.default.func,
  /**
   * @ignore
   */
  onKeyUp: import_prop_types7.default.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: import_prop_types7.default.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: import_prop_types7.default.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: import_prop_types7.default.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: import_prop_types7.default.number,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: import_prop_types7.default.shape({
    input: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object]),
    root: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object])
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types7.default.shape({
    input: import_prop_types7.default.elementType,
    root: import_prop_types7.default.elementType,
    textarea: import_prop_types7.default.elementType
  }),
  /**
   * Leading adornment for this input.
   */
  startAdornment: import_prop_types7.default.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: import_prop_types7.default.oneOf(["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"]),
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: import_prop_types7.default.any
} : void 0;

// node_modules/@mui/base/Menu/Menu.js
init_extends();
init_objectWithoutPropertiesLoose();
var React33 = __toESM(require_react());
var import_prop_types10 = __toESM(require_prop_types());
init_esm();

// node_modules/@mui/base/Menu/menuClasses.js
var COMPONENT_NAME5 = "Menu";
function getMenuUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME5, slot);
}
var menuClasses = generateUtilityClasses2(COMPONENT_NAME5, ["root", "listbox", "expanded"]);

// node_modules/@mui/base/useMenu/useMenu.js
init_extends();
var React24 = __toESM(require_react());
init_esm();

// node_modules/@mui/base/useMenu/menuReducer.js
init_extends();

// node_modules/@mui/base/useList/useList.js
init_extends();
var React19 = __toESM(require_react());
init_esm();

// node_modules/@mui/base/useList/listActions.types.js
var ListActionTypes = {
  blur: "list:blur",
  focus: "list:focus",
  itemClick: "list:itemClick",
  itemHover: "list:itemHover",
  itemsChange: "list:itemsChange",
  keyDown: "list:keyDown",
  resetHighlight: "list:resetHighlight",
  highlightLast: "list:highlightLast",
  textNavigation: "list:textNavigation",
  clearSelection: "list:clearSelection"
};

// node_modules/@mui/base/useList/listReducer.js
init_extends();
function findValidItemToHighlight(currentIndex, lookupDirection, items, includeDisabledItems, isItemDisabled, wrapAround) {
  if (items.length === 0 || !includeDisabledItems && items.every((item, itemIndex) => isItemDisabled(item, itemIndex))) {
    return -1;
  }
  let nextFocus = currentIndex;
  for (; ; ) {
    if (!wrapAround && lookupDirection === "next" && nextFocus === items.length || !wrapAround && lookupDirection === "previous" && nextFocus === -1) {
      return -1;
    }
    const nextFocusDisabled = includeDisabledItems ? false : isItemDisabled(items[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += lookupDirection === "next" ? 1 : -1;
      if (wrapAround) {
        nextFocus = (nextFocus + items.length) % items.length;
      }
    } else {
      return nextFocus;
    }
  }
}
function moveHighlight(previouslyHighlightedValue, offset4, context) {
  var _items$nextIndex;
  const {
    items,
    isItemDisabled,
    disableListWrap,
    disabledItemsFocusable,
    itemComparer,
    focusManagement
  } = context;
  const defaultHighlightedIndex = focusManagement === "DOM" ? 0 : -1;
  const maxIndex = items.length - 1;
  const previouslyHighlightedIndex = previouslyHighlightedValue == null ? -1 : items.findIndex((item) => itemComparer(item, previouslyHighlightedValue));
  let nextIndexCandidate;
  let lookupDirection;
  let wrapAround = !disableListWrap;
  switch (offset4) {
    case "reset":
      if (defaultHighlightedIndex === -1) {
        return null;
      }
      nextIndexCandidate = 0;
      lookupDirection = "next";
      wrapAround = false;
      break;
    case "start":
      nextIndexCandidate = 0;
      lookupDirection = "next";
      wrapAround = false;
      break;
    case "end":
      nextIndexCandidate = maxIndex;
      lookupDirection = "previous";
      wrapAround = false;
      break;
    default: {
      const newIndex = previouslyHighlightedIndex + offset4;
      if (newIndex < 0) {
        if (!wrapAround && previouslyHighlightedIndex !== -1 || Math.abs(offset4) > 1) {
          nextIndexCandidate = 0;
          lookupDirection = "next";
        } else {
          nextIndexCandidate = maxIndex;
          lookupDirection = "previous";
        }
      } else if (newIndex > maxIndex) {
        if (!wrapAround || Math.abs(offset4) > 1) {
          nextIndexCandidate = maxIndex;
          lookupDirection = "previous";
        } else {
          nextIndexCandidate = 0;
          lookupDirection = "next";
        }
      } else {
        nextIndexCandidate = newIndex;
        lookupDirection = offset4 >= 0 ? "next" : "previous";
      }
    }
  }
  const nextIndex = findValidItemToHighlight(nextIndexCandidate, lookupDirection, items, disabledItemsFocusable, isItemDisabled, wrapAround);
  if (nextIndex === -1 && previouslyHighlightedValue !== null && !isItemDisabled(previouslyHighlightedValue, previouslyHighlightedIndex)) {
    return previouslyHighlightedValue;
  }
  return (_items$nextIndex = items[nextIndex]) != null ? _items$nextIndex : null;
}
function toggleSelection(item, selectedValues, selectionMode, itemComparer) {
  if (selectionMode === "none") {
    return [];
  }
  if (selectionMode === "single") {
    if (itemComparer(selectedValues[0], item)) {
      return selectedValues;
    }
    return [item];
  }
  if (selectedValues.some((sv) => itemComparer(sv, item))) {
    return selectedValues.filter((sv) => !itemComparer(sv, item));
  }
  return [...selectedValues, item];
}
function handleItemSelection(item, state, context) {
  const {
    itemComparer,
    isItemDisabled,
    selectionMode,
    items
  } = context;
  const {
    selectedValues
  } = state;
  const itemIndex = items.findIndex((i) => itemComparer(item, i));
  if (isItemDisabled(item, itemIndex)) {
    return state;
  }
  const newSelectedValues = toggleSelection(item, selectedValues, selectionMode, itemComparer);
  return _extends({}, state, {
    selectedValues: newSelectedValues,
    highlightedValue: item
  });
}
function handleKeyDown(key, state, context) {
  const previouslySelectedValue = state.highlightedValue;
  const {
    orientation,
    pageSize: pageSize2
  } = context;
  switch (key) {
    case "Home":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, "start", context)
      });
    case "End":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, "end", context)
      });
    case "PageUp":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, -pageSize2, context)
      });
    case "PageDown":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, pageSize2, context)
      });
    case "ArrowUp":
      if (orientation !== "vertical") {
        break;
      }
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, -1, context)
      });
    case "ArrowDown":
      if (orientation !== "vertical") {
        break;
      }
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, 1, context)
      });
    case "ArrowLeft": {
      if (orientation === "vertical") {
        break;
      }
      const offset4 = orientation === "horizontal-ltr" ? -1 : 1;
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, offset4, context)
      });
    }
    case "ArrowRight": {
      if (orientation === "vertical") {
        break;
      }
      const offset4 = orientation === "horizontal-ltr" ? 1 : -1;
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, offset4, context)
      });
    }
    case "Enter":
    case " ":
      if (state.highlightedValue === null) {
        return state;
      }
      return handleItemSelection(state.highlightedValue, state, context);
    default:
      break;
  }
  return state;
}
function handleBlur(state, context) {
  if (context.focusManagement === "DOM") {
    return state;
  }
  return _extends({}, state, {
    highlightedValue: null
  });
}
function textCriteriaMatches(nextFocus, searchString, stringifyItem) {
  var _stringifyItem;
  const text = (_stringifyItem = stringifyItem(nextFocus)) == null ? void 0 : _stringifyItem.trim().toLowerCase();
  if (!text || text.length === 0) {
    return false;
  }
  return text.indexOf(searchString) === 0;
}
function handleTextNavigation(state, searchString, context) {
  const {
    items,
    isItemDisabled,
    disabledItemsFocusable,
    getItemAsString
  } = context;
  const startWithCurrentItem = searchString.length > 1;
  let nextItem = startWithCurrentItem ? state.highlightedValue : moveHighlight(state.highlightedValue, 1, context);
  for (let index2 = 0; index2 < items.length; index2 += 1) {
    if (!nextItem || !startWithCurrentItem && state.highlightedValue === nextItem) {
      return state;
    }
    if (textCriteriaMatches(nextItem, searchString, getItemAsString) && (!isItemDisabled(nextItem, items.indexOf(nextItem)) || disabledItemsFocusable)) {
      return _extends({}, state, {
        highlightedValue: nextItem
      });
    }
    nextItem = moveHighlight(nextItem, 1, context);
  }
  return state;
}
function handleItemsChange(items, previousItems, state, context) {
  var _state$selectedValues;
  const {
    itemComparer,
    focusManagement
  } = context;
  let newHighlightedValue = null;
  if (state.highlightedValue != null) {
    var _items$find;
    newHighlightedValue = (_items$find = items.find((item) => itemComparer(item, state.highlightedValue))) != null ? _items$find : null;
  } else if (focusManagement === "DOM" && previousItems.length === 0) {
    newHighlightedValue = moveHighlight(null, "reset", context);
  }
  const selectedValues = (_state$selectedValues = state.selectedValues) != null ? _state$selectedValues : [];
  const newSelectedValues = selectedValues.filter((selectedValue) => items.some((item) => itemComparer(item, selectedValue)));
  return _extends({}, state, {
    highlightedValue: newHighlightedValue,
    selectedValues: newSelectedValues
  });
}
function handleResetHighlight(state, context) {
  return _extends({}, state, {
    highlightedValue: moveHighlight(null, "reset", context)
  });
}
function handleHighlightLast(state, context) {
  return _extends({}, state, {
    highlightedValue: moveHighlight(null, "end", context)
  });
}
function handleClearSelection(state, context) {
  return _extends({}, state, {
    selectedValues: [],
    highlightedValue: moveHighlight(null, "reset", context)
  });
}
function listReducer(state, action) {
  const {
    type,
    context
  } = action;
  switch (type) {
    case ListActionTypes.keyDown:
      return handleKeyDown(action.key, state, context);
    case ListActionTypes.itemClick:
      return handleItemSelection(action.item, state, context);
    case ListActionTypes.blur:
      return handleBlur(state, context);
    case ListActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, context);
    case ListActionTypes.itemsChange:
      return handleItemsChange(action.items, action.previousItems, state, context);
    case ListActionTypes.resetHighlight:
      return handleResetHighlight(state, context);
    case ListActionTypes.highlightLast:
      return handleHighlightLast(state, context);
    case ListActionTypes.clearSelection:
      return handleClearSelection(state, context);
    default:
      return state;
  }
}

// node_modules/@mui/base/utils/useTextNavigation.js
var React18 = __toESM(require_react());
var TEXT_NAVIGATION_RESET_TIMEOUT = 500;
function useTextNavigation(callback) {
  const textCriteriaRef = React18.useRef({
    searchString: "",
    lastTime: null
  });
  return React18.useCallback((event) => {
    if (event.key.length === 1 && event.key !== " ") {
      const textCriteria = textCriteriaRef.current;
      const lowerKey = event.key.toLowerCase();
      const currentTime = performance.now();
      if (textCriteria.searchString.length > 0 && textCriteria.lastTime && currentTime - textCriteria.lastTime > TEXT_NAVIGATION_RESET_TIMEOUT) {
        textCriteria.searchString = lowerKey;
      } else if (textCriteria.searchString.length !== 1 || lowerKey !== textCriteria.searchString) {
        textCriteria.searchString += lowerKey;
      }
      textCriteria.lastTime = currentTime;
      callback(textCriteria.searchString, event);
    }
  }, [callback]);
}

// node_modules/@mui/base/useList/useList.js
var EMPTY_OBJECT2 = {};
var NOOP2 = () => {
};
var defaultItemComparer = (optionA, optionB) => optionA === optionB;
var defaultIsItemDisabled = () => false;
var defaultItemStringifier = (item) => typeof item === "string" ? item : String(item);
var defaultGetInitialState = () => ({
  highlightedValue: null,
  selectedValues: []
});
function useList(params) {
  const {
    controlledProps = EMPTY_OBJECT2,
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = "activeDescendant",
    getInitialState = defaultGetInitialState,
    getItemDomElement,
    getItemId,
    isItemDisabled = defaultIsItemDisabled,
    rootRef: externalListRef,
    onStateChange = NOOP2,
    items,
    itemComparer = defaultItemComparer,
    getItemAsString = defaultItemStringifier,
    onChange,
    onHighlightChange,
    onItemsChange,
    orientation = "vertical",
    pageSize: pageSize2 = 5,
    reducerActionContext = EMPTY_OBJECT2,
    selectionMode = "single",
    stateReducer: externalReducer,
    componentName = "useList"
  } = params;
  if (true) {
    if (focusManagement === "DOM" && getItemDomElement == null) {
      throw new Error("useList: The `getItemDomElement` prop is required when using the `DOM` focus management.");
    }
    if (focusManagement === "activeDescendant" && getItemId == null) {
      throw new Error("useList: The `getItemId` prop is required when using the `activeDescendant` focus management.");
    }
  }
  const listRef = React19.useRef(null);
  const handleRef = useForkRef(externalListRef, listRef);
  const handleHighlightChange = React19.useCallback((event, value, reason) => {
    onHighlightChange == null || onHighlightChange(event, value, reason);
    if (focusManagement === "DOM" && value != null && (reason === ListActionTypes.itemClick || reason === ListActionTypes.keyDown || reason === ListActionTypes.textNavigation)) {
      var _getItemDomElement;
      getItemDomElement == null || (_getItemDomElement = getItemDomElement(value)) == null || _getItemDomElement.focus();
    }
  }, [getItemDomElement, onHighlightChange, focusManagement]);
  const stateComparers = React19.useMemo(() => ({
    highlightedValue: itemComparer,
    selectedValues: (valuesArray1, valuesArray2) => areArraysEqual(valuesArray1, valuesArray2, itemComparer)
  }), [itemComparer]);
  const handleStateChange = React19.useCallback((event, field, value, reason, state2) => {
    onStateChange == null || onStateChange(event, field, value, reason, state2);
    switch (field) {
      case "highlightedValue":
        handleHighlightChange(event, value, reason);
        break;
      case "selectedValues":
        onChange == null || onChange(event, value, reason);
        break;
      default:
        break;
    }
  }, [handleHighlightChange, onChange, onStateChange]);
  const listActionContext = React19.useMemo(() => {
    return {
      disabledItemsFocusable,
      disableListWrap,
      focusManagement,
      isItemDisabled,
      itemComparer,
      items,
      getItemAsString,
      onHighlightChange: handleHighlightChange,
      orientation,
      pageSize: pageSize2,
      selectionMode,
      stateComparers
    };
  }, [disabledItemsFocusable, disableListWrap, focusManagement, isItemDisabled, itemComparer, items, getItemAsString, handleHighlightChange, orientation, pageSize2, selectionMode, stateComparers]);
  const initialState = getInitialState();
  const reducer = externalReducer != null ? externalReducer : listReducer;
  const actionContext = React19.useMemo(() => _extends({}, reducerActionContext, listActionContext), [reducerActionContext, listActionContext]);
  const [state, dispatch] = useControllableReducer({
    reducer,
    actionContext,
    initialState,
    controlledProps,
    stateComparers,
    onStateChange: handleStateChange,
    componentName
  });
  const {
    highlightedValue,
    selectedValues
  } = state;
  const handleTextNavigation2 = useTextNavigation((searchString, event) => dispatch({
    type: ListActionTypes.textNavigation,
    event,
    searchString
  }));
  const previousItems = React19.useRef([]);
  React19.useEffect(() => {
    if (areArraysEqual(previousItems.current, items, itemComparer)) {
      return;
    }
    dispatch({
      type: ListActionTypes.itemsChange,
      event: null,
      items,
      previousItems: previousItems.current
    });
    previousItems.current = items;
    onItemsChange == null || onItemsChange(items);
  }, [items, itemComparer, dispatch, onItemsChange]);
  const createHandleKeyDown = (externalHandlers) => (event) => {
    var _externalHandlers$onK;
    (_externalHandlers$onK = externalHandlers.onKeyDown) == null || _externalHandlers$onK.call(externalHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    const keysToPreventDefault = ["Home", "End", "PageUp", "PageDown"];
    if (orientation === "vertical") {
      keysToPreventDefault.push("ArrowUp", "ArrowDown");
    } else {
      keysToPreventDefault.push("ArrowLeft", "ArrowRight");
    }
    if (focusManagement === "activeDescendant") {
      keysToPreventDefault.push(" ", "Enter");
    }
    if (keysToPreventDefault.includes(event.key)) {
      event.preventDefault();
    }
    dispatch({
      type: ListActionTypes.keyDown,
      key: event.key,
      event
    });
    handleTextNavigation2(event);
  };
  const createHandleBlur = (externalHandlers) => (event) => {
    var _externalHandlers$onB, _listRef$current;
    (_externalHandlers$onB = externalHandlers.onBlur) == null || _externalHandlers$onB.call(externalHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if ((_listRef$current = listRef.current) != null && _listRef$current.contains(event.relatedTarget)) {
      return;
    }
    dispatch({
      type: ListActionTypes.blur,
      event
    });
  };
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({}, externalProps, {
      "aria-activedescendant": focusManagement === "activeDescendant" && highlightedValue != null ? getItemId(highlightedValue) : void 0,
      tabIndex: focusManagement === "DOM" ? -1 : 0,
      ref: handleRef
    }, externalEventHandlers, {
      onBlur: createHandleBlur(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers)
    });
  };
  const getItemState = React19.useCallback((item) => {
    const selected = (selectedValues != null ? selectedValues : []).some((value) => value != null && itemComparer(item, value));
    const highlighted = highlightedValue != null && itemComparer(item, highlightedValue);
    const focusable = focusManagement === "DOM";
    return {
      focusable,
      highlighted,
      selected
    };
  }, [itemComparer, selectedValues, highlightedValue, focusManagement]);
  const contextValue = React19.useMemo(() => ({
    dispatch,
    getItemState
  }), [dispatch, getItemState]);
  React19.useDebugValue({
    state
  });
  return {
    contextValue,
    dispatch,
    getRootProps,
    rootRef: handleRef,
    state
  };
}

// node_modules/@mui/base/useList/useListItem.js
init_extends();
var React21 = __toESM(require_react());

// node_modules/@mui/base/useList/ListContext.js
var React20 = __toESM(require_react());
var ListContext = React20.createContext(null);
if (true) {
  ListContext.displayName = "ListContext";
}

// node_modules/@mui/base/useList/useListItem.js
function useListItem(parameters) {
  const {
    handlePointerOverEvents = false,
    item
  } = parameters;
  const listContext = React21.useContext(ListContext);
  if (!listContext) {
    throw new Error("useListItem must be used within a ListProvider");
  }
  const {
    dispatch,
    getItemState
  } = listContext;
  const {
    highlighted,
    selected,
    focusable
  } = getItemState(item);
  const createHandleClick = React21.useCallback((externalHandlers) => (event) => {
    var _externalHandlers$onC;
    (_externalHandlers$onC = externalHandlers.onClick) == null || _externalHandlers$onC.call(externalHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (true) {
      if (item === void 0) {
        throw new Error(["MUI: The `item` provided to useListItem() is undefined.", "This should happen only during server-side rendering under React 17."].join("\n"));
      }
    }
    dispatch({
      type: ListActionTypes.itemClick,
      item,
      event
    });
  }, [dispatch, item]);
  const createHandlePointerOver = React21.useCallback((externalHandlers) => (event) => {
    var _externalHandlers$onM;
    (_externalHandlers$onM = externalHandlers.onMouseOver) == null || _externalHandlers$onM.call(externalHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (true) {
      if (item === void 0) {
        throw new Error(["MUI: The `item` provided to useListItem() is undefined.", "This should happen only during server-side rendering under React 17."].join("\n"));
      }
    }
    dispatch({
      type: ListActionTypes.itemHover,
      item,
      event
    });
  }, [dispatch, item]);
  let tabIndex;
  if (focusable) {
    tabIndex = highlighted ? 0 : -1;
  }
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({}, externalProps, {
      onClick: createHandleClick(externalEventHandlers),
      onPointerOver: handlePointerOverEvents ? createHandlePointerOver(externalEventHandlers) : void 0,
      tabIndex
    });
  };
  return {
    getRootProps,
    highlighted,
    selected
  };
}

// node_modules/@mui/base/useMenu/menuReducer.js
function menuReducer(state, action) {
  if (action.type === ListActionTypes.itemHover) {
    return _extends({}, state, {
      highlightedValue: action.item
    });
  }
  const newState = listReducer(state, action);
  if (newState.highlightedValue === null && action.context.items.length > 0) {
    return _extends({}, newState, {
      highlightedValue: action.context.items[0]
    });
  }
  if (action.type === ListActionTypes.keyDown) {
    if (action.event.key === "Escape") {
      return _extends({}, newState, {
        open: false
      });
    }
  }
  if (action.type === ListActionTypes.blur) {
    var _action$context$listb;
    if (!((_action$context$listb = action.context.listboxRef.current) != null && _action$context$listb.contains(action.event.relatedTarget))) {
      var _action$context$listb2, _action$event$related;
      const listboxId = (_action$context$listb2 = action.context.listboxRef.current) == null ? void 0 : _action$context$listb2.getAttribute("id");
      const controlledBy = (_action$event$related = action.event.relatedTarget) == null ? void 0 : _action$event$related.getAttribute("aria-controls");
      if (listboxId && controlledBy && listboxId === controlledBy) {
        return newState;
      }
      return _extends({}, newState, {
        open: false,
        highlightedValue: action.context.items[0]
      });
    }
  }
  return newState;
}

// node_modules/@mui/base/useCompound/useCompoundParent.js
var React22 = __toESM(require_react());
var CompoundComponentContext = React22.createContext(null);
if (true) {
  CompoundComponentContext.displayName = "CompoundComponentContext";
}
function sortSubitems(subitems) {
  const subitemsArray = Array.from(subitems.keys()).map((key) => {
    const subitem = subitems.get(key);
    return {
      key,
      subitem
    };
  });
  subitemsArray.sort((a, b) => {
    const aNode = a.subitem.ref.current;
    const bNode = b.subitem.ref.current;
    if (aNode === null || bNode === null || aNode === bNode) {
      return 0;
    }
    return aNode.compareDocumentPosition(bNode) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
  });
  return new Map(subitemsArray.map((item) => [item.key, item.subitem]));
}
function useCompoundParent() {
  const [subitems, setSubitems] = React22.useState(/* @__PURE__ */ new Map());
  const subitemKeys = React22.useRef(/* @__PURE__ */ new Set());
  const deregisterItem = React22.useCallback(function deregisterItem2(id) {
    subitemKeys.current.delete(id);
    setSubitems((previousState) => {
      const newState = new Map(previousState);
      newState.delete(id);
      return newState;
    });
  }, []);
  const registerItem = React22.useCallback(function registerItem2(id, item) {
    let providedOrGeneratedId;
    if (typeof id === "function") {
      providedOrGeneratedId = id(subitemKeys.current);
    } else {
      providedOrGeneratedId = id;
    }
    subitemKeys.current.add(providedOrGeneratedId);
    setSubitems((previousState) => {
      const newState = new Map(previousState);
      newState.set(providedOrGeneratedId, item);
      return newState;
    });
    return {
      id: providedOrGeneratedId,
      deregister: () => deregisterItem(providedOrGeneratedId)
    };
  }, [deregisterItem]);
  const sortedSubitems = React22.useMemo(() => sortSubitems(subitems), [subitems]);
  const getItemIndex = React22.useCallback(function getItemIndex2(id) {
    return Array.from(sortedSubitems.keys()).indexOf(id);
  }, [sortedSubitems]);
  const contextValue = React22.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount: subitems.size
  }), [getItemIndex, registerItem, subitems.size]);
  return {
    contextValue,
    subitems: sortedSubitems
  };
}

// node_modules/@mui/base/useCompound/useCompoundItem.js
var React23 = __toESM(require_react());
init_esm();
function useCompoundItem(id, itemMetadata) {
  const context = React23.useContext(CompoundComponentContext);
  if (context === null) {
    throw new Error("useCompoundItem must be used within a useCompoundParent");
  }
  const {
    registerItem
  } = context;
  const [registeredId, setRegisteredId] = React23.useState(typeof id === "function" ? void 0 : id);
  useEnhancedEffect_default(() => {
    const {
      id: returnedId,
      deregister
    } = registerItem(id, itemMetadata);
    setRegisteredId(returnedId);
    return deregister;
  }, [registerItem, itemMetadata, id]);
  return {
    id: registeredId,
    index: registeredId !== void 0 ? context.getItemIndex(registeredId) : -1,
    totalItemCount: context.totalSubitemCount
  };
}

// node_modules/@mui/base/utils/combineHooksSlotProps.js
init_extends();
function combineHooksSlotProps(getFirstProps, getSecondProps) {
  return function getCombinedProps(external = {}) {
    const firstResult = _extends({}, external, getFirstProps(external));
    const result = _extends({}, firstResult, getSecondProps(firstResult));
    return result;
  };
}

// node_modules/@mui/base/useMenu/useMenu.js
var FALLBACK_MENU_CONTEXT = {
  dispatch: () => {
  },
  popupId: "",
  registerPopup: () => {
  },
  registerTrigger: () => {
  },
  state: {
    open: true,
    changeReason: null
  },
  triggerElement: null
};
function useMenu(parameters = {}) {
  var _useId, _React$useContext;
  const {
    listboxRef: listboxRefProp,
    onItemsChange,
    id: idParam,
    disabledItemsFocusable = true,
    disableListWrap = false,
    autoFocus = true,
    componentName = "useMenu"
  } = parameters;
  const rootRef = React24.useRef(null);
  const handleRef = useForkRef(rootRef, listboxRefProp);
  const listboxId = (_useId = useId(idParam)) != null ? _useId : "";
  const {
    state: {
      open,
      changeReason
    },
    dispatch: menuDispatch,
    triggerElement,
    registerPopup
  } = (_React$useContext = React24.useContext(DropdownContext)) != null ? _React$useContext : FALLBACK_MENU_CONTEXT;
  const isInitiallyOpen = React24.useRef(open);
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const subitemKeys = React24.useMemo(() => Array.from(subitems.keys()), [subitems]);
  const getItemDomElement = React24.useCallback((itemId) => {
    var _subitems$get$ref$cur, _subitems$get;
    if (itemId == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get = subitems.get(itemId)) == null ? void 0 : _subitems$get.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  const isItemDisabled = React24.useCallback((id) => {
    var _subitems$get2;
    return (subitems == null || (_subitems$get2 = subitems.get(id)) == null ? void 0 : _subitems$get2.disabled) || false;
  }, [subitems]);
  const getItemAsString = React24.useCallback((id) => {
    var _subitems$get3, _subitems$get4;
    return ((_subitems$get3 = subitems.get(id)) == null ? void 0 : _subitems$get3.label) || ((_subitems$get4 = subitems.get(id)) == null || (_subitems$get4 = _subitems$get4.ref.current) == null ? void 0 : _subitems$get4.innerText);
  }, [subitems]);
  const reducerActionContext = React24.useMemo(() => ({
    listboxRef: rootRef
  }), [rootRef]);
  const {
    dispatch: listDispatch,
    getRootProps: getListRootProps,
    contextValue: listContextValue,
    state: {
      highlightedValue
    },
    rootRef: mergedListRef
  } = useList({
    disabledItemsFocusable,
    disableListWrap,
    focusManagement: "DOM",
    getItemDomElement,
    getInitialState: () => ({
      selectedValues: [],
      highlightedValue: null
    }),
    isItemDisabled,
    items: subitemKeys,
    getItemAsString,
    rootRef: handleRef,
    onItemsChange,
    reducerActionContext,
    selectionMode: "none",
    stateReducer: menuReducer,
    componentName
  });
  useEnhancedEffect_default(() => {
    registerPopup(listboxId);
  }, [listboxId, registerPopup]);
  useEnhancedEffect_default(() => {
    if (open && (changeReason == null ? void 0 : changeReason.type) === "keydown" && changeReason.key === "ArrowUp") {
      listDispatch({
        type: ListActionTypes.highlightLast,
        event: changeReason
      });
    }
  }, [open, changeReason, listDispatch]);
  React24.useEffect(() => {
    if (open && autoFocus && highlightedValue && !isInitiallyOpen.current) {
      var _subitems$get5;
      (_subitems$get5 = subitems.get(highlightedValue)) == null || (_subitems$get5 = _subitems$get5.ref) == null || (_subitems$get5 = _subitems$get5.current) == null || _subitems$get5.focus();
    }
  }, [open, autoFocus, highlightedValue, subitems, subitemKeys]);
  React24.useEffect(() => {
    var _rootRef$current;
    if ((_rootRef$current = rootRef.current) != null && _rootRef$current.contains(document.activeElement) && highlightedValue !== null) {
      var _subitems$get6;
      subitems == null || (_subitems$get6 = subitems.get(highlightedValue)) == null || (_subitems$get6 = _subitems$get6.ref.current) == null || _subitems$get6.focus();
    }
  }, [highlightedValue, subitems]);
  const createHandleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur, _rootRef$current2;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if ((_rootRef$current2 = rootRef.current) != null && _rootRef$current2.contains(event.relatedTarget) || event.relatedTarget === triggerElement) {
      return;
    }
    menuDispatch({
      type: DropdownActionTypes.blur,
      event
    });
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.key === "Escape") {
      menuDispatch({
        type: DropdownActionTypes.escapeKeyDown,
        event
      });
    }
  };
  const getOwnListboxHandlers = (otherHandlers = {}) => ({
    onBlur: createHandleBlur(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers)
  });
  const getListboxProps = (externalProps = {}) => {
    const getCombinedRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListRootProps);
    const externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({}, externalProps, externalEventHandlers, getCombinedRootProps(externalEventHandlers), {
      id: listboxId,
      role: "menu"
    });
  };
  React24.useDebugValue({
    subitems,
    highlightedValue
  });
  return {
    contextValue: _extends({}, compoundComponentContextValue, listContextValue),
    dispatch: listDispatch,
    getListboxProps,
    highlightedValue,
    listboxRef: mergedListRef,
    menuItems: subitems,
    open,
    triggerElement
  };
}

// node_modules/@mui/base/useMenu/MenuProvider.js
var React25 = __toESM(require_react());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
function MenuProvider(props) {
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React25.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex
  }), [dispatch, getItemIndex, getItemState]);
  const compoundComponentContextValue = React25.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return (0, import_jsx_runtime12.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime12.jsx)(ListContext.Provider, {
      value: listContextValue,
      children
    })
  });
}

// node_modules/@mui/base/Unstable_Popup/Popup.js
init_extends();
init_objectWithoutPropertiesLoose();
var React32 = __toESM(require_react());
var import_prop_types9 = __toESM(require_prop_types());

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css2 = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;
  return css2.transform !== "none" || css2.perspective !== "none" || (css2.containerType ? css2.containerType !== "normal" : false) || !webkit && (css2.backdropFilter ? css2.backdropFilter !== "none" : false) || !webkit && (css2.filter ? css2.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css2.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css2.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css2 = getComputedStyle(element);
  let width = parseFloat(css2.width) || 0;
  let height = parseFloat(css2.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css2 = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css2.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css2.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  let htmlX = 0;
  let htmlY = 0;
  if (documentElement && !isOffsetParentAnElement && !isFixed) {
    const htmlRect = documentElement.getBoundingClientRect();
    htmlY = htmlRect.top + scroll.scrollTop;
    htmlX = htmlRect.left + scroll.scrollLeft - // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect);
  }
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlX;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlY;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var React26 = __toESM(require_react(), 1);
var import_react = __toESM(require_react(), 1);
var ReactDOM = __toESM(require_react_dom(), 1);
var index = typeof document !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React26.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React26.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React26.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React26.useState(null);
  const [_floating, _setFloating] = React26.useState(null);
  const setReference = React26.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React26.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React26.useRef(null);
  const floatingRef = React26.useRef(null);
  const dataRef = React26.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React26.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React26.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React26.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React26.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React26.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React26.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
var offset3 = (options, deps) => ({
  ...offset2(options),
  options: [options, deps]
});
var shift3 = (options, deps) => ({
  ...shift2(options),
  options: [options, deps]
});
var flip3 = (options, deps) => ({
  ...flip2(options),
  options: [options, deps]
});

// node_modules/@mui/base/Unstable_Popup/Popup.js
init_esm();

// node_modules/@mui/base/Portal/Portal.js
var React27 = __toESM(require_react());
var ReactDOM2 = __toESM(require_react_dom());
var import_prop_types8 = __toESM(require_prop_types());
init_esm();
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
var Portal = React27.forwardRef(function Portal2(props, forwardedRef) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = React27.useState(null);
  const handleRef = useForkRef(React27.isValidElement(children) ? children.ref : null, forwardedRef);
  useEnhancedEffect_default(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect_default(() => {
    if (mountNode && !disablePortal) {
      setRef(forwardedRef, mountNode);
      return () => {
        setRef(forwardedRef, null);
      };
    }
    return void 0;
  }, [forwardedRef, mountNode, disablePortal]);
  if (disablePortal) {
    if (React27.isValidElement(children)) {
      const newProps = {
        ref: handleRef
      };
      return React27.cloneElement(children, newProps);
    }
    return (0, import_jsx_runtime13.jsx)(React27.Fragment, {
      children
    });
  }
  return (0, import_jsx_runtime13.jsx)(React27.Fragment, {
    children: mountNode ? ReactDOM2.createPortal(children, mountNode) : mountNode
  });
});
true ? Portal.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: import_prop_types8.default.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types8.default.oneOfType([HTMLElementType, import_prop_types8.default.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types8.default.bool
} : void 0;
if (true) {
  Portal["propTypes"] = exactProp(Portal.propTypes);
}

// node_modules/@mui/base/Unstable_Popup/popupClasses.js
var COMPONENT_NAME6 = "Popup";
function getPopupUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME6, slot);
}
var popupClasses = generateUtilityClasses2(COMPONENT_NAME6, ["root", "open"]);

// node_modules/@mui/base/useTransition/useTransitionStateManager.js
var React29 = __toESM(require_react());

// node_modules/@mui/base/useTransition/TransitionContext.js
var React28 = __toESM(require_react());
var TransitionContext = React28.createContext(null);
if (true) {
  TransitionContext.displayName = "TransitionContext";
}

// node_modules/@mui/base/useTransition/useTransitionStateManager.js
function useTransitionStateManager() {
  const transitionContext = React29.useContext(TransitionContext);
  if (!transitionContext) {
    throw new Error("Missing transition context");
  }
  const {
    registerTransition,
    requestedEnter,
    onExited
  } = transitionContext;
  React29.useEffect(() => {
    return registerTransition();
  }, [registerTransition]);
  return {
    onExited,
    requestedEnter
  };
}

// node_modules/@mui/base/useTransition/useTransitionTrigger.js
var React30 = __toESM(require_react());
function useTransitionTrigger(requestEnter) {
  const [exitTransitionFinished, setExitTransitionFinished] = React30.useState(true);
  const hasPendingExitTransition = React30.useRef(false);
  const registeredTransitions = React30.useRef(0);
  const [hasTransition, setHasTransition] = React30.useState(false);
  const previousRequestEnter = React30.useRef(requestEnter);
  React30.useEffect(() => {
    if (!requestEnter && // checking registeredTransitions.current instead of hasTransition to avoid this effect re-firing whenever hasTransition changes
    registeredTransitions.current > 0 && // prevents waiting for a pending transition right after mounting
    previousRequestEnter.current !== requestEnter) {
      hasPendingExitTransition.current = true;
      setExitTransitionFinished(false);
    }
    previousRequestEnter.current = requestEnter;
  }, [requestEnter]);
  const handleExited = React30.useCallback(() => {
    hasPendingExitTransition.current = false;
    setExitTransitionFinished(true);
  }, []);
  const registerTransition = React30.useCallback(() => {
    registeredTransitions.current += 1;
    setHasTransition(true);
    return () => {
      registeredTransitions.current -= 1;
      if (registeredTransitions.current === 0) {
        setHasTransition(false);
      }
    };
  }, []);
  let hasExited;
  if (!hasTransition) {
    hasExited = !requestEnter;
  } else if (requestEnter) {
    hasExited = false;
  } else {
    hasExited = !hasPendingExitTransition.current && exitTransitionFinished;
  }
  const contextValue = React30.useMemo(() => ({
    requestedEnter: requestEnter,
    onExited: handleExited,
    registerTransition,
    hasExited
  }), [handleExited, requestEnter, registerTransition, hasExited]);
  return {
    contextValue,
    hasExited
  };
}

// node_modules/@mui/base/Unstable_Popup/PopupContext.js
var React31 = __toESM(require_react());
var PopupContext = React31.createContext(null);
if (true) {
  PopupContext.displayName = "PopupContext";
}

// node_modules/@mui/base/Unstable_Popup/Popup.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var _excluded6 = ["anchor", "children", "container", "disablePortal", "keepMounted", "middleware", "offset", "open", "placement", "slotProps", "slots", "strategy"];
function useUtilityClasses5(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ["root", open && "open"]
  };
  return composeClasses(slots, useClassNamesOverride(getPopupUtilityClass));
}
function resolveAnchor(anchor) {
  return typeof anchor === "function" ? anchor() : anchor;
}
var Popup = React32.forwardRef(function Popup2(props, forwardedRef) {
  var _slots$root;
  const {
    anchor: anchorProp,
    children,
    container,
    disablePortal = false,
    keepMounted = false,
    middleware,
    offset: offsetProp = 0,
    open = false,
    placement = "bottom",
    slotProps = {},
    slots = {},
    strategy = "absolute"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
  const {
    refs,
    elements,
    floatingStyles,
    update,
    placement: finalPlacement
  } = useFloating({
    elements: {
      reference: resolveAnchor(anchorProp)
    },
    open,
    middleware: middleware != null ? middleware : [offset3(offsetProp != null ? offsetProp : 0), flip3(), shift3()],
    placement,
    strategy,
    whileElementsMounted: !keepMounted ? autoUpdate : void 0
  });
  const handleRef = useForkRef(refs.setFloating, forwardedRef);
  useEnhancedEffect_default(() => {
    if (keepMounted && open && elements.reference && elements.floating) {
      const cleanup = autoUpdate(elements.reference, elements.floating, update);
      return cleanup;
    }
    return void 0;
  }, [keepMounted, open, elements, update]);
  const ownerState = _extends({}, props, {
    disablePortal,
    keepMounted,
    offset: offset3,
    open,
    placement,
    finalPlacement,
    strategy
  });
  const {
    contextValue,
    hasExited: hasTransitionExited
  } = useTransitionTrigger(open);
  const visibility = keepMounted && hasTransitionExited ? "hidden" : void 0;
  const classes = useUtilityClasses5(ownerState);
  const Root = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root,
    additionalProps: {
      ref: handleRef,
      role: "tooltip",
      style: _extends({}, floatingStyles, {
        visibility
      })
    }
  });
  const popupContextValue = React32.useMemo(() => ({
    placement: finalPlacement
  }), [finalPlacement]);
  const shouldRender = keepMounted || !hasTransitionExited;
  if (!shouldRender) {
    return null;
  }
  return (0, import_jsx_runtime14.jsx)(Portal, {
    disablePortal,
    container,
    children: (0, import_jsx_runtime14.jsx)(PopupContext.Provider, {
      value: popupContextValue,
      children: (0, import_jsx_runtime14.jsx)(TransitionContext.Provider, {
        value: contextValue,
        children: (0, import_jsx_runtime14.jsx)(Root, _extends({}, rootProps, {
          children
        }))
      })
    })
  });
});
true ? Popup.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtual element](https://floating-ui.com/docs/virtual-elements),
   * or a function that returns either.
   * It's used to set the position of the popup.
   */
  anchor: import_prop_types9.default.oneOfType([HTMLElementType, import_prop_types9.default.object, import_prop_types9.default.func]),
  /**
   * @ignore
   */
  children: import_prop_types9.default.oneOfType([import_prop_types9.default.node, import_prop_types9.default.func]),
  /**
   * An HTML element or function that returns one. The container will have the portal children appended to it.
   * By default, it uses the body of the top-level document object, so it's `document.body` in these cases.
   */
  container: import_prop_types9.default.oneOfType([HTMLElementType, import_prop_types9.default.func]),
  /**
   * If `true`, the popup will be rendered where it is defined, without the use of portals.
   * @default false
   */
  disablePortal: import_prop_types9.default.bool,
  /**
   * If `true`, the popup will exist in the DOM even if it's closed.
   * Its visibility will be controlled by the `visibility` CSS property.
   *
   * Otherwise, a closed popup will be removed from the DOM.
   *
   * @default false
   */
  keepMounted: import_prop_types9.default.bool,
  /**
   * Collection of Floating UI middleware to use when positioning the popup.
   * If not provided, the [`offset`](https://floating-ui.com/docs/offset)
   * and [`flip`](https://floating-ui.com/docs/flip) functions will be used.
   *
   * @see https://floating-ui.com/docs/computePosition#middleware
   */
  middleware: import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf([false]), import_prop_types9.default.shape({
    fn: import_prop_types9.default.func.isRequired,
    name: import_prop_types9.default.string.isRequired,
    options: import_prop_types9.default.any
  })])),
  /**
   * Distance between a popup and the trigger element.
   * This prop is ignored when custom `middleware` is provided.
   *
   * @default 0
   * @see https://floating-ui.com/docs/offset
   */
  offset: import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.number, import_prop_types9.default.shape({
    alignmentAxis: import_prop_types9.default.number,
    crossAxis: import_prop_types9.default.number,
    mainAxis: import_prop_types9.default.number
  })]),
  /**
   * If `true`, the popup is visible.
   *
   * @default false
   */
  open: import_prop_types9.default.bool,
  /**
   * Determines where to place the popup relative to the trigger element.
   *
   * @default 'bottom'
   * @see https://floating-ui.com/docs/computePosition#placement
   */
  placement: import_prop_types9.default.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The props used for each slot inside the Popup.
   *
   * @default {}
   */
  slotProps: import_prop_types9.default.shape({
    root: import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object])
  }),
  /**
   * The components used for each slot inside the Popup.
   * Either a string to use a HTML element or a component.
   *
   * @default {}
   */
  slots: import_prop_types9.default.shape({
    root: import_prop_types9.default.elementType
  }),
  /**
   * The type of CSS position property to use (absolute or fixed).
   *
   * @default 'absolute'
   * @see https://floating-ui.com/docs/computePosition#strategy
   */
  strategy: import_prop_types9.default.oneOf(["absolute", "fixed"])
} : void 0;

// node_modules/@mui/base/Menu/Menu.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var _excluded7 = ["actions", "anchor", "children", "onItemsChange", "slotProps", "slots"];
function useUtilityClasses6(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ["root", open && "expanded"],
    listbox: ["listbox", open && "expanded"]
  };
  return composeClasses(slots, useClassNamesOverride(getMenuUtilityClass));
}
var Menu = React33.forwardRef(function Menu2(props, forwardedRef) {
  var _slots$root, _slots$listbox;
  const {
    actions,
    anchor: anchorProp,
    children,
    onItemsChange,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
  const {
    contextValue,
    getListboxProps,
    dispatch,
    open,
    triggerElement
  } = useMenu({
    onItemsChange,
    componentName: "Menu"
  });
  const anchor = anchorProp != null ? anchorProp : triggerElement;
  React33.useImperativeHandle(actions, () => ({
    dispatch,
    resetHighlight: () => dispatch({
      type: ListActionTypes.resetHighlight,
      event: null
    })
  }), [dispatch]);
  const ownerState = _extends({}, props, {
    open
  });
  const classes = useUtilityClasses6(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
      role: void 0
    },
    className: classes.root,
    ownerState
  });
  const Listbox = (_slots$listbox = slots.listbox) != null ? _slots$listbox : "ul";
  const listboxProps = useSlotProps({
    elementType: Listbox,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    className: classes.listbox,
    ownerState
  });
  if (open === true && anchor == null) {
    return (0, import_jsx_runtime15.jsx)(Root, _extends({}, rootProps, {
      children: (0, import_jsx_runtime15.jsx)(Listbox, _extends({}, listboxProps, {
        children: (0, import_jsx_runtime15.jsx)(MenuProvider, {
          value: contextValue,
          children
        })
      }))
    }));
  }
  return (0, import_jsx_runtime15.jsx)(Popup, _extends({
    keepMounted: true
  }, rootProps, {
    open,
    anchor,
    slots: {
      root: Root
    },
    children: (0, import_jsx_runtime15.jsx)(Listbox, _extends({}, listboxProps, {
      children: (0, import_jsx_runtime15.jsx)(MenuProvider, {
        value: contextValue,
        children
      })
    }))
  }));
});
true ? Menu.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref with imperative actions that can be performed on the menu.
   */
  actions: refType_default,
  /**
   * The element based on which the menu is positioned.
   */
  anchor: import_prop_types10.default.oneOfType([HTMLElementType, import_prop_types10.default.object, import_prop_types10.default.func]),
  /**
   * @ignore
   */
  children: import_prop_types10.default.node,
  /**
   * @ignore
   */
  className: import_prop_types10.default.string,
  /**
   * Function called when the items displayed in the menu change.
   */
  onItemsChange: import_prop_types10.default.func,
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps: import_prop_types10.default.shape({
    listbox: import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object]),
    root: import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object])
  }),
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types10.default.shape({
    listbox: import_prop_types10.default.elementType,
    root: import_prop_types10.default.elementType
  })
} : void 0;

// node_modules/@mui/base/MenuButton/MenuButton.js
init_extends();
init_objectWithoutPropertiesLoose();
var React35 = __toESM(require_react());
var import_prop_types11 = __toESM(require_prop_types());

// node_modules/@mui/base/useMenuButton/useMenuButton.js
init_extends();
var React34 = __toESM(require_react());
init_esm();
function useMenuButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    rootRef: externalRef
  } = parameters;
  const menuContext = React34.useContext(DropdownContext);
  if (menuContext === null) {
    throw new Error("useMenuButton: no menu context available.");
  }
  const {
    state,
    dispatch,
    registerTrigger,
    popupId
  } = menuContext;
  const {
    getRootProps: getButtonRootProps,
    rootRef: buttonRootRef,
    active
  } = useButton({
    disabled,
    focusableWhenDisabled,
    rootRef: externalRef
  });
  const handleRef = useForkRef(buttonRootRef, registerTrigger);
  const createHandleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    dispatch({
      type: DropdownActionTypes.toggle,
      event
    });
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      dispatch({
        type: DropdownActionTypes.open,
        event
      });
    }
  };
  const getOwnRootProps = (otherHandlers = {}) => ({
    onClick: createHandleClick(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers)
  });
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedProps = combineHooksSlotProps(getOwnRootProps, getButtonRootProps);
    return _extends({
      "aria-haspopup": "menu",
      "aria-expanded": state.open,
      "aria-controls": popupId
    }, externalProps, externalEventHandlers, getCombinedProps(externalEventHandlers), {
      tabIndex: 0,
      // this is needed to make the button focused after click in Safari
      ref: handleRef
    });
  };
  return {
    active,
    getRootProps,
    open: state.open,
    rootRef: handleRef
  };
}

// node_modules/@mui/base/MenuButton/menuButtonClasses.js
var COMPONENT_NAME7 = "MenuButton";
function getMenuButtonUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME7, slot);
}
var menuButtonClasses = generateUtilityClasses2(COMPONENT_NAME7, ["root", "active", "disabled", "expanded"]);

// node_modules/@mui/base/MenuButton/MenuButton.js
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
var _excluded8 = ["children", "disabled", "label", "slots", "slotProps", "focusableWhenDisabled"];
var useUtilityClasses7 = (ownerState) => {
  const {
    active,
    disabled,
    open
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", active && "active", open && "expanded"]
  };
  return composeClasses(slots, useClassNamesOverride(getMenuButtonUtilityClass));
};
var MenuButton = React35.forwardRef(function MenuButton2(props, forwardedRef) {
  const {
    children,
    disabled = false,
    slots = {},
    slotProps = {},
    focusableWhenDisabled = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
  const {
    getRootProps,
    open,
    active
  } = useMenuButton({
    disabled,
    focusableWhenDisabled,
    rootRef: forwardedRef
  });
  const ownerState = _extends({}, props, {
    open,
    active,
    disabled,
    focusableWhenDisabled
  });
  const classes = useUtilityClasses7(ownerState);
  const Root = slots.root || "button";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
      type: "button"
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime16.jsx)(Root, _extends({}, rootProps, {
    children
  }));
});
true ? MenuButton.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types11.default.node,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types11.default.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types11.default.bool,
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled: import_prop_types11.default.bool,
  /**
   * Label of the button
   */
  label: import_prop_types11.default.string,
  /**
   * The components used for each slot inside the MenuButton.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slotProps: import_prop_types11.default.shape({
    root: import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object])
  }),
  /**
   * The props used for each slot inside the MenuButton.
   * @default {}
   */
  slots: import_prop_types11.default.shape({
    root: import_prop_types11.default.elementType
  })
} : void 0;

// node_modules/@mui/base/MenuItem/MenuItem.js
init_extends();
init_objectWithoutPropertiesLoose();
var React38 = __toESM(require_react());
var import_prop_types12 = __toESM(require_prop_types());

// node_modules/@mui/base/MenuItem/menuItemClasses.js
var COMPONENT_NAME8 = "MenuItem";
function getMenuItemUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME8, slot);
}
var menuItemClasses = generateUtilityClasses2(COMPONENT_NAME8, ["root", "disabled", "focusVisible"]);

// node_modules/@mui/base/useMenuItem/useMenuItem.js
init_extends();
var React36 = __toESM(require_react());
init_esm();
function idGenerator(existingKeys) {
  return `menu-item-${existingKeys.size}`;
}
var FALLBACK_MENU_CONTEXT2 = {
  dispatch: () => {
  },
  popupId: "",
  registerPopup: () => {
  },
  registerTrigger: () => {
  },
  state: {
    open: true,
    changeReason: null
  },
  triggerElement: null
};
function useMenuItem(params) {
  var _React$useContext;
  const {
    disabled = false,
    id: idParam,
    rootRef: externalRef,
    label,
    disableFocusOnHover = false
  } = params;
  const id = useId(idParam);
  const itemRef = React36.useRef(null);
  const itemMetadata = React36.useMemo(() => ({
    disabled,
    id: id != null ? id : "",
    label,
    ref: itemRef
  }), [disabled, id, label]);
  const {
    dispatch
  } = (_React$useContext = React36.useContext(DropdownContext)) != null ? _React$useContext : FALLBACK_MENU_CONTEXT2;
  const {
    getRootProps: getListRootProps,
    highlighted
  } = useListItem({
    item: id,
    handlePointerOverEvents: !disableFocusOnHover
  });
  const {
    index: index2,
    totalItemCount
  } = useCompoundItem(id != null ? id : idGenerator, itemMetadata);
  const {
    getRootProps: getButtonProps,
    focusVisible,
    rootRef: buttonRefHandler
  } = useButton({
    disabled,
    focusableWhenDisabled: true
  });
  const handleRef = useForkRef(buttonRefHandler, externalRef, itemRef);
  React36.useDebugValue({
    id,
    highlighted,
    disabled,
    label
  });
  const createHandleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    dispatch({
      type: DropdownActionTypes.close,
      event
    });
  };
  const getOwnHandlers = (otherHandlers = {}) => _extends({}, otherHandlers, {
    onClick: createHandleClick(otherHandlers)
  });
  function getRootProps(externalProps = {}) {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedRootProps = combineHooksSlotProps(getOwnHandlers, combineHooksSlotProps(getButtonProps, getListRootProps));
    return _extends({}, externalProps, externalEventHandlers, getCombinedRootProps(externalEventHandlers), {
      id,
      ref: handleRef,
      role: "menuitem"
    });
  }
  if (id === void 0) {
    return {
      getRootProps,
      disabled: false,
      focusVisible,
      highlighted: false,
      index: -1,
      totalItemCount: 0,
      rootRef: handleRef
    };
  }
  return {
    getRootProps,
    disabled,
    focusVisible,
    highlighted,
    index: index2,
    totalItemCount,
    rootRef: handleRef
  };
}

// node_modules/@mui/base/useMenuItem/useMenuItemContextStabilizer.js
var React37 = __toESM(require_react());
init_esm();
function useMenuItemContextStabilizer(id) {
  const listContext = React37.useContext(ListContext);
  if (!listContext) {
    throw new Error("MenuItem: ListContext was not found.");
  }
  const itemId = useId(id);
  const {
    getItemState,
    dispatch
  } = listContext;
  let itemState;
  if (itemId != null) {
    itemState = getItemState(itemId);
  } else {
    itemState = {
      focusable: true,
      highlighted: false,
      selected: false
    };
  }
  const {
    highlighted,
    selected,
    focusable
  } = itemState;
  const localGetItemState = React37.useCallback((itemValue) => {
    if (itemValue !== itemId) {
      throw new Error(["Base UI MenuItem: Tried to access the state of another MenuItem.", `itemValue: ${itemValue} | id: ${itemId}`, "This is unsupported when the MenuItem uses the MenuItemContextStabilizer as a performance optimization."].join("/n"));
    }
    return {
      highlighted,
      selected,
      focusable
    };
  }, [highlighted, selected, focusable, itemId]);
  const localContextValue = React37.useMemo(() => ({
    dispatch,
    getItemState: localGetItemState
  }), [dispatch, localGetItemState]);
  return {
    contextValue: localContextValue,
    id: itemId
  };
}

// node_modules/@mui/base/MenuItem/MenuItem.js
var import_jsx_runtime17 = __toESM(require_jsx_runtime());
var _excluded9 = ["children", "disabled", "label", "id", "slotProps", "slots"];
function useUtilityClasses8(ownerState) {
  const {
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  return composeClasses(slots, useClassNamesOverride(getMenuItemUtilityClass));
}
var InnerMenuItem = React38.memo(React38.forwardRef(function MenuItem(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    disabled: disabledProp = false,
    label,
    id,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
  const {
    getRootProps,
    disabled,
    focusVisible,
    highlighted
  } = useMenuItem({
    id,
    disabled: disabledProp,
    rootRef: forwardedRef,
    label
  });
  const ownerState = _extends({}, props, {
    disabled,
    focusVisible,
    highlighted
  });
  const classes = useUtilityClasses8(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "li";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime17.jsx)(Root, _extends({}, rootProps, {
    children
  }));
}));
var MenuItem2 = React38.forwardRef(function MenuItem3(props, ref) {
  const {
    id: idProp
  } = props;
  const {
    contextValue,
    id
  } = useMenuItemContextStabilizer(idProp);
  return (0, import_jsx_runtime17.jsx)(ListContext.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime17.jsx)(InnerMenuItem, _extends({}, props, {
      id,
      ref
    }))
  });
});
true ? MenuItem2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types12.default.node,
  /**
   * @ignore
   */
  className: import_prop_types12.default.string,
  /**
   * If `true`, the menu item will be disabled.
   * @default false
   */
  disabled: import_prop_types12.default.bool,
  /**
   * If `true`, the menu item won't receive focus when the mouse moves over it.
   *
   * @default false
   */
  disableFocusOnHover: import_prop_types12.default.bool,
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label: import_prop_types12.default.string,
  /**
   * @ignore
   */
  onClick: import_prop_types12.default.func,
  /**
   * The props used for each slot inside the MenuItem.
   * @default {}
   */
  slotProps: import_prop_types12.default.shape({
    root: import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object])
  }),
  /**
   * The components used for each slot inside the MenuItem.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types12.default.shape({
    root: import_prop_types12.default.elementType
  })
} : void 0;

// node_modules/@mui/base/Modal/Modal.js
init_extends();
init_objectWithoutPropertiesLoose();
var React40 = __toESM(require_react());
var import_prop_types13 = __toESM(require_prop_types());
init_esm();

// node_modules/@mui/base/unstable_useModal/useModal.js
init_extends();
var React39 = __toESM(require_react());
init_esm();

// node_modules/@mui/base/unstable_useModal/ModalManager.js
init_esm();
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
  if (show) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
  const forbiddenTagNames = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"];
  const isForbiddenTagName = forbiddenTagNames.indexOf(element.tagName) !== -1;
  const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
  return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  [].forEach.call(container.children, (element) => {
    const isNotExcludedElement = blacklist.indexOf(element) === -1;
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, show);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index2) => {
    if (callback(item)) {
      idx = index2;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    let scrollContainer;
    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer = (parent == null ? void 0 : parent.nodeName) === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    }
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
var ModalManager = class {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }
  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }
    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }
  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }
  remove(modal, ariaHiddenState = true) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return modalIndex;
    }
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);
    if (containerInfo.modals.length === 0) {
      if (containerInfo.restore) {
        containerInfo.restore();
      }
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, ariaHiddenState);
      }
      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }
    return modalIndex;
  }
  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
};

// node_modules/@mui/base/unstable_useModal/useModal.js
function getContainer2(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(children) {
  return children ? children.props.hasOwnProperty("in") : false;
}
var defaultManager = new ModalManager();
function useModal(parameters) {
  const {
    container,
    disableEscapeKeyDown = false,
    disableScrollLock = false,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager = defaultManager,
    closeAfterTransition = false,
    onTransitionEnter,
    onTransitionExited,
    children,
    onClose,
    open,
    rootRef
  } = parameters;
  const modal = React39.useRef({});
  const mountNodeRef = React39.useRef(null);
  const modalRef = React39.useRef(null);
  const handleRef = useForkRef(modalRef, rootRef);
  const [exited, setExited] = React39.useState(!open);
  const hasTransition = getHasTransition(children);
  let ariaHiddenProp = true;
  if (parameters["aria-hidden"] === "false" || parameters["aria-hidden"] === false) {
    ariaHiddenProp = false;
  }
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mount = mountNodeRef.current;
    return modal.current;
  };
  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    });
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };
  const handleOpen = useEventCallback_default(() => {
    const resolvedContainer = getContainer2(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);
    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = React39.useCallback(() => manager.isTopModal(getModal()), [manager]);
  const handlePortalRef = useEventCallback_default((node) => {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else if (modalRef.current) {
      ariaHidden(modalRef.current, ariaHiddenProp);
    }
  });
  const handleClose = React39.useCallback(() => {
    manager.remove(getModal(), ariaHiddenProp);
  }, [ariaHiddenProp, manager]);
  React39.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  React39.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.key !== "Escape" || event.which === 229 || // Wait until IME is settled.
    !isTopModal()) {
      return;
    }
    if (!disableEscapeKeyDown) {
      event.stopPropagation();
      if (onClose) {
        onClose(event, "escapeKeyDown");
      }
    }
  };
  const createHandleBackdropClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);
    delete propsEventHandlers.onTransitionEnter;
    delete propsEventHandlers.onTransitionExited;
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    return _extends({
      role: "presentation"
    }, externalEventHandlers, {
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      ref: handleRef
    });
  };
  const getBackdropProps = (otherHandlers = {}) => {
    const externalEventHandlers = otherHandlers;
    return _extends({
      "aria-hidden": true
    }, externalEventHandlers, {
      onClick: createHandleBackdropClick(externalEventHandlers),
      open
    });
  };
  const getTransitionProps = () => {
    const handleEnter = () => {
      setExited(false);
      if (onTransitionEnter) {
        onTransitionEnter();
      }
    };
    const handleExited = () => {
      setExited(true);
      if (onTransitionExited) {
        onTransitionExited();
      }
      if (closeAfterTransition) {
        handleClose();
      }
    };
    return {
      onEnter: createChainedFunction(handleEnter, children == null ? void 0 : children.props.onEnter),
      onExited: createChainedFunction(handleExited, children == null ? void 0 : children.props.onExited)
    };
  };
  return {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    rootRef: handleRef,
    portalRef: handlePortalRef,
    isTopModal,
    exited,
    hasTransition
  };
}

// node_modules/@mui/base/Modal/modalClasses.js
var COMPONENT_NAME9 = "Modal";
function getModalUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME9, slot);
}
var modalClasses = generateUtilityClasses2(COMPONENT_NAME9, ["root", "hidden", "backdrop"]);

// node_modules/@mui/base/Modal/Modal.js
var import_jsx_runtime18 = __toESM(require_jsx_runtime());
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
var _excluded10 = ["children", "closeAfterTransition", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onKeyDown", "open", "onTransitionEnter", "onTransitionExited", "slotProps", "slots"];
var useUtilityClasses9 = (ownerState) => {
  const {
    open,
    exited
  } = ownerState;
  const slots = {
    root: ["root", !open && exited && "hidden"],
    backdrop: ["backdrop"]
  };
  return composeClasses(slots, useClassNamesOverride(getModalUtilityClass));
};
var Modal = React40.forwardRef(function Modal2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    closeAfterTransition = false,
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onBackdropClick,
    open,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
  const propsWithDefaults = _extends({}, props, {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  });
  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    portalRef,
    isTopModal,
    exited,
    hasTransition
  } = useModal(_extends({}, propsWithDefaults, {
    rootRef: forwardedRef
  }));
  const ownerState = _extends({}, propsWithDefaults, {
    exited,
    hasTransition
  });
  const classes = useUtilityClasses9(ownerState);
  const childProps = {};
  if (children.props.tabIndex === void 0) {
    childProps.tabIndex = "-1";
  }
  if (hasTransition) {
    const {
      onEnter,
      onExited
    } = getTransitionProps();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    getSlotProps: getRootProps,
    className: classes.root,
    ownerState
  });
  const BackdropComponent = slots.backdrop;
  const backdropProps = useSlotProps({
    elementType: BackdropComponent,
    externalSlotProps: slotProps.backdrop,
    getSlotProps: (otherHandlers) => {
      return getBackdropProps(_extends({}, otherHandlers, {
        onClick: (e) => {
          if (onBackdropClick) {
            onBackdropClick(e);
          }
          if (otherHandlers != null && otherHandlers.onClick) {
            otherHandlers.onClick(e);
          }
        }
      }));
    },
    className: classes.backdrop,
    ownerState
  });
  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }
  return (0, import_jsx_runtime18.jsx)(Portal, {
    ref: portalRef,
    container,
    disablePortal,
    children: (0, import_jsx_runtime19.jsxs)(Root, _extends({}, rootProps, {
      children: [!hideBackdrop && BackdropComponent ? (0, import_jsx_runtime18.jsx)(BackdropComponent, _extends({}, backdropProps)) : null, (0, import_jsx_runtime18.jsx)(FocusTrap, {
        disableEnforceFocus,
        disableAutoFocus,
        disableRestoreFocus,
        isEnabled: isTopModal,
        open,
        children: React40.cloneElement(children, childProps)
      })]
    }))
  });
});
true ? Modal.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: import_prop_types13.default.bool,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types13.default.oneOfType([HTMLElementType, import_prop_types13.default.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: import_prop_types13.default.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: import_prop_types13.default.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: import_prop_types13.default.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types13.default.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: import_prop_types13.default.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: import_prop_types13.default.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: import_prop_types13.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: import_prop_types13.default.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: import_prop_types13.default.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: import_prop_types13.default.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: import_prop_types13.default.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: import_prop_types13.default.func,
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types13.default.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: import_prop_types13.default.shape({
    backdrop: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object]),
    root: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types13.default.shape({
    backdrop: import_prop_types13.default.elementType,
    root: import_prop_types13.default.elementType
  })
} : void 0;

// node_modules/@mui/base/NoSsr/NoSsr.js
var React41 = __toESM(require_react());
var import_prop_types14 = __toESM(require_prop_types());
init_esm();
var import_jsx_runtime20 = __toESM(require_jsx_runtime());
function NoSsr(props) {
  const {
    children,
    defer = false,
    fallback = null
  } = props;
  const [mountedState, setMountedState] = React41.useState(false);
  useEnhancedEffect_default(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  React41.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);
  return (0, import_jsx_runtime20.jsx)(React41.Fragment, {
    children: mountedState ? children : fallback
  });
}
true ? NoSsr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * You can wrap a node.
   */
  children: import_prop_types14.default.node,
  /**
   * If `true`, the component will not only prevent server-side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   * @default false
   */
  defer: import_prop_types14.default.bool,
  /**
   * The fallback content to display.
   * @default null
   */
  fallback: import_prop_types14.default.node
} : void 0;
if (true) {
  NoSsr["propTypes"] = exactProp(NoSsr.propTypes);
}

// node_modules/@mui/base/Unstable_NumberInput/NumberInput.js
init_extends();
init_objectWithoutPropertiesLoose();
var React43 = __toESM(require_react());
var import_prop_types15 = __toESM(require_prop_types());

// node_modules/@mui/base/Unstable_NumberInput/numberInputClasses.js
var COMPONENT_NAME10 = "NumberInput";
function getNumberInputUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME10, slot);
}
var numberInputClasses = generateUtilityClasses2(COMPONENT_NAME10, ["root", "formControl", "focused", "disabled", "readOnly", "error", "input", "incrementButton", "decrementButton", "adornedStart", "adornedEnd"]);

// node_modules/@mui/base/unstable_useNumberInput/useNumberInput.js
init_extends();
init_formatMuiErrorMessage();
var React42 = __toESM(require_react());
init_esm();

// node_modules/@mui/base/unstable_useNumberInput/numberInputAction.types.js
var NumberInputActionTypes = {
  clamp: "numberInput:clamp",
  inputChange: "numberInput:inputChange",
  increment: "numberInput:increment",
  decrement: "numberInput:decrement",
  decrementToMin: "numberInput:decrementToMin",
  incrementToMax: "numberInput:incrementToMax",
  resetInputValue: "numberInput:resetInputValue"
};

// node_modules/@mui/base/unstable_useNumberInput/numberInputReducer.js
init_extends();

// node_modules/@mui/base/unstable_useNumberInput/utils.js
init_esm();
function clampStepwise(val, min2 = Number.MIN_SAFE_INTEGER, max2 = Number.MAX_SAFE_INTEGER, stepProp = NaN) {
  if (Number.isNaN(stepProp)) {
    return clamp_default(val, min2, max2);
  }
  const step = stepProp || 1;
  const remainder = val % step;
  const positivity = Math.sign(remainder);
  if (Math.abs(remainder) > step / 2) {
    return clamp_default(val + positivity * (step - Math.abs(remainder)), min2, max2);
  }
  return clamp_default(val - positivity * Math.abs(remainder), min2, max2);
}
function isNumber(val) {
  return typeof val === "number" && !Number.isNaN(val) && Number.isFinite(val);
}

// node_modules/@mui/base/unstable_useNumberInput/numberInputReducer.js
function getClampedValues(rawValue, context) {
  const {
    min: min2,
    max: max2,
    step
  } = context;
  const clampedValue = rawValue === null ? null : clampStepwise(rawValue, min2, max2, step);
  const newInputValue = clampedValue === null ? "" : String(clampedValue);
  return {
    value: clampedValue,
    inputValue: newInputValue
  };
}
function stepValue(state, context, direction, multiplier) {
  const {
    value
  } = state;
  const {
    step = 1,
    min: min2,
    max: max2
  } = context;
  if (isNumber(value)) {
    return {
      up: value + (step != null ? step : 1) * multiplier,
      down: value - (step != null ? step : 1) * multiplier
    }[direction];
  }
  return {
    up: min2 != null ? min2 : 1,
    down: max2 != null ? max2 : -1
  }[direction];
}
function handleClamp(state, context, inputValue) {
  const {
    getInputValueAsString: getInputValueAsString2
  } = context;
  const numberValueAsString = getInputValueAsString2(inputValue);
  const intermediateValue = numberValueAsString === "" || numberValueAsString === "-" ? null : parseInt(numberValueAsString, 10);
  const clampedValues = getClampedValues(intermediateValue, context);
  return _extends({}, state, clampedValues);
}
function handleInputChange(state, context, inputValue) {
  const {
    getInputValueAsString: getInputValueAsString2
  } = context;
  const numberValueAsString = getInputValueAsString2(inputValue);
  if (numberValueAsString.match(/^-?\d+?$/) || numberValueAsString === "" || numberValueAsString === "-") {
    return _extends({}, state, {
      inputValue: numberValueAsString
    });
  }
  return state;
}
function handleStep(state, context, applyMultiplier, direction) {
  const multiplier = applyMultiplier ? context.shiftMultiplier : 1;
  const newValue = stepValue(state, context, direction, multiplier);
  const clampedValues = getClampedValues(newValue, context);
  return _extends({}, state, clampedValues);
}
function handleToMinOrMax(state, context, to) {
  const newValue = context[to];
  if (!isNumber(newValue)) {
    return state;
  }
  return _extends({}, state, {
    value: newValue,
    inputValue: String(newValue)
  });
}
function numberInputReducer(state, action) {
  const {
    type,
    context
  } = action;
  switch (type) {
    case NumberInputActionTypes.clamp:
      return handleClamp(state, context, action.inputValue);
    case NumberInputActionTypes.inputChange:
      return handleInputChange(state, context, action.inputValue);
    case NumberInputActionTypes.increment:
      return handleStep(state, context, action.applyMultiplier, "up");
    case NumberInputActionTypes.decrement:
      return handleStep(state, context, action.applyMultiplier, "down");
    case NumberInputActionTypes.incrementToMax:
      return handleToMinOrMax(state, context, "max");
    case NumberInputActionTypes.decrementToMin:
      return handleToMinOrMax(state, context, "min");
    case NumberInputActionTypes.resetInputValue:
      return _extends({}, state, {
        inputValue: String(state.value)
      });
    default:
      return state;
  }
}

// node_modules/@mui/base/unstable_useNumberInput/useNumberInput.js
var STEP_KEYS = ["ArrowUp", "ArrowDown", "PageUp", "PageDown"];
var SUPPORTED_KEYS = [...STEP_KEYS, "Home", "End"];
function getInputValueAsString(v) {
  return v ? String(v.trim()) : String(v);
}
function useNumberInput(parameters) {
  var _ref;
  const {
    min: min2,
    max: max2,
    step,
    shiftMultiplier = 10,
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onInputChange,
    onFocus,
    onChange,
    required: requiredProp = false,
    readOnly: readOnlyProp = false,
    value: valueProp,
    inputRef: inputRefProp,
    inputId: inputIdProp,
    componentName = "useNumberInput"
  } = parameters;
  const formControlContext = useFormControlContext();
  const {
    current: isControlled
  } = React42.useRef(valueProp != null);
  const handleInputRefWarning = React42.useCallback((instance) => {
    if (true) {
      if (instance && instance.nodeName !== "INPUT" && !instance.focus) {
        console.error(["MUI: You have provided a `slots.input` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join("\n"));
      }
    }
  }, []);
  const inputRef = React42.useRef(null);
  const handleInputRef = useForkRef(inputRef, inputRefProp, handleInputRefWarning);
  const inputId = useId(inputIdProp);
  const [focused, setFocused] = React42.useState(false);
  const handleStateChange = React42.useCallback((event, field, fieldValue, reason) => {
    if (field === "value" && typeof fieldValue !== "string") {
      switch (reason) {
        case "numberInput:clamp":
          onChange == null || onChange(event, fieldValue);
          break;
        case "numberInput:increment":
        case "numberInput:decrement":
        case "numberInput:incrementToMax":
        case "numberInput:decrementToMin":
          onChange == null || onChange(event, fieldValue);
          break;
        default:
          break;
      }
    }
  }, [onChange]);
  const numberInputActionContext = React42.useMemo(() => {
    return {
      min: min2,
      max: max2,
      step,
      shiftMultiplier,
      getInputValueAsString
    };
  }, [min2, max2, step, shiftMultiplier]);
  const initialValue = (_ref = valueProp != null ? valueProp : defaultValueProp) != null ? _ref : null;
  const initialState = {
    value: initialValue,
    inputValue: initialValue ? String(initialValue) : ""
  };
  const controlledState = React42.useMemo(() => ({
    value: valueProp
  }), [valueProp]);
  const [state, dispatch] = useControllableReducer({
    reducer: numberInputReducer,
    controlledProps: controlledState,
    initialState,
    onStateChange: handleStateChange,
    actionContext: React42.useMemo(() => numberInputActionContext, [numberInputActionContext]),
    componentName
  });
  const {
    value,
    inputValue
  } = state;
  React42.useEffect(() => {
    if (!formControlContext && disabledProp && focused) {
      setFocused(false);
      onBlur == null || onBlur();
    }
  }, [formControlContext, disabledProp, focused, onBlur]);
  React42.useEffect(() => {
    if (isControlled && isNumber(value)) {
      dispatch({
        type: NumberInputActionTypes.resetInputValue
      });
    }
  }, [value, dispatch, isControlled]);
  const createHandleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    (_otherHandlers$onFocu = otherHandlers.onFocus) == null || _otherHandlers$onFocu.call(otherHandlers, event);
    if (event.defaultMuiPrevented || event.defaultPrevented) {
      return;
    }
    if (formControlContext && formControlContext.onFocus) {
      var _formControlContext$o;
      formControlContext == null || (_formControlContext$o = formControlContext.onFocus) == null || _formControlContext$o.call(formControlContext);
    }
    setFocused(true);
  };
  const createHandleInputChange = (otherHandlers) => (event) => {
    var _formControlContext$o2, _otherHandlers$onInpu;
    if (!isControlled && event.target === null) {
      throw new Error(true ? `MUI: Expected valid input target. Did you use a custom \`slots.input\` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.` : formatMuiErrorMessage(17));
    }
    formControlContext == null || (_formControlContext$o2 = formControlContext.onChange) == null || _formControlContext$o2.call(formControlContext, event);
    (_otherHandlers$onInpu = otherHandlers.onInputChange) == null || _otherHandlers$onInpu.call(otherHandlers, event);
    if (event.defaultMuiPrevented || event.defaultPrevented) {
      return;
    }
    dispatch({
      type: NumberInputActionTypes.inputChange,
      event,
      inputValue: event.currentTarget.value
    });
  };
  const createHandleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    formControlContext == null || formControlContext.onBlur();
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
    if (event.defaultMuiPrevented || event.defaultPrevented) {
      return;
    }
    dispatch({
      type: NumberInputActionTypes.clamp,
      event,
      inputValue: event.currentTarget.value
    });
    setFocused(false);
  };
  const createHandleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    if (event.defaultMuiPrevented || event.defaultPrevented) {
      return;
    }
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
  };
  const handleStep2 = (direction) => (event) => {
    const applyMultiplier = Boolean(event.shiftKey);
    const actionType = {
      up: NumberInputActionTypes.increment,
      down: NumberInputActionTypes.decrement
    }[direction];
    dispatch({
      type: actionType,
      event,
      applyMultiplier
    });
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented || event.defaultPrevented) {
      return;
    }
    if (SUPPORTED_KEYS.includes(event.key)) {
      event.preventDefault();
    }
    switch (event.key) {
      case "ArrowUp":
        dispatch({
          type: NumberInputActionTypes.increment,
          event,
          applyMultiplier: !!event.shiftKey
        });
        break;
      case "ArrowDown":
        dispatch({
          type: NumberInputActionTypes.decrement,
          event,
          applyMultiplier: !!event.shiftKey
        });
        break;
      case "PageUp":
        dispatch({
          type: NumberInputActionTypes.increment,
          event,
          applyMultiplier: true
        });
        break;
      case "PageDown":
        dispatch({
          type: NumberInputActionTypes.decrement,
          event,
          applyMultiplier: true
        });
        break;
      case "Home":
        dispatch({
          type: NumberInputActionTypes.incrementToMax,
          event
        });
        break;
      case "End":
        dispatch({
          type: NumberInputActionTypes.decrementToMin,
          event
        });
        break;
      default:
        break;
    }
  };
  const getRootProps = (externalProps = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters, [
      // these are handled by the input slot
      "onBlur",
      "onInputChange",
      "onFocus",
      "onChange"
    ]);
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: createHandleClick(externalEventHandlers)
    });
  };
  const getInputProps = (externalProps = {}) => {
    var _ref2;
    const propsEventHandlers = {
      onBlur,
      onFocus,
      // onChange from normal props is the custom onChange so we ignore it here
      onChange: onInputChange
    };
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps, [
      // onClick is handled by the root slot
      "onClick"
      // do not ignore 'onInputChange', we want slotProps.input.onInputChange to enter the DOM and throw
    ]));
    const mergedEventHandlers = _extends({}, externalEventHandlers, {
      onFocus: createHandleFocus(externalEventHandlers),
      // slotProps.onChange is renamed to onInputChange and passed to createHandleInputChange
      onChange: createHandleInputChange(_extends({}, externalEventHandlers, {
        onInputChange: externalEventHandlers.onChange
      })),
      onBlur: createHandleBlur(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers)
    });
    const displayValue = (_ref2 = focused ? inputValue : value) != null ? _ref2 : "";
    delete externalProps.onInputChange;
    return _extends({
      type: "text",
      id: inputId,
      "aria-invalid": errorProp || void 0,
      defaultValue: void 0,
      value: displayValue,
      "aria-valuenow": displayValue,
      "aria-valuetext": String(displayValue),
      "aria-valuemin": min2,
      "aria-valuemax": max2,
      autoComplete: "off",
      autoCorrect: "off",
      spellCheck: "false",
      required: requiredProp,
      readOnly: readOnlyProp,
      "aria-disabled": disabledProp,
      disabled: disabledProp
    }, externalProps, {
      ref: handleInputRef
    }, mergedEventHandlers);
  };
  const handleStepperButtonMouseDown = (event) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const stepperButtonCommonProps = {
    "aria-controls": inputId,
    tabIndex: -1
  };
  const isIncrementDisabled = disabledProp || (isNumber(value) ? value >= (max2 != null ? max2 : Number.MAX_SAFE_INTEGER) : false);
  const getIncrementButtonProps = (externalProps = {}) => {
    return _extends({}, externalProps, stepperButtonCommonProps, {
      disabled: isIncrementDisabled,
      "aria-disabled": isIncrementDisabled,
      onMouseDown: handleStepperButtonMouseDown,
      onClick: handleStep2("up")
    });
  };
  const isDecrementDisabled = disabledProp || (isNumber(value) ? value <= (min2 != null ? min2 : Number.MIN_SAFE_INTEGER) : false);
  const getDecrementButtonProps = (externalProps = {}) => {
    return _extends({}, externalProps, stepperButtonCommonProps, {
      disabled: isDecrementDisabled,
      "aria-disabled": isDecrementDisabled,
      onMouseDown: handleStepperButtonMouseDown,
      onClick: handleStep2("down")
    });
  };
  return {
    disabled: disabledProp,
    error: errorProp,
    focused,
    formControlContext,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    getRootProps,
    required: requiredProp,
    value,
    inputValue,
    isIncrementDisabled,
    isDecrementDisabled
  };
}

// node_modules/@mui/base/Unstable_NumberInput/NumberInput.js
var import_jsx_runtime21 = __toESM(require_jsx_runtime());
var import_jsx_runtime22 = __toESM(require_jsx_runtime());
var _excluded11 = ["className", "defaultValue", "disabled", "endAdornment", "error", "id", "max", "min", "onBlur", "onInputChange", "onFocus", "onChange", "placeholder", "required", "readOnly", "shiftMultiplier", "startAdornment", "step", "value", "slotProps", "slots"];
var useUtilityClasses10 = (ownerState) => {
  const {
    disabled,
    error,
    focused,
    readOnly,
    formControlContext,
    isIncrementDisabled,
    isDecrementDisabled,
    startAdornment,
    endAdornment
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", error && "error", focused && "focused", readOnly && "readOnly", Boolean(formControlContext) && "formControl", Boolean(startAdornment) && "adornedStart", Boolean(endAdornment) && "adornedEnd"],
    input: ["input", disabled && "disabled", readOnly && "readOnly"],
    incrementButton: ["incrementButton", isIncrementDisabled && "disabled"],
    decrementButton: ["decrementButton", isDecrementDisabled && "disabled"]
  };
  return composeClasses(slots, useClassNamesOverride(getNumberInputUtilityClass));
};
var NumberInput = React43.forwardRef(function NumberInput2(props, forwardedRef) {
  var _slots$root, _slots$input, _slots$incrementButto, _slots$decrementButto;
  const {
    className,
    defaultValue,
    disabled,
    endAdornment,
    error,
    id,
    max: max2,
    min: min2,
    onBlur,
    onInputChange,
    onFocus,
    onChange,
    placeholder,
    required,
    readOnly = false,
    shiftMultiplier,
    startAdornment,
    step,
    value,
    slotProps = {},
    slots = {}
  } = props, rest = _objectWithoutPropertiesLoose(props, _excluded11);
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    focused,
    error: errorState,
    disabled: disabledState,
    formControlContext,
    isIncrementDisabled,
    isDecrementDisabled
  } = useNumberInput({
    min: min2,
    max: max2,
    step,
    shiftMultiplier,
    defaultValue,
    disabled,
    error,
    onFocus,
    onInputChange,
    onBlur,
    onChange,
    required,
    readOnly,
    value,
    inputId: id,
    componentName: "NumberInput"
  });
  const ownerState = _extends({}, props, {
    disabled: disabledState,
    error: errorState,
    focused,
    readOnly,
    formControlContext,
    isIncrementDisabled,
    isDecrementDisabled
  });
  const classes = useUtilityClasses10(ownerState);
  const propsForwardedToInputSlot = {
    placeholder
  };
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: rest,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: [classes.root, className]
  });
  const Input3 = (_slots$input = slots.input) != null ? _slots$input : "input";
  const inputProps = useSlotProps({
    elementType: Input3,
    getSlotProps: (otherHandlers) => getInputProps(_extends({}, propsForwardedToInputSlot, otherHandlers)),
    externalSlotProps: slotProps.input,
    ownerState,
    className: classes.input
  });
  const IncrementButton = (_slots$incrementButto = slots.incrementButton) != null ? _slots$incrementButto : "button";
  const incrementButtonProps = useSlotProps({
    elementType: IncrementButton,
    getSlotProps: getIncrementButtonProps,
    externalSlotProps: slotProps.incrementButton,
    ownerState,
    className: classes.incrementButton
  });
  const DecrementButton = (_slots$decrementButto = slots.decrementButton) != null ? _slots$decrementButto : "button";
  const decrementButtonProps = useSlotProps({
    elementType: DecrementButton,
    getSlotProps: getDecrementButtonProps,
    externalSlotProps: slotProps.decrementButton,
    ownerState,
    className: classes.decrementButton
  });
  return (0, import_jsx_runtime22.jsxs)(Root, _extends({}, rootProps, {
    children: [(0, import_jsx_runtime21.jsx)(DecrementButton, _extends({}, decrementButtonProps)), (0, import_jsx_runtime21.jsx)(IncrementButton, _extends({}, incrementButtonProps)), startAdornment, (0, import_jsx_runtime21.jsx)(Input3, _extends({}, inputProps)), endAdornment]
  }));
});
true ? NumberInput.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types15.default.node,
  /**
   * @ignore
   */
  className: import_prop_types15.default.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types15.default.number,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: import_prop_types15.default.bool,
  /**
   * Trailing adornment for this input.
   */
  endAdornment: import_prop_types15.default.node,
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `baseui--error` class on the root element.
   */
  error: import_prop_types15.default.bool,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types15.default.string,
  /**
   * The maximum value.
   */
  max: import_prop_types15.default.number,
  /**
   * The minimum value.
   */
  min: import_prop_types15.default.number,
  /**
   * @ignore
   */
  onBlur: import_prop_types15.default.func,
  /**
   * Callback fired after the value is clamped and changes - when the `input` is blurred or when
   * the stepper buttons are triggered.
   * Called with `undefined` when the value is unset.
   *
   * @param {React.FocusEvent<HTMLInputElement>|React.PointerEvent|React.KeyboardEvent} event The event source of the callback
   * @param {number|undefined} value The new value of the component
   */
  onChange: import_prop_types15.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types15.default.func,
  /**
   * Callback fired when the `input` value changes after each keypress, before clamping is applied.
   * Note that `event.target.value` may contain values that fall outside of `min` and `max` or
   * are otherwise "invalid".
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   */
  onInputChange: import_prop_types15.default.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: import_prop_types15.default.string,
  /**
   * If `true`, the `input` element becomes read-only. The stepper buttons remain active,
   * with the addition that they are now keyboard focusable.
   * @default false
   */
  readOnly: import_prop_types15.default.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: import_prop_types15.default.bool,
  /**
   * Multiplier applied to `step` if the shift key is held while incrementing
   * or decrementing the value. Defaults to `10`.
   */
  shiftMultiplier: import_prop_types15.default.number,
  /**
   * The props used for each slot inside the NumberInput.
   * @default {}
   */
  slotProps: import_prop_types15.default.shape({
    decrementButton: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object]),
    incrementButton: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object]),
    input: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object]),
    root: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object])
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types15.default.shape({
    decrementButton: import_prop_types15.default.elementType,
    incrementButton: import_prop_types15.default.elementType,
    input: import_prop_types15.default.elementType,
    root: import_prop_types15.default.elementType
  }),
  /**
   * Leading adornment for this input.
   */
  startAdornment: import_prop_types15.default.node,
  /**
   * The amount that the value changes on each increment or decrement.
   */
  step: import_prop_types15.default.number,
  /**
   * The current value. Use when the component is controlled.
   * @default null
   */
  value: import_prop_types15.default.number
} : void 0;

// node_modules/@mui/base/OptionGroup/OptionGroup.js
init_extends();
init_objectWithoutPropertiesLoose();
var React44 = __toESM(require_react());
var import_prop_types16 = __toESM(require_prop_types());

// node_modules/@mui/base/OptionGroup/optionGroupClasses.js
var COMPONENT_NAME11 = "OptionGroup";
function getOptionGroupUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME11, slot);
}
var optionGroupClasses = generateUtilityClasses2(COMPONENT_NAME11, ["root", "disabled", "label", "list"]);

// node_modules/@mui/base/OptionGroup/OptionGroup.js
var import_jsx_runtime23 = __toESM(require_jsx_runtime());
var import_jsx_runtime24 = __toESM(require_jsx_runtime());
var _excluded12 = ["disabled", "slotProps", "slots"];
function useUtilityClasses11(disabled) {
  const slots = {
    root: ["root", disabled && "disabled"],
    label: ["label"],
    list: ["list"]
  };
  return composeClasses(slots, useClassNamesOverride(getOptionGroupUtilityClass));
}
var OptionGroup = React44.forwardRef(function OptionGroup2(props, forwardedRef) {
  const {
    disabled = false,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded12);
  const Root = (slots == null ? void 0 : slots.root) || "li";
  const Label = (slots == null ? void 0 : slots.label) || "span";
  const List = (slots == null ? void 0 : slots.list) || "ul";
  const classes = useUtilityClasses11(disabled);
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: props,
    className: classes.root
  });
  const labelProps = useSlotProps({
    elementType: Label,
    externalSlotProps: slotProps.label,
    ownerState: props,
    className: classes.label
  });
  const listProps = useSlotProps({
    elementType: List,
    externalSlotProps: slotProps.list,
    ownerState: props,
    className: classes.list
  });
  return (0, import_jsx_runtime24.jsxs)(Root, _extends({}, rootProps, {
    children: [(0, import_jsx_runtime23.jsx)(Label, _extends({}, labelProps, {
      children: props.label
    })), (0, import_jsx_runtime23.jsx)(List, _extends({}, listProps, {
      children: props.children
    }))]
  }));
});
true ? OptionGroup.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types16.default.node,
  /**
   * @ignore
   */
  className: import_prop_types16.default.string,
  /**
   * If `true` all the options in the group will be disabled.
   * @default false
   */
  disabled: import_prop_types16.default.bool,
  /**
   * The human-readable description of the group.
   */
  label: import_prop_types16.default.node,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: import_prop_types16.default.shape({
    label: import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object]),
    list: import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object]),
    root: import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object])
  }),
  /**
   * The components used for each slot inside the OptionGroup.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types16.default.shape({
    label: import_prop_types16.default.elementType,
    list: import_prop_types16.default.elementType,
    root: import_prop_types16.default.elementType
  })
} : void 0;

// node_modules/@mui/base/Option/Option.js
init_extends();
init_objectWithoutPropertiesLoose();
var React47 = __toESM(require_react());
var import_prop_types17 = __toESM(require_prop_types());
init_esm();

// node_modules/@mui/base/Option/optionClasses.js
var COMPONENT_NAME12 = "Option";
function getOptionUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME12, slot);
}
var optionClasses = generateUtilityClasses2(COMPONENT_NAME12, ["root", "disabled", "selected", "highlighted"]);

// node_modules/@mui/base/useOption/useOption.js
init_extends();
var React45 = __toESM(require_react());
init_esm();
function useOption(params) {
  const {
    value,
    label,
    disabled,
    rootRef: optionRefParam,
    id: idParam
  } = params;
  const {
    getRootProps: getListItemProps,
    highlighted,
    selected
  } = useListItem({
    item: value
  });
  const {
    getRootProps: getButtonProps,
    rootRef: buttonRefHandler
  } = useButton({
    disabled,
    focusableWhenDisabled: true
  });
  const id = useId(idParam);
  const optionRef = React45.useRef(null);
  const selectOption = React45.useMemo(() => ({
    disabled,
    label,
    value,
    ref: optionRef,
    id
  }), [disabled, label, value, id]);
  const {
    index: index2
  } = useCompoundItem(value, selectOption);
  const handleRef = useForkRef(optionRefParam, optionRef, buttonRefHandler);
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if ([" ", "Enter"].includes(event.key)) {
      event.defaultMuiPrevented = true;
    }
  };
  const getOwnHandlers = (otherHandlers = {}) => ({
    onKeyDown: createHandleKeyDown(otherHandlers)
  });
  return {
    getRootProps: (externalProps = {}) => {
      const externalEventHandlers = extractEventHandlers(externalProps);
      const getCombinedRootProps = combineHooksSlotProps(getListItemProps, combineHooksSlotProps(getButtonProps, getOwnHandlers));
      return _extends({}, externalProps, externalEventHandlers, getCombinedRootProps(externalEventHandlers), {
        id,
        ref: handleRef,
        role: "option",
        "aria-selected": selected
      });
    },
    highlighted,
    index: index2,
    selected,
    rootRef: handleRef
  };
}

// node_modules/@mui/base/useOption/useOptionContextStabilizer.js
var React46 = __toESM(require_react());
function useOptionContextStabilizer(value) {
  const listContext = React46.useContext(ListContext);
  if (!listContext) {
    throw new Error("Option: ListContext was not found.");
  }
  const {
    getItemState,
    dispatch
  } = listContext;
  const {
    highlighted,
    selected,
    focusable
  } = getItemState(value);
  const localGetItemState = React46.useCallback((itemValue) => {
    if (itemValue !== value) {
      throw new Error(["Base UI Option: Tried to access the state of another Option.", "This is unsupported when the Option uses the OptionContextStabilizer as a performance optimization."].join("/n"));
    }
    return {
      highlighted,
      selected,
      focusable
    };
  }, [highlighted, selected, focusable, value]);
  const localContextValue = React46.useMemo(() => ({
    dispatch,
    getItemState: localGetItemState
  }), [dispatch, localGetItemState]);
  return {
    contextValue: localContextValue
  };
}

// node_modules/@mui/base/Option/Option.js
var import_jsx_runtime25 = __toESM(require_jsx_runtime());
var _excluded13 = ["children", "disabled", "label", "slotProps", "slots", "value"];
function useUtilityClasses12(ownerState) {
  const {
    disabled,
    highlighted,
    selected
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", highlighted && "highlighted", selected && "selected"]
  };
  return composeClasses(slots, useClassNamesOverride(getOptionUtilityClass));
}
var InnerOption = React47.memo(React47.forwardRef(function Option(props, forwardedRef) {
  var _slots$root, _optionRef$current;
  const {
    children,
    disabled = false,
    label,
    slotProps = {},
    slots = {},
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded13);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "li";
  const optionRef = React47.useRef(null);
  const combinedRef = useForkRef(optionRef, forwardedRef);
  const computedLabel = label != null ? label : typeof children === "string" ? children : (_optionRef$current = optionRef.current) == null || (_optionRef$current = _optionRef$current.textContent) == null ? void 0 : _optionRef$current.trim();
  const {
    getRootProps,
    selected,
    highlighted,
    index: index2
  } = useOption({
    disabled,
    label: computedLabel,
    rootRef: combinedRef,
    value
  });
  const ownerState = _extends({}, props, {
    disabled,
    highlighted,
    index: index2,
    selected
  });
  const classes = useUtilityClasses12(ownerState);
  const rootProps = useSlotProps({
    getSlotProps: getRootProps,
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime25.jsx)(Root, _extends({}, rootProps, {
    children
  }));
}));
var Option2 = React47.forwardRef(function Option3(props, ref) {
  const {
    value
  } = props;
  const {
    contextValue
  } = useOptionContextStabilizer(value);
  return (0, import_jsx_runtime25.jsx)(ListContext.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime25.jsx)(InnerOption, _extends({}, props, {
      ref
    }))
  });
});
true ? Option2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types17.default.node,
  /**
   * @ignore
   */
  className: import_prop_types17.default.string,
  /**
   * If `true`, the option will be disabled.
   * @default false
   */
  disabled: import_prop_types17.default.bool,
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label: import_prop_types17.default.string,
  /**
   * The props used for each slot inside the Option.
   * @default {}
   */
  slotProps: import_prop_types17.default.shape({
    root: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object])
  }),
  /**
   * The components used for each slot inside the Option.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types17.default.shape({
    root: import_prop_types17.default.elementType
  }),
  /**
   * The value of the option.
   */
  value: import_prop_types17.default.any.isRequired
} : void 0;

// node_modules/@mui/base/Popper/Popper.js
init_extends();
init_objectWithoutPropertiesLoose();
var React48 = __toESM(require_react());
init_esm();
var import_prop_types18 = __toESM(require_prop_types());

// node_modules/@mui/base/Popper/popperClasses.js
var COMPONENT_NAME13 = "Popper";
function getPopperUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME13, slot);
}
var popperClasses = generateUtilityClasses2(COMPONENT_NAME13, ["root"]);

// node_modules/@mui/base/Popper/Popper.js
var import_jsx_runtime26 = __toESM(require_jsx_runtime());
var _excluded14 = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"];
var _excluded22 = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function flipPlacement(placement, direction) {
  if (direction === "ltr") {
    return placement;
  }
  switch (placement) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return placement;
  }
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
function isHTMLElement2(element) {
  return element.nodeType !== void 0;
}
function isVirtualElement(element) {
  return !isHTMLElement2(element);
}
var useUtilityClasses13 = () => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, useClassNamesOverride(getPopperUtilityClass));
};
var defaultPopperOptions = {};
var PopperTooltip = React48.forwardRef(function PopperTooltip2(props, forwardedRef) {
  var _slots$root;
  const {
    anchorEl,
    children,
    direction,
    disablePortal,
    modifiers,
    open,
    placement: initialPlacement,
    popperOptions,
    popperRef: popperRefProp,
    slotProps = {},
    slots = {},
    TransitionProps
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded14);
  const tooltipRef = React48.useRef(null);
  const ownRef = useForkRef(tooltipRef, forwardedRef);
  const popperRef = React48.useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React48.useRef(handlePopperRef);
  useEnhancedEffect_default(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React48.useImperativeHandle(popperRefProp, () => popperRef.current, []);
  const rtlPlacement = flipPlacement(initialPlacement, direction);
  const [placement, setPlacement] = React48.useState(rtlPlacement);
  const [resolvedAnchorElement, setResolvedAnchorElement] = React48.useState(resolveAnchorEl(anchorEl));
  React48.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });
  React48.useEffect(() => {
    if (anchorEl) {
      setResolvedAnchorElement(resolveAnchorEl(anchorEl));
    }
  }, [anchorEl]);
  useEnhancedEffect_default(() => {
    if (!resolvedAnchorElement || !open) {
      return void 0;
    }
    const handlePopperUpdate = (data) => {
      setPlacement(data.placement);
    };
    if (true) {
      if (resolvedAnchorElement && isHTMLElement2(resolvedAnchorElement) && resolvedAnchorElement.nodeType === 1) {
        const box = resolvedAnchorElement.getBoundingClientRect();
        if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      }
    }
    let popperModifiers = [{
      name: "preventOverflow",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "flip",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "onUpdate",
      enabled: true,
      phase: "afterWrite",
      fn: ({
        state
      }) => {
        handlePopperUpdate(state);
      }
    }];
    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }
    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }
    const popper = createPopper(resolvedAnchorElement, tooltipRef.current, _extends({
      placement: rtlPlacement
    }, popperOptions, {
      modifiers: popperModifiers
    }));
    handlePopperRefRef.current(popper);
    return () => {
      popper.destroy();
      handlePopperRefRef.current(null);
    };
  }, [resolvedAnchorElement, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
  const childProps = {
    placement
  };
  if (TransitionProps !== null) {
    childProps.TransitionProps = TransitionProps;
  }
  const classes = useUtilityClasses13();
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: "tooltip",
      ref: ownRef
    },
    ownerState: props,
    className: classes.root
  });
  return (0, import_jsx_runtime26.jsx)(Root, _extends({}, rootProps, {
    children: typeof children === "function" ? children(childProps) : children
  }));
});
var Popper = React48.forwardRef(function Popper2(props, forwardedRef) {
  const {
    anchorEl,
    children,
    container: containerProp,
    direction = "ltr",
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement = "bottom",
    popperOptions = defaultPopperOptions,
    popperRef,
    style,
    transition = false,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded22);
  const [exited, setExited] = React48.useState(true);
  const handleEnter = () => {
    setExited(false);
  };
  const handleExited = () => {
    setExited(true);
  };
  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }
  let container;
  if (containerProp) {
    container = containerProp;
  } else if (anchorEl) {
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    container = resolvedAnchorEl && isHTMLElement2(resolvedAnchorEl) ? ownerDocument(resolvedAnchorEl).body : ownerDocument(null).body;
  }
  const display = !open && keepMounted && (!transition || exited) ? "none" : void 0;
  const transitionProps = transition ? {
    in: open,
    onEnter: handleEnter,
    onExited: handleExited
  } : void 0;
  return (0, import_jsx_runtime26.jsx)(Portal, {
    disablePortal,
    container,
    children: (0, import_jsx_runtime26.jsx)(PopperTooltip, _extends({
      anchorEl,
      direction,
      disablePortal,
      modifiers,
      ref: forwardedRef,
      open: transition ? !exited : open,
      placement,
      popperOptions,
      popperRef,
      slotProps,
      slots
    }, other, {
      style: _extends({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display
      }, style),
      TransitionProps: transitionProps,
      children
    }))
  });
});
true ? Popper.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: chainPropTypes(import_prop_types18.default.oneOfType([HTMLElementType, import_prop_types18.default.object, import_prop_types18.default.func]), (props) => {
    if (props.open) {
      const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
      if (resolvedAnchorEl && isHTMLElement2(resolvedAnchorEl) && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();
        if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      } else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || isVirtualElement(resolvedAnchorEl) && resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) {
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join("\n"));
      }
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: import_prop_types18.default.oneOfType([import_prop_types18.default.node, import_prop_types18.default.func]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types18.default.oneOfType([HTMLElementType, import_prop_types18.default.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: import_prop_types18.default.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types18.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: import_prop_types18.default.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: import_prop_types18.default.arrayOf(import_prop_types18.default.shape({
    data: import_prop_types18.default.object,
    effect: import_prop_types18.default.func,
    enabled: import_prop_types18.default.bool,
    fn: import_prop_types18.default.func,
    name: import_prop_types18.default.any,
    options: import_prop_types18.default.object,
    phase: import_prop_types18.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: import_prop_types18.default.arrayOf(import_prop_types18.default.string),
    requiresIfExists: import_prop_types18.default.arrayOf(import_prop_types18.default.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types18.default.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: import_prop_types18.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: import_prop_types18.default.shape({
    modifiers: import_prop_types18.default.array,
    onFirstUpdate: import_prop_types18.default.func,
    placement: import_prop_types18.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: import_prop_types18.default.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: refType_default,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: import_prop_types18.default.shape({
    root: import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types18.default.shape({
    root: import_prop_types18.default.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: import_prop_types18.default.bool
} : void 0;

// node_modules/@mui/base/Select/Select.js
init_extends();
init_objectWithoutPropertiesLoose();
var React51 = __toESM(require_react());
var import_prop_types19 = __toESM(require_prop_types());
init_esm();

// node_modules/@mui/base/useSelect/useSelect.js
init_extends();
var React49 = __toESM(require_react());
init_esm();

// node_modules/@mui/base/useSelect/useSelect.types.js
var SelectActionTypes = {
  buttonClick: "buttonClick",
  browserAutoFill: "browserAutoFill"
};

// node_modules/@mui/base/useSelect/defaultOptionStringifier.js
var defaultOptionStringifier = (option) => {
  const {
    label,
    value
  } = option;
  if (typeof label === "string") {
    return label;
  }
  if (typeof value === "string") {
    return value;
  }
  return String(option);
};

// node_modules/@mui/base/useSelect/selectReducer.js
init_extends();
function selectReducer(state, action) {
  const {
    open
  } = state;
  const {
    context: {
      selectionMode
    }
  } = action;
  if (action.type === SelectActionTypes.buttonClick) {
    var _state$selectedValues;
    const itemToHighlight = (_state$selectedValues = state.selectedValues[0]) != null ? _state$selectedValues : moveHighlight(null, "start", action.context);
    return _extends({}, state, {
      open: !open,
      highlightedValue: !open ? itemToHighlight : null
    });
  }
  if (action.type === SelectActionTypes.browserAutoFill) {
    return handleItemSelection(action.item, state, action.context);
  }
  const newState = listReducer(state, action);
  switch (action.type) {
    case ListActionTypes.keyDown:
      if (state.open) {
        if (action.event.key === "Escape") {
          return _extends({}, newState, {
            open: false
          });
        }
      } else {
        if (action.event.key === "ArrowDown") {
          var _state$selectedValues2;
          return _extends({}, state, {
            open: true,
            highlightedValue: (_state$selectedValues2 = state.selectedValues[0]) != null ? _state$selectedValues2 : moveHighlight(null, "start", action.context)
          });
        }
        if (action.event.key === "ArrowUp") {
          var _state$selectedValues3;
          return _extends({}, state, {
            open: true,
            highlightedValue: (_state$selectedValues3 = state.selectedValues[0]) != null ? _state$selectedValues3 : moveHighlight(null, "end", action.context)
          });
        }
      }
      break;
    case ListActionTypes.itemClick:
      if (selectionMode === "single") {
        return _extends({}, newState, {
          open: false
        });
      }
      break;
    case ListActionTypes.blur:
      return _extends({}, newState, {
        open: false
      });
    default:
      return newState;
  }
  return newState;
}

// node_modules/@mui/base/useSelect/useSelect.js
function defaultFormValueProvider(selectedOption) {
  if (Array.isArray(selectedOption)) {
    if (selectedOption.length === 0) {
      return "";
    }
    return JSON.stringify(selectedOption.map((o) => o.value));
  }
  if ((selectedOption == null ? void 0 : selectedOption.value) == null) {
    return "";
  }
  if (typeof selectedOption.value === "string" || typeof selectedOption.value === "number") {
    return selectedOption.value;
  }
  return JSON.stringify(selectedOption.value);
}
function useSelect(props) {
  const {
    areOptionsEqual,
    buttonRef: buttonRefProp,
    defaultOpen = false,
    defaultValue: defaultValueProp,
    disabled = false,
    listboxId: listboxIdProp,
    listboxRef: listboxRefProp,
    multiple = false,
    name,
    required,
    onChange,
    onHighlightChange,
    onOpenChange,
    open: openProp,
    options: optionsParam,
    getOptionAsString = defaultOptionStringifier,
    getSerializedValue = defaultFormValueProvider,
    value: valueProp,
    componentName = "useSelect"
  } = props;
  const buttonRef = React49.useRef(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);
  const listboxRef = React49.useRef(null);
  const listboxId = useId(listboxIdProp);
  let defaultValue;
  if (valueProp === void 0 && defaultValueProp === void 0) {
    defaultValue = [];
  } else if (defaultValueProp !== void 0) {
    if (multiple) {
      defaultValue = defaultValueProp;
    } else {
      defaultValue = defaultValueProp == null ? [] : [defaultValueProp];
    }
  }
  const value = React49.useMemo(() => {
    if (valueProp !== void 0) {
      if (multiple) {
        return valueProp;
      }
      return valueProp == null ? [] : [valueProp];
    }
    return void 0;
  }, [valueProp, multiple]);
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const options = React49.useMemo(() => {
    if (optionsParam != null) {
      return new Map(optionsParam.map((option, index2) => [option.value, {
        value: option.value,
        label: option.label,
        disabled: option.disabled,
        ref: React49.createRef(),
        id: `${listboxId}_${index2}`
      }]));
    }
    return subitems;
  }, [optionsParam, subitems, listboxId]);
  const handleListboxRef = useForkRef(listboxRefProp, listboxRef);
  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible,
    rootRef: mergedButtonRef
  } = useButton({
    disabled,
    rootRef: handleButtonRef
  });
  const optionValues = React49.useMemo(() => Array.from(options.keys()), [options]);
  const getOptionByValue = React49.useCallback((valueToGet) => {
    if (areOptionsEqual !== void 0) {
      const similarValue = optionValues.find((optionValue) => areOptionsEqual(optionValue, valueToGet));
      return options.get(similarValue);
    }
    return options.get(valueToGet);
  }, [options, areOptionsEqual, optionValues]);
  const isItemDisabled = React49.useCallback((valueToCheck) => {
    var _option$disabled;
    const option = getOptionByValue(valueToCheck);
    return (_option$disabled = option == null ? void 0 : option.disabled) != null ? _option$disabled : false;
  }, [getOptionByValue]);
  const stringifyOption = React49.useCallback((valueToCheck) => {
    const option = getOptionByValue(valueToCheck);
    if (!option) {
      return "";
    }
    return getOptionAsString(option);
  }, [getOptionByValue, getOptionAsString]);
  const controlledState = React49.useMemo(() => ({
    selectedValues: value,
    open: openProp
  }), [value, openProp]);
  const getItemId = React49.useCallback((itemValue) => {
    var _options$get;
    return (_options$get = options.get(itemValue)) == null ? void 0 : _options$get.id;
  }, [options]);
  const handleSelectionChange = React49.useCallback((event, newValues) => {
    if (multiple) {
      onChange == null || onChange(event, newValues);
    } else {
      var _newValues$;
      onChange == null || onChange(event, (_newValues$ = newValues[0]) != null ? _newValues$ : null);
    }
  }, [multiple, onChange]);
  const handleHighlightChange = React49.useCallback((event, newValue) => {
    onHighlightChange == null || onHighlightChange(event, newValue != null ? newValue : null);
  }, [onHighlightChange]);
  const handleStateChange = React49.useCallback((event, field, fieldValue) => {
    if (field === "open") {
      onOpenChange == null || onOpenChange(fieldValue);
      if (fieldValue === false && (event == null ? void 0 : event.type) !== "blur") {
        var _buttonRef$current;
        (_buttonRef$current = buttonRef.current) == null || _buttonRef$current.focus();
      }
    }
  }, [onOpenChange]);
  const getItemDomElement = React49.useCallback((itemId) => {
    var _subitems$get$ref$cur, _subitems$get;
    if (itemId == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get = subitems.get(itemId)) == null ? void 0 : _subitems$get.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  const useListParameters = {
    getInitialState: () => {
      var _defaultValue;
      return {
        highlightedValue: null,
        selectedValues: (_defaultValue = defaultValue) != null ? _defaultValue : [],
        open: defaultOpen
      };
    },
    getItemId,
    controlledProps: controlledState,
    focusManagement: "DOM",
    getItemDomElement,
    itemComparer: areOptionsEqual,
    isItemDisabled,
    rootRef: handleListboxRef,
    onChange: handleSelectionChange,
    onHighlightChange: handleHighlightChange,
    onStateChange: handleStateChange,
    reducerActionContext: React49.useMemo(() => ({
      multiple
    }), [multiple]),
    items: optionValues,
    getItemAsString: stringifyOption,
    selectionMode: multiple ? "multiple" : "single",
    stateReducer: selectReducer,
    componentName
  };
  const {
    dispatch,
    getRootProps: getListboxRootProps,
    contextValue: listContextValue,
    state: {
      open,
      highlightedValue: highlightedOption,
      selectedValues: selectedOptions
    },
    rootRef: mergedListRootRef
  } = useList(useListParameters);
  const isInitiallyOpen = React49.useRef(open);
  useEnhancedEffect_default(() => {
    if (open && highlightedOption !== null) {
      var _getOptionByValue;
      const optionRef = (_getOptionByValue = getOptionByValue(highlightedOption)) == null ? void 0 : _getOptionByValue.ref;
      if (!listboxRef.current || !(optionRef != null && optionRef.current)) {
        return;
      }
      if (!isInitiallyOpen.current) {
        optionRef.current.focus({
          preventScroll: true
        });
      }
      const listboxClientRect = listboxRef.current.getBoundingClientRect();
      const optionClientRect = optionRef.current.getBoundingClientRect();
      if (optionClientRect.top < listboxClientRect.top) {
        listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
      } else if (optionClientRect.bottom > listboxClientRect.bottom) {
        listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
      }
    }
  }, [open, highlightedOption, getOptionByValue]);
  const getOptionMetadata = React49.useCallback((optionValue) => getOptionByValue(optionValue), [getOptionByValue]);
  const createHandleButtonClick = (externalEventHandlers) => (event) => {
    var _externalEventHandler;
    externalEventHandlers == null || (_externalEventHandler = externalEventHandlers.onClick) == null || _externalEventHandler.call(externalEventHandlers, event);
    if (!event.defaultMuiPrevented) {
      const action = {
        type: SelectActionTypes.buttonClick,
        event
      };
      dispatch(action);
    }
  };
  const createHandleButtonKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      dispatch({
        type: ListActionTypes.keyDown,
        key: event.key,
        event
      });
    }
  };
  const getButtonOwnRootProps = (otherHandlers = {}) => ({
    onClick: createHandleButtonClick(otherHandlers),
    onKeyDown: createHandleButtonKeyDown(otherHandlers)
  });
  const getSelectTriggerProps = (otherHandlers = {}) => {
    return _extends({}, otherHandlers, getButtonOwnRootProps(otherHandlers), {
      role: "combobox",
      "aria-expanded": open,
      "aria-controls": listboxId
    });
  };
  const getButtonProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const combinedProps = combineHooksSlotProps(getSelectTriggerProps, getButtonRootProps);
    return _extends({}, externalProps, combinedProps(externalEventHandlers));
  };
  const createListboxHandleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur, _listboxRef$current;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if ((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(event.relatedTarget) || event.relatedTarget === buttonRef.current) {
      event.defaultMuiPrevented = true;
    }
  };
  const getOwnListboxHandlers = (otherHandlers = {}) => ({
    onBlur: createListboxHandleBlur(otherHandlers)
  });
  const getListboxProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListboxRootProps);
    return _extends({
      id: listboxId,
      role: "listbox",
      "aria-multiselectable": multiple ? "true" : void 0
    }, externalProps, getCombinedRootProps(externalEventHandlers));
  };
  React49.useDebugValue({
    selectedOptions,
    highlightedOption,
    open
  });
  const contextValue = React49.useMemo(() => _extends({}, listContextValue, compoundComponentContextValue), [listContextValue, compoundComponentContextValue]);
  let selectValue;
  if (props.multiple) {
    selectValue = selectedOptions;
  } else {
    selectValue = selectedOptions.length > 0 ? selectedOptions[0] : null;
  }
  let selectedOptionsMetadata;
  if (multiple) {
    selectedOptionsMetadata = selectValue.map((v) => getOptionMetadata(v)).filter((o) => o !== void 0);
  } else {
    var _getOptionMetadata;
    selectedOptionsMetadata = (_getOptionMetadata = getOptionMetadata(selectValue)) != null ? _getOptionMetadata : null;
  }
  const createHandleHiddenInputChange = (externalEventHandlers) => (event) => {
    var _externalEventHandler2;
    externalEventHandlers == null || (_externalEventHandler2 = externalEventHandlers.onChange) == null || _externalEventHandler2.call(externalEventHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    const option = options.get(event.target.value);
    if (event.target.value === "") {
      dispatch({
        type: ListActionTypes.clearSelection
      });
    } else if (option !== void 0) {
      dispatch({
        type: SelectActionTypes.browserAutoFill,
        item: option.value,
        event
      });
    }
  };
  const getHiddenInputProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({
      name,
      tabIndex: -1,
      "aria-hidden": true,
      required: required ? true : void 0,
      value: getSerializedValue(selectedOptionsMetadata),
      style: visuallyHidden_default
    }, externalProps, {
      onChange: createHandleHiddenInputChange(externalEventHandlers)
    });
  };
  return {
    buttonActive,
    buttonFocusVisible,
    buttonRef: mergedButtonRef,
    contextValue,
    disabled,
    dispatch,
    getButtonProps,
    getHiddenInputProps,
    getListboxProps,
    getOptionMetadata,
    listboxRef: mergedListRootRef,
    open,
    options: optionValues,
    value: selectValue,
    highlightedOption
  };
}

// node_modules/@mui/base/useSelect/SelectProvider.js
var React50 = __toESM(require_react());
var import_jsx_runtime27 = __toESM(require_jsx_runtime());
function SelectProvider(props) {
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React50.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex
  }), [dispatch, getItemIndex, getItemState]);
  const compoundComponentContextValue = React50.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return (0, import_jsx_runtime27.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime27.jsx)(ListContext.Provider, {
      value: listContextValue,
      children
    })
  });
}

// node_modules/@mui/base/Select/selectClasses.js
var COMPONENT_NAME14 = "Select";
function getSelectUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME14, slot);
}
var selectClasses = generateUtilityClasses2(COMPONENT_NAME14, ["root", "button", "listbox", "popup", "active", "expanded", "disabled", "focusVisible"]);

// node_modules/@mui/base/Select/Select.js
var import_jsx_runtime28 = __toESM(require_jsx_runtime());
var import_jsx_runtime29 = __toESM(require_jsx_runtime());
var _span;
var _excluded15 = ["areOptionsEqual", "autoComplete", "autoFocus", "children", "defaultValue", "defaultListboxOpen", "disabled", "getSerializedValue", "listboxId", "listboxOpen", "multiple", "name", "required", "onChange", "onListboxOpenChange", "getOptionAsString", "renderValue", "placeholder", "slotProps", "slots", "value"];
function defaultRenderValue(selectedOptions) {
  var _selectedOptions$labe;
  if (Array.isArray(selectedOptions)) {
    return (0, import_jsx_runtime28.jsx)(React51.Fragment, {
      children: selectedOptions.map((o) => o.label).join(", ")
    });
  }
  return (_selectedOptions$labe = selectedOptions == null ? void 0 : selectedOptions.label) != null ? _selectedOptions$labe : null;
}
function useUtilityClasses14(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active", open && "expanded"],
    listbox: ["listbox", disabled && "disabled"],
    popup: ["popup"]
  };
  return composeClasses(slots, useClassNamesOverride(getSelectUtilityClass));
}
var Select = React51.forwardRef(function Select2(props, forwardedRef) {
  var _slots$root, _slots$listbox, _slots$popup, _ref, _renderValue;
  const {
    areOptionsEqual,
    autoComplete,
    autoFocus,
    children,
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    getSerializedValue,
    listboxId,
    listboxOpen: listboxOpenProp,
    multiple = false,
    name,
    required = false,
    onChange,
    onListboxOpenChange,
    getOptionAsString = defaultOptionStringifier,
    renderValue: renderValueProp,
    placeholder,
    slotProps = {},
    slots = {},
    value: valueProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded15);
  const renderValue = renderValueProp != null ? renderValueProp : defaultRenderValue;
  const [buttonDefined, setButtonDefined] = React51.useState(false);
  const buttonRef = React51.useRef(null);
  const listboxRef = React51.useRef(null);
  const Button3 = (_slots$root = slots.root) != null ? _slots$root : "button";
  const ListboxRoot = (_slots$listbox = slots.listbox) != null ? _slots$listbox : "ul";
  const PopupComponent = (_slots$popup = slots.popup) != null ? _slots$popup : "div";
  const handleButtonRefChange = React51.useCallback((element) => {
    setButtonDefined(element != null);
  }, []);
  const handleButtonRef = useForkRef(forwardedRef, buttonRef, handleButtonRefChange);
  React51.useEffect(() => {
    if (autoFocus) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);
  const {
    buttonActive,
    buttonFocusVisible,
    contextValue,
    disabled,
    getButtonProps,
    getListboxProps,
    getHiddenInputProps,
    getOptionMetadata,
    value,
    open
  } = useSelect({
    name,
    required,
    getSerializedValue,
    areOptionsEqual,
    buttonRef: handleButtonRef,
    defaultOpen: defaultListboxOpen,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple,
    open: listboxOpenProp,
    onChange,
    onOpenChange: onListboxOpenChange,
    getOptionAsString,
    value: valueProp,
    componentName: "Select"
  });
  const ownerState = _extends({}, props, {
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open,
    multiple,
    renderValue,
    value
  });
  const classes = useUtilityClasses14(ownerState);
  const buttonProps = useSlotProps({
    elementType: Button3,
    getSlotProps: getButtonProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root
  });
  const listboxProps = useSlotProps({
    elementType: ListboxRoot,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    additionalProps: {
      ref: listboxRef
    },
    ownerState,
    className: classes.listbox
  });
  const popupProps = useSlotProps({
    elementType: PopupComponent,
    externalSlotProps: slotProps.popup,
    additionalProps: {
      anchor: buttonRef.current,
      keepMounted: true,
      open,
      placement: "bottom-start",
      role: void 0
    },
    ownerState,
    className: classes.popup
  });
  let selectedOptionsMetadata;
  if (multiple) {
    selectedOptionsMetadata = value.map((v) => getOptionMetadata(v)).filter((o) => o !== void 0);
  } else {
    var _getOptionMetadata;
    selectedOptionsMetadata = (_getOptionMetadata = getOptionMetadata(value)) != null ? _getOptionMetadata : null;
  }
  return (0, import_jsx_runtime29.jsxs)(React51.Fragment, {
    children: [(0, import_jsx_runtime28.jsx)(Button3, _extends({}, buttonProps, {
      children: (_ref = (_renderValue = renderValue(selectedOptionsMetadata)) != null ? _renderValue : placeholder) != null ? _ref : (
        // fall back to a zero-width space to prevent layout shift
        // from https://github.com/mui/material-ui/pull/24563
        _span || (_span = (0, import_jsx_runtime28.jsx)("span", {
          className: "notranslate",
          children: "​"
        }))
      )
    })), buttonDefined && (0, import_jsx_runtime28.jsx)(Popup, _extends({
      slots: {
        root: PopupComponent
      }
    }, popupProps, {
      children: (0, import_jsx_runtime28.jsx)(ListboxRoot, _extends({}, listboxProps, {
        children: (0, import_jsx_runtime28.jsx)(SelectProvider, {
          value: contextValue,
          children
        })
      }))
    })), (0, import_jsx_runtime28.jsx)("input", _extends({}, getHiddenInputProps(), {
      autoComplete
    }))]
  });
});
true ? Select.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A function used to determine if two options' values are equal.
   * By default, reference equality is used.
   *
   * There is a performance impact when using the `areOptionsEqual` prop (proportional to the number of options).
   * Therefore, it's recommented to use the default reference equality comparison whenever possible.
   */
  areOptionsEqual: import_prop_types19.default.func,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: import_prop_types19.default.string,
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: import_prop_types19.default.bool,
  /**
   * @ignore
   */
  children: import_prop_types19.default.node,
  /**
   * @ignore
   */
  className: import_prop_types19.default.string,
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: import_prop_types19.default.bool,
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types19.default.any,
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled: import_prop_types19.default.bool,
  /**
   * A function used to convert the option label to a string.
   * It's useful when labels are elements and need to be converted to plain text
   * to enable navigation using character keys on a keyboard.
   *
   * @default defaultOptionStringifier
   */
  getOptionAsString: import_prop_types19.default.func,
  /**
   * A function to convert the currently selected value to a string.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected value can be posted with a form.
   */
  getSerializedValue: import_prop_types19.default.func,
  /**
   * `id` attribute of the listbox element.
   */
  listboxId: import_prop_types19.default.string,
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: import_prop_types19.default.bool,
  /**
   * If `true`, selecting multiple values is allowed.
   * This affects the type of the `value`, `defaultValue`, and `onChange` props.
   *
   * @default false
   */
  multiple: import_prop_types19.default.bool,
  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   */
  name: import_prop_types19.default.string,
  /**
   * Callback fired when an option is selected.
   */
  onChange: import_prop_types19.default.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: import_prop_types19.default.func,
  /**
   * Text to show when there is no selected value.
   */
  placeholder: import_prop_types19.default.node,
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue: import_prop_types19.default.func,
  /**
   * If `true`, the Select cannot be empty when submitting form.
   * @default false
   */
  required: import_prop_types19.default.bool,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: import_prop_types19.default.shape({
    listbox: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object]),
    popup: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object]),
    root: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object])
  }),
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types19.default.shape({
    listbox: import_prop_types19.default.elementType,
    popup: import_prop_types19.default.elementType,
    root: import_prop_types19.default.elementType
  }),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: import_prop_types19.default.any
} : void 0;

// node_modules/@mui/base/Slider/Slider.js
init_extends();
init_objectWithoutPropertiesLoose();
var React53 = __toESM(require_react());
var import_prop_types20 = __toESM(require_prop_types());
init_clsx();
init_esm();

// node_modules/@mui/base/Slider/sliderClasses.js
var COMPONENT_NAME15 = "Slider";
function getSliderUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME15, slot);
}
var sliderClasses = generateUtilityClasses2(COMPONENT_NAME15, ["root", "active", "focusVisible", "disabled", "dragging", "marked", "vertical", "trackInverted", "trackFalse", "rail", "track", "mark", "markActive", "markLabel", "markLabelActive", "thumb"]);

// node_modules/@mui/base/useSlider/useSlider.js
init_extends();
var React52 = __toESM(require_react());
init_esm();
var INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
function asc(a, b) {
  return a - b;
}
function findClosest(values, currentValue) {
  var _values$reduce;
  const {
    index: closestIndex
  } = (_values$reduce = values.reduce((acc, value, index2) => {
    const distance = Math.abs(currentValue - value);
    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index: index2
      };
    }
    return acc;
  }, null)) != null ? _values$reduce : {};
  return closestIndex;
}
function trackFinger(event, touchId) {
  if (touchId.current !== void 0 && event.changedTouches) {
    const touchEvent = event;
    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return false;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
function valueToPercent(value, min2, max2) {
  return (value - min2) * 100 / (max2 - min2);
}
function percentToValue(percent, min2, max2) {
  return (max2 - min2) * percent + min2;
}
function getDecimalPrecision(num) {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min2) {
  const nearest = Math.round((value - min2) / step) * step + min2;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function setValueIndex({
  values,
  newValue,
  index: index2
}) {
  const output = values.slice();
  output[index2] = newValue;
  return output.sort(asc);
}
function focusThumb({
  sliderRef,
  activeIndex,
  setActive
}) {
  var _sliderRef$current, _doc$activeElement;
  const doc = ownerDocument(sliderRef.current);
  if (!((_sliderRef$current = sliderRef.current) != null && _sliderRef$current.contains(doc.activeElement)) || Number(doc == null || (_doc$activeElement = doc.activeElement) == null ? void 0 : _doc$activeElement.getAttribute("data-index")) !== activeIndex) {
    var _sliderRef$current2;
    (_sliderRef$current2 = sliderRef.current) == null || _sliderRef$current2.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }
  if (setActive) {
    setActive(activeIndex);
  }
}
function areValuesEqual(newValue, oldValue) {
  if (typeof newValue === "number" && typeof oldValue === "number") {
    return newValue === oldValue;
  }
  if (typeof newValue === "object" && typeof oldValue === "object") {
    return areArraysEqual(newValue, oldValue);
  }
  return false;
}
var axisProps = {
  horizontal: {
    offset: (percent) => ({
      left: `${percent}%`
    }),
    leap: (percent) => ({
      width: `${percent}%`
    })
  },
  "horizontal-reverse": {
    offset: (percent) => ({
      right: `${percent}%`
    }),
    leap: (percent) => ({
      width: `${percent}%`
    })
  },
  vertical: {
    offset: (percent) => ({
      bottom: `${percent}%`
    }),
    leap: (percent) => ({
      height: `${percent}%`
    })
  }
};
var Identity = (x) => x;
var cachedSupportsTouchActionNone;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === void 0) {
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      cachedSupportsTouchActionNone = CSS.supports("touch-action", "none");
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}
function useSlider(parameters) {
  const {
    "aria-labelledby": ariaLabelledby,
    defaultValue,
    disabled = false,
    disableSwap = false,
    isRtl = false,
    marks: marksProp = false,
    max: max2 = 100,
    min: min2 = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    rootRef: ref,
    scale = Identity,
    step = 1,
    shiftStep = 10,
    tabIndex,
    value: valueProp
  } = parameters;
  const touchId = React52.useRef();
  const [active, setActive] = React52.useState(-1);
  const [open, setOpen] = React52.useState(-1);
  const [dragging, setDragging] = React52.useState(false);
  const moveCount = React52.useRef(0);
  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue != null ? defaultValue : min2,
    name: "Slider"
  });
  const handleChange = onChange && ((event, value, thumbIndex) => {
    const nativeEvent = event.nativeEvent || event;
    const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, "target", {
      writable: true,
      value: {
        value,
        name
      }
    });
    onChange(clonedEvent, value, thumbIndex);
  });
  const range = Array.isArray(valueDerived);
  let values = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values = values.map((value) => value == null ? min2 : clamp_default(value, min2, max2));
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max2 - min2) / step) + 1)].map((_2, index2) => ({
    value: min2 + step * index2
  })) : marksProp || [];
  const marksValues = marks.map((mark) => mark.value);
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusedThumbIndex, setFocusedThumbIndex] = React52.useState(-1);
  const sliderRef = React52.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);
  const createHandleHiddenInputFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    const index2 = Number(event.currentTarget.getAttribute("data-index"));
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusedThumbIndex(index2);
    }
    setOpen(index2);
    otherHandlers == null || (_otherHandlers$onFocu = otherHandlers.onFocus) == null || _otherHandlers$onFocu.call(otherHandlers, event);
  };
  const createHandleHiddenInputBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusedThumbIndex(-1);
    }
    setOpen(-1);
    otherHandlers == null || (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
  };
  const changeValue = (event, valueInput) => {
    const index2 = Number(event.currentTarget.getAttribute("data-index"));
    const value = values[index2];
    const marksIndex = marksValues.indexOf(value);
    let newValue = valueInput;
    if (marks && step == null) {
      const maxMarksValue = marksValues[marksValues.length - 1];
      if (newValue > maxMarksValue) {
        newValue = maxMarksValue;
      } else if (newValue < marksValues[0]) {
        newValue = marksValues[0];
      } else {
        newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
      }
    }
    newValue = clamp_default(newValue, min2, max2);
    if (range) {
      if (disableSwap) {
        newValue = clamp_default(newValue, values[index2 - 1] || -Infinity, values[index2 + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index: index2
      });
      let activeIndex = index2;
      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }
      focusThumb({
        sliderRef,
        activeIndex
      });
    }
    setValueState(newValue);
    setFocusedThumbIndex(index2);
    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(event, newValue, index2);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };
  const createHandleHiddenInputKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    if (step !== null) {
      const index2 = Number(event.currentTarget.getAttribute("data-index"));
      const value = values[index2];
      let newValue = null;
      if ((event.key === "ArrowLeft" || event.key === "ArrowDown") && event.shiftKey || event.key === "PageDown") {
        newValue = Math.max(value - shiftStep, min2);
      } else if ((event.key === "ArrowRight" || event.key === "ArrowUp") && event.shiftKey || event.key === "PageUp") {
        newValue = Math.min(value + shiftStep, max2);
      }
      if (newValue !== null) {
        changeValue(event, newValue);
        event.preventDefault();
      }
    }
    otherHandlers == null || (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
  };
  useEnhancedEffect_default(() => {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      var _document$activeEleme;
      (_document$activeEleme = document.activeElement) == null || _document$activeEleme.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusedThumbIndex !== -1) {
    setFocusedThumbIndex(-1);
  }
  const createHandleHiddenInputChange = (otherHandlers) => (event) => {
    var _otherHandlers$onChan;
    (_otherHandlers$onChan = otherHandlers.onChange) == null || _otherHandlers$onChan.call(otherHandlers, event);
    changeValue(event, event.target.valueAsNumber);
  };
  const previousIndex = React52.useRef();
  let axis = orientation;
  if (isRtl && orientation === "horizontal") {
    axis += "-reverse";
  }
  const getFingerNewValue = ({
    finger,
    move = false
  }) => {
    const {
      current: slider
    } = sliderRef;
    const {
      width,
      height,
      bottom,
      left
    } = slider.getBoundingClientRect();
    let percent;
    if (axis.indexOf("vertical") === 0) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }
    if (axis.indexOf("-reverse") !== -1) {
      percent = 1 - percent;
    }
    let newValue;
    newValue = percentToValue(percent, min2, max2);
    if (step) {
      newValue = roundValueToStep(newValue, step, min2);
    } else {
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }
    newValue = clamp_default(newValue, min2, max2);
    let activeIndex = 0;
    if (range) {
      if (!move) {
        activeIndex = findClosest(values, newValue);
      } else {
        activeIndex = previousIndex.current;
      }
      if (disableSwap) {
        newValue = clamp_default(newValue, values[activeIndex - 1] || -Infinity, values[activeIndex + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index: activeIndex
      });
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }
    return {
      newValue,
      activeIndex
    };
  };
  const handleTouchMove = useEventCallback_default((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    if (!finger) {
      return;
    }
    moveCount.current += 1;
    if (nativeEvent.type === "mousemove" && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      move: true
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }
    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });
  const handleTouchEnd = useEventCallback_default((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);
    if (!finger) {
      return;
    }
    const {
      newValue
    } = getFingerNewValue({
      finger,
      move: true
    });
    setActive(-1);
    if (nativeEvent.type === "touchend") {
      setOpen(-1);
    }
    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }
    touchId.current = void 0;
    stopListening();
  });
  const handleTouchStart = useEventCallback_default((nativeEvent) => {
    if (disabled) {
      return;
    }
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }
    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange && !areValuesEqual(newValue, valueDerived)) {
        handleChange(nativeEvent, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("touchmove", handleTouchMove, {
      passive: true
    });
    doc.addEventListener("touchend", handleTouchEnd, {
      passive: true
    });
  });
  const stopListening = React52.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener("mousemove", handleTouchMove);
    doc.removeEventListener("mouseup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  React52.useEffect(() => {
    const {
      current: slider
    } = sliderRef;
    slider.addEventListener("touchstart", handleTouchStart, {
      passive: doesSupportTouchActionNone()
    });
    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      stopListening();
    };
  }, [stopListening, handleTouchStart]);
  React52.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    (_otherHandlers$onMous = otherHandlers.onMouseDown) == null || _otherHandlers$onMous.call(otherHandlers, event);
    if (disabled) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    const finger = trackFinger(event, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange && !areValuesEqual(newValue, valueDerived)) {
        handleChange(event, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("mousemove", handleTouchMove, {
      passive: true
    });
    doc.addEventListener("mouseup", handleTouchEnd);
  };
  const trackOffset = valueToPercent(range ? values[0] : min2, min2, max2);
  const trackLeap = valueToPercent(values[values.length - 1], min2, max2) - trackOffset;
  const getRootProps = (externalProps = {}) => {
    const externalHandlers = extractEventHandlers(externalProps);
    const ownEventHandlers = {
      onMouseDown: createHandleMouseDown(externalHandlers || {})
    };
    const mergedEventHandlers = _extends({}, externalHandlers, ownEventHandlers);
    return _extends({}, externalProps, {
      ref: handleRef
    }, mergedEventHandlers);
  };
  const createHandleMouseOver = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    (_otherHandlers$onMous2 = otherHandlers.onMouseOver) == null || _otherHandlers$onMous2.call(otherHandlers, event);
    const index2 = Number(event.currentTarget.getAttribute("data-index"));
    setOpen(index2);
  };
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous3;
    (_otherHandlers$onMous3 = otherHandlers.onMouseLeave) == null || _otherHandlers$onMous3.call(otherHandlers, event);
    setOpen(-1);
  };
  const getThumbProps = (externalProps = {}) => {
    const externalHandlers = extractEventHandlers(externalProps);
    const ownEventHandlers = {
      onMouseOver: createHandleMouseOver(externalHandlers || {}),
      onMouseLeave: createHandleMouseLeave(externalHandlers || {})
    };
    return _extends({}, externalProps, externalHandlers, ownEventHandlers);
  };
  const getThumbStyle = (index2) => {
    return {
      // So the non active thumb doesn't show its label on hover.
      pointerEvents: active !== -1 && active !== index2 ? "none" : void 0
    };
  };
  const getHiddenInputProps = (externalProps = {}) => {
    var _parameters$step;
    const externalHandlers = extractEventHandlers(externalProps);
    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(externalHandlers || {}),
      onFocus: createHandleHiddenInputFocus(externalHandlers || {}),
      onBlur: createHandleHiddenInputBlur(externalHandlers || {}),
      onKeyDown: createHandleHiddenInputKeyDown(externalHandlers || {})
    };
    const mergedEventHandlers = _extends({}, externalHandlers, ownEventHandlers);
    return _extends({
      tabIndex,
      "aria-labelledby": ariaLabelledby,
      "aria-orientation": orientation,
      "aria-valuemax": scale(max2),
      "aria-valuemin": scale(min2),
      name,
      type: "range",
      min: parameters.min,
      max: parameters.max,
      step: parameters.step === null && parameters.marks ? "any" : (_parameters$step = parameters.step) != null ? _parameters$step : void 0,
      disabled
    }, externalProps, mergedEventHandlers, {
      style: _extends({}, visuallyHidden_default, {
        direction: isRtl ? "rtl" : "ltr",
        // So that VoiceOver's focus indicator matches the thumb's dimensions
        width: "100%",
        height: "100%"
      })
    });
  };
  return {
    active,
    axis,
    axisProps,
    dragging,
    focusedThumbIndex,
    getHiddenInputProps,
    getRootProps,
    getThumbProps,
    marks,
    open,
    range,
    rootRef: handleRef,
    trackLeap,
    trackOffset,
    values,
    getThumbStyle
  };
}

// node_modules/@mui/base/Slider/Slider.js
var import_jsx_runtime30 = __toESM(require_jsx_runtime());
var import_jsx_runtime31 = __toESM(require_jsx_runtime());
var _excluded16 = ["aria-label", "aria-valuetext", "aria-labelledby", "className", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "orientation", "shiftStep", "scale", "step", "tabIndex", "track", "value", "valueLabelFormat", "isRtl", "defaultValue", "slotProps", "slots"];
function Identity2(x) {
  return x;
}
var useUtilityClasses15 = (ownerState) => {
  const {
    disabled,
    dragging,
    marked,
    orientation,
    track
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", dragging && "dragging", marked && "marked", orientation === "vertical" && "vertical", track === "inverted" && "trackInverted", track === false && "trackFalse"],
    rail: ["rail"],
    track: ["track"],
    mark: ["mark"],
    markActive: ["markActive"],
    markLabel: ["markLabel"],
    markLabelActive: ["markLabelActive"],
    valueLabel: ["valueLabel"],
    thumb: ["thumb", disabled && "disabled"],
    active: ["active"],
    disabled: ["disabled"],
    focusVisible: ["focusVisible"]
  };
  return composeClasses(slots, useClassNamesOverride(getSliderUtilityClass));
};
var Slider = React53.forwardRef(function Slider2(props, forwardedRef) {
  var _slots$root, _slots$rail, _slots$track, _slots$thumb, _slots$mark, _slots$markLabel;
  const {
    "aria-label": ariaLabel,
    "aria-valuetext": ariaValuetext,
    "aria-labelledby": ariaLabelledby,
    className,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max: max2 = 100,
    min: min2 = 0,
    orientation = "horizontal",
    shiftStep = 10,
    scale = Identity2,
    step = 1,
    track = "normal",
    valueLabelFormat = Identity2,
    isRtl = false,
    defaultValue,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded16);
  const partialOwnerState = _extends({}, props, {
    marks: marksProp,
    disabled,
    disableSwap,
    isRtl,
    defaultValue,
    max: max2,
    min: min2,
    orientation,
    scale,
    step,
    shiftStep,
    track,
    valueLabelFormat
  });
  const {
    axisProps: axisProps2,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    active,
    axis,
    range,
    focusedThumbIndex,
    dragging,
    marks,
    values,
    trackOffset,
    trackLeap,
    getThumbStyle
  } = useSlider(_extends({}, partialOwnerState, {
    rootRef: forwardedRef
  }));
  const ownerState = _extends({}, partialOwnerState, {
    marked: marks.length > 0 && marks.some((mark) => mark.label),
    dragging,
    focusedThumbIndex,
    activeThumbIndex: active
  });
  const classes = useUtilityClasses15(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "span";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: [classes.root, className]
  });
  const Rail = (_slots$rail = slots.rail) != null ? _slots$rail : "span";
  const railProps = useSlotProps({
    elementType: Rail,
    externalSlotProps: slotProps.rail,
    ownerState,
    className: classes.rail
  });
  const Track = (_slots$track = slots.track) != null ? _slots$track : "span";
  const trackProps = useSlotProps({
    elementType: Track,
    externalSlotProps: slotProps.track,
    additionalProps: {
      style: _extends({}, axisProps2[axis].offset(trackOffset), axisProps2[axis].leap(trackLeap))
    },
    ownerState,
    className: classes.track
  });
  const Thumb = (_slots$thumb = slots.thumb) != null ? _slots$thumb : "span";
  const thumbProps = useSlotProps({
    elementType: Thumb,
    getSlotProps: getThumbProps,
    externalSlotProps: slotProps.thumb,
    ownerState,
    skipResolvingSlotProps: true
  });
  const ValueLabel = slots.valueLabel;
  const valueLabelProps = useSlotProps({
    elementType: ValueLabel,
    externalSlotProps: slotProps.valueLabel,
    ownerState
  });
  const Mark = (_slots$mark = slots.mark) != null ? _slots$mark : "span";
  const markProps = useSlotProps({
    elementType: Mark,
    externalSlotProps: slotProps.mark,
    ownerState,
    className: classes.mark
  });
  const MarkLabel = (_slots$markLabel = slots.markLabel) != null ? _slots$markLabel : "span";
  const markLabelProps = useSlotProps({
    elementType: MarkLabel,
    externalSlotProps: slotProps.markLabel,
    ownerState
  });
  const Input3 = slots.input || "input";
  const inputProps = useSlotProps({
    elementType: Input3,
    getSlotProps: getHiddenInputProps,
    externalSlotProps: slotProps.input,
    ownerState
  });
  return (0, import_jsx_runtime31.jsxs)(Root, _extends({}, rootProps, {
    children: [(0, import_jsx_runtime30.jsx)(Rail, _extends({}, railProps)), (0, import_jsx_runtime30.jsx)(Track, _extends({}, trackProps)), marks.filter((mark) => mark.value >= min2 && mark.value <= max2).map((mark, index2) => {
      const percent = valueToPercent(mark.value, min2, max2);
      const style = axisProps2[axis].offset(percent);
      let markActive;
      if (track === false) {
        markActive = values.indexOf(mark.value) !== -1;
      } else {
        markActive = track === "normal" && (range ? mark.value >= values[0] && mark.value <= values[values.length - 1] : mark.value <= values[0]) || track === "inverted" && (range ? mark.value <= values[0] || mark.value >= values[values.length - 1] : mark.value >= values[0]);
      }
      return (0, import_jsx_runtime31.jsxs)(React53.Fragment, {
        children: [(0, import_jsx_runtime30.jsx)(Mark, _extends({
          "data-index": index2
        }, markProps, !isHostComponent(Mark) && {
          markActive
        }, {
          style: _extends({}, style, markProps.style),
          className: clsx_default(markProps.className, markActive && classes.markActive)
        })), mark.label != null ? (0, import_jsx_runtime30.jsx)(MarkLabel, _extends({
          "aria-hidden": true,
          "data-index": index2
        }, markLabelProps, !isHostComponent(MarkLabel) && {
          markLabelActive: markActive
        }, {
          style: _extends({}, style, markLabelProps.style),
          className: clsx_default(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
          children: mark.label
        })) : null]
      }, index2);
    }), values.map((value, index2) => {
      const percent = valueToPercent(value, min2, max2);
      const style = axisProps2[axis].offset(percent);
      const resolvedSlotProps = resolveComponentProps(slotProps.thumb, ownerState, {
        index: index2,
        focused: focusedThumbIndex === index2,
        active: active === index2
      });
      return (0, import_jsx_runtime31.jsxs)(Thumb, _extends({
        "data-index": index2
      }, thumbProps, resolvedSlotProps, {
        className: clsx_default(classes.thumb, thumbProps.className, resolvedSlotProps == null ? void 0 : resolvedSlotProps.className, active === index2 && classes.active, focusedThumbIndex === index2 && classes.focusVisible),
        style: _extends({}, style, getThumbStyle(index2), thumbProps.style, resolvedSlotProps == null ? void 0 : resolvedSlotProps.style),
        children: [(0, import_jsx_runtime30.jsx)(Input3, _extends({
          "data-index": index2,
          "aria-label": getAriaLabel ? getAriaLabel(index2) : ariaLabel,
          "aria-valuenow": scale(value),
          "aria-labelledby": ariaLabelledby,
          "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index2) : ariaValuetext,
          value: values[index2]
        }, inputProps)), ValueLabel ? (0, import_jsx_runtime30.jsx)(ValueLabel, _extends({}, !isHostComponent(ValueLabel) && {
          valueLabelFormat,
          index: index2,
          disabled
        }, valueLabelProps, {
          children: typeof valueLabelFormat === "function" ? valueLabelFormat(scale(value), index2) : valueLabelFormat
        })) : null]
      }), index2);
    })]
  }));
});
true ? Slider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The label of the slider.
   */
  "aria-label": chainPropTypes(import_prop_types20.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-label"] != null) {
      return new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.");
    }
    return null;
  }),
  /**
   * The id of the element containing a label for the slider.
   */
  "aria-labelledby": import_prop_types20.default.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  "aria-valuetext": chainPropTypes(import_prop_types20.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-valuetext"] != null) {
      return new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.");
    }
    return null;
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types20.default.oneOfType([import_prop_types20.default.arrayOf(import_prop_types20.default.number), import_prop_types20.default.number]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types20.default.bool,
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: import_prop_types20.default.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: import_prop_types20.default.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: import_prop_types20.default.func,
  /**
   * If `true` the Slider will be rendered right-to-left (with the lowest value on the right-hand side).
   * @default false
   */
  isRtl: import_prop_types20.default.bool,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: import_prop_types20.default.oneOfType([import_prop_types20.default.arrayOf(import_prop_types20.default.shape({
    label: import_prop_types20.default.node,
    value: import_prop_types20.default.number.isRequired
  })), import_prop_types20.default.bool]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: import_prop_types20.default.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: import_prop_types20.default.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: import_prop_types20.default.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: import_prop_types20.default.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: import_prop_types20.default.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: import_prop_types20.default.oneOf(["horizontal", "vertical"]),
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale: import_prop_types20.default.func,
  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep: import_prop_types20.default.number,
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps: import_prop_types20.default.shape({
    input: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    mark: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    markLabel: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    rail: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    root: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    thumb: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    track: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    valueLabel: import_prop_types20.default.oneOfType([import_prop_types20.default.any, import_prop_types20.default.func])
  }),
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types20.default.shape({
    input: import_prop_types20.default.elementType,
    mark: import_prop_types20.default.elementType,
    markLabel: import_prop_types20.default.elementType,
    rail: import_prop_types20.default.elementType,
    root: import_prop_types20.default.elementType,
    thumb: import_prop_types20.default.elementType,
    track: import_prop_types20.default.elementType,
    valueLabel: import_prop_types20.default.elementType
  }),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: import_prop_types20.default.number,
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: import_prop_types20.default.number,
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: import_prop_types20.default.oneOf(["inverted", "normal", false]),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: import_prop_types20.default.oneOfType([import_prop_types20.default.arrayOf(import_prop_types20.default.number), import_prop_types20.default.number]),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.string])
} : void 0;

// node_modules/@mui/base/Snackbar/Snackbar.js
init_extends();
init_objectWithoutPropertiesLoose();
var React55 = __toESM(require_react());
var import_prop_types21 = __toESM(require_prop_types());

// node_modules/@mui/base/Snackbar/snackbarClasses.js
var COMPONENT_NAME16 = "Snackbar";
function getSnackbarUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME16, slot);
}
var snackbarClasses = generateUtilityClasses2(COMPONENT_NAME16, ["root"]);

// node_modules/@mui/base/useSnackbar/useSnackbar.js
init_extends();
var React54 = __toESM(require_react());
init_esm();
function useSnackbar(parameters = {}) {
  const {
    autoHideDuration = null,
    disableWindowBlurListener = false,
    onClose,
    open,
    resumeHideDuration
  } = parameters;
  const timerAutoHide = useTimeout();
  React54.useEffect(() => {
    if (!open) {
      return void 0;
    }
    function handleKeyDown2(nativeEvent) {
      if (!nativeEvent.defaultPrevented) {
        if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
          onClose == null || onClose(nativeEvent, "escapeKeyDown");
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown2);
    return () => {
      document.removeEventListener("keydown", handleKeyDown2);
    };
  }, [open, onClose]);
  const handleClose = useEventCallback_default((event, reason) => {
    onClose == null || onClose(event, reason);
  });
  const setAutoHideTimer = useEventCallback_default((autoHideDurationParam) => {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }
    timerAutoHide.start(autoHideDurationParam, () => {
      handleClose(null, "timeout");
    });
  });
  React54.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }
    return timerAutoHide.clear;
  }, [open, autoHideDuration, setAutoHideTimer, timerAutoHide]);
  const handleClickAway = (event) => {
    onClose == null || onClose(event, "clickaway");
  };
  const handlePause = timerAutoHide.clear;
  const handleResume = React54.useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);
  const createHandleBlur = (otherHandlers) => (event) => {
    const onBlurCallback = otherHandlers.onBlur;
    onBlurCallback == null || onBlurCallback(event);
    handleResume();
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    const onFocusCallback = otherHandlers.onFocus;
    onFocusCallback == null || onFocusCallback(event);
    handlePause();
  };
  const createMouseEnter = (otherHandlers) => (event) => {
    const onMouseEnterCallback = otherHandlers.onMouseEnter;
    onMouseEnterCallback == null || onMouseEnterCallback(event);
    handlePause();
  };
  const createMouseLeave = (otherHandlers) => (event) => {
    const onMouseLeaveCallback = otherHandlers.onMouseLeave;
    onMouseLeaveCallback == null || onMouseLeaveCallback(event);
    handleResume();
  };
  React54.useEffect(() => {
    if (!disableWindowBlurListener && open) {
      window.addEventListener("focus", handleResume);
      window.addEventListener("blur", handlePause);
      return () => {
        window.removeEventListener("focus", handleResume);
        window.removeEventListener("blur", handlePause);
      };
    }
    return void 0;
  }, [disableWindowBlurListener, open, handleResume, handlePause]);
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = _extends({}, extractEventHandlers(parameters), extractEventHandlers(externalProps));
    return _extends({
      // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
      // See https://github.com/mui/material-ui/issues/29080
      role: "presentation"
    }, externalProps, externalEventHandlers, {
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onMouseEnter: createMouseEnter(externalEventHandlers),
      onMouseLeave: createMouseLeave(externalEventHandlers)
    });
  };
  return {
    getRootProps,
    onClickAway: handleClickAway
  };
}

// node_modules/@mui/base/Snackbar/Snackbar.js
var import_jsx_runtime32 = __toESM(require_jsx_runtime());
var _excluded17 = ["autoHideDuration", "children", "disableWindowBlurListener", "exited", "onBlur", "onClose", "onFocus", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "slotProps", "slots"];
var useUtilityClasses16 = () => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, useClassNamesOverride(getSnackbarUtilityClass));
};
var Snackbar = React55.forwardRef(function Snackbar2(props, forwardedRef) {
  const {
    autoHideDuration = null,
    children,
    disableWindowBlurListener = false,
    exited = true,
    onClose,
    open,
    resumeHideDuration,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded17);
  const classes = useUtilityClasses16();
  const {
    getRootProps,
    onClickAway
  } = useSnackbar(_extends({}, props, {
    autoHideDuration,
    disableWindowBlurListener,
    onClose,
    open,
    resumeHideDuration
  }));
  const ownerState = props;
  const Root = slots.root || "div";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  const clickAwayListenerProps = useSlotProps({
    elementType: ClickAwayListener,
    externalSlotProps: slotProps.clickAwayListener,
    additionalProps: {
      onClickAway
    },
    ownerState
  });
  delete clickAwayListenerProps.ownerState;
  if (!open && exited) {
    return null;
  }
  return (0, import_jsx_runtime32.jsx)(ClickAwayListener, _extends({}, clickAwayListenerProps, {
    children: (0, import_jsx_runtime32.jsx)(Root, _extends({}, rootProps, {
      children
    }))
  }));
});
true ? Snackbar.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: import_prop_types21.default.number,
  /**
   * @ignore
   */
  children: import_prop_types21.default.node,
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: import_prop_types21.default.bool,
  /**
   * The prop used to handle exited transition and unmount the component.
   * @default true
   */
  exited: import_prop_types21.default.bool,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose: import_prop_types21.default.func,
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types21.default.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: import_prop_types21.default.number,
  /**
   * The props used for each slot inside the Snackbar.
   * @default {}
   */
  slotProps: import_prop_types21.default.shape({
    clickAwayListener: import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.shape({
      children: import_prop_types21.default.element.isRequired,
      disableReactTree: import_prop_types21.default.bool,
      mouseEvent: import_prop_types21.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
      onClickAway: import_prop_types21.default.func,
      touchEvent: import_prop_types21.default.oneOf(["onTouchEnd", "onTouchStart", false])
    })]),
    root: import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.object])
  }),
  /**
   * The components used for each slot inside the Snackbar.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types21.default.shape({
    root: import_prop_types21.default.elementType
  })
} : void 0;

// node_modules/@mui/base/Switch/Switch.js
init_extends();
init_objectWithoutPropertiesLoose();
var React57 = __toESM(require_react());
var import_prop_types22 = __toESM(require_prop_types());

// node_modules/@mui/base/useSwitch/useSwitch.js
init_extends();
var React56 = __toESM(require_react());
init_esm();
function useSwitch(props) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "Switch",
    state: "checked"
  });
  const createHandleInputChange = (otherProps) => (event) => {
    var _otherProps$onChange;
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    setCheckedState(event.target.checked);
    onChange == null || onChange(event);
    (_otherProps$onChange = otherProps.onChange) == null || _otherProps$onChange.call(otherProps, event);
  };
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React56.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React56.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const inputRef = React56.useRef(null);
  const createHandleFocus = (otherProps) => (event) => {
    var _otherProps$onFocus;
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible == null || onFocusVisible(event);
    }
    onFocus == null || onFocus(event);
    (_otherProps$onFocus = otherProps.onFocus) == null || _otherProps$onFocus.call(otherProps, event);
  };
  const createHandleBlur = (otherProps) => (event) => {
    var _otherProps$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    onBlur == null || onBlur(event);
    (_otherProps$onBlur = otherProps.onBlur) == null || _otherProps$onBlur.call(otherProps, event);
  };
  const handleInputRef = useForkRef(focusVisibleRef, inputRef);
  const getInputProps = (otherProps = {}) => _extends({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    ref: handleInputRef,
    required,
    type: "checkbox",
    role: "switch",
    "aria-checked": checkedProp
  }, otherProps, {
    onChange: createHandleInputChange(otherProps),
    onFocus: createHandleFocus(otherProps),
    onBlur: createHandleBlur(otherProps)
  });
  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    inputRef: handleInputRef,
    readOnly: Boolean(readOnly)
  };
}

// node_modules/@mui/base/Switch/switchClasses.js
var COMPONENT_NAME17 = "Switch";
function getSwitchUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME17, slot);
}
var switchClasses = generateUtilityClasses2(COMPONENT_NAME17, ["root", "input", "track", "thumb", "checked", "disabled", "focusVisible", "readOnly"]);

// node_modules/@mui/base/Switch/Switch.js
var import_jsx_runtime33 = __toESM(require_jsx_runtime());
var import_jsx_runtime34 = __toESM(require_jsx_runtime());
var _excluded18 = ["checked", "defaultChecked", "disabled", "onBlur", "onChange", "onFocus", "onFocusVisible", "readOnly", "required", "slotProps", "slots"];
var useUtilityClasses17 = (ownerState) => {
  const {
    checked,
    disabled,
    focusVisible,
    readOnly
  } = ownerState;
  const slots = {
    root: ["root", checked && "checked", disabled && "disabled", focusVisible && "focusVisible", readOnly && "readOnly"],
    thumb: ["thumb"],
    input: ["input"],
    track: ["track"]
  };
  return composeClasses(slots, useClassNamesOverride(getSwitchUtilityClass));
};
var Switch = React57.forwardRef(function Switch2(props, forwardedRef) {
  var _slots$root, _slots$thumb, _slots$input, _slots$track;
  const {
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded18);
  const {
    getInputProps,
    checked,
    disabled,
    focusVisible,
    readOnly
  } = useSwitch(props);
  const ownerState = _extends({}, props, {
    checked,
    disabled,
    focusVisible,
    readOnly
  });
  const classes = useUtilityClasses17(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "span";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  const Thumb = (_slots$thumb = slots.thumb) != null ? _slots$thumb : "span";
  const thumbProps = useSlotProps({
    elementType: Thumb,
    externalSlotProps: slotProps.thumb,
    ownerState,
    className: classes.thumb
  });
  const Input3 = (_slots$input = slots.input) != null ? _slots$input : "input";
  const inputProps = useSlotProps({
    elementType: Input3,
    getSlotProps: getInputProps,
    externalSlotProps: slotProps.input,
    ownerState,
    className: classes.input
  });
  const Track = slots.track === null ? () => null : (_slots$track = slots.track) != null ? _slots$track : "span";
  const trackProps = useSlotProps({
    elementType: Track,
    externalSlotProps: slotProps.track,
    ownerState,
    className: classes.track
  });
  return (0, import_jsx_runtime34.jsxs)(Root, _extends({}, rootProps, {
    children: [(0, import_jsx_runtime33.jsx)(Track, _extends({}, trackProps)), (0, import_jsx_runtime33.jsx)(Thumb, _extends({}, thumbProps)), (0, import_jsx_runtime33.jsx)(Input3, _extends({}, inputProps))]
  }));
});
true ? Switch.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types22.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types22.default.string,
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: import_prop_types22.default.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: import_prop_types22.default.bool,
  /**
   * @ignore
   */
  onBlur: import_prop_types22.default.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: import_prop_types22.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types22.default.func,
  /**
   * @ignore
   */
  onFocusVisible: import_prop_types22.default.func,
  /**
   * If `true`, the component is read only.
   */
  readOnly: import_prop_types22.default.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: import_prop_types22.default.bool,
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  slotProps: import_prop_types22.default.shape({
    input: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object]),
    root: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object]),
    thumb: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object]),
    track: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object])
  }),
  /**
   * The components used for each slot inside the Switch.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types22.default.shape({
    input: import_prop_types22.default.elementType,
    root: import_prop_types22.default.elementType,
    thumb: import_prop_types22.default.elementType,
    track: import_prop_types22.default.oneOfType([import_prop_types22.default.elementType, import_prop_types22.default.oneOf([null])])
  })
} : void 0;

// node_modules/@mui/base/TablePagination/TablePagination.js
init_extends();
init_objectWithoutPropertiesLoose();
var React59 = __toESM(require_react());
var import_prop_types23 = __toESM(require_prop_types());
init_esm();

// node_modules/@mui/base/TablePagination/TablePaginationActions.js
init_extends();
init_objectWithoutPropertiesLoose();
var React58 = __toESM(require_react());
var import_jsx_runtime35 = __toESM(require_jsx_runtime());
var import_jsx_runtime36 = __toESM(require_jsx_runtime());
var _excluded19 = ["count", "getItemAriaLabel", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton", "direction", "ownerState", "slotProps", "slots"];
var _span2;
var _span22;
var _span3;
var _span4;
function LastPageIconDefault() {
  return _span2 || (_span2 = (0, import_jsx_runtime35.jsx)("span", {
    children: "⇾|"
  }));
}
function FirstPageIconDefault() {
  return _span22 || (_span22 = (0, import_jsx_runtime35.jsx)("span", {
    children: "|⇽"
  }));
}
function NextPageIconDefault() {
  return _span3 || (_span3 = (0, import_jsx_runtime35.jsx)("span", {
    children: "⇾"
  }));
}
function BackPageIconDefault() {
  return _span4 || (_span4 = (0, import_jsx_runtime35.jsx)("span", {
    children: "⇽"
  }));
}
function defaultGetAriaLabel(type) {
  return `Go to ${type} page`;
}
var TablePaginationActions = React58.forwardRef(function TablePaginationActions2(props, forwardedRef) {
  var _slots$root, _slots$firstButton, _slots$lastButton, _slots$nextButton, _slots$backButton, _slots$lastPageIcon, _slots$firstPageIcon, _slots$nextPageIcon, _slots$backPageIcon;
  const {
    count,
    getItemAriaLabel = defaultGetAriaLabel,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton = false,
    showLastButton = false,
    direction,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded19);
  const ownerState = props;
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState
  });
  const FirstButton = (_slots$firstButton = slots.firstButton) != null ? _slots$firstButton : "button";
  const firstButtonProps = useSlotProps({
    elementType: FirstButton,
    externalSlotProps: slotProps.firstButton,
    additionalProps: {
      onClick: handleFirstPageButtonClick,
      disabled: page === 0,
      "aria-label": getItemAriaLabel("first", page),
      title: getItemAriaLabel("first", page)
    },
    ownerState
  });
  const LastButton = (_slots$lastButton = slots.lastButton) != null ? _slots$lastButton : "button";
  const lastButtonProps = useSlotProps({
    elementType: LastButton,
    externalSlotProps: slotProps.lastButton,
    additionalProps: {
      onClick: handleLastPageButtonClick,
      disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      "aria-label": getItemAriaLabel("last", page),
      title: getItemAriaLabel("last", page)
    },
    ownerState
  });
  const NextButton = (_slots$nextButton = slots.nextButton) != null ? _slots$nextButton : "button";
  const nextButtonProps = useSlotProps({
    elementType: NextButton,
    externalSlotProps: slotProps.nextButton,
    additionalProps: {
      onClick: handleNextButtonClick,
      disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
      "aria-label": getItemAriaLabel("next", page),
      title: getItemAriaLabel("next", page)
    },
    ownerState
  });
  const BackButton = (_slots$backButton = slots.backButton) != null ? _slots$backButton : "button";
  const backButtonProps = useSlotProps({
    elementType: BackButton,
    externalSlotProps: slotProps.backButton,
    additionalProps: {
      onClick: handleBackButtonClick,
      disabled: page === 0,
      "aria-label": getItemAriaLabel("previous", page),
      title: getItemAriaLabel("previous", page)
    },
    ownerState
  });
  const LastPageIcon = (_slots$lastPageIcon = slots.lastPageIcon) != null ? _slots$lastPageIcon : LastPageIconDefault;
  const FirstPageIcon = (_slots$firstPageIcon = slots.firstPageIcon) != null ? _slots$firstPageIcon : FirstPageIconDefault;
  const NextPageIcon = (_slots$nextPageIcon = slots.nextPageIcon) != null ? _slots$nextPageIcon : NextPageIconDefault;
  const BackPageIcon = (_slots$backPageIcon = slots.backPageIcon) != null ? _slots$backPageIcon : BackPageIconDefault;
  return (0, import_jsx_runtime36.jsxs)(Root, _extends({}, rootProps, {
    children: [showFirstButton && (0, import_jsx_runtime35.jsx)(FirstButton, _extends({}, firstButtonProps, {
      children: direction === "rtl" ? (0, import_jsx_runtime35.jsx)(LastPageIcon, {}) : (0, import_jsx_runtime35.jsx)(FirstPageIcon, {})
    })), (0, import_jsx_runtime35.jsx)(BackButton, _extends({}, backButtonProps, {
      children: direction === "rtl" ? (0, import_jsx_runtime35.jsx)(NextPageIcon, {}) : (0, import_jsx_runtime35.jsx)(BackPageIcon, {})
    })), (0, import_jsx_runtime35.jsx)(NextButton, _extends({}, nextButtonProps, {
      children: direction === "rtl" ? (0, import_jsx_runtime35.jsx)(BackPageIcon, {}) : (0, import_jsx_runtime35.jsx)(NextPageIcon, {})
    })), showLastButton && (0, import_jsx_runtime35.jsx)(LastButton, _extends({}, lastButtonProps, {
      children: direction === "rtl" ? (0, import_jsx_runtime35.jsx)(FirstPageIcon, {}) : (0, import_jsx_runtime35.jsx)(LastPageIcon, {})
    }))]
  }));
});

// node_modules/@mui/base/TablePagination/tablePaginationClasses.js
var COMPONENT_NAME18 = "TablePagination";
function getTablePaginationUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME18, slot);
}
var tablePaginationClasses = generateUtilityClasses2(COMPONENT_NAME18, ["root", "toolbar", "spacer", "selectLabel", "selectRoot", "select", "selectIcon", "input", "menuItem", "displayedRows", "actions"]);

// node_modules/@mui/base/TablePagination/TablePagination.js
var import_jsx_runtime37 = __toESM(require_jsx_runtime());
var import_react2 = __toESM(require_react());
var import_jsx_runtime38 = __toESM(require_jsx_runtime());
var _excluded20 = ["colSpan", "count", "getItemAriaLabel", "labelDisplayedRows", "labelId", "labelRowsPerPage", "onPageChange", "onRowsPerPageChange", "page", "rowsPerPage", "rowsPerPageOptions", "selectId", "slotProps", "slots"];
function defaultLabelDisplayedRows({
  from,
  to,
  count
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}
function defaultGetAriaLabel2(type) {
  return `Go to ${type} page`;
}
var useUtilityClasses18 = () => {
  const slots = {
    root: ["root"],
    toolbar: ["toolbar"],
    spacer: ["spacer"],
    selectLabel: ["selectLabel"],
    select: ["select"],
    input: ["input"],
    selectIcon: ["selectIcon"],
    menuItem: ["menuItem"],
    displayedRows: ["displayedRows"],
    actions: ["actions"]
  };
  return composeClasses(slots, useClassNamesOverride(getTablePaginationUtilityClass));
};
var TablePagination = React59.forwardRef(function TablePagination2(props, forwardedRef) {
  var _slots$root, _slots$select, _slots$actions, _slots$menuItem, _slots$selectLabel, _slots$displayedRows, _slots$toolbar, _slots$spacer;
  const {
    colSpan: colSpanProp,
    count,
    getItemAriaLabel = defaultGetAriaLabel2,
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelId: labelIdProp,
    labelRowsPerPage = "Rows per page:",
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    selectId: selectIdProp,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded20);
  const ownerState = props;
  const classes = useUtilityClasses18();
  let colSpan;
  const Root = (_slots$root = slots.root) != null ? _slots$root : "td";
  if (Root === "td" || !isHostComponent(Root)) {
    colSpan = colSpanProp || 1e3;
  }
  const getLabelDisplayedRowsTo = () => {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };
  const selectId = useId(selectIdProp);
  const labelId = useId(labelIdProp);
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      colSpan,
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  const Select3 = (_slots$select = slots.select) != null ? _slots$select : "select";
  const selectProps = useSlotProps({
    elementType: Select3,
    externalSlotProps: slotProps.select,
    additionalProps: {
      value: rowsPerPage,
      id: selectId,
      onChange: (event) => onRowsPerPageChange && onRowsPerPageChange(event),
      "aria-label": rowsPerPage.toString(),
      "aria-labelledby": [labelId, selectId].filter(Boolean).join(" ") || void 0
    },
    ownerState,
    className: classes.select
  });
  const Actions = (_slots$actions = slots.actions) != null ? _slots$actions : TablePaginationActions;
  const actionsProps = useSlotProps({
    elementType: Actions,
    externalSlotProps: slotProps.actions,
    additionalProps: {
      page,
      rowsPerPage,
      count,
      onPageChange,
      getItemAriaLabel
    },
    ownerState,
    className: classes.actions
  });
  const MenuItem4 = (_slots$menuItem = slots.menuItem) != null ? _slots$menuItem : "option";
  const menuItemProps = useSlotProps({
    elementType: MenuItem4,
    externalSlotProps: slotProps.menuItem,
    additionalProps: {
      value: void 0
    },
    ownerState,
    className: classes.menuItem
  });
  const SelectLabel = (_slots$selectLabel = slots.selectLabel) != null ? _slots$selectLabel : "p";
  const selectLabelProps = useSlotProps({
    elementType: SelectLabel,
    externalSlotProps: slotProps.selectLabel,
    additionalProps: {
      id: labelId
    },
    ownerState,
    className: classes.selectLabel
  });
  const DisplayedRows = (_slots$displayedRows = slots.displayedRows) != null ? _slots$displayedRows : "p";
  const displayedRowsProps = useSlotProps({
    elementType: DisplayedRows,
    externalSlotProps: slotProps.displayedRows,
    ownerState,
    className: classes.displayedRows
  });
  const Toolbar = (_slots$toolbar = slots.toolbar) != null ? _slots$toolbar : "div";
  const toolbarProps = useSlotProps({
    elementType: Toolbar,
    externalSlotProps: slotProps.toolbar,
    ownerState,
    className: classes.toolbar
  });
  const Spacer = (_slots$spacer = slots.spacer) != null ? _slots$spacer : "div";
  const spacerProps = useSlotProps({
    elementType: Spacer,
    externalSlotProps: slotProps.spacer,
    ownerState,
    className: classes.spacer
  });
  return (0, import_jsx_runtime37.jsx)(Root, _extends({}, rootProps, {
    children: (0, import_jsx_runtime38.jsxs)(Toolbar, _extends({}, toolbarProps, {
      children: [(0, import_jsx_runtime37.jsx)(Spacer, _extends({}, spacerProps)), rowsPerPageOptions.length > 1 && (0, import_jsx_runtime37.jsx)(SelectLabel, _extends({}, selectLabelProps, {
        children: labelRowsPerPage
      })), rowsPerPageOptions.length > 1 && (0, import_jsx_runtime37.jsx)(Select3, _extends({}, selectProps, {
        children: rowsPerPageOptions.map((rowsPerPageOption) => (0, import_react2.createElement)(MenuItem4, _extends({}, menuItemProps, {
          key: typeof rowsPerPageOption !== "number" && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption,
          value: typeof rowsPerPageOption !== "number" && rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
        }), typeof rowsPerPageOption !== "number" && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption))
      })), (0, import_jsx_runtime37.jsx)(DisplayedRows, _extends({}, displayedRowsProps, {
        children: labelDisplayedRows({
          from: count === 0 ? 0 : page * rowsPerPage + 1,
          to: getLabelDisplayedRowsTo(),
          count: count === -1 ? -1 : count,
          page
        })
      })), (0, import_jsx_runtime37.jsx)(Actions, _extends({}, actionsProps))]
    }))
  }));
});
true ? TablePagination.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  colSpan: import_prop_types23.default.number,
  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: import_prop_types23.default.number.isRequired,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type: ItemAriaLabelType) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: import_prop_types23.default.func,
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs) {
   *   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: import_prop_types23.default.func,
  /**
   * Id of the label element within the pagination.
   */
  labelId: import_prop_types23.default.string,
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage: import_prop_types23.default.node,
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: import_prop_types23.default.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   */
  onRowsPerPageChange: import_prop_types23.default.func,
  /**
   * The zero-based index of the current page.
   */
  page: chainPropTypes(integerPropType_default.isRequired, (props) => {
    const {
      count,
      page,
      rowsPerPage
    } = props;
    if (count === -1) {
      return null;
    }
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (page < 0 || page > newLastPage) {
      return new Error(`MUI: The page prop of a TablePagination is out of range (0 to ${newLastPage}, but page is ${page}).`);
    }
    return null;
  }),
  /**
   * The number of rows per page.
   *
   * Set -1 to display all the rows.
   */
  rowsPerPage: integerPropType_default.isRequired,
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * Use -1 for the value with a custom label to show all the rows.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions: import_prop_types23.default.arrayOf(import_prop_types23.default.oneOfType([import_prop_types23.default.number, import_prop_types23.default.shape({
    label: import_prop_types23.default.string.isRequired,
    value: import_prop_types23.default.number.isRequired
  })]).isRequired),
  /**
   * Id of the select element within the pagination.
   */
  selectId: import_prop_types23.default.string,
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps: import_prop_types23.default.shape({
    actions: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    displayedRows: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    menuItem: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    root: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    select: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    selectLabel: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    spacer: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    toolbar: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object])
  }),
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types23.default.shape({
    actions: import_prop_types23.default.elementType,
    displayedRows: import_prop_types23.default.elementType,
    menuItem: import_prop_types23.default.elementType,
    root: import_prop_types23.default.elementType,
    select: import_prop_types23.default.elementType,
    selectLabel: import_prop_types23.default.elementType,
    spacer: import_prop_types23.default.elementType,
    toolbar: import_prop_types23.default.elementType
  })
} : void 0;

// node_modules/@mui/base/TabPanel/TabPanel.js
init_extends();
init_objectWithoutPropertiesLoose();
var React65 = __toESM(require_react());
var import_prop_types25 = __toESM(require_prop_types());

// node_modules/@mui/base/TabPanel/tabPanelClasses.js
var COMPONENT_NAME19 = "TabPanel";
function getTabPanelUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME19, slot);
}
var tabPanelClasses = generateUtilityClasses2(COMPONENT_NAME19, ["root", "hidden"]);

// node_modules/@mui/base/useTabPanel/useTabPanel.js
init_extends();
var React64 = __toESM(require_react());
init_esm();

// node_modules/@mui/base/Tabs/Tabs.js
init_extends();
init_objectWithoutPropertiesLoose();
var React63 = __toESM(require_react());
var import_prop_types24 = __toESM(require_prop_types());

// node_modules/@mui/base/Tabs/tabsClasses.js
var COMPONENT_NAME20 = "Tabs";
function getTabsUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME20, slot);
}
var tabsClasses = generateUtilityClasses2(COMPONENT_NAME20, ["root", "horizontal", "vertical"]);

// node_modules/@mui/base/useTabs/useTabs.js
init_extends();
var React60 = __toESM(require_react());
init_esm();
function useTabs(parameters) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation = "horizontal",
    direction = "ltr",
    selectionFollowsFocus = false
  } = parameters;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Tabs",
    state: "value"
  });
  const onSelected = React60.useCallback((event, newValue) => {
    setValue(newValue);
    onChange == null || onChange(event, newValue);
  }, [onChange, setValue]);
  const {
    subitems: tabPanels,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const tabIdLookup = React60.useRef(() => void 0);
  const getTabPanelId = React60.useCallback((tabValue) => {
    var _tabPanels$get;
    return (_tabPanels$get = tabPanels.get(tabValue)) == null ? void 0 : _tabPanels$get.id;
  }, [tabPanels]);
  const getTabId = React60.useCallback((tabPanelId) => {
    return tabIdLookup.current(tabPanelId);
  }, []);
  const registerTabIdLookup = React60.useCallback((lookupFunction) => {
    tabIdLookup.current = lookupFunction;
  }, []);
  return {
    contextValue: _extends({
      direction,
      getTabId,
      getTabPanelId,
      onSelected,
      orientation,
      registerTabIdLookup,
      selectionFollowsFocus,
      value
    }, compoundComponentContextValue)
  };
}

// node_modules/@mui/base/useTabs/TabsProvider.js
var React62 = __toESM(require_react());

// node_modules/@mui/base/Tabs/TabsContext.js
var React61 = __toESM(require_react());
var TabsContext = React61.createContext(null);
if (true) {
  TabsContext.displayName = "TabsContext";
}
function useTabsContext() {
  const context = React61.useContext(TabsContext);
  if (context == null) {
    throw new Error("No TabsContext provided");
  }
  return context;
}

// node_modules/@mui/base/useTabs/TabsProvider.js
var import_jsx_runtime39 = __toESM(require_jsx_runtime());
function TabsProvider(props) {
  const {
    value: valueProp,
    children
  } = props;
  const {
    direction,
    getItemIndex,
    onSelected,
    orientation,
    registerItem,
    registerTabIdLookup,
    selectionFollowsFocus,
    totalSubitemCount,
    value,
    getTabId,
    getTabPanelId
  } = valueProp;
  const compoundComponentContextValue = React62.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  const tabsContextValue = React62.useMemo(() => ({
    direction,
    getTabId,
    getTabPanelId,
    onSelected,
    orientation,
    registerTabIdLookup,
    selectionFollowsFocus,
    value
  }), [direction, getTabId, getTabPanelId, onSelected, orientation, registerTabIdLookup, selectionFollowsFocus, value]);
  return (0, import_jsx_runtime39.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime39.jsx)(TabsContext.Provider, {
      value: tabsContextValue,
      children
    })
  });
}

// node_modules/@mui/base/Tabs/Tabs.js
var import_jsx_runtime40 = __toESM(require_jsx_runtime());
var _excluded21 = ["children", "value", "defaultValue", "orientation", "direction", "onChange", "selectionFollowsFocus", "slotProps", "slots"];
var useUtilityClasses19 = (ownerState) => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ["root", orientation]
  };
  return composeClasses(slots, useClassNamesOverride(getTabsUtilityClass));
};
var Tabs = React63.forwardRef(function Tabs2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    orientation = "horizontal",
    direction = "ltr",
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded21);
  const ownerState = _extends({}, props, {
    orientation,
    direction
  });
  const {
    contextValue
  } = useTabs(ownerState);
  const classes = useUtilityClasses19(ownerState);
  const TabsRoot = (_slots$root = slots.root) != null ? _slots$root : "div";
  const tabsRootProps = useSlotProps({
    elementType: TabsRoot,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime40.jsx)(TabsRoot, _extends({}, tabsRootProps, {
    children: (0, import_jsx_runtime40.jsx)(TabsProvider, {
      value: contextValue,
      children
    })
  }));
});
true ? Tabs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types24.default.node,
  /**
   * @ignore
   */
  className: import_prop_types24.default.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types24.default.oneOfType([import_prop_types24.default.number, import_prop_types24.default.string]),
  /**
   * The direction of the text.
   * @default 'ltr'
   */
  direction: import_prop_types24.default.oneOf(["ltr", "rtl"]),
  /**
   * Callback invoked when new value is being set.
   */
  onChange: import_prop_types24.default.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: import_prop_types24.default.oneOf(["horizontal", "vertical"]),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: import_prop_types24.default.bool,
  /**
   * The props used for each slot inside the Tabs.
   * @default {}
   */
  slotProps: import_prop_types24.default.shape({
    root: import_prop_types24.default.oneOfType([import_prop_types24.default.func, import_prop_types24.default.object])
  }),
  /**
   * The components used for each slot inside the Tabs.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types24.default.shape({
    root: import_prop_types24.default.elementType
  }),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `null`.
   */
  value: import_prop_types24.default.oneOfType([import_prop_types24.default.number, import_prop_types24.default.string])
} : void 0;

// node_modules/@mui/base/useTabPanel/useTabPanel.js
function tabPanelValueGenerator(otherTabPanelValues) {
  return otherTabPanelValues.size;
}
function useTabPanel(parameters) {
  const {
    value: valueParam,
    id: idParam,
    rootRef: externalRef
  } = parameters;
  const context = useTabsContext();
  if (context === null) {
    throw new Error("No TabContext provided");
  }
  const {
    value: selectedTabValue,
    getTabId
  } = context;
  const id = useId(idParam);
  const ref = React64.useRef(null);
  const handleRef = useForkRef(ref, externalRef);
  const metadata = React64.useMemo(() => ({
    id,
    ref
  }), [id]);
  const {
    id: value
  } = useCompoundItem(valueParam != null ? valueParam : tabPanelValueGenerator, metadata);
  const hidden = value !== selectedTabValue;
  const correspondingTabId = value !== void 0 ? getTabId(value) : void 0;
  const getRootProps = (externalProps = {}) => {
    return _extends({
      "aria-labelledby": correspondingTabId != null ? correspondingTabId : void 0,
      hidden,
      id: id != null ? id : void 0
    }, externalProps, {
      ref: handleRef
    });
  };
  return {
    hidden,
    getRootProps,
    rootRef: handleRef
  };
}

// node_modules/@mui/base/TabPanel/TabPanel.js
var import_jsx_runtime41 = __toESM(require_jsx_runtime());
var _excluded23 = ["children", "value", "slotProps", "slots"];
var useUtilityClasses20 = (ownerState) => {
  const {
    hidden
  } = ownerState;
  const slots = {
    root: ["root", hidden && "hidden"]
  };
  return composeClasses(slots, useClassNamesOverride(getTabPanelUtilityClass));
};
var TabPanel = React65.forwardRef(function TabPanel2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded23);
  const {
    hidden,
    getRootProps
  } = useTabPanel(props);
  const ownerState = _extends({}, props, {
    hidden
  });
  const classes = useUtilityClasses20(ownerState);
  const TabPanelRoot = (_slots$root = slots.root) != null ? _slots$root : "div";
  const tabPanelRootProps = useSlotProps({
    elementType: TabPanelRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: "tabpanel",
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime41.jsx)(TabPanelRoot, _extends({}, tabPanelRootProps, {
    children: !hidden && children
  }));
});
true ? TabPanel.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types25.default.node,
  /**
   * @ignore
   */
  className: import_prop_types25.default.string,
  /**
   * The props used for each slot inside the TabPanel.
   * @default {}
   */
  slotProps: import_prop_types25.default.shape({
    root: import_prop_types25.default.oneOfType([import_prop_types25.default.func, import_prop_types25.default.object])
  }),
  /**
   * The components used for each slot inside the TabPanel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types25.default.shape({
    root: import_prop_types25.default.elementType
  }),
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   * If not provided, it will fall back to the index of the panel.
   * It is recommended to explicitly provide it, as it's required for the tab panel to be rendered on the server.
   */
  value: import_prop_types25.default.oneOfType([import_prop_types25.default.number, import_prop_types25.default.string])
} : void 0;

// node_modules/@mui/base/TabsList/TabsList.js
init_extends();
init_objectWithoutPropertiesLoose();
var React68 = __toESM(require_react());
var import_prop_types26 = __toESM(require_prop_types());

// node_modules/@mui/base/TabsList/tabsListClasses.js
var COMPONENT_NAME21 = "TabsList";
function getTabsListUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME21, slot);
}
var tabsListClasses = generateUtilityClasses2(COMPONENT_NAME21, ["root", "horizontal", "vertical"]);

// node_modules/@mui/base/useTabsList/useTabsList.js
init_extends();
var React66 = __toESM(require_react());

// node_modules/@mui/base/useTabsList/useTabsList.types.js
var TabsListActionTypes = {
  valueChange: "valueChange"
};

// node_modules/@mui/base/useTabsList/tabsListReducer.js
init_extends();
function tabsListReducer(state, action) {
  if (action.type === TabsListActionTypes.valueChange) {
    return _extends({}, state, {
      highlightedValue: action.value
    });
  }
  const newState = listReducer(state, action);
  const {
    context: {
      selectionFollowsFocus
    }
  } = action;
  if (action.type === ListActionTypes.itemsChange) {
    if (newState.selectedValues.length > 0) {
      return _extends({}, newState, {
        highlightedValue: newState.selectedValues[0]
      });
    }
    moveHighlight(null, "reset", action.context);
  }
  if (selectionFollowsFocus && newState.highlightedValue != null) {
    return _extends({}, newState, {
      selectedValues: [newState.highlightedValue]
    });
  }
  return newState;
}

// node_modules/@mui/base/useTabsList/useTabsList.js
function useTabsList(parameters) {
  var _selectedValues$;
  const {
    rootRef: externalRef
  } = parameters;
  const {
    direction = "ltr",
    onSelected,
    orientation = "horizontal",
    value,
    registerTabIdLookup,
    selectionFollowsFocus
  } = useTabsContext();
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const tabIdLookup = React66.useCallback((tabValue) => {
    var _subitems$get;
    return (_subitems$get = subitems.get(tabValue)) == null ? void 0 : _subitems$get.id;
  }, [subitems]);
  registerTabIdLookup(tabIdLookup);
  const subitemKeys = React66.useMemo(() => Array.from(subitems.keys()), [subitems]);
  const getTabElement = React66.useCallback((tabValue) => {
    var _subitems$get$ref$cur, _subitems$get2;
    if (tabValue == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get2 = subitems.get(tabValue)) == null ? void 0 : _subitems$get2.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  const isRtl = direction === "rtl";
  let listOrientation;
  if (orientation === "vertical") {
    listOrientation = "vertical";
  } else {
    listOrientation = isRtl ? "horizontal-rtl" : "horizontal-ltr";
  }
  const handleChange = React66.useCallback((event, newValue) => {
    var _newValue$;
    onSelected(event, (_newValue$ = newValue[0]) != null ? _newValue$ : null);
  }, [onSelected]);
  const controlledProps = React66.useMemo(() => {
    if (value === void 0) {
      return {};
    }
    return value != null ? {
      selectedValues: [value]
    } : {
      selectedValues: []
    };
  }, [value]);
  const isItemDisabled = React66.useCallback((item) => {
    var _subitems$get$disable, _subitems$get3;
    return (_subitems$get$disable = (_subitems$get3 = subitems.get(item)) == null ? void 0 : _subitems$get3.disabled) != null ? _subitems$get$disable : false;
  }, [subitems]);
  const {
    contextValue: listContextValue,
    dispatch,
    getRootProps: getListboxRootProps,
    state: {
      highlightedValue,
      selectedValues
    },
    rootRef: mergedRootRef
  } = useList({
    controlledProps,
    disabledItemsFocusable: !selectionFollowsFocus,
    focusManagement: "DOM",
    getItemDomElement: getTabElement,
    isItemDisabled,
    items: subitemKeys,
    rootRef: externalRef,
    onChange: handleChange,
    orientation: listOrientation,
    reducerActionContext: React66.useMemo(() => ({
      selectionFollowsFocus: selectionFollowsFocus || false
    }), [selectionFollowsFocus]),
    selectionMode: "single",
    stateReducer: tabsListReducer
  });
  React66.useEffect(() => {
    if (value === void 0) {
      return;
    }
    if (value != null) {
      dispatch({
        type: TabsListActionTypes.valueChange,
        value
      });
    }
  }, [dispatch, value]);
  const getRootProps = (externalProps = {}) => {
    return _extends({}, externalProps, getListboxRootProps(externalProps), {
      "aria-orientation": orientation === "vertical" ? "vertical" : void 0,
      role: "tablist"
    });
  };
  const contextValue = React66.useMemo(() => _extends({}, compoundComponentContextValue, listContextValue), [compoundComponentContextValue, listContextValue]);
  return {
    contextValue,
    dispatch,
    getRootProps,
    highlightedValue,
    isRtl,
    orientation,
    rootRef: mergedRootRef,
    selectedValue: (_selectedValues$ = selectedValues[0]) != null ? _selectedValues$ : null
  };
}

// node_modules/@mui/base/useTabsList/TabsListProvider.js
var React67 = __toESM(require_react());
var import_jsx_runtime42 = __toESM(require_jsx_runtime());
function TabsListProvider(props) {
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React67.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex
  }), [dispatch, getItemIndex, getItemState]);
  const compoundComponentContextValue = React67.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return (0, import_jsx_runtime42.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime42.jsx)(ListContext.Provider, {
      value: listContextValue,
      children
    })
  });
}

// node_modules/@mui/base/TabsList/TabsList.js
var import_jsx_runtime43 = __toESM(require_jsx_runtime());
var _excluded24 = ["children", "slotProps", "slots"];
var useUtilityClasses21 = (ownerState) => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ["root", orientation]
  };
  return composeClasses(slots, useClassNamesOverride(getTabsListUtilityClass));
};
var TabsList = React68.forwardRef(function TabsList2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded24);
  const {
    isRtl,
    orientation,
    getRootProps,
    contextValue
  } = useTabsList({
    rootRef: forwardedRef
  });
  const ownerState = _extends({}, props, {
    isRtl,
    orientation
  });
  const classes = useUtilityClasses21(ownerState);
  const TabsListRoot = (_slots$root = slots.root) != null ? _slots$root : "div";
  const tabsListRootProps = useSlotProps({
    elementType: TabsListRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime43.jsx)(TabsListProvider, {
    value: contextValue,
    children: (0, import_jsx_runtime43.jsx)(TabsListRoot, _extends({}, tabsListRootProps, {
      children
    }))
  });
});
true ? TabsList.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types26.default.node,
  /**
   * @ignore
   */
  className: import_prop_types26.default.string,
  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  slotProps: import_prop_types26.default.shape({
    root: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object])
  }),
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types26.default.shape({
    root: import_prop_types26.default.elementType
  })
} : void 0;

// node_modules/@mui/base/Tab/Tab.js
init_extends();
init_objectWithoutPropertiesLoose();
var React70 = __toESM(require_react());
var import_prop_types27 = __toESM(require_prop_types());
init_esm();

// node_modules/@mui/base/Tab/tabClasses.js
var COMPONENT_NAME22 = "Tab";
function getTabUtilityClass(slot) {
  return generateUtilityClass2(COMPONENT_NAME22, slot);
}
var tabClasses = generateUtilityClasses2(COMPONENT_NAME22, ["root", "selected", "disabled"]);

// node_modules/@mui/base/useTab/useTab.js
init_extends();
var React69 = __toESM(require_react());
init_esm();
function tabValueGenerator(otherTabValues) {
  return otherTabValues.size;
}
function useTab(parameters) {
  const {
    value: valueParam,
    rootRef: externalRef,
    disabled = false,
    id: idParam
  } = parameters;
  const tabRef = React69.useRef(null);
  const id = useId(idParam);
  const {
    value: selectedValue,
    selectionFollowsFocus,
    getTabPanelId
  } = useTabsContext();
  const tabMetadata = React69.useMemo(() => ({
    disabled,
    ref: tabRef,
    id
  }), [disabled, tabRef, id]);
  const {
    id: value,
    index: index2,
    totalItemCount: totalTabsCount
  } = useCompoundItem(valueParam != null ? valueParam : tabValueGenerator, tabMetadata);
  const {
    getRootProps: getTabProps,
    highlighted,
    selected
  } = useListItem({
    item: value
  });
  const {
    getRootProps: getButtonProps,
    rootRef: buttonRefHandler,
    active,
    focusVisible,
    setFocusVisible
  } = useButton({
    disabled,
    focusableWhenDisabled: !selectionFollowsFocus,
    type: "button"
  });
  const handleRef = useForkRef(tabRef, externalRef, buttonRefHandler);
  const tabPanelId = value !== void 0 ? getTabPanelId(value) : void 0;
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedRootProps = combineHooksSlotProps(getTabProps, getButtonProps);
    return _extends({}, externalProps, getCombinedRootProps(externalEventHandlers), {
      role: "tab",
      "aria-controls": tabPanelId,
      "aria-selected": selected,
      id,
      ref: handleRef
    });
  };
  return {
    getRootProps,
    active,
    focusVisible,
    highlighted,
    index: index2,
    rootRef: handleRef,
    // the `selected` state isn't set on the server (it relies on effects to be calculated),
    // so we fall back to checking the `value` prop with the selectedValue from the TabsContext
    selected: selected || value === selectedValue,
    setFocusVisible,
    totalTabsCount
  };
}

// node_modules/@mui/base/Tab/Tab.js
var import_jsx_runtime44 = __toESM(require_jsx_runtime());
var _excluded25 = ["action", "children", "disabled", "onChange", "onClick", "onFocus", "slotProps", "slots", "value"];
var useUtilityClasses22 = (ownerState) => {
  const {
    selected,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", selected && "selected", disabled && "disabled"]
  };
  return composeClasses(slots, useClassNamesOverride(getTabUtilityClass));
};
var Tab = React70.forwardRef(function Tab2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    disabled = false,
    slotProps = {},
    slots = {},
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded25);
  const tabRef = React70.useRef();
  const handleRef = useForkRef(tabRef, forwardedRef);
  const {
    active,
    highlighted,
    selected,
    getRootProps
  } = useTab(_extends({}, props, {
    rootRef: handleRef,
    value
  }));
  const ownerState = _extends({}, props, {
    active,
    disabled,
    highlighted,
    selected
  });
  const classes = useUtilityClasses22(ownerState);
  const TabRoot = (_slots$root = slots.root) != null ? _slots$root : "button";
  const tabRootProps = useSlotProps({
    elementType: TabRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime44.jsx)(TabRoot, _extends({}, tabRootProps, {
    children
  }));
});
true ? Tab.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: import_prop_types27.default.oneOfType([import_prop_types27.default.func, import_prop_types27.default.shape({
    current: import_prop_types27.default.shape({
      focusVisible: import_prop_types27.default.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  children: import_prop_types27.default.node,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types27.default.bool,
  /**
   * Callback invoked when new value is being set.
   */
  onChange: import_prop_types27.default.func,
  /**
   * The props used for each slot inside the Tab.
   * @default {}
   */
  slotProps: import_prop_types27.default.shape({
    root: import_prop_types27.default.oneOfType([import_prop_types27.default.func, import_prop_types27.default.object])
  }),
  /**
   * The components used for each slot inside the Tab.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types27.default.shape({
    root: import_prop_types27.default.elementType
  }),
  /**
   * You can provide your own value. Otherwise, it falls back to the child position index.
   */
  value: import_prop_types27.default.oneOfType([import_prop_types27.default.number, import_prop_types27.default.string])
} : void 0;

// node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js
init_extends();
init_objectWithoutPropertiesLoose();
var React71 = __toESM(require_react());
var import_prop_types28 = __toESM(require_prop_types());
init_esm();
var import_jsx_runtime45 = __toESM(require_jsx_runtime());
var import_jsx_runtime46 = __toESM(require_jsx_runtime());
var _excluded26 = ["onChange", "maxRows", "minRows", "style", "value"];
function getStyleValue(value) {
  return parseInt(value, 10) || 0;
}
var styles = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: "hidden",
    // Remove from the content flow
    position: "absolute",
    // Ignore the scrollbar width
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: "translateZ(0)"
  }
};
function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0 || obj.outerHeightStyle === 0 && !obj.overflowing;
}
var TextareaAutosize = React71.forwardRef(function TextareaAutosize2(props, forwardedRef) {
  const {
    onChange,
    maxRows,
    minRows = 1,
    style,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded26);
  const {
    current: isControlled
  } = React71.useRef(value != null);
  const inputRef = React71.useRef(null);
  const handleRef = useForkRef(forwardedRef, inputRef);
  const shadowRef = React71.useRef(null);
  const calculateTextareaStyles = React71.useCallback(() => {
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    const computedStyle = containerWindow.getComputedStyle(input);
    if (computedStyle.width === "0px") {
      return {
        outerHeightStyle: 0,
        overflowing: false
      };
    }
    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || "x";
    if (inputShallow.value.slice(-1) === "\n") {
      inputShallow.value += " ";
    }
    const boxSizing = computedStyle.boxSizing;
    const padding = getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
    const border = getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);
    const innerHeight = inputShallow.scrollHeight;
    inputShallow.value = "x";
    const singleRowHeight = inputShallow.scrollHeight;
    let outerHeight = innerHeight;
    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    const outerHeightStyle = outerHeight + (boxSizing === "border-box" ? padding + border : 0);
    const overflowing = Math.abs(outerHeight - innerHeight) <= 1;
    return {
      outerHeightStyle,
      overflowing
    };
  }, [maxRows, minRows, props.placeholder]);
  const syncHeight = React71.useCallback(() => {
    const textareaStyles = calculateTextareaStyles();
    if (isEmpty(textareaStyles)) {
      return;
    }
    const input = inputRef.current;
    input.style.height = `${textareaStyles.outerHeightStyle}px`;
    input.style.overflow = textareaStyles.overflowing ? "hidden" : "";
  }, [calculateTextareaStyles]);
  useEnhancedEffect_default(() => {
    const handleResize = () => {
      syncHeight();
    };
    let rAF;
    const rAFHandleResize = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        handleResize();
      });
    };
    const debounceHandleResize = debounce(handleResize);
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    containerWindow.addEventListener("resize", debounceHandleResize);
    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(false ? rAFHandleResize : handleResize);
      resizeObserver.observe(input);
    }
    return () => {
      debounceHandleResize.clear();
      cancelAnimationFrame(rAF);
      containerWindow.removeEventListener("resize", debounceHandleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [calculateTextareaStyles, syncHeight]);
  useEnhancedEffect_default(() => {
    syncHeight();
  });
  const handleChange = (event) => {
    if (!isControlled) {
      syncHeight();
    }
    if (onChange) {
      onChange(event);
    }
  };
  return (0, import_jsx_runtime46.jsxs)(React71.Fragment, {
    children: [(0, import_jsx_runtime45.jsx)("textarea", _extends({
      value,
      onChange: handleChange,
      ref: handleRef,
      rows: minRows,
      style
    }, other)), (0, import_jsx_runtime45.jsx)("textarea", {
      "aria-hidden": true,
      className: props.className,
      readOnly: true,
      ref: shadowRef,
      tabIndex: -1,
      style: _extends({}, styles.shadow, style, {
        paddingTop: 0,
        paddingBottom: 0
      })
    })]
  });
});
true ? TextareaAutosize.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: import_prop_types28.default.string,
  /**
   * Maximum number of rows to display.
   */
  maxRows: import_prop_types28.default.oneOfType([import_prop_types28.default.number, import_prop_types28.default.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: import_prop_types28.default.oneOfType([import_prop_types28.default.number, import_prop_types28.default.string]),
  /**
   * @ignore
   */
  onChange: import_prop_types28.default.func,
  /**
   * @ignore
   */
  placeholder: import_prop_types28.default.string,
  /**
   * @ignore
   */
  style: import_prop_types28.default.object,
  /**
   * @ignore
   */
  value: import_prop_types28.default.oneOfType([import_prop_types28.default.arrayOf(import_prop_types28.default.string), import_prop_types28.default.number, import_prop_types28.default.string])
} : void 0;

// node_modules/@mui/base/Transitions/CssAnimation.js
init_extends();
init_objectWithoutPropertiesLoose();
var React72 = __toESM(require_react());
var import_prop_types29 = __toESM(require_prop_types());
init_clsx();
var import_jsx_runtime47 = __toESM(require_jsx_runtime());
var _excluded27 = ["children", "className", "enterAnimationName", "enterClassName", "exitAnimationName", "exitClassName"];
function CssAnimation(props) {
  const {
    children,
    className,
    enterAnimationName,
    enterClassName,
    exitAnimationName,
    exitClassName
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded27);
  const {
    requestedEnter,
    onExited
  } = useTransitionStateManager();
  const hasExited = React72.useRef(true);
  React72.useEffect(() => {
    if (requestedEnter && hasExited.current) {
      hasExited.current = false;
    }
  }, [requestedEnter]);
  const handleAnimationEnd = React72.useCallback((event) => {
    if (event.animationName === exitAnimationName) {
      onExited();
      hasExited.current = true;
    } else if (event.animationName === enterAnimationName) {
      hasExited.current = false;
    }
  }, [onExited, exitAnimationName, enterAnimationName]);
  return (0, import_jsx_runtime47.jsx)("div", _extends({
    onAnimationEnd: handleAnimationEnd,
    className: clsx_default(className, requestedEnter ? enterClassName : exitClassName)
  }, other, {
    children
  }));
}
true ? CssAnimation.propTypes = {
  children: import_prop_types29.default.node,
  className: import_prop_types29.default.string,
  enterAnimationName: import_prop_types29.default.string,
  enterClassName: import_prop_types29.default.string,
  exitAnimationName: import_prop_types29.default.string,
  exitClassName: import_prop_types29.default.string
} : void 0;

// node_modules/@mui/base/Transitions/CssTransition.js
init_extends();
init_objectWithoutPropertiesLoose();
var React73 = __toESM(require_react());
var import_prop_types30 = __toESM(require_prop_types());
init_clsx();
var import_jsx_runtime48 = __toESM(require_jsx_runtime());
var _excluded28 = ["children", "className", "lastTransitionedPropertyOnExit", "enterClassName", "exitClassName"];
var CssTransition = React73.forwardRef(function CssTransition2(props, forwardedRef) {
  const {
    children,
    className,
    lastTransitionedPropertyOnExit,
    enterClassName,
    exitClassName
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded28);
  const {
    requestedEnter,
    onExited
  } = useTransitionStateManager();
  const [isEntering, setIsEntering] = React73.useState(false);
  React73.useEffect(() => {
    if (requestedEnter) {
      requestAnimationFrame(() => {
        setIsEntering(true);
      });
    } else {
      setIsEntering(false);
    }
  }, [requestedEnter]);
  const handleTransitionEnd = React73.useCallback((event) => {
    if (!requestedEnter && (lastTransitionedPropertyOnExit == null || event.propertyName === lastTransitionedPropertyOnExit)) {
      onExited();
    }
  }, [onExited, requestedEnter, lastTransitionedPropertyOnExit]);
  return (0, import_jsx_runtime48.jsx)("div", _extends({
    onTransitionEnd: handleTransitionEnd,
    className: clsx_default(className, isEntering ? enterClassName : exitClassName)
  }, other, {
    ref: forwardedRef,
    children
  }));
});
true ? CssTransition.propTypes = {
  children: import_prop_types30.default.node,
  className: import_prop_types30.default.string,
  enterClassName: import_prop_types30.default.string,
  exitClassName: import_prop_types30.default.string,
  lastTransitionedPropertyOnEnter: import_prop_types30.default.string,
  lastTransitionedPropertyOnExit: import_prop_types30.default.string
} : void 0;

// node_modules/@mui/base/useAutocomplete/useAutocomplete.js
init_extends();
var React74 = __toESM(require_react());
init_esm();
function stripDiacritics(string) {
  return typeof string.normalize !== "undefined" ? string.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : string;
}
function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = "any",
    stringify,
    trim = false
  } = config;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }
    const filteredOptions = !input ? options : options.filter((option) => {
      let candidate = (stringify || getOptionLabel)(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === "start" ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === "number" ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }
  return -1;
}
var defaultFilterOptions = createFilterOptions();
var pageSize = 5;
var defaultIsActiveElementInListbox = (listboxRef) => {
  var _listboxRef$current$p;
  return listboxRef.current !== null && ((_listboxRef$current$p = listboxRef.current.parentElement) == null ? void 0 : _listboxRef$current$p.contains(document.activeElement));
};
function useAutocomplete(props) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_isActiveElementInListbox = defaultIsActiveElementInListbox,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_classNamePrefix = "Mui",
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = "useAutocomplete",
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled: disabledProp,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionKey,
    getOptionLabel: getOptionLabelProp = (option) => {
      var _option$label;
      return (_option$label = option.label) != null ? _option$label : option;
    },
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    isOptionEqualToValue = (option, value2) => option === value2,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    readOnly = false,
    selectOnFocus = !props.freeSolo,
    value: valueProp
  } = props;
  const id = useId(idProp);
  let getOptionLabel = getOptionLabelProp;
  getOptionLabel = (option) => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== "string") {
      if (true) {
        const erroneousReturn = optionLabel === void 0 ? "undefined" : `${typeof optionLabel} (${optionLabel})`;
        console.error(`MUI: The \`getOptionLabel\` method of ${componentName} returned ${erroneousReturn} instead of a string for ${JSON.stringify(option)}.`);
      }
      return String(optionLabel);
    }
    return optionLabel;
  };
  const ignoreFocus = React74.useRef(false);
  const firstFocus = React74.useRef(true);
  const inputRef = React74.useRef(null);
  const listboxRef = React74.useRef(null);
  const [anchorEl, setAnchorEl] = React74.useState(null);
  const [focusedTag, setFocusedTag] = React74.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = React74.useRef(defaultHighlighted);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: "",
    name: componentName,
    state: "inputValue"
  });
  const [focused, setFocused] = React74.useState(false);
  const resetInputValue = React74.useCallback((event, newValue) => {
    const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
    if (!isOptionSelected && !clearOnBlur) {
      return;
    }
    let newInputValue;
    if (multiple) {
      newInputValue = "";
    } else if (newValue == null) {
      newInputValue = "";
    } else {
      const optionLabel = getOptionLabel(newValue);
      newInputValue = typeof optionLabel === "string" ? optionLabel : "";
    }
    if (inputValue === newInputValue) {
      return;
    }
    setInputValueState(newInputValue);
    if (onInputChange) {
      onInputChange(event, newInputValue, "reset");
    }
  }, [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, clearOnBlur, value]);
  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: "open"
  });
  const [inputPristine, setInputPristine] = React74.useState(true);
  const inputValueIsSelectedValue = !multiple && value != null && inputValue === getOptionLabel(value);
  const popupOpen = open && !readOnly;
  const filteredOptions = popupOpen ? filterOptions(
    options.filter((option) => {
      if (filterSelectedOptions && (multiple ? value : [value]).some((value2) => value2 !== null && isOptionEqualToValue(option, value2))) {
        return false;
      }
      return true;
    }),
    // we use the empty string to manipulate `filterOptions` to not filter any options
    // i.e. the filter predicate always returns true
    {
      inputValue: inputValueIsSelectedValue && inputPristine ? "" : inputValue,
      getOptionLabel
    }
  ) : [];
  const previousProps = usePreviousProps_default({
    filteredOptions,
    value,
    inputValue
  });
  React74.useEffect(() => {
    const valueChange = value !== previousProps.value;
    if (focused && !valueChange) {
      return;
    }
    if (freeSolo && !valueChange) {
      return;
    }
    resetInputValue(null, value);
  }, [value, resetInputValue, focused, previousProps.value, freeSolo]);
  const listboxAvailable = open && filteredOptions.length > 0 && !readOnly;
  if (true) {
    if (value !== null && !freeSolo && options.length > 0) {
      const missingValue = (multiple ? value : [value]).filter((value2) => !options.some((option) => isOptionEqualToValue(option, value2)));
      if (missingValue.length > 0) {
        console.warn([`MUI: The value provided to ${componentName} is invalid.`, `None of the options match with \`${missingValue.length > 1 ? JSON.stringify(missingValue) : JSON.stringify(missingValue[0])}\`.`, "You can use the `isOptionEqualToValue` prop to customize the equality test."].join("\n"));
      }
    }
  }
  const focusTag = useEventCallback_default((tagToFocus) => {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-tag-index="${tagToFocus}"]`).focus();
    }
  });
  React74.useEffect(() => {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);
  function validOptionIndex(index2, direction) {
    if (!listboxRef.current || index2 < 0 || index2 >= filteredOptions.length) {
      return -1;
    }
    let nextFocus = index2;
    while (true) {
      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);
      const nextFocusDisabled = disabledItemsFocusable ? false : !option || option.disabled || option.getAttribute("aria-disabled") === "true";
      if (option && option.hasAttribute("tabindex") && !nextFocusDisabled) {
        return nextFocus;
      }
      if (direction === "next") {
        nextFocus = (nextFocus + 1) % filteredOptions.length;
      } else {
        nextFocus = (nextFocus - 1 + filteredOptions.length) % filteredOptions.length;
      }
      if (nextFocus === index2) {
        return -1;
      }
    }
  }
  const setHighlightedIndex = useEventCallback_default(({
    event,
    index: index2,
    reason = "auto"
  }) => {
    highlightedIndexRef.current = index2;
    if (index2 === -1) {
      inputRef.current.removeAttribute("aria-activedescendant");
    } else {
      inputRef.current.setAttribute("aria-activedescendant", `${id}-option-${index2}`);
    }
    if (onHighlightChange) {
      onHighlightChange(event, index2 === -1 ? null : filteredOptions[index2], reason);
    }
    if (!listboxRef.current) {
      return;
    }
    const prev = listboxRef.current.querySelector(`[role="option"].${unstable_classNamePrefix}-focused`);
    if (prev) {
      prev.classList.remove(`${unstable_classNamePrefix}-focused`);
      prev.classList.remove(`${unstable_classNamePrefix}-focusVisible`);
    }
    let listboxNode = listboxRef.current;
    if (listboxRef.current.getAttribute("role") !== "listbox") {
      listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');
    }
    if (!listboxNode) {
      return;
    }
    if (index2 === -1) {
      listboxNode.scrollTop = 0;
      return;
    }
    const option = listboxRef.current.querySelector(`[data-option-index="${index2}"]`);
    if (!option) {
      return;
    }
    option.classList.add(`${unstable_classNamePrefix}-focused`);
    if (reason === "keyboard") {
      option.classList.add(`${unstable_classNamePrefix}-focusVisible`);
    }
    if (listboxNode.scrollHeight > listboxNode.clientHeight && reason !== "mouse" && reason !== "touch") {
      const element = option;
      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  });
  const changeHighlightedIndex = useEventCallback_default(({
    event,
    diff,
    direction = "next",
    reason = "auto"
  }) => {
    if (!popupOpen) {
      return;
    }
    const getNextIndex = () => {
      const maxIndex = filteredOptions.length - 1;
      if (diff === "reset") {
        return defaultHighlighted;
      }
      if (diff === "start") {
        return 0;
      }
      if (diff === "end") {
        return maxIndex;
      }
      const newIndex = highlightedIndexRef.current + diff;
      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }
        return maxIndex;
      }
      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }
        return 0;
      }
      return newIndex;
    };
    const nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex({
      index: nextIndex,
      reason,
      event
    });
    if (autoComplete && diff !== "reset") {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        const option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option;
        const index2 = option.toLowerCase().indexOf(inputValue.toLowerCase());
        if (index2 === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  const getPreviousHighlightedOptionIndex = () => {
    const isSameValue = (value1, value2) => {
      const label1 = value1 ? getOptionLabel(value1) : "";
      const label2 = value2 ? getOptionLabel(value2) : "";
      return label1 === label2;
    };
    if (highlightedIndexRef.current !== -1 && previousProps.filteredOptions && previousProps.filteredOptions.length !== filteredOptions.length && previousProps.inputValue === inputValue && (multiple ? value.length === previousProps.value.length && previousProps.value.every((val, i) => getOptionLabel(value[i]) === getOptionLabel(val)) : isSameValue(previousProps.value, value))) {
      const previousHighlightedOption = previousProps.filteredOptions[highlightedIndexRef.current];
      if (previousHighlightedOption) {
        return findIndex(filteredOptions, (option) => {
          return getOptionLabel(option) === getOptionLabel(previousHighlightedOption);
        });
      }
    }
    return -1;
  };
  const syncHighlightedIndex = React74.useCallback(() => {
    if (!popupOpen) {
      return;
    }
    const previousHighlightedOptionIndex = getPreviousHighlightedOptionIndex();
    if (previousHighlightedOptionIndex !== -1) {
      highlightedIndexRef.current = previousHighlightedOptionIndex;
      return;
    }
    const valueItem = multiple ? value[0] : value;
    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex({
        diff: "reset"
      });
      return;
    }
    if (!listboxRef.current) {
      return;
    }
    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current];
      if (multiple && currentOption && findIndex(value, (val) => isOptionEqualToValue(currentOption, val)) !== -1) {
        return;
      }
      const itemIndex = findIndex(filteredOptions, (optionItem) => isOptionEqualToValue(optionItem, valueItem));
      if (itemIndex === -1) {
        changeHighlightedIndex({
          diff: "reset"
        });
      } else {
        setHighlightedIndex({
          index: itemIndex
        });
      }
      return;
    }
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({
        index: filteredOptions.length - 1
      });
      return;
    }
    setHighlightedIndex({
      index: highlightedIndexRef.current
    });
  }, [
    // Only sync the highlighted index when the option switch between empty and not
    filteredOptions.length,
    // Don't sync the highlighted index with the value when multiple
    // eslint-disable-next-line react-hooks/exhaustive-deps
    multiple ? false : value,
    filterSelectedOptions,
    changeHighlightedIndex,
    setHighlightedIndex,
    popupOpen,
    inputValue,
    multiple
  ]);
  const handleListboxRef = useEventCallback_default((node) => {
    setRef(listboxRef, node);
    if (!node) {
      return;
    }
    syncHighlightedIndex();
  });
  if (true) {
    React74.useEffect(() => {
      if (!inputRef.current || inputRef.current.nodeName !== "INPUT") {
        if (inputRef.current && inputRef.current.nodeName === "TEXTAREA") {
          console.warn([`A textarea element was provided to ${componentName} where input was expected.`, `This is not a supported scenario but it may work under certain conditions.`, `A textarea keyboard navigation may conflict with Autocomplete controls (for example enter and arrow keys).`, `Make sure to test keyboard navigation and add custom event handlers if necessary.`].join("\n"));
        } else {
          console.error([`MUI: Unable to find the input element. It was resolved to ${inputRef.current} while an HTMLInputElement was expected.`, `Instead, ${componentName} expects an input element.`, "", componentName === "useAutocomplete" ? "Make sure you have bound getInputProps correctly and that the normal ref/effect resolutions order is guaranteed." : "Make sure you have customized the input component correctly."].join("\n"));
        }
      }
    }, [componentName]);
  }
  React74.useEffect(() => {
    syncHighlightedIndex();
  }, [syncHighlightedIndex]);
  const handleOpen = (event) => {
    if (open) {
      return;
    }
    setOpenState(true);
    setInputPristine(true);
    if (onOpen) {
      onOpen(event);
    }
  };
  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }
    setOpenState(false);
    if (onClose) {
      onClose(event, reason);
    }
  };
  const handleValue = (event, newValue, reason, details) => {
    if (multiple) {
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
        return;
      }
    } else if (value === newValue) {
      return;
    }
    if (onChange) {
      onChange(event, newValue, reason, details);
    }
    setValueState(newValue);
  };
  const isTouch = React74.useRef(false);
  const selectNewValue = (event, option, reasonProp = "selectOption", origin = "options") => {
    let reason = reasonProp;
    let newValue = option;
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      if (true) {
        const matches = newValue.filter((val) => isOptionEqualToValue(option, val));
        if (matches.length > 1) {
          console.error([`MUI: The \`isOptionEqualToValue\` method of ${componentName} does not handle the arguments correctly.`, `The component expects a single value to match a given option but found ${matches.length} matches.`].join("\n"));
        }
      }
      const itemIndex = findIndex(newValue, (valueItem) => isOptionEqualToValue(option, valueItem));
      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== "freeSolo") {
        newValue.splice(itemIndex, 1);
        reason = "removeOption";
      }
    }
    resetInputValue(event, newValue);
    handleValue(event, newValue, reason, {
      option
    });
    if (!disableCloseOnSelect && (!event || !event.ctrlKey && !event.metaKey)) {
      handleClose(event, reason);
    }
    if (blurOnSelect === true || blurOnSelect === "touch" && isTouch.current || blurOnSelect === "mouse" && !isTouch.current) {
      inputRef.current.blur();
    }
  };
  function validTagIndex(index2, direction) {
    if (index2 === -1) {
      return -1;
    }
    let nextFocus = index2;
    while (true) {
      if (direction === "next" && nextFocus === value.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = anchorEl.querySelector(`[data-tag-index="${nextFocus}"]`);
      if (!option || !option.hasAttribute("tabindex") || option.disabled || option.getAttribute("aria-disabled") === "true") {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const handleFocusTag = (event, direction) => {
    if (!multiple) {
      return;
    }
    if (inputValue === "") {
      handleClose(event, "toggleInput");
    }
    let nextTag = focusedTag;
    if (focusedTag === -1) {
      if (inputValue === "" && direction === "previous") {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === "next" ? 1 : -1;
      if (nextTag < 0) {
        nextTag = 0;
      }
      if (nextTag === value.length) {
        nextTag = -1;
      }
    }
    nextTag = validTagIndex(nextTag, direction);
    setFocusedTag(nextTag);
    focusTag(nextTag);
  };
  const handleClear = (event) => {
    ignoreFocus.current = true;
    setInputValueState("");
    if (onInputChange) {
      onInputChange(event, "", "clear");
    }
    handleValue(event, multiple ? [] : null, "clear");
  };
  const handleKeyDown2 = (other) => (event) => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }
    if (event.defaultMuiPrevented) {
      return;
    }
    if (focusedTag !== -1 && ["ArrowLeft", "ArrowRight"].indexOf(event.key) === -1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
    if (event.which !== 229) {
      switch (event.key) {
        case "Home":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "start",
              direction: "next",
              reason: "keyboard",
              event
            });
          }
          break;
        case "End":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "end",
              direction: "previous",
              reason: "keyboard",
              event
            });
          }
          break;
        case "PageUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "PageDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: pageSize,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: 1,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -1,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowLeft":
          handleFocusTag(event, "previous");
          break;
        case "ArrowRight":
          handleFocusTag(event, "next");
          break;
        case "Enter":
          if (highlightedIndexRef.current !== -1 && popupOpen) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
            event.preventDefault();
            if (disabled) {
              return;
            }
            selectNewValue(event, option, "selectOption");
            if (autoComplete) {
              inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
          } else if (freeSolo && inputValue !== "" && inputValueIsSelectedValue === false) {
            if (multiple) {
              event.preventDefault();
            }
            selectNewValue(event, inputValue, "createOption", "freeSolo");
          }
          break;
        case "Escape":
          if (popupOpen) {
            event.preventDefault();
            event.stopPropagation();
            handleClose(event, "escape");
          } else if (clearOnEscape && (inputValue !== "" || multiple && value.length > 0)) {
            event.preventDefault();
            event.stopPropagation();
            handleClear(event);
          }
          break;
        case "Backspace":
          if (multiple && !readOnly && inputValue === "" && value.length > 0) {
            const index2 = focusedTag === -1 ? value.length - 1 : focusedTag;
            const newValue = value.slice();
            newValue.splice(index2, 1);
            handleValue(event, newValue, "removeOption", {
              option: value[index2]
            });
          }
          break;
        case "Delete":
          if (multiple && !readOnly && inputValue === "" && value.length > 0 && focusedTag !== -1) {
            const index2 = focusedTag;
            const newValue = value.slice();
            newValue.splice(index2, 1);
            handleValue(event, newValue, "removeOption", {
              option: value[index2]
            });
          }
          break;
        default:
      }
    }
  };
  const handleFocus = (event) => {
    setFocused(true);
    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };
  const handleBlur2 = (event) => {
    if (unstable_isActiveElementInListbox(listboxRef)) {
      inputRef.current.focus();
      return;
    }
    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;
    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], "blur");
    } else if (autoSelect && freeSolo && inputValue !== "") {
      selectNewValue(event, inputValue, "blur", "freeSolo");
    } else if (clearOnBlur) {
      resetInputValue(event, value);
    }
    handleClose(event, "blur");
  };
  const handleInputChange2 = (event) => {
    const newValue = event.target.value;
    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);
      if (onInputChange) {
        onInputChange(event, newValue, "input");
      }
    }
    if (newValue === "") {
      if (!disableClearable && !multiple) {
        handleValue(event, null, "clear");
      }
    } else {
      handleOpen(event);
    }
  };
  const handleOptionMouseMove = (event) => {
    const index2 = Number(event.currentTarget.getAttribute("data-option-index"));
    if (highlightedIndexRef.current !== index2) {
      setHighlightedIndex({
        event,
        index: index2,
        reason: "mouse"
      });
    }
  };
  const handleOptionTouchStart = (event) => {
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute("data-option-index")),
      reason: "touch"
    });
    isTouch.current = true;
  };
  const handleOptionClick = (event) => {
    const index2 = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(event, filteredOptions[index2], "selectOption");
    isTouch.current = false;
  };
  const handleTagDelete = (index2) => (event) => {
    const newValue = value.slice();
    newValue.splice(index2, 1);
    handleValue(event, newValue, "removeOption", {
      option: value[index2]
    });
  };
  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event, "toggleInput");
    } else {
      handleOpen(event);
    }
  };
  const handleMouseDown = (event) => {
    if (!event.currentTarget.contains(event.target)) {
      return;
    }
    if (event.target.getAttribute("id") !== id) {
      event.preventDefault();
    }
  };
  const handleClick = (event) => {
    if (!event.currentTarget.contains(event.target)) {
      return;
    }
    inputRef.current.focus();
    if (selectOnFocus && firstFocus.current && inputRef.current.selectionEnd - inputRef.current.selectionStart === 0) {
      inputRef.current.select();
    }
    firstFocus.current = false;
  };
  const handleInputMouseDown = (event) => {
    if (!disabledProp && (inputValue === "" || !open)) {
      handlePopupIndicator(event);
    }
  };
  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);
  let groupedOptions = filteredOptions;
  if (groupBy) {
    const indexBy = /* @__PURE__ */ new Map();
    let warn = false;
    groupedOptions = filteredOptions.reduce((acc, option, index2) => {
      const group = groupBy(option);
      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        if (true) {
          if (indexBy.get(group) && !warn) {
            console.warn(`MUI: The options provided combined with the \`groupBy\` method of ${componentName} returns duplicated headers.`, "You can solve the issue by sorting the options with the output of `groupBy`.");
            warn = true;
          }
          indexBy.set(group, true);
        }
        acc.push({
          key: index2,
          index: index2,
          group,
          options: [option]
        });
      }
      return acc;
    }, []);
  }
  if (disabledProp && focused) {
    handleBlur2();
  }
  return {
    getRootProps: (other = {}) => _extends({
      "aria-owns": listboxAvailable ? `${id}-listbox` : null
    }, other, {
      onKeyDown: handleKeyDown2(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onBlur: handleBlur2,
      onFocus: handleFocus,
      onChange: handleInputChange2,
      onMouseDown: handleInputMouseDown,
      // if open then this is handled imperatively so don't let react override
      // only have an opinion about this when closed
      "aria-activedescendant": popupOpen ? "" : null,
      "aria-autocomplete": autoComplete ? "both" : "list",
      "aria-controls": listboxAvailable ? `${id}-listbox` : void 0,
      "aria-expanded": listboxAvailable,
      // Disable browser's suggestion that might overlap with the popup.
      // Handle autocomplete but not autofill.
      autoComplete: "off",
      ref: inputRef,
      autoCapitalize: "none",
      spellCheck: "false",
      role: "combobox",
      disabled: disabledProp
    }),
    getClearProps: () => ({
      tabIndex: -1,
      type: "button",
      onClick: handleClear
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      type: "button",
      onClick: handlePopupIndicator
    }),
    getTagProps: ({
      index: index2
    }) => _extends({
      key: index2,
      "data-tag-index": index2,
      tabIndex: -1
    }, !readOnly && {
      onDelete: handleTagDelete(index2)
    }),
    getListboxProps: () => ({
      role: "listbox",
      id: `${id}-listbox`,
      "aria-labelledby": `${id}-label`,
      ref: handleListboxRef,
      onMouseDown: (event) => {
        event.preventDefault();
      }
    }),
    getOptionProps: ({
      index: index2,
      option
    }) => {
      var _getOptionKey;
      const selected = (multiple ? value : [value]).some((value2) => value2 != null && isOptionEqualToValue(option, value2));
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
      return {
        key: (_getOptionKey = getOptionKey == null ? void 0 : getOptionKey(option)) != null ? _getOptionKey : getOptionLabel(option),
        tabIndex: -1,
        role: "option",
        id: `${id}-option-${index2}`,
        onMouseMove: handleOptionMouseMove,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        "data-option-index": index2,
        "aria-disabled": disabled,
        "aria-selected": selected
      };
    },
    id,
    inputValue,
    value,
    dirty,
    expanded: popupOpen && anchorEl,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions
  };
}

// node_modules/@mui/joy/ModalClose/ModalClose.js
init_esm();

// node_modules/@mui/joy/utils/useSlot.js
init_extends();
init_objectWithoutPropertiesLoose();
init_esm();
var _excluded29 = ["className", "elementType", "ownerState", "externalForwardedProps", "getSlotOwnerState", "internalForwardedProps"];
var _excluded210 = ["component", "slots", "slotProps"];
var _excluded32 = ["component"];
function useSlot(name, parameters) {
  const {
    className,
    elementType: initialElementType,
    ownerState,
    externalForwardedProps,
    getSlotOwnerState,
    internalForwardedProps
  } = parameters, useSlotPropsParams = _objectWithoutPropertiesLoose(parameters, _excluded29);
  const {
    component: rootComponent,
    slots = {
      [name]: void 0
    },
    slotProps = {
      [name]: void 0
    }
  } = externalForwardedProps, other = _objectWithoutPropertiesLoose(externalForwardedProps, _excluded210);
  const elementType = slots[name] || initialElementType;
  const resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);
  const _mergeSlotProps = mergeSlotProps(_extends({
    className
  }, useSlotPropsParams, {
    externalForwardedProps: name === "root" ? other : void 0,
    externalSlotProps: resolvedComponentsProps
  })), {
    props: {
      component: slotComponent
    },
    internalRef
  } = _mergeSlotProps, mergedProps = _objectWithoutPropertiesLoose(_mergeSlotProps.props, _excluded32);
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, parameters.ref);
  const slotOwnerState = getSlotOwnerState ? getSlotOwnerState(mergedProps) : {};
  const finalOwnerState = _extends({}, ownerState, slotOwnerState);
  const LeafComponent = name === "root" ? slotComponent || rootComponent : slotComponent;
  const props = appendOwnerState(elementType, _extends({}, name === "root" && !rootComponent && !slots[name] && internalForwardedProps, name !== "root" && !slots[name] && internalForwardedProps, mergedProps, LeafComponent && {
    as: LeafComponent
  }, {
    ref
  }), finalOwnerState);
  Object.keys(slotOwnerState).forEach((propName) => {
    delete props[propName];
  });
  return [elementType, props];
}

// node_modules/@mui/joy/styles/identifier.js
var identifier_default = "$$joy";

// node_modules/@mui/joy/styles/extendTheme.js
init_extends();
init_objectWithoutPropertiesLoose();
init_esm();
init_createTheme();

// node_modules/@mui/joy/styles/sxConfig.js
init_extends();
var sxConfig = _extends({}, defaultSxConfig_default, {
  // The default system themeKey is shape
  borderRadius: {
    themeKey: "radius"
  },
  // The default system themeKey is shadows
  boxShadow: {
    themeKey: "shadow"
  },
  // The default system themeKey is typography
  fontFamily: {
    themeKey: "fontFamily"
  },
  // The default system themeKey is typography
  fontSize: {
    themeKey: "fontSize"
  },
  // The default system themeKey is typography
  fontWeight: {
    themeKey: "fontWeight"
  },
  // The default system themeKey is typography
  letterSpacing: {
    themeKey: "letterSpacing"
  },
  // The default system themeKey is typography
  lineHeight: {
    themeKey: "lineHeight"
  }
});
var sxConfig_default = sxConfig;

// node_modules/@mui/joy/colors/colors.js
var colors = {
  grey: {
    50: "#FBFCFE",
    100: "#F0F4F8",
    200: "#DDE7EE",
    300: "#CDD7E1",
    400: "#9FA6AD",
    500: "#636B74",
    600: "#555E68",
    700: "#32383E",
    800: "#171A1C",
    900: "#0B0D0E"
  },
  blue: {
    50: "#EDF5FD",
    100: "#E3EFFB",
    200: "#C7DFF7",
    300: "#97C3F0",
    400: "#4393E4",
    500: "#0B6BCB",
    600: "#185EA5",
    700: "#12467B",
    800: "#0A2744",
    900: "#051423"
  },
  yellow: {
    50: "#FEFAF6",
    100: "#FDF0E1",
    200: "#FCE1C2",
    300: "#F3C896",
    400: "#EA9A3E",
    500: "#9A5B13",
    600: "#72430D",
    700: "#492B08",
    800: "#2E1B05",
    900: "#1D1002"
  },
  red: {
    50: "#FEF6F6",
    100: "#FCE4E4",
    200: "#F7C5C5",
    300: "#F09898",
    400: "#E47474",
    500: "#C41C1C",
    600: "#A51818",
    700: "#7D1212",
    800: "#430A0A",
    900: "#240505"
  },
  green: {
    50: "#F6FEF6",
    100: "#E3FBE3",
    200: "#C7F7C7",
    300: "#A1E8A1",
    400: "#51BC51",
    500: "#1F7A1F",
    600: "#136C13",
    700: "#0A470A",
    800: "#042F04",
    900: "#021D02"
  }
};
var colors_default = colors;

// node_modules/@mui/joy/styles/shouldSkipGeneratingVar.js
function shouldSkipGeneratingVar(keys) {
  var _keys$;
  return !!keys[0].match(/^(typography|variants|breakpoints)$/) || !!keys[0].match(/sxConfig$/) || // ends with sxConfig
  keys[0] === "palette" && !!((_keys$ = keys[1]) != null && _keys$.match(/^(mode)$/)) || keys[0] === "focus" && keys[1] !== "thickness";
}

// node_modules/@mui/joy/className/index.js
init_esm();
init_esm();
var generateUtilityClass3 = (componentName, slot) => generateUtilityClass(componentName, slot, "Mui");
var generateUtilityClasses3 = (componentName, slots) => generateUtilityClasses(componentName, slots, "Mui");

// node_modules/@mui/joy/styles/variantUtils.js
init_extends();
var isVariantPalette = (colorPalette) => colorPalette && typeof colorPalette === "object" && Object.keys(colorPalette).some((value) => {
  var _value$match;
  return (_value$match = value.match) == null ? void 0 : _value$match.call(value, /^(plain(Hover|Active|Disabled)?(Color|Bg)|outlined(Hover|Active|Disabled)?(Color|Border|Bg)|soft(Hover|Active|Disabled)?(Color|Bg)|solid(Hover|Active|Disabled)?(Color|Bg))$/);
});
var assignCss = (target, variantVar, value) => {
  if (variantVar.includes("Color")) {
    target.color = value;
  }
  if (variantVar.includes("Bg")) {
    target.backgroundColor = value;
  }
  if (variantVar.includes("Border")) {
    target.borderColor = value;
  }
};
var createVariantStyle = (name, palette, getCssVar) => {
  const result = {};
  Object.entries(palette || {}).forEach(([variantVar, value]) => {
    if (variantVar.match(new RegExp(`${name}(color|bg|border)`, "i")) && !!value) {
      const cssVar = getCssVar ? getCssVar(variantVar) : value;
      if (variantVar.includes("Disabled")) {
        result.pointerEvents = "none";
        result.cursor = "default";
        result["--Icon-color"] = "currentColor";
      }
      if (variantVar.match(/(Hover|Active|Disabled)/)) {
        assignCss(result, variantVar, cssVar);
      } else {
        if (!result["--variant-borderWidth"]) {
          result["--variant-borderWidth"] = "0px";
        }
        if (variantVar.includes("Border")) {
          result["--variant-borderWidth"] = "1px";
          result.border = "var(--variant-borderWidth) solid";
        }
        assignCss(result, variantVar, cssVar);
      }
    }
  });
  return result;
};
var createVariant = (variant, theme) => {
  let result = {};
  if (theme) {
    const {
      getCssVar,
      palette
    } = theme;
    Object.entries(palette).forEach((entry) => {
      const [color, colorPalette] = entry;
      if (isVariantPalette(colorPalette) && typeof colorPalette === "object") {
        result = _extends({}, result, {
          [color]: createVariantStyle(variant, colorPalette, (variantVar) => `var(--variant-${variantVar}, ${getCssVar(`palette-${color}-${variantVar}`, palette[color][variantVar])})`)
        });
      }
    });
  }
  result.context = createVariantStyle(variant, {
    plainColor: "var(--variant-plainColor)",
    plainHoverColor: `var(--variant-plainHoverColor)`,
    plainHoverBg: "var(--variant-plainHoverBg)",
    plainActiveBg: "var(--variant-plainActiveBg)",
    plainDisabledColor: "var(--variant-plainDisabledColor)",
    outlinedColor: "var(--variant-outlinedColor)",
    outlinedBorder: "var(--variant-outlinedBorder)",
    outlinedHoverColor: `var(--variant-outlinedHoverColor)`,
    outlinedHoverBorder: `var(--variant-outlinedHoverBorder)`,
    outlinedHoverBg: `var(--variant-outlinedHoverBg)`,
    outlinedActiveBg: `var(--variant-outlinedActiveBg)`,
    outlinedDisabledColor: `var(--variant-outlinedDisabledColor)`,
    outlinedDisabledBorder: `var(--variant-outlinedDisabledBorder)`,
    softColor: "var(--variant-softColor)",
    softBg: "var(--variant-softBg)",
    softHoverColor: "var(--variant-softHoverColor)",
    softHoverBg: "var(--variant-softHoverBg)",
    softActiveBg: "var(--variant-softActiveBg)",
    softDisabledColor: "var(--variant-softDisabledColor)",
    softDisabledBg: "var(--variant-softDisabledBg)",
    solidColor: "var(--variant-solidColor)",
    solidBg: "var(--variant-solidBg)",
    solidHoverBg: "var(--variant-solidHoverBg)",
    solidActiveBg: "var(--variant-solidActiveBg)",
    solidDisabledColor: "var(--variant-solidDisabledColor)",
    solidDisabledBg: "var(--variant-solidDisabledBg)"
  });
  return result;
};

// node_modules/@mui/joy/styles/extendTheme.js
var _excluded30 = ["cssVarPrefix", "breakpoints", "spacing", "components", "variants", "shouldSkipGeneratingVar"];
var _excluded211 = ["colorSchemes"];
var createGetCssVar2 = (cssVarPrefix = "joy") => createGetCssVar(cssVarPrefix);
function extendTheme(themeOptions) {
  var _scalesInput$colorSch, _scalesInput$colorSch2, _scalesInput$colorSch3, _scalesInput$colorSch4, _scalesInput$colorSch5, _scalesInput$colorSch6, _scalesInput$focus$th, _scalesInput$focus, _scalesInput$focus$th2, _scalesInput$focus2;
  const _ref = themeOptions || {}, {
    cssVarPrefix = "joy",
    breakpoints,
    spacing,
    components: componentsInput,
    variants: variantsInput,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2 = shouldSkipGeneratingVar
  } = _ref, scalesInput = _objectWithoutPropertiesLoose(_ref, _excluded30);
  const getCssVar = createGetCssVar2(cssVarPrefix);
  const defaultColors = {
    primary: colors_default.blue,
    neutral: colors_default.grey,
    danger: colors_default.red,
    success: colors_default.green,
    warning: colors_default.yellow,
    common: {
      white: "#FFF",
      black: "#000"
    }
  };
  const getCssVarColor = (cssVar) => {
    var _defaultColors$color;
    const tokens = cssVar.split("-");
    const color = tokens[1];
    const index2 = tokens[2];
    return getCssVar(cssVar, (_defaultColors$color = defaultColors[color]) == null ? void 0 : _defaultColors$color[index2]);
  };
  const createLightModeVariantVariables = (color) => ({
    plainColor: getCssVarColor(`palette-${color}-500`),
    plainHoverBg: getCssVarColor(`palette-${color}-100`),
    plainActiveBg: getCssVarColor(`palette-${color}-200`),
    plainDisabledColor: getCssVarColor(`palette-neutral-400`),
    outlinedColor: getCssVarColor(`palette-${color}-500`),
    outlinedBorder: getCssVarColor(`palette-${color}-300`),
    outlinedHoverBg: getCssVarColor(`palette-${color}-100`),
    outlinedActiveBg: getCssVarColor(`palette-${color}-200`),
    outlinedDisabledColor: getCssVarColor(`palette-neutral-400`),
    outlinedDisabledBorder: getCssVarColor(`palette-neutral-200`),
    softColor: getCssVarColor(`palette-${color}-700`),
    softBg: getCssVarColor(`palette-${color}-100`),
    softHoverBg: getCssVarColor(`palette-${color}-200`),
    softActiveColor: getCssVarColor(`palette-${color}-800`),
    softActiveBg: getCssVarColor(`palette-${color}-300`),
    softDisabledColor: getCssVarColor(`palette-neutral-400`),
    softDisabledBg: getCssVarColor(`palette-neutral-50`),
    solidColor: getCssVarColor(`palette-common-white`),
    solidBg: getCssVarColor(`palette-${color}-500`),
    solidHoverBg: getCssVarColor(`palette-${color}-600`),
    solidActiveBg: getCssVarColor(`palette-${color}-700`),
    solidDisabledColor: getCssVarColor(`palette-neutral-400`),
    solidDisabledBg: getCssVarColor(`palette-neutral-100`)
  });
  const createDarkModeVariantVariables = (color) => ({
    plainColor: getCssVarColor(`palette-${color}-300`),
    plainHoverBg: getCssVarColor(`palette-${color}-800`),
    plainActiveBg: getCssVarColor(`palette-${color}-700`),
    plainDisabledColor: getCssVarColor(`palette-neutral-500`),
    outlinedColor: getCssVarColor(`palette-${color}-200`),
    outlinedBorder: getCssVarColor(`palette-${color}-700`),
    outlinedHoverBg: getCssVarColor(`palette-${color}-800`),
    outlinedActiveBg: getCssVarColor(`palette-${color}-700`),
    outlinedDisabledColor: getCssVarColor(`palette-neutral-500`),
    outlinedDisabledBorder: getCssVarColor(`palette-neutral-800`),
    softColor: getCssVarColor(`palette-${color}-200`),
    softBg: getCssVarColor(`palette-${color}-800`),
    softHoverBg: getCssVarColor(`palette-${color}-700`),
    softActiveColor: getCssVarColor(`palette-${color}-100`),
    softActiveBg: getCssVarColor(`palette-${color}-600`),
    softDisabledColor: getCssVarColor(`palette-neutral-500`),
    softDisabledBg: getCssVarColor(`palette-neutral-800`),
    solidColor: getCssVarColor(`palette-common-white`),
    solidBg: getCssVarColor(`palette-${color}-500`),
    solidHoverBg: getCssVarColor(`palette-${color}-600`),
    solidActiveBg: getCssVarColor(`palette-${color}-700`),
    solidDisabledColor: getCssVarColor(`palette-neutral-500`),
    solidDisabledBg: getCssVarColor(`palette-neutral-800`)
  });
  const lightColorSystem = {
    palette: {
      mode: "light",
      primary: _extends({}, defaultColors.primary, createLightModeVariantVariables("primary")),
      neutral: _extends({}, defaultColors.neutral, createLightModeVariantVariables("neutral"), {
        plainColor: getCssVarColor("palette-neutral-700"),
        plainHoverColor: getCssVarColor(`palette-neutral-900`),
        outlinedColor: getCssVarColor("palette-neutral-700")
      }),
      danger: _extends({}, defaultColors.danger, createLightModeVariantVariables("danger")),
      success: _extends({}, defaultColors.success, createLightModeVariantVariables("success")),
      warning: _extends({}, defaultColors.warning, createLightModeVariantVariables("warning")),
      common: {
        white: "#FFF",
        black: "#000"
      },
      text: {
        primary: getCssVarColor("palette-neutral-800"),
        secondary: getCssVarColor("palette-neutral-700"),
        tertiary: getCssVarColor("palette-neutral-600"),
        icon: getCssVarColor("palette-neutral-500")
      },
      background: {
        body: getCssVarColor("palette-common-white"),
        surface: getCssVarColor("palette-neutral-50"),
        popup: getCssVarColor("palette-common-white"),
        level1: getCssVarColor("palette-neutral-100"),
        level2: getCssVarColor("palette-neutral-200"),
        level3: getCssVarColor("palette-neutral-300"),
        tooltip: getCssVarColor("palette-neutral-500"),
        backdrop: `rgba(${getCssVar(
          "palette-neutral-darkChannel",
          colorChannel(defaultColors.neutral[900])
          // should be the same index as in `attachColorChannels`
        )} / 0.25)`
      },
      divider: `rgba(${getCssVar(
        "palette-neutral-mainChannel",
        colorChannel(defaultColors.neutral[500])
        // should be the same index as in `attachColorChannels`
      )} / 0.2)`,
      focusVisible: getCssVarColor("palette-primary-500")
    },
    shadowRing: "0 0 #000",
    shadowChannel: "21 21 21",
    shadowOpacity: "0.08"
  };
  const darkColorSystem = {
    palette: {
      mode: "dark",
      primary: _extends({}, defaultColors.primary, createDarkModeVariantVariables("primary")),
      neutral: _extends({}, defaultColors.neutral, createDarkModeVariantVariables("neutral"), {
        plainColor: getCssVarColor("palette-neutral-300"),
        plainHoverColor: getCssVarColor(`palette-neutral-300`)
      }),
      danger: _extends({}, defaultColors.danger, createDarkModeVariantVariables("danger")),
      success: _extends({}, defaultColors.success, createDarkModeVariantVariables("success")),
      warning: _extends({}, defaultColors.warning, createDarkModeVariantVariables("warning")),
      common: {
        white: "#FFF",
        black: "#000"
      },
      text: {
        primary: getCssVarColor("palette-neutral-100"),
        secondary: getCssVarColor("palette-neutral-300"),
        tertiary: getCssVarColor("palette-neutral-400"),
        icon: getCssVarColor("palette-neutral-400")
      },
      background: {
        body: getCssVarColor("palette-common-black"),
        surface: getCssVarColor("palette-neutral-900"),
        popup: getCssVarColor("palette-common-black"),
        level1: getCssVarColor("palette-neutral-800"),
        level2: getCssVarColor("palette-neutral-700"),
        level3: getCssVarColor("palette-neutral-600"),
        tooltip: getCssVarColor("palette-neutral-600"),
        backdrop: `rgba(${getCssVar(
          "palette-neutral-darkChannel",
          colorChannel(defaultColors.neutral[50])
          // should be the same index as in `attachColorChannels`
        )} / 0.25)`
      },
      divider: `rgba(${getCssVar(
        "palette-neutral-mainChannel",
        colorChannel(defaultColors.neutral[500])
        // should be the same index as in `attachColorChannels`
      )} / 0.16)`,
      focusVisible: getCssVarColor("palette-primary-500")
    },
    shadowRing: "0 0 #000",
    shadowChannel: "0 0 0",
    shadowOpacity: "0.6"
  };
  const fontFamilyFallback = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  const fontFamily = _extends({
    body: `"Inter", ${getCssVar(`fontFamily-fallback, ${fontFamilyFallback}`)}`,
    display: `"Inter", ${getCssVar(`fontFamily-fallback, ${fontFamilyFallback}`)}`,
    code: "Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
    fallback: fontFamilyFallback
  }, scalesInput.fontFamily);
  const fontWeight = _extends({
    sm: 300,
    // regular
    md: 500,
    // medium
    lg: 600,
    // semi-bold
    xl: 700
  }, scalesInput.fontWeight);
  const fontSize = _extends({
    xs: "0.75rem",
    // 12px
    sm: "0.875rem",
    // 14px
    md: "1rem",
    // 16px
    lg: "1.125rem",
    // 18px
    xl: "1.25rem",
    // 20px
    xl2: "1.5rem",
    // 24px
    xl3: "1.875rem",
    // 30px
    xl4: "2.25rem"
  }, scalesInput.fontSize);
  const lineHeight = _extends({
    xs: "1.33334",
    // largest font sizes: h1, h2
    sm: "1.42858",
    // normal font sizes
    md: "1.5",
    // normal font sizes
    lg: "1.55556",
    // large font sizes for components
    xl: "1.66667"
  }, scalesInput.lineHeight);
  const defaultShadowRing = (_scalesInput$colorSch = (_scalesInput$colorSch2 = scalesInput.colorSchemes) == null || (_scalesInput$colorSch2 = _scalesInput$colorSch2.light) == null ? void 0 : _scalesInput$colorSch2.shadowRing) != null ? _scalesInput$colorSch : lightColorSystem.shadowRing;
  const defaultShadowChannel = (_scalesInput$colorSch3 = (_scalesInput$colorSch4 = scalesInput.colorSchemes) == null || (_scalesInput$colorSch4 = _scalesInput$colorSch4.light) == null ? void 0 : _scalesInput$colorSch4.shadowChannel) != null ? _scalesInput$colorSch3 : lightColorSystem.shadowChannel;
  const defaultShadowOpacity = (_scalesInput$colorSch5 = (_scalesInput$colorSch6 = scalesInput.colorSchemes) == null || (_scalesInput$colorSch6 = _scalesInput$colorSch6.light) == null ? void 0 : _scalesInput$colorSch6.shadowOpacity) != null ? _scalesInput$colorSch5 : lightColorSystem.shadowOpacity;
  const defaultScales = {
    colorSchemes: {
      light: lightColorSystem,
      dark: darkColorSystem
    },
    fontSize,
    fontFamily,
    fontWeight,
    focus: {
      thickness: "2px",
      selector: `&.${generateUtilityClass3("", "focusVisible")}, &:focus-visible`,
      default: {
        outlineOffset: `var(--focus-outline-offset, ${getCssVar("focus-thickness", (_scalesInput$focus$th = (_scalesInput$focus = scalesInput.focus) == null ? void 0 : _scalesInput$focus.thickness) != null ? _scalesInput$focus$th : "2px")})`,
        outline: `${getCssVar("focus-thickness", (_scalesInput$focus$th2 = (_scalesInput$focus2 = scalesInput.focus) == null ? void 0 : _scalesInput$focus2.thickness) != null ? _scalesInput$focus$th2 : "2px")} solid ${getCssVar("palette-focusVisible", defaultColors.primary[500])}`
      }
    },
    lineHeight,
    radius: {
      xs: "2px",
      sm: "6px",
      md: "8px",
      lg: "12px",
      xl: "16px"
    },
    shadow: {
      xs: `${getCssVar("shadowRing", defaultShadowRing)}, 0px 1px 2px 0px rgba(${getCssVar("shadowChannel", defaultShadowChannel)} / ${getCssVar("shadowOpacity", defaultShadowOpacity)})`,
      sm: `${getCssVar("shadowRing", defaultShadowRing)}, 0px 1px 2px 0px rgba(${getCssVar("shadowChannel", defaultShadowChannel)} / ${getCssVar("shadowOpacity", defaultShadowOpacity)}), 0px 2px 4px 0px rgba(${getCssVar("shadowChannel", defaultShadowChannel)} / ${getCssVar("shadowOpacity", defaultShadowOpacity)})`,
      md: `${getCssVar("shadowRing", defaultShadowRing)}, 0px 2px 8px -2px rgba(${getCssVar("shadowChannel", defaultShadowChannel)} / ${getCssVar("shadowOpacity", defaultShadowOpacity)}), 0px 6px 12px -2px rgba(${getCssVar("shadowChannel", defaultShadowChannel)} / ${getCssVar("shadowOpacity", defaultShadowOpacity)})`,
      lg: `${getCssVar("shadowRing", defaultShadowRing)}, 0px 2px 8px -2px rgba(${getCssVar("shadowChannel", defaultShadowChannel)} / ${getCssVar("shadowOpacity", defaultShadowOpacity)}), 0px 12px 16px -4px rgba(${getCssVar("shadowChannel", defaultShadowChannel)} / ${getCssVar("shadowOpacity", defaultShadowOpacity)})`,
      xl: `${getCssVar("shadowRing", defaultShadowRing)}, 0px 2px 8px -2px rgba(${getCssVar("shadowChannel", defaultShadowChannel)} / ${getCssVar("shadowOpacity", defaultShadowOpacity)}), 0px 20px 24px -4px rgba(${getCssVar("shadowChannel", defaultShadowChannel)} / ${getCssVar("shadowOpacity", defaultShadowOpacity)})`
    },
    zIndex: {
      badge: 1,
      table: 10,
      popup: 1e3,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500
    },
    typography: {
      h1: {
        fontFamily: getCssVar(`fontFamily-display, ${fontFamily.display}`),
        fontWeight: getCssVar(`fontWeight-xl, ${fontWeight.xl}`),
        fontSize: getCssVar(`fontSize-xl4, ${fontSize.xl4}`),
        lineHeight: getCssVar(`lineHeight-xs, ${lineHeight.xs}`),
        letterSpacing: "-0.025em",
        color: getCssVar(`palette-text-primary, ${lightColorSystem.palette.text.primary}`)
      },
      h2: {
        fontFamily: getCssVar(`fontFamily-display, ${fontFamily.display}`),
        fontWeight: getCssVar(`fontWeight-xl, ${fontWeight.xl}`),
        fontSize: getCssVar(`fontSize-xl3, ${fontSize.xl3}`),
        lineHeight: getCssVar(`lineHeight-xs, ${lineHeight.xs}`),
        letterSpacing: "-0.025em",
        color: getCssVar(`palette-text-primary, ${lightColorSystem.palette.text.primary}`)
      },
      h3: {
        fontFamily: getCssVar(`fontFamily-display, ${fontFamily.display}`),
        fontWeight: getCssVar(`fontWeight-lg, ${fontWeight.lg}`),
        fontSize: getCssVar(`fontSize-xl2, ${fontSize.xl2}`),
        lineHeight: getCssVar(`lineHeight-xs, ${lineHeight.xs}`),
        letterSpacing: "-0.025em",
        color: getCssVar(`palette-text-primary, ${lightColorSystem.palette.text.primary}`)
      },
      h4: {
        fontFamily: getCssVar(`fontFamily-display, ${fontFamily.display}`),
        fontWeight: getCssVar(`fontWeight-lg, ${fontWeight.lg}`),
        fontSize: getCssVar(`fontSize-xl, ${fontSize.xl}`),
        lineHeight: getCssVar(`lineHeight-md, ${lineHeight.md}`),
        letterSpacing: "-0.025em",
        color: getCssVar(`palette-text-primary, ${lightColorSystem.palette.text.primary}`)
      },
      "title-lg": {
        fontFamily: getCssVar(`fontFamily-body, ${fontFamily.body}`),
        fontWeight: getCssVar(`fontWeight-lg, ${fontWeight.lg}`),
        fontSize: getCssVar(`fontSize-lg, ${fontSize.lg}`),
        lineHeight: getCssVar(`lineHeight-xs, ${lineHeight.xs}`),
        color: getCssVar(`palette-text-primary, ${lightColorSystem.palette.text.primary}`)
      },
      "title-md": {
        fontFamily: getCssVar(`fontFamily-body, ${fontFamily.body}`),
        fontWeight: getCssVar(`fontWeight-md, ${fontWeight.md}`),
        fontSize: getCssVar(`fontSize-md, ${fontSize.md}`),
        lineHeight: getCssVar(`lineHeight-md, ${lineHeight.md}`),
        color: getCssVar(`palette-text-primary, ${lightColorSystem.palette.text.primary}`)
      },
      "title-sm": {
        fontFamily: getCssVar(`fontFamily-body, ${fontFamily.body}`),
        fontWeight: getCssVar(`fontWeight-md, ${fontWeight.md}`),
        fontSize: getCssVar(`fontSize-sm, ${fontSize.sm}`),
        lineHeight: getCssVar(`lineHeight-sm, ${lineHeight.sm}`),
        color: getCssVar(`palette-text-primary, ${lightColorSystem.palette.text.primary}`)
      },
      "body-lg": {
        fontFamily: getCssVar(`fontFamily-body, ${fontFamily.body}`),
        fontSize: getCssVar(`fontSize-lg, ${fontSize.lg}`),
        lineHeight: getCssVar(`lineHeight-md, ${lineHeight.md}`),
        color: getCssVar(`palette-text-secondary, ${lightColorSystem.palette.text.secondary}`)
      },
      "body-md": {
        fontFamily: getCssVar(`fontFamily-body, ${fontFamily.body}`),
        fontSize: getCssVar(`fontSize-md, ${fontSize.md}`),
        lineHeight: getCssVar(`lineHeight-md, ${lineHeight.md}`),
        color: getCssVar(`palette-text-secondary, ${lightColorSystem.palette.text.secondary}`)
      },
      "body-sm": {
        fontFamily: getCssVar(`fontFamily-body, ${fontFamily.body}`),
        fontSize: getCssVar(`fontSize-sm, ${fontSize.sm}`),
        lineHeight: getCssVar(`lineHeight-md, ${lineHeight.md}`),
        color: getCssVar(`palette-text-tertiary, ${lightColorSystem.palette.text.tertiary}`)
      },
      "body-xs": {
        fontFamily: getCssVar(`fontFamily-body, ${fontFamily.body}`),
        fontWeight: getCssVar(`fontWeight-md, ${fontWeight.md}`),
        fontSize: getCssVar(`fontSize-xs, ${fontSize.xs}`),
        lineHeight: getCssVar(`lineHeight-md, ${lineHeight.md}`),
        color: getCssVar(`palette-text-tertiary, ${lightColorSystem.palette.text.tertiary}`)
      }
    }
  };
  const _ref2 = scalesInput ? deepmerge(defaultScales, scalesInput) : defaultScales, {
    colorSchemes
  } = _ref2, mergedScales = _objectWithoutPropertiesLoose(_ref2, _excluded211);
  const theme = _extends({
    colorSchemes
  }, mergedScales, {
    breakpoints: createBreakpoints(breakpoints != null ? breakpoints : {}),
    components: deepmerge({
      // TODO: find a way to abstract SvgIcon out of @mui/material
      MuiSvgIcon: {
        defaultProps: {
          fontSize: "xl2"
        },
        styleOverrides: {
          root: ({
            ownerState,
            theme: themeProp
          }) => {
            var _themeProp$vars$palet;
            const instanceFontSize = ownerState.instanceFontSize;
            return _extends({
              margin: "var(--Icon-margin)"
            }, ownerState.fontSize && ownerState.fontSize !== "inherit" && {
              fontSize: `var(--Icon-fontSize, ${themeProp.vars.fontSize[ownerState.fontSize]})`
            }, !ownerState.htmlColor && _extends({
              color: `var(--Icon-color, ${theme.vars.palette.text.icon})`
            }, ownerState.color && ownerState.color !== "inherit" && themeProp.vars.palette[ownerState.color] && {
              color: `rgba(${(_themeProp$vars$palet = themeProp.vars.palette[ownerState.color]) == null ? void 0 : _themeProp$vars$palet.mainChannel} / 1)`
            }), instanceFontSize && instanceFontSize !== "inherit" && {
              "--Icon-fontSize": themeProp.vars.fontSize[instanceFontSize]
            });
          }
        }
      }
    }, componentsInput),
    cssVarPrefix,
    getCssVar,
    spacing: createSpacing(spacing)
  });
  function attachColorChannels(supportedColorScheme, palette) {
    Object.keys(palette).forEach((key) => {
      const channelMapping = {
        main: "500",
        light: "200",
        dark: "700"
      };
      if (supportedColorScheme === "dark") {
        channelMapping.main = 400;
      }
      if (!palette[key].mainChannel && palette[key][channelMapping.main]) {
        palette[key].mainChannel = colorChannel(palette[key][channelMapping.main]);
      }
      if (!palette[key].lightChannel && palette[key][channelMapping.light]) {
        palette[key].lightChannel = colorChannel(palette[key][channelMapping.light]);
      }
      if (!palette[key].darkChannel && palette[key][channelMapping.dark]) {
        palette[key].darkChannel = colorChannel(palette[key][channelMapping.dark]);
      }
    });
  }
  Object.entries(theme.colorSchemes).forEach(([supportedColorScheme, colorSystem]) => {
    attachColorChannels(supportedColorScheme, colorSystem.palette);
  });
  const parserConfig = {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2
  };
  const {
    vars: themeVars,
    generateCssVars
  } = prepareCssVars_default(
    // @ts-ignore property truDark is missing from colorSchemes
    _extends({
      colorSchemes
    }, mergedScales),
    parserConfig
  );
  theme.vars = themeVars;
  theme.generateCssVars = generateCssVars;
  theme.unstable_sxConfig = _extends({}, sxConfig_default, themeOptions == null ? void 0 : themeOptions.unstable_sxConfig);
  theme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  theme.getColorSchemeSelector = (colorScheme) => colorScheme === "light" ? "&" : `&[data-joy-color-scheme="${colorScheme}"], [data-joy-color-scheme="${colorScheme}"] &`;
  const createVariantInput = {
    getCssVar,
    palette: theme.colorSchemes.light.palette
  };
  theme.variants = deepmerge({
    plain: createVariant("plain", createVariantInput),
    plainHover: createVariant("plainHover", createVariantInput),
    plainActive: createVariant("plainActive", createVariantInput),
    plainDisabled: createVariant("plainDisabled", createVariantInput),
    outlined: createVariant("outlined", createVariantInput),
    outlinedHover: createVariant("outlinedHover", createVariantInput),
    outlinedActive: createVariant("outlinedActive", createVariantInput),
    outlinedDisabled: createVariant("outlinedDisabled", createVariantInput),
    soft: createVariant("soft", createVariantInput),
    softHover: createVariant("softHover", createVariantInput),
    softActive: createVariant("softActive", createVariantInput),
    softDisabled: createVariant("softDisabled", createVariantInput),
    solid: createVariant("solid", createVariantInput),
    solidHover: createVariant("solidHover", createVariantInput),
    solidActive: createVariant("solidActive", createVariantInput),
    solidDisabled: createVariant("solidDisabled", createVariantInput)
  }, variantsInput);
  theme.palette = _extends({}, theme.colorSchemes.light.palette, {
    colorScheme: "light"
  });
  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar2;
  theme.applyStyles = applyStyles;
  return theme;
}

// node_modules/@mui/joy/styles/defaultTheme.js
var defaultTheme = extendTheme();
var defaultTheme_default = defaultTheme;

// node_modules/@mui/joy/InitColorSchemeScript/InitColorSchemeScript.js
init_extends();
var React75 = __toESM(require_react());
var import_jsx_runtime49 = __toESM(require_jsx_runtime());
var defaultConfig = {
  attribute: "data-joy-color-scheme",
  colorSchemeStorageKey: "joy-color-scheme",
  defaultLightColorScheme: "light",
  defaultDarkColorScheme: "dark",
  modeStorageKey: "joy-mode"
};

// node_modules/@mui/joy/styles/CssVarsProvider.js
var {
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript: getInitColorSchemeScriptSystem
} = createCssVarsProvider({
  themeId: identifier_default,
  theme: defaultTheme_default,
  attribute: defaultConfig.attribute,
  modeStorageKey: defaultConfig.modeStorageKey,
  colorSchemeStorageKey: defaultConfig.colorSchemeStorageKey,
  defaultColorScheme: {
    light: defaultConfig.defaultLightColorScheme,
    dark: defaultConfig.defaultDarkColorScheme
  }
});
var getInitColorSchemeScript = getInitColorSchemeScriptSystem;

// node_modules/@mui/joy/styles/styled.js
var styled = createStyled({
  defaultTheme: defaultTheme_default,
  themeId: identifier_default
});
var styled_default = styled;

// node_modules/@mui/joy/styles/ThemeProvider.js
var React76 = __toESM(require_react());
var import_jsx_runtime50 = __toESM(require_jsx_runtime());
var useTheme = () => {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React76.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
};
function ThemeProvider({
  children,
  theme: themeInput
}) {
  let theme = defaultTheme_default;
  if (themeInput) {
    theme = extendTheme(identifier_default in themeInput ? themeInput[identifier_default] : themeInput);
  }
  return (0, import_jsx_runtime50.jsx)(ThemeProvider_default, {
    theme,
    themeId: themeInput && identifier_default in themeInput ? identifier_default : void 0,
    children
  });
}

// node_modules/@mui/joy/styles/useThemeProps.js
init_extends();
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme: _extends({}, defaultTheme_default, {
      components: {}
    }),
    themeId: identifier_default
  });
}

// node_modules/@mui/joy/IconButton/IconButton.js
init_objectWithoutPropertiesLoose();
init_extends();
var React80 = __toESM(require_react());
var import_prop_types32 = __toESM(require_prop_types());
init_esm();

// node_modules/@mui/joy/IconButton/iconButtonClasses.js
function getIconButtonUtilityClass(slot) {
  return generateUtilityClass3("MuiIconButton", slot);
}
var iconButtonClasses = generateUtilityClasses3("MuiIconButton", ["root", "colorPrimary", "colorNeutral", "colorDanger", "colorSuccess", "colorWarning", "colorContext", "variantPlain", "variantOutlined", "variantSoft", "variantSolid", "focusVisible", "disabled", "sizeSm", "sizeMd", "sizeLg", "loading", "loadingIndicator"]);
var iconButtonClasses_default = iconButtonClasses;

// node_modules/@mui/joy/ButtonGroup/ButtonGroupContext.js
var React77 = __toESM(require_react());
var ButtonGroupContext = React77.createContext({});
if (true) {
  ButtonGroupContext.displayName = "ButtonGroupContext";
}
var ButtonGroupContext_default = ButtonGroupContext;

// node_modules/@mui/joy/ToggleButtonGroup/ToggleButtonGroupContext.js
var React78 = __toESM(require_react());
var ToggleButtonGroupContext = React78.createContext(void 0);
if (true) {
  ToggleButtonGroupContext.displayName = "ToggleButtonGroupContext";
}
var ToggleButtonGroupContext_default = ToggleButtonGroupContext;

// node_modules/@mui/joy/CircularProgress/CircularProgress.js
init_extends();
init_objectWithoutPropertiesLoose();
var import_prop_types31 = __toESM(require_prop_types());
var React79 = __toESM(require_react());
init_clsx();
init_esm();

// node_modules/@mui/joy/CircularProgress/circularProgressClasses.js
function getCircularProgressUtilityClass(slot) {
  return generateUtilityClass3("MuiCircularProgress", slot);
}
var circularProgressClasses = generateUtilityClasses3("MuiCircularProgress", ["root", "determinate", "svg", "track", "progress", "colorPrimary", "colorNeutral", "colorDanger", "colorSuccess", "colorWarning", "colorContext", "sizeSm", "sizeMd", "sizeLg", "variantPlain", "variantOutlined", "variantSoft", "variantSolid"]);
var circularProgressClasses_default = circularProgressClasses;

// node_modules/@mui/joy/CircularProgress/CircularProgress.js
var import_jsx_runtime51 = __toESM(require_jsx_runtime());
var import_jsx_runtime52 = __toESM(require_jsx_runtime());
var _ = (t) => t;
var _t;
var _excluded31 = ["color", "backgroundColor"];
var _excluded212 = ["children", "className", "color", "size", "variant", "thickness", "determinate", "value", "component", "slots", "slotProps"];
var circulate = keyframes({
  "0%": {
    // let the progress start at the top of the ring
    transform: "rotate(-90deg)"
  },
  "100%": {
    transform: "rotate(270deg)"
  }
});
var useUtilityClasses23 = (ownerState) => {
  const {
    determinate,
    color,
    variant,
    size: size3
  } = ownerState;
  const slots = {
    root: ["root", determinate && "determinate", color && `color${capitalize(color)}`, variant && `variant${capitalize(variant)}`, size3 && `size${capitalize(size3)}`],
    svg: ["svg"],
    track: ["track"],
    progress: ["progress"]
  };
  return composeClasses(slots, getCircularProgressUtilityClass, {});
};
function getThickness(slot, defaultValue) {
  return `var(--CircularProgress-${slot}Thickness, var(--CircularProgress-thickness, ${defaultValue}))`;
}
var CircularProgressRoot = styled_default("span", {
  name: "JoyCircularProgress",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})(({
  ownerState,
  theme
}) => {
  var _theme$variants, _theme$variants$solid, _theme$variants$softH, _theme$variants$solid2;
  const _ref = ((_theme$variants = theme.variants[ownerState.variant]) == null ? void 0 : _theme$variants[ownerState.color]) || {}, {
    color,
    backgroundColor
  } = _ref, rest = _objectWithoutPropertiesLoose(_ref, _excluded31);
  return _extends({
    // integration with icon
    "--Icon-fontSize": "calc(0.4 * var(--_root-size))",
    // public variables
    "--CircularProgress-trackColor": backgroundColor,
    "--CircularProgress-progressColor": color,
    "--CircularProgress-percent": ownerState.value,
    // 0 - 100
    "--CircularProgress-linecap": "round"
  }, ownerState.size === "sm" && {
    "--_root-size": "var(--CircularProgress-size, 24px)",
    // use --_root-size to let other components overrides via --CircularProgress-size
    "--_track-thickness": getThickness("track", "3px"),
    "--_progress-thickness": getThickness("progress", "3px")
  }, ownerState.instanceSize === "sm" && {
    "--CircularProgress-size": "24px"
  }, ownerState.size === "md" && {
    "--_track-thickness": getThickness("track", "6px"),
    "--_progress-thickness": getThickness("progress", "6px"),
    "--_root-size": "var(--CircularProgress-size, 40px)"
  }, ownerState.instanceSize === "md" && {
    "--CircularProgress-size": "40px"
  }, ownerState.size === "lg" && {
    "--_track-thickness": getThickness("track", "8px"),
    "--_progress-thickness": getThickness("progress", "8px"),
    "--_root-size": "var(--CircularProgress-size, 64px)"
  }, ownerState.instanceSize === "lg" && {
    "--CircularProgress-size": "64px"
  }, ownerState.thickness && {
    "--_track-thickness": `${ownerState.thickness}px`,
    "--_progress-thickness": `${ownerState.thickness}px`
  }, {
    // internal variables
    "--_thickness-diff": "calc(var(--_track-thickness) - var(--_progress-thickness))",
    "--_inner-size": "calc(var(--_root-size) - 2 * var(--variant-borderWidth, 0px))",
    "--_outlined-inset": "max(var(--_track-thickness), var(--_progress-thickness))",
    width: "var(--_root-size)",
    height: "var(--_root-size)",
    borderRadius: "var(--_root-size)",
    margin: "var(--CircularProgress-margin)",
    boxSizing: "border-box",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    // prevent from shrinking when CircularProgress is in a flex container.
    position: "relative",
    color
  }, ownerState.children && {
    // only add font related properties when there is a child.
    // so that when there is no child, the size can be controlled by the parent font-size e.g. Link
    fontFamily: theme.vars.fontFamily.body,
    fontWeight: theme.vars.fontWeight.md,
    fontSize: "calc(0.2 * var(--_root-size))"
  }, rest, ownerState.variant === "outlined" && {
    "&::before": _extends({
      content: '""',
      display: "block",
      position: "absolute",
      borderRadius: "inherit",
      top: "var(--_outlined-inset)",
      left: "var(--_outlined-inset)",
      right: "var(--_outlined-inset)",
      bottom: "var(--_outlined-inset)"
    }, rest)
  }, ownerState.variant === "soft" && {
    "--CircularProgress-trackColor": theme.variants.soft.neutral.backgroundColor,
    "--CircularProgress-progressColor": (_theme$variants$solid = theme.variants.solid) == null ? void 0 : _theme$variants$solid[ownerState.color].backgroundColor
  }, ownerState.variant === "solid" && {
    "--CircularProgress-trackColor": (_theme$variants$softH = theme.variants.softHover) == null ? void 0 : _theme$variants$softH[ownerState.color].backgroundColor,
    "--CircularProgress-progressColor": (_theme$variants$solid2 = theme.variants.solid) == null ? void 0 : _theme$variants$solid2[ownerState.color].backgroundColor
  });
});
var CircularProgressSvg = styled_default("svg", {
  name: "JoyCircularProgress",
  slot: "Svg",
  overridesResolver: (props, styles2) => styles2.svg
})({
  width: "inherit",
  height: "inherit",
  display: "inherit",
  boxSizing: "inherit",
  position: "absolute",
  top: "calc(-1 * var(--variant-borderWidth, 0px))",
  // centered align
  left: "calc(-1 * var(--variant-borderWidth, 0px))"
  // centered align
});
var CircularProgressTrack = styled_default("circle", {
  name: "JoyCircularProgress",
  slot: "track",
  overridesResolver: (props, styles2) => styles2.track
})({
  cx: "50%",
  cy: "50%",
  r: "calc(var(--_inner-size) / 2 - var(--_track-thickness) / 2 + min(0px, var(--_thickness-diff) / 2))",
  fill: "transparent",
  strokeWidth: "var(--_track-thickness)",
  stroke: "var(--CircularProgress-trackColor)"
});
var CircularProgressProgress = styled_default("circle", {
  name: "JoyCircularProgress",
  slot: "progress",
  overridesResolver: (props, styles2) => styles2.progress
})({
  "--_progress-radius": "calc(var(--_inner-size) / 2 - var(--_progress-thickness) / 2 - max(0px, var(--_thickness-diff) / 2))",
  "--_progress-length": "calc(2 * 3.1415926535 * var(--_progress-radius))",
  // the circumference around the progress
  cx: "50%",
  cy: "50%",
  r: "var(--_progress-radius)",
  fill: "transparent",
  strokeWidth: "var(--_progress-thickness)",
  stroke: "var(--CircularProgress-progressColor)",
  strokeLinecap: "var(--CircularProgress-linecap, round)",
  // can't use CSS variable directly, need to cast type.
  strokeDasharray: "var(--_progress-length)",
  strokeDashoffset: "calc(var(--_progress-length) - var(--CircularProgress-percent) * var(--_progress-length) / 100)",
  transformOrigin: "center",
  transform: "rotate(-90deg)"
  // to initially appear at the top-center of the circle.
}, ({
  ownerState
}) => !ownerState.determinate && css(_t || (_t = _`
      animation: var(--CircularProgress-circulation, 0.8s linear 0s infinite normal none running)
        ${0};
    `), circulate));
var CircularProgress = React79.forwardRef(function CircularProgress2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "JoyCircularProgress"
  });
  const {
    children,
    className,
    color = "primary",
    size: size3 = "md",
    variant = "soft",
    thickness,
    determinate = false,
    value = determinate ? 0 : 25,
    // `25` is the 1/4 of the circle.
    component,
    slots = {},
    slotProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded212);
  const ownerState = _extends({}, props, {
    color,
    size: size3,
    variant,
    thickness,
    value,
    determinate,
    instanceSize: inProps.size
  });
  const classes = useUtilityClasses23(ownerState);
  const externalForwardedProps = _extends({}, other, {
    component,
    slots,
    slotProps
  });
  const [SlotRoot, rootProps] = useSlot("root", {
    ref,
    className: clsx_default(classes.root, className),
    elementType: CircularProgressRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: _extends({
      role: "progressbar",
      style: {
        // Setting this CSS variable via inline-style
        // prevents the generation of new CSS every time
        // `value` prop updates
        "--CircularProgress-percent": value
      }
    }, value && determinate && {
      "aria-valuenow": typeof value === "number" ? Math.round(value) : Math.round(Number(value || 0))
    })
  });
  const [SlotSvg, svgProps] = useSlot("svg", {
    className: classes.svg,
    elementType: CircularProgressSvg,
    externalForwardedProps,
    ownerState
  });
  const [SlotTrack, trackProps] = useSlot("track", {
    className: classes.track,
    elementType: CircularProgressTrack,
    externalForwardedProps,
    ownerState
  });
  const [SlotProgress, progressProps] = useSlot("progress", {
    className: classes.progress,
    elementType: CircularProgressProgress,
    externalForwardedProps,
    ownerState
  });
  return (0, import_jsx_runtime52.jsxs)(SlotRoot, _extends({}, rootProps, {
    children: [(0, import_jsx_runtime52.jsxs)(SlotSvg, _extends({}, svgProps, {
      children: [(0, import_jsx_runtime51.jsx)(SlotTrack, _extends({}, trackProps)), (0, import_jsx_runtime51.jsx)(SlotProgress, _extends({}, progressProps))]
    })), children]
  }));
});
true ? CircularProgress.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types31.default.node,
  /**
   * @ignore
   */
  className: import_prop_types31.default.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: import_prop_types31.default.oneOfType([import_prop_types31.default.oneOf(["danger", "neutral", "primary", "success", "warning"]), import_prop_types31.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types31.default.elementType,
  /**
   * The boolean to select a variant.
   * Use indeterminate when there is no progress value.
   * @default false
   */
  determinate: import_prop_types31.default.bool,
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: import_prop_types31.default.oneOfType([import_prop_types31.default.oneOf(["sm", "md", "lg"]), import_prop_types31.default.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types31.default.shape({
    progress: import_prop_types31.default.oneOfType([import_prop_types31.default.func, import_prop_types31.default.object]),
    root: import_prop_types31.default.oneOfType([import_prop_types31.default.func, import_prop_types31.default.object]),
    svg: import_prop_types31.default.oneOfType([import_prop_types31.default.func, import_prop_types31.default.object]),
    track: import_prop_types31.default.oneOfType([import_prop_types31.default.func, import_prop_types31.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types31.default.shape({
    progress: import_prop_types31.default.elementType,
    root: import_prop_types31.default.elementType,
    svg: import_prop_types31.default.elementType,
    track: import_prop_types31.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types31.default.oneOfType([import_prop_types31.default.arrayOf(import_prop_types31.default.oneOfType([import_prop_types31.default.func, import_prop_types31.default.object, import_prop_types31.default.bool])), import_prop_types31.default.func, import_prop_types31.default.object]),
  /**
   * The thickness of the circle.
   */
  thickness: import_prop_types31.default.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   *
   * @default determinate ? 0 : 25
   */
  value: import_prop_types31.default.number,
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'soft'
   */
  variant: import_prop_types31.default.oneOfType([import_prop_types31.default.oneOf(["outlined", "plain", "soft", "solid"]), import_prop_types31.default.string])
} : void 0;
var CircularProgress_default = CircularProgress;

// node_modules/@mui/joy/IconButton/IconButton.js
var import_jsx_runtime53 = __toESM(require_jsx_runtime());
var _excluded33 = ["children", "action", "component", "color", "disabled", "variant", "loading", "loadingIndicator", "size", "slots", "slotProps"];
var useUtilityClasses24 = (ownerState) => {
  const {
    color,
    disabled,
    focusVisible,
    focusVisibleClassName,
    size: size3,
    variant,
    loading
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", variant && `variant${capitalize(variant)}`, color && `color${capitalize(color)}`, size3 && `size${capitalize(size3)}`, loading && "loading"],
    loadingIndicator: ["loadingIndicator"]
  };
  const composedClasses = composeClasses(slots, getIconButtonUtilityClass, {});
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
var StyledIconButton = styled_default("button")(({
  theme,
  ownerState
}) => {
  var _theme$variants, _theme$variants2, _theme$variants3, _theme$variants4;
  return [_extends({
    "--Icon-margin": "initial",
    // reset the icon's margin.
    "--Icon-color": ownerState.color !== "neutral" || ownerState.variant === "solid" ? "currentColor" : theme.vars.palette.text.icon
  }, ownerState.instanceSize && {
    "--IconButton-size": {
      sm: "2rem",
      md: "2.25rem",
      lg: "2.75rem"
    }[ownerState.instanceSize]
  }, ownerState.size === "sm" && {
    "--Icon-fontSize": "calc(var(--IconButton-size, 2rem) / 1.6)",
    // 1.25rem by default
    "--CircularProgress-size": "20px",
    "--CircularProgress-thickness": "2px",
    minWidth: "var(--IconButton-size, 2rem)",
    // use min-width instead of height to make the button resilient to its content
    minHeight: "var(--IconButton-size, 2rem)",
    // use min-height instead of height to make the button resilient to its content
    fontSize: theme.vars.fontSize.sm,
    paddingInline: "2px"
    // add a gap, in case the content is long, for example multiple icons
  }, ownerState.size === "md" && {
    "--Icon-fontSize": "calc(var(--IconButton-size, 2.25rem) / 1.5)",
    // 1.5rem by default
    "--CircularProgress-size": "20px",
    "--CircularProgress-thickness": "2px",
    minWidth: "var(--IconButton-size, 2.25rem)",
    minHeight: "var(--IconButton-size, 2.25rem)",
    fontSize: theme.vars.fontSize.md,
    paddingInline: "0.25rem"
  }, ownerState.size === "lg" && {
    "--Icon-fontSize": "calc(var(--IconButton-size, 2.75rem) / 1.571)",
    // 1.75rem by default
    "--CircularProgress-size": "28px",
    "--CircularProgress-thickness": "4px",
    minWidth: "var(--IconButton-size, 2.75rem)",
    minHeight: "var(--IconButton-size, 2.75rem)",
    fontSize: theme.vars.fontSize.lg,
    paddingInline: "0.375rem"
  }, {
    WebkitTapHighlightColor: "transparent",
    paddingBlock: 0,
    fontFamily: theme.vars.fontFamily.body,
    fontWeight: theme.vars.fontWeight.md,
    margin: `var(--IconButton-margin)`,
    // to be controlled by other components, for example Input
    borderRadius: `var(--IconButton-radius, ${theme.vars.radius.sm})`,
    // to be controlled by other components, for example Input
    border: "none",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    [theme.focus.selector]: _extends({
      "--Icon-color": "currentColor"
    }, theme.focus.default)
  }), _extends({}, (_theme$variants = theme.variants[ownerState.variant]) == null ? void 0 : _theme$variants[ownerState.color], {
    "&:hover": {
      "@media (hover: hover)": _extends({
        "--Icon-color": "currentColor"
      }, (_theme$variants2 = theme.variants[`${ownerState.variant}Hover`]) == null ? void 0 : _theme$variants2[ownerState.color])
    },
    '&:active, &[aria-pressed="true"]': _extends({
      "--Icon-color": "currentColor"
    }, (_theme$variants3 = theme.variants[`${ownerState.variant}Active`]) == null ? void 0 : _theme$variants3[ownerState.color]),
    "&:disabled": (_theme$variants4 = theme.variants[`${ownerState.variant}Disabled`]) == null ? void 0 : _theme$variants4[ownerState.color]
  })];
});
var IconButtonRoot = styled_default(StyledIconButton, {
  name: "JoyIconButton",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({});
var ButtonLoading = styled_default("span", {
  name: "JoyIconButton",
  slot: "LoadingIndicator",
  overridesResolver: (props, styles2) => styles2.loadingIndicator
})(({
  theme,
  ownerState
}) => {
  var _theme$variants5, _theme$variants6;
  return _extends({
    display: "inherit",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    color: (_theme$variants5 = theme.variants[ownerState.variant]) == null || (_theme$variants5 = _theme$variants5[ownerState.color]) == null ? void 0 : _theme$variants5.color
  }, ownerState.disabled && {
    color: (_theme$variants6 = theme.variants[`${ownerState.variant}Disabled`]) == null || (_theme$variants6 = _theme$variants6[ownerState.color]) == null ? void 0 : _theme$variants6.color
  });
});
var IconButton = React80.forwardRef(function IconButton2(inProps, ref) {
  var _ref;
  const props = useThemeProps2({
    props: inProps,
    name: "JoyIconButton"
  });
  const {
    children,
    action,
    component = "button",
    color: colorProp = "neutral",
    disabled: disabledProp,
    variant: variantProp = "plain",
    loading = false,
    loadingIndicator: loadingIndicatorProp,
    size: sizeProp = "md",
    slots = {},
    slotProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded33);
  const buttonGroup = React80.useContext(ButtonGroupContext_default);
  const toggleButtonGroup = React80.useContext(ToggleButtonGroupContext_default);
  const variant = inProps.variant || buttonGroup.variant || variantProp;
  const size3 = inProps.size || buttonGroup.size || sizeProp;
  const color = inProps.color || buttonGroup.color || colorProp;
  const disabled = (_ref = inProps.loading || inProps.disabled) != null ? _ref : buttonGroup.disabled || loading || disabledProp;
  const buttonRef = React80.useRef(null);
  const handleRef = useForkRef(buttonRef, ref);
  const {
    focusVisible,
    setFocusVisible,
    getRootProps
  } = useButton(_extends({}, props, {
    disabled,
    rootRef: handleRef
  }));
  const loadingIndicator = loadingIndicatorProp != null ? loadingIndicatorProp : (0, import_jsx_runtime53.jsx)(CircularProgress_default, {
    color,
    thickness: {
      sm: 2,
      md: 3,
      lg: 4
    }[size3] || 3
  });
  React80.useImperativeHandle(action, () => ({
    focusVisible: () => {
      var _buttonRef$current;
      setFocusVisible(true);
      (_buttonRef$current = buttonRef.current) == null || _buttonRef$current.focus();
    }
  }), [setFocusVisible]);
  const ownerState = _extends({}, props, {
    component,
    color,
    disabled,
    variant,
    loading,
    size: size3,
    focusVisible,
    instanceSize: inProps.size
  });
  const classes = useUtilityClasses24(ownerState);
  const handleClick = (event) => {
    var _onClick;
    let onClick = props.onClick;
    if (typeof slotProps.root === "function") {
      onClick = slotProps.root(ownerState).onClick;
    } else if (slotProps.root) {
      onClick = slotProps.root.onClick;
    }
    (_onClick = onClick) == null || _onClick(event);
    if (toggleButtonGroup) {
      var _toggleButtonGroup$on;
      (_toggleButtonGroup$on = toggleButtonGroup.onClick) == null || _toggleButtonGroup$on.call(toggleButtonGroup, event, props.value);
    }
  };
  let ariaPressed = props["aria-pressed"];
  if (typeof slotProps.root === "function") {
    ariaPressed = slotProps.root(ownerState)["aria-pressed"];
  } else if (slotProps.root) {
    ariaPressed = slotProps.root["aria-pressed"];
  }
  if (toggleButtonGroup != null && toggleButtonGroup.value) {
    if (Array.isArray(toggleButtonGroup.value)) {
      ariaPressed = toggleButtonGroup.value.indexOf(props.value) !== -1;
    } else {
      ariaPressed = toggleButtonGroup.value === props.value;
    }
  }
  const externalForwardedProps = _extends({}, other, {
    component,
    slots,
    slotProps
  });
  const [SlotRoot, rootProps] = useSlot("root", {
    ref,
    className: classes.root,
    elementType: IconButtonRoot,
    getSlotProps: getRootProps,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      onClick: handleClick,
      "aria-pressed": ariaPressed
    }
  });
  const [SlotLoadingIndicator, loadingIndicatorProps] = useSlot("loadingIndicator", {
    className: classes.loadingIndicator,
    elementType: ButtonLoading,
    externalForwardedProps,
    ownerState
  });
  return (0, import_jsx_runtime53.jsx)(SlotRoot, _extends({}, rootProps, {
    children: loading ? (0, import_jsx_runtime53.jsx)(SlotLoadingIndicator, _extends({}, loadingIndicatorProps, {
      children: loadingIndicator
    })) : children
  }));
});
true ? IconButton.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.shape({
    current: import_prop_types32.default.shape({
      focusVisible: import_prop_types32.default.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  children: import_prop_types32.default.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["danger", "neutral", "primary", "success", "warning"]), import_prop_types32.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types32.default.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types32.default.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: import_prop_types32.default.string,
  /**
   * If `true`, the loading indicator is shown and the icon button becomes disabled.
   * @default false
   */
  loading: import_prop_types32.default.bool,
  /**
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress />
   */
  loadingIndicator: import_prop_types32.default.node,
  /**
   * @ignore
   */
  onClick: import_prop_types32.default.func,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["sm", "md", "lg"]), import_prop_types32.default.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types32.default.shape({
    loadingIndicator: import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object]),
    root: import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types32.default.shape({
    loadingIndicator: import_prop_types32.default.elementType,
    root: import_prop_types32.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
  /**
   * @default 0
   */
  tabIndex: import_prop_types32.default.number,
  /**
   * @ignore
   */
  value: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string), import_prop_types32.default.number, import_prop_types32.default.string]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["outlined", "plain", "soft", "solid"]), import_prop_types32.default.string])
} : void 0;
IconButton.muiName = "IconButton";
var IconButton_default = IconButton;

// node_modules/@mui/joy/ModalClose/modalCloseClasses.js
function getModalCloseUtilityClass(slot) {
  return generateUtilityClass3("MuiModalClose", slot);
}
var modalCloseClasses = generateUtilityClasses3("MuiModalClose", ["root", "colorPrimary", "colorNeutral", "colorDanger", "colorSuccess", "colorWarning", "colorContext", "variantPlain", "variantOutlined", "variantSoft", "variantSolid", "sizeSm", "sizeMd", "sizeLg"]);
var modalCloseClasses_default = modalCloseClasses;

// node_modules/@mui/joy/internal/svg-icons/Close.js
var React83 = __toESM(require_react());

// node_modules/@mui/joy/utils/createSvgIcon.js
init_extends();
var React82 = __toESM(require_react());

// node_modules/@mui/joy/SvgIcon/SvgIcon.js
init_objectWithoutPropertiesLoose();
init_extends();
init_esm();
init_clsx();
var import_prop_types33 = __toESM(require_prop_types());
var React81 = __toESM(require_react());

// node_modules/@mui/joy/SvgIcon/svgIconClasses.js
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass3("MuiSvgIcon", slot);
}
var svgIconClasses = generateUtilityClasses3("MuiSvgIcon", ["root", "colorInherit", "colorPrimary", "colorNeutral", "colorDanger", "colorSuccess", "colorWarning", "fontSizeInherit", "fontSizeXs", "fontSizeSm", "fontSizeMd", "fontSizeLg", "fontSizeXl", "fontSizeXl2", "fontSizeXl3", "fontSizeXl4", "sizeSm", "sizeMd", "sizeLg"]);
var svgIconClasses_default = svgIconClasses;

// node_modules/@mui/joy/SvgIcon/SvgIcon.js
var import_jsx_runtime54 = __toESM(require_jsx_runtime());
var import_jsx_runtime55 = __toESM(require_jsx_runtime());
var _excluded34 = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox", "size", "slots", "slotProps"];
var useUtilityClasses25 = (ownerState) => {
  const {
    color,
    size: size3,
    fontSize
  } = ownerState;
  const slots = {
    root: ["root", color && color !== "inherit" && `color${capitalize(color)}`, size3 && `size${capitalize(size3)}`, fontSize && `fontSize${capitalize(fontSize)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, {});
};
var sizeMap = {
  sm: "xl",
  md: "xl2",
  lg: "xl3"
};
var SvgIconRoot = styled_default("svg", {
  name: "JoySvgIcon",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})(({
  theme,
  ownerState
}) => {
  var _theme$vars$palette;
  return _extends({}, ownerState.instanceSize && {
    "--Icon-fontSize": theme.vars.fontSize[sizeMap[ownerState.instanceSize]]
  }, ownerState.instanceFontSize && ownerState.instanceFontSize !== "inherit" && {
    "--Icon-fontSize": theme.vars.fontSize[ownerState.instanceFontSize]
  }, {
    userSelect: "none",
    margin: "var(--Icon-margin)",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // for example heroicons uses fill="none" and stroke="currentColor"
    fill: ownerState.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    fontSize: `var(--Icon-fontSize, ${theme.vars.fontSize[sizeMap[ownerState.size]] || "unset"})`
  }, ownerState.fontSize && ownerState.fontSize !== "inherit" && {
    fontSize: `var(--Icon-fontSize, ${theme.fontSize[ownerState.fontSize]})`
  }, !ownerState.htmlColor && _extends({
    color: `var(--Icon-color, ${theme.vars.palette.text.icon})`
  }, ownerState.color === "inherit" && {
    color: "inherit"
  }, ownerState.color !== "inherit" && theme.vars.palette[ownerState.color] && {
    color: `rgba(${(_theme$vars$palette = theme.vars.palette[ownerState.color]) == null ? void 0 : _theme$vars$palette.mainChannel} / 1)`
  }));
});
var SvgIcon = React81.forwardRef(function SvgIcon2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "JoySvgIcon"
  });
  const {
    children,
    className,
    color,
    component = "svg",
    fontSize,
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = "0 0 24 24",
    size: size3 = "md",
    slots = {},
    slotProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded34);
  const hasSvgAsChild = React81.isValidElement(children) && children.type === "svg";
  const ownerState = _extends({}, props, {
    color,
    component,
    size: size3,
    instanceSize: inProps.size,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox,
    hasSvgAsChild
  });
  const classes = useUtilityClasses25(ownerState);
  const externalForwardedProps = _extends({}, other, {
    component,
    slots,
    slotProps
  });
  const [SlotRoot, rootProps] = useSlot("root", {
    ref,
    className: clsx_default(classes.root, className),
    elementType: SvgIconRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: _extends({
      color: htmlColor,
      focusable: false
    }, titleAccess && {
      role: "img"
    }, !titleAccess && {
      "aria-hidden": true
    }, !inheritViewBox && {
      viewBox
    }, hasSvgAsChild && children.props)
  });
  return (0, import_jsx_runtime55.jsxs)(SlotRoot, _extends({}, rootProps, {
    children: [hasSvgAsChild ? children.props.children : children, titleAccess ? (0, import_jsx_runtime54.jsx)("title", {
      children: titleAccess
    }) : null]
  }));
});
true ? SvgIcon.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: import_prop_types33.default.node,
  /**
   * @ignore
   */
  className: import_prop_types33.default.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   */
  color: import_prop_types33.default.oneOfType([import_prop_types33.default.oneOf(["danger", "inherit", "neutral", "primary", "success", "warning"]), import_prop_types33.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types33.default.elementType,
  /**
   * The theme's fontSize applied to the icon that will override the `size` prop.
   * Use this prop when you want to use a specific font-size from the theme.
   */
  fontSize: import_prop_types33.default.oneOfType([import_prop_types33.default.oneOf(["inherit", "lg", "md", "sm", "xl", "xl2", "xl3", "xl4", "xs"]), import_prop_types33.default.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: import_prop_types33.default.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: import_prop_types33.default.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: import_prop_types33.default.string,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: import_prop_types33.default.oneOfType([import_prop_types33.default.oneOf(["sm", "md", "lg"]), import_prop_types33.default.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types33.default.shape({
    root: import_prop_types33.default.oneOfType([import_prop_types33.default.func, import_prop_types33.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types33.default.shape({
    root: import_prop_types33.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types33.default.oneOfType([import_prop_types33.default.arrayOf(import_prop_types33.default.oneOfType([import_prop_types33.default.func, import_prop_types33.default.object, import_prop_types33.default.bool])), import_prop_types33.default.func, import_prop_types33.default.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: import_prop_types33.default.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: import_prop_types33.default.string
} : void 0;
var SvgIcon_default = SvgIcon;

// node_modules/@mui/joy/utils/createSvgIcon.js
var import_jsx_runtime56 = __toESM(require_jsx_runtime());
function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return (0, import_jsx_runtime56.jsx)(SvgIcon_default, _extends({
      "data-testid": `${displayName}Icon`,
      ref
    }, props, {
      children: path
    }));
  }
  if (true) {
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon_default.muiName;
  return React82.memo(React82.forwardRef(Component));
}

// node_modules/@mui/joy/internal/svg-icons/Close.js
var import_jsx_runtime57 = __toESM(require_jsx_runtime());
var Close_default = createSvgIcon((0, import_jsx_runtime57.jsx)("path", {
  d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close");

// node_modules/@mui/joy/Modal/CloseModalContext.js
var React84 = __toESM(require_react());
var CloseModalContext = React84.createContext(void 0);
if (true) {
  CloseModalContext.displayName = "CloseModalContext";
}
var CloseModalContext_default = CloseModalContext;

// node_modules/@mui/joy/ModalDialog/ModalDialogSizeContext.js
var React85 = __toESM(require_react());
var ModalDialogSizeContext = React85.createContext(void 0);
if (true) {
  ModalDialogSizeContext.displayName = "ModalDialogSizeContext";
}
var ModalDialogSizeContext_default = ModalDialogSizeContext;

// node_modules/@mui/joy/ModalDialog/ModalDialogVariantColorContext.js
var React86 = __toESM(require_react());
var ModalDialogVariantColorContext = React86.createContext(void 0);
if (true) {
  ModalDialogVariantColorContext.displayName = "ModalDialogVariantColorContext";
}
var ModalDialogVariantColorContext_default = ModalDialogVariantColorContext;

// node_modules/@mui/joy/ModalClose/ModalClose.js
var import_jsx_runtime58 = __toESM(require_jsx_runtime());
var _CloseIcon;
var _excluded35 = ["component", "color", "variant", "size", "onClick", "slots", "slotProps"];
var useUtilityClasses26 = (ownerState) => {
  const {
    variant,
    color,
    disabled,
    focusVisible,
    size: size3
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", variant && `variant${capitalize(variant)}`, color && `color${capitalize(color)}`, size3 && `size${capitalize(size3)}`]
  };
  return composeClasses(slots, getModalCloseUtilityClass, {});
};
var ModalCloseRoot = styled_default(StyledIconButton, {
  name: "JoyModalClose",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})(({
  ownerState,
  theme
}) => {
  var _theme$variants;
  return _extends({}, ownerState.size === "sm" && {
    "--IconButton-size": "1.75rem"
  }, ownerState.size === "md" && {
    "--IconButton-size": "2rem"
  }, ownerState.size === "lg" && {
    "--IconButton-size": "2.25rem"
  }, {
    position: "absolute",
    zIndex: 1,
    // stay on top of the title in case it is positioned relatively
    top: `var(--ModalClose-inset, 0.625rem)`,
    right: `var(--ModalClose-inset, 0.625rem)`,
    borderRadius: `var(--ModalClose-radius, ${theme.vars.radius.sm})`
  }, !((_theme$variants = theme.variants[ownerState.variant]) != null && (_theme$variants = _theme$variants[ownerState.color]) != null && _theme$variants.backgroundColor) && {
    color: theme.vars.palette.text.secondary
  });
});
var modalDialogVariantMapping = {
  plain: "plain",
  outlined: "plain",
  soft: "soft",
  solid: "solid"
};
var ModalClose = React87.forwardRef(function ModalClose2(inProps, ref) {
  var _ref, _inProps$variant, _ref2, _inProps$color, _ref3, _inProps$size;
  const props = useThemeProps2({
    props: inProps,
    name: "JoyModalClose"
  });
  const {
    component = "button",
    color: colorProp = "neutral",
    variant: variantProp = "plain",
    size: sizeProp = "md",
    onClick,
    slots = {},
    slotProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded35);
  const closeModalContext = React87.useContext(CloseModalContext_default);
  const modalDialogVariantColor = React87.useContext(ModalDialogVariantColorContext_default);
  const variant = (_ref = (_inProps$variant = inProps.variant) != null ? _inProps$variant : modalDialogVariantMapping[modalDialogVariantColor == null ? void 0 : modalDialogVariantColor.variant]) != null ? _ref : variantProp;
  const color = (_ref2 = (_inProps$color = inProps.color) != null ? _inProps$color : modalDialogVariantColor == null ? void 0 : modalDialogVariantColor.color) != null ? _ref2 : colorProp;
  const modalDialogSize = React87.useContext(ModalDialogSizeContext_default);
  const size3 = (_ref3 = (_inProps$size = inProps.size) != null ? _inProps$size : modalDialogSize) != null ? _ref3 : sizeProp;
  const {
    focusVisible,
    getRootProps
  } = useButton(_extends({}, props, {
    rootRef: ref
  }));
  const ownerState = _extends({}, props, {
    color,
    component,
    variant,
    size: size3,
    focusVisible
  });
  const classes = useUtilityClasses26(ownerState);
  const [SlotRoot, rootProps] = useSlot("root", {
    ref,
    elementType: ModalCloseRoot,
    getSlotProps: getRootProps,
    externalForwardedProps: _extends({
      onClick: (event) => {
        closeModalContext == null || closeModalContext(event, "closeClick");
        onClick == null || onClick(event);
      }
    }, other, {
      component,
      slots,
      slotProps
    }),
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime58.jsx)(SlotRoot, _extends({}, rootProps, {
    children: _CloseIcon || (_CloseIcon = (0, import_jsx_runtime58.jsx)(Close_default, {}))
  }));
});
true ? ModalClose.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types34.default.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: import_prop_types34.default.oneOfType([import_prop_types34.default.oneOf(["danger", "neutral", "primary", "success", "warning"]), import_prop_types34.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types34.default.elementType,
  /**
   * @ignore
   */
  onClick: import_prop_types34.default.func,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: import_prop_types34.default.oneOfType([import_prop_types34.default.oneOf(["sm", "md", "lg"]), import_prop_types34.default.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types34.default.shape({
    root: import_prop_types34.default.oneOfType([import_prop_types34.default.func, import_prop_types34.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types34.default.shape({
    root: import_prop_types34.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types34.default.oneOfType([import_prop_types34.default.arrayOf(import_prop_types34.default.oneOfType([import_prop_types34.default.func, import_prop_types34.default.object, import_prop_types34.default.bool])), import_prop_types34.default.func, import_prop_types34.default.object]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: import_prop_types34.default.oneOfType([import_prop_types34.default.oneOf(["outlined", "plain", "soft", "solid"]), import_prop_types34.default.string])
} : void 0;
var ModalClose_default = ModalClose;

export {
  colors_default,
  identifier_default,
  shouldSkipGeneratingVar,
  generateUtilityClass3 as generateUtilityClass,
  generateUtilityClasses3 as generateUtilityClasses,
  createGetCssVar2 as createGetCssVar,
  extendTheme,
  defaultTheme_default,
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript,
  styled_default,
  useTheme,
  ThemeProvider,
  useThemeProps2 as useThemeProps,
  isHostComponent,
  useSlotProps,
  useButton,
  ClickAwayListener,
  Dropdown,
  FocusTrap,
  useInput,
  ListActionTypes,
  ListContext,
  useMenu,
  MenuProvider,
  Portal,
  useMenuButton,
  useMenuItem,
  useMenuItemContextStabilizer,
  useModal,
  useOption,
  useOptionContextStabilizer,
  Popper,
  useSelect,
  SelectProvider,
  valueToPercent,
  useSlider,
  useSnackbar,
  useSwitch,
  useTabs,
  useTabsContext,
  TabsProvider,
  useTabPanel,
  useTabsList,
  TabsListProvider,
  useTab,
  TextareaAutosize,
  createFilterOptions,
  useAutocomplete,
  useSlot,
  getSvgIconUtilityClass,
  svgIconClasses_default,
  SvgIcon_default,
  createSvgIcon,
  Close_default,
  getIconButtonUtilityClass,
  iconButtonClasses_default,
  ButtonGroupContext_default,
  ToggleButtonGroupContext_default,
  getCircularProgressUtilityClass,
  circularProgressClasses_default,
  CircularProgress_default,
  StyledIconButton,
  IconButton_default,
  ModalDialogVariantColorContext_default,
  ModalDialogSizeContext_default,
  CloseModalContext_default,
  getModalCloseUtilityClass,
  modalCloseClasses_default,
  ModalClose_default
};
/*! Bundled license information:

@mui/base/index.js:
  (**
   * @mui/base v5.0.0-beta.40
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-HP5DGVQB.js.map
