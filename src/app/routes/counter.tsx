import { NavLink } from 'react-router';
import { useCounterStore } from '@/store/useCounterStore';
import { Button } from '@/components/ui/button';
import s from './counter.module.scss';
import type { Route } from './+types/counter';

export const meta: Route.MetaFunction = () => [{ title: 'SCSS & Zustand Example' }, { name: 'description', content: 'Demonstrating SCSS Modules and Zustand' }];

export default function CounterPage({ loaderData }: Route.ComponentProps) {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className={s.container}>
      <NavLink to="/" className="mb-8 text-blue-600 hover:underline">
        ← 홈으로 돌아가기
      </NavLink>
      <h1 className={s.title}>SCSS Counter</h1>

      <div className={s.counterBox}>
        <span className={s.countDisplay}>{count}</span>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg" onClick={decrement}>
            -
          </Button>
          <Button variant="secondary" size="lg" onClick={reset}>
            Reset
          </Button>
          <Button variant="default" size="lg" onClick={increment}>
            +
          </Button>
        </div>
      </div>

      <div className={s.descriptionBox}>
        <h2>Modern Style Guide</h2>
        <ul>
          <li>
            <strong>SCSS Modules</strong>: Scoped styles with <code>.module.scss</code>.
          </li>
          <li>
            <strong>Global Support</strong>: Variables and mixins via <code>@use</code>.
          </li>
          <li>
            <strong>Tailwind Synergy</strong>: Combining utility classes and scoped CSS.
          </li>
        </ul>
      </div>
    </div>
  );
}
