export default {
    //User
    category1: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Booking",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Add Booking",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/add",
                    child_routes: null,
                },
                {
                    menu_title: "Today",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-today",
                    child_routes: null,
                },
                {
                    menu_title: "Tomorrow",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-tomorrow",
                    child_routes: null,
                },
                {
                    menu_title: "Pending",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking",
                    child_routes: null,
                },
                {
                    menu_title: "Inspection",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingInspection",
                    child_routes: null,
                },
                {
                    menu_title: "Confirmed",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingConfirmed",
                    child_routes: null,
                },
                {
                    menu_title: "Vendor Job",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingVendor",
                    child_routes: null,
                },
                {
                    menu_title: "Cancel",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingCancel",
                    child_routes: null,
                },
                {
                    menu_title: "Completed",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingCompleted",
                    child_routes: null,
                },
            ],
        },
    ],
    //User Vendor
    category2: [
        
    ],
    //Vendor
    category3: [
        
    ],
    //Viewer
    category4: [
        
    ],
    category8: [
        

    ],
    //office Staff
    category7: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Master",
            menu_icon: "zmdi zmdi-account",
            path: "",
            child_routes: [
                // {
                //     menu_title: "Area",
                //     menu_icon: "zmdi zmdi-accounts",
                //     path: "/app/area",
                //     child_routes: null,
                // },
                {
                    menu_title: "Refer By",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/referby",
                    child_routes: null,
                },
                
                {
                    menu_title: "Service",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/service",
                    child_routes: null,
                },
                {
                    menu_title: "Service Sub",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/service-sub",
                    child_routes: null,
                },
                {
                    menu_title: "service Price",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/service-price",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Vendor List",
            menu_icon: "zmdi zmdi-accounts",
            path: "/app/vendor",
            child_routes: null,
        },
        {
            menu_title: "Ideal Field List",
            menu_icon: "zmdi zmdi-accounts",
            path: "/app/ideal-field",
            child_routes: null,
        },
        {
            menu_title: "Booking",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Add Booking",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/add",
                    child_routes: null,
                },
                {
                    menu_title: "Today",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-today",
                    child_routes: null,
                },
                {
                    menu_title: "Tomorrow",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-tomorrow",
                    child_routes: null,
                },
                {
                    menu_title: "Pending",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking",
                    child_routes: null,
                },
                {
                    menu_title: "Inspection",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingInspection",
                    child_routes: null,
                },
                {
                    menu_title: "Confirmed",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingConfirmed",
                    child_routes: null,
                },
                {
                    menu_title: "Vendor Job",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingVendor",
                    child_routes: null,
                },
                {
                    menu_title: "Cancel",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingCancel",
                    child_routes: null,
                },
                {
                    menu_title: "Completed",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingCompleted",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Payment",
            menu_icon: "zmdi zmdi-money",
            path: "",
            child_routes: [
                {
                    menu_title: "Pending",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/payment/Pending",
                    child_routes: null,
                },
                {
                    menu_title: "Received",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/payment/Received",
                    child_routes: null,
                },
                
            ],
        },
        {
            menu_title: "Commission",
            menu_icon: "zmdi zmdi-money",
            path: "",
            child_routes: [
                {
                    menu_title: "Pending",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/commission/Pending",
                    child_routes: null,
                },
                {
                    menu_title: "Received",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/commission/Received",
                    child_routes: null,
                },
                
            ],
        },
        {
            menu_title: "Downloads",
            menu_icon: "zmdi zmdi-download",
            path: "",
            child_routes:[
                {
                    menu_title: "Booking",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-download",
                    child_routes: null,
                },
                {
                    menu_title: "Vendor",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/vendor-download",
                    child_routes: null,
                },
                {
                    menu_title: "Received Payment",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/received-payment-download",
                    child_routes: null,
                },
                {
                    menu_title: "Pending Payment",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/pending-payment-download",
                    child_routes: null,
                },
            ]
        },
    ],
    //Admin
    category5: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Master",
            menu_icon: "zmdi zmdi-account",
            path: "",
            child_routes: [
                // {
                //     menu_title: "Area",
                //     menu_icon: "zmdi zmdi-accounts",
                //     path: "/app/area",
                //     child_routes: null,
                // },
                {
                    menu_title: "Refer By",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/referby",
                    child_routes: null,
                },
                
                {
                    menu_title: "Service",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/service",
                    child_routes: null,
                },
                {
                    menu_title: "Service Sub",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/service-sub",
                    child_routes: null,
                },
                {
                    menu_title: "service Price",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/service-price",
                    child_routes: null,
                },
                {
                    menu_title: "Field Team",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/team",
                    child_routes: null,
                },
                {
                    menu_title: "Operation Team",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/office-team",
                    child_routes: null,
                },
                
            ],
        },
        {
            menu_title: "Vendor List",
            menu_icon: "zmdi zmdi-accounts",
            path: "/app/vendor",
            child_routes: null,
        },
        {
            menu_title: "Ideal Field List",
            menu_icon: "zmdi zmdi-accounts",
            path: "/app/ideal-field",
            child_routes: null,
        },
        {
            menu_title: "Booking",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Add Booking",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/add",
                    child_routes: null,
                },
                {
                    menu_title: "Today",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-today",
                    child_routes: null,
                },
                {
                    menu_title: "Tomorrow",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-tomorrow",
                    child_routes: null,
                },
                {
                    menu_title: "Pending",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking",
                    child_routes: null,
                },
                {
                    menu_title: "Inspection",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingInspection",
                    child_routes: null,
                },
                {
                    menu_title: "Confirmed",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingConfirmed",
                    child_routes: null,
                },
                {
                    menu_title: "Vendor Job",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingVendor",
                    child_routes: null,
                },
                {
                    menu_title: "Cancel",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingCancel",
                    child_routes: null,
                },
                {
                    menu_title: "Completed",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingCompleted",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Payment",
            menu_icon: "zmdi zmdi-money",
            path: "",
            child_routes: [
                {
                    menu_title: "Pending",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/payment/Pending",
                    child_routes: null,
                },
                {
                    menu_title: "Received",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/payment/Received",
                    child_routes: null,
                },
                
            ],
        },
        {
            menu_title: "Commission",
            menu_icon: "zmdi zmdi-money",
            path: "",
            child_routes: [
                {
                    menu_title: "Pending",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/commission/Pending",
                    child_routes: null,
                },
                {
                    menu_title: "Received",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/commission/Received",
                    child_routes: null,
                },
                
            ],
        },
        {
            menu_title: "Downloads",
            menu_icon: "zmdi zmdi-download",
            path: "",
            child_routes:[
                {
                    menu_title: "Booking",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-download",
                    child_routes: null,
                },
                {
                    menu_title: "Vendor",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/vendor-download",
                    child_routes: null,
                },
                {
                    menu_title: "Received Payment",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/received-payment-download",
                    child_routes: null,
                },
                {
                    menu_title: "Pending Payment",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/pending-payment-download",
                    child_routes: null,
                },
            ]
        },
    ],
    //super Admin
    category6: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Master",
            menu_icon: "zmdi zmdi-account",
            path: "",
            child_routes: [
                {
                    menu_title: "Branch",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/branch",
                    child_routes: null,
                },
                // {
                //     menu_title: "Area",
                //     menu_icon: "zmdi zmdi-accounts",
                //     path: "/app/area",
                //     child_routes: null,
                // },
                {
                    menu_title: "Refer By",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/referby",
                    child_routes: null,
                },
                
                {
                    menu_title: "Service",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/service",
                    child_routes: null,
                },
                {
                    menu_title: "Service Sub",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/service-sub",
                    child_routes: null,
                },
                {
                    menu_title: "service Price",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/service-price",
                    child_routes: null,
                },
                {
                    menu_title: "Field Team",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/team",
                    child_routes: null,
                },
                {
                    menu_title: "Operation Team",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/office-team",
                    child_routes: null,
                },
                {
                    menu_title: "Backhand Team",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/manager-team",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Vendor List",
            menu_icon: "zmdi zmdi-accounts",
            path: "/app/vendor",
            child_routes: null,
        },
        {
            menu_title: "Ideal Field List",
            menu_icon: "zmdi zmdi-accounts",
            path: "/app/ideal-field",
            child_routes: null,
        },
        {
            menu_title: "Booking",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Add Booking",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/add",
                    child_routes: null,
                },
                {
                    menu_title: "Today",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-today",
                    child_routes: null,
                },
                {
                    menu_title: "Tomorrow",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-tomorrow",
                    child_routes: null,
                },
                {
                    menu_title: "Pending",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking",
                    child_routes: null,
                },
                {
                    menu_title: "Inspection",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingInspection",
                    child_routes: null,
                },
                {
                    menu_title: "Confirmed",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingConfirmed",
                    child_routes: null,
                },
                {
                    menu_title: "Vendor Job",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingVendor",
                    child_routes: null,
                },
                {
                    menu_title: "Cancel",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingCancel",
                    child_routes: null,
                },
                {
                    menu_title: "Completed",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking/bookingCompleted",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Payment",
            menu_icon: "zmdi zmdi-money",
            path: "",
            child_routes: [
                {
                    menu_title: "Pending",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/payment/Pending",
                    child_routes: null,
                },
                {
                    menu_title: "Received",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/payment/Received",
                    child_routes: null,
                },
                
            ],
        },
        {
            menu_title: "Commission",
            menu_icon: "zmdi zmdi-money",
            path: "",
            child_routes: [
                {
                    menu_title: "Pending",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/commission/Pending",
                    child_routes: null,
                },
                {
                    menu_title: "Received",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/commission/Received",
                    child_routes: null,
                },
                
            ],
        },
        {
            menu_title: "Notification",
            menu_icon: "zmdi zmdi-comment",
            path: "/app/notification",
            child_routes: null,
        },
        {
            menu_title: "Downloads",
            menu_icon: "zmdi zmdi-download",
            path: "",
            child_routes:[
                {
                    menu_title: "Booking",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/booking-download",
                    child_routes: null,
                },
                {
                    menu_title: "Vendor",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/vendor-download",
                    child_routes: null,
                },
                {
                    menu_title: "Received Payment",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/received-payment-download",
                    child_routes: null,
                },
                {
                    menu_title: "Pending Payment",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/pending-payment-download",
                    child_routes: null,
                },
            ]
        },
    ],
};