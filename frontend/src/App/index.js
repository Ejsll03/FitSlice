import Slice from '/Slice/Slice.js';

// Inicializar los Service Components como singletons
await slice.build('AuthService', { sliceId: 'AuthService' });
await slice.build('ProfileService', { sliceId: 'ProfileService' });
await slice.build('PlanService', { sliceId: 'PlanService' });
await slice.build('ChatService', { sliceId: 'ChatService' });
await slice.build('ExerciseService', { sliceId: 'ExerciseService' });

slice.router.beforeEach(async (to, from, next) => {
  if (to.metadata?.private) {
    const authService = slice.getComponent('AuthService');
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      return next({ path: '/login', replace: true });
    }
  }
  return next();
});

await slice.router.start();