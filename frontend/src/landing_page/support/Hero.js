import React from "react";

function Hero() {
  return (
    <section className="container-fluid " id="supportHero">
      <div className="px-5 pt-5" id="supportWrapper" >
        <h4 className="mt-3">Support Portal</h4>
        <a href="" className="mt-3">Track Tickets</a>
      </div>
      <div className="row p-5 m-3 ">
        <div className="col-6 p-3">
          <h1 className="fs-3 ">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <br/>
          <input placeholder="Eg. how do I activate F&O" />
          <br />
          <br/>
          <a href="">Track account opening</a> &nbsp;&nbsp;&nbsp;
          <a href="">Track segment activation</a>&nbsp;&nbsp;&nbsp;
          <a href="">Intraday margins</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="">Kite user manual</a>
        </div>
        <div className="col-6 p-3">
          <h1 className="fs-3">Featured</h1>
          <ol>
            <li>
              <a href="">Current Takeovers and Delisting - January 2024</a>
            </li>
            <br/>
            <li>
              <a href="">Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
