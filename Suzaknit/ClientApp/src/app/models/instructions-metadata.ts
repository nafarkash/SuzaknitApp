export interface InstructionsMetadata {
  id: number;
  level: number;
  url: string;
  translationKey: string;
  items: Array<InstructionsMetadata>;
}
