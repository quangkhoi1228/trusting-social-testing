import React, { useRef, useState } from 'react'

import './Team.css'

const Team = ({ team, id }) => {

  const [channels, setChannels] = useState(team.channels);
  const [addChanelDisable, setAddChanelDisable] = useState(true);
  const addChanelInputRef = useRef();

  const onChangeInputAddChanel = (e) => {

    const value = e.target.value.trim();

    const existedItem = channels.find((item) => item.name === value);

    if (value !== '' && !existedItem) {
      setAddChanelDisable(false);
    } else {
      setAddChanelDisable(true);
    }

  }

  const addChanelHandle = () => {

    setChannels([...channels, ...[{
      name: addChanelInputRef.current.value.trim(),
      id: channels[channels.length - 1].id + 1
    }]])
    addChanelInputRef.current.value = '';
    setAddChanelDisable(true)
  }

  const deleteChanelHandle = (chanel) => {

    setChannels([...channels].filter((item) => item.id !== chanel.id))
  }

  return (
    <div>
      {
        team && <h4 className='mt-0 mb-6' >{team.name}</h4>
      }
      {
        team &&
        <div className='layout-row justify-content-end mb-6'>
          <input
            placeholder='Enter Channel Name'
            className="channel-name-input w-45 px-13"
            data-testid={'channel-name-input-' + id}
            onChange={(e) => onChangeInputAddChanel(e)}
            ref={addChanelInputRef}
          />
          <button
            className='channel-name-btn x-small w-35 h-30 pa-6 ma-0 ml-6'
            data-testid={'add-channel-btn-' + id}
            disabled={addChanelDisable}
            onClick={() => {
              addChanelHandle();
            }}
          >
            Add Channel
          </button>
        </div>
      }
      {
        team &&
        <ul className='styled mb-20 pl-25' data-testid={'channel-list-' + id}>
          {channels && channels.map((channel) => (
            <li
              key={channel.id}
              className='flex slide-up-fade-in justify-content-between align-items-center pl-10 pr-5 py-6 mt-0 mb-6'
            >
              <span>{channel.name}</span>
              <button
                data-testid={'remove-channel-button-' + id + channel.id}
                className='icon-only x-small danger ma-0 pa-0'
                onClick={(e) => deleteChanelHandle(channel)}
              >
                <i className="material-icons">delete</i>
              </button>
            </li>
          ))}
        </ul>
      }
    </div>

  )
}

export default Team
