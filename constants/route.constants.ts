export const Routes = {
    USER_MANAGEMENT: "/usermanagement",
    CHANNEL_STATUS: "/channelstatus",

    USER_SETTINGS: "/settings",
    USER_SUPPORT: "/contactsupport",
    USER_DASHBOARD:"/dashboard"
  }

  export const AllowedRoutes = {
    USR: [
      Routes.USER_MANAGEMENT,
      Routes.USER_DASHBOARD,
    ],
    ADM: [
      Routes.USER_MANAGEMENT,
      Routes.CHANNEL_STATUS,
      Routes.USER_SETTINGS,
      Routes.USER_SUPPORT,
      Routes.USER_DASHBOARD
    ]
}
