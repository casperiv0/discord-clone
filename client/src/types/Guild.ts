export interface Guild {
  id: string;
  name: string;

  channel_ids: string[];
  member_ids: string[];

  /** hash of the icon */
  icon: string | null;
}
