"use client";

import styled from "styled-components";

export const Main = styled.main`

  padding-top: 40px;
  padding-left: var(--space);
  padding-right: var(--space);
  display: flex;
  gap: 25px;
  transition: all 0.5s ease;

  @media (min-width: 768px) {
    gap: var(--space);
  }
`;
