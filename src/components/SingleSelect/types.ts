export type OptionType = { [key: string]: unknown };

export interface GroupedOption {
  readonly label?: string;
  readonly options: readonly OptionType[];
}
