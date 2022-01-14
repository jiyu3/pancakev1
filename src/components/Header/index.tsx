import React, { useContext } from "react";
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import { Flex, NavProps } from '@pancakeswap-libs/uikit'
import styled from "styled-components";
import { Link, useLocation } from 'react-router-dom'
import {MouseoverTooltip as Tooltip} from '../Tooltip'
import links from './config'
import { CAKE } from '../../constants'
import UserBlock from "./UserBlock";
import { MENU_HEIGHT } from './types'

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
`;

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: #F5F8FB;
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div`
  flex-grow: 1;
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  max-width: 100%;
  margin-top: 48px;
`;

const Logo = styled.div`
  width: 176px;
  height: 40px;
  background-color: #DBEAFE;
  color: #1B6DC1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
`;

const NavList = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 32px;
`;

// @TODO improvement props disabled
// @TODO improvement props isActive
const NavItem = styled(Link)<{isActive: boolean}>`
  color: ${({isActive}) => isActive ? '#1B6DC1': '#7C99B9'};
  font-size: 16px;
  font-weight: 400;
`;

const DisabledNavItem = styled(Link)`
  color: #C6D3E1;
  font-size: 16px;
  font-weight: 400;
`;

const UikitMenu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  children,
}) => {
  const location = useLocation()

  return (
    <Wrapper>
      <StyledNav >
        <Logo as={Link} to="/">ArthSwap</Logo>
        <NavList>
          <NavItem isActive={location.pathname === '/swap'} to="/swap">Swap</NavItem>
          <NavItem isActive={location.pathname === '/pool'} to="/pool">Pool</NavItem>
          <NavItem isActive={location.pathname === '/farms'} to="/farms">Farm</NavItem>
          <Tooltip text="Available in Feb">
            <DisabledNavItem to="/">Stake</DisabledNavItem>
          </Tooltip>
            <DisabledNavItem to="/">Lend</DisabledNavItem>
            <DisabledNavItem to="/" >NFT</DisabledNavItem>
            <DisabledNavItem to="/">Refferal</DisabledNavItem>
        </NavList>
        <Flex>
          <UserBlock account={account} login={login} logout={logout} />
        </Flex>
      </StyledNav>
      <BodyWrapper>

        <Inner>
          {children}
        </Inner>
      </BodyWrapper>
    </Wrapper>
  );
};

const Header: React.FC = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const priceData = useGetPriceData()
  const cakePriceUsd = priceData ? Number(priceData.data[CAKE.address]?.price ?? 0) : undefined
  const profile = useGetLocalProfile()

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      profile={profile}
      {...props}
    />
  )
}

export default Header
