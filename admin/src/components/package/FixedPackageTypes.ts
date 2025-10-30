export interface SubPackage {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  duration: string; // e.g., "2 hours", "1 day", etc.
  totalPrice: number;
  locations?: {
    country: string;
    state: string;
    district: string;
  }[];
  isActive: boolean;
}

export interface PackageGroup {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  subPackages: SubPackage[];
}

