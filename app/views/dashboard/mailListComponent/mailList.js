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
import { totalSize } from "react-native-dimension";
import { Loader, DateUtil } from "uRnFramework-basic-components";
import ViewConstants from "../../constants/viewConstants";
class MailList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mailServiceManager = new MailServiceManager();
    this.state = { mailList: [], isLoading: false };
  }

  componentDidMount() {
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
  }

  _renderMailListItem = ({ item }) => {
    return (
      <ListItem
        button
        avatar
        onPress={() => {
          alert("pressed");
        }}
      >
        <Left>
          <Icon
            name="email"
            type="MaterialCommunityIcons"
            style={{ color: AppColors.primary }}
          />
        </Left>
        <Body>
          <Text>{item.sender}</Text>
          <Text note>{item.subject}</Text>
        </Body>
        <Right>
          <Text note>{DateUtil.convertTime(item.time_sent)}</Text>
        </Right>
      </ListItem>
    );
  };

  _renderMailList = () => {
    let mailListComponent = null;

    this.state.mailList.length > 0
      ? (mailListComponent = (
          <CardItem cardBody>
            <FlatList
              data={this.state.mailList}
              keyExtractor={(item, index) => item.uid.toString()}
              renderItem={this._renderMailListItem}
            />
          </CardItem>
        ))
      : (mailListComponent = (
          <CardItem
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>You do not have any mails as yet!</Text>
          </CardItem>
        ));

    return mailListComponent;
  };

  _loader = () => {
    return this.state.isLoading ? (
      <Loader
        loadingText="Syncing Mail"
        spinnerColor={AppColors.primary}
        loadingTextColor={AppColors.primary}
      />
    ) : null;
  };

  render() {
    return (
      <Card style={{ flex: 2 }}>
        <CardItem header style={{ backgroundColor: AppColors.secondary }}>
          <Icon
            name="email"
            type="MaterialCommunityIcons"
            style={{ color: AppColors.primary }}
          />
          <Text
            style={{
              color: AppColors.primaryFontColor,
              fontFamily: AppFonts.primaryFontFamily,
              fontSize: totalSize(1.8)
            }}
          >
            {ViewConstants.LABELS.MAIL_LIST_COMPONENT.HEADER}
          </Text>
        </CardItem>
        {this._renderMailList()}
        {this._loader()}
      </Card>
    );
  }
}

export default MailList;
