import React, { useState } from 'react';
import { Modal } from '@aragon/ui';
import BigNumber from 'bignumber.js';
import { BalanceBlock } from '../common/index';
import { unstake } from '../../utils/web3';
import { isPos, toBaseUnitBN } from '../../utils/number';
import { UNI } from "../../constants/tokens";
import BigNumberInput from "../common/BigNumberInput";
import ActionButton from "../common/ActionButton";
import colors from '../../constants/colors';
import { Container, Row, Col } from 'react-grid-system';
import ListTable from "../PoolList/ListTable";

type UnstakeProps = {
  user: string,
  poolAddress: string,
  unstakable: BigNumber,
  locked: BigNumber,
  pools?: Array<any>
};

function Unstake({
  user, poolAddress, unstakable, locked, pools
}: UnstakeProps) {
  const [unstakeAmount, setUnstakeAmount] = useState(new BigNumber(0));
  const [opened, setOpened] = useState(false)
  return (
    <div>
      <ActionButton
        label={"Withdraw"}
        size={14}
        width={"120px"}
        onClick={() => {
          setOpened(true)
        }}
        disabled={poolAddress === '' || user === ''}
      />
      <Modal visible={opened} onClose={() => setOpened(false)}>
        <Container >
          <h1 style={{ textAlign: "center", fontSize: 40, fontWeight: 700 }}>Withdraw</h1>
          <ListTable pools={pools} selectedPool={poolAddress} />
          <Row>
            <Col sm={12}>
              <BalanceBlock asset="Locked" balance={locked} suffix={"UNI-V2"} type={"row"} />
            </Col>
            <Col sm={12}>
              <BalanceBlock asset="Available" balance={unstakable} suffix={"UNI-V2"} type={"row"} />
            </Col>
            <Col sm={12}>
              <BigNumberInput
                adornment="UNI-V2"
                value={unstakeAmount}
                setter={setUnstakeAmount}
                max={() => {
                  setUnstakeAmount(unstakable);
                }}
              />
            </Col>
            <Col sm={6}>
              <ActionButton
                label="Cancel"
                onClick={() => {
                  setOpened(false)
                }}
                disabled={false}
              />
            </Col>
            <Col sm={6}>
              <ActionButton
                label={"WITHDRAW"}
                onClick={() => {
                  unstake(
                    poolAddress,
                    toBaseUnitBN(unstakeAmount, UNI.decimals),
                    (hash) => {
                      setUnstakeAmount(new BigNumber(0))
                      setOpened(false)
                    }
                  );
                }}
                disabled={poolAddress === '' || user === '' || !isPos(unstakeAmount) || unstakeAmount.isGreaterThan(unstakable)}
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    </div>
  );
}

export default Unstake;