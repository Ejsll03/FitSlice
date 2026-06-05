import Slice from '/Slice/Slice.js';

slice.router.beforeEach(async (to, from, next) => {
  if (to.metadata?.private) {
    const authService = await slice.getComponent('AuthService');
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      return next({ path: '/login', replace: true });
    }
  }
  return next();
});

await slice.router.start();