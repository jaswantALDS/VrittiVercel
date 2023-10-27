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
import { store } from "@/store";
import MessageCard from "@/components/ui/MessageCard";
import StarRating from "@/components/ui/StarRating";
export default function Dashboard() {
  const user: any = store.getState().userReducer.user;
  console.log(user);
  return (
    <>
      {!user.is_verified ? (
        <MessageCard>
          <div className=" text-white">
            <p className="font-medium text-xl">
              Your profile is currently under process{" "}
            </p>
            <p className="text-sm">
              Our team is diligently working to process your information. We
              appreciate your patience and understanding during this time.
            </p>
          </div>
        </MessageCard>
      ) : !user.is_interview ? (
        <MessageCard>
          <div className=" text-white">
            <p className="font-medium text-xl">
              Congratulations Your profile is Verified.
            </p>
            <div className="flex justify-between items-center">
              <p className="text-sm">
                To move forward, please schedule your interview at your earliest
                convenience.
              </p>
              <button className="bg-orange-400 hover:bg-orange-300 text-white font-medium py-2 px-6 rounded-lg focus:outline-none">
                Schedule Interview
              </button>
            </div>
          </div>
        </MessageCard>
      ) : (
        <div className="mt-1">
          <div className="flex border bg-gray-800 justify-evenly rounded-2xl shadow-md p-4 w-[100%]  items-center overflow-hidden">
            <div className="flex flex-col items-center justify-center ">
              <div className="flex items-center mr-5">
                <span className="text-[17px] text-white">5.0</span>
                <StarRating rating={5} starSize={10} />
              </div>
              <p className="text-1xl text-white mt-2">Interview Ratings</p>
            </div>
            <div className="text-white border-b border-white text-xl px-8 py-1">
              Profile Rating
            </div>
            <div className=" flex flex-col items-center justify-center ">
              <div className="flex items-center mr-5">
                <span className="text-[17px] text-white">5.0</span>
                <StarRating rating={5} starSize={10} />
              </div>
              <p className="text-1xl text-white mt-2">Work Ratings</p>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-y-scroll w-full scrollbar-hide">
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
    </>
  );
}
