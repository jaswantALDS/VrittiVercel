import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import EmployeeController from "@/controllers/employee";
import { User } from "@/models/User";
import { store } from "@/store";
import { setUser } from "@/store/userSlice";
import Preloader from "@/components/Preloader";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const controller = new EmployeeController(session?.user?.image?.toString());
  const user: User = await controller.employee_me();

  await store.dispatch(
    setUser({ ...user, accessToken: session?.user?.image?.toString() })
  );

  return (
    <div>
      <Preloader user={{ ...user, accessToken: session?.user?.image }} />
      {children}
    </div>
  );
}
