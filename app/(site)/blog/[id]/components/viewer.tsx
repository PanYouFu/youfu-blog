"use client";

import React from "react";

import { Viewer } from "@bytemd/react";
import { plugins } from "@/features/management/components/mdEditor";

type BytemdViewerProps = {
  body: string;
};

const MdViewer = ({ body }: BytemdViewerProps) => {
  return <Viewer value={body} plugins={plugins} />;
};

export default MdViewer;
