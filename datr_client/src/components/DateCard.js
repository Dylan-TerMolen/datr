import {Card, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
  

export default function DateCard(props) {
    return (
        <Card className="rounded" className="ml-3 mr-3 mt-3 mb-3">
            <img top="true" src={`data:image/png;base64,${props.photo_string}`} alt={`${props.name}`} width="100%" height="300px"/>
            <CardBody>
                <CardTitle tag="h5">{props.name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{props.address}</CardSubtitle>
                <CardText>{`Example text for the idea of ${props.name}`}</CardText>
                {props.button !== null && props.button}
            </CardBody>
        </Card>
    )
}