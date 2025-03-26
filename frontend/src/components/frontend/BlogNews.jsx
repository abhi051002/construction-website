import React, { useEffect, useState } from "react";
import BlogImg from "../../assets/images/construction3.jpg";

const BlogNews = ({ limit = 3 }) => {
  const [articles, setArticle] = useState([]);
  const fetchLatestArticles = async () => {
    try {
      const route =
        limit === "all" ? "get-articles" : "get-latest-articles?limit=3";
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/${route}`
      );
      const result = await response.json();
      setArticle(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestArticles();
  }, []);
  return (
    <section className="section-6 bg-light py-5">
      <div className="container">
        <div className="section-header text-center">
          <span>Blog & News</span>
          <h2>Articles & blog posts</h2>
          <p>
            We offer a diverse array of construction services, spanning
            residential, commercial, and industrial projects.
          </p>
        </div>
        <div className="row pt-3">
          {articles &&
            articles.map((article) => {
              return (
                <div
                  className={`col-md-4 ${limit == "all" ? "mb-4" : ""}`}
                  key={article.id}
                >
                  <div className="card shadow border-0">
                    <div className="card-img-top">
                      <img
                        src={`${
                          import.meta.env.VITE_FILE_URL
                        }/uploads/articles/small/${article.image}`}
                        alt=""
                        className="w-100"
                      />
                    </div>
                    <div className="card-body p-4">
                      <div className="mb-3">
                        <a href="#" className="title">
                          {article.title}
                        </a>
                      </div>
                      <a href="#" className="btn btn-primary small-btn">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default BlogNews;
