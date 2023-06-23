import React, { Component } from "react";
import { Button, Page, ProgressBar } from "react-onsenui";
import IBasePropsModel from "../models/base/BaseProps.model";
import IBaseStateModel from "../models/base/BaseState.model";
import ComponentModel from "../models/CDP/Component.model";
import { getTileString, GoToErrorPage, isNativeApp, ProcessCDPComponent } from "../services/helpers.svc";
import { container, tile } from "../services/container.svc";
import LoadingModel from "../models/Loading.model";
import { handleKeyPress } from "../services/accessibility.svc";


export default class LoadingPage extends Component<IBasePropsModel, IBaseStateModel> {
  pageClass = "desktop";
  pageContainer: React.RefObject<HTMLDivElement>;
  pageData: LoadingModel;
  logo: string = "";
  constructor(props: IBasePropsModel) {
    super(props);
    this.state = {
      componentModel: {},
    };

    this.pageContainer = React.createRef();

    if (isNativeApp()) {
      this.pageClass = "native";
    }
  }

  componentDidMount() {
    this.pageInit();
  }
  componentDidUpdate() {
    this.pageInit();
  };

  pageInit = () => {
    ProcessCDPComponent(this.props.componentModel).then(
      (model: ComponentModel) => {
        console.info("init lookup", model);

        this.pageData = model.data;

      },
      () => {
        console.error("********************request failed***************");
        // something went wrong show error page
        GoToErrorPage(this.props.navigator, {});
      }
    );
  }

  goBack = () => {
    container.tile.goBack();
  };

  render() {
    return (
      <Page key="LoadingPage" id="LoadingPage">
        <div className="cdp_page_container" ref={this.pageContainer}>
          <div className="cdp_hero">add a hero component to this container</div>
          <div id="secondaryContainer">
            <div className="cdp_list_container">
            {/* <div style="height: 100%;text-align: center; background-color: #000000d9 !important;"> */}
            <div>
                <ProgressBar id="progress" indeterminate></ProgressBar>
                {/* <div style="text-align:center; padding:18px"> */}
                <div>
                    {/* <span style="color:white; font-size: 16px;">Please hold while we send all your member data to google.</span> */}
                    <span className="text">{getTileString("100101")}</span>
                    </div>
                    <div>
                    <Button
                        key="btnBack"
                        className="primaryBtn"
                        // @ts-ignore;
                        tabIndex={0} onKeyPress={handleKeyPress} role="button"
                        onClick={this.goBack}>
                      Reset
                    </Button>           
                    </div>
            </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}