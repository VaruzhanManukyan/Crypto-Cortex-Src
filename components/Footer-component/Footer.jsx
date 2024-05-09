import React from "react";
import {Link} from "react-router-dom";

const Footer = React.memo(() => {
    return (
        <section className="info_section layout_padding2">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-3 info_col">
                        <div className="info_contact">
                            <h4>
                                Address
                            </h4>
                            <div className="contact_link_box">
                                <a href="" style={{textDecoration: "none"}}>
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    <span>Location</span>
                                </a>
                                <a href="" style={{textDecoration: "none"}}>
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                    <span>Call +01 1234567890</span>
                                </a>
                                <a href="" style={{textDecoration: "none"}}>
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                    <span>demo@gmail.com</span>
                                </a>
                            </div>
                        </div>
                        <div className="info_social">
                            <a href="">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                            <a href="">
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                            <a href="">
                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                            </a>
                            <a href="">
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 info_col">
                        <div className="info_detail">
                            <h4>
                                Info
                            </h4>
                            <p>
                                "Welcome to Crypto Cortex, where we offer state-of-the-art encryption and decryption services for your data security needs.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-2 mx-auto info_col">
                        <div className="info_link_box">
                            <h4>
                                Links
                            </h4>
                            <div className="info_links">
                                <Link className="active" to={"/"} href="index.html" style={{textDecoration: "none"}}>
                                    Home
                                </Link>
                                <Link className="" to={"/encryption"} style={{textDecoration: "none"}}>
                                    Encrypt
                                </Link>
                                <Link className="" to={"/decryption"} style={{textDecoration: "none"}}>
                                    Decrypt
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
})

export default Footer;