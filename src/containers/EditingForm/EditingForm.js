import React, { Component, Fragment } from "react";
import axiosBase from "../../axiosBase";
import { CATEGORIES } from "../../constants";
import Button from "../../components/UI/Button/Button";
import SunEditor from "suneditor-react";
import plugins from 'suneditor/src/plugins';
import "suneditor/dist/css/suneditor.min.css";

class EditingForm extends Component {

    state = {
      category: CATEGORIES[0],
      title: "",
      text: "",
      loading: false
    };

  componentDidMount() {
    this.props.history.replace(`/pages/admin/${this.state.category}/edit`);
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    prevProps.location.pathname !== this.props.location.pathname &&
      this.getInfo();
  }

  getInfo = async () => {
    const result = await axiosBase.get(`/pages/${this.state.category}.json`);
    result.data &&
      this.setState({ title: result.data.title, text: result.data.text });
  };

  valueHandleChanged = e => {
    e.target.name === "category" &&
      this.props.history.replace(`/pages/admin/${e.target.value}/edit`);
    this.setState({ [e.target.name]: e.target.value });
  };

  textHandleChanged = content => this.setState({ text: content });

  editHandler = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    await axiosBase.patch(`/pages/${this.state.category}.json`, {
      title: this.state.title,
      text: this.state.text
    });
    this.setState({ loading: false });
    this.props.history.push(`/pages/${this.state.category}`);
  };

  render = () => (
    <div className="container">
      <form
        onSubmit={this.editHandler}
        className="border border secondary p-3"
        style={{ marginTop: "120px" }}
      >
        <div className="form-group">
          <label htmlFor="category">Choose category :</label>
          <select
            onChange={this.valueHandleChanged}
            name="category"
            value={this.state.category}
            type="select"
            className="form-control"
            id="category"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat.toLocaleUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="titleInput">Title: </label>
          <input
            onChange={this.valueHandleChanged}
            name="title"
            value={this.state.title}
            type="text"
            className="form-control"
            id="titleInput"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="textInput">Text: </label>
          <SunEditor
            id='textInput'
            onChange={this.textHandleChanged}
            setContents={this.state.text}
            width="100%"
            setOptions={{
              height: 250,
              placeholder: "Enter text",
              plugins: plugins,
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                ['fontColor', 'hiliteColor',],['removeFormat'],
                ['align', 'horizontalRule', 'list',], ['image'],
                ['fullScreen', 'showBlocks', 'codeView'],
              ]
            }}
          />
        </div>
        {!this.state.loading ? (
          <Button label="Edit" type="submit" addClass="secondary" />
        ) : (
          <Button
            label={
              <Fragment>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </Fragment>
            }
            type="button"
            addClass="secondary"
            disabled={true}
          />
        )}
      </form>
    </div>
  );
}

export default EditingForm;