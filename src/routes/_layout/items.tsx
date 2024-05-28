import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/items')({
  component: () => <div>Hello /_layout/items!</div>
})