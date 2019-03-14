import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import AnchorLink from 'react-anchor-link-smooth-scroll';

import Layout from "../components/Layout";
import { Introduction } from '../components/Introduction'
import { Schedule } from '../components/Schedule'
import { MyStory } from '../components/MyStory'
import { Services } from '../components/Services'
import { Contact } from '../components/Contact'
import { Testimonials } from '../components/Testimonials'

import "../styles/home.scss";

export const HomePageTemplate = ({ 
    home,  
    introduction, 
    mystory, 
    contact,
    testimonials
 }) => {
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
      <Introduction data={introduction} />
      <Schedule data={home} />
      <MyStory data={mystory} />
      <Services data={home} />
      <Contact data={contact} />
      <Testimonials data={testimonials} />
    </>
  );
};

class HomePage extends React.Component {
  
  render() {
    const { data } = this.props;
    const { data: { footerData, navbarData },} = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
    const {seo: { title: seoTitle, description: seoDescription, browserTitle },} = home;
    const { frontmatter: introduction } = data.introduction.edges[0].node;
    const { frontmatter: mystory } = data.mystory.edges[0].node;
    const { frontmatter: contact } = data.contact.edges[0].node;
    const { frontmatter: testimonials } = data.testimonials.edges[0].node;
    return (
      <Layout footerData={footerData} navbarData={navbarData}>
        <Helmet>
          <meta name="title" content={seoTitle} />
          <meta name="description" content={seoDescription} />
          <title>{browserTitle}</title>
          <script 
            defer
            async
            data-cfasync="false" 
            data-tockify-script="embed" 
            src="https://public.tockify.com/browser/embed.js"
          />
        </Helmet>
        <HomePageTemplate 
          home={home} 
          introduction={introduction} 
          mystory={mystory}
          contact={contact}
          testimonials={testimonials}
        />
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
    introduction: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "introduction" } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            quote
            image
            content
            highlightedText
            pageLink {
              label
              link
            }
          }
        }
      }
    }
    mystory: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "my-story" } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            quote
            content
            pageLink {
              label
              link
            }
          }
        }
      }
    }
    contact: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "contact" } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            contactList {
              subHeading
              text
              link
            }
          }
        }
      }
    }
    testimonials: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "testimonials" } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            testimonialList {
              author
              description
            }
          }
        }
      }
    }
    homePageData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "home-page" } } }) {
      edges {
        node {
          frontmatter {
            bannerText {
              itemText
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
            sectionTestimonial {
              title
              testimonialList {
                author
                description
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
