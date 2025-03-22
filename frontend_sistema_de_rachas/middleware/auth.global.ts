import useAuth from '~/composables/useAuth';

const unauthenticatedRoutes = [
  '/auth/login',
  '/auth/register-client',
  '/auth/register-owner',
  '/',
];

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, userType, loadAuthState } = useAuth();
  const token = localStorage.getItem('userToken');

  await loadAuthState();

  console.log(`[DEBUG] Navegando de ${from.path} para ${to.path}`);
  console.log(
    `[DEBUG] Estado atual: isAuthenticated=${isAuthenticated.value}, userType=${userType.value}`
  );

  if (!token && !unauthenticatedRoutes.includes(to.path)) {
    console.warn(
      `[WARN] Token não encontrado. Redirecionando para /auth/login`
    );
    return navigateTo('/');
  }

  if (!isAuthenticated.value && !unauthenticatedRoutes.includes(to.path)) {
    console.warn(
      `[WARN] Usuário não autenticado. Redirecionando para /auth/login`
    );
    return navigateTo('/auth/login');
  }

  if (isAuthenticated.value) {
    if (userType.value === 'owner' && to.path.startsWith('/dashboard-client')) {
      console.warn(
        `[WARN] Usuário 'owner' tentou acessar ${to.path}. Redirecionando para /dashboard`
      );
      return navigateTo('/dashboard');
    }

    if (userType.value === 'client' && to.path === '/dashboard') {
      console.warn(
        `[WARN] Usuário 'client' tentou acessar ${to.path}. Redirecionando para /dashboard-client`
      );
      return navigateTo('/dashboard-client');
    }

    if (to.path === '/auth/login') {
      return navigateTo(
        userType.value === 'owner' ? '/dashboard' : '/dashboard-client'
      );
    }
  }

  console.log(`[DEBUG] Acesso permitido a ${to.path}`);
});
