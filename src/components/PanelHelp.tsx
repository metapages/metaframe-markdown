import { Box } from '@chakra-ui/react';

export const PanelHelp: React.FC = () => {
  return (
    <Box className="iframe-container">
      <iframe
        className="iframe"
        // In this case only, we are used to display our own help
        src={`${window.location.origin}/#?hm=disabled&url=${window.location.origin}${window.location.pathname}/README.md`}
      />
    </Box>
  );
};
