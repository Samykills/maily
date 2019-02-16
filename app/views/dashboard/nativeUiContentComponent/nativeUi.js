import React from "react";
import { View, Text } from "react-native";
import { Card, CardItem, Icon } from "native-base";
import { AppColors } from "theme";

class NativeUi extends React.PureComponent {
  render() {
    return (
      <Card style={{ flex: 1 }}>
        <CardItem header>
          <Icon name="email" type="MaterialCommunityIcons" />
          <Text style={{ color: AppColors.primaryFontColor }}>Content</Text>
        </CardItem>
      </Card>
    );
  }
}

export default NativeUi;
