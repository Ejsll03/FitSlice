const routes = [
  { path: '/', component: 'LoginPage' },
  { path: '/login', component: 'LoginPage' },
  { path: '/register', component: 'RegisterPage' },
  { path: '/onboarding', component: 'OnboardingPage', metadata: { private: true } },
  { path: '/dashboard', component: 'DashboardPage', metadata: { private: true } },
  { path: '/chat', component: 'ChatPage', metadata: { private: true } },
  { path: '/exercises', component: 'ExercisePage', metadata: { private: true } },
  { path: '/404', component: 'NotFound' },
];

export default routes;