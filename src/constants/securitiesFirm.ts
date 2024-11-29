import bnk from "@/assets/images/securitiesFirmLogo/bnk.png";
import bookook from "@/assets/images/securitiesFirmLogo/bookook.png";
import cape from "@/assets/images/securitiesFirmLogo/cape.png";
import daishin from "@/assets/images/securitiesFirmLogo/daishin.png";
import daol from "@/assets/images/securitiesFirmLogo/daol.png";
import db from "@/assets/images/securitiesFirmLogo/db.png";
import ebest from "@/assets/images/securitiesFirmLogo/ebest.png";
import eugene from "@/assets/images/securitiesFirmLogo/eugene.png";
import FA from "@/assets/images/securitiesFirmLogo/fineants.png";
import hana from "@/assets/images/securitiesFirmLogo/hana.png";
import hanwha from "@/assets/images/securitiesFirmLogo/hanwha.png";
import hi from "@/assets/images/securitiesFirmLogo/hi.png";
import hyundai from "@/assets/images/securitiesFirmLogo/hyundai.png";
import ibk from "@/assets/images/securitiesFirmLogo/ibk.png";
import kakao from "@/assets/images/securitiesFirmLogo/kakao.png";
import kb from "@/assets/images/securitiesFirmLogo/kb.png";
import kiwoom from "@/assets/images/securitiesFirmLogo/kiwoom.png";
import korea from "@/assets/images/securitiesFirmLogo/korea.png";
import koreafoss from "@/assets/images/securitiesFirmLogo/koreafoss.png";
import kyobo from "@/assets/images/securitiesFirmLogo/kyobo.png";
import meritz from "@/assets/images/securitiesFirmLogo/meritz.png";
import miraeasset from "@/assets/images/securitiesFirmLogo/miraeasset.png";
import namuh from "@/assets/images/securitiesFirmLogo/namuh.png";
import samsung from "@/assets/images/securitiesFirmLogo/samsung.png";
import sangsangin from "@/assets/images/securitiesFirmLogo/sangsangin.png";
import shinhan from "@/assets/images/securitiesFirmLogo/shinhan.png";
import shinyoung from "@/assets/images/securitiesFirmLogo/shinyoung.png";
import sk from "@/assets/images/securitiesFirmLogo/sk.png";
import toss from "@/assets/images/securitiesFirmLogo/toss.png";
import yuanta from "@/assets/images/securitiesFirmLogo/yuanta.png";

export const securitiesFirmLogos = {
  FineAnts: FA.src,
  BNK투자증권: bnk.src,
  부국증권: bookook.src,
  케이프투자증권: cape.src,
  대신증권: daishin.src,
  다올투자증권: daol.src,
  DB금융투자: db.src,
  이베스트투자증권: ebest.src,
  유진투자증권: eugene.src,
  하나증권: hana.src,
  한화투자증권: hanwha.src,
  하이투자증권: hi.src,
  현대차증권: hyundai.src,
  IBK투자증권: ibk.src,
  카카오페이증권: kakao.src,
  KB증권: kb.src,
  키움증권: kiwoom.src,
  한국투자증권: korea.src,
  한국포스증권: koreafoss.src,
  교보증권: kyobo.src,
  메리츠증권: meritz.src,
  미래에셋증권: miraeasset.src,
  나무증권: namuh.src,
  삼성증권: samsung.src,
  상상인증권: sangsangin.src,
  신한투자증권: shinhan.src,
  신영증권: shinyoung.src,
  SK증권: sk.src,
  토스증권: toss.src,
  유안타증권: yuanta.src,
};

export type SecuritiesFirm = keyof typeof securitiesFirmLogos;

export const SECURITIES_FIRM = Object.keys(
  securitiesFirmLogos
) as SecuritiesFirm[];
