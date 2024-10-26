export interface Calculator {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  icon: string;
  features?: string[];
  instructions?: string[];
  examples?: Example[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Example {
  input: Record<string, string | number>;
  output: Record<string, string | number>;
  explanation?: string;
}

export interface CalculatorProps {
  calculator: Calculator;
}