import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content p-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Services */}
         

                {/* Company */}
               
                {/* Legal */}
               

                {/* Your Info */}
                <div>
                    <h6 className="footer-title">Developer Info</h6>
                    <p>Md Harun</p>
                    <p>Email: <a href="mailto:harun01.dev@gmail.com" className="link link-hover">harun01.dev@gmail.com</a></p>
                    <div className="flex space-x-4 mt-2">
                        <a href="https://www.facebook.com/share/1YABaDzNJe/" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="text-xl hover:text-primary" />
                        </a>
                        <a href="https://github.com/harun241" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-xl hover:text-primary" />
                        </a>
                        <a href="https://www.linkedin.com/in/md-harun-or-rashid-409aaa363/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn className="text-xl hover:text-primary" />
                        </a>
                        <a href="mailto:harun01.dev@gmail.com">
                            <FaEnvelope className="text-xl hover:text-primary" />
                        </a>
                    </div>
                </div>

                 <nav className='flex-col-reverse'>
                  <h1>company</h1>
                   <h2>SH Company Ltd</h2>
                </nav>

            </div>

            <div className="text-center mt-10 border-t border-gray-600 pt-4 text-sm">
                © {new Date().getFullYear()} MD Harun. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
