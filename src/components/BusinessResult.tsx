import React from "react";
import {Card, Col, Container, Dropdown, Row} from "react-bootstrap";

export const BusinessResult = (props: any) => {
  const { name, location, rating, image_url, review_count } = props.yelpBiz;
  const { user_ratings_total, website } = props.googleBiz;
  const googleRating = props.googleBiz.rating;

  return (
    <>
      <Card>
        <h4>{name} : {location.address1} - <a href={website}>{website}</a> </h4>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <h5>Yelp Rating: {rating} of 5 stars ({review_count} total reviews)</h5>
                <Card.Img variant="top" src={image_url} />
              </Col>
              <Col>
                <h5>Google Rating: {googleRating} of 5 stars ({user_ratings_total} total reviews)</h5>
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
