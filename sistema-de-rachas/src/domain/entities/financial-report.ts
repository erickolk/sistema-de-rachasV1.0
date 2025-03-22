export interface FinancialReport {
  totalMatches: number;
  totalDiscounts: number;
  totalRevenue: number;
}

export interface FinancialReportSummary {
  totalMatches: number;
  totalPaidAmount: number;
  totalDiscounts: number;
  totalRevenue: number;
  averageRevenuePerMatch: number;
  averageDiscountPerMatch: number;
  discountPercentage: number;
}

export interface MonthlyAnalysis {
  month: string; // "YYYY-MM"
  matches: number;
  revenue: number;
  discounts: number;
  averageRevenue: number;
  growthFromLastMonth: number; // percentual
}

export interface TimeAnalysis {
  byMonth: MonthlyAnalysis[];
  bestMonth: {
    month: string;
    revenue: number;
  };
  worstMonth: {
    month: string;
    revenue: number;
  };
}

export interface FieldTimeAnalysis {
  byDayOfWeek: {
    day: string;
    matches: number;
    revenue: number;
  }[];
  byTimeSlot: {
    slot: string;
    matches: number;
    revenue: number;
  }[];
}

export interface FieldAnalysis {
  byField: Array<{
    fieldId: string;
    fieldName: string;
    totalMatches: number;
    totalRevenue: number;
    totalDiscounts: number;
    occupancyRate: number;
  } & FieldTimeAnalysis>;
  ranking: {
    mostProfitable: Array<{
      fieldId: string;
      fieldName: string;
      revenue: number;
    }>;
    mostBooked: Array<{
      fieldId: string;
      fieldName: string;
      matches: number;
    }>;
  };
}

export interface ClientAnalysis {
  byClient: Array<{
    clientId: string;
    clientName: string;
    totalMatches: number;
    totalSpent: number;
    totalDiscounts: number;
    averageSpentPerMatch: number;
    preferredDays: string[];
    preferredTimes: string[];
    lastMatch: Date;
  }>;
  ranking: {
    mostFrequent: Array<{
      clientId: string;
      clientName: string;
      matches: number;
    }>;
    highestSpenders: Array<{
      clientId: string;
      clientName: string;
      spent: number;
    }>;
  };
}

export interface FinancialReport {
  summary: FinancialReportSummary;
  timeAnalysis: TimeAnalysis;
  fieldAnalysis: FieldAnalysis;
  clientAnalysis: ClientAnalysis;
} 