export interface ReferralFeedback {
  id: number;
  desc: string;
  descSw: string;
  referralType: {
    referralTypeId: number;
    referralTypeName: string;
    isActive: boolean
  };
}
