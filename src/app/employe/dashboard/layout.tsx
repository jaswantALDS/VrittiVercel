import DashboardLayout from "@/layouts/DashboardLayout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
