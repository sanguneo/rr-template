import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('counter', 'routes/counter.tsx'),
  route('form-example', 'routes/form-example.tsx'),
] satisfies RouteConfig;
