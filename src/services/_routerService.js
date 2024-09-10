import Widgets from "Routes/widgets";
import AdvanceUIComponents from "Routes/advance-ui-components";
import ChartsComponents from "Routes/charts";
import Components from "Routes/components";
import Icons from "Routes/icons";
import Dashboard from "Routes/dashboard";
import Crm from "Routes/crm";
import Maintenance from "../container/Maintenance";
import UserProfile from "../routes/userProfile/index";
import NewListArea from "../routes/area/index";
import NewListReferBy from "../routes/referby/index";
import NewListService from "../routes/service/index";
import NewListServiceSub from "../routes/servicesub/index";
import NewListServicePrice from "../routes/serviceprice/index";
import NewListTeam from "../routes/team/index";
import NewListVendor from "../routes/vendor/index";
import NewListBooking from "../routes/booking/index";
import BookingDownload from "../routes/downloads/booking/index";
import VendorDownload from "../routes/downloads/vendor/index";
import PendingPaymentDownload from "../routes/downloads/pendingpayment/index";
import ReceivedPaymentDownload from "../routes/downloads/receivedpayment/index";
import { AsyncAboutUsComponent } from "Components/AsyncComponent/AsyncComponent";
import NewListBranch from "../routes/branch/index";
import NewListNotification from "../routes/notification/index";
import NewListOfficeTeam from "../routes/team-office/index";
import NewListManagerTeam from "../routes/team-manager/index";
import NewListPayment from "../routes/payment/index";
import NewListCommission from "../routes/commission/index";
import NewListTodayBooking from "../routes/bookingToday/index";
import NewListTomorrowBooking from "../routes/bookingTomorrow/index";
import NewListIdeal from "../routes/ideal/index";

export default [{
        path: "dashboard",
        component: Dashboard,
    },
    {
        path: "crm",
        component: Crm,
    },
    {
        path: "widgets",
        component: Widgets,
    },
    {
        path: "icons",
        component: Icons,
    },
    {
        path: "about-us",
        component: AsyncAboutUsComponent,
    },
    {
        path: "charts",
        component: ChartsComponents,
    },
    {
        path: "ui-components",
        component: Components,
    },
    {
        path: "advanced-component",
        component: AdvanceUIComponents,
    },
    {
        path: "maintenance",
        component: Maintenance,
    },
    {
        path: "users",
        component: UserProfile,
    },
    {
        path: "area",
        component: NewListArea,
    },
    {
        path: "referby",
        component: NewListReferBy,
    },
    {
        path: "service",
        component: NewListService,
    },
    {
        path: "service-sub",
        component: NewListServiceSub,
    },
    {
        path: "service-price",
        component: NewListServicePrice,
    },
    {
        path: "team",
        component: NewListTeam,
    },
    {
        path: "vendor",
        component: NewListVendor,
    },
    {
        path: "booking",
        component: NewListBooking,
    },
    {
        path: "booking-download",
        component: BookingDownload,
    },
    {
        path: "vendor-download",
        component: VendorDownload,
    },
    {
        path: "pending-payment-download",
        component: PendingPaymentDownload,
    },
    {
        path: "received-payment-download",
        component: ReceivedPaymentDownload,
    },
    {
        path: "branch",
        component: NewListBranch,
    },
    {
        path: "notification",
        component: NewListNotification,
    },
    {
        path: "office-team",
        component: NewListOfficeTeam,
    },
    {
        path: "manager-team",
        component: NewListManagerTeam,
    },
    {
        path: "payment",
        component: NewListPayment,
    },
    {
        path: "commission",
        component: NewListCommission,
    },
    {
        path: "booking-today",
        component: NewListTodayBooking,
    },
    {
        path: "booking-tomorrow",
        component: NewListTomorrowBooking,
    },
    {
        path: "ideal-field",
        component: NewListIdeal,
    },
];