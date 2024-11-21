import { Icon } from "@/components/Icon";
import Routes from "@/constants/Routes";
import useSignOutMutation from "@/features/auth/api/queries/useSignOutMutation";
import { useDropdown } from "@/hooks/useDropdown";
import designSystem, { parseFontString } from "@/styles/designSystem";
import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import styled from "styled-components";
import useUserQuery from "../../api/queries/useUserQuery";
import UserProfileButton from "../UserProfileButton";

export default function UserDropdown() {
  const { data: user } = useUserQuery();

  const { mutate: signOutMutate } = useSignOutMutation();

  const { isOpen, onOpen, DropdownMenu, DropdownItem } = useDropdown();

  const onDropdownClick = (e: MouseEvent<HTMLButtonElement>) => {
    onOpen(e);
  };

  const onSignOut = () => {
    signOutMutate();
  };

  return (
    <>
      <UserProfileButton isOpen={isOpen} onClick={onDropdownClick} />

      <DropdownMenu
        sx={dropdownMenuSx}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <Link href={Routes.PROFILE("profile")}>
          <DropdownItem sx={dropdownItemSx}>
            {user?.profileUrl ? (
              <ProfileImage
                width={48}
                height={48}
                src={user.profileUrl}
                alt={user.nickname}
              />
            ) : (
              <Icon icon="user" size={48} color="gray200" />
            )}
            <UserDetails>
              <p>{user?.nickname}</p>
              <p>{user?.email}</p>
            </UserDetails>
          </DropdownItem>
        </Link>

        <Divider />

        <DropdownItem sx={dropdownItemSx} onClick={onSignOut}>
          로그아웃
        </DropdownItem>
      </DropdownMenu>
    </>
  );
}

const dropdownMenuSx = {
  "& .MuiPaper-root": {
    "width": "328px",
    "maxHeight": "265px",
    "marginTop": "8px",
    "padding": "8px",
    "borderRadius": "4px",
    "boxShadow": "0px 4px 8px 0px #00000014",

    ".MuiList-root": {
      "width": "100%",
      "padding": "0",

      ".MuiMenuItem-root": {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
      },

      ".MuiDivider-root": {
        margin: "4px 0",
        borderColor: designSystem.color.neutral.gray100,
      },
    },
  },
};

const dropdownItemSx = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  ...parseFontString(designSystem.font.body2),
  color: designSystem.color.neutral.gray600,
  borderRadius: "4px",
};

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const UserDetails = styled.div`
  p:first-of-type {
    margin-bottom: 4px;
    ${designSystem.font.title4};
    color: ${designSystem.color.neutral.gray800};
  }

  p:last-of-type {
    ${designSystem.font.body3};
    color: ${designSystem.color.neutral.gray600};
  }
`;
