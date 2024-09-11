import designSystem from "@/styles/designSystem";
import styled from "styled-components";

export default function Home() {
  return <Text>hello FineAnts</Text>;
}

const Text = styled.div`
  color: ${designSystem.color.primary.blue500};
  ${designSystem.font.display1}
`;
