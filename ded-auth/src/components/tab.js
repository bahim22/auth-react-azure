import { Tab } from '@headlessui/react'

export default function MyTabs() {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Projects</Tab>
        <Tab>Websites</Tab>
        <Tab>Analytics</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Next</Tab.Panel>
        <Tab.Panel>React</Tab.Panel>
        <Tab.Panel>GitHub</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}