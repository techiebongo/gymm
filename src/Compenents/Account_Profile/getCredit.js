/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import '../../Utils/style.css';
import axios from "axios";
import Api from "../../Url";
import "../../Utils/profileSection_style.css";
import Modal from "react-bootstrap/Modal";
import { Close } from "react-bytesize-icons";
import Payment_information from "../../Compenents/Comman/Payment_information";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import Loader from '../Comman/loader';

class GetCredit extends React.Component {
  state = {
    modalIsOpen: false,
    SigninModalIsOpen: false,
    // User: user,
    // OwlCarousel_items: 2,
    creditsData: [],
    price: 0,
    credit: 0,
    scrollPage: "",
    loader: false,
  };

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  componentDidMount = async () => {
    this.getCreditList();
  };

  getCreditList = () => {
    this.loaderHandler();
    axios
      .get(`${Api.API_URL}/list-credit`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("Credits", res);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data.docs;
          // console.log("Credit List response data", responseData);
          this.setState({ creditsData: responseData });
          this.loaderHandler();
        } else {
          console.log("credits Info  " + res.data.response_message);
          this.loaderHandler();
        }
      })
      .catch((error) => {
        console.error(error);
        this.loaderHandler();
      });
  };

  openModal = (price, credit, freeCredit, id) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    let creditId = { creditId: id };
    localStorage.setItem("creditId", JSON.stringify(creditId));
    user
      ? user.authtoken
        ? this.setState({ modalIsOpen: true, price, credit: freeCredit + credit })
        : this.setState({ SigninModalIsOpen: true })
      : this.setState({ SigninModalIsOpen: true });
  };
  modalHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <div id="dashbord-user-get-credits_now">
          <div className="row">
            <div className="col-lg-11 mx-auto">
              <h3>Get Credits Now</h3>

              {this.state.creditsData &&
                this.state.creditsData.map((creditItem, creditIndex) => (
                  <a 
                  key={creditIndex}
                  onClick={() =>
                    this.openModal(
                      creditItem.price,
                      creditItem.credit,
                      creditItem.free_credit,
                      creditItem._id
                    )
                  }
                  style={{cursor: 'pointer',display:'flex',justifyContent:'center',alignItems:'center'}}
                  >
                    <div className="row" id="get-credits-now-b">
                      <div className="col-lg-3 col-3 vl">
                        <h2>${creditItem.price}</h2>
                      </div>
                      <div className="col-lg-8 col-7 mt-1">
                        <h4>{creditItem.name}</h4>
                        <h5>
                          {creditItem.credit} credits 
                          {creditItem.free_credit? (<> and free {creditItem.free_credit} 
                          {creditItem.free_credit <= 1 ? " credit" : " credits"}</>)
                          :null}
                        </h5>
                      </div>
                      <div className="col-lg-1 col-2">
                        <h6>
                          {" "}
                          {">"}{" "}
                        </h6>
                      </div>
                    </div>
                  </a>
                ))}

              {/* <a href="#">
                  <div class="row" id="get-credits-now-b">
                    <div class="col-lg-2 col-3 vl">
                      <h2>$50</h2>
                    </div>
                    <div class="col-lg-9 col-7">
                      <h4>$100 Credits</h4>
                      <h5>Free $20 bonas credits</h5>
                    </div>
                    <div class="col-lg-1 col-2">
                      <h6> {'>'} </h6>
                    </div>
                  </div>
                  </a>

                  
                  <a href="#">
                  <div class="row" id="get-credits-now-b">
                    <div class="col-lg-2 col-3 vl">
                      <h2>$25</h2>
                    </div>
                    <div class="col-lg-9 col-7">
                      <h4>$50 Credits</h4>
                      <h5>Free $20 bonas credits</h5>
                    </div>
                    <div class="col-lg-1 col-2">
                      <h6> {'>'} </h6>
                    </div>
                  </div>
                  </a>


                    
                  <a href="#">
                  <div class="row" id="get-credits-now-b">
                    <div class="col-lg-2 col-3 vl">
                      <h2>$25</h2>
                    </div>
                    <div class="col-lg-9 col-7">
                      <h4>$50 Credits</h4>
                      <h5>Free $20 bonas credits</h5>
                    </div>
                    <div class="col-lg-1 col-2">
                      <h6> {'>'} </h6>
                    </div>
                  </div>
                  </a> */}
            </div>
          </div>
        </div>

        {/* Modal view */}
        <div>
          <Modal show={this.state.modalIsOpen} dialogClassName="modal-90w">
            <div
              onClick={() => this.setState({ modalIsOpen: false })}
              style={{ width: "100%", textAlign: "right", padding: 25 }}
            >
              <Close width={15} height={15} color="#B3B6B7" />
            </div>
            <Payment_information
              price={this.state.price}
              credit={this.state.credit}
              onClick={this.modalHandler}
            />
          </Modal>
        </div>

        <div>
          <Modal
            show={this.state.SigninModalIsOpen}
            dialogClassName="modal-90w"
          >
            <div
              onClick={() => this.setState({ SigninModalIsOpen: false })}
              style={{ textAlign: "right", padding: 10, cursor: 'pointer' }}
            >
              <Close width={15} height={15} color="#B3B6B7" />
            </div>
            <b
              style={{
                fontSize: 26,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 40,
                color: '#000080'
              }}
            >
              Please Signin
            </b>
          </Modal>
        </div>
        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}
      </React.Fragment>
    );
  }
}

export default GetCredit;
