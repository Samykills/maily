import React from "react";
import { View, Text, requireNativeComponent } from "react-native";
import { Card, CardItem, Icon, Footer } from "native-base";
import { AppColors, AppFonts } from "theme";
import { AppContext } from "react-native-easystore";
import { totalSize } from "react-native-dimension";
import ViewConstants from "../../constants/viewConstants";
const ContentView = requireNativeComponent("ContentView");
class ContentComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { mail: "", isMarkedRead: "" };
  }

  contentComponentTrigger = (currentContext, appContext) => {
    this.setState({
      mail: appContext.selectedMail,
      isMarkedRead: appContext.selectedMail.isMarkedRead
    });
  };

  componentDidMount = () => {
    this.nativeUiListener = AppContext.initializeEventActivityListeners(
      this,
      this.contentComponentTrigger
    );
  };

  componentWillUnmount = () => {
    AppContext.removeEventActivityListeners(this.nativeUiListener);
  };

  _renderContentHeader = () => {
    return (
      <CardItem header style={{ backgroundColor: AppColors.secondary }}>
        <Icon
          name="information"
          type="MaterialCommunityIcons"
          style={{ color: AppColors.selectionColor }}
        />
        <Text
          style={{
            color: AppColors.primaryFontColor,
            fontFamily: AppFonts.primaryFontFamily,
            fontSize: totalSize(1.8),
            fontWeight: "500"
          }}
        >
          {ViewConstants.LABELS.CONTENT_COMPONENT.HEADER}
        </Text>
      </CardItem>
    );
  };

  _renderContentBody = () => {
    let contentBody = this.state.mail ? (
      <ContentView
        style={{ flex: 1 }}
        buttonColor={
          this.state.isMarkedRead ? AppColors.greyColor : AppColors.greenColor
        }
        buttonText={
          this.state.isMarkedRead
            ? ViewConstants.LABELS.CONTENT_COMPONENT.MARK_AS_UNREAD
            : ViewConstants.LABELS.CONTENT_COMPONENT.MARK_AS_READ
        }
        text={this.state.mail.message}
        textSize={totalSize(2)}
        buttonTextColor={AppColors.whiteColor}
      />
    ) : (
      <CardItem style={{ justifyContent: "center" }}>
        <Text
          style={{
            color: AppColors.primaryFontColor,
            fontFamily: AppFonts.primaryFontFamily,
            fontSize: totalSize(1.8),
            fontWeight: "500"
          }}
        >
          {ViewConstants.LABELS.CONTENT_COMPONENT.INITIAL_MESSAGE}
        </Text>
      </CardItem>
    );
    return contentBody;
  };

  render() {
    return (
      <Card style={[this.props.style]}>
        {/* {this._renderContentHeader()} */}
        {this._renderContentBody()}
      </Card>
    );
  }
}

export default ContentComponent;
