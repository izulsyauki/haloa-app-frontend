import {
  Devtools,
  PiPProvider,
  QueryDevtoolsContext,
  THEME_PREFERENCE,
  ThemeContext,
  createLocalStorage
} from "./chunk-OZSIV77O.js";
import {
  createComponent,
  createMemo,
  getPreferredColorScheme
} from "./chunk-YEMS42GQ.js";
import "./chunk-4B2QHNJT.js";

// node_modules/@tanstack/query-devtools/build/DevtoolsComponent/H3J5RHJ6.js
var DevtoolsComponent = (props) => {
  const [localStore, setLocalStore] = createLocalStorage({
    prefix: "TanstackQueryDevtools"
  });
  const colorScheme = getPreferredColorScheme();
  const theme = createMemo(() => {
    const preference = localStore.theme_preference || THEME_PREFERENCE;
    if (preference !== "system")
      return preference;
    return colorScheme();
  });
  return createComponent(QueryDevtoolsContext.Provider, {
    value: props,
    get children() {
      return createComponent(PiPProvider, {
        localStore,
        setLocalStore,
        get children() {
          return createComponent(ThemeContext.Provider, {
            value: theme,
            get children() {
              return createComponent(Devtools, {
                localStore,
                setLocalStore
              });
            }
          });
        }
      });
    }
  });
};
var DevtoolsComponent_default = DevtoolsComponent;
export {
  DevtoolsComponent_default as default
};
//# sourceMappingURL=H3J5RHJ6-PUTKFUUS.js.map
