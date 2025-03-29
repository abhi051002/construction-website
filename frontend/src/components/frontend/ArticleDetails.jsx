import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-latest-articles?limit=5`
      );
      const result = await response.json();
      setLatestArticles(result);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchArticleDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-article/${id}`
      );
      const result = await response.json();
      setArticle(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticleDetails();
    fetchArticles();
  }, [id]);
  return (
    <main>
      <section className="section-12">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-left">
              <span>Quality, Integrity, Value.</span>
              <h1>Blog & News</h1>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-8">
              <h2>{article.title}</h2>
              <div className="pb-3">
                by <strong>{article.author}</strong> on {article.created_at}
              </div>
              <div className="pr-md-5 pb-3">
                <img
                  className="w-100"
                  src={`${
                    import.meta.env.VITE_FILE_URL
                  }/uploads/articles/large/${article.image}`}
                  alt=""
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>
            <div className="col-md-4">
              <div className="card shadow border-0 sidebar">
                <div className="card-body px-5 py-4">
                  <h3 className="mt-2 mb-3">Latest Blogs</h3>
                  {latestArticles &&
                    latestArticles.map((article) => {
                      return (
                        <div className="d-flex border-bottom mb-3 pb-2" key={article.id}>
                          <div className="pe-3 pb-2">
                            <img
                              width={100}
                              src={`${
                                import.meta.env.VITE_FILE_URL
                              }/uploads/articles/small/${article.image}`}
                              alt=""
                            />
                          </div>
                          <Link className="title" to={`/blogs/${article.id}`}>
                            {article.title}
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArticleDetails;
