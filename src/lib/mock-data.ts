import type { Task, BuildStatus, Event, TaskStatus, BuildState, TaskDomain } from '@/types';

export const mockTasks: Task[] = [
  { id: 'task-1', title: 'Setup project repository', status: 'DONE', domain: 'dev', createdAt: new Date('2024-05-01'), completedAt: new Date('2024-05-02'), description: 'Initialize Git, create README, basic structure.' },
  { id: 'task-2', title: 'Design database schema', status: 'IN_PROGRESS', domain: 'dev', createdAt: new Date('2024-05-03'), dueAt: new Date('2024-05-10'), description: 'Define Firestore collections and fields for Events, Tasks, BuildStatus.' },
  { id: 'task-3', title: 'Develop UI mockups', status: 'TODO', domain: 'dev', createdAt: new Date('2024-05-05'), dueAt: new Date('2024-05-15'), description: 'Create wireframes and mockups for all pages.' },
  { id: 'task-4', title: 'Grocery Shopping', status: 'TODO', domain: 'life', createdAt: new Date('2024-05-08'), dueAt: new Date('2024-05-09'), description: 'Milk, eggs, bread, and cheese.' },
  { id: 'task-5', title: 'Book flight tickets', status: 'IN_PROGRESS', domain: 'life', createdAt: new Date('2024-04-20'), dueAt: new Date('2024-05-12'), description: 'Flights for summer vacation.' },
  { id: 'task-6', title: 'Pay utility bills', status: 'DONE', domain: 'life', createdAt: new Date('2024-05-01'), completedAt: new Date('2024-05-01'), description: 'Electricity and water bills.' },
];

export const mockBuilds: BuildStatus[] = [
  { id: 'build-1', commitSha: 'a1b2c3d4', state: 'SUCCESS', url: 'https://github.com/example/repo/actions/runs/1', createdAt: new Date('2024-05-08T10:00:00Z'), repoName: 'PersonalOps/WebApp', workflowName: 'CI Pipeline' },
  { id: 'build-2', commitSha: 'e5f6g7h8', state: 'FAILURE', url: 'https://github.com/example/repo/actions/runs/2', createdAt: new Date('2024-05-08T11:30:00Z'), repoName: 'PersonalOps/WebApp', workflowName: 'CD Deployment' },
  { id: 'build-3', commitSha: 'i9j0k1l2', state: 'PENDING', url: 'https://github.com/example/repo/actions/runs/3', createdAt: new Date('2024-05-08T12:00:00Z'), repoName: 'PersonalOps/Docs', workflowName: 'Docs Build' },
  { id: 'build-4', commitSha: 'm3n4o5p6', state: 'SUCCESS', url: 'https://github.com/example/repo/actions/runs/4', createdAt: new Date('2024-05-07T15:00:00Z'), repoName: 'PersonalOps/WebApp', workflowName: 'CI Pipeline' },
];

export const mockEvents: Event[] = [
  { id: 'event-1', source: 'github', type: 'push', ts: new Date('2024-05-08T09:00:00Z'), payload: { user: 'john.doe', branch: 'main', commits: 3 } },
  { id: 'event-2', source: 'runbot', type: 'build_completed', ts: new Date('2024-05-08T10:05:00Z'), payload: { buildId: 'rb-123', status: 'success' } },
  { id: 'event-3', source: 'amazon', type: 'order_shipped', ts: new Date('2024-05-07T14:00:00Z'), payload: { orderId: 'amz-456', items: ['Book A', 'Gadget B'] } },
];

export const mockPrCount = 3;
export const mockFailedBuildsCount = mockBuilds.filter(b => b.state === 'FAILURE').length;
export const mockTasksByStatus = mockTasks.reduce((acc, task) => {
  acc[task.status] = (acc[task.status] || 0) + 1;
  return acc;
}, {} as Record<TaskStatus, number>);

