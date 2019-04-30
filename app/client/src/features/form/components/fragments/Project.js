/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import {Divider, Icon, RoundButton} from '../../../../common/components'
import LabeledInput, {Input, Label} from './LabeledInput'

const ButtonRow = styled.div`
  margin-left: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const MiniInput = Input.extend`
  width: 50%;

  @media screen and (max-width: 850px) {
    width: 60%;
  }
`

type Props = {
  keywords: Array<?string>,
  index: number,
  addKeyword: (index: number) => void,
  removeKeyword: (index: number) => void,
    addResponsibility: (index: number) => void,
    removeResponsibility: (index: number) => void
}

function Project({ keywords, index, addKeyword, removeKeyword, addResponsibility, removeResponsibility }: Props) {
  return (
    <div>
      {index > 0 ? <Divider /> : null}
      <LabeledInput
        name={`projects[${index}].name`}
        label="Project Name"
        placeholder="Piper Chat"
      />
    <LabeledInput
        name={`projects[${index}].startDate`}
        label="Start date"
        placeholder="May 2018"
    />
    <LabeledInput
        name={`projects[${index}].endDate`}
        label="End date"
        placeholder="May 2019"
    />
        <LabeledInput
            name={`projects[${index}].jobTitle`}
            label="Job title"
            placeholder="Senior Java developer"
        />
        <LabeledInput
            name={`projects[${index}].sector`}
            label="Sector"
            placeholder="Healthcare"
        />
        <Label>Responsibilities</Label>
        {keywords.map((_, i) => (
            <div key={i}>
                <MiniInput
                    name={`projects[${index}].responsibilities[${i}]`}
                    placeholder="Java"
                    component="input"
                />
                {i === keywords.length - 1 && (
                    <ButtonRow>
                        <RoundButton inverted onClick={() => addresponsibility(index)}>
                            <Icon type="add" />
                        </RoundButton>
                        <RoundButton
                            inverted
                            disabled={keywords.length === 1}
                            onClick={() => removeresponsibility(index)}
                        >
                            <Icon type="remove" />
                        </RoundButton>
                    </ButtonRow>
                )}
            </div>
        ))}
    </div>
      <LabeledInput
        name={`projects[${index}].description`}
        label="Project Description"
        placeholder="A video chat app with great picture quality."
      />
      <LabeledInput
        name={`projects[${index}].url`}
        label="Link to Project"
        placeholder="http://piperchat.com"
      />
      <Label>Tools Used</Label>
      {keywords.map((_, i) => (
        <div key={i}>
          <MiniInput
            name={`projects[${index}].keywords[${i}]`}
            placeholder="Java"
            component="input"
          />
          {i === keywords.length - 1 && (
            <ButtonRow>
              <RoundButton inverted onClick={() => addKeyword(index)}>
                <Icon type="add" />
              </RoundButton>
              <RoundButton
                inverted
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

export default Project
