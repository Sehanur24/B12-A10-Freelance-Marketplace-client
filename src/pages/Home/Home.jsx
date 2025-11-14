import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import JobCard from "../../components/JobCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const B1 = "https://i.ibb.co/ymVTYmq6/CRM-POST-1720285667858.jpg";
const B2 = "https://i.ibb.co/mCPh0TqQ/What-are-Hosted-Services-and-How-it-Revolutionizes-Modern-Business.jpg";
const B3 = "https://i.ibb.co/vCNxj27w/flat-lay-black-background-with-laptop-coffee-cup-calculator-top-view.jpg";

const ABOUT_IMG = "https://i.ibb.co/PvFMxMFp/6070b0658f4803368fde5a9e-freelance-web-developer-at-work.jpg";

const Home = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get("/jobs")
            .then(res => setJobs(res.data.slice(0, 6)))
            .catch(() => console.log("Failed to load jobs"));
    }, []);

    return (
        <div>

            <div className="w-full md:max-w-6xl md:mx-auto md:rounded-xl overflow-hidden">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    pagination={{ clickable: true }}
                    className="mb-12"
                >
                    <SwiperSlide>
                        <div
                            className="h-[330px] md:h-[420px] bg-cover bg-center flex items-center px-6 md:px-14 relative"
                            style={{ backgroundImage: `url('${B1}')` }}
                        >
                            <div className="absolute inset-0 bg-black/40"></div>

                            <div className="relative max-w-lg text-white">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow">
                                    Build Your Career in the Marketplace
                                </h1>
                                <p className="text-slate-200 mb-5">
                                    Connect with skilled freelancers and post jobs easily.
                                </p>

                                <div className="flex gap-4">
                                    <a href="/addJob" className="btn-primary">Create a Job</a>
                                    <a href="/allJobs" className="btn-primary">Explore Jobs</a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            className="h-[330px] md:h-[420px] bg-cover bg-center flex items-center justify-center text-center px-6 relative"
                            style={{ backgroundImage: `url('${B2}')` }}
                        >
                            <div className="absolute inset-0 bg-black/35"></div>

                            <div className="relative max-w-xl text-white">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow">
                                    Hire Top Talents for Your Project
                                </h1>
                                <p className="text-gray-200 mb-5">
                                    Find the perfect expert for your next big idea.
                                </p>
                                <a href="/allJobs" className="btn-primary">Browse Jobs</a>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            className="h-[330px] md:h-[420px] bg-cover bg-center flex items-center justify-end text-right px-6 md:px-14 relative"
                            style={{ backgroundImage: `url('${B3}')` }}
                        >
                            <div className="absolute inset-0 bg-black/45"></div>

                            <div className="relative max-w-lg text-white">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow">
                                    A Secure Freelance Platform
                                </h1>
                                <p className="text-slate-200 mb-5">
                                    Work confidently with trusted features.
                                </p>
                                <a href="/register" className="btn-primary">Get Started</a>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="container-max">

                <section className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        Latest Job Posts
                    </h2>

                    {jobs.length === 0 ? (
                        <div className="min-h-[120px] flex items-center">
                            <div className="loading mx-auto"></div>
                        </div>
                    ) : (
                        <div className="jobs-grid">
                            {jobs.map(job => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    )}
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        Top Categories
                    </h2>

                    <div className="overflow-hidden relative">
                        <div className="flex gap-8 animate-marquee">

                            <CategoryCard img="https://i.ibb.co/Fcyjfmk/Launch-a-Website-That-Works-While-You-Sleep.jpg" title="Web Development" />
                            <CategoryCard img="https://i.ibb.co/G31dDSxc/NES-AGENCY.jpg" title="Digital Marketing" />
                            <CategoryCard img="https://i.ibb.co/rnm7D9V/download.jpg" title="Graphics Design" />
                            <CategoryCard img="https://i.ibb.co/kgxbNc1Q/What-Are-The-Benefits-Of-An-i-OS-App-Development-Agency.jpg" title="App Development" />
                            <CategoryCard img="https://i.ibb.co/fdJbp9r1/Write-to-connect-write-to-inspire.jpg" title="Content Writing" />
                            <CategoryCard img="https://i.ibb.co/zHScfJm5/Illustrations-for-Videosmile-Evgenii-Dolgov-Numicor.jpg" title="Video Editing" />

                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                        About Zylos
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 items-center">

                        <img
                            src={ABOUT_IMG}
                            className="rounded-xl shadow-lg border border-white/10 w-full h-[280px] md:h-[420px] object-cover"
                        />

                        <p className="text-slate-300 leading-7 text-base md:text-lg">
                            Zylos is a modern freelance marketplace where clients can post
                            jobs and freelancers can accept work instantly. Our mission is
                            to make collaboration seamless and secure worldwide.
                            <br /><br />
                            Whether you're a developer, designer, or marketer — Zylos helps
                            you grow professionally.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
};

const CategoryCard = ({ img, title }) => (
    <div className="min-w-[220px] md:min-w-[260px] h-40 md:h-[180px] rounded-xl overflow-hidden shadow-lg border border-white/10 relative">
        <img src={img} className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/40"></div>

        <h3 className="absolute bottom-2 left-2 text-lg md:text-xl font-semibold text-gray-200 drop-shadow-lg">
            {title}
        </h3>
    </div>
);

export default Home;
