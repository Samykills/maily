import React from "react";
import { View, FlatList } from "react-native";
import {
  Card,
  CardItem,
  Icon,
  Toast,
  ListItem,
  Text,
  Left,
  Body,
  Thumbnail,
  Right
} from "native-base";
import { AppColors, AppFonts } from "theme";
import MailServiceManager from "./serviceManager/mailServiceManager";
import { totalSize, width, height } from "react-native-dimension";
import { Loader, DateUtil, Touchable } from "uRnFramework-basic-components";
import ViewConstants from "../../constants/viewConstants";
import { AppContext } from "react-native-easystore";
class MailList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mailServiceManager = new MailServiceManager();
    this.state = {
      mailList: [],
      isLoading: false,
      selectedItem: "",
      refreshList: false
    };
  }

  _listRefresher = () => {
    return Math.random(10);
  };

  mailListTrigger = (currentContext, appContext) => {
    if (appContext.refreshEmailList) {
      //refresh the displayed list here
      this.state.mailList.forEach(element => {
        element.uid == appContext.selectedMail.uid
          ? (element.isMarkedRead = appContext.selectedMail.isMarkedRead)
          : null;
      });
      currentContext.setState({
        mailList: this.state.mailList,
        refreshList: this._listRefresher()
      });
      appContext.refreshEmailList = false;
      AppContext.setAppContext(appContext);
    }
  };

  componentDidMount = () => {
    this._loadAllMails();
    this.mailListListener = AppContext.initializeEventActivityListeners(
      this,
      this.mailListTrigger
    );
  };

  componentWillUnmount = () => {
    AppContext.removeEventActivityListeners(this.mailListListener);
  };

  _loadAllMails = () => {
    this.setState({ isLoading: true });
    this.mailServiceManager.getAllMails().then(
      res => {
        this.setState({ mailList: res, isLoading: false });
        Toast.show({
          text: ViewConstants.LABELS.MAIL_LIST_COMPONENT.EMAIL_SYNC_SUCCESS,
          duration: 2500,
          type: "success"
        });
      },
      err => {
        this.setState({ isLoading: false });
        Toast.show({
          text: ViewConstants.LABELS.MAIL_LIST_COMPONENT.EMAIL_SYNC_FAILED,
          duration: 2500,
          type: "danger"
        });
      }
    );
  };

  _renderMailListItem = ({ item }) => {
    let backgroundColor = null;
    let textColor = AppColors.primaryFontColor;
    let IconTintColor = AppColors.greenColor;
    let IconName = "email-open";
    if (item.isMarkedRead) {
      IconName = "email";
      IconTintColor = AppColors.primary;
    }
    if (this.state.selectedItem.uid == item.uid) {
      backgroundColor = AppColors.selectionColor;
      IconTintColor = textColor = AppColors.whiteColor;
    }
    return (
      <ListItem
        noIndent
        button
        avatar
        style={{ backgroundColor: backgroundColor }}
        onPress={() => {
          this.setState({
            selectedItem: item,
            refreshList: this._listRefresher()
          });
          let appContext = AppContext.getAppContext();
          appContext.selectedMail = item;
          AppContext.setAppContext(appContext);
        }}
      >
        <Icon
          name={IconName}
          type="MaterialCommunityIcons"
          style={{ color: IconTintColor, fontSize: totalSize(3) }}
        />
        <Body>
          <Text
            style={{
              fontSize: totalSize(2),
              color: textColor,
              fontWeight: "400",
              fontFamily: AppFonts.primaryFontFamily
            }}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            {item.sender}
          </Text>
          <Text
            note
            style={{
              fontSize: totalSize(1.5),
              fontFamily: AppFonts.primaryFontFamily,
              color: textColor
            }}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            {item.subject}
          </Text>
        </Body>
        <Right>
          <Text
            note
            style={{
              fontFamily: AppFonts.primaryFontFamily,
              color: textColor
            }}
          >
            {DateUtil.convertTimeInMillisToDateFormat(item.time_sent)}
          </Text>
        </Right>
      </ListItem>
    );
  };

  _renderEmptyListComponent = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          note
          style={{
            fontSize: totalSize(1.5),
            fontFamily: AppFonts.primaryFontFamily
          }}
        >
          {ViewConstants.LABELS.MAIL_LIST_COMPONENT.NO_EMAIL}
        </Text>
      </View>
    );
  };

  _renderHeaderLegendComponent = (iconName, iconColor, heading, margin = 0) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: margin
        }}
      >
        <Icon
          name={iconName}
          type="MaterialCommunityIcons"
          style={{ color: iconColor }}
        />
        <Text
          style={{
            color: AppColors.primaryFontColor,
            fontFamily: AppFonts.primaryFontFamily,
            fontSize: totalSize(1.2),
            fontWeight: "500"
          }}
        >
          {heading}
        </Text>
      </View>
    );
  };

  _renderListHeaderComponent = () => {
    let header = null;
    if (this.state.mailList.length > 0) {
      header = (
        <CardItem>
          {this._renderHeaderLegendComponent(
            "email",
            AppColors.primary,
            ViewConstants.LABELS.MAIL_LIST_COMPONENT.READ_HEADING
          )}
          {this._renderHeaderLegendComponent(
            "email-open",
            AppColors.greenColor,
            ViewConstants.LABELS.MAIL_LIST_COMPONENT.UNREAD_HEADING,
            width(5)
          )}
        </CardItem>
      );
    }
    return header;
  };

  _renderMailList = () => {
    return (
      <CardItem cardBody style={{ flex: 1 }}>
        <FlatList
          data={this.state.mailList}
          extraData={this.state.refreshList}
          keyExtractor={(item, index) => item.uid.toString()}
          renderItem={this._renderMailListItem}
          removeClippedSubviews={true}
          ListEmptyComponent={this._renderEmptyListComponent()}
          ListHeaderComponent={this._renderListHeaderComponent()}
        />
      </CardItem>
    );
  };

  _loader = () => {
    return this.state.isLoading ? (
      <Loader
        loadingText={ViewConstants.LABELS.MAIL_LIST_COMPONENT.LOADER_TEXT}
        spinnerColor={AppColors.primary}
        loadingTextColor={AppColors.primary}
      />
    ) : null;
  };

  _renderCardHeader = () => {
    return (
      <CardItem header style={{ backgroundColor: AppColors.secondary }}>
        <Icon
          name="email"
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
          {ViewConstants.LABELS.MAIL_LIST_COMPONENT.HEADER}
        </Text>
      </CardItem>
    );
  };

  render() {
    return (
      <Card style={this.props.style}>
        {this._renderCardHeader()}
        {this._renderMailList()}
        {this._loader()}
      </Card>
    );
  }
}

export default MailList;
