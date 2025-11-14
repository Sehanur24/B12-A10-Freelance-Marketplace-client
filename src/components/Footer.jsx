import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer-glass mt-16">
            <div className="container-max grid grid-cols-1 md:grid-cols-4 gap-10">


                <div>
                    <h2 className="logo-text">Zylos</h2>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                        A next-generation freelance marketplace where creators,
                        developers and innovators collaborate and grow.
                    </p>
                </div>


                <div>
                    <h3 className="footer-title">Services</h3>
                    <ul className="space-y-2 mt-3">
                        <li className="footer-link">Branding</li>
                        <li className="footer-link">Design</li>
                        <li className="footer-link">Marketing</li>
                        <li className="footer-link">Advertisement</li>
                    </ul>
                </div>


                <div>
                    <h3 className="footer-title">Company</h3>
                    <ul className="space-y-2 mt-3">
                        <li><Link className="footer-link">About Zylos</Link></li>
                        <li><Link className="footer-link">Our Mission</Link></li>
                        <li><Link className="footer-link">Privacy Policy</Link></li>
                        <li><Link className="footer-link">Terms of Service</Link></li>
                    </ul>
                </div>


                <div>
                    <h3 className="footer-title">Contact & Social</h3>
                    <ul className="space-y-2 mt-3">
                        <li className="footer-link">support@zylos.com</li>
                        <li className="footer-link">+880 1234-567890</li>
                    </ul>

                    <div className="flex items-center gap-4 mt-4">
                        <a href="#" className="social-icon"><Facebook size={20} /></a>
                        <a href="#" className="social-icon"><FaXTwitter size={20} /></a>
                        <a href="#" className="social-icon"><Instagram size={20} /></a>
                    </div>
                </div>

            </div>


            <div className="border-t border-white/10 mt-10 pt-4 text-center text-slate-400">
                Copyright © {year} — All Rights Reserved by Zylos
            </div>
        </footer>
    );
};

export default Footer;
