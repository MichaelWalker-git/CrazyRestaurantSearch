import React from "react";
import {Card, Col, Container, Dropdown, Row} from "react-bootstrap";
import {createReadableUrl} from "../utilities";

export const BusinessResult = (props: any) => {
  const { name, location, rating, image_url, review_count } = props.yelpBiz;
  const { user_ratings_total, website } = props.googleBiz;
  const googleRating = props.googleBiz.rating;

  return (
    <>
      <Card>
        <Card.Body>
          <Container>
            <Row>
              <Card.Title>{name} : {location.address1}, {location.city}, {location.state} {location.zip_code}  - <a href={website}>{createReadableUrl(website)}</a> </Card.Title>
              <Col>
                <Card.Subtitle>Yelp Rating: {rating} of 5 stars ({review_count} total reviews)</Card.Subtitle>
                <Card.Img variant="top" src={image_url} />
              </Col>
              <Col>
                <Card.Subtitle>Google Rating: {googleRating} of 5 stars ({user_ratings_total} total reviews)</Card.Subtitle>
                <Card.Img variant="top" src={`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/photo?maxwidth=400&photo_reference=${props.googleBiz.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API}`} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Dropdown.Divider />
    </>
  )
}
