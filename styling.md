# Style Guide for Portfolio Design System

## Colors
### Header
- Default: `fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b bg-zinc-900/500 border-zinc-800`
- Hover: `hover:bg-zinc-800`

### Background Colors
- Main Background: `bg-zinc-900`
- Card/Section Background: `bg-zinc-800/50`
- Hover States: `hover:bg-zinc-800/50`
- Modal Overlay: `bg-black/30`
- Input Background: `bg-zinc-800`

### Border Colors
- Primary Border: `border-zinc-800`
- Hover Border: `hover:border-zinc-700`
- Active Border: `border-zinc-700/50`
- Divider: `bg-zinc-800` (for hr elements)

### Text Colors
- Primary Text: `text-zinc-100`
- Secondary Text: `text-zinc-400`
- Hover Text: `hover:text-zinc-200`
- Muted Text: `text-zinc-300`

## Typography
### Headings
- H1: `text-4xl font-bold tracking-tight text-zinc-100`
- Section Headers: `text-lg font-medium text-zinc-100`

### Body Text
- Regular: `text-sm text-zinc-300`
- Small: `text-xs text-zinc-400`
- Links: `text-zinc-400 hover:text-zinc-200`

## Components

### Cards
- Default: `group rounded-xl border border-zinc-800 bg-zinc-900 p-2 transition-colors hover:border-zinc-700`

### Buttons
- Primary: `px-3 py-1.5 text-sm rounded-lg transition-colors bg-zinc-700 text-zinc-100 hover:bg-zinc-800`
- Outline: `px-3 py-1.5 text-sm rounded-lg transition-colors text-zinc-400 hover:text-zinc-100 bg-zinc-800/50 hover:bg-zinc-800`
- Icon: `p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50`

### Inputs
- Default: `w-full px-4 py-2 bg-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600`

### Checkboxes
- Default: `rounded border-zinc-600 bg-zinc-800 text-blue-500 cursor-pointer transition-colors hover:border-zinc-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-transparent`

### Tables
- Table Container: `relative overflow-x-auto sm:overflow-x-hidden border border-zinc-800 rounded-lg`
- Table Header: `sticky top-0 z-10 bg-zinc-900/75 backdrop-blur-sm border-b border-zinc-800`
- Table Cells: `p-4 text-zinc-300`
- Table Row Hover: `hover:bg-zinc-800/50 transition-colors`

### Scrollbars
- Default: `scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 hover:scrollbar-thumb-zinc-700`

## Layout

### Container
- Default: `container py-6 mx-auto md:space-y-8`

### Grid Layout
- Default: `grid grid-cols-1 gap-4 mx-auto lg:mx-0 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3`

### Spacing
- Standard Padding: `p-4`
- Standard Margin: `m-4`
- Gap between items: `gap-4`
- Section spacing: `space-y-4`

### Responsive Breakpoints
- xs: 480px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## Transitions
- Colors: `transition-colors`
- Transform: `transform transition-all`

## Common Utility Classes
- Flex Center: `flex items-center justify-center`
- Space Between: `flex items-center justify-between`
- Hidden on Mobile: `hidden lg:block`
- Max Height with Scroll: `max-h-[30vh] overflow-y-auto`
- Rounded Corners: `rounded-lg`
