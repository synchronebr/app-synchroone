import MaskedView from '@react-native-masked-view/masked-view';
import EsFlag from '../../assets/flags/es.svg';
import BrFlag from '../../assets/flags/br.svg';
import UsFlag from '../../assets/flags/us.svg';
import { View } from 'react-native';

interface IRoundFlag {
    size?: number;
    country: 'BR' | 'ES' | 'US';
}

export function RoundFlag({ size = 48, country }: IRoundFlag) {
  return (
    <MaskedView
      style={{ width: size, height: size }}
      maskElement={
        <View style={{ backgroundColor: 'black', width: size, height: size, borderRadius: size/2 }} />
      }
    >
    {country === 'BR' && (<BrFlag width={size} height={size} preserveAspectRatio="xMidYMid slice" />)}
    {country === 'ES' && (<EsFlag width={size} height={size} preserveAspectRatio="xMidYMid slice" />)}
    {country === 'US' && (<UsFlag width={size} height={size} preserveAspectRatio="xMidYMid slice" />)}
      
    </MaskedView>
  );
}
