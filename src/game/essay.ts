import type { Evidence } from '../types'

/** Sentence starters rotated by evidence type, so reasoning prompts don't all read "This shows that…" */
export const STARTERS: Record<string, string> = {
  statistic: 'These numbers suggest that ',
  fact: 'Since this is true, ',
  anecdote: 'This story matters because ',
  expert: 'According to the experts, ',
  opinion: 'People feel this way because ',
}

export function starterFor(ev?: Evidence): string {
  return (ev?.type && STARTERS[ev.type]) || 'This shows that '
}

export const CONNECTIVES = {
  ev1: ['To begin with,', 'First of all,', 'Right away,'],
  ev2: ['Furthermore,', 'In addition,', "What's more,"],
  ev3: ['Most importantly,', 'Above all,', 'On top of that,'],
  counter: ['On the other hand,', 'Of course,', 'Admittedly,'],
  conclusion: ['For these reasons,', 'In the end,', 'All things considered,'],
} as const

export type ConnKey = keyof typeof CONNECTIVES

export function lcFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1)
}

/** Visibly weak fallback when a student skips the reasoning box — lets them see what missing reasoning costs. */
export const REASONING_FALLBACK = 'This supports my claim.'

export const REBUTTAL_FALLBACK =
  'my claim still stands, because the strongest evidence points the other way.'
