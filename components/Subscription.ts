export interface Subscription {
    id: string;
    name: string;
    type: 'monthly' | 'annual';
    cost: number;
    lastPaymentDate: Date;
    reminder: boolean;
  }