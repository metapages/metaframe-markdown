import '/@/app.css';

import { PanelHelp } from '/@/components/PanelHelp';
import { PanelMain } from '/@/components/PanelMain';
import { FiSettings } from 'react-icons/fi';

import {
  CopyIcon,
  EditIcon,
  InfoIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  Show,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useToast,
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
  const toast = useToast();

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
            <Tooltip label="View markdown page">
              <HStack spacing="0px">
                <ViewIcon />
                <Box>&nbsp; Markdown</Box>
              </HStack>
            </Tooltip>
          </Tab>
          <Tab>
            <Tooltip label="Edit markdown directly">
              <HStack spacing="0px">
                <EditIcon />

                <Box>&nbsp; Editor</Box>
              </HStack>
            </Tooltip>
          </Tab>
          <Tab>
            <Tooltip label="Customize page">
              <HStack spacing="0px">
                <FiSettings />
                <Box>&nbsp; Options</Box>
              </HStack>
            </Tooltip>
          </Tab>
          <Tab>
            <Tooltip label="Documentation">
              <HStack spacing="0px">
                <InfoIcon />
                <Box>&nbsp; Help</Box>
              </HStack>
            </Tooltip>
          </Tab>
          <Tooltip label="Copy URL to clipboard">
            <IconButton
              aria-label="copy url"
              variant="ghost"
              icon={<CopyIcon />}
              onClick={() => {
                window.navigator.clipboard.writeText(window.location.href);
                toast({
                  title: "Copied URL to clipboard",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              }}
            />
          </Tooltip>
          <Spacer />
          <ButtonTabsToggle />
        </TabList>

        <TabPanels>
          <TabPanel>
            <PanelMain />
          </TabPanel>
          <TabPanel>
            <PanelMarkdownEditor />
          </TabPanel>

          <TabPanel>
            <PanelOptions />
          </TabPanel>
          <TabPanel>
            <PanelHelp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
