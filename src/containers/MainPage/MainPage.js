import React, { Component, Fragment } from "react";
import axiosBase from "../../axiosBase";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./MainPage.css";

class MainPage extends Component {
  state = {
    info: {},
    loading: false
  };

  componentDidMount() {
    this.props.match.path !== "/" && this.getInfo();
  }

  componentDidUpdate(prevProps) {
    prevProps.match.path !== this.props.match.path &&
      this.props.match.path !== "/" &&
      this.getInfo();
  }

  getInfo = async () => {
    this.setState({ loading: true });
    let url = this.props.match.path;
    const result = await axiosBase.get(`${url}.json`);
    result.data && this.setState({ info: result.data, loading: false });
  };

  render = () => {
    let home = (
      <div className="banner">
        <div className="banner-wrapper">
          <h2 className="text-center">
            A multi-talented freelance web designer & front-end developer
          </h2>
        </div>
      </div>
    );

    return (
      <Fragment>
        {this.state.loading ? (
          <Spinner />
        ) : this.props.match.path === "/" ? (
          home
        ) : (
          <div className="container" style={{ marginTop: "50px" }}>
            <h3 className="text-center my-3">{this.state.info.title}</h3>
            <hr style={{boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 15px 0px', width: '80%'}}/>
            <p
              className="text-center"
              dangerouslySetInnerHTML={{ __html: this.state.info.text }}
            ></p>
          </div>
        )}
      </Fragment>
    );
  };
}

export default MainPage;
