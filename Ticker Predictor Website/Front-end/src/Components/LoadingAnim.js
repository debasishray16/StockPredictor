import React from "react";

const LoadingAnim = () => {
    return (
        <div className="loader-container">
            <svg
                className="stock-svg"
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Decorative Blocks */}
                <rect x="20" y="70" width="30" height="30" className="chart-block block-1" fill="#3b82f6" opacity="0.2" />
                <rect x="80" y="40" width="30" height="60" className="chart-block block-2" fill="#3b82f6" opacity="0.2" />
                <rect x="140" y="20" width="30" height="80" className="chart-block block-3" fill="#3b82f6" opacity="0.2" />

                {/* Zig-Zag Jumping Line */}
                <polyline
                    points="0,90 35,70 65,85 95,40 125,60 155,20 200,45"
                    className="stock-line-zigzag"
                    filter="url(#glow)"
                />
            </svg>
            <p className="loading-text">Fetching market data...</p>
        </div>
    );
};

export default LoadingAnim;