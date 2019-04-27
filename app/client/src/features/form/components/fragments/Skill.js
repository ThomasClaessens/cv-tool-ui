/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Divider, RoundButton, Icon } from '../../../../common/components'
import LabeledInput, { Label, Input } from './LabeledInput'

const ButtonRow = styled.div`
  margin-left: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const MiniInput = Input.extend`
  width: 70%;

  @media screen and (max-width: 850px) {
    width: 65%;
  }
`

const NumberInput = Input.extend`
  width: 10%;
  margin-left: 20px;

  @media screen and (max-width: 850px) {
    width: 65%;
  }
`

type Props = {
  keywords: Array<?Object>,
  index: number,
  addKeyword: (index: number) => void,
  removeKeyword: (index: number) => void
}

function Skill({ keywords, index, addKeyword, removeKeyword }: Props) {
  return (
    <div>
      {index > 0 ? <Divider /> : null}
      <LabeledInput
        name={`skills[${index}].name`}
        label="Skill Name"
        placeholder="Programming Languages"
      />
      <Label>Skill Details</Label>
      {keywords.map((keyword, i) => (
        <div key={i}>
          <MiniInput
            name={`skills[${index}].keywords[${i}].name`}
            placeholder="Java"
            component="input"
          />
          <NumberInput
            name={`skills[${index}].keywords[${i}].level`}
            placeholder="3"
            component="input"
            type="number"
            min="1"
            max="5"
          />
          {i === keywords.length - 1 && (
            <ButtonRow>
              <RoundButton
                inverted
                type="button"
                onClick={() => addKeyword(index)}
              >
                <Icon type="add" />
              </RoundButton>
              <RoundButton
                inverted
                type="button"
                disabled={keywords.length === 1}
                onClick={() => removeKeyword(index)}
              >
                <Icon type="remove" />
              </RoundButton>
            </ButtonRow>
          )}
        </div>
      ))}
    </div>
  )
}

export default Skill
