import styled from "styled-components";
import UserDropdown from "./UserDropdown";

// export default function UserControls({ user }: { user: User }) {
export default function UserControls() {
  return (
    <StyledUserControls>
      {/* TODO: 알림 관련 작업하고 추가 */}
      {/* <NotificationControl user={user} /> */}
      <UserDropdown />
    </StyledUserControls>
  );
}

const StyledUserControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  margin-left: auto;
  gap: 16px;
`;
