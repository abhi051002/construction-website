import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AvatarImg from "../../assets/images/author-2.jpg";
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import FiveStar from '../FiveStar';

const Testimonals = () => {
    return (
        <section className="section-5 py-5">
            <div className='container'>
                <div className="section-header text-center">
                    <span>Testimonials</span>
                    <h2>What people are saying about us</h2>
                    <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                </div>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={50}
                    autoplay={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50
                        }
                    }}>
                    <SwiperSlide>
                        <div className="card shadow border-0">
                            <div className='card-body p-5'>
                                <div className="rating">
                                    <FiveStar />
                                </div>
                                <div className='content pt-4 pb-2'>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur fugiat necessitatibus placeat incidunt? Impedit provident est ducimus amet ipsam accusantium, asperiores nesciunt saepe iure nisi.</p>
                                </div><hr />
                                <div className="d-flex meta">
                                    <div>
                                        <img src={AvatarImg} alt="Avatar" width={50} />
                                    </div>
                                    <div className='ps-3'>
                                        <div className='name'>John Doe</div>
                                        <div>CEO</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card shadow border-0">
                            <div className='card-body p-5'>
                                <div className="rating">
                                    <FiveStar />
                                </div>
                                <div className='content pt-4 pb-2'>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur fugiat necessitatibus placeat incidunt? Impedit provident est ducimus amet ipsam accusantium, asperiores nesciunt saepe iure nisi.</p>
                                </div><hr />
                                <div className="d-flex meta">
                                    <div>
                                        <img src={AvatarImg} alt="Avatar" width={50} />
                                    </div>
                                    <div className='ps-3'>
                                        <div className='name'>John Doe</div>
                                        <div>CEO</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card shadow border-0">
                            <div className='card-body p-5'>
                                <div className="rating">
                                    <FiveStar />
                                </div>
                                <div className='content pt-4 pb-2'>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur fugiat necessitatibus placeat incidunt? Impedit provident est ducimus amet ipsam accusantium, asperiores nesciunt saepe iure nisi.</p>
                                </div><hr />
                                <div className="d-flex meta">
                                    <div>
                                        <img src={AvatarImg} alt="Avatar" width={50} />
                                    </div>
                                    <div className='ps-3'>
                                        <div className='name'>John Doe</div>
                                        <div>CEO</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card shadow border-0">
                            <div className='card-body p-5'>
                                <div className="rating">
                                    <FiveStar />
                                </div>
                                <div className='content pt-4 pb-2'>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur fugiat necessitatibus placeat incidunt? Impedit provident est ducimus amet ipsam accusantium, asperiores nesciunt saepe iure nisi.</p>
                                </div><hr />
                                <div className="d-flex meta">
                                    <div>
                                        <img src={AvatarImg} alt="Avatar" width={50} />
                                    </div>
                                    <div className='ps-3'>
                                        <div className='name'>John Doe</div>
                                        <div>CEO</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card shadow border-0">
                            <div className='card-body p-5'>
                                <div className="rating">
                                    <FiveStar />
                                </div>
                                <div className='content pt-4 pb-2'>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur fugiat necessitatibus placeat incidunt? Impedit provident est ducimus amet ipsam accusantium, asperiores nesciunt saepe iure nisi.</p>
                                </div><hr />
                                <div className="d-flex meta">
                                    <div>
                                        <img src={AvatarImg} alt="Avatar" width={50} />
                                    </div>
                                    <div className='ps-3'>
                                        <div className='name'>John Doe</div>
                                        <div>CEO</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}

export default Testimonals