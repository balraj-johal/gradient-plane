"use client";

import { CursorType } from "@/types/cursor";
import { useApplicationState } from "@/contexts/applicationState";

import { HeadingOne, Text } from "./styles";

interface Props {
  children: React.ReactNode;
}

const Title = ({ children, ...rest }: Props) => {
  const { transitioning } = useApplicationState();

  return (
    <HeadingOne>
      <Text
        animate={!transitioning}
        {...rest}
        data-cursor-type={CursorType.Text}
      >
        {children}
      </Text>
    </HeadingOne>
  );
};

export default Title;
