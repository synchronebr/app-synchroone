
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { 
    SignalLowIcon, 
    SignalMediumIcon, 
    SignalIcon,
    WifiIcon,
    WifiOffIcon,
    ArrowRightIcon,
    CircleXIcon, 
} from "lucide-react-native";

import { 
    Container, 
    LeftContainer,
    ImageContainer,
    Image,
    TextContainer,
    StatusCard,
    StatusCardText,
    RightIcons,
    Title, 
    Subtitle, 
} from "./types";

import { IDevice } from "../../../../services/dtos/IDevice";
import { t } from "i18next";
import { enums } from "../../../../utils/enums";

interface IDeviceCardProps {
    device: IDevice
    signal: 'L' | 'M' | 'H';
    type: string;
}

const DESCRIPTIONS = {
    [enums.Devices.ConnectionStatus.Online]: t('index.online'),
    [enums.Devices.ConnectionStatus.Offline]: t('index.offline'),
    [enums.Devices.ConnectionStatus.NotConnectedGateway]: t('index.notConnectedToGateway'),
    [enums.Devices.ConnectionStatus.NotConfigured]: t('index.notConfigured'),
} as { [ key: string ]: string; }

export default function DeviceCard({ device, signal, type }: IDeviceCardProps) {

  return (
    <Container>
        <LeftContainer>
            <ImageContainer>
                <Image
                source={require('../../../../assets/images/blue-mp-sensor.png')}
                />
            </ImageContainer>
            <TextContainer>
                <Title>{device.code}</Title>
                {type === 'L' && (
                    <StatusCard status={device.connectionStatus}>
                        <StatusCardText status={device.connectionStatus}>{DESCRIPTIONS[device.connectionStatus]}</StatusCardText>
                    </StatusCard>
                )}
                <Subtitle>Sensor de vibração</Subtitle>
            </TextContainer>
        </LeftContainer>
        <RightIcons>
            {type === 'N' && (
                <>
                {signal === 'L' && (<SignalLowIcon size={30} strokeWidth={1.5} />)}
                {signal === 'M' && (<SignalMediumIcon size={30} strokeWidth={1.5}/>)}
                {signal === 'H' && (<SignalIcon size={30} strokeWidth={1.5}/>)}
                </>
            )}

            {type === 'L' && (
                <>
                {device.connectionStatus === enums.Devices.ConnectionStatus.Online && (<WifiIcon size={30} strokeWidth={1.5} />)}
                {device.connectionStatus === enums.Devices.ConnectionStatus.Offline && (<WifiOffIcon size={30} strokeWidth={1.5} />)}
                {device.connectionStatus === enums.Devices.ConnectionStatus.NotConnectedGateway && (<ArrowRightIcon size={30} strokeWidth={1.5} />)}
                {device.connectionStatus === enums.Devices.ConnectionStatus.NotConfigured && (<CircleXIcon size={30} strokeWidth={1.5} />)}
                </>
            )}
        </RightIcons>
    </Container>
  );
}
