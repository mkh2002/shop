import React from "react";
import { FaGithub } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import { signIn } from "next-auth/react";

import { OAuthButton } from "@/components/auth/OAuthButton";

type GithubFormProps = {
  isPending?: boolean;
  disabled?: boolean;
};

const GithubForm = ({ isPending, disabled }: GithubFormProps) => {
  return (
    <div className={"w-full"}>
      <form
        action={() => {
          signIn("github");
        }}
      >
        <OAuthButton
          className={"w-full gap-2"}
          disabled={disabled}
          type={"submit"}
          variant={"secondary"}
        >
          {isPending ? (
            <ImSpinner8 className={"animate-spin"} />
          ) : (
            <FaGithub size={20} />
          )}
          Github
        </OAuthButton>
      </form>
    </div>
  );
};

export default GithubForm;
