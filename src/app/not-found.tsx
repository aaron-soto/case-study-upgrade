import { Button, buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

const NotFound = () => {
  return (
    <div className="h-full relative flex flex-col py-32 justify-center items-center">
      <div className="flex flex-col items-center my-8">
        <h1 className="text-6xl mb-8 font-bold  text-white font-serif">404</h1>
        <h3 className="text-4xl mb-8 font-semibold text-neutral-500">
          Page not found!
        </h3>
      </div>
      <div className="w-[400px] relative h-[400px] ">
        <div id="plate">
          <div id="cup">
            <div id="cupInner"></div>
            <div id="coffeBg">
              <div id="foamWrapper">
                <div id="foam1" className="foam"></div>
                <div id="foam2" className="foam"></div>
                <div id="foam3" className="foam"></div>
                <div id="foam4" className="foam"></div>
                <div id="foam5" className="foam"></div>
                <div id="foam6" className="foam"></div>
                <div id="foam7" className="foam"></div>
                <div id="foam8" className="foam"></div>
                <div id="foam9" className="foam"></div>
                <div id="foam10" className="foam"></div>
                <div id="foam11" className="foam"></div>
                <div id="foam12" className="foam"></div>
                <div id="foam13" className="foam"></div>

                <div id="foamMiddleWrapper">
                  <div id="foamMiddleContainer">
                    <div id="foamMiddle1" className="foamMiddle"></div>
                    <div id="foamMiddle2" className="foamMiddle"></div>
                    <div id="bubbleMiddle1" className="bubble"></div>
                    <div id="bubbleMiddle2" className="bubble"></div>
                    <div id="bubbleMiddle3" className="bubble"></div>
                    <div id="bubbleMiddle4" className="bubble"></div>
                  </div>
                </div>

                <div id="bubble1" className="bubble"></div>
                <div id="bubble2" className="bubble"></div>
                <div id="bubble3" className="bubble"></div>
                <div id="bubble4" className="bubble"></div>
                <div id="bubble5" className="bubble"></div>
                <div id="bubble6" className="bubble"></div>
                <div id="bubble7" className="bubble"></div>
                <div id="bubble8" className="bubble"></div>
                <div id="bubble9" className="bubble"></div>
                <div id="bubble10" className="bubble"></div>
                <div id="bubble11" className="bubble"></div>
                <div id="bubble12" className="bubble"></div>
                <div id="bubble13" className="bubble"></div>
                <div id="bubble14" className="bubble"></div>
                <div id="bubble15" className="bubble"></div>

                <div id="bubbleSmall1" className="bubbleSmall"></div>
                <div id="bubbleSmall2" className="bubbleSmall"></div>
                <div id="bubbleSmall3" className="bubbleSmall"></div>
                <div id="bubbleSmall4" className="bubbleSmall"></div>
                <div id="bubbleSmall5" className="bubbleSmall"></div>
                <div id="bubbleSmall6" className="bubbleSmall"></div>
                <div id="bubbleSmall7" className="bubbleSmall"></div>
                <div id="bubbleSmall8" className="bubbleSmall"></div>
              </div>
              <div id="innerShadow"></div>
              <div id="glow"></div>
            </div>
          </div>
          <div id="handle"></div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center">
        <p className="text-[#ad7335] text-lg mt-16">
          This page took a coffee break, how about a refill a the homepage?
        </p>
        <Link
          href="/"
          className={buttonVariants({
            variant: "secondary",
            className: "mt-4",
          })}
        >
          Home Page
        </Link>
      </div>

      <div id="steamWrapper">
        <div id="steam"></div>
      </div>

      <svg width="0" height="0">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
              id="blurFilter"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -5"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <svg width="0" height="0">
        <defs>
          <filter id="scatter">
            <feTurbulence
              baseFrequency="10.9"
              type="fractalNoise"
              numOctaves="1"
            />
            <feDisplacementMap
              in="SourceGraphic"
              xChannelSelector="G"
              yChannelSelector="B"
              scale="20"
            />
            <feComposite operator="in" in2="finalMask" />
          </filter>
        </defs>
      </svg>

      <svg width="0" height="0">
        <filter id="fog">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".01"
            numOctaves="10"
          />
          <feDisplacementMap in="SourceGraphic" scale="180" />
        </filter>
      </svg>
    </div>
  );
};

export default NotFound;
