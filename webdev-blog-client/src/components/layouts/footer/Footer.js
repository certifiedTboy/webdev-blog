import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

const Footer = () => {
  return (
    <AnimationOnScroll
      animateIn="animate__fadeInUp"
      className="footer wow fadeIn"
      data-wow-delay="0.3s"
    >
      <div className="container-fluid" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <h2 style={{ color: "white" }}>WebDev Blog</h2>
              <div>
                <p>Contacts</p>
              </div>
            </div>
            <div className="col-4">
              <div className="footer-info">
                <p style={{ color: "white", fontWeight: "500" }}>Founder :</p>
                <h2>Adebisi Tosin</h2>
                <div className="footer-social">
                  <a
                    href="https://twitter.com/Certified_Tboy1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>

                  <a
                    href="https://web.facebook.com/infiniteIdeas12"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="https://web.facebook.com/infiniteIdeas12"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-facebook-messenger"></i>
                  </a>
                  <a
                    href="https://linkedin.com/in/emmanuel-tosin-817257149"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href="https://wa.me/+2347018810562"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container copyright"></div>
      </div>
    </AnimationOnScroll>
  );
};

export default Footer;
