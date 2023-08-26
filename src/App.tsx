import '/@/app.css';

import { PanelHelp } from '/@/components/PanelHelp';
import { PanelMain } from '/@/components/PanelMain';
import { FiSettings } from 'react-icons/fi';

import {
  EditIcon,
  InfoIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import {
  HStack,
  Show,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import {
  useHashParam,
  useHashParamBoolean,
  useHashParamInt,
} from '@metapages/hash-query';

import {
  ButtonTabsToggle,
} from './components/options/components/ButtonTabsToggle';
import { PanelOptions } from './components/options/PanelOptions';
import { PanelMarkdownEditor } from './components/PanelMarkdownEditor';

export const App: React.FC = () => {
  const [hideMenu] = useHashParamBoolean("menuhidden");
  const [mode] = useHashParam("button", undefined);
  const [tab, setTab] = useHashParamInt("tab");
  

  if (hideMenu) {
    if (mode === undefined || mode === "visible" || mode === "invisible") {
      return (
        <>
          <HStack
            style={{ position: "absolute" }}
            width="100%"
            justifyContent="flex-end"
          >
            <Spacer />
            <Show breakpoint="(min-width: 200px)">
              <ButtonTabsToggle />
            </Show>
          </HStack>
          <PanelMain />

        </>
      );
    } else if (mode === "hidden") {
      return <PanelMain />;
    }
  }
  return (
    <VStack align="flex-start" w="100%">
    <Tabs index={tab || 0} isLazy={true} onChange={setTab} w="100%">
      <TabList>
        <Tab>
          <ViewIcon /> &nbsp; Markdown
        </Tab>
        
        <Tab>
          <FiSettings /> &nbsp; Options
        </Tab>
        <Tab>
          <EditIcon /> &nbsp; Editor
        </Tab>
        <Tab>
          <InfoIcon />
          &nbsp; Help
        </Tab>
        <Spacer /> <ButtonTabsToggle />
      </TabList>

      <TabPanels>
        <TabPanel>
          <PanelMain />
        </TabPanel>
        
        <TabPanel>
          <PanelOptions />
        </TabPanel>
        <TabPanel>
          <PanelMarkdownEditor />
        </TabPanel>
        <TabPanel>
          <PanelHelp />
        </TabPanel>
      </TabPanels>
    </Tabs>
    </VStack>
  );
};
