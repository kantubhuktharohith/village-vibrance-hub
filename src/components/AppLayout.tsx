import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";

interface AppLayoutProps {
  showTopBar?: boolean;
  title?: string;
  showBack?: boolean;
}

const AppLayout = ({ showTopBar = true, title, showBack }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {showTopBar && <TopBar title={title} showBack={showBack} />}
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default AppLayout;
