import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);


    const ToggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth' // For smooth scrolling
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', ToggleVisibility);
        return () => {
            window.removeEventListener('scroll', ToggleVisibility);
        };
    }, []);

    return (
        <button>
            {isVisible && (
                <div className="scroll-to-top" onClick={scrollToTop}>
                    ↑
                </div>
            )}
        </button>
    )

};

export default ScrollToTopButton;