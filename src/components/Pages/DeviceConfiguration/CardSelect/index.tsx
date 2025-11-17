import { 
  Container, 
  Title,
  CardImage,
  Image,
  CardText,
  Subtitle,
} from "./styles";

interface ICardSelectProps {
    onPress: any;
    image: string;
    title: string;
    description: string;
}

export function CardSelect({ onPress, image, title, description }: ICardSelectProps) {
  return (
    <Container onPress={onPress}>
        <CardImage>
            <Image 
            source={image}
            resizeMode="cover" 
            />
        </CardImage>
        <CardText>
            <Title>{title}</Title>
            <Subtitle>{description}</Subtitle>
        </CardText>
    </Container>
  );
}
