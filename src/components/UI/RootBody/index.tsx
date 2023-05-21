"use client";

import { useGradientConfig } from "@/contexts/gradient";
import { useLenis, Lenis as ReactLenis } from "@studio-freight/react-lenis";
import React from "react";
import { RootBodyElement } from "./styles";

interface Props {
  children: React.ReactNode;
}

type LenisScrollEvent = {
  velocity: number;
};

const RootBody = ({ children }: Props) => {
  const { setScrollDiff } = useGradientConfig();

  useLenis(({ velocity }: LenisScrollEvent) => {
    setScrollDiff(velocity);
  });

  return (
    <ReactLenis root>
      <RootBodyElement>{children}</RootBodyElement>
    </ReactLenis>
  );
};

export default RootBody;
