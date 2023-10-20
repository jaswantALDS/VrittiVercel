import Card from "@/components/ui/Card";
import Charts from "@/components/ui/Charts";
import CardPrototype from "@/components/ui/CardPrototype";
import { AppAssets } from "@/constants/assets";
import { HiOutlineSearch, HiUser, HiUserAdd } from "react-icons/hi";
import Skeleton from "@/components/Skeleton";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import UserList from "@/components/ui/UserList";
import { Dummy } from "@/constants/dummy";
import Buttons from "@/components/controls/Buttons";
import Pagination from "@/components/ui/Paginated";
export default function Dashboard() {
  return (
    <div className="overflow-y-scroll w-full">
      <div className="flex flex-wrap   md:-mx-1 py-3 gap-y-2">
        <div className="w-full md:w-1/3 md:px-2">
          <Card
            title="Employees"
            subtitle="Team Lead"
            cardImage={JSON.stringify(AppAssets.avatar)}
            iconLimit={3}
            icons={[
              { icon: HiOutlineSearch, href: "/" },
              { icon: HiUser, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
            ]}
          />
        </div>
        <div className="w-full md:w-1/3 md:px-2">
          <Card
            title="Employees"
            subtitle="Team Lead"
            cardImage={JSON.stringify(AppAssets.avatar)}
            iconLimit={3}
            icons={[
              { icon: HiOutlineSearch, href: "/" },
              { icon: HiUser, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
            ]}
          />
        </div>
        <div className="w-full md:w-1/3 md:px-2">
          <Card
            title="Employees"
            subtitle="Team Lead"
            cardImage={JSON.stringify(AppAssets.avatar)}
            iconLimit={3}
            icons={[
              { icon: HiOutlineSearch, href: "/" },
              { icon: HiUser, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-wrap overflow-x-hidden md:-mx-1 py-3 gap-y-5">
        <div className="w-full md:w-1/1 md:px-2 self-stretch">
          <CardPrototype>
            <Charts />
            <Buttons title="Add Product" />
          </CardPrototype>
        </div>
        <div className="w-full md:w-1/3 md:px-2 self-stretch">
          <CardPrototype>
            <Charts
              option={{
                series: [44, 55, 13, 33],
                labels: ["Apple", "Mango", "Orange", "Watermelon"],
              }}
              type="donut"
            />
          </CardPrototype>
        </div>
        <div className="w-full md:w-1/3 md:px-2 self-stretch">
          <CardPrototype>
            <Charts
              option={{
                series: [44, 66, 30, 33, 33, 56, 40],
                labels: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
              }}
              type="donut"
            />
          </CardPrototype>
        </div>
        <div className="w-full md:w-1/3 md:px-2 self-stretch">
          <CardPrototype>sdfds</CardPrototype>
        </div>
      </div>
      <div className="flex flex-wrap overflow-x-hidden md:-mx-1 py-3 gap-y-5">
        <div className="w-full md:w-1/3 md:px-2 self-stretch">
          <Skeleton isLoading={true} skeletonComponent={<SkeletonCard />}>
            <CardPrototype>
              <div>Hello</div>
            </CardPrototype>
          </Skeleton>
        </div>
        <div className="w-full md:w-2/3 md:px-2 self-stretch h-96">
          <CardPrototype className="scrollbar-hide">
            <UserList users={Dummy.users} />
          </CardPrototype>
        </div>
      </div>

      <div className="flex flex-wrap overflow-x-hidden md:-mx-1 py-3 gap-y-5">
        <div className="w-full">
          <CardPrototype className="scrollbar-hide">
            <Pagination />
          </CardPrototype>
        </div>
      </div>

      {/* <ReviewCard /> */}
    </div>
  );
}
