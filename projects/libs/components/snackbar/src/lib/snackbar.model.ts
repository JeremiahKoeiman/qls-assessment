// Makes the const readonly
export const alertStyle = ['success', 'danger', 'warning'] as const;

// Use readonly const to create typed string
export type AlertStyle = (typeof alertStyle)[number];
