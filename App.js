import './App.css';
import React, {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./redux/redux-store";
import Header from "./components/Header-compnent/Header";
import Home from "./components/Home-page-component/Home";
import Footer from "./components/Footer-component/Footer";
import {Preloader} from "./common/Preloader/Preloader";

const Encryption = lazy(() => import("./components/Encryption-page-component/Encryption"));
const Description = lazy (() => import("./components/Description-page-component/Decryption"));

function App() {
    return (
        <div>
            <Header></Header>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={
                            <Home />
                        }/>
                    <Route path="/encryption" element={
                        <Suspense fallback={<Preloader />}>
                            <Encryption />
                        </Suspense>
                    }/>
                    <Route path="/decryption" element={
                        <Suspense fallback={<Preloader />}>
                            <Description />
                        </Suspense>
                    }/>
                </Routes>
            </Provider>
            <Footer></Footer>
        </div>
    );
}

export default App;
