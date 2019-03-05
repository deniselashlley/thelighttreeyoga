import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import ReactMarkdown from "react-markdown";
import Slider from "react-slick";
import AnchorLink from 'react-anchor-link-smooth-scroll';

import CustomLink from "../components/CustomLink";

import Layout from "../components/Layout";
import { Introduction } from '../components/Introduction'
import { Schedule } from '../components/Schedule'
import "../styles/home.scss";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const HomePageTemplate = ({ home, settings }) => {
  return (
    <>
      <section className="hero-banner">
        <ul>
          {home.bannerText.map(imageItems => (
          <li key={imageItems.itemText}>{imageItems.itemText}</li>
          ))}
        </ul>
        <AnchorLink href="#intro" className="down-link">
          <span>Introduction</span>
        </AnchorLink>
      </section>
      <Introduction data={home} />
      <Schedule data={home} />
      <section id="mystory" className="section-block section-block--mystory">
        <div className="container">
          <h2 className="section-title">{home.sectionMyStory.title}</h2>
            <ReactMarkdown source={home.sectionMyStory.body} />
            <ReactMarkdown source={home.sectionMyStory.quote} className="quote"/>
            <CustomLink
              linkType="internal"
              linkURL={home.sectionMyStory.pageLink.linkURL}
              className="link link-btn"
            >
            {home.sectionMyStory.pageLink.text}
          </CustomLink>
        </div>
      </section>
      <section id="services" className="section-block section-block--services">
        <div className="container">
          <h2 className="section-title">{home.sectionConnect.services.title}</h2>
          <div>
            <ul className="services-list">
            {home.sectionConnect.services.serviceList.map(services => (
              <li key={services.title}>
                <img src={services.image} alt="" className="service-list-image" />
                <div className="service-text-overlay">
                  <p className="service-title">{services.title}</p>
                  <p>{services.description}</p>
                  { services.linkText !== '' && (
                    <a href={services.linkURL}>{services.linkText}</a>
                  )}
                </div>
              </li>
            ))}
          </ul>
          </div>
          <div>
            <h3>{home.sectionConnect.subscribe.subHeading}</h3>
            <ReactMarkdown source={home.sectionConnect.subscribe.body} />
          </div>
        </div>
      </section>
      <section id="connect" className="section-block section-block--connect">
        <div className="container">
          <h2 className="section-title">{home.sectionConnect.title}</h2>
          <ul className="contact-list">
            {home.sectionConnect.contact.map(contactItems => (
              <li key={contactItems.linkURL}>
                <a 
                  href={contactItems.linkURL}
                  aria-label={contactItems.linkText}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h4 className="contact-label">{contactItems.subHeading}</h4>
                  <span className="contact-link-name">{contactItems.linkText}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-block section-block--testimonials">
        <div className="container">
         <h2 className="section-title">testimonials</h2>
         <div className="slider-wrapper">
         <Slider {...settings}>
         <div>
          <p>“I enjoy Jess’s classes blah blah blah …”</p>
          <p><strong>Jane Smith, corporate 1</strong></p>
          </div>
          <div>
          <p>“I enjoy Jess’s classes blah blah blah …”</p>
          <p><strong>Jane Smith, corporate 2</strong></p>
          </div>
          <div>
          <p>“I enjoy Jess’s classes blah blah blah …”</p>
          <p><strong>Jane Smith, corporate 3</strong></p>
          </div>
         </Slider>
        </div>
        </div>
      </section>
    </>
  );
};

class HomePage extends React.Component {
  render() {
    const { data } = this.props;
    const {
      data: { footerData, navbarData },
    } = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
    const {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    } = home;

    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 7000,
      autoplaySpeed: 5000,
      cssEase: "linear"
    };

    return (
      <Layout footerData={footerData} navbarData={navbarData}>
        <Helmet>
          <meta name="title" content={seoTitle} />
          <meta name="description" content={seoDescription} />
          <title>{browserTitle}</title>
          <script data-cfasync="false" data-tockify-script="embed" src="https://public.tockify.com/browser/embed.js"></script>
        </Helmet>
        <HomePageTemplate home={home} settings={settings} />
      </Layout>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery {
    ...LayoutFragment
    homePageData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "home-page" } } }) {
      edges {
        node {
          frontmatter {
            bannerText {
              itemText
            }
            sectionWelcome {
              title
              body
              quote
              image
              imageAlt
              highlightedText
              pageLink {
                text
                linkURL
              }
            }
            sectionSchedule {
              title
              classesTimetable {
                subHeading
                body
              }
              comingUp {
                subHeading
                body
              }
              thisMonth {
                sectionHeading
                subHeading
                body
              }
              pageLink {
                text
                linkURL
              }
            }
            sectionMyStory {
              title
              body
              quote
              pageLink {
                text
                linkURL
              }
            }
            sectionConnect {
              title
              contact {
                linkText
                linkURL
                subHeading
              }
              services {
                title
                subHeading
                serviceList {
                  title
                  image
                  description
                  linkText
                  linkURL
                }
              }
              subscribe {
                subHeading
                body
              }
            }
            seo {
              browserTitle
              title
              description
            }
          }
        }
      }
    }
  }
`;
