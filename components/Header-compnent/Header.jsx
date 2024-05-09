import React, {useState, useEffect} from "react";
import lockImage from "../../assets/images/lock.webp";
import {Link} from "react-router-dom";

const Header = React.memo(() => {
    const [manuButton, manuButtonChange] = useState("");
    const [navBar, navBarChange] = useState("");
    const [blockBackground, blockBackgroundChange] = useState("");
    const [scroll, setScroll] = React.useState(0);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    const handleScroll = () => {
      setScroll(window.scrollY);
    };
  
    const handleUpButton = () => {
      window.scrollTo(0, scroll);
    };

    const handleMenuButtonClick = () => {
        if (!manuButton){
            manuButtonChange("open");
            navBarChange("nav-active");
            blockBackgroundChange("block-open-nav-bar");
            handleUpButton();
            return;
        }
        manuButtonChange("");
        navBarChange("");
        blockBackgroundChange("");
    };

    return (
        <nav>
            <div className="navbar-block">
                <div className="block-header">
                    <img className="logo-block" src={lockImage}/>
                </div>
            </div>
            <div className={"manu-button " + manuButton} onClick={handleMenuButtonClick}>
                <div className="manu-button-elements-top"></div>
                <div className="manu-button-elements"></div>
                <div className="manu-button-elements-bottom"></div>
            </div>
            <div className={"block-close-nav-bar " + blockBackground} onClick={handleMenuButtonClick}></div>
            <div className={"nav-links " + navBar}>
                <div className="nav-links-bar">
                    <div className="nav-links-block">
                        <li className="nav-link">
                            <Link style={{color: "white"}} to={"/"} onClick={handleMenuButtonClick}>Home</Link>
                        </li>
                        <li className="nav-link">
                            <Link style={{color: "white"}} to={"/encryption"} onClick={handleMenuButtonClick}>Encrypt</Link>
                        </li>
                        <li className="nav-link">
                            <Link style={{color: "white"}} to={"/decryption"} onClick={handleMenuButtonClick}>Decrypt</Link>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    );
})

export default Header;