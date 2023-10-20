import React, { ReactNode } from "react";

type TSkeleton = {
  children: ReactNode;
  isLoading: boolean;
  skeletonComponent: JSX.Element;
};

export default function Skeleton({
  children,
  isLoading,
  skeletonComponent,
}: TSkeleton) {
  return isLoading ? skeletonComponent : children;
}
