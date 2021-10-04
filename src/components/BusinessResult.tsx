import React, {useState} from "react";
import {Card, Col, Container, Dropdown, Row} from "react-bootstrap";

export const BusinessResult = (props: any) => {
  const [googleUrlImage, setUrlImage] = useState("");
  const { name, location, rating, image_url, review_count } = props.yelpBiz;
  const { user_ratings_total, } = props.googleBiz;
  const googleRating = props.googleBiz.rating;
  //TODO(miketran): Google reviews
  //TODO(miketran): Restaurant website

  // function validateResponse(response: any) {
  //   if (!response.ok) {
  //     throw Error(response.statusText);
  //   }
  //   return response;
  // }

  // const googleImage = getGooglePhotoRef(props.googleBiz.photos[0].photo_reference)
  //   .then(validateResponse)
  //   .then(response => response?.blob())
  //   .then(blob => {
  //     setUrlImage(URL.createObjectURL(blob))
  //     console.log(URL.createObjectURL(blob))
  //   })

  return (
    <>
      <Card>
        <h4>{name} : {location.address1} - <a href={"website"}>{"website"}</a> </h4>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <h5>Yelp Rating: {rating} of 5 stars ({review_count} total reviews)</h5>
                <Card.Img variant="top" src={image_url} />
              </Col>
              <Col>
                <h5>Google Rating: {googleRating} of 5 stars ({user_ratings_total} total reviews)</h5>
                <Card.Img variant="top" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEACyFoIIiPqphiR3VgwJhoQlv9S4_AWIiFYcr18UKG-j_FpXunyRaeS7ErEvP6BEO49dMFnLURs0HIOQqgPzF8D3tmDr5aFsOXNMI3l-98I8hOoDhfgD3ylUklBo45U1B6RQSRbjalhtHraoB-1qoU-KpKK7pra6S7ruxi-Tto5WEHq&key=AIzaSyAjf7dv23CHDQtTyldde3N3BJpYxXXFnkE`} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Dropdown.Divider />
    </>
  )
}
