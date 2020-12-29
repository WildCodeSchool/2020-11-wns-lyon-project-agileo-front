import { useSelector } from 'react-redux'
import RootState from 'domain/RootState'
import React from 'react'

const formatTime = (time: string | number | Date) => {
  return new Date(time).toJSON().slice(11, 19)
}

const Clock = () => {
  const clock = useSelector((state: RootState) => state.redux.clock)

  return (
    <div className={clock.light ? 'light' : ''}>
      {formatTime(clock.lastUpdate)}
      <style jsx>{`
        div {
          padding: 15px;
          display: inline-block;
          color: #82fa58;
          font: 50px menlo, monaco, monospace;
          background-color: #000;
        }

        .light {
          background-color: #999;
        }
      `}</style>
    </div>
  )
}

export default Clock
