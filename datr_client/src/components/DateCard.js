import {CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
  

export default function DateCard(props) {
    return (
        <div className="datr-card ml-3 mr-3 mt-3 mb-3 bg-white">
                <img top="true" src={`data:image/png;base64,${props.photo_string}`} alt={`${props.name}`} width="100%" height="300px"/>
                <CardBody>
                    <CardTitle tag="h5">{props.name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{props.address.split(",")[0]}</CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{props.address.split(",")[1]}</CardSubtitle>
                    <CardText>{`Rated: ${props.rating} out of ${props.totalRatings} total reviews`}</CardText>
                    <div className="d-flex justify-content-center">{props.button !== null && props.button}</div>
                </CardBody>
        </div>
    )
}