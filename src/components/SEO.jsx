import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, url }) => {
    return (
        <Helmet>
            <title>{title} | Codeya</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={`https://codeya.tech${url}`} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={`https://codeya.tech${url}`} />
        </Helmet>
    );
};

export default SEO;