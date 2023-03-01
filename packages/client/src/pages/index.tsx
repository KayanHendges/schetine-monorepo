import { ProfessionalContext } from "@contexts/professionalContext";
import { useContext } from "react";
import { Text } from "../components/Texts/Text";

export default function Home() {
  const { professional } = useContext(ProfessionalContext);

  return <Text>Hello World {JSON.stringify(professional, undefined, 2)}</Text>;
}
