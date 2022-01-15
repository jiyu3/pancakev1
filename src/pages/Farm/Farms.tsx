import React, { useCallback, useState, useMemo, useRef } from 'react'
import { useRouteMatch, useLocation, NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, RowType, Toggle, Text, ArrowForwardIcon, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useFarms, usePollFarmsWithUserData, usePriceCakeBusd } from 'state/farms/hooks'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { DeserializedFarm } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'
import { Button } from 'components/Button'
import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import { DesktopColumnSchema } from './components/types'
import ChainId from '../../constants/chainIds'


export interface FarmWithStakedValue extends DeserializedFarm {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
}

const PageWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
`

const PageBoard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  align-items: center;
  background: linear-gradient(90.86deg, rgba(27, 169, 193, 0.2) 0%, rgba(27, 109, 193, 0) 100%), radial-gradient(49.54% 4294% at 50% 50%, rgba(27, 109, 193, 0.2) 0%, rgba(27, 109, 193, 0.2) 52.6%, rgba(27, 109, 193, 0) 100%), #0A1627;
  border: 1px solid #C6D3E1;
  box-sizing: border-box;
  border-radius: 8px;
  text-align: center;
  > * + * {
    margin: 8px;
  }
`

const BoardTitle = styled(Heading)`
  color:#FFFFFF;
`

const BoardDescription = styled(Heading)`
  color:#FFFFFF;
`

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: end;
  }
`

const ValuationContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: start;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const NUMBER_OF_FARMS_VISIBLE = 12

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  // const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const chosenFarmsLength = useRef(0)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsWithUserData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  // const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(new BigNumber(farm.poolWeight as BigNumber), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET as number])
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [cakePrice, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const rowData = farmsList(activeFarms).map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr) || '-',
        pid: farm.pid,
        multiplier: farm.multiplier || '',
        lpLabel,
        lpSymbol: farm.lpSymbol,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr || 0,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData?.earnings || 0)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity || new BigNumber(0),
      },
      multiplier: {
        multiplier: farm.multiplier || '',
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    const columnSchema = DesktopColumnSchema

    const columns = columnSchema.map((column) => ({
    id: column.id,
    name: column.name,
    label: column.label,
    sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
        switch (column.name) {
        case 'farm':
            return b.id - a.id
        case 'apr':
            if (a.original.apr.value && b.original.apr.value) {
            return Number(a.original.apr.value) - Number(b.original.apr.value)
            }

            return 0
        case 'earned':
            return a.original.earned.earnings - b.original.earned.earnings
        default:
            return 1
        }
    },
    sortable: column.sortable,
    }))

    return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <PageWrapper>
      <PageBoard>
        <BoardTitle as="h1" scale="lg" mb="8px" bold>
          Put more liquidity on Pool!
        </BoardTitle>
        <BoardDescription scale="md" color="text">
          No need to stake, just hold LP tokens,
        <br />
          then you will earn ARSW tokens on 2022 Q1 depending on your amount and duration of liquidity.
        </BoardDescription>
        <Button variant='tertiary'>View Detailes</Button>
      </PageBoard>
      <>
        <ControlContainer>
        <ValuationContainer>
          <div>
            <Text textTransform="capitalize">Total Value Locked</Text>
            <Heading scale="xl" color="text">
              $123,456,789
            </Heading>
          </div>
        </ValuationContainer>
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">Sort by</Text>
              <Select
                options={[
                  {
                    label: 'Hot',
                    value: 'hot',
                  },
                  {
                    label: 'APY',
                    value: 'apy',
                  },
                  {
                    label: 'Multiplier',
                    value: 'multiplier',
                  },
                  {
                    label: 'Liquidity',
                    value: 'liquidity',
                  },
                ]}
                onOptionChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text textTransform="uppercase">Search</Text>
              <SearchInput onChange={handleChangeQuery} placeholder="Search Farms" />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
        {account && !userDataLoaded && (
          <Flex justifyContent="center">
            {userDataLoaded}
            <Loading />
          </Flex>
        )}
        <div ref={observerRef} />
      </>
    </PageWrapper>
  )
}

export default Farms
