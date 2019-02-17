import React from "react";
import { View, Text } from "react-native";
import { Card, CardItem, Icon, Footer } from "native-base";
import { AppColors } from "theme";
import { AppContext } from "react-native-easystore";
class NativeUi extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { mail: "", isMarkedRead: "" };
  }

  nativeUiTrigger = (currentContext, appContext) => {
    this.setState({
      mail: appContext.selectedMail,
      isMarkedRead: appContext.selectedMail.isMarkedRead
    });
  };

  componentDidMount = () => {
    this.nativeUiListener = AppContext.initializeEventActivityListeners(
      this,
      this.nativeUiTrigger
    );
  };

  componentWillUnmount = () => {
    AppContext.removeEventActivityListeners(this.nativeUiListener);
  };

  _toggleMarkAsRead = value => {
    if (value) {
      return false;
    } else {
      return true;
    }
  };

  _onPressToggleReadButton = () => {
    let appContext = AppContext.getAppContext();
    appContext.selectedMail.isMarkedRead = this._toggleMarkAsRead(
      appContext.selectedMail.isMarkedRead
    );
    appContext.refreshEmailList = true;
    AppContext.setAppContext(appContext);
  };

  render() {
    return (
      <Card style={this.props.style}>
        <CardItem header>
          <Icon name="email" type="MaterialCommunityIcons" />
          <Text style={{ color: AppColors.primaryFontColor }}>Content</Text>
        </CardItem>
        <CardItem cardBody>
          <Text>{this.state.mail.message}</Text>
        </CardItem>
        <CardItem footer style={{ backgroundColor: "red" }}>
          <Text
            onPress={() => {
              this._onPressToggleReadButton();
            }}
          >
            {this.state.isMarkedRead ? "mark as Unread" : "mark as read"}
          </Text>
        </CardItem>
      </Card>
    );
  }
}

export default NativeUi;
