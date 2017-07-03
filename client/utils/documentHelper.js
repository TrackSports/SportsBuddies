
import * as sectionStatusConstant from 'features/nsw/constants/documentStatus';

export function isSecionRejectOrCounterOffer(sectionStatus) {
  return sectionStatus === sectionStatusConstant.Reject || sectionStatus === sectionStatusConstant.CounterOffer;
}
