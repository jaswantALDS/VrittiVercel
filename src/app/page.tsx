// "use client";
import { Config } from "@/constants/config";
// import Card from "@/components/ui/Card";
// import Charts from "@/components/ui/Charts";
// import CardPrototype from "@/components/ui/CardPrototype";
// import { AppAssets } from "@/constants/assets";
// import { HiOutlineSearch, HiUser, HiUserAdd } from "react-icons/hi";
// import Skeleton from "@/components/Skeleton";
// import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { Constants } from "@/constants/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"auth/employee/authentication"}>
        <p>Dashboard-</p>
      </Link>
    </div>
  );
}
