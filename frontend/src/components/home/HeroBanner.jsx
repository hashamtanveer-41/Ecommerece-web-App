import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, EffectFade, Navigation, Pagination} from "swiper/modules";
import {bannerLists} from "../../utils/index.js";
import {Link} from "react-router-dom";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3" ];

const HeroBanner = () => {
    return (
        <div className="py-2 rounded-md">
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                slidesPerView={1}
            >
                {bannerLists.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        {/* 1. Main Container */}
                        <div className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i]}`}>

                            {/* 2. Flex wrapper for Text AND Image */}
                            <div className="flex items-center justify-center h-full">

                                {/* Left Column: Text (Hidden on mobile) */}
                                <div className="hidden lg:flex justify-center w-1/2 p-8">
                                    <div className="text-center">
                                        <h3 className="text-3xl text-white font-bold">{item.title}</h3>
                                        <h1 className="text-5xl text-white font-bold mt-2">{item.subtitle}</h1>
                                        <p className="text-white font-bold mt-4">{item.description}</p>
                                        <Link
                                            className="mt-6 inline-block bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800"
                                            to="/products"
                                        >
                                            Shop
                                        </Link>
                                    </div>
                                </div>

                                {/* Right Column: Image (Visible on all) */}
                                <div className='w-full flex justify-center lg:w-1/2 p-4'>
                                    <img src={item?.image} alt={item.title} className="max-h-full object-contain" />
                                </div>

                            </div> {/* End of Flex wrapper */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroBanner;



