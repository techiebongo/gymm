/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from "react";
import Headers from "../../Compenents/Comman/header";
import Footer from "../../Compenents/Comman/footer";
import "../../Utils/style.css";
import googleplay2 from "../../Images/googleplay2.png";
import appstore2 from "../../Images/appstore2.png";
import axios from "axios";
import Api from "../../Url";
import Loader from "../../Compenents/Comman/loader";
import { Link } from "react-router-dom";
import { BLOG, CLOSEUNDERLINE } from "../../Action/type";
import { connect } from "react-redux";

class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
      showallBorder: "active",
      fitnessBorder: "",
      fitnessBorder: "",
      lifestyleBorder: "",
      nutritionBorder: "",
      beautyBorder: "",
      categoriesData: [],
      categorySingleData: [],
      pageNo: 1,
      totalPages: 0,
      totalBlogs: 0,
      categoryId: "",
      showMore: false,
      loader: false,
      email: '',
      zip: '',
      subscriptionsucess : "",
    };
  }
  componentDidMount = () => {
    this.props.setBlog(1);
    this.getCategories();
  };

  componentWillUnmount = () => {
    this.props.setNullUnderLine(1);
  };

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  getCategories = () => {
    let paramiterField = "";
    axios
      .get(`${Api.API_URL}/list-blog-category`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("category", res);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data.docs;
          // console.log("category response data", responseData);
          this.setState({ categoriesData: responseData });
          this.getSingleCategory("", 1);
        } else {
          console.log("category Info  " + res.data.response_message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getSingleCategory = (id, page) => {
    let categoryField = "";
    let pageNo = page;
    let totalPages = 0;
    let totalBlogs = 0;
    let showMore = true;

    this.loaderHandler();

    if (id != "") {
      categoryField = `category_id=${id}`;
    }
    axios
      .get(
        `${Api.API_URL}/list-blog?&limit=10&page=${pageNo}&${categoryField}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log("single category", res);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data.docs;

          totalPages = res.data.response_data.pages;
          totalBlogs = res.data.response_data.total;
          if (pageNo == totalPages) {
            showMore = false;
          } else {
            pageNo = pageNo + 1;
          }
          // console.log("single category response data",responseData,totalPages,totalBlogs,pageNo);
          this.setState((preState) => ({
            categorySingleData: this.state.categorySingleData.concat(
              responseData
            ),
            totalPages,
            totalBlogs,
            categoryId: id,
            pageNo,
            showMore,
          }));
          this.loaderHandler();
        } else {
          console.log("single category Info  " + res.data.response_message);
          this.loaderHandler();
        }
      })
      .catch((error) => {
        console.error(error);
        this.loaderHandler();
      });
  };

  handleMoreBlogs = () => {
    this.getSingleCategory(this.state.categoryId, this.state.pageNo);
  };

  tabHandle = (active, id) => {
    active === "showAll"
      ? (this.setState({
          showallBorder: "active",
          fitnessBorder: "",
          lifestyleBorder: "",
          nutritionBorder: "",
          beautyBorder: "",
          categorySingleData: [],
        }),
        // console.log(id),
        this.getSingleCategory(id, 1))
      : active === "fitness"
      ? (this.setState({
          showallBorder: "",
          fitnessBorder: "active",
          lifestyleBorder: "",
          nutritionBorder: "",
          beautyBorder: "",
          categorySingleData: [],
        }),
        // console.log(id),
        this.getSingleCategory(id, 1))
      : active === "lifestyle"
      ? (this.setState({
          showallBorder: "",
          fitnessBorder: "",
          lifestyleBorder: "active",
          nutritionBorder: "",
          beautyBorder: "",
          categorySingleData: [],
        }),
        // console.log(id),
        this.getSingleCategory(id, 1))
      : active === "nutrition"
      ? (this.setState({
          fitnessBorder: "",
          showallBorder: "",
          lifestyleBorder: "",
          nutritionBorder: "active",
          beautyBorder: "",
          categorySingleData: [],
        }),
        // console.log(id),
        this.getSingleCategory(id, 1))
      : active === "beauty"
      ? (this.setState({
          fitnessBorder: "",
          showallBorder: "",
          lifestyleBorder: "",
          nutritionBorder: "",
          beautyBorder: "active",
          categorySingleData: [],
        }),
        // console.log(id),
        this.getSingleCategory(id, 1))
      : null;
  };

  render() {
    const category = this.state.categoriesData;

    return (
      <React.Fragment>
        <div style={{ height: 130 }}></div>
        <div
          className=" innnerban Sticky "
          style={{
            position: "fixed",
            top: 0,
            zIndex: 100,
            backgroundColor: "#000080",
            opacity: 0.9,
          }}
        >
          <Headers backgroundColor="#000080" />
        </div>

        <div className="row" style={{}}>
          <div className="container">
            <h3 className="container">Choose a category</h3>
            <div className="row">
              <div className="col-lg-8">
                <div className="container row">
                  <div className="tabmn">
                    <a
                      className={this.state.showallBorder}
                      style={{ fontSize: 15 }}
                      onClick={() => this.tabHandle("showAll", "")}
                    >
                      Show All
                    </a>
                    <a
                      className={this.state.fitnessBorder}
                      onClick={() => this.tabHandle("fitness", category[0]._id)}
                    >
                      Fitness
                    </a>
                    <a
                      className={this.state.lifestyleBorder}
                      onClick={() =>
                        this.tabHandle("lifestyle", category[1]._id)
                      }
                    >
                      Lifestyle
                    </a>
                    <a
                      className={this.state.nutritionBorder}
                      onClick={() =>
                        this.tabHandle("nutrition", category[2]._id)
                      }
                    >
                      Nutrition
                    </a>
                    <a
                      className={this.state.beautyBorder}
                      onClick={() => this.tabHandle("beauty", category[3]._id)}
                    >
                      Fashion & Beauty
                    </a>
                  </div>
                </div>
                {/* </div> */}

                <div className="row container">
                  {this.state.categorySingleData.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="col-lg-6 col-md-6">
                        <div className="blogbox">
                          <img
                            src={item.image}
                            alt=""
                            style={{ height: 250 }}
                          />
                          <div className="textbox">
                            <h5>
                              <Link
                                to={{
                                  pathname: `/blog-description-${item._id}`,
                                  state: {
                                    data: item,
                                  },
                                }}
                              >
                                {item.title}
                              </Link>
                            </h5>
                            <p>By admin {item.createdAt.substring(0, 10)}</p>
                            <p>{item.description.slice(0, 200)}</p>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                {this.state.showMore ? (
                  <div
                    className="MoreBlogs container"
                    style={{}}
                    onClick={this.handleMoreBlogs}
                  >
                    <h5 className="MoreBlogs_text" style={{display: 'flex',justifyContent:'center',alignItems:'center'}}>
                      More Articles
                    </h5>
                  </div>
                ) : null}
              </div>

              {/* <!--/////////////////// Connect with us section////////////////////// --> */}

              <div className="col-lg-4 col-md-7 mx-auto mt-5 mb-5">
                <div className="container" id="blogContactUsContainer">
                  <div id="connect-with-us-sec">
                    <h5>Connect with us</h5>
                    <a href="">
                      <i
                        className="fa fa-facebook"
                        aria-hidden="true"
                        style={{ color: "#000080" }}
                      ></i>
                    </a>
                    <a href="">
                      <i
                        className="fa fa-instagram"
                        aria-hidden="true"
                        style={{ color: "#000080" }}
                      ></i>
                    </a>
                    <hr />
                    <h5>Subscribe</h5>
                    <h6>Let's Keep In Touch</h6>
                    <p>
                      Enter Your Email to receive the latest update form
                      ClassPass
                    </p>
                    <form>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="email"
                        name='email'
                        onChange={this.handleChange}
                        value={this.state.email}
                      />
                      <input
                        type="tel"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="zip"
                        name='zip'
                        onChange={this.handleChange}
                        value={this.state.zip}
                      />
                      <p>
                        <input type="checkbox" id="exampleCheck1" />
                        <span style={{ paddingLeft: 10 }}>
                          Send me email updates and offers. I can unsubscribe
                          later.
                        </span>
                      </p>
                      <div id="submit-btn" style={{cursor:'pointer'}}>
                        <a onClick={this.handleSubmit}>Submit</a>
                      </div>
                    </form>
                   <div style={{marginTop:10}}><b style={{fontSize:16,color: '#000080'}}>{this.state.subscriptionsucess}</b></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}

        <div className="container">
          <div className="row">
            <div
              // className="googleapp allcenter2"
              id="googleAppstore2_container"
            >
              <a>
                <img src={appstore2} />
              </a>
              <a>
                <img src={googleplay2} />
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }

  handleChange = (e) => {
        subscriptionsucess: "",
        this.setState({ [e.target.name]: e.target.value, subscriptionsucess: ''});
    // console.log("hello", [e.target.name], e.target.value);
  };
  handleSubmit = (event) => {
    if(this.state.email === "") {
      this.setState({
        
        subscriptionsucess: "",
      });
    
    } else {
      this.loaderHandler();
      event.preventDefault();

      //alert("lojjjj")
      let object = {
        email: this.state.email,
        zip: this.state.zip
      };
      console.log(object);
      //this.props.getLoginApi(object)
      axios
        .post(
          `${Api.API_URL}/subscribe-email`,
          object,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("subscribe data",res);
          if (res.data.response_code === 2000) {
            this.setState({ subscriptionsucess: res.data.response_message });
            // console.log(res.data.message, "response data");
            this.loaderHandler();
          } else if(res.data.response_code === 5002){
            this.setState({ subscriptionsucess: res.data.response_message });
            this.loaderHandler();
          } else {
            console.log("response error");
            // this.setState({ successMessage: "", fieldError: "" });
            this.loaderHandler();
          }
        })
        .catch((err) => alert(err.response.data));
        this.loaderHandler();
    }
  };

}

const mapStateToProps = (state) => {
  // console.log('state',state);
  return {};
};

const mapPropsToState = (dispatch) => {
  // console.log('dispatch');
  return {
    setBlog: async (no) => await dispatch({ type: BLOG, payload: no }),
    setNullUnderLine: async (no) =>
      await dispatch({ type: CLOSEUNDERLINE, payload: no }),
  };
};

export default connect(mapStateToProps, mapPropsToState)(Blog);
