import React from 'react';
import BlogImg from '../../assets/images/construction3.jpg'

const BlogNews = () => {
    return (
        <section className="section-6 bg-light py-5">
            <div className="container">
                <div className="section-header text-center">
                    <span>Blog & News</span>
                    <h2>Articles & blog posts</h2>
                    <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                </div>
                <div className='row pt-3'>
                    <div className="col-md-4">
                        <div className="card shadow border-0">
                            <div className='card-img-top'>
                                <img src={BlogImg} alt="Blog Img" className='w-100' />
                            </div>
                            <div className="card-body p-4">
                                <div className='mb-3'>
                                    <a href="#" className='title'>Dummy Blog Title</a>
                                </div>
                                <a href="#" className='btn btn-primary small-btn'>Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow border-0">
                            <div className='card-img-top'>
                                <img src={BlogImg} alt="Blog Img" className='w-100' />
                            </div>
                            <div className="card-body p-4">
                                <div className='mb-3'>
                                    <a href="#" className='title'>Dummy Blog Title</a>
                                </div>
                                <a href="#" className='btn btn-primary small-btn'>Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow border-0">
                            <div className='card-img-top'>
                                <img src={BlogImg} alt="Blog Img" className='w-100' />
                            </div>
                            <div className="card-body p-4">
                                <div className='mb-3'>
                                    <a href="#" className='title'>Dummy Blog Title</a>
                                </div>
                                <a href="#" className='btn btn-primary small-btn'>Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogNews
