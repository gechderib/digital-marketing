import React from "react";

const WhatWeDo = () => {
  return (
    <div>
      <section id="what-we-do" className="what-we-do">
        <div className="">
          <div className="section-title">
            <h2>What We Do</h2>
            <p className="p-2">
              We provide the most secure farmers to customers platform
            </p>
          </div>

          <div className="flex gap-7 px-5">
            <div clas>
              <div className="icon-box">
                <div style={{ backgroundColor: "#13591C" }} className="icon">
                  <i
                    style={{ color: "#25E94E" }}
                    className="fas fa-hand-holding-usd fa-2x"
                  ></i>
                </div>
                <p>We give farmers direct access to the market</p>
              </div>
            </div>

            <div className="">
              <div className="icon-box">
                <div style={{ backgroundColor: "#13591C" }} className="icon">
                  <i
                    style={{ color: "#25E94E" }}
                    className="fas fa-handshake fa-2x"
                  ></i>
                </div>
                <p>
                  We provide chain between farmers and small sized enterprises
                </p>
              </div>
            </div>

            <div className="">
              <div className="icon-box">
                <div style={{ backgroundColor: "#13591C" }} className="icon">
                  <i
                    style={{ color: "#25E94E" }}
                    className="fas fa-shield-alt fa-2x"
                  ></i>
                </div>
                <p>We provide a secure payment mechanism</p>
              </div>
            </div>

            <div className="">
              <div className="icon-box">
                <div style={{ backgroundColor: "#13591C" }} className="icon">
                  <i
                    style={{ color: "#25E94E" }}
                    className="fas fa-train fa-2x"
                  ></i>
                </div>
                <p>
                  We provide video and audio supported training for farmers and
                  SSE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDo;
