import React from 'react'
import EventItem from '../eventItem';

export default function SparrowEventList(props) {

  const {events} = props;

  return (
    <section className='flex flex-col w-full space-y-[120px]'>
      {
        events && events.map(eventObject => {

          const {_key, position, event: {query}} = eventObject;

          if(query?.active){

            return (
              <EventItem key={_key} position={position} event={query}  />            
            )

          }else{
            return;
          }

        })
      }
    </section>
  )

}