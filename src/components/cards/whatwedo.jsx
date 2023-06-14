import React from "react";

const WhatWeDo  = () => {
    return(
        <div>
        <section id="what-we-do" className="what-we-do">
                    <div className="container">

                        <div className="section-title">
                        <h2>What We Do</h2>
                        <p className="p-2">We provide the most secure farmers to customers platform</p>
                        </div>

                        <div className="row">
                        <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                            <div className="icon-box">
                            <div style={{backgroundColor:'#13591C'}} className="icon"><i style={{color:'#25E94E'}} className="fas fa-hand-holding-usd fa-2x"></i></div>
                            <p>We give farmers direct access to the market</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                            <div className="icon-box">
                            <div style={{backgroundColor:'#13591C'}} className="icon"><i style={{color:'#25E94E'}} className="fas fa-handshake fa-2x"></i></div>
                            <p>We provide chain between farmers and small sized enterprises</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                            <div className="icon-box">
                            <div style={{backgroundColor:'#13591C'}} className="icon"><i style={{color:'#25E94E'}} className="fas fa-shield-alt fa-2x"></i></div>
                            <p>We provide a secure payment mechanism</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex align-items-stretch text-align-left mt-4 mt-lg-0">
                            <div className="icon-box">
                            <div style={{backgroundColor:'#13591C'}} className="icon"><i style={{color:'#25E94E'}} className="fas fa-train fa-2x"></i></div>
                            <p>We provide video and audio supported training for farmers and SSE</p>
                            </div>
                        </div>

                        </div>

                    </div>
        </section>
        </div>
    );

};

export default WhatWeDo;