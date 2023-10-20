import React from "react";
import SkeletonAvatar from "./SkeletonAvatar";
import SkeletonParagraph from "./SkeletonParagraph";
import CardPrototype from "../ui/CardPrototype";

export default function SkeletonCard() {
  return (
    <CardPrototype>
      <div className="mx-auto flex space-x-2">
        <SkeletonAvatar />
        <SkeletonParagraph />
      </div>
    </CardPrototype>
  );
}
