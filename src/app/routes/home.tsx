import { NavLink } from 'react-router';
import logoLight from '@/assets/welcome/logo-light.svg';
import type { Route } from './+types/home';

export const meta: Route.MetaFunction = () => [
  { title: 'RR Template Home' },
  { name: 'description', content: 'Starter dashboard for RR Template' },
];

const cards = [
  {
    title: 'Counter Example',
    description: 'State management sample with Zustand and a clear action layout.',
    to: '/counter',
    cta: 'Open Counter',
  },
  {
    title: 'Form Example',
    description: 'Validation-oriented form sample using React Hook Form + Yup.',
    to: '/form-example',
    cta: 'Open Form',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 md:py-16">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">RR Template</p>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">Fast onboarding</h1>
              <p className="mt-4 text-base leading-7 text-slate-600">
                This template is now organized around practical examples. Choose a page below and iterate directly with
                Tailwind and React Router.
              </p>
            </div>
            <div className="w-full max-w-xs rounded-xl border border-slate-200 bg-slate-50 p-4">
              <img src={logoLight} alt="React Router" className="block w-full" />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <article key={card.to} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
              <NavLink
                to={card.to}
                className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500">
                {card.cta}
              </NavLink>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
