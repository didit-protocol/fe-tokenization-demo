export interface Listing {
  contract_address: string;
  name: string;
  description: string;
  portrait_image: string;
  markdown: string;
  images: string[];
  total_tokens: number;
  initial_sale_tokens: number;
  initial_value_per_token: number;
  end_time_sale: number;
  tokens_sold: number;
  status: "Sale" | "Tradeable" | "Refund";
}
