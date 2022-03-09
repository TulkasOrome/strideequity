import React from 'react';
import { Container} from 'react-bootstrap';
 
import ServerProps from '../../lib/serverProps';
import DashBoardLayout from '../../components/DashBoardLayout';
import SettingsController from '../../lib/settings/settingsController';
import serializable from '../../lib/serializable';
import DashboardModelNavbar from '../../components/DashboardModelNavbar';
import IconButton from '../../components/IconButton';
import SettingsFields from '../../components/settings/SettingsFields';

const SettingsDashboardPage = ({ state, data }) => (
  <DashBoardLayout 
    title="StrideEquity | Dashboard" 
    state={state}
  >
    <Container>
      <DashboardModelNavbar model="Settings" data={data}>
        <IconButton href="/page/new" icon="plus">new page</IconButton>
      </DashboardModelNavbar>
      <SettingsFields settings={data.settings} />
    </Container>
  </DashBoardLayout>
);

export async function getServerSideProps({ query, req, res }) {
   
  const data = {};
  data.settings = await SettingsController.all();
  return {
    props: {
      state: await ServerProps.getState(req),
      data: serializable(data),
    },
  };
}

export default SettingsDashboardPage;
