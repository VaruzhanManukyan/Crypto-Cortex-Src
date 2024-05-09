import React, {useEffect} from "react";

export const Preloader = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="preloader-block">
            <div className="loader"></div>
        </div>
    );
}
