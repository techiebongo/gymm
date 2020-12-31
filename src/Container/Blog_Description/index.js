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
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-bytesize-icons";
import { connect } from "react-redux";
import { CLOSEUNDERLINE } from "../../Action/type";

class BlogDescription extends React.Component {
  constructor() {
    super();
    this.state = {
      OwlCarousel_items: 3,

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
      viewSingleBlog: [],
    };
    window.addEventListener("resize", this.getNumberOfColumns.bind(this));
  }
  componentDidMount = () => {
    // this.getCategories();
    this.props.setNullUnderLine(1);
    this.getNumberOfColumns();
    // this..setState({ viewSingleBlog: this.props.location.state.data }),
    //     thisprops.location.state
    //   ? (console.log(this.props.location.state.data, "Blog item props"),
    //     this.getSingleCategory(this.props.location.state.data.category_id, 1))
    //   : null;
      // console.log('jhkgufyrdfh', this.props.match)
      this.getSingleBlogData( this.props.match.params.id);
  };

  getSingleBlogData=(id)=>{
    axios
      .get(
        `${Api.API_URL}/list-blog?_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(res=>{
        // console.log("Single blog data",res);
        if(res.data.response_code == 2000){
          this.setState({viewSingleBlog: res.data.response_data.docs[0]});
          this.getSingleCategory(res.data.response_data.docs[0].category_id, 1);
        }
      })
  }

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  handleSingleView = (item) => {
    // console.log("single gym View === ", item);
    this.setState({ viewSingleBlog: item });
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
          // console.log(
          //   "single category response data",
          //   responseData,
          //   totalPages,
          //   totalBlogs,
          //   pageNo
          // );
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

  getNumberOfColumns() {
    window.innerWidth <= 570
      ? this.setState({ OwlCarousel_items: 1 })
      : window.innerWidth <= 991
      ? this.setState({ OwlCarousel_items: 2 })
      : this.setState({ OwlCarousel_items: 3 });
  }

  redirectBlogPage=()=>{
    this.props.history.push({
      pathname: "/blog",
    });
  }

  render() {
    const category = this.state.categoriesData;
    const viewSingleBlog = this.state.viewSingleBlog;
    return (
      <React.Fragment>
        <div style={{ height: 140 }}></div>
        <div
          className="innnerban Sticky"
          style={{
            position: "fixed",
            top: 0,
            zIndex: 100,
            backgroundColor: "#000080",
          }}
        >
          <Headers backgroundColor="#000080" />
        </div>

        <div className=" container">
          <div className="col-lg-12" id="bannar-area">
            <div className="">
              <h5 style={{ color: "#000080" }}>
                <b onClick={()=>this.redirectBlogPage()} style={{cursor:'pointer'}}>Blog </b> {">"}  <span>Blog Details</span>
              </h5>
              <img
                src={viewSingleBlog.image}
                className="img-fluid"
                style={{ maxHeight: 450, maxWidth: "100%" }}
              />
              <h3 className="mt-3">
                {viewSingleBlog.createdAt
                  ? viewSingleBlog.createdAt.substring(0, 10)
                  : null}
              </h3>
              <h2
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignSelf: "left",
                }}
              >
                {viewSingleBlog.title}
                <span className="share-icon">
                  <a href="#">
                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                  </a>
                </span>
              </h2>
              <h3>By Admin</h3>
              <p> {viewSingleBlog.description} </p>
            </div>
          </div>
        </div>

        <div className="container">
          <h2
            style={{
              display: "flex",
              justifyContent: "left",
              alignSelf: "left",
            }}
          >
            Related Blog
          </h2>
          <div className="">
            <OwlCarousel
              className="owl-theme"
              loop
              margi={0}
              nav
              items={this.state.OwlCarousel_items}
            >
              {this.state.categorySingleData.map((item, index) => (
                <React.Fragment key={index}>
                  {/* <div className="col-lg-4 col-md-6">                 */}
                  <div className="blogbox" style={{ padding: 10 }}>
                    <img src={item.image} alt="" style={{ height: 220 }} />
                    <div className="textbox">
                      <h5 style={{ cursor: "pointer" }}>
                        {" "}
                        <a onClick={() => this.handleSingleView(item)}>
                          {item.title}
                        </a>
                      </h5>
                      <p>By admin {item.createdAt.substring(0, 9)}</p>
                      <p>{item.description.slice(0, 200)}</p>
                    </div>
                    {/* </div> */}
                  </div>
                </React.Fragment>
              ))}
            </OwlCarousel>
          </div>
        </div>

        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}

        <div className="container">
          <div className="row">
            <div
            //   className="googleapp allcenter2"
              id="googleAppstore2_container"
            >
              <a >
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
}

const mapStateToProps = (state) => {
  // console.log('state',state);
  return {
    // imageUrl: state.imageUrlReducer.url,
    // credit: state.imageUrlReducer.credit,
  };
};

const mapPropsToState = (dispatch) => {
  // console.log("dispatch");
  return {
    setNullUnderLine: async no => await dispatch({type: CLOSEUNDERLINE, payload: no}),
  };
};

export default connect(mapStateToProps, mapPropsToState)(BlogDescription);
