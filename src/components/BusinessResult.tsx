import React from "react";
import {Card, Col, Container, Dropdown, Row} from "react-bootstrap";
import {createReadableUrl} from "../utilities";
import {GoogleBusiness, YelpBusiness} from "../types";
import googleImgNotFound from "../assets/googleImgNotFound.png"
import yelpImgNotFound from "../assets/yelpImgNotFound.png"

interface BusinessResultProps {
  yelpBiz: YelpBusiness;
  googleBiz: GoogleBusiness;
}

export const BusinessResult = (props: BusinessResultProps) => {
  const { name, location, rating, image_url, review_count } = props.yelpBiz;
  const { user_ratings_total } = props.googleBiz;
  const googleRating = props.googleBiz.rating;
  const website = props.googleBiz?.website || ""
  const photoRef = (props.googleBiz?.photos?.length > 0) ? props.googleBiz?.photos[0]?.photo_reference : "";
  const googleUrl = photoRef.length > 0 ? `${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/photo?maxwidth=400&photo_reference=${props.googleBiz?.photos[0]?.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API}` : googleImgNotFound;
  const yelpUrl = image_url?.length > 0 ? image_url : yelpImgNotFound;

  return (
    <>
      <Card>
        <Card.Body>
          <Container>
            <Row>
              <Card.Title>{name} : {location.address1}, {location.city}, {location.state} {location.zip_code}  - <a href={website}>{createReadableUrl(website)}</a> </Card.Title>
              <Col>
                <Card.Subtitle><b>Yelp Rating:</b> {rating} of 5 stars ({review_count} total reviews)</Card.Subtitle>
                <Card.Img variant="top"
                          data-failover="/assets/yelpImgNotFound.jpg"
                          src={yelpUrl} />
              </Col>
              <Col>
                <Card.Subtitle><b>Google Rating:</b> {googleRating} of 5 stars ({user_ratings_total} total reviews)</Card.Subtitle>
                <Card.Img variant="top"
                          data-failover="/assets/googleImgNotFound.jpg"
                          src={googleUrl} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Dropdown.Divider />
    </>
  )
}
