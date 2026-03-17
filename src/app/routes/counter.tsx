import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import { useCounterStore } from '@/stores/useCounterStore';
import type { Route } from './+types/counter';

export const meta: Route.MetaFunction = () => [
  { title: 'Counter Example' },
  { name: 'description', content: 'Zustand counter sample with clear controls' },
];

export default function CounterPage() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <NavLink
          to="/"
          className="inline-flex w-fit items-center text-sm font-medium text-blue-700 hover:text-blue-600 hover:underline">
          ← Back to Home
        </NavLink>

        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Zustand Counter</p>
          <h1 className="mt-2 text-3xl font-bold">Simple, visible, and accessible controls</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Buttons are fully Tailwind-based and keep clear contrast in light mode. Use the controls below to test state
            updates.
          </p>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm text-slate-600">Current Count</span>
              <span className="text-4xl font-bold tabular-nums text-slate-900">{count}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="lg" onClick={decrement} aria-label="decrement">
                -
              </Button>
              <Button variant="default" size="lg" onClick={increment} aria-label="increment">
                +
              </Button>
              <Button variant="secondary" onClick={reset}>
                Reset
              </Button>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
