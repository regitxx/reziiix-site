"use client";

import React from "react";

export default function NeuralGradient() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            <div className="neural-layer neural-layer-1" />
            <div className="neural-layer neural-layer-2" />
            <div className="neural-layer neural-layer-3" />
        </div>
    );
}
