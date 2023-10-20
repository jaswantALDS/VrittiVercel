import BrandSection from "./BrandSection";
import SideMenu from "./SideMenu";

export default function Sidebar() {
  return (
    <div className="bg-black h-full w-full text-white rounded-lg p-2 shadow-md flex flex-col">
      <BrandSection />
      <SideMenu />
      {/* <div>Footer</div> */}
    </div>
  );
}
