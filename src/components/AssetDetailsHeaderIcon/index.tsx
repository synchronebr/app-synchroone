import { TouchableOpacity, View, Text } from "react-native";

import FilledHeartIcon from "../../assets/icons/filled-heart.svg";
import EmptyHeartIcon from "../../assets/icons/empty-heart.svg";

import { IAssetDetailHeaderIconProps } from "./types";

export function AssetDetailHeaderIcon({ isFavorite, toggleIsFavorite }: IAssetDetailHeaderIconProps ) {
  return (
    <View style={{
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 50,
    }}>
      <TouchableOpacity onPress={toggleIsFavorite}>
        { isFavorite ? <FilledHeartIcon /> : <EmptyHeartIcon /> }
      </TouchableOpacity>
    </View>
  )
}
