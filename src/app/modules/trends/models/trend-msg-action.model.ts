import { TrendMsgActionEnum } from "../enums/trend-msg-actions.enum";

export interface TrendMsgAction {
    message: string;
    type: TrendMsgActionEnum;
  }
  