import { TextButton } from "@/components/Buttons/TextButton";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import designSystem from "@/styles/designSystem";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import { AuthOnPrevButton } from "../../AuthOnPrevButton";
import AuthPageHeader from "../../AuthPageHeader";
import VerificationCodeInput from "../../VerificationCodeInput";
import SubPage from "./SubPage";
import {
  AuthNextButton,
  AuthPageHeaderInnerWrapperD,
  AuthPageHeaderInnerWrapperM,
  AuthPageHeaderWrapperM,
  PrevButtonWrapperM,
} from "./common";

type Props = {
  email: string;
  resendVerificationEmail: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const verificationCodeInputLength = 6;

export default function VerificationCodeSubPage({
  email,
  resendVerificationEmail,
  onPrev,
  onNext,
}: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  // TODO : api 연동
  // const { isSuccess, isError, mutateAsync } =
  //   useEmailCodeVerificationMutation();
  const [digits, setDigits] = useState("");

  // const isButtonDisabled =
  //   digits.length !== verificationCodeInputLength || !isSuccess || isError;
  const isButtonDisabled = false;

  const onDigitsChange = (digits: string) => {
    setDigits(digits);
  };

  // const onDigitsFilled = async (digits: string) => {
  //   // await mutateAsync({ email, code: digits });
  // };
  const onDigitsFilled = () => {};

  const onEmailCodeResend = () => {
    setDigits("");
    resendVerificationEmail();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <SubPage>
      {isDesktop && (
        <AuthPageHeaderInnerWrapperD>
          <AuthOnPrevButton onPrev={onPrev} />
          <AuthPageHeader
            title="이메일 인증"
            subtitle={
              <>
                <EmailText>{email}</EmailText> (으)로 발송된 인증번호를 확인 후
                입력하세요
              </>
            }
          />
        </AuthPageHeaderInnerWrapperD>
      )}
      {isMobile && (
        <AuthPageHeaderWrapperM>
          <PrevButtonWrapperM>
            <AuthOnPrevButton onPrev={onPrev} />
          </PrevButtonWrapperM>
          <AuthPageHeaderInnerWrapperM>
            <AuthPageHeader
              title="이메일 인증"
              subtitle={
                <>
                  <EmailText>{email}</EmailText> (으)로 발송된 인증번호를 확인
                  후 입력하세요
                </>
              }
            />
          </AuthPageHeaderInnerWrapperM>
        </AuthPageHeaderWrapperM>
      )}

      <Form onSubmit={onSubmit} $isMobile={isMobile}>
        <CodeInputWrapper>
          <VerificationCodeInput
            value={digits}
            inputLength={verificationCodeInputLength}
            isError={false}
            // isError={
            //   digits.length === verificationCodeInputLength ? isError : false
            // }
            onChange={onDigitsChange}
            onComplete={onDigitsFilled}
          />
          <div>
            <TextButton
              color="primary"
              variant="underline"
              onClick={onEmailCodeResend}>
              인증번호 재발송
            </TextButton>
          </div>
        </CodeInputWrapper>

        <AuthNextButton
          variant="primary"
          size={isMobile ? "h48" : "h44"}
          type="submit"
          disabled={isButtonDisabled}
          $isMobile={isMobile}>
          인증 완료
        </AuthNextButton>
      </Form>
    </SubPage>
  );
}

const Form = styled.form<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 480px;
  height: 100%;
  padding-inline: ${({ $isMobile }) => ($isMobile ? "16px" : "0")};
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-self: center;
`;

const EmailText = styled.span`
  ${designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};
`;

const CodeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
