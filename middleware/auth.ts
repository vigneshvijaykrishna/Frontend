import { Middleware } from '@nuxt/types'
import { AllowedRoutes } from '@/constants/route.constants';
import { Roles } from '@/constants/roles.constants';

const auth: Middleware = (context) => {
  // Use context
  const userIsLoggedIn = context.store.state.user.userInfo.Email

  if (!userIsLoggedIn) {
    return context.redirect('/login')
  }
  let userRole = context.store.state.user.userInfo.role.toLowerCase();
  if(userRole==Roles.USR.toLowerCase()&&!(AllowedRoutes.USR.includes(context.route.path))) return context.redirect(context.from.path);
  if(userRole==Roles.ADM.toLowerCase()&&!(AllowedRoutes.ADM.includes(context.route.path))) return context.redirect(context.from.path);

  return Promise.resolve()
}

export default auth
