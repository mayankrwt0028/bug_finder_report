import DashboardIcon from "@mui/icons-material/Dashboard";
import BugReportIcon from "@mui/icons-material/BugReport";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";

export const menuItems = {
  ADMIN: [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: DashboardIcon,
    },
    {
      title: "Projects",
      path: "/admin/projects",
      icon: FolderIcon,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: PeopleIcon,
    },
    {
      title: "Bugs",
      path: "/admin/bugs",
      icon: BugReportIcon,
    },
    {
      title: "Reports",
      path: "/admin/reports",
      icon: AssessmentIcon,
    },
  ],

  MANAGER: [
    {
      title: "Dashboard",
      path: "/manager/dashboard",
      icon: DashboardIcon,
    },
    {
      title: "Projects",
      path: "/manager/projects",
      icon: FolderIcon,
    },
    {
      title: "Bugs",
      path: "/manager/bugs",
      icon: BugReportIcon,
    },
  ],

  QA: [
    {
      title: "Dashboard",
      path: "/qa/dashboard",
      icon: DashboardIcon,
    },
    {
      title: "Report Bug",
      path: "/qa/report-bug",
      icon: BugReportIcon,
    },
    {
      title: "My Bugs",
      path: "/qa/bugs",
      icon: FolderIcon,
    },
  ],

  DEVELOPER: [
    {
      title: "Dashboard",
      path: "/developer/dashboard",
      icon: DashboardIcon,
    },
    {
      title: "Assigned Bugs",
      path: "/developer/bugs",
      icon: BugReportIcon,
    },
  ],
};