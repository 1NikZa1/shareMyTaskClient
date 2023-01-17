import React from "react";

export class Login extends React.Component {

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="username"
                  placeholder="email"
                  onChange={this.props.handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={this.props.handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className={"footerBtn"}>
          <button
              type="button"
              className="btn btn-info"
              name={"login"}
              onClick={this.props.handleSubmit}
            >
              SIGN IN
            </button>
            <button
                type="button" name={"register"}
                className="btn btn-info"
                onClick={this.props.changeState}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    );
  }
}
