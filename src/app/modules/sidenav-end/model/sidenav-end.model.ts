import { Overlay } from "../enums/overlay.enum";

export interface PayloadSidenavEnd {
  action: 'open' | 'remove' | 'update' | 'hidden';
  component?: Overlay;
  data?: any;
  isFirstLevel?: boolean;
  closeFirstLevel?: boolean;
}
