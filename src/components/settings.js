import React, { Component } from "react";
import CollapseInput from "./collapseInput";

export default class Settings extends Component {
  state = {
    About: {
      toggled: false,
      link: "https://www.matainventive.com/disclosure"
    },
    "Terms of Service": {
      toggled: false,
      link: "https://www.matainventive.com/termsofservice"
    },
    "Privacy Policy": {
      toggled: false,
      link: "https://www.matainventive.com/privacy-policy"
    }
  };

  toggleSettingsItem = type => {
    return () => {
      let newSetting = this.state[type];
      newSetting.toggled = !newSetting.toggled;
      this.setState({ [type]: newSetting });
    };
  };

  render = () => {
    return (
      <div className="settings-container">
        {Object.keys(this.state).map((settingItem, idx) => (
          <CollapseInput
            key={idx}
            inputName={settingItem}
            collapseInput={this.state[settingItem].toggled}
            toggleInput={this.toggleSettingsItem}
            link={this.state[settingItem].link}
            hasLinks={true}
          />
        ))}
      </div>
    );
  };
}
