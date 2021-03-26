import React from 'react';
import {
  ButtonBase, useViewport
} from '@aragon/ui';
import styled from 'styled-components';
import colors from '../../constants/colors';
import { useTranslation } from "react-i18next";
const CancelButton = styled(ButtonBase)`
  margin: 5px;
  ${props => `
    border: 1px solid ${props.color};
    width: ${props.width};
    padding: ${props.padding};
    color:${props.color};
  `}

`;
const FilledButton = styled(ButtonBase)`
  margin: 5px;
  ${props => `
    width: ${props.width};
    background: ${props.color};
    padding: ${props.padding};
    &:hover {
        background: ${props.color};
    }
  `}

`;
const StyledButton = styled(ButtonBase)`
  margin: 5px;
  border: 2px solid;
  border-image-slice: 1;
  ${props => `
    border-image-source: ${props.color};
    width: ${props.width};
    padding: ${props.padding};
    &:hover {
        background: ${props.color};
    }
  `}
`;

function ActionButton({ onClick, color, label, disabled, size, width, type, icon }:
  { label: string, color?: string, onClick: Function, disabled: boolean, size?: number, width?: string, type?: string, icon?: any }) {
  const { below } = useViewport()
  const { t } = useTranslation()
  if (type == 'cancel') {
    return (
      <CancelButton
        onClick={onClick}
        width={width || "100%"}
        color={color || colors.title}
        padding={below("medium") ? "8px" : "14px"}
        disabled={disabled}
      >
        <span style={{ fontSize: size || '1rem', fontWeight: 500 }}> {t(label)} </span>
        {icon}
      </CancelButton>
    );
  }
  if (type == 'filled') {
    return (
      <FilledButton
        onClick={onClick}
        width={width || "100%"}
        color={color || colors.linear}
        padding={below("medium") ? "8px" : "14px"}
        disabled={disabled}
      >
        <span style={{ fontSize: size || '1rem', color: "white", fontWeight: 500 }}> {t(label)} </span>
        <span>{icon}</span>
      </FilledButton>
    );
  }
  return (
    <StyledButton
      onClick={onClick}
      width={width || "100%"}
      color={color || colors.linear}
      padding={below("medium") ? "8px" : "10px"}
      disabled={disabled}
    >
      <span style={{ fontSize: size || '1rem', color: "white", fontWeight: 500 }}> {t(label)} </span>
      {icon}
    </StyledButton>
  );
}

export default ActionButton;
