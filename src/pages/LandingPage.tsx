import React, { Component } from "react";
import { Button, Page } from "react-onsenui";
import IBasePropsModel from "../models/base/BaseProps.model";
import IBaseStateModel from "../models/base/BaseState.model";
import ComponentModel from "../models/CDP/Component.model";
import { GoToErrorPage, isNativeApp, ProcessCDPComponent, ProcessMetaAction } from "../services/helpers.svc";
import OpenPageActionModel from "../models/CDP/MetaAction/OpenPageAction.model";
import { handleKeyPress } from "../services/accessibility.svc";

export default class LandingPage extends Component<IBasePropsModel, IBaseStateModel> {
  sso: OpenPageActionModel;
  pageClass = "desktop";
  pageContainer: React.RefObject<HTMLDivElement>;

  constructor(props: IBasePropsModel) {
    super(props);
    this.state = {
      componentModel: {},
    };

    this.pageContainer = React.createRef();

    if (isNativeApp()) {
      this.pageClass = "native";
    }
    const nextPageOpenData = {
     
      dataSource: {
        type: 2
      
    }
  };
  this.sso = new OpenPageActionModel("Loading", "LoadingPage", "LoadingPage", nextPageOpenData);
  }

  componentDidMount() {
    this.pageInit();
  }
  pageInit = () => {
    ProcessCDPComponent(this.props.componentModel).then(
      (model) => {
        // lets get some data
        });
      () => {
        console.error("********************request failed***************");
        // something went wrong show error page
        GoToErrorPage(this.props.navigator, {});
      }
  }

  render() {
    return (
      <Page key="LandingPage" id="LandingPage">
        <div className="cdp_page_container" ref={this.pageContainer}>
          <div className="cdp_hero">add a hero component to this container</div>
          <div id="secondaryContainer">
            <div className="cdp_list_container">
            {/* <div style="height: 100%; padding-top: 50%; text-align: center"> */}
            <div>
            <Button
                    key="btnNext"
                    className="primaryBtn single"
                    modifier="large"
                    // @ts-ignore;
                    tabIndex={0} onKeyPress={handleKeyPress} role="button"
                    onClick={()=>ProcessMetaAction(this.sso, this.props.navigator, this.props.tileConfig)}>
                  SSO
                </Button>         
                </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
