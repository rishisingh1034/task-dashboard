# Dashboard CRM

A production-level Next.js dashboard with comprehensive task management features, built with modern UI components and dark/light mode support.

## Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI,Shadcn, Lucide React
- **State Management**: React Hooks
- **Theme**: Custom dark/light mode implementation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dashboard-crm
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Adding New Task Statuses

Update the `statusColors` object in `TaskTable.tsx` and `TaskModal.tsx`:

### Modifying Mock Data

Edit `data/mockData.ts` to customize the sample tasks and statistics.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
