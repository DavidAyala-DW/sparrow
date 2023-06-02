import React from 'react'
import EventItem from '../eventItem'

export default function SparrowEventList(props) {
  const { events } = props

  return (
    <section className="flex flex-col w-full space-y-[120px]">
      {events?.map((event, index) => (
        <EventItem
          key={event._key}
          position={index % 2 ? 'firstImage' : 'firstText'}
          event={event}
        />
      ))}
    </section>
  )
}
