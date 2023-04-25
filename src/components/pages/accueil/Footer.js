import React from "react";
import { Link } from "react-scroll";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "react-share";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="d-flex">
              <p>city Moscow Main st 2020 office #223</p>
            </div>
            <div className="d-flex">
              <a href="tel:555-555-555">+2126666666666 </a>
            </div>
            <div className="d-flex">
              <a type="email:admin@Prolog.com">admin@Prolog.com</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-2 col-sm-6">
            <div className="row">
              <div className="col">
                <Link
                    smooth={false}
                    to="home"
                    offset={-95}
                    className="nav-link "
                    href="/"
                >
                  Home
                </Link>
                <Link
                    smooth={false}
                    offset={-95}
                    to="equipements"
                    className="nav-link"
                    href="/"
                >
                  Équipements
                </Link>
                <Link
                    smooth={false}
                    to="services"
                    offset={-95}
                    className="nav-link"
                    href="/"
                >
                  Services
                </Link>
              </div>
              <div className="col">
                <Link
                    smooth={false}
                    to="about"
                    offset={-95}
                    className="nav-link"
                    href="/"
                >
                  About
                </Link>
                <Link
                    smooth={false}
                    offset={-95}
                    to="Contacts"
                    className="nav-link"
                    href="/"
                >
                  Contacts
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-6 align-items-center">
            <div className="d-flex justify-content-center">
              <FacebookShareButton
                url={"https://www.youtube.com/"}
                quote={"Prolog Developers"}
                hashtag="#javascript"
              >
                <FacebookIcon className="mx-3" size={36} />
              </FacebookShareButton>
              <TwitterShareButton
                url={"https://www.youtube.com/"}
                quote={"Prolog Developersr"}
                hashtag="#javascript"
              >
                <TwitterIcon className="mx-3" size={36} />
              </TwitterShareButton>
              <RedditShareButton
                url={"https://www.youtube.com"}
                quote={"Prolog Developers"}
                hashtag="#javascript"
              >
                <RedditIcon className="mx-3" size={36} />
              </RedditShareButton>
              <LinkedinShareButton
                url={"https://www.youtube.com"}
                quote={"Prolog Developers"}
                hashtag="#javascript"
              >
                <LinkedinIcon className="mx-3" size={36} />
              </LinkedinShareButton>
            </div>
            <p className="pt-3 text-center">
              Copyright&copy;
              {new Date().getFullYear()}&nbsp;Prolog Post | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
