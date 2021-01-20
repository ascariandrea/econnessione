import {
  EventsNetwork,
  EventsNetworkProps,
} from "@components/Graph/EventsNetwork"
import { actors } from "@mock-data/actors"
import { events } from "@mock-data/events"
import {
  Uncategorized,
  UncategorizedMD,
} from "@models/events/Uncategorized"
import { Meta, Story } from "@storybook/react/types-6-0"
import * as A from 'fp-ts/lib/Array'
import * as O from "fp-ts/lib/Option"
import { pipe } from "fp-ts/lib/pipeable"
import * as React from "react"

const meta: Meta = {
  title: "Components/Graph/EventsNetwork",
  component: EventsNetwork,
}

export default meta

const eventsMD: UncategorizedMD[] = pipe(
  events,
  A.filter(Uncategorized.is),
  A.map((e) => ({
    frontmatter: e,
    body: () => "",
    tableOfContents: O.some({ items: [] }),
    timeToRead: O.some(1),
  }))
)

const Template: Story<EventsNetworkProps> = (props) => {
  return <EventsNetwork {...props} />
}

const NetworkGraphExample = Template.bind({})

const args: EventsNetworkProps = {
  scale: "all" as "all",
  scalePoint: O.none,
  events: eventsMD,
  selectedActorIds: actors.map((a) => a.uuid),
  selectedGroupIds: [],
  selectedTopicIds: [],
}

NetworkGraphExample.args = args

NetworkGraphExample.argTypes = {
  minDate: { control: "date" },
  maxDate: { control: "date" },
  selectedEvents: { control: "object" },
}

export { NetworkGraphExample }