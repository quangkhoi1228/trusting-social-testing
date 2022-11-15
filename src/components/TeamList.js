import React, { useRef, useState } from 'react'
import Team from './Team'

import './TeamList.css'

const TeamList = () => {
  const init = [
    {
      name: 'Team1',
      channels: [
        {
          name: 'Channel1',
          id: 1
        },
        {
          name: 'Channel2',
          id: 2
        }
      ]
    },
    {
      name: 'Team2',
      channels: [
        {
          name: 'Channel1',
          id: 1
        },
        {
          name: 'Channel2',
          id: 2
        }
      ]
    }
  ]

  const [teamList, setTeamList] = useState(init);
  const [addTeamDisable, setAddTeamDisable] = useState(true);
  const addTeamInputRef = useRef();

  const onChangeInputAddteam = (e) => {

    const value = e.target.value.trim();

    const existedItem = teamList.find((item) => item.name === value);

    if (value !== '' && !existedItem) {
      setAddTeamDisable(false);
    } else {
      setAddTeamDisable(true);
    }

  }

  const addTeamHandle = () => {

    setTeamList([...teamList, ...[{
      name: addTeamInputRef.current.value.trim(),
      channels: []
    }]])
    addTeamInputRef.current.value = '';
    setAddTeamDisable(true)
  }

  return (
    <div className='w-50 mx-auto'>
      <div className='card w-35 mt-50 mx-auto px-10 py-15'>
        <div className='layout-column' data-testid='team-list'>
          {teamList && teamList.map((team, id) => (
            <Team
              key={id}
              id={id}
              team={team}
            />
          ))}
        </div>
        <div className='layout-row'>
          <input
            placeholder='Enter Team Name'
            className='team-list-input w-75'
            data-testid='team-name-input'
            onChange={(e) => onChangeInputAddteam(e)}
            ref={addTeamInputRef}
          />
          <button
            className='team-list-btn x-small w-35 h-30 pa-6 ma-0 ml-6'
            data-testid='add-team-btn'
            disabled={addTeamDisable}
            onClick={() => {
              addTeamHandle();
            }}
          >
            Add Team
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamList
