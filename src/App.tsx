import { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "react-query";
import queryClient from "./services/queryClient";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./store";
import PageFallback from "./components/UI/PageFallback";
import Router from "./router";
import { TranslationProvider } from "./components/TranslationProvider";
import "./i18next";

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <div className="app" id="app">
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <BrowserRouter>
                <TranslationProvider>
                  <Router />
                </TranslationProvider>
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </div>
    </Suspense>
  );
}

export default App;
