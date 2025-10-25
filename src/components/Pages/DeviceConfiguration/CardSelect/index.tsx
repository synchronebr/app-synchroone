import { 
  Container, 
  Title,
  CardImage,
  Image,
  CardText,
  Subtitle,
} from "./styles";

interface ICardSelectProps {
    image: string;
    title: string;
    description: string;
}

export function CardSelect({ image, title, description }: ICardSelectProps) {
  return (
    <Container>
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
