import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Main from "./pages/Main"
import News from "./pages/News"
import Smartphone from "./pages/Smartphone"
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, NEWS_ROUTE, REGISTRATION_ROUTE, SMARTPHONE_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
      
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SMARTPHONE_ROUTE + '/:id',
        Component: Smartphone
    },
    {
        path:  NEWS_ROUTE,
        Component: News
    }
      

]