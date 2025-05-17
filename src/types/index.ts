
export interface Event {
  id: string;
  source: "github" | "runbot" | "amazon";
  type: string;
  ts: Date; // Firestore timestamp will be converted to Date object
  payload: Record<string, any>;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskDomain = "dev" | "life";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  domain: TaskDomain;
  createdAt: Date;
  dueAt?: Date;
  completedAt?: Date;
  description?: string;
}

export type BuildState = "SUCCESS" | "FAILURE" | "PENDING";

export interface BuildStatus {
  id: string;
  commitSha: string;
  state: BuildState;
  url: string;
  createdAt: Date;
  repoName?: string; // Optional: For better display
  workflowName?: string; // Optional: For better display
}

// For Chat
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string | React.ReactNode;
  timestamp: Date;
}
