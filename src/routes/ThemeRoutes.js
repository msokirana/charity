import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Login from "../views/Login/index.js";
import { useAuth } from "../context/AuthContext.js";
import FullLayout from "../layouts/FullLayout"; // Import FullLayout component

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const MyFunds = lazy(() => import("../views/MyFunds/index.js"));
const Alerts = lazy(() => import("../views/ui/Alerts.js"));
const Badges = lazy(() => import("../views/ui/Badges.js"));
const Buttons = lazy(() => import("../views/ui/Buttons.js"));
const Cards = lazy(() => import("../views/ui/Cards.js"));
const Grid = lazy(() => import("../views/ui/Grid.js"));
const Tables = lazy(() => import("../views/ui/Tables.js"));
const Forms = lazy(() => import("../views/ui/Forms.js"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs.js"));
const AddCampaignPage = lazy(() => import("../views/AddCampaign.js"));

/*****Routes******/

const ThemeRoutes = () => {
  const { isAuthenticated } = useAuth(); // Use your authentication context or hook
  console.log("isAuthenticated", isAuthenticated)

  return (
    <>
      {isAuthenticated ? (
        <FullLayout> {/* Wrap routes with FullLayout component */}
          {[
            { path: "/", element: <Navigate to="/starter" /> },
            { path: "/starter", exact: true, element: <Starter /> },
            { path: "/add-campaign", exact: true, element: <AddCampaignPage /> },
            { path: "/my-fund", exact: true, element: <MyFunds /> },
            { path: "/alerts", exact: true, element: <Alerts /> },
            { path: "/badges", exact: true, element: <Badges /> },
            { path: "/buttons", exact: true, element: <Buttons /> },
            { path: "/cards", exact: true, element: <Cards /> },
            { path: "/grid", exact: true, element: <Grid /> },
            { path: "/table", exact: true, element: <Tables /> },
            { path: "/forms", exact: true, element: <Forms /> },
            { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
          ]}
        </FullLayout>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ThemeRoutes;
