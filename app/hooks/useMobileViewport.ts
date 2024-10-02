import { useState, useEffect } from 'react';

const useMobileViewport = (breakpoint = 720) => {
    if (typeof window === 'undefined') {
        return false
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    return isMobile;
};

export default useMobileViewport;
