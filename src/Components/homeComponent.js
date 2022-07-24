import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import ThumbsUpDownRoundedIcon from "@material-ui/icons/ThumbsUpDownRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
class Home extends Component {

  render() {
    return (
      <div>
        <h3 style={{ marginTop: 50 }} className="text-center">
          <ThumbsUpDownRoundedIcon style={{ marginRight: 7, fontSize: 30 }} />
          Welcome 
        </h3>
        <div className="container" style={{ marginTop: 60 }}>
          <Card
            style={{
              backgroundImage: `url(https://socialmediaweek.org/wp-content/blogs.dir/1/files/brand-blog-feature.jpg)`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <CardBody style={{ marginTop: 30, minHeight: 500 }}>
              <CardTitle style={{ color: "black", textAlign: "right" }}>
                <b style={{ fontWeight: 1000 }}>
                  Create Your Blog !!!
                </b>
              </CardTitle>
              <div className="d-flex justify-content-end">
                <a href="/user/signup">
                  <Button>
                    Get Started
                    <ArrowRightRoundedIcon />{" "}
                  </Button>
                </a>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
