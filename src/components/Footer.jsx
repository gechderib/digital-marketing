import React from 'react';

const Footer = () => {
  return (
    
<footer>
<section id="contact" className="contact section-bg">
                    <div className="container">

                        <div className="section-title">
                        <h2>Contact</h2>
                        </div>

                        <div className="row mt-5 justify-content-center">

                        <div className="col-lg-10">

                            <div className="info-wrap">
                            <div className="row">
                                <div className="col-lg-4 info">
                                <i style={{color:'#25E94E', backgroundColor:'#13591C'}} className="bi bi-geo-alt"></i>
                                <h4>Location:</h4>
                                <p>Addis Ababa<br />Ethiopia, Addis Ababa</p>
                                </div>

                                <div className="col-lg-4 info mt-4 mt-lg-0">
                                <i style={{color:'#25E94E', backgroundColor:'#13591C'}} className="bi bi-envelope"></i>
                                <h4>Email:</h4>
                                <p>info@example.com<br />contact@example.com</p>
                                </div>

                                <div className="col-lg-4 info mt-4 mt-lg-0">
                                <i style={{color:'#25E94E', backgroundColor:'#13591C'}} className="bi bi-phone"></i>
                                <h4>Call:</h4>
                                <p>+251 974-89-60-74<br />+251 974-89-60-74</p>
                                </div>
                            </div>
                            </div>

                        </div>

                        </div>

                        <div className="row mt-5 justify-content-center">
                        <div className="col-lg-10">
                            <form action="forms/contact.php" method="post" className="php-email-form">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                            </div>
                            <div className="form-group mt-3">
                                <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                            </div>
                            {/*<div className="my-3">
                                <div className="loading">Loading</div>
                                <div className="error-message"></div>
                                <div className="sent-message">Your message has been sent. Thank you!</div>
                            </div> */}
                            <div className="text-center"><button style={{backgroundColor:'#13591C'}} type="submit">Send Message</button></div>
                            </form>
                        </div>

                        </div>

                    </div>
               
    <hr className="my-6 border-blueGray-300"></hr>
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Copyright © <span id="get-current-year">2021</span>
          <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank"> owned by</a>
          <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800"> G8 team</a>.
        </div>
      </div>
    </div>
  
</section>
</footer>
  )
}

export default Footer