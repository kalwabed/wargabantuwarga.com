import { Layout } from "../components/layout";
import { attributes, html } from "../_content/home-page.md";

const HomePage = () => (
  <Layout>
    <article>
      <h1>{attributes.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
    <style jsx>{`
      article {
        margin: 0 auto;
      }
      h1 {
        text-align: center;
      }
    `}</style>
  </Layout>
);

export default HomePage;
