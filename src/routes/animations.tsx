import { createStackNavigator } from "@react-navigation/stack";

import { Nearby } from "../screens/Animations/Nearby";
import { Searching } from "../screens/Animations/Searching";
import { Connecting } from "../screens/Animations/Connecting";
import { Success } from "../screens/Animations/Success";

export function AnimationRoutes() {
    const { Navigator, Screen } = createStackNavigator();

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Nearby" component={Nearby} />
            <Screen name="Searching" component={Searching} />
            <Screen name="Connecting" component={Connecting} />
            <Screen name="Success" component={Success} />
        </Navigator>
    );
}
