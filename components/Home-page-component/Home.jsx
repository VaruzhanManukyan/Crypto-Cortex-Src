import React, { useEffect } from "react";

import sliderImage from "../../assets/images/slider-img.webp";
import s1 from "../../assets/images/s1.webp";
import s2 from "../../assets/images/s2.webp";
import s3 from "../../assets/images/s3.webp";
import aboutImage from "../../assets/images/about-img.webp";
import { Link } from "react-router-dom";

const Home = React.memo(() => {

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div>
            <div className="hero_area">
                <div className="home-page">

                    <div className="hero_bg_box">
                        <div className="bg_img_box">
                        </div>
                    </div>
                    <section className="slider_section">
                        <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="container ">
                                        <div className="row">
                                            <div className="col-md-6 ">
                                                <div className="detail-box">
                                                    <h1>
                                                        Welcome to Crypto Cortex
                                                    </h1>
                                                    <p>
                                                        Our service provides a simple and secure way to protect your
                                                        confidential information. Whether you're sending a private
                                                        message to a friend or need to protect important data, our tool
                                                        will provide reliable protection
                                                    </p>
                                                    <div className="btn-box">
                                                        <Link to="/encryption" className="btn1"
                                                            style={{ textDecoration: "none" }}>
                                                            Encrypt
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="img-box">
                                                    <img className="img-home" style={{ userSelect: "none" }}
                                                        src={sliderImage} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <section className="service_section layout_padding">
                    <div className="service_container">
                        <div className="container ">
                            <div className="heading_container heading_center our-style">
                                <h2>
                                    Our <span>Services</span>
                                </h2>
                                <p>
                                    Welcome to our encryption and decryption services! We provide a range of tools and
                                    solutions to ensure the security and privacy of your sensitive information. Whether
                                    you're an individual looking to protect personal messages or a business safeguarding
                                    critical data, we've got you covered.
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-md-4 ">
                                    <div className="box " style={{ backgroundColor: "#00204a", color: "white" }}>
                                        <div className="img-box">
                                            <img src={s1} alt="" />
                                        </div>
                                        <div className="detail-box">
                                            <h5>
                                                Encryption Services
                                            </h5>
                                            <p>
                                                Securely encode your messages with the latest encryption algorithms.
                                                Simply input your text and select your preferred encryption method, and
                                                our service will swiftly transform it into an unreadable cipher,
                                                ensuring confidentiality during transmission.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="box" style={{ backgroundColor: "#00204a", color: "white" }}>
                                        <div className="img-box">
                                            <img src={s2} alt="" />
                                        </div>
                                        <div className="detail-box">
                                            <h5>
                                                Security
                                            </h5>
                                            <p>
                                                We prioritize the highest standards of security to safeguard your
                                                information. Our encryption and decryption processes are designed to
                                                withstand modern cyber threats, ensuring that your data remains
                                                confidential.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="box " style={{ backgroundColor: "#00204a", color: "white" }}>
                                        <div className="img-box">
                                            <img src={s3} alt="" />
                                        </div>
                                        <div className="detail-box">
                                            <h5>
                                                Text Decryption
                                            </h5>
                                            <p>
                                                Easily decrypt encrypted messages using the corresponding decryption
                                                key. Input the cipher text and the decryption key, and our service will
                                                seamlessly restore the original text, maintaining the integrity of your
                                                communication.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about_section layout_padding" style={{ padding: "10px" }}>
                    <div className="container  ">
                        <div className="heading_container heading_center">
                            <h2>
                                About <span style={{ color: "#00bbf0" }}>Us</span>
                            </h2>
                            <p>
                                Welcome to Crypto Cortex, your ideal place for secure data transfer. We specialize in encryption and decryption services, ensuring the privacy and protection of your sensitive information. With the latest algorithms and robust security measures, we provide peace of mind in an ever-evolving world. digital landscape. Join us in protecting your communications today
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="img-box">
                                    <img src={aboutImage} style={{ userSelect: "none" }} alt="" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="detail-box">
                                    <h3>
                                        Why choose us?
                                    </h3>
                                    <p>
                                        Ease of Use: Our service is designed with user convenience in mind. Just enter
                                        text, select an encryption method, and you will receive the encrypted result
                                        instantly.
                                    </p>
                                    <p>
                                        Security: We maintain high security standards to ensure that your information
                                        remains secure. Multiple Encryption
                                    </p>
                                    <p>
                                        Methods: We offer a wide range of encryption methods so you
                                        can choose the one that best suits your needs.
                                    </p>
                                    <p>
                                        Protect your sensitive information with our simple and secure text encryption
                                        and decryption service. Start using it right now and keep your data safe!
                                    </p>
                                    <Link to="/decryption" style={{ textDecoration: "none" }}>
                                        Decrypt
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});

export default Home;