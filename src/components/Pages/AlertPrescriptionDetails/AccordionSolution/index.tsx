
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import ChevronDownIcon from "../../../../assets/icons/chevron-down.svg";

import { AccordionProps } from "./types";
import { 
  AccordionHeader, 
  AccordionDiv, 
  AccordionTitle, 
  AccordionChildren,
  AccordionDescription,
} from "./styles";
import Accordion from "../../../Accordion";

export default function AccordionSolution<T>({ description, viewKey, title }: AccordionProps<T>) {
  const open = useSharedValue(false);
  const onPress = () => {
    open.value = !open.value;
  };

  return (
    <AccordionDiv>
      <AccordionHeader onPress={onPress} >
        <AccordionTitle>{title}</AccordionTitle>
        <ChevronDownIcon/>
      </AccordionHeader>
    <Accordion isExpanded={open} viewKey={viewKey}>
      <AccordionChildren>
        <AccordionDescription>{description}</AccordionDescription>
      </AccordionChildren>
    </Accordion>
    </AccordionDiv>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
  },
  wrapper: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
});